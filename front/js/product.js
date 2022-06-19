console.log("connectée");

// Recherche de l'ID dans l'URL //
var urlParam =  new URLSearchParams(window.location.search);
var idParam = urlParam.get('id'); 

// Recherche de l'API suivant l'ID produit //
async function productSearch() {
    let productCard = "http://localhost:3000/api/products/"+idParam;
    const promise = await fetch(productCard);
    const reponseJS = await promise.json();

    // Insertion de l'élément img //
    var img = document.createElement('img');
    img.src = reponseJS.imageUrl;
    img.alt = reponseJS.altTxt;
    document.querySelector('.item__img').appendChild(img);

    // Insertion du nom du produit //
    var text = document.createTextNode(reponseJS.name);
    document.getElementById('title').appendChild(text);

    // Insertion du prix //
    var price = document.createTextNode(reponseJS.price);
    document.getElementById('price').appendChild(price);

    // Insertion de la despcription //
    var description = document.createTextNode(reponseJS.description);
    document.getElementById('description').appendChild(description);

    // Insertion des options de couleurs //
    var colorOption = reponseJS.colors;
    for (let color of colorOption) {
        var option = document.createElement('option');
        var optionText = document.createTextNode(color);
        option.appendChild(optionText);
        document.getElementById('colors').appendChild(option);
    }
}
productSearch();

// Stockage des données dans le stockage local //
const btn = document.getElementById('addToCart');

class item {
    constructor(id, quantity, colors) {
        this.id = id;
        this.quantity = quantity;
        this.colors = colors;
    }
}

btn.addEventListener('click', function() { // Au clic sur le bouton //

    if(quantity.value <= 0) {
        alert("Vous n'avez pas sélectionné la quantité");
    }else if(colors.value == "") {
        alert("Vous n'avez pas choisi de couleur");
    }else{
        if (localStorage.getItem('monPanier')==null) { // s'il n'y a rien dans le panier //
            let newItem = new item(idParam, quantity.value, colors.value); // Je crée un nouvel item //
            let totalOrder = [newItem]; // Je mets ce premier canapé dans un tableau //
            const storageConversion = JSON.stringify(totalOrder); // Je converti en chaine de caractère //
            localStorage.setItem('monPanier', storageConversion); // Je place tout ce beau monde ds le stock //
            
        } else { // sinon (s'il y a déja qqc dans le panier) //
            let exist = false;
            let originalData = JSON.parse(localStorage.getItem('monPanier')); // je convertis en données d'origine //
            for (let object of originalData) { // pour chaque objet du tableau javascript //
                if(object.id == idParam && object.colors == colors.value) { // Si l'id du tableau est la meme que l'id de l'objet et que la couleur de l'ojet est la meme que la couleur choisie //
                    let initialQuantity = parseFloat(object.quantity);
                    let newQuantity = parseFloat(quantity.value);
                    object.quantity = initialQuantity + newQuantity; //Je modifie la quantité de l'ojet en additionnant les 2 //
                    exist = true; // l'objet existe dans le tableau (il est ajouté) //
                } 
            } 
            if(exist == false) { // Si l'objet n'existe pas dans le tableau //
                let newItem = new item(idParam, quantity.value, colors.value); // Je crée un nouvel item //
                originalData.push(newItem);
            }
            let strings = JSON.stringify(originalData);
            localStorage.setItem('monPanier', strings);
    }
    alert("Produit(s) ajouté(s) au panier");
    }
});




















