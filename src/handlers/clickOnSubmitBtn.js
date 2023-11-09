export default function getValueForm(...data) {

  data.forEach(item => {
    item.addEventListener("input", () => {
        item.setCustomValidity("");
        item.checkValidity();
    });
  })

  data.forEach(item => {
    item.addEventListener("invalid", () => {
        if(item.value === "") {
            item.setCustomValidity(`Enter your ${item.name}`);
        }
        else {
            item.setCustomValidity(`You entered the data incorrectly`);
        }
    });
  });
}
