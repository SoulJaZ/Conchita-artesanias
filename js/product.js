// Esperar a que cargue la página
document.addEventListener("DOMContentLoaded", loadProducts);



async function loadProducts() {

  try {

    // Obtener productos del JSON
    const response = await fetch("./products.json");
    const products = await response.json();

    // Seleccionar contenedor
    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    // Crear una card por cada producto
    products.forEach(product => {

      
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p class="price">
          ${product.currency} ${product.price.toLocaleString()}
        </p>

        <p>${product.description}</p>

        <a href="product-detail.html?id=${product.id}">
          <button class="btn">Ver más</button>
        </a>
      `;

      container.appendChild(card);

    });

  } catch (error) {

    console.error("Error cargando productos:", error);

  }

}
  // Menú móvil.
      const toogle = document.querySelector(".menu-toggle");
      const nav = document.querySelector(".nav-links");

      toogle.addEventListener("click", () => {
        nav.classList.toggle("show")
      })