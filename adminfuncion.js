const user = localStorage.getItem("usuarioActivo");
if (user !== "admin") {
  alert("Acceso restringido.");
  window.location.href = "sharkblack.html";
}

function agregarProductoAdmin() {
  const nombre = document.getElementById("nombreProducto").value.trim();
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const imagenInput = document.getElementById("imagenProducto");

  if (!nombre || isNaN(precio) || !imagenInput.files.length) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imagenBase64 = reader.result;

    const productosGuardados = JSON.parse(localStorage.getItem("productosAdmin")) || [];
    productosGuardados.push({ nombre, precio, imagen: imagenBase64 });

    localStorage.setItem("productosAdmin", JSON.stringify(productosGuardados));
    alert("✅ Producto agregado correctamente.");

    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
    imagenInput.value = "";

    mostrarProductosEnTabla();
  };

  reader.readAsDataURL(imagenInput.files[0]);
}

function mostrarProductosEnTabla() {
  const lista = document.getElementById("tablaProductos");
  lista.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="50" /></td>
      <td>${producto.nombre}</td>
      <td>S/ ${producto.precio}</td>
      <td><button onclick="eliminarProducto(${index})" class="btn-vaciar">Eliminar</button></td>
    `;

    lista.appendChild(fila);
  });
}

function eliminarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  productos.splice(index, 1);
  localStorage.setItem("productosAdmin", JSON.stringify(productos));
  mostrarProductosEnTabla();
}
window.onload = () => {
  mostrarProductosEnTabla();
};
