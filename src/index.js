import "./index.html";
import "./index.scss";
import clickOnHeaderMenu from "./handlers/clickOnHeaderMenu";
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
arrLinks.forEach(link => link.addEventListener("click", (e) => {
    if(!link.href.startsWith("tel:")) {
        e.preventDefault();
    }
}));


const input = document.querySelector(".recall-input");
const recall = document.querySelector(".recall-button");

const mask = new IMask(input, {
    mask: "+{38\\0}(00)000-00-00",
    lazy: false,
});

recall.addEventListener("click", recallHandler);
input.addEventListener("input", phoneInputHandler);


function phoneInputHandler() {
    mask.masked.isComplete ? recall.classList.add("recall-button--active") : recall.classList.remove("recall-button--active");
    recall.classList.contains("recall-button--active") ? recall.removeAttribute("disabled") : recall.setAttribute("disabled", true);
}

function recallHandler() {
       console.log(`Ready! We will contact you soon by phone number ${mask.value}`);
       mask.value="";
       recall.classList.remove("recall-button--active");
}


let orderBtn = document.querySelector(".catalog-button");
let closePopUpBtn = document.querySelector(".order-pop-up-close");
let popup = document.querySelector(".order-pop-up");
//let newUrl= "order";

orderBtn.addEventListener("click", () => {
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
    // history.pushState(null,null, newUrl);
} );

closePopUpBtn.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
    // let currentUrl = window.location.href;
    // console.log(currentUrl);
    // if(currentUrl.includes("/order")) {
    //     currentUrl = currentUrl.replace("/order", "");
    //     history.pushState(null, null, currentUrl);
    // }
});


// SUBMIT FORM

const form = document.querySelector(".order-pop-up-form");

let fields = {
    fullName: {
        input: document.querySelector(".order-pop-up-form__item--full-name"),
        error: document.querySelector("#full-name + span.order-pop-up-form__item--error"),
        messages: {
            valueMissing: "Please enter your full name.",
            patternMismatch: "Enter the full name separated by a space. Only letters are allowed."
        }
    },
    mail: {
        input: document.querySelector(".order-pop-up-form__item--email"),
        error: document.querySelector("#email + span.order-pop-up-form__item--error"),
        messages: {
            valueMissing: "The email address must be completed.",
            typeMismatch: "This doesn't look like the correct email."
        }
    },
    card: {
        input: document.querySelector(".order-pop-up-form__item--card"),
        error: document.querySelector("#card + span.order-pop-up-form__item--error"),
        messages: {
            valueMissing: "Enter your card number consisting of 16 digits.",
            patternMismatch: `Must be 16 digits. Enter numbers only.`
        }
    }
};

function validateField(field) {
    let input = field.input;
    let error = field.error;

    input.addEventListener("input", () => {
        if(input.validity.valid) {
            error.textContent = "Good!";
            error.className = "order-pop-up-form__item--error active-true";
            input.title = "";
        } else {
            showError(input, error, field.messages);
        }
    });

    form.addEventListener("submit", (e) => {
        if(!input.validity.valid) {
            showError(input, error, field.messages);
            e.preventDefault();
        }
    });
}

function showError(input, errorElement, messages) {
    if(input.validity.valueMissing) {
        errorElement.textContent = messages.valueMissing;
    } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
        errorElement.textContent = messages.typeMismatch || messages.patternMismatch;
    } else {
        errorElement.textContent = "";
    }
    
    errorElement.className = "order-pop-up-form__item--error active";
}

for(let fieldName in fields) {
    validateField(fields[fieldName]);
}





