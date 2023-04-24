const usersContainer = document.querySelector("#users_container")
const resultsContainer = document.querySelector("#results_container");
const darkModeSwitch = document.querySelector("#darkMode");
darkModeSwitch.addEventListener("change", (event) => {
    if (event.target.checked) {
        const htmlTag = document.querySelector('html');
        htmlTag.setAttribute('data-bs-theme', 'dark');
    } else {
        const htmlTag = document.querySelector('html');
        htmlTag.removeAttribute('data-bs-theme');
    }
});

async function fetchPersons() {
    try {
        const response = await fetch('/api/acft/person');
        const listOfPersons = await response.json();
        loadPersonsBtns(listOfPersons);
    } catch (error) {
        console.error(err);
    }
}

fetchPersons();

async function loadPersonsBtns(persons) {
    for (const person of persons) {
        try {
            const result = await fetch(`/api/acft/test?personID=${person.id}&latest=true`)
                .then(response => response.json());
            const btn = document.createElement("button");
            btn.id = `btn-${person.id}`;
            btn.dataset.id = person.id;
            btn.classList.add("btn", "px-3", "position-relative", "btn-secondary", "btn-sm");
            btn.type = "button";
            btn.innerHTML = `${person.name} <span id="btn-${person.id}-badge"></span>`
            btn.addEventListener("click", event => {
                console.log(`Clicked ${person.name} with id ${person.id}`);
                resultsContainer.innerHTML = '';
                loadPersonCard(person.id);
            });
            usersContainer.appendChild(btn);
            const span = document.querySelector(`#btn-${person.id}-badge`);
            const smallDot = true;
            updateCurrencyColor(span, result[0].date, smallDot);
            btn.appendChild(span);
        } catch (error) {
            console.error(error);
        }
    }
}

loadPersonCard(3);

async function loadPersonCard(id) {
    try {
        fetch(`api/acft/test?personID=${id}`)
            .then(response => {
                return response.json();
            })
            .then(person => {
                console.log(person[0].name);
                const gender = person[0].gender === "M" ? "Male" : "Female";
                resultsContainer.innerHTML =
                    `<div id="card-${person[0].person_id}" class="card text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle">
                        <div class="card-header">${person[0].name} (${person[0].age} yrs old ${gender})
                        <span id="badge-${person[0].person_id}"></span></div>
                    </div>`
                return person;
            })
            .then(results => {
                results.reverse();
                const testStatusBadge = document.querySelector(`#badge-${results[0].person_id}`);
                updateCurrencyColor(testStatusBadge, results[0].date);
                results.forEach(result => {
                    let formattedDate = formatDate(result.date);
                    let sdcSeconds = formatSeconds(result.sdc.seconds);
                    let plkSeconds = formatSeconds(result.plk.seconds);
                    let runSeconds = formatSeconds(result.run.seconds);
                    const card = document.querySelector(`#card-${result.person_id}`);
                    card.innerHTML +=
                        `<div class="card-body">
                            <div class="accordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button id="date-banner-${result.id}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#result-${result.id}" aria-expanded="true" aria-controls="result-${result.id}">
                                            Test date: ${formattedDate}
                                        </button>
                                    </h2>
                                    <div id="result-${result.id}" class="accordion-collapse collapse">
                                        <div class="accordion-body">
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
                });
                const testCardHeadder = document.querySelector(`#date-banner-${results[0].id}`);
                testCardHeadder.classList.remove("collapsed");
                const testCardResults = document.querySelector(`#result-${results[0].id}`);
                testCardResults.classList.add("show");
        })
    } catch (error) {
        console.error(error);
    }
}

function updateCurrencyColor(elementObj, dateString, smallDot = false) {
    console.log(elementObj.id);
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const parsedDate = new Date(dateString);
    if (smallDot === true) {
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
            elementObj.classList.add("badge", "rounded-pill", "text-bg-success");
            elementObj.textContent = "Current";
        } else if (parsedDate >= oneYearAgo) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "rounded-pill", "text-bg-warning");
            elementObj.textContent = "6mo+ test";
        } else {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "rounded-pill", "text-bg-danger");
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

// createPerson("Ted", "M", 32);

async function createPerson(name, gender, age) {
    let payload = JSON.stringify({
        name: name,
        gender: gender,
        age: age 
    });
    let jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        let response = await fetch(`/api/acft/person`, {  // ${rootURL}
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