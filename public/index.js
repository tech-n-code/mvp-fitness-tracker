const usersContainer = document.querySelector("#users_container");
const resultsContainer = document.querySelector("#results_container");
const darkModeSwitch = document.querySelector("#darkMode");


async function fetchUsers() {
    try {
        const response = await fetch('/api/acft/person');
        const users = await response.json();
        for (const user of users) {
            loadUserBtn(user.id)
        }
        loadUserCard(users[0].id);
    } catch (error) {
        console.error(err);
    }
}

fetchUsers();

async function loadUserBtn(id) {
    try {
        const result = await fetch(`/api/acft/test?personID=${id}&latest=true`)
            .then(response => response.json());
        const btn = document.createElement("button");
        btn.id = `btn-${result[0].id}`;
        btn.dataset.id = id;
        btn.classList.add("btn", "px-3", "my-1", "position-relative", "btn-secondary", "text-wrap", "text-break");
        btn.type = "button";
        btn.innerHTML = `${result[0].name} <span id="btn-${result[0].id}-badge"></span>`
        btn.addEventListener("click", event => {
            resultsContainer.innerHTML = '';
            loadUserCard(id);
            console.log(`Clicked on ${result[0].name} with id ${result[0].id}`)  //dev tool
        });
        usersContainer.appendChild(btn);
        const span = document.querySelector(`#btn-${id}-badge`);
        const smallDot = true;
        let newUser = false;
        if (result[0].acft_id === null) {
            newUser = true;
        }
        updateTestStatusColor(span, result[0].date, smallDot, newUser);
        btn.appendChild(span);
    } catch (error) {
        console.error(error);
    }
}

async function loadUserCard(id) {
    try {
        fetch(`api/acft/test?personID=${id}`)
            .then(response => {
                return response.json();
            })
            .then(person => {
                const gender = person[0].gender === "M" ? "Male" : "Female";
                resultsContainer.innerHTML =
                    `<div id="card-${person[0].id}" class="card text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle">
                        <div class="d-flex flex-row card-header">
                            <div class="d-flex flex-column">
                                <p class="mb-0 text-wrap text-break"><b><em>${person[0].name}</em></b> (${person[0].age} yrs old ${gender})</p>
                                <span id="badge-${person[0].id}"></span>
                            </div>
                                <div class="d-flex flex-grow-1 justify-content-end">
                                    <div class="dropdown">
                                        <a class="btn btn-sm btn-outline-secondary dropdown-toggle ms-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Menu
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li id="btn-new-acft-${person[0].id}"><a class="dropdown-item">New ACFT</a></li>
                                            <li id="btn-edit-${person[0].id}"><a class="dropdown-item">Edit User</a></li>
                                            <li id="btn-del-${person[0].id}"><a class="dropdown-item">Delete User</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                
                const editBtn = document.querySelector(`#btn-edit-${person[0].id}`);
                editBtn.addEventListener("click", event => {
                    //need edit routine
                });
                const deleteBtn = document.querySelector(`#btn-del-${person[0].id}`);
                deleteBtn.addEventListener("click", event => {
                    console.log(`Delete btn for ${person[0].id} pressed`)
                    deleteUser(person[0].id);
                });

                return person;
            })
            .then(results => {
                let smallDot = false;
                let newUser = false;
                if (results[0].acft_id === null) {
                    newUser = true;
                    return;
                    //loadNewTestForm
                }
                
                const testStatusBadge = document.querySelector(`#badge-${results[0].id}`);
                updateTestStatusColor(testStatusBadge, results[0].date, smallDot, newUser);
                results.forEach(result => {
                    let formattedDate = formatDate(result.date);
                    let sdcSeconds = formatSeconds(result.sdc.seconds);
                    let plkSeconds = formatSeconds(result.plk.seconds);
                    let runSeconds = formatSeconds(result.run.seconds);
                    let totalScore = result.mdlScore + result.sptScore + result.hrpScore + result.sdcScore + result.plkScore + result.runScore;
                    const card = document.querySelector(`#card-${result.person_id}`);
                    card.innerHTML +=
                        `<div class="card-body">
                            <div class="accordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button id="date-banner-${result.acft_id}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#result-${result.acft_id}" aria-expanded="true" aria-controls="result-${result.acft_id}">
                                            ACFT (${formattedDate})&nbsp;<span id="badge-${result.acft_id}-score" class="badge rounded-pill text-bg-secondary">${totalScore}</span>&nbsp;
                                        </button>
                                    </h2>
                                    <div id="result-${result.acft_id}" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <p>Age on test day: ${result.acft_age}</p>
                                            <p class="mb-0">Max Deadlift (MDL): ${result.mdl} lbs</p>
                                                <div class="progress" role="progressbar" aria-label="mdl" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar" style="width: ${result.mdlScore}%">${result.mdlScore} points</div>
                                                </div>
                                            <p class="mb-0 mt-3">Standing Power Throw (SPT): ${result.spt} m</p>
                                                <div class="progress" role="progressbar" aria-label="spt" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar" style="width: ${result.sptScore}%">${result.sptScore} points</div>
                                                </div>
                                            <p class="mb-0 mt-3">Hand Release Push-ups (HRP): ${result.hrp} reps</p>
                                                <div class="progress" role="progressbar" aria-label="hrp" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar" style="width: ${result.hrpScore}%">${result.hrpScore} points</div>
                                                </div>
                                            <p class="mb-0 mt-3">Spint-Drag-Carry (SDC): ${result.sdc.minutes}:${sdcSeconds} mins</p>
                                                <div class="progress" role="progressbar" aria-label="sdc" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar" style="width: ${result.sdcScore}%">${result.sdcScore} points</div>
                                                </div>
                                            <p class="mb-0 mt-3">Plank (PLK): ${result.plk.minutes}:${plkSeconds} mins</p>
                                                <div class="progress" role="progressbar" aria-label="plk" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar" style="width: ${result.plkScore}%">${result.plkScore} points</div>
                                                </div>
                                            <p class="mb-0 mt-3">Two-Mile Run (2MR): ${result.run.minutes}:${runSeconds} mins</p>
                                                <div class="progress" role="progressbar" aria-label="run" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar" style="width: ${result.runScore}%">${result.runScore} points</div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    passFailTestBarColoring(result.acft_id);
                });
                const firstTestCardHeadder = document.querySelector(`#date-banner-${results[0].acft_id}`);
                firstTestCardHeadder.classList.remove("collapsed");
                const firstTestCardResults = document.querySelector(`#result-${results[0].acft_id}`);
                firstTestCardResults.classList.add("show");
        })
    } catch (error) {
        console.error(error);
    }
}

function passFailTestBarColoring(acft_id) {
    const testCardHeadder = document.querySelector(`#date-banner-${acft_id}`);
    const resultsAccordion = document.querySelector(`#result-${acft_id}`);
    const progressBars = resultsAccordion.querySelectorAll(".progress-bar");
    let failed = false;
    progressBars.forEach(progressBar => {
        if (progressBar.style.width.replace('%','') < 60) {
            progressBar.classList.add("bg-danger");
            failed = true;
        }
    });
    if (failed === true) {
        const newSpan = document.createElement("span");
        newSpan.setAttribute('id', `badge-${acft_id}-status`);
        newSpan.classList.add("text-danger", "fst-italic");
        newSpan.textContent = "Failed";
        testCardHeadder.appendChild(newSpan);
    } 
}

function newUserForm() {

}

// createNewUser("Tom", 30, "M");

async function createNewUser(name, age, gender) {
    let payload = JSON.stringify({
        name: name,
        gender: gender,
        age: age 
    });
    let jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        let response = await fetch(`/api/acft/person`, {
            method: "POST",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            let user = await response.json();
            loadUserBtn(user[0].id);
        }
    } catch (err) {
        console.error(err);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`/api/acft/person/${id}`, {
            method: 'DELETE',
        });
        console.log(response.status);
        const card = document.querySelector(`#card-${id}`);
        card.remove();
        const btn = document.querySelector(`#btn-${id}`);
        btn.remove();
        const firstChild = usersContainer.children[0];
        const dataId = firstChild.getAttribute("data-id");
        loadUserCard(dataId);
    } catch (err) {
        console.error(err);
    }
}

function updateTestStatusColor(elementObj, dateString, smallDot = false, newUser = false) {
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const parsedDate = new Date(dateString);
    if (newUser === true && smallDot === true) {
        elementObj.setAttribute("class", "");
        elementObj.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "px-2", "bg-primary", "border", "border-light", "rounded-pill", "text-nowrap");
        elementObj.textContent = "New";
    } else if (smallDot === true) {
        if (parsedDate >= sixMonthsAgo) {
            elementObj.setAttribute("class", "");
        } else if (parsedDate >= oneYearAgo) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "p-2", "bg-warning", "border", "border-light", "rounded-circle");
        } else {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "p-2", "bg-danger", "border", "border-light", "rounded-circle");
        }
    } else {
        if (parsedDate >= sixMonthsAgo) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "rounded-pill", "text-bg-success", "mb-auto");
            elementObj.textContent = "Current";
        } else if (parsedDate >= oneYearAgo) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "rounded-pill", "text-bg-warning", "mb-auto");
            elementObj.textContent = "6mo+";
        } else {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "rounded-pill", "text-bg-danger", "mb-auto");
            elementObj.textContent = "Overdue";
        }
    }
}

function formatDate(resultDate) {
    let date = new Date(resultDate);
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: 'long' });
    let year = date.getFullYear();
    let formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}

function formatSeconds(seconds) {
    if (seconds < 10) {
        let twoDigitSeconds = `0${seconds}`;
        return twoDigitSeconds;
    }
    return seconds;
}

// updatePerson(10, "Kyle", "F", 45);

async function updatePerson(id, name, gender, age) {
    let payload = JSON.stringify({
        name: name,
        gender: gender,
        age: age 
    });
    let jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        let response = await fetch(`/api/acft/person/${id}`, {  // ${rootURL}
            method: "PUT",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            let message = await response.text();
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }
}

// createTest(70, 64, "2023-03-16 08:45:00", 10);

async function createTest(pushup_score, situp_score, date, person_id) {
    let payload = JSON.stringify({
        pushup_score: pushup_score,
        situp_score: situp_score,
        date: date,
        person_id: person_id
    });
    let jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        let response = await fetch(`/api/acft/test`, {  // ${rootURL}
            method: "POST",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            let message = await response.text();
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }
}

// updateTest(12, 71, 64, "2023-03-16 08:45:00", 10);

async function updateTest(id, pushup_score, situp_score, date, person_id) {
    let payload = JSON.stringify({
        pushup_score: pushup_score,
        situp_score: situp_score,
        date: date,
        person_id: person_id
    });
    let jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        let response = await fetch(`/api/acft/test/${id}`, {  // ${rootURL}
            method: "PUT",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            let message = await response.text();
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }
}

const ageModalInput = document.getElementById('user-age');
const ageModalScroll = document.getElementById('age-scroll-output');
ageModalInput.addEventListener('input', function() {
    ageModalScroll.innerHTML = ageModalInput.value;
});

const btnModalSave = document.getElementById("btn-modal-save");
btnModalSave.addEventListener("click", event => {
    const form = document.querySelector(".modal-body form");
    const nameInput = form.querySelector("#user-name");
    const ageInput = form.querySelector("#user-age");
    const genderInput = form.querySelector("#user-gender");
    const name = nameInput.value;
    const age = ageInput.value;
    const gender = genderInput.value;
    createNewUser(name, age, gender);
    document.getElementById("btn-modal-close-2").click();
})

const btnModalClose1 = document.getElementById("btn-modal-close-1");
btnModalClose1.addEventListener("click", event => {
    ageModalInput.value = ageModalInput.defaultValue;
    ageModalScroll.innerHTML = ageModalInput.value;
    const form = document.querySelector(".modal-body form");
    form.reset();
})

const btnModalClose2 = document.getElementById("btn-modal-close-2");
btnModalClose2.addEventListener("click", event => {
    ageModalInput.value = ageModalInput.defaultValue;
    ageModalScroll.innerHTML = ageModalInput.value;
    const form = document.querySelector(".modal-body form");
    form.reset();
})

darkModeSwitch.addEventListener("change", (event) => {
    if (event.target.checked) {
        const htmlTag = document.querySelector('html');
        htmlTag.setAttribute('data-bs-theme', 'dark');
    } else {
        const htmlTag = document.querySelector('html');
        htmlTag.removeAttribute('data-bs-theme');
    }
});