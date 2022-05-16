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
    console.log(text);

    // Insertion du prix //
    var price = document.createTextNode(reponseJS.price);
    document.getElementById('price').appendChild(price);

    // Insertion de la despcription //
    var description = document.createTextNode(reponseJS.description);
    document.getElementById('description').appendChild(description);

    // Inserction des options de couleurs //
    var colorOption = reponseJS.colors;
    for (let color of colorOption) {
        var option = document.createElement('option');
        var optionText = document.createTextNode(color);
        option.appendChild(optionText);
        document.getElementById('colors').appendChild(option);
    }
}
productSearch();







