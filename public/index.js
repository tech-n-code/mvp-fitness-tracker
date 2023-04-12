let container = document.querySelector(".container");

// let payload = JSON.stringify({
//     name: "Bob"
// });

// let jsonHeaders = new Headers({
//     "Content-Type": "application/json"
// });

// fetch("/api/fitness/person")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (persons) {
//         console.log(persons);
//         persons.forEach(function (person) {
//             console.log("Adding h2 for person:", person);
//             container.innerHTML += `<h2>${person.name}</h2>`;
//         });
//     });

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
        let response = await fetch("/api/fitness/create-person", {
            method: "POST",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (err) {
        console.error(err);
    }
}