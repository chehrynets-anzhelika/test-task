import IMask from 'imask';
import Notiflix from 'notiflix';

const input = document.querySelector(".recall-input");
const recall = document.querySelector(".recall-button");

const mask = new IMask(input, {
  mask: "+{38\\0}(00)000-00-00",
  lazy: false,
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbyRLL8Ffd4VES60ifbsu3kgPy2ZbftVRok6OVsjk9IBQYNvyygZWOMyuMdanlLAnUh3tQ/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault();
  Notiflix.Loading.standard("Sending your number...");
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      mask.value = "";
      Notiflix.Loading.remove();
      Notiflix.Notify.success("OK! We will contact you soon!");
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Oops! Something went wrong.");
      console.error('Error!', error.message)
    })
})

recall.addEventListener("click", recallHandler);
input.addEventListener("input", phoneInputHandler);


function phoneInputHandler() {
  mask.masked.isComplete ? recall.classList.add("recall-button--active") : recall.classList.remove("recall-button--active");
  recall.classList.contains("recall-button--active") ? recall.removeAttribute("disabled") : recall.setAttribute("disabled", true);
}

function recallHandler() {
  console.log(`Ready! We will contact you soon by phone number ${mask.value}`);
  recall.classList.remove("recall-button--active");
}