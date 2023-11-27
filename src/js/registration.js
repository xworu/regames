const btnLogin = document.getElementById('login_btn'),
      name = document.querySelector('#name'),
      surname = document.querySelector('#surname'),
      nickname = document.querySelector('#nickname'),
      password = document.querySelector('#password'),
      submit = document.querySelector('#submit');

btnLogin.addEventListener('click', () => {
    window.location.pathname = '/src/html/login.html';
})

let users = {};

function User(name, surname, nickname, password) {
    this.name = name;
    this.surname = surname;
    this.nickname = nickname;
    this.password = password;
}

function createId(users) {
    return Object.keys(users).length;
}

submit.addEventListener('click', () => {
    if (name.value == "" || surname.value == "" || nickname.value == "" || password.value == "") {
        alert("Введите свои данные");
    } else if (!/^[a-zA-Z]+$/.test(name.value)) {
        alert("Некорректно введенное имя");
    } else if (!/^[a-zA-Z]+$/.test(surname.value)) {
        alert("Некорректно введенная фамилия");
    } else if (/\s/.test(nickname.value)) {
        alert("Не используйте пробел в никнейме")
    } else if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?_"]).*$/.test(password.value)) {
        alert("Пароль должен быть длиной не менее 8 символов, содержать хотя бы одну строчную и прописную латинские буквы, цифру и специальный символ: '!#$%&?_'")
    } else {
        createUser();
    }
    
})

function createUser() {
    const nameUser = name.value;
    const surnameUser = surname.value;
    const nicknameUser = nickname.value;
    const passwordUser = password.value;
    
    const user = new User(nameUser, surnameUser, nicknameUser, passwordUser);

    const userId = 'User' + createId(users);
    users[userId] = user;

    console.log(users);
}