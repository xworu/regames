window.addEventListener("DOMContentLoaded", () => {

    const btnReg = document.getElementById('registration_btn'),
          form = document.querySelector('form');
          nickname = form.querySelector('#nickname'),
          password = form.querySelector('#password');

    btnReg.addEventListener('click', () => {
        window.location.pathname = '/src/html/registration.html';
    });

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (nickname.value == "" || password.value == "") {
            alert("Введите свои данные");
        } else if (/\s/.test(nickname.value)) {
            alert("Не используйте пробел в никнейме")
        } else if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?_"]).*$/.test(password.value)) {
            alert("Пароль должен быть длиной не менее 8 символов, содержать хотя бы одну строчную и прописную латинские буквы, цифру и специальный символ: '!#$%&?_'")
        } else {

            getResource('http://localhost:3000/users')
                .then(data => {
                    data.forEach(obj => {
                        if (obj.nickname == nickname.value && obj.password == password.value) {
                            window.location.pathname = '/src/html/rating.html';
                            window.location.search = `?id=${data.id}`;
                            form.reset();
                        } else if (obj.nickname == nickname.value && obj.password != password.value) {
                            alert('Не правильно введен пароль');
                        } else {
                            alert('Пользователя с таким именем не существует');
                        }
                    });
                });
        }

    });
})