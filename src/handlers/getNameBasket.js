export default function getNameBasket(arr) {
    let names = arr.map((item) => {
         if(item === "order-checkbox1") {
            return "Cabbage Basket";
         } else if(item === "order-checkbox2") {
            return "Tomato Basket";
         } else if(item === "order-checkbox3") {
            return "Vegetables Basket";
         } 
    });
    return names;
};