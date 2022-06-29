console.log("connectée");

// Rechercher de l'id dans l'URL' //
let urlParam =  new URLSearchParams(window.location.search);
let dataOrderId = urlParam.get('orderid');

// Insertion du numéro de commande //
let orderId = document.createTextNode(dataOrderId);
document.getElementById('orderId').appendChild(orderId);
