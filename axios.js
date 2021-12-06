"use strict";


const getOutput = document.querySelector("#getOutput");

const printUser = function (user) {

    const card = document.createElement("div");
    card.classList.add("card");

    const userPic = document.createElement("img");
    userPic.setAttribute("src", user.avatar);
    userPic.classList.add("card-img-top");
    card.appendChild(userPic);

    const cardBod = document.createElement("div");
    cardBod.classList.add("card-body");

    const userName = document.createElement("h3");
    userName.classList.add("card-title");
    userName.innerText = user.first_name + ` ${user.last_name}`;
    cardBod.appendChild(userName);

    const idPara = document.createElement("p");
    idPara.classList.add("card-text");
    idPara.innerText = `id: ${user.id}`;
    cardBod.appendChild(idPara);

    const emailPara = document.createElement("p");
    emailPara.classList.add("card-text");
    emailPara.innerText = user.email;
    cardBod.appendChild(emailPara);

    card.appendChild(cardBod);
    getOutput.appendChild(card);

}

const getUsers = function () {
    axios.get("https://reqres.in/api/users?page=2")
        .then(res => {
            const users = res.data.data;

            for (let user of users) {
                printUser(user);
            }
        }
        ).catch(err => console.error(err));
}
window.onload = getUsers;

const singleUser = function () {
    debugger;
    axios.get("https://reqres.in/api/users/2")
        .then(res => {
            const user = res.data.data;
            printUser(user);
        }
        ).catch(err => console.error(err));
}

const createUser = function(newName,newJob) {
    const newUser = {
        firstName: newName,
        job: newJob
    }
    axios.post("https://reqres.in/api/users", newUser)
    .then(res => {
        getUsers()
    })
    .catch(err => console.error(err))
}

document.querySelector("#userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const newUser = {
        name: this.firstName.value,
        job: this.job.value
    }
    axios.post("https://reqres.in/api/users", newUser)
    .then(res => {
        console.log(res);
        this.reset();
    })
    .catch(err => console.error(err))
});

document.querySelector("#registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const registration = {
        email: this.email.value,
        password: this.password.value
    }
    axios.post("https://reqres.in/api/register", registration)
    .then(res => {
        console.log(res);
        this.reset();
    })
    .catch(err => console.error(err))
});

document.querySelector("#loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const credentials = {
        email: this.emailL.value,
        password: this.passwordL.value
    }
    axios.post("https://reqres.in/api/login", credentials)
    .then(res => {
        console.log(res);
        this.reset();
    })
    .catch(err => console.error(err))
});