window.addEventListener("DOMContentLoaded", () => {

    const btnLogin = document.getElementById('login_btn'),
          form = document.querySelector('form'),
          name = form.querySelector('#name'),
          surname = form.querySelector('#surname'),
          nickname = form.querySelector('#nickname'),
          password = form.querySelector('#password');

    btnLogin.addEventListener('click', () => {
        window.location = 'http://regames/src/html/login.html';
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
                            k += 1;
                        }
                    });
                    if (k == 0) {
                        createUser(form);
                    }
                }).finally(() => {
                    form.reset();
                })
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
        formData.append("points", 0);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/users', json)
        .then(data => {
            window.location = `http://regames/src/html/rating.html?id=${data.id}`;
        }).catch(() => {
            alert("Что-то пошло не так");
        }).finally(() => {
            form.reset();
        })
    }
})