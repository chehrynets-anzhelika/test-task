let orderBtn = document.querySelector(".catalog-button");
let closePopUpBtn = document.querySelector(".order-pop-up-close");
let popup = document.querySelector(".order-pop-up");

orderBtn.addEventListener("click", () => {
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
} );

closePopUpBtn.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
});