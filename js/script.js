"use strict";
const menuButton = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (menuButton && mobileNav) {
  function closeMenu(restoreFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute(
      "aria-label",
      opening ? "メニューを閉じる" : "メニューを開く",
    );
  });
  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!mobileNav.hidden && !event.target.closest(".site-header")) closeMenu();
  });
  matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
