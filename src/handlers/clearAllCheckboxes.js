export default function clearAllCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}