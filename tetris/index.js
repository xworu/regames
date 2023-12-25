import Game from './src/game.js';
import View from './src/view.js';
import Controller from './src/controller.js';

window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector('#root');

    const game = new Game();
    const view = new View(root, 420, 420, 11, 11);
    const controller = new Controller(game, view);

    const header = new URL(document.location).searchParams;

    window.game = game;
    window.view = view;
    window.controller = controller;

    const restart = document.querySelector('#restart');
    const goback = document.querySelector('#goback');

    restart.addEventListener('click', () => {
        window.location = `http://regames/tetris/index.html?id=${header.get("id")}`;
    })

    goback.addEventListener('click', () => {
        window.location = `http://regames/src/html/games.html?id=${header.get("id")}`;
    })
})