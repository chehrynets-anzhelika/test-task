export default function getCheckedCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    let checkedCheckboxes = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox.id);
        }
    });
    return checkedCheckboxes;
}

