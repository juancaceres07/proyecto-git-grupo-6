// ===== Integrante C: funcionalidades JavaScript =====
document.addEventListener("DOMContentLoaded", () => {
  menuMovil();
  anioPie();
  filtrarProductos();
  validarFormulario();
});

// 1) Menú hamburguesa (móvil)
function menuMovil() {
  const boton = document.getElementById("btnMenu");
  const nav = document.getElementById("nav");
  if (!boton || !nav) return;
  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
  });
}

// 2) Año automático en el pie de página
function anioPie() {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
}

// 3) Filtros por categoría + buscador (página Menú)
function filtrarProductos() {
  const productos = document.querySelectorAll(".producto");
  if (!productos.length) return;
  const botones = document.querySelectorAll(".filtro");
  const buscador = document.getElementById("buscador");
  const vacio = document.getElementById("sinResultados");
  let categoria = "todos";

  function aplicar() {
    const texto = buscador.value.trim().toLowerCase();
    let visibles = 0;
    productos.forEach(p => {
      const coincideCat = categoria === "todos" || p.dataset.categoria === categoria;
      const coincideTxt = p.textContent.toLowerCase().includes(texto);
      const mostrar = coincideCat && coincideTxt;
      p.hidden = !mostrar;
      if (mostrar) visibles++;
    });
    vacio.hidden = visibles > 0;
  }

  botones.forEach(b => b.addEventListener("click", () => {
    botones.forEach(x => x.classList.remove("activo"));
    b.classList.add("activo");
    categoria = b.dataset.filtro;
    aplicar();
  }));
  buscador.addEventListener("input", aplicar);
}

// 4) Validación del formulario (página Contacto)
function validarFormulario() {
  const form = document.getElementById("formulario");
  if (!form) return;
  const mensaje = document.getElementById("mensaje");
  const contador = document.getElementById("contador");
  const exito = document.getElementById("exito");

  mensaje.addEventListener("input", () => contador.textContent = mensaje.value.length);

  function marcar(id, texto) {
    const campo = document.getElementById(id);
    document.getElementById("error-" + id).textContent = texto;
    campo.closest(".campo").classList.toggle("invalido", texto !== "");
    return texto === "";
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const personas = form.personas.value;
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    const okNombre = marcar("nombre", nombre.length >= 3 ? "" : "Escribe tu nombre completo (mínimo 3 letras).");
    const okCorreo = marcar("correo", correoValido ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com.");
    const okPersonas = marcar("personas", personas ? "" : "Selecciona cuántas personas serán.");

    if (okNombre && okCorreo && okPersonas) {
      exito.textContent = `¡Gracias, ${nombre.split(" ")[0]}! Reservamos para ${personas} persona(s). Te escribiremos a ${correo}.`;
      exito.hidden = false;
      form.reset();
      contador.textContent = 0;
    } else {
      exito.hidden = true;
    }
  });
}
