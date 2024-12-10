const menuToggle = document.getElementById("menu-toggle"),
   menu = document.getElementById("menu")

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

