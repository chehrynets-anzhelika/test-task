import getPopUp from "../handlers/getPopUp";

let orderBtn = document.querySelector(".catalog-button");
let closePopUpBtn = document.querySelector(".order-pop-up-close");
let popup = document.querySelector(".order-pop-up");

// orderBtn.addEventListener("click", () => {
//     popup.style.display = "block";
//     document.body.style.overflow = "hidden";
// } );
getPopUp(orderBtn, popup);

closePopUpBtn.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
});

let basketOnHeader = document.querySelector(".header-basket");
let basketOnSelectedMenu = document.getElementById("basket-selected-menu");
getPopUp(basketOnHeader, popup);
getPopUp(basketOnSelectedMenu, popup);