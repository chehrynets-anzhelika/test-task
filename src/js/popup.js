import getPopUp from "../handlers/getPopUp";
import closePopUp from "../handlers/closePopup";

let orderBtn = document.querySelector(".catalog-button");
let closePopUpBtn = document.querySelector(".order-pop-up-close");
let popup = document.querySelector(".order-pop-up");

getPopUp(orderBtn, popup);

closePopUpBtn.addEventListener("click", () => {
    closePopUp(popup);
});

popup.addEventListener("click", (e) => {
    if (e.target.tagName !== "SECTION") return false;
    closePopUp(popup);
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && popup.style.display == "block") {
        closePopUp(popup);
    }
});

let basketOnHeader = document.querySelector(".header-basket");
let basketOnSelectedMenu = document.getElementById("basket-selected-menu");
getPopUp(basketOnHeader, popup);
getPopUp(basketOnSelectedMenu, popup);