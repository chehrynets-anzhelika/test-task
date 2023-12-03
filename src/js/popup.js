import getPopUp from "../handlers/getPopUp";

let orderBtn = document.querySelector(".catalog-button");
let closePopUpBtn = document.querySelector(".order-pop-up-close");
let popup = document.querySelector(".order-pop-up");

getPopUp(orderBtn, popup);

closePopUpBtn.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
});

popup.addEventListener("click", (e) => {
    if (e.target.tagName !== "SECTION") return false;
    popup.style.display = "none";
    document.body.style.overflow = "auto";
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && popup.style.display == "block") {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

let basketOnHeader = document.querySelector(".header-basket");
let basketOnSelectedMenu = document.getElementById("basket-selected-menu");
getPopUp(basketOnHeader, popup);
getPopUp(basketOnSelectedMenu, popup);