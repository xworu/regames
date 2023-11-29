const btnLogin = document.getElementById('login_btn'),
      form = document.querySelector('form');
      name = form.querySelector('#name'),
      surname = form.querySelector('#surname'),
      nickname = form.querySelector('#nickname'),
      password = form.querySelector('#password');

btnLogin.addEventListener('click', () => {
    window.location.pathname = '/src/html/login.html';
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
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

        getRequest.addEventListener('load', () => {  // отслеживает статус готовности нашего запроса в данный конкретный момент 
            if (getRequest.status === 200) {

                const users = JSON.parse(getRequest.response);
                let k = 0;

                users.forEach(user => {
                    if (user.nickname == nickname.value) {
                        alert('Пользователь с таким ником уже сущестует');
                        k += 1;
                    }
                });

                if (k == 0) {
                    createUser(form);
                } else {
                    form.reset();
                }
            }
        });
    }
    
});

function createUser(form) {
    const postRequest = new XMLHttpRequest();
    postRequest.open('POST', '../server.php');
    postRequest.setRequestHeader('Content-type', 'application/json');

    const formData = new FormData(form);

    const user = {};
    formData.forEach(function(value, key){
        user[key] = value;
    });

    postRequest.send(JSON.stringify(user));

    postRequest.addEventListener('load', () => {
        if (postRequest.status === 200) {
            console.log(postRequest.response);
            form.reset();
        }
    })

    // const userId = 'User' + createId(users);
    // users[userId] = user;
    // const users = JSON.parse(getRequest.response);
}

// событие change срабатывет, когда объект уходит из фокуса
// событие input происходит каждый раз, когда что-то вводится в input или удаляется из него

//   status - показывает статус запроса
//   statusText - текстовое описание ответа от сервера
//   response - ответ от сервера
//   readyState - текущее состояние запроса