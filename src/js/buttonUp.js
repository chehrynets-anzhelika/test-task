const buttonUp = document.createElement("button");
buttonUp.className = "btn-up btn-up_hide";
buttonUp.title = "Back to top";
const main = document.querySelector(".main");
let scrolling = false;


window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrolling && scrollY > 0) return;
    scrolling = false;
    scrollY > 400 ? showButtonUp() : hideButtonUp();
});

function showButtonUp() {
    main.append(buttonUp);
    if (buttonUp.classList.contains("btn-up_hide") && !buttonUp.classList.contains("btn-up_hiding")) {
        buttonUp.classList.remove("btn-up_hide");
        buttonUp.classList.add("btn-up_hiding");
        window.setTimeout(() => {
            buttonUp.classList.remove("btn-up_hiding");
        }, 300);
    }
}

function hideButtonUp() {
    if (buttonUp.classList.contains("btn-up_hide") && !buttonUp.classList.contains("btn-up_hiding")) {
        buttonUp.classList.add("btn-up_hiding");
    }
    window.setTimeout(() => {
        buttonUp.classList.add("btn-up_hide");
        buttonUp.classList.remove("btn-up_hiding");
    }, 300);
}

buttonUp.addEventListener("click", () => {
    scrolling = true;
    hideButtonUp();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
});