# Detective de mensajes: entrena tu propio filtro anti-spam
### Taller corto de 2 horas (120 minutos)

**Curso:** Introducción a la IA · **Necesitas:** Chrome o Edge y VS Code · **Sin internet, sin cuenta, sin API key**

Este taller es **autocontenido**: no necesitas saber nada de IA ni haber hecho ningún proyecto antes. (Tus compañeros vieron estas ideas con un dragón; tú las verás con un filtro de mensajes.)

En dos horas vas a: entender qué es la IA y cómo **aprende de ejemplos**, ver por qué un filtro hecho con reglas se rompe, **programar una sola pieza** (el corazón de un clasificador *Naive Bayes*), medirlo con honestidad y romperlo a propósito para ver cómo nacen los **sesgos**.

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

---

## Tu ruta de 120 minutos

| # | Minutos | Bloque | Al terminar tendrás... |
|---|---|---|---|
| 1 | 0:00 – 0:25 (25) | ¿Qué es la IA? Reglas contra ejemplos | Claro qué es IA/ML/DL y por qué un filtro de reglas falla |
| 2 | 0:25 – 0:35 (10) | Del texto a los números | Entender qué "ve" la máquina |
| 3 | 0:35 – 0:50 (15) | Cómo aprende una máquina (Naive Bayes) | La intuición: contar para decidir |
| 4 | 0:50 – 0:55 (5) | Descanso | Agua y estirarse |
| 5 | 0:55 – 1:00 (5) | Preparar el taller | La página abierta con el modelo corto |
| 6 | 1:00 – 1:20 (20) | **El TODO:** `clasificar` | Un detective que da veredictos |
| 7 | 1:20 – 1:30 (10) | Explicar, enseñar y comparar | Ver por qué decide y compararlo con las reglas |
| 8 | 1:30 – 1:40 (10) | Medir con el examen | Exactitud, matriz de confusión y la trampa |
| 9 | 1:40 – 1:50 (10) | Romper y sesgar | Ver cómo los datos crean injusticia |
| 10 | 1:50 – 2:00 (10) | Ética y cierre | Preguntas de cierre |
| | **Total** | **120** | |

> **Regla de oro:** guarda el archivo (`Ctrl+S`) y recarga `index.html` con **F5** cada vez. Si algo falla, la página muestra un cuadro amarillo con la pista.

### Palabras que usaremos

| Palabra | Significado en una línea |
|---|---|
| **Modelo** | Lo que queda después de aprender: el "cerebro" ya ajustado |
| **Entrenar** | Aprender de ejemplos (aquí, contar palabras por clase) |
| **Etiqueta** | La respuesta correcta de un ejemplo, puesta por una persona |
| **Token** | Una pieza del texto (aquí, una palabra) |
| **Exactitud** | Fracción de mensajes bien clasificados |
| **Falso positivo / negativo** | Mensaje bueno al spam / spam que se coló |
| **Sesgo** | Tendencia injusta que el modelo aprende de sus datos |

---

## Bloque 1 · ¿Qué es la IA? Reglas contra ejemplos (25 min)

**Meta:** entender qué es la IA y por qué, para el spam, **aprender de ejemplos** es mejor que escribir reglas.

### 1.1 · IA, Machine Learning y Deep Learning (6 min)

**Inteligencia artificial (IA):** programas que hacen tareas que normalmente requieren inteligencia humana, como entender texto, reconocer caras o decidir si un mensaje es spam. Es una herramienta **especializada**, no un cerebro: detecta **patrones**, no "entiende".

Son tres niveles, uno dentro del otro:

```
┌─ IA (todo lo "inteligente") ────────────────────────┐
│  ┌─ Machine Learning (ML): aprende de ejemplos ───┐ │
│  │  ┌─ Deep Learning (DL): redes neuronales ───┐  │ │
│  │  └──────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

| Nivel | ¿Quién crea las reglas? | Ejemplo con spam |
|---|---|---|
| **IA con reglas** | Una persona las escribe a mano | "Si dice *gratis* y *premio*, es spam" |
| **Machine Learning** | La máquina las **descubre** viendo ejemplos | Un filtro que cuenta qué palabras aparecen más en el spam |
| **Deep Learning** | Igual que ML, pero con **redes neuronales** de muchas capas | Un filtro que lee el mensaje entero y capta el tono |

Y tres estilos de aprender:

| Tipo | Cómo aprende | Ejemplo |
|---|---|---|
| **Supervisado** | Con ejemplos **ya etiquetados** | Filtro de spam |
| **No supervisado** | Sin etiquetas, agrupa cosas parecidas | Agrupar clientes por gustos |
| **Por refuerzo** | Prueba y error con premios y castigos | Una IA que aprende a jugar |

**Tu detective será supervisado:** aprenderá de 60 mensajes que ya traen su etiqueta ("spam" o "normal").

### 1.2 · Una neurona en 3 minutos (opcional si vas justo)

Una **neurona artificial** multiplica entradas por **pesos**, las suma y decide si el resultado es mayor que 0. Los pesos son lo que "sabe". **Entrenar** una red es ajustar sus pesos cada vez que se equivoca. Un LLM (como los asistentes de chat) es una red neuronal gigante que predice la siguiente pieza de texto.

Pruébalo: abre `index.html`, pulsa **F12**, entra a la pestaña **Consola**, pega esto y pulsa Enter:

```js
function neurona(entradas, pesos, sesgo) {
  let suma = sesgo;
  for (let i = 0; i < entradas.length; i++) suma += entradas[i] * pesos[i];
  return suma > 0 ? "sí" : "no";
}
// entradas: [dice "gratis", trae un enlace, lo manda un amigo]
const pesosSpam = [2, 2, -3];
neurona([1, 1, 0], pesosSpam, -1)   // "sí": gratis + enlace de un desconocido
neurona([0, 1, 1], pesosSpam, -1)   // "no": enlace, pero lo manda un amigo
```

**Checkpoint:** la consola responde `"sí"` y luego `"no"`. Cambia un peso y mira cómo cambia la decisión.

### 1.3 · Mira el filtro de reglas fallar (14 min)

Antes de que una máquina aprendiera, la gente escribía **listas de palabras sospechosas** con puntos. Ese filtro ya está hecho en `reglas.js`. Veamos qué tan lejos llega.

1. Haz **doble clic en `index.html`**. Verás un cuadro amarillo ("Aún falta completar una parte del código"). Es normal: aún no programas nada.
2. Baja hasta el panel **5. Comparar: reglas vs aprendido**.
3. Escribe estos mensajes arriba (panel 1), pulsa **Analizar** y mira el lado **"Reglas a mano"**:

| Mensaje | Qué deberías ver (reglas) |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, puntaje 11 |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, puntaje -4 |
| `G4na d1nero gr4tis` | **NORMAL**, puntaje 0: ¡**evasión**! El spammer cambia letras por números |
| `Ganaste el partido` | **SPAM**, puntaje 3: ¡pero es un mensaje normal! Falta contexto |
| `Te regalo un iPhone` | **NORMAL**, puntaje 2: suena a estafa, pero ninguna regla sumó lo suficiente |

4. Pulsa **Comparar en el examen**: las reglas sacan **80 %** (16 de 20) en el examen de 20 mensajes que están en `datos.js`. El lado del modelo aprendido avisa "aún no está listo": es normal.

**Por qué fallan las reglas:** una persona tiene que prever cada truco, y quien manda spam cambia el truco cada día. La alternativa es **no escribir reglas, sino mostrar ejemplos** y dejar que la máquina descubra qué palabras delatan al spam.

> **Actividad 1 (4 min, en parejas):** inventen un mensaje de spam que el filtro de reglas **no detecte** y uno normal que **marque como spam por error**. ¿Cuánto tardaron?

---

## Bloque 2 · Del texto a los números (10 min)

**Meta:** ver exactamente qué "lee" la máquina. Un computador no entiende palabras: hay que **limpiarlas, partirlas y contarlas**.

```
"¡Gana dinero YA! 50% gratis"
   │  1. Normalizar (minúsculas, sin tildes ni signos)
   │  2. Tokenizar  (partir en palabras, cada una es un token)
   ▼  3. Contar     (bolsa de palabras: cuántas veces aparece cada una)
```

En la consola (F12), prueba (estas funciones ya están en `modelo.js`):

```js
normalizar("¡GRATIS! Gana $$$ YA")
tokenizar("¡Gana dinero YA! 50% gratis")
```

**Checkpoint:** `"gratis gana ya"` y `["gana", "dinero", "ya", "50", "gratis"]`.

Una **bolsa de palabras** ignora el orden y solo cuenta:

```js
function bolsaDePalabras(texto) {
  const bolsa = {};
  for (const palabra of tokenizar(texto)) bolsa[palabra] = (bolsa[palabra] || 0) + 1;
  return bolsa;
}
bolsaDePalabras("gana gana dinero ya")
```

**Checkpoint:** `{gana: 2, dinero: 1, ya: 1}`. Pierde el orden y el contexto ("el perro muerde al hombre" y "el hombre muerde al perro" dan la misma bolsa), pero aun así funciona muy bien para detectar spam.

> **Actividad 2 (3 min):** predice qué devuelve `tokenizar("Mamá, ¿vienes a la fiesta?")` y compruébalo. ¿Qué pierde la máquina al quitar tildes y signos?

---

## Bloque 3 · Cómo aprende una máquina (Naive Bayes) (15 min)

**Meta:** entender que **entrenar es contar** y **clasificar es comparar puntajes**.

> **Analogía:** eres un detective. "gratis" salió muchas veces en spam y casi nunca en mensajes normales: es una **pista a favor del spam**. Cada palabra del mensaje es una pista; al final miras hacia dónde se inclinó la balanza.

Tres mensajes de entrenamiento con su etiqueta:

| # | Mensaje | Etiqueta |
|---|---|---|
| 1 | `gana dinero gratis` | spam |
| 2 | `gana premio ya` | spam |
| 3 | `hola clase ya` | normal |

**Paso 1 · Contar** (esto es entrenar):

| Palabra | En spam | En normal |
|---|---|---|
| gana | 2 | 0 |
| gratis | 1 | 0 |
| dinero, premio | 1 cada una | 0 |
| ya | 1 | 1 |
| hola, clase | 0 | 1 cada una |
| **Total de palabras** | **6** | **3** |

El **vocabulario** (palabras distintas) tiene **7**.

**Paso 2 · Probabilidad de cada palabra en cada clase:** `(veces + 1) ÷ (palabras de la clase + vocabulario)`. El `+ 1` (*suavizado de Laplace*) evita probabilidades de 0: sin él, una palabra nueva en una clase destruiría todo el cálculo.

- *gana* en spam: (2+1) ÷ (6+7) = **3/13**; en normal: (0+1) ÷ (3+7) = **1/10**.
- *gratis* en spam: (1+1) ÷ 13 = **2/13**; en normal: **1/10**.

**Paso 3 · Comparar** `gana gratis`, sumando cuánto spam llega en general (2 de 3 mensajes son spam: 3/5 y 2/5):

```
Puntaje spam   = 3/5 × 3/13 × 2/13 = 0,0213
Puntaje normal = 2/5 × 1/10 × 1/10 = 0,0040

Probabilidad de spam = 0,0213 ÷ (0,0213 + 0,0040) = 0,84  →  84 %  →  SPAM
```

Se llama **ingenuo** (*naive*) porque suma las pistas como si cada palabra fuera independiente de las demás: no es cierto en el lenguaje real, pero funciona sorprendentemente bien.

**Un truco: los logaritmos.** Con muchas palabras, multiplicar da números tan diminutos que el computador los redondea a 0 (*underflow*). Por eso se **suman logaritmos** (`log(a × b) = log(a) + log(b)`): mismo resultado, sin ese problema. Es lo que hará tu código.

> **Actividad 3 (5 min, en parejas):** calcula a mano la probabilidad de spam de `hola clase`. Pista: ninguna de las dos palabras aparece en los spam. Compruébala en el bloque 6.

---

## Bloque 4 · Descanso (5 min)

Levántate y estírate. Al volver, a programar.

---

## Bloque 5 · Preparar el taller (5 min)

1. **Guarda el original:** haz una copia de `modelo.js` con el nombre `modelo.original.js` (te servirá si luego sigues con el taller largo). Después **copia** `soluciones/modelo.corto.js` encima de `modelo.js` (acepta reemplazar). Desde ahora trabajas en `modelo.js`.
2. Recarga `index.html` (F5). Deberías ver la página **sin** cuadro amarillo: `entrenar` ya está hecho. Arriba, "palabras conocidas" = **347**, con 30 spam y 30 normales.
3. Escribe cualquier mensaje y pulsa **Analizar**: aparece el cuadro amarillo "Aún falta completar una parte del código". Eso es lo que vas a arreglar. (El lado de las reglas del panel 5 sigue funcionando.)
4. Abre `datos.js` y lee 5 mensajes de `ENTRENAMIENTO`. Cada uno tiene `texto` y `etiqueta`: **la etiqueta la puso una persona**.

**Checkpoint:** la página abre y te pide completar el TODO.

---

## Bloque 6 · El TODO: `clasificar` (20 min)

**Meta:** que `clasificar(texto, modelo)` devuelva `{ etiqueta, probSpam, aportes }`.

### Antes de escribir (5 min): lee lo que ya está hecho

En `modelo.js` lee estas funciones **sin cambiarlas**:

| Función | Qué hace |
|---|---|
| `tokenizar(texto)` | Convierte `"¡Gana dinero YA!"` en `["gana", "dinero", "ya"]` |
| `entrenar(datos)` | Cuenta palabras por clase y arma el `modelo` |
| `logPrior(clase, modelo)` | Puntaje inicial de una clase según cuántos ejemplos tiene |
| `logProbPalabra(palabra, clase, modelo)` | Log de la probabilidad suavizada del paso 2 |
| `agruparAportes(lista)` | Une palabras repetidas y las ordena por importancia |

### Pasos (15 min)

Dentro de `clasificar` ya existen `logSpam`, `logNormal` y `lista`. Te falta:

1. Recorre `tokenizar(texto)` con `for (const palabra of ...)`. Para cada palabra:
   - si `!modelo.vocabulario[palabra]`, haz `continue` (palabra desconocida);
   - `lpSpam = logProbPalabra(palabra, "spam", modelo)` y `lpNormal = logProbPalabra(palabra, "normal", modelo)`;
   - suma `lpSpam` a `logSpam` y `lpNormal` a `logNormal`;
   - agrega a `lista`: `{ palabra: palabra, aporte: lpSpam - lpNormal }`.
2. Reemplaza la línea `const probSpam = pendiente(...)` por:
   `const probSpam = 1 / (1 + Math.exp(logNormal - logSpam));`

### Pistas

- `aporte > 0` significa "esta palabra empuja hacia spam"; `< 0`, "hacia normal".
- Si `probSpam` sale `NaN`, revisa que **sumaste** (no multiplicaste) y que usaste `Math.exp`.
- Si ves el cuadro amarillo, lee el mensaje: dice qué falta.

### Checkpoint

Escribe y pulsa **Analizar**:

| Mensaje | Deberías ver |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, 100 %, chips rojos: `gratis +1.9`, `un +1.7`, `premio +1.7`, `clic +1.3` |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, 0,6 %, chips verdes como `la -1.7`, `vamos -1.2` |

Y la Actividad 3: en la consola (F12) ejecuta

```js
clasificar("hola clase", entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}]))
```

Debe dar `probSpam` ≈ **0,18**.

> **Actividad 4 (en los últimos 2 min):** ¿cuál de tus dos mensajes tiene la palabra más "pesada"? ¿La palabra es una razón real o una casualidad de estos datos?

---

## Bloque 7 · Explicar, enseñar y comparar (10 min)

**Meta:** ver *por qué* decide el detective, comprobar que **aprende de nuevo** sin tocar el código y compararlo con las reglas.

1. Analiza `Tu banco te regala dinero gratis, confirma tu clave`. Mira los chips: `tu` pesa más que `dinero`. ¿Por qué? (Aparece en 20 spam y solo en 3 normales: los spam le hablan al lector.)
2. Escribe `Hola, soy Camila de recursos humanos, tengo una vacante para ti, escríbeme al privado` y pulsa **Analizar**. Da **41 %** (NORMAL), pero es un spam disfrazado.
3. Pulsa **Es SPAM** en "Enséñale al detective". Sube a **99,7 %**.
4. Pulsa **Restaurar datos originales**.
5. Baja al panel **5** y pulsa **Comparar en el examen**: reglas **80 %**, modelo aprendido **90 %**, con **4** mensajes en los que no están de acuerdo.

> **Actividad 5 (2 min):** ¿qué cambió en el paso 3: el código o los datos? ¿Eso es "aprender"? Y de los 4 desacuerdos, ¿quién acierta más?

**Checkpoint:** viste que cambiar el dato cambió la decisión.

---

## Bloque 8 · Medir con el examen (10 min)

**Meta:** medir con mensajes que el modelo **nunca vio** y leer una matriz de confusión.

1. Pulsa **Tomar el examen**. Deberías ver:

| Medida | Valor |
|---|---|
| Exactitud | **90 %** (18 de 20) |
| Spam atrapado / spam que se coló | 9 / 1 |
| Mensaje bueno al spam / normal bien | 1 / 9 |
| Errores | El de **Camila** (spam, 41 %) y el de la **tarjeta del banco** (normal, 53,8 %) |

2. Lee la matriz: la diagonal verde son los aciertos; las celdas rojas son los dos tipos de error.
   - **Falso positivo (fp):** un mensaje bueno enviado al spam.
   - **Falso negativo (fn):** un spam que se coló.

3. **La trampa de la exactitud.** Si el 99 % de los mensajes fueran normales, un "modelo" que siempre dice *normal* acertaría el 99 % ¡y no atraparía ningún spam! En la consola:

```js
const normales = PRUEBA.filter(e => e.etiqueta === "normal");
evaluar(estado.modelo, normales.concat([PRUEBA[5]]))
```

Da exactitud **81,8 %** (`vp: 0`), mientras que "siempre normal" tendría 10 de 11 = **90,9 %**.

4. **Por qué un examen aparte:** evalúa también con los mismos datos de entrenamiento: `evaluar(estado.modelo, ENTRENAMIENTO).exactitud` da **1** (el modelo ya vio esos mensajes), pero en el examen sacó 0,9. Una nota alta con datos vistos no demuestra nada.

> **Actividad 6 (3 min, en parejas):** ¿qué es peor para ti, un falso positivo o un falso negativo? ¿Y para un banco?

---

## Bloque 9 · Romper y sesgar (10 min)

**Meta:** ver cómo datos incompletos o desbalanceados producen un modelo injusto. **Un sesgo** es una tendencia injusta que el modelo aprende de sus datos.

| Experimento | Qué haces | Resultado esperado |
|---|---|---|
| Dataset sesgado | Marca "Cargar dataset sesgado" (30 spam, 3 normales) y toma el examen | Exactitud **65 %**, 7 falsos positivos. `Hola, ¿vamos a estudiar mañana en la biblioteca?` ahora sale **SPAM** (51,7 %) |
| Sin lo normal | Restaura, pulsa "Quitar todo lo normal", toma el examen | **50 %**: todo es spam |
| Sin spam | Restaura, pulsa "Quitar todo el spam", toma el examen | **50 %**: nada es spam |
| Tu propio sesgo | Restaura y enséñale 3 mensajes que tú llamarías spam y tu pareja llamaría normales | El modelo toma tu criterio |
| Mensajes legítimos | Restaura y prueba `Tu pedido fue enviado, sigue tu paquete en este enlace` | **SPAM** (99,6 %): no distingue un pedido real del spam |

**Qué pasó:** lo que no está en los datos, el modelo no lo conoce. Y reconoce **palabras**, no **intenciones**.

---

## Bloque 10 · Ética y cierre (10 min)

### Conversación guiada (4 min)

| Pregunta | Idea para pensar |
|---|---|
| ¿Quién decide qué es spam? | Una persona etiquetó los datos; tu pareja discrepó contigo |
| ¿Spam para quién? | Un boletín al que te suscribiste, una oferta de trabajo real con la palabra "oferta" |
| ¿Quién paga el error? | Un falso positivo puede ocultar un aviso médico o una oferta laboral real |
| ¿Y la privacidad? | Un filtro real lee mensajes de personas. ¿Con qué permiso? Tu detective corre en tu navegador y no envía nada |

> **Actividad 7 (3 min, en grupo):** escriban **dos reglas de buenas prácticas** para quien entrene un filtro como este (por ejemplo: "revisar qué proporción de cada clase hay antes de entrenar").

### Preguntas de cierre (3 min)

1. ¿Qué "aprendió" exactamente tu modelo? ¿Entiende lo que dice un mensaje?
2. ¿Por qué sumamos logaritmos en vez de multiplicar?
3. ¿Por qué evaluamos con mensajes que el modelo no vio?
4. Si te dicen "el modelo acierta el 99 %", ¿qué dos preguntas haces antes de creerlo?
5. ¿Quién fijó los pesos: una persona (reglas) o los datos (modelo)?

---

## Si quieres seguir

Esta versión comprimió ocho horas de contenido. Si te quedaste con ganas, cada tema tiene su módulo en el [taller largo](./TALLER_LARGO.md):

| Quiero profundizar en... | Módulo |
|---|---|
| Qué es la IA, ML y DL, y los tres estilos de aprender | [01 · ¿Qué es la IA?](./largo/01-que-es-la-ia.md) |
| Neuronas, redes y cómo se entrena (con una neurona que aprende) | [02 · Redes neuronales](./largo/02-redes-neuronales.md) |
| Texto para máquinas y el filtro por reglas con más detalle | [03 · Texto y reglas](./largo/03-texto-y-reglas.md) |
| Chatbots y cómo funciona un LLM | [04 · Chatbots y LLM](./largo/04-chatbots-y-llm.md) |
| La matemática de Naive Bayes paso a paso | [05 · Naive Bayes](./largo/05-naive-bayes.md) |
| Programar tú los 4 TODO (`entrenar`, `logProbPalabra`, `clasificar`, `evaluar`) | [06 · Programa tu detective](./largo/06-programa-tu-detective.md) |
| Precisión, recall, umbral y fuga de datos | [07 · Evaluación honesta](./largo/07-evaluacion-honesta.md) |
| Sesgo, privacidad y reto final | [08 · Sesgo, ética y proyecto](./largo/08-sesgo-etica-proyecto.md) |
| Todas las palabras del taller | [Glosario](./largo/00-glosario.md) |

Para seguir con el código, copia tu `modelo.original.js` (el de los 4 TODO) encima de `modelo.js`: trae `entrenar`, `logProbPalabra`, `clasificar` y `evaluar` por programar.

---

# Notas para el docente

## Qué recortar o ajustar

| Si vas justo... | Haz esto |
|---|---|
| 5 min menos | Omite 1.2 (la neurona) y la Actividad 2 |
| 10 min menos | Bloque 3 como demostración en el proyector; Actividad 3 solo oral |
| 15 min menos | Además, omite el bloque 9 salvo el experimento del dataset sesgado, y haz la conversación ética en voz alta |
| Un grupo se atasca en el TODO | Muéstrales el bucle de `clasificar` en `soluciones/modelo.solucion.js` y que escriban la fórmula de `probSpam` |
| Sobra tiempo | Experimentos del bloque 9 completos, o que los más rápidos hagan el reto de umbral del [módulo 07](./largo/07-evaluacion-honesta.md) |

## Cómo extenderlo

1. **Mismo grupo, otra sesión:** continuar con los módulos 06, 07 y 08 del [taller largo](./TALLER_LARGO.md), usando el `modelo.original.js` (copia del `modelo.js` con los 4 TODO que se guardó en el bloque 5).
2. **Con los que terminan antes:** que en `soluciones/modelo.corto.js` reemplacen `logProbPalabra` por su propia versión y que implementen `evaluar` desde cero comparando con la suya.

## Números esperados (calculados ejecutando el código)

| Dato | Valor |
|---|---|
| Datos de entrenamiento | 60 (30 spam, 30 normal); prueba: 20 (10 y 10); sin mensajes repetidos entre ambas |
| Vocabulario | 347 palabras; 364 palabras en spam, 328 en normal |
| Examen del modelo | Exactitud **0,90**; vp 9, fn 1, fp 1, vn 9 |
| Examen de las reglas (`reglas.js`) | Exactitud **0,80**; vp 6, fn 4, fp 0, vn 10 |
| Desacuerdos reglas vs modelo | 4: el modelo acierta 3 (paquete retenido, "Última oportunidad", "Reunión urgente") y las reglas 1 (tarjeta del banco) |
| Mal clasificados por el modelo | Camila (spam, 41 % → NORMAL); tarjeta del banco (normal, 53,8 % → SPAM) |
| Mensajes con las reglas | Premio gratis: 11 · Biblioteca: −4 · `G4na d1nero gr4tis`: 0 · `Ganaste el partido`: 3 · `Te regalo un iPhone`: 2 |
| Ejemplo de juguete | `gana gratis` → 0,842; `hola clase` → 0,182 |
| Examen desbalanceado (10 normales + Camila) | Modelo 0,818; "siempre normal" 0,909 |
| Evaluar en `ENTRENAMIENTO` | Exactitud 1 |
| Dataset sesgado (30 spam, 3 normal) | 0,65; vp 10, fn 0, fp 7, vn 3 |
| Sin una clase completa | 0,50 |
| Pedido enviado (mensaje legítimo) | SPAM 99,6 % |
| Enseñar el mensaje de Camila | 99,7 % y el examen sube a 100 %: es fuga de datos, porque ese mensaje está en la prueba |

## Errores comunes

| Síntoma | Causa probable |
|---|---|
| El cuadro amarillo sigue ahí | Dejaron la línea `const probSpam = pendiente(...)` o no recargaron (F5) |
| `probSpam` es `NaN` o aparece un error rojo en la consola | Nombre de variable mal escrito (`lpspam` en vez de `lpSpam`) o no usaron `logProbPalabra` |
| Todo sale ~50 % | Calcularon `lpSpam` pero no lo sumaron a `logSpam` |
| Probabilidades extremas siempre | Multiplicaron en vez de sumar logs, o usaron `Math.log10` con `Math.exp` |
| Editaron y no cambia | Editaron el archivo de `soluciones/` en vez de `modelo.js`, o el navegador guardó caché (Ctrl+F5) |
| Exactitud 100 % | Enseñaron mensajes del examen (fuga de datos) |
| `Identifier ... has already been declared` en la consola | Pegaron dos veces un `const`; recargar con F5 |

## Clave de respuestas

**Actividad 1.** Libre. Ejemplos que engañan a las reglas: escribir `g4na`, o `Ganaste el partido` (spam falso).

**Actividad 2.** `["mama", "vienes", "la", "fiesta"]` (se quita la "a" por tener una sola letra). Se pierden el énfasis y el sentido de las tildes.

**Actividad 3.** `hola clase`: spam = 3/5 × 1/13 × 1/13 = 0,0036; normal = 2/5 × 2/10 × 2/10 = 0,016; probSpam ≈ **0,18** (NORMAL).

**Actividad 4.** `gratis` (+1,9), `premio` (+1,7). Es un patrón real en estos datos, pero el modelo no sabe por qué: solo contó.

**Actividad 5.** Cambiaron solo los datos. Sí es aprender: mejora con experiencia. De los 4 desacuerdos, el modelo acierta 3 y las reglas 1; no es "mejor en todo", sino distinto.

**Actividad 6.** Depende del costo de cada error: para una persona, perder un aviso importante (fp) suele doler más; para un banco, dejar pasar un fraude (fn).

**Actividad 7.** Respuestas libres. Ideas: revisar la proporción de clases, varias personas etiquetando, medir `fp` y `fn` por separado, no usar mensajes privados sin permiso.

**Preguntas de cierre.**

1. Aprendió conteos de palabras por clase. No entiende significado.
2. Multiplicar muchos números pequeños da 0 (*underflow*); los logs lo evitan.
3. Para medir su comportamiento con datos nuevos, no cuánto memorizó.
4. "¿Cómo están repartidas las clases?" y "¿qué errores comete: fp o fn?".
5. En las reglas, una persona; en el modelo, los datos (y quien los reunió y etiquetó).
