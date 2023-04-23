// const rootURL = "http://localhost:3000";

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

loadPersonCard(3);

fetch("/api/acft/person")
    .then(response => {
        return response.json();
    })
    .then(persons => {
        console.log(persons);
        persons.forEach(person => {
                usersContainer.innerHTML +=
                    `<button id="btn-${person.id}" data-id="${person.id}" class="btn rounded-pill px-3" type="button">${person.name}</button>`
        })
        return persons;
        })
    .then(persons => {
        persons.forEach(person => {
            const btn = document.querySelector(`#btn-${person.id}`);
            btn.addEventListener("click", event => {
                console.log(`Clicked ${person.name} with id ${person.id}`);
                resultsContainer.innerHTML = "";
                loadPersonCard(person.id);
            })
            fetch(`/api/acft/test?personID=${person.id}&latest=true`)
                .then(result => { 
                    return result.json()
                })
                .then(result => {
                    console.log(result);
                    console.log(result.date);
                    updateCurrencyColor(btn, result[0].date);
                })
            })
        });

async function loadPersonCard(id) {
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
                                                <div class="progress-bar" style="width: ${result.runScore}%>${result.runScore} points</div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
            })
            const testCardHeadder = document.querySelector(`#date-banner-${results[0].id}`);
            testCardHeadder.classList.remove("collapsed");
            const testCardResults = document.querySelector(`#result-${results[0].id}`);
            testCardResults.classList.add("show");
        })
}

function updateCurrencyColor(elementObj, dateString) {
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const parsedDate = new Date(dateString);
    if (elementObj.tagName.toLowerCase() === "button") {
        elementObj.classList.remove("btn-success", "btn-warning", "btn-danger");
        elementObj.classList.add()
        if (parsedDate >= sixMonthsAgo) {
            elementObj.classList.remove("btn-success", "btn-warning", "btn-danger");
            elementObj.classList.add("btn-success");
        } else if (parsedDate >= oneYearAgo) {
            elementObj.classList.remove("btn-success", "btn-warning", "btn-danger");
            elementObj.classList.add("btn-warning");
        } else {
            elementObj.classList.remove("btn-success", "btn-warning", "btn-danger");
            elementObj.classList.add("btn-danger");
        }
    } else {
        if (parsedDate >= sixMonthsAgo) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "text-bg-success");
            elementObj.textContent = "Current";
        } else if (parsedDate >= oneYearAgo) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "text-bg-warning");
            elementObj.textContent = "6mo old";
        } else {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "text-bg-danger");
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