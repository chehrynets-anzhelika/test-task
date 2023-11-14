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
