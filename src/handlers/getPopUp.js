export default function getPopUp(element, popup) {
    element.addEventListener("click", () => {
        popup.style.display = "block";
        document.body.style.overflow = "hidden";
    })
}