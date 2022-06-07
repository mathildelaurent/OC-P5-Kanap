console.log("connectée");

// Rechercher de l'id dans le local storage //
const orderStorage = localStorage.getItem('order');
console.log(orderStorage);

// Insertion du num de commande (ID) dans HTML //
var dataId = document.createTextNode(orderStorage);
document.getElementById('orderId').appendChild(dataId);

localStorage.clear('order');