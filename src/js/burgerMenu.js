import clickOnHeaderMenu from "../handlers/clickOnHeaderMenu.js";

const openMenuClick = document.querySelector(".header-menu");
const headerNavList = document.querySelector(".header-nav");
const mainTag = document.querySelector(".main");

openMenuClick.addEventListener("click", () => {
openMenuClick.classList.toggle("header-menu--open");
clickOnHeaderMenu(openMenuClick, mainTag);
headerNavList.classList.toggle("header-nav-selected-menu");
});