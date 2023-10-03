import "./index.html";
import "./index.scss";
import clickOnHeaderMenu from "./handlers/clickOnHeaderMenu";

const openMenuClick = document.querySelector(".header-menu");
const headerNavList = document.querySelector(".header-nav");
const mainTag = document.querySelector(".main");

openMenuClick.addEventListener("click", () => {
openMenuClick.classList.toggle("header-menu--open");
clickOnHeaderMenu(openMenuClick, mainTag);
headerNavList.classList.toggle("header-nav-selected-menu");
});

let links = document.getElementsByTagName("a");
let arrLinks = [...links];
arrLinks.forEach(link => link.addEventListener("click", (e) => {
e.preventDefault();
}));