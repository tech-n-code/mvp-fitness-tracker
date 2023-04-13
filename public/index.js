// import { response } from "express";

const rootURL = "http://localhost:3000";

let usersContainer = document.querySelector("#user_container")

fetch("/api/fitness/person")
    .then(response => {
        return response.json();
    })
    .then(persons => {
        console.log(persons);
        persons.forEach(person => {
            console.log(person);
            usersContainer.innerHTML +=
                `<button id="btn-${person.id}" class="btn btn-success rounded-pill px-3" type="button">${person.name}</button>`
        });
        return persons;
    })
    .then(persons => {
        persons.forEach(person => {
            let btn = document.querySelector(`#btn-${person.id}`);
            btn.addEventListener("click", event => {
                console.log(`Clicked id ${person.id} for ${person.name}`);
            });
        });
    });

let resultsContainer = document.querySelector("#results_container")

// async function loadPersonData(id) {
//     if (!id) {
//         let usersContainer = document.querySelector("#usersContainer");
//         let firstUser = usersContainer.querySelector(":first-child");
//         fetch("/api/fitness/test")
//         .then(response => {
//             return response.json();
//         })
//         .then(tests => {
//             console.log(tests);
//             tests.forEach(test => {
//                 console.log(test);
//                 resultsContainer.innerHTML +=
//                     `
//                     <div>

                    
//                     </div>
                    
//                     `
//             });
//         })


//     } else {

//     }
// }





function requestPerson(person) {
    try {
        fetch(`"/api/fitness/person/'${person}'"`)
            .then(function(response) {
                response.json();
                console.log(response);
            });
    } catch (err) {
        console.error(err);
    }
}

// createPerson("Kyle", "M", 45);

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
        let response = await fetch(`${rootURL}/api/fitness/create-person`, {
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
        let response = await fetch(`${rootURL}/api/fitness/update-person/${id}`, {
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
        let response = await fetch(`${rootURL}/api/fitness/create-test`, {
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
        let response = await fetch(`${rootURL}/api/fitness/update-test/${id}`, {
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