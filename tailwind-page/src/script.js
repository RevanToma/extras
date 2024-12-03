const button = document.getElementById("menu-button"),
  menuContent = document.getElementById("menu-content"),
  menuCloseBtn = document.getElementById("menu-close"),
  overLay = document.getElementById("overlay");

button.addEventListener("click", () => {
  menuContent.classList.toggle("hidden");
  overLay.classList.toggle("hidden");
});

menuCloseBtn.addEventListener("click", () => {
  menuContent.classList.toggle("hidden");
  overLay.classList.toggle("hidden");
});

overLay.addEventListener("click", () => {
  menuContent.classList.toggle("hidden");
  overLay.classList.toggle("hidden");
});
