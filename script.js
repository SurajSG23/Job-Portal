function Redirect(){
    window.location.href = "components/homepage.html"
}
document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll(".menu-button");

  menuButtons.forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      closeAllMenus();
      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
      }
    });

    button.addEventListener("keydown", (e) => {
      const submenu = button.nextElementSibling;
      if (e.key === "ArrowDown" && submenu) {
        e.preventDefault();
        button.setAttribute("aria-expanded", "true");
        submenu.querySelector("a, .menu-button")?.focus();
      }
      if (e.key === "Escape") {
        closeAllMenus();
        button.focus();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-nav")) {
      closeAllMenus();
    }
  });

  function closeAllMenus() {
    menuButtons.forEach(btn => btn.setAttribute("aria-expanded", "false"));
  }
});
