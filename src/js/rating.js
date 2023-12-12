window.addEventListener("DOMContentLoaded", () => {

    const name = document.querySelector("#name"),
          nickname = document.querySelector("#nickname");

    const id = new URL(document.location).searchParams;

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
                if (obj.id = id) {
                    name.innerHTML = obj.surname + " " + obj.name;
                    nickname.innerHTML = obj.nickname;
                }
            });
        });

    // if (header.get("info") !== "404") {
    //   info.innerHTML += `${header.get("info")}`;
    // } else if (header.get("info") === "404") {
    //   info.innerHTML = "Ошибка 404! Данной страницы не существует";
    // }

})