const customers = document.querySelector("#customers");
let main = document.querySelector(".main");
let backAside = document.querySelector(".back-aside__item");
const aside = document.querySelector(".aside");

customers.addEventListener("click", () => {
    if (window.innerWidth <= 640) {
        main.style.display = "block";
        aside.style.display = "none";
        backAside.style.display = "block";
    }
});


backAside.addEventListener("click", () => {
        aside.style.display = "block";
        main.style.display = "none";
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 640) {
        main.style.display = "block";
        backAside.style.display = "none";

    }
});