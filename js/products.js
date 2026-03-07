// Obtener el id del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {

  try {

    // Cargar productos desde JSON
    const response = await fetch("./products.json");
    const products = await response.json();

    // Buscar el producto actual
    const product = products.find(p => p.id === productId);

    if (!product) {
      document.querySelector(".product-container").innerHTML =
        "<p>Producto no encontrado</p>";
      return;
    }

    /* =========================
       PRODUCTO PRINCIPAL
    ========================== */

    const mainImage = document.getElementById("productImage");
    const name = document.getElementById("productName");
    const price = document.getElementById("productPrice");
    const description = document.getElementById("productDescription");
    const attributesList = document.getElementById("productAttributes");

    if(mainImage) mainImage.src = product.images[0];
    if(mainImage) mainImage.alt = product.name;

    if(name) name.textContent = product.name;

    if(price){
      price.textContent =
        `${product.currency} ${product.price.toLocaleString()}`;
    }

    if(description){
      description.textContent = product.description;
    }

    /* =========================
       ATRIBUTOS
    ========================== */

    if(attributesList){

      attributesList.innerHTML = "";

      product.attributes.forEach(attr => {

        const li = document.createElement("li");
        li.textContent = attr;

        attributesList.appendChild(li);

      });

    }

    /* =========================
       GALERÍA DE IMÁGENES
    ========================== */

    const thumbnailsContainer = document.getElementById("thumbnailContainer");

    if(thumbnailsContainer && product.images){

      thumbnailsContainer.innerHTML = "";

      product.images.forEach(img => {

        const thumb = document.createElement("img");

        thumb.src = img;
        thumb.classList.add("thumbnail");

        thumb.addEventListener("click", () => {
          mainImage.src = img;
        });

        thumbnailsContainer.appendChild(thumb);

      });

    }

    /* =========================
       PRODUCTOS RELACIONADOS
    ========================== */

    const relatedContainer = document.getElementById("relatedProducts");

    if(relatedContainer){

      relatedContainer.innerHTML = "";

      // Excluir el producto actual
      const related = products.filter(p => p.id !== productId).slice(0,3);

      related.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("related-card");

        card.innerHTML = `
          <img src="${item.images[0]}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>${item.currency} ${item.price.toLocaleString()}</p>
          <a href="product-detail.html?id=${item.id}">
            <button class="btn">Ver producto</button>
          </a>
        `;

        relatedContainer.appendChild(card);

      });

    }

  } catch (error) {

    console.error("Error cargando productos:", error);

  }

}

// Ejecutar función
loadProduct();