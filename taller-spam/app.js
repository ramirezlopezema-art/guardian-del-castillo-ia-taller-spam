// =====================================================================
// app.js - La página del detective. NO necesitas editar este archivo.
//
// Solo usa la API de modelo.js:
//   entrenar(datos)                 -> modelo
//   clasificar(texto, modelo)       -> { etiqueta, probSpam, aportes }
//   evaluar(modelo, prueba)         -> { exactitud, vp, fp, vn, fn, total, errores }
// y los datos de datos.js: ENTRENAMIENTO y PRUEBA.
// =====================================================================

// ---------- Estado de la página ----------
const estado = {
  modelo: null,
  ejemplosPropios: [],                         // ejemplos que el usuario enseña
  quitadas: { spam: false, normal: false },    // ¿se quitó una clase completa?
  sesgado: false                               // ¿dataset sesgado activado?
};

const NORMALES_EN_SESGADO = 3;   // cuántos mensajes normales quedan en el dataset sesgado

// Atajo para buscar elementos por id
function $(id) {
  return document.getElementById(id);
}

// ---------- Errores amigables ----------
function ocultarError() {
  $("caja-error").hidden = true;
}

function mostrarError(error) {
  $("caja-error").hidden = false;
  if (error && error.esPendiente) {
    $("error-titulo").textContent = "Aún falta completar una parte del código";
    $("error-detalle").textContent = error.message;
    $("error-ayuda").textContent = "Abre modelo.js, completa ese TODO, borra la línea \"pendiente(...)\", guarda y recarga la página (F5).";
  } else {
    $("error-titulo").textContent = "Tu código tiene un problema";
    $("error-detalle").textContent = (error && error.message) ? error.message : String(error);
    $("error-ayuda").textContent = "Pulsa F12 y abre la pestaña Consola para ver en qué línea ocurrió.";
  }
}

// ---------- Datos de entrenamiento actuales ----------
function datosBase() {
  let normalesVistos = 0;
  return ENTRENAMIENTO.filter(function (ej) {
    if (estado.quitadas[ej.etiqueta]) return false;
    if (estado.sesgado && ej.etiqueta === "normal") {
      normalesVistos += 1;
      return normalesVistos <= NORMALES_EN_SESGADO;
    }
    return true;
  });
}

function datosActuales() {
  return datosBase().concat(estado.ejemplosPropios);
}

function contarClases(datos) {
  let spam = 0;
  let normal = 0;
  for (const ej of datos) {
    if (ej.etiqueta === "spam") spam += 1;
    else normal += 1;
  }
  return { spam: spam, normal: normal };
}

// ---------- Entrenar (y reentrenar) ----------
function reentrenar() {
  const datos = datosActuales();
  const conteo = contarClases(datos);
  $("conteo-spam").textContent = conteo.spam;
  $("conteo-normal").textContent = conteo.normal;
  const total = conteo.spam + conteo.normal;
  $("barra-datos-spam").style.width = (total === 0 ? 0 : (conteo.spam / total) * 100) + "%";

  try {
    const modelo = entrenar(datos);
    if (!modelo || typeof modelo !== "object") {
      throw new Error("entrenar(datos) debe devolver el modelo (te falta el return modelo;).");
    }
    estado.modelo = modelo;
    $("conteo-vocab").textContent = modelo.tamVocabulario !== undefined ? modelo.tamVocabulario : "?";
    ocultarError();
  } catch (error) {
    estado.modelo = null;
    $("conteo-vocab").textContent = "-";
    mostrarError(error);
  }
}

// ---------- Analizar un mensaje ----------
function analizar() {
  const texto = $("texto").value.trim();
  if (texto === "") {
    $("resultado").hidden = true;
    return;
  }
  if (!estado.modelo) {
    reentrenar();            // reintenta: quizá ya completaste el TODO
    if (!estado.modelo) return;
  }
  try {
    const res = clasificar(texto, estado.modelo);
    validarRespuesta(res);
    mostrarResultado(res);
    ocultarError();
  } catch (error) {
    $("resultado").hidden = true;
    mostrarError(error);
  }
}

function validarRespuesta(res) {
  if (!res || typeof res !== "object") {
    throw new Error("clasificar debe devolver un objeto { etiqueta, probSpam, aportes }.");
  }
  if (typeof res.probSpam !== "number" || isNaN(res.probSpam)) {
    throw new Error("clasificar devolvió un probSpam que no es un número (¿dividiste bien? ¿usaste Math.exp?).");
  }
  if (res.etiqueta !== "spam" && res.etiqueta !== "normal") {
    throw new Error("clasificar debe devolver etiqueta \"spam\" o \"normal\".");
  }
  if (!Array.isArray(res.aportes)) {
    throw new Error("clasificar debe devolver aportes como una lista (usa agruparAportes(lista)).");
  }
}

function mostrarResultado(res) {
  $("resultado").hidden = false;

  const insignia = $("veredicto");
  insignia.textContent = res.etiqueta === "spam" ? "SPAM" : "NORMAL";
  insignia.className = "insignia " + res.etiqueta;

  const pct = Math.round(res.probSpam * 1000) / 10;
  $("prob-texto").textContent = "Probabilidad de spam: " + pct + "%";
  $("barra-relleno").style.width = (res.probSpam * 100) + "%";

  const contenedor = $("chips");
  contenedor.textContent = "";
  const top = res.aportes.slice(0, 10);
  for (const item of top) {
    const chip = document.createElement("span");
    chip.className = "chip " + (item.aporte > 0 ? "chip-spam" : "chip-normal");
    const signo = item.aporte > 0 ? "+" : "";
    chip.textContent = item.palabra + " " + signo + item.aporte.toFixed(1);
    chip.title = item.aporte > 0 ? "Empuja hacia SPAM" : "Empuja hacia NORMAL";
    contenedor.appendChild(chip);
  }
  $("sin-palabras").hidden = top.length > 0;
}

// ---------- Enséñale al detective ----------
function ensenar(etiqueta) {
  const texto = $("texto").value.trim();
  const msg = $("msg-ensenar");
  if (texto === "") {
    msg.textContent = "Primero escribe un mensaje arriba.";
    return;
  }
  estado.ejemplosPropios.push({ texto: texto, etiqueta: etiqueta });
  reentrenar();
  msg.textContent = "Listo: lo guardé como " + etiqueta.toUpperCase() +
    ". Ya llevas " + estado.ejemplosPropios.length + " ejemplo(s) tuyo(s). Vuelvo a analizar el mensaje:";
  analizar();
}

// ---------- Panel de datos ----------
function alternarClase(clase) {
  estado.quitadas[clase] = !estado.quitadas[clase];
  refrescarBotonesDatos();
  reentrenar();
  reanalizarSiHayTexto();
}

function refrescarBotonesDatos() {
  $("btn-quitar-spam").textContent = estado.quitadas.spam ? "Devolver el spam" : "Quitar todo el spam";
  $("btn-quitar-normal").textContent = estado.quitadas.normal ? "Devolver lo normal" : "Quitar todo lo normal";
}

function restaurar() {
  estado.quitadas = { spam: false, normal: false };
  estado.sesgado = false;
  estado.ejemplosPropios = [];
  $("chk-sesgado").checked = false;
  $("msg-ensenar").textContent = "";
  refrescarBotonesDatos();
  reentrenar();
  reanalizarSiHayTexto();
}

function reanalizarSiHayTexto() {
  if ($("texto").value.trim() !== "") analizar();
}

// ---------- Examen ----------
function tomarExamen() {
  if (!estado.modelo) {
    reentrenar();
    if (!estado.modelo) return;
  }
  try {
    const r = evaluar(estado.modelo, PRUEBA);
    if (!r || typeof r.exactitud !== "number" || isNaN(r.exactitud)) {
      throw new Error("evaluar debe devolver { exactitud, vp, fp, vn, fn, errores } con exactitud numérica.");
    }
    if (!Array.isArray(r.errores)) {
      throw new Error("evaluar debe devolver errores como una lista.");
    }
    mostrarExamen(r);
    ocultarError();
  } catch (error) {
    $("examen-resultado").hidden = true;
    mostrarError(error);
  }
}

function mostrarExamen(r) {
  $("examen-resultado").hidden = false;
  $("ex-exactitud").textContent = (Math.round(r.exactitud * 1000) / 10) + "%";
  $("ex-detalle").textContent = " (" + (r.vp + r.vn) + " aciertos de " + (r.total !== undefined ? r.total : PRUEBA.length) + ")";
  $("c-vp").textContent = r.vp;
  $("c-fn").textContent = r.fn;
  $("c-fp").textContent = r.fp;
  $("c-vn").textContent = r.vn;

  const lista = $("lista-errores");
  lista.textContent = "";
  for (const e of r.errores) {
    const li = document.createElement("li");
    li.textContent = e.texto;
    const nota = document.createElement("span");
    nota.className = "etiqueta-error";
    const pct = typeof e.probSpam === "number" ? " (prob. spam: " + Math.round(e.probSpam * 100) + "%)" : "";
    nota.textContent = "Era " + e.esperada + ", dijo " + e.predicha + pct;
    li.appendChild(nota);
    lista.appendChild(li);
  }
  $("sin-errores").hidden = r.errores.length > 0;
}

// ---------- Ejemplos rápidos ----------
const EJEMPLOS_RAPIDOS = [
  "Ganaste un premio gratis, haz clic en el enlace",
  "Hola, ¿vamos a estudiar mañana en la biblioteca?",
  "Tu banco te regala dinero gratis, confirma tu clave"
];

function crearEjemplosRapidos() {
  const contenedor = $("ejemplos-rapidos");
  for (const texto of EJEMPLOS_RAPIDOS) {
    const b = document.createElement("button");
    b.className = "boton mini";
    b.textContent = texto.length > 28 ? texto.slice(0, 28) + "..." : texto;
    b.title = texto;
    b.addEventListener("click", function () {
      $("texto").value = texto;
      analizar();
    });
    contenedor.appendChild(b);
  }
}

// ---------- Arranque ----------
function iniciar() {
  // Si modelo.js tiene un error de sintaxis, sus funciones no existen
  if (typeof entrenar !== "function" || typeof clasificar !== "function" || typeof evaluar !== "function") {
    mostrarError(new Error("No se pudo cargar modelo.js (falta entrenar, clasificar o evaluar)."));
    return;
  }
  crearEjemplosRapidos();
  $("btn-analizar").addEventListener("click", analizar);
  $("btn-ensenar-spam").addEventListener("click", function () { ensenar("spam"); });
  $("btn-ensenar-normal").addEventListener("click", function () { ensenar("normal"); });
  $("btn-quitar-spam").addEventListener("click", function () { alternarClase("spam"); });
  $("btn-quitar-normal").addEventListener("click", function () { alternarClase("normal"); });
  $("btn-restaurar").addEventListener("click", restaurar);
  $("chk-sesgado").addEventListener("change", function (e) {
    estado.sesgado = e.target.checked;
    reentrenar();
    reanalizarSiHayTexto();
  });
  $("btn-examen").addEventListener("click", tomarExamen);
  $("texto").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) analizar();
  });

  reentrenar();
}

window.addEventListener("error", function (e) {
  // Error de sintaxis o inesperado en modelo.js: aviso amable en la página
  mostrarError(new Error(e.message));
});

iniciar();
