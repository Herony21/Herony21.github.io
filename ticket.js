if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("Error: jsPDF no se ha cargado correctamente.");
 
  }
  
  async function generarTicket() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const usuario = localStorage.getItem("usuarioActivo") || "Invitado";
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const fecha = new Date().toLocaleString();
    const codigoTicket = Math.floor(100000 + Math.random() * 900000);
  
    const logo = await getImageBase64("img/logo-sharkblack.png");
    const qr = await getImageBase64("img/qr_sharkblack_cliente.png");

    doc.addImage(logo, "PNG", 90, 10, 30, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Usuario: ${usuario}`, 20, 60);
    doc.text(`Fecha: ${fecha}`, 20, 68);

    doc.setFontSize(12);
    doc.text("Productos:", 20, 78);
    let y = 88;
    let total = 0;
  
    carrito.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.nombre}`, 25, y);
      doc.text(`S/ ${item.precio}`, 160, y, { align: "right" });
      y += 8;
      total += item.precio;
    });
  
    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text(`Total: S/ ${total.toFixed(2)}`, 20, y + 10);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Código de Ticket: #${codigoTicket}`, 20, y + 20);
  
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Gracias por tu compra en SHARKBLACK GAMING", 105, y + 35, {
      align: "center",
    });

    doc.addImage(qr, "PNG", 85, y + 40, 40, 40);
  
    doc.save("ticket_sharkblack.pdf");
  }
  
  function getImageBase64(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = url;
    });
  }
  
  function mostrarResumenCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const resumen = document.getElementById("resumen-modal");
    const total = document.getElementById("total-modal");
    resumen.innerHTML = "";
    let suma = 0;
  
    carrito.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - S/ ${item.precio}`;
      resumen.appendChild(li);
      suma += item.precio;
    });
  
    total.textContent = `Total: S/ ${suma}`;
    document.getElementById("carrito-modal").classList.remove("oculto");
  }
  
  function cerrarModal() {
    document.getElementById("carrito-modal").classList.add("oculto");
  }
  
  function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.remove("oculto");
    toast.classList.add("visible");
  
    setTimeout(() => {
      toast.classList.remove("visible");
      toast.classList.add("oculto");
    }, 3000);
  }
  