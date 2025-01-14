const menuButton = document.getElementById('menu-button');
const menuContent = document.getElementById('menu-content');
const overlay = document.getElementById('overlay');
const menuClose = document.getElementById('menu-close');
const theme = document.getElementById('theme');

menuButton.addEventListener('click', () => {
 menuContent.classList.remove('hidden');
 overlay.classList.remove('hidden');
});

const closeMenu = () => {
 menuContent.classList.add('hidden');
 overlay.classList.add('hidden');
};

menuClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
