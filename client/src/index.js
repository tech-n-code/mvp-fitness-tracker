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
    } catch (err) {
        console.error(err);
        console.log('Not fetching users')
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
                btn.innerHTML = `${result[0].name} <span id="btn-${result[0].id}-badge" data-userId="${result[0].id}"></span>`
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
    } catch (err) {
        console.error(err);
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

                const cardDiv = document.createElement("div");
                cardDiv.setAttribute("id", `card-${person[0].id}`);
                cardDiv.setAttribute("class", "card text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle");
                
                const cardHeaderDiv = document.createElement("div");
                cardHeaderDiv.setAttribute("class", "d-flex flex-row card-header");
                
                const nameDiv = document.createElement("div");
                nameDiv.setAttribute("class", "d-flex flex-column");
                
                const nameParagraph = document.createElement("p");
                nameParagraph.setAttribute("class", "mb-0 text-wrap text-break");
                nameParagraph.innerHTML = `<b><em>${person[0].name}</em></b> (${person[0].age} yrs old ${gender})`;
                
                const badgeSpan = document.createElement("span");
                badgeSpan.setAttribute("id", `badge-${person[0].id}`);
                badgeSpan.setAttribute("data-userId", person[0].id);
                
                nameDiv.appendChild(nameParagraph);
                nameDiv.appendChild(badgeSpan);
                
                const dropdownDiv = document.createElement("div");
                dropdownDiv.setAttribute("class", "d-flex flex-grow-1 justify-content-end");
                
                const dropdown = document.createElement("div");
                dropdown.setAttribute("class", "dropdown");
                
                const dropdownButton = document.createElement("a");
                dropdownButton.setAttribute("class", "btn btn-sm btn-outline-secondary dropdown-toggle ms-3");
                dropdownButton.setAttribute("role", "button");
                dropdownButton.setAttribute("data-bs-toggle", "dropdown");
                dropdownButton.setAttribute("aria-expanded", "false");
                dropdownButton.innerHTML = "Menu";
                
                const dropdownMenu = document.createElement("ul");
                dropdownMenu.setAttribute("class", "dropdown-menu");
                
                const newAcftBtn = document.createElement("li");
                newAcftBtn.setAttribute("id", `btn-new-acft-${person[0].id}`);
                newAcftBtn.setAttribute("data-bs-toggle", "modal");
                newAcftBtn.setAttribute("data-bs-target", "#newACFTmodal");
                
                const newAcftBtnLink = document.createElement("a");
                newAcftBtnLink.setAttribute("class", "dropdown-item");
                newAcftBtnLink.innerHTML = "New ACFT";
                
                const editUserBtn = document.createElement("li");
                editUserBtn.setAttribute("id", `btn-edit-${person[0].id}`);
                editUserBtn.setAttribute("data-bs-toggle", "modal");
                editUserBtn.setAttribute("data-bs-target", "#editUserModal");
                editUserBtn.dataset.id = person[0].id;
                editUserBtn.dataset.name = person[0].name;
                editUserBtn.dataset.age = person[0].age;
                
                const editUserBtnLink = document.createElement("a");
                editUserBtnLink.setAttribute("class", "dropdown-item");
                editUserBtnLink.innerHTML = "Edit User";
                
                const deleteUserBtn = document.createElement("li");
                deleteUserBtn.setAttribute("id", `btn-del-${person[0].id}`);
                deleteUserBtn.setAttribute("data-bs-toggle", "modal");
                deleteUserBtn.setAttribute("data-bs-target", "#delConfirModal");
                
                const deleteUserBtnLink = document.createElement("a");
                deleteUserBtnLink.setAttribute("class", "dropdown-item");
                deleteUserBtnLink.innerHTML = "Delete User";
                
                dropdownMenu.appendChild(newAcftBtn);
                newAcftBtn.appendChild(newAcftBtnLink);
                dropdownMenu.appendChild(editUserBtn);
                editUserBtn.appendChild(editUserBtnLink);
                dropdownMenu.appendChild(deleteUserBtn);
                deleteUserBtn.appendChild(deleteUserBtnLink);
                
                dropdown.appendChild(dropdownButton);
                dropdown.appendChild(dropdownMenu);
                dropdownDiv.appendChild(dropdown);
                
                cardHeaderDiv.appendChild(nameDiv);
                cardHeaderDiv.appendChild(dropdownDiv);
                cardDiv.appendChild(cardHeaderDiv);
                
                resultsContainer.appendChild(cardDiv);               
                
                const btnACFTmodalSave = document.getElementById("btn-modal3-acft-save");
                btnACFTmodalSave.dataset.id = person[0].id;
                btnACFTmodalSave.dataset.age = person[0].age;

                const btnUserModalSave = document.getElementById("btn-modal-save");
                btnUserModalSave.dataset.id = person[0].id;
                btnUserModalSave.dataset.age = person[0].age;
                
                const btnDeleteModalConfirm = document.getElementById("btn-modal4-confirm");
                btnDeleteModalConfirm.dataset.id = person[0].id;

                loadUserResults(person[0].id)
            });      
    } catch (err) {
        console.error(err);
    }
}

async function loadUserResults(id) {
    try {
        fetch(`api/acft/test?personID=${id}`)
            .then(response => {
                return response.json();
            })
            .then(results => {
                let smallDot = false;
                let newUser = false;
                if (results[0].acft_id === null) {
                    newUser = true;
                    return;
                }
                                
                results.forEach(result => {
                    let formattedDate = formatDate(result.date);
                    let sdcSeconds = formatSeconds(result.sdc.seconds);
                    let plkSeconds = formatSeconds(result.plk.seconds);
                    let runSeconds = formatSeconds(result.run.seconds);
                    let totalScore = result.mdlScore + result.sptScore + result.hrpScore + result.sdcScore + result.plkScore + result.runScore;

                    const card = document.querySelector(`#card-${result.person_id}`);

                    const cardBody = document.createElement("div");
                    cardBody.id = `card-body-${result.acft_id}`;
                    cardBody.classList.add("card-body");
                    card.appendChild(cardBody);
                    
                    const accordion = document.createElement("div");
                    accordion.classList.add("accordion");
                    cardBody.appendChild(accordion);
                    
                    const accordionItem = document.createElement("div");
                    accordionItem.classList.add("accordion-item");
                    accordion.appendChild(accordionItem);
                    
                    const accordionHeader = document.createElement('h2');
                    accordionHeader.classList.add('accordion-header');
                    accordionItem.appendChild(accordionHeader);
                    
                    const testCardBtn = document.createElement("button");
                    testCardBtn.id = `date-banner-${result.acft_id}`;
                    testCardBtn.classList.add('accordion-button', 'collapsed');
                    testCardBtn.type = "button";
                    testCardBtn.setAttribute("data-bs-toggle", "collapse");
                    testCardBtn.setAttribute("data-bs-target", `#result-${result.acft_id}`);
                    testCardBtn.setAttribute("aria-expanded", true);
                    testCardBtn.setAttribute("aria-controls", `result-${result.acft_id}`);
                    
                    const span = document.createElement("span");
                    span.id = `badge-${result.acft_id}-score`;
                    span.classList.add("badge", "rounded-pill", "text-bg-secondary", "mx-1");
                    span.innerText = totalScore;
                    
                    testCardBtn.innerHTML = `ACFT (${formattedDate})`;
                    testCardBtn.appendChild(span);
                    accordionHeader.appendChild(testCardBtn);
                    accordionItem.appendChild(accordionHeader);
                    
                    const accordionCollapse = document.createElement("div");
                    accordionCollapse.id = `result-${result.acft_id}`;
                    accordionCollapse.classList.add("accordion-collapse", "collapse");
                    
                    const accordionBody = document.createElement("div");
                    accordionBody.classList.add("accordion-body");
                    
                    const dFlex1 = document.createElement("div");
                    dFlex1.classList.add("d-flex", "flex-row");
                    
                    const dFlex2 = document.createElement("div");
                    dFlex2.classList.add("d-flex", "flex-column");
                    
                    const ageOnTestDay = document.createElement("p");
                    ageOnTestDay.classList.add("mb-0");
                    ageOnTestDay.innerHTML = `<em>Age on test day: ${result.acft_age}</em>`;
                    dFlex2.appendChild(ageOnTestDay);
                    
                    const dFlex3 = document.createElement("div");
                    dFlex3.classList.add('d-flex', 'flex-grow-1', 'justify-content-end');
                    
                    const testDeleteBtn = document.createElement('button');
                    testDeleteBtn.id = `testDel-${result.acft_id}`;
                    testDeleteBtn.type = "button";
                    testDeleteBtn.setAttribute("data-acftId", result.acft_id);
                    testDeleteBtn.setAttribute("data-userId", result.person_id);
                    testDeleteBtn.classList.add('btn', "btn-outline-secondary", "btn-sm", "ms-3");
                    testDeleteBtn.innerText = "Delete";
                                        
                    testDeleteBtn.addEventListener("click", event => {
                        const acft_id = testDeleteBtn.getAttribute("data-acftId");
                        const user_id = testDeleteBtn.getAttribute("data-userId");
                        deleteACFT(acft_id, user_id);
                    });

                    dFlex3.appendChild(testDeleteBtn);
                    
                    dFlex1.appendChild(dFlex2);
                    dFlex1.appendChild(dFlex3);
                    accordionBody.appendChild(dFlex1);
                    
                    const p1 = document.createElement("p");
                    p1.classList.add("mb-0");
                    p1.innerText = `Max Deadlift (MDL): ${result.mdl} lbs`;
                    accordionBody.appendChild(p1);
                    
                    const div1 = document.createElement("div");
                    div1.classList.add("progress");
                    div1.role = "progressbar";
                    div1.setAttribute("aria-label", "mdl");
                    div1.setAttribute("aria-valuenow", "50");
                    div1.setAttribute("aria-valuemin", "0");
                    div1.setAttribute("aria-valuemax", "100");
                    
                    const div2 = document.createElement("div");
                    div2.classList.add("progress-bar");
                    div2.style = `width: ${result.mdlScore}%`;
                    div2.innerText = `${result.mdlScore} points`;
                    
                    div1.appendChild(div2);
                    accordionBody.appendChild(div1);
                    
                    const p2 = document.createElement("p");
                    p2.classList.add("mb-0", "mt-3");
                    p2.innerText = `Standing Power Throw (SPT): ${result.spt} m`;
                    accordionBody.appendChild(p2);
                    
                    const div3 = document.createElement("div");
                    div3.classList.add("progress");
                    div3.role = "progressbar";
                    div3.setAttribute("aria-label", "spt");
                    div3.setAttribute("aria-valuenow", "50");
                    div3.setAttribute("aria-valuemin", "0");
                    div3.setAttribute("aria-valuemax", "100");
                    
                    const div4 = document.createElement("div");
                    div4.classList.add("progress-bar");
                    div4.style = `width: ${result.sptScore}%`;
                    div4.innerText = `${result.sptScore} points`;
                    
                    div3.appendChild(div4);
                    accordionBody.appendChild(div3);
                    
                    const p3 = document.createElement("p");
                    p3.classList.add("mb-0", "mt-3");
                    p3.innerText = `Hand-Release Push-up (HRP): ${result.hrp} reps`;
                    accordionBody.appendChild(p3);
                    
                    const div5 = document.createElement("div");
                    div5.classList.add("progress");
                    div5.role = "progressbar";
                    div5.setAttribute("aria-label", "hrp");
                    div5.setAttribute("aria-valuenow", "50");
                    div5.setAttribute("aria-valuemin", "0");
                    div5.setAttribute("aria-valuemax", "100");
                    
                    const div6 = document.createElement("div");
                    div6.classList.add("progress-bar");
                    div6.style = `width: ${result.hrpScore}%`;
                    div6.innerText = `${result.hrpScore} points`;
                    
                    div5.appendChild(div6);
                    accordionBody.appendChild(div5);
                    
                    const p4 = document.createElement("p");
                    p4.classList.add("mb-0", "mt-3");
                    p4.innerText = `Spint-Drag-Carry (SDC): ${result.sdc.minutes}:${sdcSeconds} mins`;
                    accordionBody.appendChild(p4);
                    
                    const div7 = document.createElement("div");
                    div7.classList.add("progress");
                    div7.role = "progressbar";
                    div7.setAttribute("aria-label", "sdc");
                    div7.setAttribute("aria-valuenow", "50");
                    div7.setAttribute("aria-valuemin", "0");
                    div7.setAttribute("aria-valuemax", "100");
                    
                    const div8 = document.createElement("div");
                    div8.classList.add("progress-bar");
                    div8.style = `width: ${result.sdcScore}%`;
                    div8.innerText = `${result.sdcScore} points`;
                    
                    div7.appendChild(div8);
                    accordionBody.appendChild(div7);
                    
                    const p5 = document.createElement("p");
                    p5.classList.add("mb-0", "mt-3");
                    p5.innerText = `Plank (PLK): ${result.plk.minutes}:${plkSeconds} mins`;
                    accordionBody.appendChild(p5);
                    
                    const div9 = document.createElement("div");
                    div9.classList.add("progress");
                    div9.role = "progressbar";
                    div9.setAttribute("aria-label", "lt");
                    div9.setAttribute("aria-valuenow", "50");
                    div9.setAttribute("aria-valuemin", "0");
                    div9.setAttribute("aria-valuemax", "100");
                    
                    const div10 = document.createElement("div");
                    div10.classList.add("progress-bar");
                    div10.style = `width: ${result.plkScore}%`;
                    div10.innerText = `${result.plkScore} points`;
                    
                    div9.appendChild(div10);
                    accordionBody.appendChild(div9);
                    
                    const p6 = document.createElement("p");
                    p6.classList.add("mb-0", "mt-3");
                    p6.innerText = `Two-Mile Run (2MR): ${result.run.minutes}:${runSeconds} mins`;
                    accordionBody.appendChild(p6);
                    
                    const div11 = document.createElement("div");
                    div11.classList.add("progress");
                    div11.role = "progressbar";
                    div11.setAttribute("aria-label", "lt");
                    div11.setAttribute("aria-valuenow", "50");
                    div11.setAttribute("aria-valuemin", "0");
                    div11.setAttribute("aria-valuemax", "100");
                    
                    const div12 = document.createElement("div");
                    div12.classList.add("progress-bar");
                    div12.style = `width: ${result.runScore}%`;
                    div12.innerText = `${result.runScore} points`;
                    
                    div11.appendChild(div12);
                    accordionBody.appendChild(div11);
                    
                    accordionCollapse.appendChild(accordionBody);
                    accordionItem.appendChild(accordionCollapse);

                    passFailTestBarColoring(result.acft_id);

                });

                const testStatusBadge = document.querySelector(`#badge-${results[0].id}`);
                updateTestStatusColor(testStatusBadge, results[0].date, smallDot, newUser);

                const firstTestCardHeadder = document.querySelector(`#date-banner-${results[0].acft_id}`);
                firstTestCardHeadder.classList.remove("collapsed");
                const firstTestCardResults = document.querySelector(`#result-${results[0].acft_id}`);
                firstTestCardResults.classList.add("show");

            });
    } catch (err) {
        console.error(err);
    }
}

function formatDate(resultDate) {
    const date = new Date(resultDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}

function formatSeconds(seconds) {
    if (seconds < 10) {
        const twoDigitSeconds = `0${seconds}`;
        return twoDigitSeconds;
    }
    return seconds;
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
        newSpan.id = `badge-${acft_id}-status`;
        newSpan.classList.add("text-danger", "fst-italic");
        newSpan.textContent = "Failed";
        testCardHeadder.appendChild(newSpan);
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
        const progressBars = document.querySelectorAll(".progress-bar");
        let failedEvent = false;
        progressBars.forEach(progressBar => {
            if (progressBar.classList.contains("bg-danger")) {
                failedEvent = true;
            }
        });
        if (failedEvent) {
            elementObj.setAttribute("class", "");
            elementObj.classList.add("badge", "rounded-pill", "text-bg-danger", "mb-auto");
            elementObj.textContent = "Overdue";
            const userId = elementObj.dataset.userid;
            const userBtnBadge = document.querySelector(`#btn-${userId}-badge`);
            userBtnBadge.setAttribute("class", "");
            userBtnBadge.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "p-2", "bg-danger", "border", "border-light", "rounded-circle");

        } else if (parsedDate >= sixMonthsAgo) {
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

async function createNewUser(name, age, gender) {
    const payload = JSON.stringify({
        name: name,
        gender: gender,
        age: age 
    });
    const jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        const response = await fetch(`/api/acft/person`, {
            method: "POST",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            const user = await response.json();
            loadUserBtn(user[0].id);
        }
    } catch (err) {
        console.error(err);
    }
}

async function updateUser(id, name, age) {
    const payload = JSON.stringify({
        name: name,
        age: age 
    });
    console.log(payload);  //dev tool
    const jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        const response = await fetch(`/api/acft/person/${id}`, {
            method: "PATCH",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            let user = await response.json();
            console.log(user[0].id);  //dev tool
            const userBtn = document.querySelector(`#btn-${user[0].id}`);
            userBtn.remove();
            loadUserBtn(user[0].id);
            resultsContainer.innerHTML = '';
            loadUserCard(user[0].id);
        }
    } catch (err) {
        console.error(err);
    }
}

async function deleteUser(id) {
    console.log(`inside delete function ${id}`);
    try {
        const response = await fetch(`/api/acft/person/${id}`, {
            method: 'DELETE',
        });
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

async function createNewTest(age, person_id) {
    const form = document.querySelector("#acft-modal-body form");
    const mdlInput = form.querySelector("#mdl");
    const sptInput = form.querySelector("#spt");
    const hrpInput = form.querySelector("#hrp");
    const sdcInput = form.querySelector("#sdc");
    const sdcTime = sdcInput.value;
    const sdcTimeWithHrs = `00:${sdcTime}`;
    const plkInput = form.querySelector("#plk");
    const plkTime = plkInput.value;
    const plkTimeWithHrs = `00:${plkTime}`;
    const runInput = form.querySelector("#run");
    const runTime = runInput.value;
    const runTimeWithHrs = `00:${runTime}`;
    const dateInput = form.querySelector("#date");
    const payload = JSON.stringify({
        age: age,
        mdl: mdlInput.value,
        spt: sptInput.value,
        hrp: hrpInput.value,
        sdc: sdcTimeWithHrs,
        plk: plkTimeWithHrs,
        run: runTimeWithHrs,
        walk: null,
        nike: null,
        swim: null,
        kmrow: null,
        date: dateInput.value,
        person_id: person_id
    });
    console.log(payload);  //dev tool
    const jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        const response = await fetch(`/api/acft/test`, {
            method: "POST",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            const test = await response.json();
            console.log(test);  //dev tool
            const userBtn = document.querySelector(`#btn-${test[0].person_id}`);
            userBtn.remove();
            loadUserBtn(test[0].person_id);
            resultsContainer.innerHTML = '';
            loadUserCard(test[0].person_id);
            console.log(test[0].person_id);  //dev tool
        }
    } catch (err) {
        console.error(err);
    }
}

async function deleteACFT(acftId, userId) {
    try {
        const response = await fetch(`/api/acft/test/${acftId}`, {
            method: 'DELETE',
        });
        console.log(`Deleted test id ${acftId}`);  //dev tool
        const userBtn = document.querySelector(`#btn-${userId}`);
        userBtn.remove();
        loadUserBtn(userId);
        resultsContainer.innerHTML = '';
        loadUserCard(userId);
    } catch (err) {
        console.error(err);
    }
}

/* Future Feature */
// updateTest(12, 71, 64, "2023-03-16 08:45:00", 10);

async function updateTest(id, pushup_score, situp_score, date, person_id) {
    const payload = JSON.stringify({
        pushup_score: pushup_score,
        situp_score: situp_score,
        date: date,
        person_id: person_id
    });
    const jsonHeaders = new Headers({
        "Content-Type": "application/json"
    });
    try {
        const response = await fetch(`/api/acft/test/${id}`, {
            method: "PUT",
            body: payload,
            headers: jsonHeaders
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            const message = await response.text();
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }
}


/* Synch age input and scroll elements in New User form */
const ageModalInput = document.getElementById("user-age");
const ageModalScroll = document.getElementById("age-scroll-output");
ageModalInput.addEventListener("input", function() {
    ageModalScroll.innerHTML = ageModalInput.value;
});

/* Synch age input and scroll elements in Edit User form */
const editAgeModalInput = document.getElementById("edit-user-age");
const editAgeModalScroll = document.getElementById("edit-age-scroll-output");
editAgeModalInput.addEventListener("input", function() {
    editAgeModalScroll.innerHTML = editAgeModalInput.value;
});

/* Modal form actions when saving a New User */
const btnUserModalSave = document.getElementById("btn-modal-save");
btnUserModalSave.addEventListener("click", event => {
    const form = document.querySelector("#user-modal-body form");
    const nameInput = form.querySelector("#user-name");
    const ageInput = form.querySelector("#user-age");
    const genderInput = form.querySelector("#user-gender");
    const name = nameInput.value;
    const age = ageInput.value;
    const gender = genderInput.value;
    createNewUser(name, age, gender);
    document.getElementById("btn-modal-close-2").click();
})

/* Modal form actions when saving a New ACFT */
const btnACFTmodalSave = document.getElementById("btn-modal3-acft-save");
btnACFTmodalSave.addEventListener("click", event => {
    const age = btnACFTmodalSave.dataset.age;
    const id = btnACFTmodalSave.dataset.id;
    createNewTest(age, id);
    document.getElementById("btn-modal3-close-2").click();
})

/* Modal form actions when opening the Edit User form */
const editUserModal = document.querySelector("#editUserModal");
editUserModal.addEventListener("shown.bs.modal", event => {
    const editBtn = document.querySelector('[id^="btn-edit-"]');
    const editUserName = document.querySelector("#edit-user-name");
    editUserName.value = editBtn.dataset.name;
    editUserName.setAttribute("placeholder", editBtn.dataset.name);
    editAgeModalInput.value = editBtn.dataset.age;
    editAgeModalScroll.innerHTML = editBtn.dataset.age;
})

/* Modal form actions when saving the Edit User form */
const btnEditUserModalSave = document.getElementById("btn-modal2-edit-save");
btnEditUserModalSave.addEventListener("click", event => {
    const editBtn = document.querySelector('[id^="btn-edit-"]');
    const form = document.querySelector("#edit-user-modal-body form");
    const nameInput = form.querySelector("#edit-user-name");
    const ageInput = form.querySelector("#edit-user-age");
    const id = editBtn.dataset.id;
    const name = nameInput.value;
    const age = ageInput.value;
    updateUser(id, name, age);
    document.getElementById("btn-modal2-close-2").click();
})

/* Modal User delete confirmation */
const btnDeleteModalConfirm = document.getElementById("btn-modal4-confirm");
btnDeleteModalConfirm.addEventListener("click", event => {
    const id = btnDeleteModalConfirm.dataset.id;
    deleteUser(id);
    document.getElementById("btn-modal4-close").click();
})

/* MDL field validation */
const mdlInput = document.getElementById("mdl");
const mdlError = document.getElementById("mdl-error");

const mdlValidator = () => {
    const value = mdlInput.value;
    if (!value) {
        mdlError.textContent = "";
        return true;
    }
    const pattern = /^[0-9]+$/;
    if (!pattern.test(value)) {
        mdlError.textContent = "Invalid input. Please enter a positive number.";
        return false;
    }
    if (parseInt(value) < 0 || parseInt(value) > 500) {
        mdlError.textContent = "Invalid value (0 to 500)";
        return false;
    }
    mdlError.textContent = "";
    return true;
};

const mdlCleave = new Cleave(mdlInput, {
    numeral: true,
    numeralPositiveOnly: true,
    numeralIntegerScale: 10
});

mdlInput.addEventListener("blur", mdlValidator);
mdlInput.addEventListener("input", mdlValidator);

/* SPT field validation */
const sptInput = document.getElementById("spt");
const sptError = document.getElementById("spt-error");

const sptValidator = () => {
    const value = sptInput.value;
    if (!value) {
        mdlError.textContent = "";
        return true;
    }
    const pattern = /^([0-9]|1[0-9]|20)(\.[0-9])?$/;
    const isValid = pattern.test(value);
    if (!isValid) {
        sptError.textContent = "Invalid value (0.1 to 20)";
        return false;
    }
    sptError.textContent = "";
    return true;
};

const sptCleave = new Cleave(sptInput, {
    numeral: true,
    numeralDecimalMark: ".",
    numeralPositiveOnly: true,
    numeralDecimalScale: 1,
    max: 20,
});

sptInput.addEventListener("blur", sptValidator);
sptInput.addEventListener("input", sptValidator);

/* HRP field validation */
const hrpInput = document.getElementById("hrp");
const hrpError = document.getElementById("hrp-error");

const hrpValidator = () => {
    const value = hrpInput.value;
    if (!value) {
        hrpError.textContent = "";
        return true;
    }
    const pattern = /^[0-9]+$/;
    if (!pattern.test(value)) {
        hrpError.textContent = "Invalid input. Please enter a positive number.";
        return false;
    }
    if (parseInt(value) > 100) {
        hrpError.textContent = "Invalid value (0 to 100)";
        return false;
    }
    hrpError.textContent = "";
    return true;
};

const hrpCleave = new Cleave(hrpInput, {
    numeral: true,
    numeralPositiveOnly: true,
    numeralIntegerScale: 3,
    onValueChanged: function (e) {
        if (parseInt(e.target.rawValue) > 100) {
            e.target.setRawValue("100");
        }
    }
});

hrpInput.addEventListener("blur", hrpValidator);
hrpInput.addEventListener("input", hrpValidator);

/* SDC field validation */
const sdcInput = document.getElementById("sdc");
const sdcError = document.getElementById("sdc-error");

const sdcValidator = () => {
    const value = sdcInput.value;
    if (!value) {
        mdlError.textContent = "";
        return true;
    }
    const pattern = /^([0-5][0-9]):([0-5][0-9])$/;
    const [_, minutes, seconds] = pattern.exec(value) || [];
    if (!minutes || !seconds) {
        sdcError.textContent = "Invalid time format (mm:ss)";
        return false;
    }
    if (parseInt(minutes) > 59 || parseInt(seconds) > 59) {
        sdcError.textContent = "Invalid time range (max 59:59)";
        return false;
    }
    sdcError.textContent = "";
    return true;
};

const sdcCleave = new Cleave(sdcInput, {
    time: true,
    timePattern: ["m", "s"]
});

sdcInput.addEventListener("blur", sdcValidator);
sdcInput.addEventListener("input", sdcValidator);

/* PLK field validation */
const plkInput = document.getElementById("plk");
const plkError = document.getElementById("plk-error");

const plkValidator = () => {
    const value = plkInput.value;
    if (!value) {
        mdlError.textContent = "";
        return true;
    }
    const pattern = /^([0-5][0-9]):([0-5][0-9])$/;
    const [_, minutes, seconds] = pattern.exec(value) || [];
    if (!minutes || !seconds) {
        plkError.textContent = "Invalid time format (mm:ss)";
        return false;
    }
    if (parseInt(minutes) > 59 || parseInt(seconds) > 59) {
        plkError.textContent = "Invalid time range (max 59:59)";
        return false;
    }
    plkError.textContent = "";
    return true;
};

const plkCleave = new Cleave(plkInput, {
    time: true,
    timePattern: ["m", "s"]
});

plkInput.addEventListener("blur", plkValidator);
plkInput.addEventListener("input", plkValidator);

/* 2MR field validation */
const runInput = document.getElementById("run");
const runError = document.getElementById("run-error");

const runValidator = () => {
    const value = runInput.value;
    if (!value) {
        mdlError.textContent = "";
        return true;
    }
    const pattern = /^([0-5][0-9]):([0-5][0-9])$/;
    const [_, minutes, seconds] = pattern.exec(value) || [];
    if (!minutes || !seconds) {
        runError.textContent = "Invalid time format (mm:ss)";
        return false;
    }
    if (parseInt(minutes) > 59 || parseInt(seconds) > 59) {
        runError.textContent = "Invalid time range (max 59:59)";
        return false;
    }
    const formattedValue = `${minutes}:${seconds}`;
    console.log(formattedValue);
    runInput.value = formattedValue;
    runError.textContent = "";
    return true;
};

const runCleave = new Cleave(runInput, {
    time: true,
    timePattern: ["m", "s"],
    onValueChanged: runValidator
});

runInput.addEventListener("blur", runValidator);
runInput.addEventListener("input", runValidator);

/* ACFT date validation */
const dateInput = document.getElementById("date");
const dateError = document.getElementById("date-error");

const dateValidator = () => {
    const value = dateInput.value;
    const currentDate = new Date();
    const inputDate = new Date(value);
    if (isNaN(inputDate.getTime())) {
        dateError.textContent = "Invalid date format (yyyy-mm-dd)";
        return false;
    }
    if (inputDate > currentDate) {
        dateError.textContent = "Invalid date (cannot be in the future)";
        return false;
    }
    dateError.textContent = "";
    return true;
};

const dateCleave = new Cleave(dateInput, {
    date: true,
    datePattern: ["Y", "m", "d"],
    delimiter: "-",
    onValueChanged: dateValidator
});

/* Modal New User form top 'close' button */
const btnModalClose1 = document.getElementById("btn-modal-close-1");
btnModalClose1.addEventListener("click", event => {
    ageModalInput.value = ageModalInput.defaultValue;
    ageModalScroll.innerHTML = ageModalInput.value;
    const form = document.querySelector("#user-modal-body form");
    form.reset();
})

/* Modal New User form bottom 'close' button */
const btnModalClose2 = document.getElementById("btn-modal-close-2");
btnModalClose2.addEventListener("click", event => {
    ageModalInput.value = ageModalInput.defaultValue;
    ageModalScroll.innerHTML = ageModalInput.value;
    const form = document.querySelector("#user-modal-body form");
    form.reset();
})

/* Modal Edit User form top 'close' button */
const btnModal2Close1 = document.getElementById("btn-modal2-close-1");
btnModal2Close1.addEventListener("click", event => {
    editAgeModalInput.value = editAgeModalInput.defaultValue;
    editAgeModalScroll.innerHTML = editAgeModalInput.value;
    const form = document.querySelector("#edit-user-modal-body form");
    form.reset();
})

/* Modal Edit User form bottom 'close' button */
const btnModal2Close2 = document.getElementById("btn-modal2-close-2");
btnModal2Close2.addEventListener("click", event => {
    editAgeModalInput.value = editAgeModalInput.defaultValue;
    editAgeModalScroll.innerHTML = editAgeModalInput.value;
    const form = document.querySelector("#edit-user-modal-body form");
    form.reset();
})

/* Modal New ACFT form top 'close' button */
const btnModal3Close1 = document.getElementById("btn-modal3-close-1");
btnModal3Close1.addEventListener("click", event => {
    const form = document.querySelector("#acft-modal-body form");
    form.reset();
    const spans = document.querySelectorAll("#acft-modal-body span");
    spans.forEach(span => {
        span.innerText = '';
    });
})

/* Modal New ACFT form bottom 'close' button */
const btnModal3Close2 = document.getElementById("btn-modal3-close-2");
btnModal3Close2.addEventListener("click", event => {
    const form = document.querySelector("#acft-modal-body form");
    form.reset();
    const spans = document.querySelectorAll("#acft-modal-body span");
    spans.forEach(span => {
        span.innerText = '';
    });
})

/* Dark Mode switch */
darkModeSwitch.addEventListener("change", (event) => {
    if (event.target.checked) {
        const htmlTag = document.querySelector('html');
        htmlTag.setAttribute('data-bs-theme', 'dark');
    } else {
        const htmlTag = document.querySelector('html');
        htmlTag.removeAttribute('data-bs-theme');
    }
});

const attributionDiv = document.createElement("div");
attributionDiv.classList.add("d-flex", "justify-content-center");
const attribution = document.createElement("p");
attribution.classList.add("text-secondary", "text-center", "mb-1");
attribution.style.fontSize = "10px";
attribution.innerHTML = "By Will Franceschini<br>A Galvanize bootcamp project<br>Logo credits: www.vecteezy.com";
const footerDiv = document.querySelector("#footerDiv")
attributionDiv.appendChild(attribution);
footerDiv.appendChild(attributionDiv);

const gitHubDiv = document.createElement("div");
const gitHubLogo = document.createElement("img");
gitHubLogo.src = "./github-mark.png";
gitHubLogo.style.display = "block";
gitHubLogo.style.width = "2rem";
gitHubLogo.style.margin = "0.5rem auto";
gitHubDiv.appendChild(gitHubLogo);
document.body.append(gitHubDiv);

gitHubLogo.addEventListener("click", () => {
        window.open("https://github.com/tech-n-code", "_blank");
    });
gitHubLogo.addEventListener("mouseover", () => {
        gitHubLogo.style.cursor = "pointer";
    });

const linkedInDiv = document.createElement("div");
const linkedInLogo = document.createElement("img");
linkedInLogo.src = "https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=Linkedin&logoColor=white";
linkedInLogo.style.display = "block";
linkedInLogo.style.margin = "0.5rem auto";
linkedInDiv.appendChild(linkedInLogo);
document.body.append(linkedInDiv);

linkedInLogo.addEventListener("click", () => {
        window.open("https://www.linkedin.com/in/will-franceschini/", "_blank");
    });
linkedInLogo.addEventListener("mouseover", () => {
        linkedInLogo.style.cursor = "pointer";
    });