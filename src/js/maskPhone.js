import IMask from 'imask';

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