const btnLogin = document.getElementById('login_btn'),
      name = document.querySelector('#name'),
      surname = document.querySelector('#surname'),
      nickname = document.querySelector('#nickname'),
      password = document.querySelector('#password'),
      submit = document.querySelector('#submit');

btnLogin.addEventListener('click', () => {
    window.location.pathname = '/src/html/login.html';
})


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
        const getRequest = new XMLHttpRequest();

        getRequest.open('GET', '../json/users.json');
        getRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        getRequest.send();  

        getRequest.addEventListener('readystatechange', () => {  // отслеживает статус готовности нашего запроса в данный конкретный момент 
            if (getRequest.readyState === 4 && getRequest.status === 200) {

                const users = JSON.parse(getRequest.response);
                let k = 0;

                users.forEach(user => {
                    if (user.nickname == nickname.value) {
                        alert('Пользователь с таким ником уже сущестует');
                        k += 1;
                    }
                });

                if (k == 0) {
                    createUser();
                }
            }
        });
    }
    
});

function createUser() {
    const nameUser = name.value;
    const surnameUser = surname.value;
    const nicknameUser = nickname.value;
    const passwordUser = password.value;
    
    const user = new User(nameUser, surnameUser, nicknameUser, passwordUser);

    // const postRequest = new XMLHttpRequest();

    // postRequest.open('POST', '/src/json/users.json');
    // postRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // postRequest.send(JSON.stringify(user));

}

// событие change срабатывет, когда объект уходит из фокуса
// событие input происходит каждый раз, когда что-то вводится в input или удаляется из него

//   status - показывает статус запроса
//   statusText - текстовое описание ответа от сервера
//   response - ответ от сервера
//   readyState - текущее состояние запроса