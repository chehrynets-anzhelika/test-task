import getCheckedCheckboxes from "../handlers/getCheckedCheckboxes";
import getNameBasket from "../handlers/getNameBasket";
import clearAllCheckboxes from "../handlers/clearAllCheckboxes";
import getFormattedDate from "../handlers/getFormattedDate";

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

const scriptURL = 'https://script.google.com/macros/s/AKfycbwOZuacm_0EGWawmcP6D2AnAUrIysG5XDolOK72dtd2Err90KJscata8IwQUowScGxCuA/exec';

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allFieldsValid = true;
    for (let field in fields) {
        if (!fields[field].input.validity.valid) {
            showError(fields[field].input, fields[field].error, fields[field].messages);
            allFieldsValid = false;
        }
    }

    if (allFieldsValid) {
        let formData = new FormData(form);
        let arrOfIdCheckboxes = getCheckedCheckboxes();
        let arrNamesOfBasket = getNameBasket(arrOfIdCheckboxes);
        let namesBasket = arrNamesOfBasket.join(', ');
        let formattedDate = getFormattedDate();
        formData.append('namesBasket', namesBasket);
        formData.append('date', formattedDate);

        fetch(scriptURL, { method: 'POST', body: formData, mode: "no-cors"})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));
        console.log(`Data received.
        ${namesBasket}
        Full name: ${fields.fullName.input.value}
        Email: ${fields.mail.input.value}
        Card: ${fields.card.input.value}
        Comments: ${document.querySelector(".order-pop-up-form__item--comments").value}`);
        document.querySelector(".order-pop-up-form__item--comments").value = "";
        for(let field in fields) {
            fields[field].error.textContent = "";
            fields[field].input.value = "";
        }
        clearAllCheckboxes();
    }
});





