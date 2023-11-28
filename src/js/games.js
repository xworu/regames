const btn = document.querySelector('.avatar'),
      tetris = document.querySelector('#tetris');

btn.addEventListener('click', () => {
    window.location.pathname = '/src/html/registration.html';
})

tetris.addEventListener('click', () => {
    window.location.pathname = '/tetris/index.html';
})