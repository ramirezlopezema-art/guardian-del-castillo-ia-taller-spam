// =====================================================================
// TALLER: Detective de mensajes - Filtro anti-spam con Naive Bayes
// ARCHIVO DE TRABAJO (versión larga). Aquí completas 4 TODO.
//
// Reglas del juego:
//   - Trabaja SOLO en este archivo (modelo.js).
//   - Cada TODO termina con una línea "pendiente(...)" que avisa a la página
//     que aún no lo hiciste. Cuando termines tu código, BORRA esa línea.
//   - Después de cada TODO, guarda el archivo y recarga index.html (F5).
// =====================================================================

// ---------------------------------------------------------------------
// Utilidades (ya listas, no las cambies)
// ---------------------------------------------------------------------

// Un "diccionario vacío" seguro: sirve para contar palabras como "constructor"
function nuevoContador() {
  return Object.create(null);
}

// Pasa a minúsculas, quita tildes y signos: "¡Gratis, YA!" -> "gratis ya"
function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // quita las tildes
    .replace(/[^a-z0-9\s]/g, " ")      // cambia los signos por espacios
    .replace(/\s+/g, " ")
    .trim();
}

// Parte el texto en palabras. Ignora las de 1 letra ("a", "y", "o").
// Ejemplo: tokenizar("¡Gana dinero YA!") -> ["gana", "dinero", "ya"]
function tokenizar(texto) {
  const limpio = normalizar(texto);
  if (limpio === "") return [];
  return limpio.split(" ").filter(function (p) { return p.length >= 2; });
}

// Avisa a la página que un TODO aún no está hecho (la página muestra un mensaje amable)
function pendiente(numero, queFalta) {
  const error = new Error("TODO " + numero + " sin completar: " + queFalta);
  error.esPendiente = true;
  throw error;
}

// Probabilidad previa de una clase (ya lista): ¿cuánto spam llega "en general"?
// Lleva +1 para no hacer log(0) si una clase no tiene ejemplos.
function logPrior(clase, modelo) {
  const total = modelo.documentos.spam + modelo.documentos.normal;
  return Math.log((modelo.documentos[clase] + 1) / (total + 2));
}

// Une las apariciones repetidas de una palabra y ordena por importancia (ya listo).
// Recibe [{palabra, aporte}, ...] y devuelve la lista agrupada, de mayor a menor |aporte|
function agruparAportes(lista) {
  const suma = nuevoContador();
  for (const item of lista) {
    suma[item.palabra] = (suma[item.palabra] || 0) + item.aporte;
  }
  return Object.keys(suma)
    .map(function (p) { return { palabra: p, aporte: suma[p] }; })
    .sort(function (a, b) { return Math.abs(b.aporte) - Math.abs(a.aporte); });
}

// ---------------------------------------------------------------------
// TODO 1 - entrenar(datos): CONTAR palabras en cada clase
//
// "datos" es una lista de { texto, etiqueta }, con etiqueta "spam" o "normal".
// Entrenar es solo contar. Para cada ejemplo:
//   1. Suma 1 a modelo.documentos[clase].
//   2. Con tokenizar(ejemplo.texto) obtén sus palabras. Para cada palabra:
//        - suma 1 a modelo.conteos[clase][palabra]  (empieza en 0 si no existe)
//        - suma 1 a modelo.totalPalabras[clase]
//        - marca modelo.vocabulario[palabra] = true
// Al final: modelo.tamVocabulario = Object.keys(modelo.vocabulario).length
//
// Pista: contar con un objeto se escribe así:
//     conteos[p] = (conteos[p] || 0) + 1;
// Pista 2: "clase" es ejemplo.etiqueta. Úsala como llave: modelo.conteos[clase]
// ---------------------------------------------------------------------
function entrenar(datos) {
  const modelo = {
    conteos: { spam: nuevoContador(), normal: nuevoContador() },  // conteos[clase][palabra]
    totalPalabras: { spam: 0, normal: 0 },                        // palabras totales por clase
    documentos: { spam: 0, normal: 0 },                           // mensajes por clase
    vocabulario: nuevoContador(),                                 // todas las palabras vistas
    tamVocabulario: 0
  };

  // >>> TU CÓDIGO DEL TODO 1 AQUÍ (recorre "datos" con un for...of) <<<


  // Cuando termines, BORRA la línea de abajo y devuelve el modelo con: return modelo;
  return pendiente(1, "entrenar debe contar las palabras de cada clase (revisa modelo.js)");
}

// ---------------------------------------------------------------------
// TODO 2 - logProbPalabra(palabra, clase, modelo): suavizado de Laplace
//
// Pregunta: "si un mensaje es de esta clase, ¿qué tan probable es esta palabra?"
//
//        veces que la palabra apareció en la clase + 1
//   P = -----------------------------------------------------
//        total de palabras de la clase + tamaño del vocabulario
//
// El "+ 1" arriba (suavizado de Laplace) evita que una palabra que nunca
// vimos en una clase tenga probabilidad 0 y destruya todo el cálculo.
//
// Devuelve el LOGARITMO de P:  Math.log(...)
// (Los logs convierten multiplicaciones diminutas en sumas manejables.)
//
// Pista: veces = modelo.conteos[clase][palabra] || 0
// Pista 2: total = modelo.totalPalabras[clase]
// ---------------------------------------------------------------------
function logProbPalabra(palabra, clase, modelo) {
  // >>> TU CÓDIGO DEL TODO 2 AQUÍ <<<

  // BORRA la línea de abajo cuando devuelvas tu resultado con return
  return pendiente(2, "logProbPalabra debe calcular el log de la probabilidad suavizada");
}

// ---------------------------------------------------------------------
// TODO 3 - clasificar(texto, modelo): puntuar un mensaje con cada clase
//
// Debe devolver { etiqueta, probSpam, aportes }.
//
// Paso a paso:
//   1. Parte con dos puntajes: logSpam = logPrior("spam", modelo)
//                              logNormal = logPrior("normal", modelo)
//   2. Para cada palabra de tokenizar(texto):
//        - si NO está en modelo.vocabulario, ignórala (continue)
//        - lpSpam    = logProbPalabra(palabra, "spam", modelo)
//          lpNormal  = logProbPalabra(palabra, "normal", modelo)
//        - súmale lpSpam a logSpam y lpNormal a logNormal
//        - guarda en "lista" el aporte: { palabra, aporte: lpSpam - lpNormal }
//          (aporte > 0 empuja hacia spam; aporte < 0 empuja hacia normal)
//   3. De dos puntajes a una probabilidad:
//        probSpam = 1 / (1 + Math.exp(logNormal - logSpam))
//   4. etiqueta = probSpam > umbral ? "spam" : "normal"
//   5. aportes = agruparAportes(lista)    (ya viene hecha: agrupa y ordena)
// ---------------------------------------------------------------------
function clasificar(texto, modelo, umbral) {
  if (umbral === undefined) umbral = 0.5;   // 0.5 = "más probable spam que normal"

  const lista = [];

  // >>> TU CÓDIGO DEL TODO 3 AQUÍ <<<


  // BORRA la línea de abajo cuando devuelvas { etiqueta, probSpam, aportes }
  return pendiente(3, "clasificar debe sumar los logs de cada palabra y devolver el veredicto");
}

// ---------------------------------------------------------------------
// TODO 4 - evaluar(modelo, prueba): el examen del modelo
//
// "prueba" tiene el mismo formato que los datos de entrenamiento, pero el
// modelo NUNCA los vio. Aquí tratamos "spam" como la clase POSITIVA.
//
// Para cada ejemplo, clasifica su texto y compara con ejemplo.etiqueta:
//   real spam   y predicho spam   -> vp (verdadero positivo: spam atrapado)
//   real normal y predicho spam   -> fp (falso positivo: mensaje bueno al spam)
//   real normal y predicho normal -> vn (verdadero negativo)
//   real spam   y predicho normal -> fn (falso negativo: spam que se coló)
//
// Devuelve:
//   { exactitud, vp, fp, vn, fn, total, errores }
//   exactitud = (vp + vn) / total          (un número entre 0 y 1)
//   errores   = lista de { texto, esperada, predicha, probSpam } de los que fallaste
// ---------------------------------------------------------------------
function evaluar(modelo, prueba) {
  let vp = 0, fp = 0, vn = 0, fn = 0;
  const errores = [];

  // >>> TU CÓDIGO DEL TODO 4 AQUÍ <<<


  // BORRA la línea de abajo cuando devuelvas el resultado con return
  return pendiente(4, "evaluar debe contar aciertos, la matriz de confusión y los errores");
}
