
document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.getElementById("container-productos");
    const totalPriceElement = document.getElementById("total-price");
    const cartListElement = document.getElementById("cart-list");
    const clearCartButton = document.getElementById("vaciar-carrito");
    let totalPrice = 0;
    let cartItems = [];

    if (localStorage.getItem("cartItems")) {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
        renderCart();
        }

    fetch('/products.json')
        .then(response => response.json())
        .then(products => {

            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
            <img src="${product.img}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p>${product.desc}</p>
            <p>Precio: $${product.precio}</p>
            <button class="add-to-cart" data-id="${product.id}" data-price="${product.precio}">Agregar al carrito</button>
          `;
                productContainer.appendChild(productElement);
            });


            const addToCartButtons = document.querySelectorAll(".add-to-cart");


            addToCartButtons.forEach(button => {
                button.addEventListener("mouseover", function () {
                    this.style.backgroundColor = getRandomColor();
                });

                button.addEventListener("mouseout", function () {
                    this.style.backgroundColor = "";
                });
            });


            addToCartButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const productId = parseInt(this.getAttribute("data-id"));
                    const productPrice = parseInt(this.getAttribute("data-price"));
                    const selectedProduct = products.find(product => product.id === productId);
                    updateTotalPrice(productPrice);
                    addToCart(selectedProduct);;
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));


    function updateTotalPrice(price) {
        totalPrice += price;
        totalPriceElement.textContent = totalPrice;
    }


    function addToCart(product) {
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
        renderCart();
    }


    function renderCart() {
        cartListElement.innerHTML = "";
        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.nombre;
            cartListElement.appendChild(li);
        });
    }


    clearCartButton.addEventListener("click", function () {
        cartItems = [];
        totalPrice = 0;
        totalPriceElement.textContent = totalPrice;
        localStorage.removeItem("cartItems");
        renderCart();;
    });


    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});