console.log("connectée");

// Récupération des données API //
async function apiDatas() {
  const promise = await fetch("http://localhost:3000/api/products");
  const reponseJS = await promise.json();
  
  // Implémentation du code dynamique //
  const items = document.getElementById('items');
  console.log(items);
  
  for (let object of reponseJS) {

    // Création élément a //
    var a = document.createElement('a');
    a.href = `./product.html?id=${object._id}`;
    items.appendChild(a);

    // Création balise <article> //
    var article = document.createElement('article');
    a.appendChild(article);

    // Création élément img //
    var img = document.createElement('img');
    img.src = object.imageUrl;
    img.alt = object.altTxt;
    article.appendChild(img);

    // Création élément H3 //
    var name = document.createElement('h3');
    var text = document.createTextNode(object.name);
    name.appendChild(text);
    name.classList.add = "productName";
    article.appendChild(name);

    // Création élément p //
    var description = document.createElement('p');
    var textDescription = document.createTextNode(object.description);
    description.appendChild(textDescription);
    description.classList.add = "productDescription";
    article.appendChild(description);
  }
}

apiDatas();

