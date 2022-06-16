console.log("connectée");

const originalData = JSON.parse(localStorage.getItem('monPanier')); // Je converti aux valeurs d'origine //

// Recherche des API //
async function productSearch() {
   
    // Pour chaque kanap de mon panier //
    var totalPrice = 0;
    for (let kanap of originalData) {
        let idKanap = kanap.id; // Je vais chercher l'ID de cet objet //
        let productCard = "http://localhost:3000/api/products/"+idKanap; // Je récupère l'API correspondant à cet ID //
        const promise = await fetch(productCard);
        const reponseJS = await promise.json();

        // Insertion de la balise <article> //
        var article = document.createElement('article');
        article.setAttribute('class', 'cart__item');
        article.setAttribute('data-id', idKanap);
        article.setAttribute('data-color', kanap.colors);
        document.getElementById('cart__items').appendChild(article);

        // Insertion de la DIV cart__item__img //
        var divImg = document.createElement('div');
        divImg.setAttribute('class', 'cart__item__img');
        article.appendChild(divImg);

        // Insertion de l'image produit //
        var image = document.createElement('img');
        image.src = reponseJS.imageUrl;
        divImg.appendChild(image);

        // Insertion de la DIV cart__item__content //
        var divContent = document.createElement('div');
        divContent.setAttribute('class', 'cart__item__content');
        article.appendChild(divContent);

        // Insertion de la DIV cart__item__content__description //
        var divDescription = document.createElement('div');
        divDescription.setAttribute('class', 'cart__item__content__description');
        divContent.appendChild(divDescription);

        // Insertion H2 - Nom du produit //
        var title = document.createElement('h2');
        var name = document.createTextNode(reponseJS.name);
        title.appendChild(name);
        divDescription.appendChild(title);
        
        // Insertion de la couleur choisie //
        var pColor = document.createElement('p');
        var color = document.createTextNode(kanap.colors);
        pColor.appendChild(color);
        divDescription.appendChild(pColor);

        // Insertion du prix //
        var pPrice = document.createElement('p');
        var price = document.createTextNode(reponseJS.price + " €");
        pPrice.appendChild(price);
        divDescription.appendChild(pPrice);
        totalPrice = totalPrice + (kanap.quantity * reponseJS.price);

        // Insertion de la DIV cart__item__content__settings //
        var divSettings = document.createElement('div');
        divSettings.setAttribute('class', 'cart__item__content__settings');
        divContent.appendChild(divSettings);

        // Insertion de la DIV cart__item__content__settings__quantity //
        var divQuantity = document.createElement('div');
        divQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
        divSettings.appendChild(divQuantity);

        // Insertion de la quantité //
        var qtty = document.createElement('p');
        var text = document.createTextNode('Qté : ');
        qtty.appendChild(text);
        divQuantity.appendChild(qtty);

        // Insertion de l'input //
        var input = document.createElement('input');
        input.setAttribute('type', "number");
        input.setAttribute('class', 'itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', kanap.quantity);
        divQuantity.appendChild(input);

        // Insertion de la DIV cart__item__content__settings__delete //
        var divDelete = document.createElement('div');
        divDelete.setAttribute('class', 'cart__item__content__settings__delete');
        divSettings.appendChild(divDelete);

        // Insertion du "bouton" supprimer //
        var pDelete = document.createElement('p');
        pDelete.setAttribute('class', 'deleteItem');
        pDelete.setAttribute('id', idKanap);
        pDelete.setAttribute('color', kanap.colors);
        var deleteBtn = document.createTextNode('supprimer');
        pDelete.appendChild(deleteBtn);
        divDelete.appendChild(pDelete); 
        
    }
    // Insertion de la quantité totale //
    var totalQuantity = document.createTextNode(quantityCalculation());
    document.getElementById('totalQuantity').appendChild(totalQuantity);

    // Insertion du montant total //
    var totalAmount = document.createTextNode(totalPrice);
    document.getElementById('totalPrice').appendChild(totalAmount);

    deleteProduct();
    quantityModification();

}
productSearch();

// Calcul de la quantité d'articles//

function quantityCalculation() {
    let sumQuantity = 0;
    for (let item of originalData) {
        sumQuantity += Number(item.quantity);
       
    }
    return sumQuantity;
}

// Activation bouton supprimer //
const deleteProduct = async (productSearch) => {
    await productSearch; // On récupère les données de la fonction productSearch;
    let deleteBtn = document.querySelectorAll('.deleteItem');
    for (let btn of deleteBtn) {
        btn.addEventListener('click', function(e) {
            let productCard = e.target.closest("article"); // Rechercher la balise article la plus proche //
            let newBasket = [];
            for (let object of originalData) {
                if(productCard.dataset.id != object.id || productCard.dataset.color != object.colors) { // Je garde le panier si l'id est diff ou si couleur est différente //
                    newBasket.push(object);
                }
            }
            localStorage.setItem('monPanier', JSON.stringify(newBasket));
            window.location.href = window.location.href;
        })
    }
}

// Modification de la quantité //
function quantityModification() {
    let btnQuantity = document.querySelectorAll('.itemQuantity');

    for (let btn of btnQuantity) {
        btn.addEventListener("change", function(e) {
            let productCard = e.target.closest("article");
            let newBasket = [];
            for (let object of originalData) {
                let initialQuantity = parseFloat(object.quantity);
                let quantityChange = parseFloat(btn.value);
                if (initialQuantity != quantityChange && productCard.dataset.id == object.id && productCard.dataset.color == object.colors) {
                    object.quantity = quantityChange; 
                }
                newBasket.push(object);
            }
            localStorage.setItem('monPanier', JSON.stringify(newBasket));
            window.location.href = window.location.href;
        })
    }
}

    btnOrder = document.getElementById('order');
    btnOrder.addEventListener('click', function(e) {
        e.preventDefault();
        let idProduct = [];
        let emailTextError = document.getElementById('emailErrorMsg').innerText;
        let firstNameTextError = document.getElementById('firstNameErrorMsg').innerText;
        let lastNameTextError = document.getElementById('lastNameErrorMsg').innerText;
        let addressTextError = document.getElementById('addressErrorMsg').innerText;
        let cityTextError = document.getElementById('cityErrorMsg').innerText;

        for (let object of originalData) {
            idProduct.push(object.id);
        }
        let formData = {
            'contact' : {
                'firstName': document.getElementById('firstName').value,
                'lastName': document.getElementById('lastName').value,
                'address' : document.getElementById('address').value,
                'city': document.getElementById('city').value,
                'email': document.getElementById('email').value,
            },
            'products': idProduct,
        };

        if(emailTextError == "" && email.value != "" 
            && firstNameTextError == "" && firstName.value != ""
            && lastNameTextError == "" && lastName.value != ""
            && addressTextError == "" && address.value != ""
            && cityTextError == "" && city.value != "") {
            fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            .then((res) => res.json())
            .then((data) => {
                localStorage.clear('monPanier');
                localStorage.setItem('order', data.orderId);
                document.location.href = 'confirmation.html';
            }); 
        };
    });

    // Validation de l'email //
    let email = document.getElementById('email');
    email.addEventListener('change', function() {
        validEmail(this);
    });

    const validEmail = function(input) {
        // Création de la regexp pour la validation email //
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
        let testEmail = emailRegExp.test(input.value);
        let text = input.nextElementSibling;

        if(testEmail == false) { // Si le test est faux //
            text.innerHTML = 'Adresse email non valide'; // Mettre une phrase de non validité //
            email.onchange = reStart;
            function reStart() {
                text.innerHTML = "";
            }
        }else{ 
            testEmail = true;
        };
        if(email.value == "") {
            alert('Un champ est resté vide');
        }
        return testEmail;
    };

    // Validation du prénom //
    let prenom = document.getElementById('firstName');
    prenom.addEventListener('change', function() {
        validFirstName(this);
    });

    const validFirstName = function(input) {
        let firstNameRegExp = new RegExp('[A-Z][A-Za-z\é\è\ê\ç\-]+$');
        let testFirstName = firstNameRegExp.test(input.value);
        let textFirstName = input.nextElementSibling;

        if(testFirstName == false) {
            textFirstName.innerHTML = "Ce prénom n'en est pas un !";
            prenom.onchange = reStart;
            function reStart() {
                textFirstName.innerHTML = "";
            };
        }else{
            testFirstName = true;
        }
        return testFirstName;
    };

    // Validation du nom //
    let nom = document.getElementById('lastName');
    nom.addEventListener('change', function() {
        validLastName(this);
    });

    const validLastName = function(input) {
        let lastNameRegExp = new RegExp('[A-Z][A-Za-z\é\è\ê\'\ç\-]+$');
        let testLastName = lastNameRegExp.test(input.value);
        let textLastName = input.nextElementSibling;

        if(testLastName == false) {
            textLastName.innerHTML = "Il y a un soucis avec votre nom de famille !";
            nom.onchange = reStart;
            function reStart() {
                textLastName.innerHTML = "";
            };
        }else{
            testLastName = true;
        }
        return testLastName;
    };

    // Validation de l'adresse //
    let adresse = document.getElementById('address');
    adresse.addEventListener('change', function() {
        validAddress(this);
    });

    const validAddress = function(input) {
        let addressRegExp = new RegExp("^[0-9]{1,3} [a-z A-Z]{3,25}$");
        let testAddress = addressRegExp.test(input.value);
        let textAddress = input.nextElementSibling;

        if(testAddress == false) {
            textAddress.innerHTML = "L'adresse n'est pas reconnue. Essayez de la saisir sans ponctuation!";
            adresse.onchange = reStart;
            function reStart() {
                textAddress.innerHTML = "";
            };
        }else{
            testAddress = true;
        }
        return testAddress;
    };

    // Validation de la ville //
    let ville = document.getElementById('city');
    ville.addEventListener('change', function() {
        validCity(this);
    });

    const validCity = function(input) {
        let cityRegExp = new RegExp("[A-Z][A-Za-z\é\è\ê\'\-]+$");
        let testCity = cityRegExp.test(input.value);
        let textCity = input.nextElementSibling;

        if(testCity == false) {
            textCity.innerHTML = "Cette ville n'est pas reconnue !";
            ville.onchange = reStart;
            function reStart() {
                textCity.innerHTML = "";
            };
        }else{
            testCity = true;
        }
        return testCity;
    }











