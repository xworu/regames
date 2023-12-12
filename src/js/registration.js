window.addEventListener("DOMContentLoaded", () => {

    const btnLogin = document.getElementById('login_btn'),
          form = document.querySelector('form');
          name = form.querySelector('#name'),
          surname = form.querySelector('#surname'),
          nickname = form.querySelector('#nickname'),
          password = form.querySelector('#password');

    btnLogin.addEventListener('click', () => {
        window.location.pathname = '/src/html/login.html';
    })

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (name.value == "" || surname.value == "" || nickname.value == "" || password.value == "") {
            alert("Введите свои данные");
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(name.value)) {
            alert("Некорректно введенное имя");
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(surname.value)) {
            alert("Некорректно введенная фамилия");
        } else if (/\s/.test(nickname.value)) {
            alert("Не используйте пробел в никнейме")
        } else if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?_"]).*$/.test(password.value)) {
            alert("Пароль должен быть длиной не менее 8 символов, содержать хотя бы одну строчную и прописную латинские буквы, цифру и специальный символ: '!#$%&?_'")
        } else {

            let k = 0;

            getResource('http://localhost:3000/users')
                .then(data => {
                    data.forEach(obj => {
                        if (obj.nickname == nickname.value) {
                            alert('Пользователь с таким ником уже сущестует');
                            form.reset();
                            k += 1;
                        }
                    });
                    if (k == 0) {
                        createUser(form);
                    }
                });
        }

    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };


    function createUser(form) {

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/users', json)
        .then(data => {
            console.log(data);
            // window.location.pathname = '/src/html/rating.html';
        }).catch(() => {
            console.log("Что-то пошло не так");
        }).finally(() => {
            form.reset();
        })
    }
})




// событие change срабатывет, когда объект уходит из фокуса
// событие input происходит каждый раз, когда что-то вводится в input или удаляется из него

//   status - показывает статус запроса
//   statusText - текстовое описание ответа от сервера
//   response - ответ от сервера
//   readyState - текущее состояние запроса



// filter

// const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

// const shortNames = names.filter((name) => {
//     return name.length < 5;
// });

// console.log(shortNames);


// map

// let answers = ['IvAn', 'AnnA', 'Hello'];

// answers = answers.map(item => item.toLowerCase());

// console.log(answers);


// every/some

// const some = [4, 5, 7];

// console.log(some.some(item => typeof(item) === 'number'));

// console.log(some.every(item => typeof(item) === 'number'));


// reduce

// const arr = [4, 5, 1, 3, 2, 6];

// const res = arr.reduce((sum, current) => sum + current);

// console.log(res);