function login() {
    const user = document.getElementById("login-user").value;
    const pass = document.getElementById("login-pass").value;
    const registrados = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    const existe = registrados.find(u => u.usuario === user && u.clave === pass);
    if (existe) {
      localStorage.setItem("usuarioActivo", user);
      window.location.href = "sharkblack.html";
    } else {
      mostrarMensaje("Usuario o contraseña incorrectos");
    }
  }
  
  function registrar() {
    const user = document.getElementById("register-user").value;
    const pass = document.getElementById("register-pass").value;
    const registrados = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    const yaExiste = registrados.find(u => u.usuario === user);
    if (yaExiste) {
      mostrarMensaje("Ese usuario ya existe");
      return;
    }
  
    registrados.push({ usuario: user, clave: pass });
    localStorage.setItem("usuarios", JSON.stringify(registrados));
    mostrarMensaje("¡Registro exitoso! Ahora puedes iniciar sesión.", "green");
  }
  
  function mostrarMensaje(texto, color = "red") {
    const mensaje = document.getElementById("mensaje");
    mensaje.style.color = color;
    mensaje.textContent = texto;
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

  function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.registro.html";
  }
  
  