// const rootURL = "http://localhost:3000";

let usersContainer = document.querySelector("#users_container")

loadPersonData(3);

fetch("/api/fitness/person")
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
            let btn = document.querySelector(`#btn-${person.id}`);
            btn.addEventListener("click", event => {
                console.log(`Clicked ${person.name} with id ${person.id}`);
                loadPersonData(person.id);
            });
        });
    });

async function loadPersonData(id) {
    let personData = document.querySelector("#dashboard");
    fetch(`api/fitness/test?personID=${id}`)
        .then(response => {
            return response.json();
        })
        .then(person => {
            console.log(person[0].name);
            personData.innerHTML =
                `<div>
                    <h2>${person[0].name}</h2>
                    <p>${person[0].gender}</p>
                    <p>${person[0].age}</p>
                </div>`
            return person;
        })
        .then(results => {
            console.log(results);
            let resultsContainer = document.querySelector("#results_container");
            // resultsContainer.innerHTML = "";
            results.forEach(result => {
                resultsContainer.innerHTML +=
                    `<div>
                        <div class="container text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-3">
                            <h4>Test date: ${result.date}</h4>
                            <h4>Push-ups: ${result.pushup_score}</h4>
                            <h4>Sit-ups: ${result.situp_score}<h4>
                        </div>
                    </div>`
            })
        })
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
        let response = await fetch(`/api/fitness/person`, {  // ${rootURL}
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
        let response = await fetch(`/api/fitness/person/${id}`, {  // ${rootURL}
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
        let response = await fetch(`/api/fitness/test`, {  // ${rootURL}
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
        let response = await fetch(`/api/fitness/test/${id}`, {  // ${rootURL}
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