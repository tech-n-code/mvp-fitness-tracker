let container = document.querySelector(".container");  //<-- assuming there is a container on page

fetch("/api/fitness-test")
.then(function (response) {
    return response.json();
})
.then(function (persons) {
    console.log(persons);
    persons.forEach(function (person) {
        console.log("Adding h2 for person:", person);
        container.innerHTML += `<h2>${person.name}</h2>`;
    });
});