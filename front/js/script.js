console.log("connectée");

async function donneesAPI(){
    const resultatsAPI = await fetch("http://localhost:3000/api/products");
    const reponseJS = await resultatsAPI.json();
    console.log(reponseJS);
    console.log(reponseJS[4]);
    let numberOfProducts = reponseJS.length;
    const items = document.getElementById("items");
    console.log(items);
    
    for (let object of reponseJS) {
      var a = document.createElement('a');
      a.href = "./product.html?id=42";
      items.appendChild(a);

      var article = document.createElement('article');
      a.appendChild(article);

      var img = document.createElement('img');
      img.src = object.imageUrl;
      img.alt = object.altTxt;
      article.appendChild(img);

      var name = document.createElement('h3');
      var text = document.createTextNode(object.name);
      name.appendChild(text);
      name.classList.add("productName");
      article.appendChild(name);

      var description = document.createElement('p');
      var textDescription = document.createTextNode(object.description);
      description.appendChild(textDescription);
      description.classList.add("productDescription");
      article.appendChild(description);
    }
}

donneesAPI();
    
        

