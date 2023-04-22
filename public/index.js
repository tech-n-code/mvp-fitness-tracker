// const rootURL = "http://localhost:3000";

const usersContainer = document.querySelector("#users_container")
const resultsContainer = document.querySelector("#results_container");

loadPersonCard(3);

fetch("/api/acft/person")
    .then(response => {
        return response.json();
    })
    .then(persons => {
        console.log(persons);
        persons.forEach(person => {
            console.log(person);
            usersContainer.innerHTML +=
                `<button id="btn-${person.id}" data-id="${person.id}" class="btn btn-success rounded-pill px-3" type="button">${person.name}</button>`
        });
        return persons;
    })
    .then(persons => {
        persons.forEach(person => {
            const btn = document.querySelector(`#btn-${person.id}`);
            btn.addEventListener("click", event => {
                console.log(`Clicked ${person.name} with id ${person.id}`);
                resultsContainer.innerHTML = "";
                loadPersonCard(person.id);
            });
        });
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
                `<div id="card-${person[0].person_id}" class="card">
                    <div class="card-header">${person[0].name} (${person[0].age} yrs old ${gender})</div>
                </div>`
            return person;
        })
        .then(results => {
            results.reverse();
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
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#result-${result.id}" aria-expanded="true" aria-controls="result-${result.id}">
                                        Test date: ${formattedDate}
                                    </button>
                                </h2>
                                <div id="result-${result.id}" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <p>Max Deadlift (MDL): ${result.mdl}</p>
                                        <p>Standing Power Throw (SPT): ${result.spt}</p>
                                        <p>Hand Release Push-ups (HRP): ${result.hrp}</p>
                                        <p>Spint-Drag-Carry (SDC): ${result.sdc.minutes}:${sdcSeconds}</p>
                                        <p>Plank (PLK): ${result.plk.minutes}:${plkSeconds}</p>
                                        <p>Two-Mile Run (2MR): ${result.run.minutes}:${runSeconds}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
            })
            const card = document.querySelector(`#result-${results[0].id}`);
            card.classList.add("show");
        })
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