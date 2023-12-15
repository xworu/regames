window.addEventListener("DOMContentLoaded", () => {

    const name = document.querySelector("#name"),
          nickname = document.querySelector("#nickname"),
          points = document.querySelector(".my_point"),
          gamesBtn = document.querySelector("#btn");

    const header = new URL(document.location).searchParams;

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    getResource('http://localhost:3000/users')
        .then(data => {
            data.forEach(obj => {
                if (obj.id = header.get("id")) {
                    name.innerHTML = obj.surname + " " + obj.name;
                    nickname.innerHTML = obj.nickname;
                    if (obj.points / 1000 > 0) {
                        points.innerHTML = obj.points / 1000 + " " + obj.points % 1000;
                    } else {
                       points.innerHTML = obj.points; 
                    }
                }
            });
        });

    gamesBtn.addEventListener("click", () => {
        window.location = `http://regames/src/html/games.html?id=${header.get("id")}`;
    })
})