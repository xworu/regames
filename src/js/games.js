window.addEventListener("DOMContentLoaded", () => {

    const btn_reg = document.querySelector('.avatar_reg'),
          btn_login = document.querySelector('.avatar_login');
          tetris = document.querySelector('#tetris'),
          points = document.querySelector('.my_point');

    const header = new URL(document.location).searchParams;

    btn_reg.addEventListener('click', () => {
        window.location = 'http://regames/src/html/registration.html';
    })

    tetris.addEventListener('click', () => {
        window.location = 'http://regames/tetris/index.html';
    })

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    if (header == "") {
        document.querySelector(".header_reg").style.display = "flex";
        document.querySelector(".header_login").style.display = "none";
    } else {
        document.querySelector(".header_reg").style.display = "none";
        document.querySelector(".header_login").style.display = "flex";

        getResource('http://localhost:3000/users')
        .then(data => {
            data.forEach(obj => {
                if (obj.id = header.get("id")) {
                    if (obj.points / 1000 > 0) {
                        points.innerHTML = obj.points / 1000 + " " + obj.points % 1000;
                    } else {
                       points.innerHTML = obj.points; 
                    }
                }
            });
        });

        btn_login.addEventListener('click', () => {
            window.location = `http://regames/src/html/rating.html?id=${header.get("id")}`;
        })
    }
})