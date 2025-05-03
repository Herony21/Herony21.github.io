let total = 0;
let contador = 0;
const lista = document.getElementById("lista-carrito");
const totalText = document.getElementById("total");
const contadorText = document.getElementById("contador-carrito");
const contadorFlotante = document.getElementById("contador-flotante");

window.onload = function () {
  const guardado = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!lista || !totalText) {
    console.error("No se encontró el carrito o el total.");
    return;
  }

  if (lista.children.length === 0) {
    total = 0;
    contador = 0;
    guardado.forEach(({ nombre, precio }) => {
      agregarProducto(nombre, precio, false);
    });
  }
};

function agregarProducto(nombre, precio, guardar = true) {
  const item = document.createElement("li");
  item.textContent = `${nombre} - S/ ${precio}`;
  lista.appendChild(item);

  total += precio;
  contador++;

  totalText.textContent = `Total: S/ ${total}`;
  contadorText.textContent = `(${contador} ítems)`;

  if (contadorFlotante) {
    contadorFlotante.textContent = contador;
  }

  if (guardar) {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  }
}

function vaciarCarrito() {
  lista.innerHTML = "";
  total = 0;
  contador = 0;
  totalText.textContent = "Total: S/ 0";
  contadorText.textContent = "(0 ítems)";
  contadorFlotante.textContent = "0";
  localStorage.removeItem("carrito");
}

function irAlCarrito() {
  const carrito = document.querySelector(".carrito");
  if (carrito) {
    carrito.scrollIntoView({ behavior: "smooth" });
  }
}

function logout() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.registro.html";
}

window.addEventListener("DOMContentLoaded", function () {
  const productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  const contenedor = document.querySelector(".grid-productos");

  if (!contenedor) return;

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "producto";
    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>S/${producto.precio.toFixed(2)}</p>
      <button onclick="agregarProducto('${producto.nombre}', ${producto.precio}, true)">Agregar al carrito</button>
    `;
    contenedor.appendChild(tarjeta);

    function mostrarResumenCarrito() {
      const carrito = document.querySelector(".carrito");
      if (carrito) {
        carrito.scrollIntoView({ behavior: "smooth" });
      }
    }        
  });
});
