import "./index.html";
import "./index.scss";
import clickOnHeaderMenu from "./handlers/clickOnHeaderMenu";
import clickOnOrderBtn from "./handlers/clickOnOrderBtn";
import IMask from 'imask';
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
arrLinks.forEach(link => link.addEventListener("click", e => {
  if (!link.href.startsWith("tel:")) {
    e.preventDefault();
  }
}));
const input = document.querySelector(".recall-input");
const recall = document.querySelector(".recall-button");
const mask = new IMask(input, {
  mask: "+{38\\0}(00)000-00-00",
  lazy: false
});
recall.addEventListener("click", recallHandler);
input.addEventListener("input", phoneInputHandler);
function phoneInputHandler() {
  mask.masked.isComplete ? recall.classList.add("recall-button--active") : recall.classList.remove("recall-button--active");
  recall.classList.contains("recall-button--active") ? recall.removeAttribute("disabled") : recall.setAttribute("disabled", true);
}
function recallHandler() {
  console.log(`Ready! We will contact you soon by phone number ${mask.value}`);
  mask.value = "";
  recall.classList.remove("recall-button--active");
}
let orderBtn = document.querySelector(".catalog-button");
orderBtn.addEventListener("click", () => {
  clickOnOrderBtn(mainTag);
});