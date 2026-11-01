# Detective de mensajes: entrena tu propio filtro anti-spam
### Taller corto de autoestudio: 2 horas de estudio (120 minutos)

**Necesitas:** Chrome o Edge y VS Code · **Sin internet, sin cuenta, sin API key** · **Sin profesor: esta guía se explica sola y es completa por sí misma**

Este taller es **autocontenido**: no necesitas saber nada de IA ni haber hecho ningún proyecto antes, y no necesitas leer ningún otro archivo para terminarlo. Está pensado para estudiarlo **tú solo**: cada paso dice qué deberías ver, cada pregunta trae su respuesta desplegable y la página tiene un panel de **Autocomprobación** que revisa tu código por ti.

En dos horas vas a: entender qué es la IA y cómo **aprende de ejemplos**, ver por qué un filtro hecho con reglas se rompe, **programar una sola pieza** (el corazón de un clasificador *Naive Bayes*), medirlo con honestidad y romperlo a propósito para ver cómo nacen los **sesgos**.

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

---

## Empieza aquí (3 pasos)

1. Abre la carpeta `taller-spam` en **VS Code**.
2. Lee [Cómo estudiar esto solo](#cómo-estudiar-esto-solo) (4 minutos): ritmo, consola, qué hacer si te atascas.
3. Sigue el Bloque 1.

---

## Tu ruta de 120 minutos de estudio

Los minutos son **tiempo de estudio estimado**, con las actividades y las respuestas escritas. No es un reloj: tómate el tiempo que necesites.

| # | Minutos | Acumulado | Bloque | Al terminar tendrás... |
|---|---|---|---|---|
| 1 | 25 | 25 | ¿Qué es la IA? Reglas contra ejemplos | Claro qué es IA/ML/DL y por qué un filtro de reglas falla |
| 2 | 10 | 35 | Del texto a los números | Entender qué "ve" la máquina |
| 3 | 15 | 50 | Cómo aprende una máquina (Naive Bayes) | La intuición: contar para decidir |
| 4 | 5 | 55 | Descanso | Agua y estirarse |
| 5 | 5 | 60 | Preparar el taller | La página abierta con el modelo corto |
| 6 | 20 | 80 | **El TODO:** `clasificar` | Un detective que da veredictos |
| 7 | 10 | 90 | Explicar, enseñar y comparar | Ver por qué decide y compararlo con las reglas |
| 8 | 10 | 100 | Medir con el examen | Exactitud, matriz de confusión y la trampa |
| 9 | 10 | 110 | Romper y sesgar | Ver cómo los datos crean injusticia |
| 10 | 10 | 120 | Ética y cierre | Preguntas de cierre |
| | **120** | | **Total** | |

> **Regla de oro:** guarda el archivo (`Ctrl+S`) y recarga `index.html` con **F5** cada vez. Si algo falla, la página muestra un cuadro amarillo con la pista, y el botón **Ejecutar autocomprobación** te dice qué parte está bien.

---

## Cómo estudiar esto solo

### 1. Ritmo sugerido, con puntos de parada naturales

**Plan A · 2 sesiones de 1 hora** (recomendado)

| Sesión | Bloques | Minutos | Dónde parar |
|---|---|---|---|
| 1 | 1 a 5 | 25 + 10 + 15 + 5 + 5 = 60 | Al terminar el Bloque 5 (la página abierta con el modelo corto) |
| 2 | 6 a 10 | 20 + 10 + 10 + 10 + 10 = 60 | Final del taller |

**Plan B · 5 sesiones cortas** (si tienes ratos libres de unos 20 a 30 minutos)

| Sesión | Bloques | Minutos |
|---|---|---|
| 1 | 1 | 25 |
| 2 | 2, 3 y 4 | 10 + 15 + 5 = 30 |
| 3 | 5 y 6 | 5 + 20 = 25 |
| 4 | 7 y 8 | 10 + 10 = 20 |
| 5 | 9 y 10 | 10 + 10 = 20 |

**Antes de cada sesión (1 minuto):** lee el "Resumen en 5 líneas" del final y las pruebas del último bloque que hiciste. Nunca termines una sesión a mitad del Bloque 6 (el TODO): si te quedas sin tiempo, termina el paso en el que estás y **guarda** (ver más abajo).

### 2. Qué hacer cuando te atascas (la escalera)

Sube **un escalón a la vez**. No saltes a la solución: lo que enseña es intentarlo.

| Escalón | Qué haces | Tiempo máximo |
|---|---|---|
| 1 | **Relee** el paso con calma | 3 min |
| 2 | Lee las **pistas** y la tabla "Si no te sale…" del bloque | 3 min |
| 3 | Pulsa **Ejecutar autocomprobación** en la página (o escribe `autocomprobar()` en la consola) y lee el ❌ con su pista | 5 min |
| 4 | Abre la consola (F12) y lee el **mensaje de error rojo**: dice el archivo y la línea | 5 min |
| 5 | Mira la **solución del taller largo** (`soluciones/modelo.solucion.js`), solo la parte de `clasificar`. Cierra el archivo y escríbela con tus palabras | cuando llegues aquí |

### 3. Cómo guardar tu progreso

Al final de cada sesión: cierra VS Code, clic derecho sobre la carpeta `taller-spam` > **Copiar** y **Pegar** en el mismo lugar (se crea `taller-spam - copia`). O, si usas Git, abre una terminal en la carpeta y escribe `git init`, `git add .` y `git commit -m "Sesion 1"`. Para guardar solo tu código, copia `modelo.js` con otro nombre (por ejemplo `modelo.sesion1.js`).

### 4. Cómo abrir la consola del navegador (F12)

En **Chrome o Edge en Windows**:

1. Abre la página: doble clic en `index.html`. Si se abre en otro navegador, clic derecho > *Abrir con* > Chrome o Edge.
2. Pulsa **F12**. Se abre el panel de *Herramientas para desarrolladores*.
3. Haz clic en la pestaña **Consola** (*Console* en inglés). Si no la ves, haz clic en el icono `»` al final de las pestañas.
4. Haz clic en la línea de abajo (empieza con `>`), pega tu código con **Ctrl+V** y pulsa **Enter**. El resultado aparece justo debajo.

**Atajos:** `Ctrl+Shift+J` abre la consola directo; flecha ↑ repite la línea anterior; `Shift+Enter` escribe varias líneas sin ejecutar; `Ctrl+L` limpia.

- Si Chrome te pide escribir `allow pasting`, escríbelo, pulsa Enter y vuelve a pegar. Es una protección normal.
- **Una instrucción a la vez:** si pegas varias líneas juntas, la consola ejecuta todo pero **solo muestra el valor de la última**. Cuando una guía diga "línea por línea" o "una por una", pega y ejecuta cada línea por separado (Enter) para ver cada resultado.
- **Al recargar (F5) la consola se vacía**: lo que pegaste se pierde y hay que pegarlo de nuevo.
- Una línea sola como `const x = 5` muestra `undefined`: es normal.
- La consola muestra las listas con su tamaño delante y comillas simples, por ejemplo `(5) ['gana', 'dinero', 'ya', '50', 'gratis']`. Es lo mismo que ves en esta guía con otro formato.

### 5. Problemas frecuentes (FAQ)

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| **La página sale en blanco** o sin estilos | Abriste otro archivo, o falta `style.css` | Abre `index.html` de la carpeta `taller-spam`; necesita los demás archivos a su lado |
| La página abre pero **los botones no hacen nada** | Hay un error al cargar un script | F12 > Consola y lee el primer error rojo |
| `... is not defined` | Recargaste y se perdió lo que pegaste, o no estás en `index.html` | Pega otra vez el código, o abre la consola desde `index.html` |
| El cuadro amarillo **"Aún falta completar una parte del código"** no se va | Sigue la línea `pendiente(...)` o no recargaste | Borra esa línea, guarda con **Ctrl+S** y recarga con **F5** |
| ⏳ **Pendiente** en la Autocomprobación | Esa parte aún tiene su línea `pendiente(...)` | No es un error: falta hacerla |
| **CORS** u otro error al cargar archivos | Abriste la página desde un servidor o vista previa | Abre `index.html` con doble clic. No necesita servidor |
| Los **acentos** se ven raros (`Ã³`) | El archivo se guardó con otra codificación | VS Code, abajo a la derecha: codificación > *Guardar con codificación* > **UTF-8** |
| `Invalid or unexpected token` al pegar | **Comillas curvas** (“ ” ‘ ’) copiadas de un PDF o web | Escribe las comillas con el teclado: `"` y `'` |
| Editas y **la página no cambia** | Editaste otro archivo, o el navegador guardó una copia vieja | Edita `modelo.js` de la carpeta principal y recarga con **Ctrl+F5** |
| `Identifier 'x' has already been declared` | Pegaste dos veces un `const` | Recarga con F5 y pega una sola vez |
| La pestaña **se congela** | Un bucle sin fin en tu código | Cierra la pestaña, reabre `index.html` y corrige el bucle |

**F5 contra Ctrl+F5:** F5 recarga usando archivos que el navegador pudo guardar; **Ctrl+F5** obliga a leerlos de nuevo.

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

### Antes de empezar: mini-quiz de arranque

**1. ¿Cómo abres `index.html` para ver la página?**

<details><summary>Respuesta</summary>

Con doble clic (o clic derecho > *Abrir con* > Chrome o Edge).

</details>

**2. ¿Qué tecla abre las herramientas del navegador, con la consola?**

<details><summary>Respuesta</summary>

**F12** (o `Ctrl+Shift+J` para ir directo a la consola).

</details>

**3. ¿Por qué es seguro pegar el código de esta guía en la consola de `index.html`?**

<details><summary>Respuesta</summary>

Porque todo corre en tu navegador, sin internet, y puedes ver cada línea antes de ejecutarla. Aun así, **nunca pegues en la consola código de origen desconocido**.

</details>

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
```

Ahora ejecuta estas dos líneas **una por una**:

```js
neurona([1, 1, 0], pesosSpam, -1)   // "sí": gratis + enlace de un desconocido
neurona([0, 1, 1], pesosSpam, -1)   // "no": enlace, pero lo manda un amigo
```

**Deberías ver:** `undefined` al pegar el primer bloque, y luego `'sí'` y `'no'`. Cambia un peso y mira cómo cambia la decisión.

**Si no te sale…** `neurona is not defined` significa que pegaste solo las dos últimas líneas o recargaste: pega el bloque completo. `Identifier 'pesosSpam' has already been declared`: recarga con F5 y pega una vez.

### 1.3 · Mira el filtro de reglas fallar (14 min)

Antes de que una máquina aprendiera, la gente escribía **listas de palabras sospechosas** con puntos. Ese filtro ya está hecho en `reglas.js`. Veamos qué tan lejos llega.

1. Haz **doble clic en `index.html`**. Verás un cuadro amarillo ("Aún falta completar una parte del código"). Es normal: aún no programas nada.
2. Baja hasta el panel **5. Comparar: reglas vs aprendido**.
3. Escribe estos mensajes arriba (panel 1), pulsa **Analizar** y mira el lado **"Reglas a mano"**:

| Mensaje | Qué deberías ver (reglas) |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, `Puntaje: 11` |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, `Puntaje: -4` |
| `G4na d1nero gr4tis` | **NORMAL**, `Puntaje: 0`: ¡**evasión**! El spammer cambia letras por números |
| `Ganaste el partido` | **SPAM**, `Puntaje: 3`: ¡pero es un mensaje normal! Falta contexto |
| `Te regalo un iPhone` | **NORMAL**, `Puntaje: 2`: suena a estafa, pero ninguna regla sumó lo suficiente |

4. Pulsa **Comparar en el examen**: las reglas sacan **80%** (`16 aciertos de 20`) en el examen de 20 mensajes que están en `datos.js`. El lado del modelo aprendido avisa "aún no está listo": es normal.

**Por qué fallan las reglas:** una persona tiene que prever cada truco, y quien manda spam cambia el truco cada día. La alternativa es **no escribir reglas, sino mostrar ejemplos** y dejar que la máquina descubra qué palabras delatan al spam.

> **Actividad 1 · Rompe unas reglas (4 min).** Inventa un mensaje de spam que el filtro de reglas **no detecte** y uno normal que **marque como spam por error**. Pruébalos en el panel 1. Anota cuánto tardaste.

<details><summary>Respuesta</summary>

Casi siempre se logra en menos de un minuto. Ejemplos que engañan a las reglas: `g4na` o `gr4tis` (evasión) y `Ganaste el partido` (spam falso). Un spam sin palabras del léxico, como `Tienes una vacante, escríbeme al privado`, también se cuela.

</details>

---

## Bloque 2 · Del texto a los números (10 min)

**Meta:** ver exactamente qué "lee" la máquina. Un computador no entiende palabras: hay que **limpiarlas, partirlas y contarlas**.

```
"¡Gana dinero YA! 50% gratis"
   │  1. Normalizar (minúsculas, sin tildes ni signos)
   │  2. Tokenizar  (partir en palabras, cada una es un token)
   ▼  3. Contar     (bolsa de palabras: cuántas veces aparece cada una)
```

En la consola (F12), prueba (estas funciones ya están en `modelo.js`), **una línea por vez**:

```js
normalizar("¡GRATIS! Gana $$ YA")
tokenizar("¡Gana dinero YA! 50% gratis")
```

**Deberías ver:** `'gratis gana ya'` y `(5) ['gana', 'dinero', 'ya', '50', 'gratis']`.

Una **bolsa de palabras** ignora el orden y solo cuenta:

```js
function bolsaDePalabras(texto) {
  const bolsa = {};
  for (const palabra of tokenizar(texto)) bolsa[palabra] = (bolsa[palabra] || 0) + 1;
  return bolsa;
}
bolsaDePalabras("gana gana dinero ya")
```

**Deberías ver:** `{gana: 2, dinero: 1, ya: 1}`. Pierde el orden y el contexto ("el perro muerde al hombre" y "el hombre muerde al perro" dan la misma bolsa), pero aun así funciona muy bien para detectar spam.

> **Actividad 2 · Predice y comprueba (3 min).** Predice qué devuelve `tokenizar("Mamá, ¿vienes a la fiesta?")` y compruébalo. ¿Qué pierde la máquina al quitar tildes y signos?

<details><summary>Respuesta</summary>

**Deberías ver:** `(4) ['mama', 'vienes', 'la', 'fiesta']` (se quita la "a" por tener una sola letra). Se pierden el énfasis y el sentido de las tildes (`papá` y `papa` quedan iguales).

</details>

---

## Bloque 3 · Cómo aprende una máquina (Naive Bayes) (15 min)

**Meta:** entender que **entrenar es contar** y **clasificar es comparar puntajes**. Necesitas lápiz, papel y una calculadora.

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

**Compruébalo en la consola** (`Math.log` es el logaritmo natural, `Math.exp` es `e^x`):

```js
const logSpam = Math.log(3/5) + Math.log(3/13) + Math.log(2/13);
const logNormal = Math.log(2/5) + Math.log(1/10) + Math.log(1/10);
1 / (1 + Math.exp(logNormal - logSpam))
```

**Deberías ver:** `0.8419083255378859` (≈ 0,84, igual que a mano).

> **Actividad 3 · Hazlo tú (5 min).** Calcula a mano la probabilidad de spam de `hola clase` con la misma tabla. Pista: ninguna de las dos palabras aparece en los spam. Compruébala en el Bloque 6.

<details><summary>Respuesta</summary>

- Spam: 3/5 × 1/13 × 1/13 = **0,0036**.
- Normal: 2/5 × 2/10 × 2/10 = **0,016**.
- Probabilidad de spam = 0,0036 ÷ (0,0036 + 0,016) ≈ **0,18** → NORMAL.

Si te dio 0,82, intercambiaste spam y normal.

</details>

---

## Bloque 4 · Descanso (5 min)

Levántate y estírate. Al volver, a programar.

---

## Bloque 5 · Preparar el taller (5 min)

Aquí vas a **reemplazar** `modelo.js` por la versión corta, que trae casi todo hecho. Antes, guardas una copia del original (porque si luego sigues con el taller largo, lo necesitarás).

### Paso 5.1 · Guarda el original como `modelo.original.js`

Elige **una** de estas formas (todas dan el mismo resultado):

**A) Con el mouse en VS Code**

1. En la barra lateral de archivos, clic derecho sobre `modelo.js` > **Copiar**.
2. Clic derecho en un espacio vacío de la lista > **Pegar**. Aparece `modelo copy.js` (o `modelo - copia.js`).
3. Clic derecho sobre esa copia > **Cambiar nombre** (o tecla **F2**) y escribe `modelo.original.js`.

**B) Con la terminal de Windows (PowerShell)**

Abre el Explorador de archivos, entra a la carpeta `taller-spam`, haz clic derecho en un espacio vacío > **Abrir en Terminal**, y escribe:

```
Copy-Item modelo.js modelo.original.js
```

(Si tu terminal es el Símbolo del sistema, el comando es `copy modelo.js modelo.original.js`.)

**Deberías ver:** dos archivos, `modelo.js` y `modelo.original.js`, con el mismo tamaño.

### Paso 5.2 · Copia la versión corta sobre `modelo.js`

**A) Con el mouse en VS Code**

1. Abre `soluciones/modelo.corto.js`. Pulsa **Ctrl+A** y luego **Ctrl+C**.
2. Abre `modelo.js`. Pulsa **Ctrl+A** y luego **Ctrl+V** (reemplaza todo) y **Ctrl+S**.

**B) Con la terminal de Windows (PowerShell), en la misma carpeta**

```
Copy-Item soluciones\modelo.corto.js modelo.js -Force
```

(En el Símbolo del sistema: `copy /Y soluciones\modelo.corto.js modelo.js`.)

**Deberías ver:** al abrir `modelo.js`, las primeras líneas dicen `VERSIÓN CORTA (120 min)` y el archivo tiene 175 líneas.

**Para volver al original** (cuando termines y quieras seguir con el taller largo): `Copy-Item modelo.original.js modelo.js -Force`, o copia `modelo.original.js` encima de `modelo.js` con el mouse, igual que arriba.

### Paso 5.3 · Comprueba que todo cargó

1. Recarga `index.html` (**F5**). Deberías ver la página **sin** cuadro amarillo: `entrenar` ya está hecho. En el panel 3: "ejemplos de spam" = **30**, "ejemplos normales" = **30**, "palabras conocidas" = **347**.
2. Pulsa **Ejecutar autocomprobación** (panel de arriba). **Deberías ver:** `Versión del taller detectada: corta · 10 ✅ · 0 ❌ · 8 ⏳ · 0 ⚪`. Los 10 ✅ son las piezas que ya vienen hechas; los 8 ⏳ son las pruebas de `clasificar`, que aún no existe.
3. Escribe cualquier mensaje y pulsa **Analizar**: aparece el cuadro amarillo "Aún falta completar una parte del código" y el mensaje `TODO 1 sin completar: clasificar debe sumar los logs...`. Eso es lo que vas a arreglar. (En esta versión corta el único TODO se llama "TODO 1".) El lado de las reglas del panel 5 sigue funcionando.
4. Abre `datos.js` y lee 5 mensajes de `ENTRENAMIENTO`. Cada uno tiene `texto` y `etiqueta`: **la etiqueta la puso una persona**.

**Si no te sale…**

| Síntoma | Qué revisar |
|---|---|
| Sigue el cuadro amarillo diciendo "TODO 1 ... entrenar" | Aún tienes el `modelo.js` original: repite el Paso 5.2 y guarda (Ctrl+S) |
| La Autocomprobación dice `versión larga` | Lo mismo: `modelo.js` no es el corto |
| "palabras conocidas" no es 347 | Recarga con **Ctrl+F5** |
| No aparece `modelo.original.js` | Repite el Paso 5.1 **antes** de reemplazar; si ya reemplazaste `modelo.js`, puedes recuperar el original en la carpeta de tu respaldo o volver a descargar el taller |

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

<details><summary>Pista extra: esqueleto con huecos (ábrelo solo si llevas varios minutos atascado)</summary>

```js
for (const palabra of tokenizar(texto)) {
  if (...) continue;
  const lpSpam = ...;
  const lpNormal = ...;
  logSpam += ...;
  logNormal += ...;
  lista.push({ palabra: palabra, aporte: ... });
}
const probSpam = 1 / (1 + Math.exp( ... ));
```

</details>

### Checkpoint 1 · la Autocomprobación

Guarda, recarga y pulsa **Ejecutar autocomprobación**. **Deberías ver:** `Versión del taller detectada: corta · 18 ✅ · 0 ❌ · 0 ⏳ · 0 ⚪` y el mensaje "¡Todo en ✅! Tu modelo pasó todas las pruebas." Las siete líneas **TODO (único) · clasificar** (y la de "todo junto") en ✅.

Si alguna sale ❌, la pista te dice qué hacer. Por ejemplo, "Salió el complemento (1 - 0,842)" significa que invertiste la resta de `Math.exp`, y "Salió justo la probabilidad previa (0,6)" que no sumaste los logs dentro del bucle.

### Checkpoint 2 · la página

Escribe en el panel 1 y pulsa **Analizar**:

| Mensaje | Deberías ver |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, `Probabilidad de spam: 100%`, chips rojos: `gratis +1.9`, `un +1.7`, `premio +1.7`, `clic +1.3` |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, `Probabilidad de spam: 0.6%`, chips verdes como `la -1.7`, `vamos -1.2` |

Y la Actividad 3, en la consola (F12):

```js
clasificar("hola clase", entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}])).probSpam
```

**Deberías ver:** `0.18159806295399497` (≈ **0,18**), igual que tu cálculo a mano.

**Si no te sale…**

| Síntoma | Qué revisar |
|---|---|
| Sigue el cuadro amarillo | Queda la línea `const probSpam = pendiente(...)`; bórrala y escribe la fórmula |
| `probSpam` es `NaN` | Multiplicaste en vez de sumar, o escribiste mal un nombre (`lpspam` en vez de `lpSpam`) |
| Probabilidades extremas siempre | Usaste `Math.log10` con `Math.exp`: solo `Math.log` combina con `Math.exp` |
| Todo da casi 50 % | Calculaste `lpSpam` pero no lo sumaste a `logSpam` |
| Editas y no cambia | Editaste el archivo de `soluciones/` en vez de `modelo.js`, o necesitas Ctrl+F5 |
| Error de sintaxis | F12 > Consola dice la línea: suele faltar un `}` o `)` |

> **Actividad 4 · Qué palabra pesa más (2 min).** ¿Cuál de tus dos mensajes tiene la palabra más "pesada" (el chip con el número más grande)? ¿Esa palabra es una razón real o una casualidad de estos datos?

<details><summary>Respuesta</summary>

En el primer mensaje, `gratis` (+1,9) y `premio` (+1,7) son los más pesados; en el segundo, `la` (−1,7). `gratis` y `premio` son un patrón real en estos datos, pero el modelo no sabe *por qué*: solo contó. Y `la` pesa porque es muy frecuente en los mensajes normales de entrenamiento: puede ser una casualidad de estos 60 mensajes.

</details>

---

## Bloque 7 · Explicar, enseñar y comparar (10 min)

**Meta:** ver *por qué* decide el detective, comprobar que **aprende de nuevo** sin tocar el código y compararlo con las reglas.

1. Analiza `Tu banco te regala dinero gratis, confirma tu clave`. Mira los chips: `tu` pesa más (`+3.2`) que `dinero` (`+2.0`). ¿Por qué? (Aparece en 20 spam y solo en 3 normales: los spam le hablan al lector.)
2. Escribe `Hola, soy Camila de recursos humanos, tengo una vacante para ti, escríbeme al privado` y pulsa **Analizar**. Da `Probabilidad de spam: 41%` (NORMAL), pero es un spam disfrazado.
3. Pulsa **Es SPAM** en "Enséñale al detective". **Deberías ver:** "Listo: lo guardé como SPAM..." y la probabilidad sube a **99.7%**.
4. Pulsa **Restaurar datos originales**.
5. Baja al panel **5** y pulsa **Comparar en el examen**. **Deberías ver:** reglas **80%**, modelo aprendido **90%**, con **4** mensajes en los que no están de acuerdo.

> **Actividad 5 · Datos o código (2 min).** ¿Qué cambió en el paso 3: el código o los datos? ¿Eso es "aprender"? Y de los 4 desacuerdos, ¿quién acierta más?

<details><summary>Respuesta</summary>

Cambiaron solo los **datos** (agregaste un ejemplo etiquetado). Sí es aprender: el comportamiento mejora con la experiencia. De los 4 desacuerdos, el modelo acierta **3** (paquete retenido, "Última oportunidad", "Reunión urgente") y las reglas **1** (la tarjeta del banco): no es "mejor en todo", sino distinto.

</details>

**Checkpoint:** viste que cambiar el dato cambió la decisión.

---

## Bloque 8 · Medir con el examen (10 min)

**Meta:** medir con mensajes que el modelo **nunca vio** y leer una matriz de confusión.

1. Pulsa **Tomar el examen**. **Deberías ver:**

| Medida | Valor |
|---|---|
| Exactitud | **90%** (`18 aciertos de 20`) |
| Spam atrapado / spam que se coló | 9 / 1 |
| Mensaje bueno al spam / normal bien | 1 / 9 |
| Errores | El de **Camila** (`Era spam, dijo normal (prob. spam: 41%)`) y el de la **tarjeta del banco** (`Era normal, dijo spam (prob. spam: 54%)`) |

2. Lee la matriz: la diagonal verde son los aciertos; las celdas rojas son los dos tipos de error.
   - **Falso positivo (fp):** un mensaje bueno enviado al spam.
   - **Falso negativo (fn):** un spam que se coló.

3. **La trampa de la exactitud.** Si el 99 % de los mensajes fueran normales, un "modelo" que siempre dice *normal* acertaría el 99 % ¡y no atraparía ningún spam! En la consola:

```js
const normales = PRUEBA.filter(e => e.etiqueta === "normal");
evaluar(estado.modelo, normales.concat([PRUEBA[5]]))
```

**Deberías ver:** `{exactitud: 0.8181818181818182, vp: 0, fp: 1, vn: 9, fn: 1, total: 11, errores: Array(2)}`: exactitud **81,8 %** (`vp: 0`), mientras que "siempre normal" tendría 10 de 11 = **90,9 %**.

4. **Por qué un examen aparte:** evalúa también con los mismos datos de entrenamiento:

```js
evaluar(estado.modelo, ENTRENAMIENTO).exactitud
```

**Deberías ver:** `1` (el modelo ya vio esos mensajes), pero en el examen sacó 0,9. Una nota alta con datos vistos no demuestra nada.

> **Actividad 6 · ¿Cuál error duele más? (3 min).** ¿Qué es peor para ti, un falso positivo o un falso negativo? ¿Y para un banco?

<details><summary>Respuesta</summary>

Depende del costo de cada error. Para una persona, perder un aviso importante (fp) suele doler más; para un banco, dejar pasar un fraude (fn). No hay una respuesta universal: lo importante es justificar con las consecuencias.

</details>

**Si no te sale…** si `estado is not defined`, no estás en la consola de `index.html`; si `estado.modelo` es `null`, la página no pudo entrenar: mira el cuadro amarillo.

---

## Bloque 9 · Romper y sesgar (10 min)

**Meta:** ver cómo datos incompletos o desbalanceados producen un modelo injusto. **Un sesgo** es una tendencia injusta que el modelo aprende de sus datos.

| Experimento | Qué haces | Resultado esperado |
|---|---|---|
| Dataset sesgado | Marca "Cargar dataset sesgado" (30 spam, 3 normales) y toma el examen | Exactitud **65%**, 7 falsos positivos. `Hola, ¿vamos a estudiar mañana en la biblioteca?` ahora sale **SPAM** (`51.7%`) |
| Sin lo normal | Restaura, pulsa "Quitar todo lo normal", toma el examen | **50%**: todo es spam |
| Sin spam | Restaura, pulsa "Quitar todo el spam", toma el examen | **50%**: nada es spam |
| Tu propio sesgo | Restaura, escribe `Suscríbete a nuestro boletín semanal de ofertas de tecnología` (sale SPAM, `66.3%`) y pulsa **Es NORMAL** una vez | Baja a `2%`: el modelo toma tu criterio |
| Mensajes legítimos | Restaura y prueba `Tu pedido fue enviado, sigue tu paquete en este enlace` | **SPAM** (`99.6%`): no distingue un pedido real del spam |

**Qué pasó:** lo que no está en los datos, el modelo no lo conoce. Y reconoce **palabras**, no **intenciones**. No olvides pulsar **Restaurar datos originales** al terminar.

> **Actividad 7 · Escribe el porqué (2 min).** Con tus palabras, en dos líneas: ¿por qué el dataset sesgado hace que `Hola, ¿vamos a estudiar...?` salga SPAM?

<details><summary>Respuesta</summary>

Porque el modelo casi no vio mensajes normales (solo 3): no conoce cómo suena una conversación cotidiana, y además el spam era 10 veces más frecuente en sus datos. Cualquier palabra rara o poco vista se inclina hacia el lado que tiene más ejemplos. Es sesgo por **datos incompletos y desbalanceados**.

</details>

---

## Bloque 10 · Ética y cierre (10 min)

### Piensa y escribe (4 min)

Responde por escrito en tu cuaderno, y luego abre la respuesta modelo:

**1. ¿Quién decide qué es spam?**

<details><summary>Respuesta</summary>

Una persona etiquetó los datos, y otra puede discrepar. "Spam" depende de la persona y del contexto: por eso un modelo repite el criterio de quien etiquetó.

</details>

**2. ¿Spam para quién?**

<details><summary>Respuesta</summary>

Un boletín al que te suscribiste, o una oferta de trabajo real con la palabra "oferta", no son spam para quien los quiere, pero el filtro los puede marcar igual.

</details>

**3. ¿Quién paga el error?**

<details><summary>Respuesta</summary>

Un falso positivo puede ocultar un aviso médico o una oferta laboral real; lo paga más quien depende de ese mensaje. Los errores no se reparten parejo.

</details>

**4. ¿Y la privacidad?**

<details><summary>Respuesta</summary>

Un filtro real lee mensajes de personas: hace falta permiso, minimizar los datos y protegerlos. Tu detective corre en tu navegador y no envía nada a ningún servidor.

</details>

> **Actividad 8 · Reglas de buenas prácticas (3 min).** Escribe **dos reglas** para quien entrene un filtro como este (por ejemplo: "revisar qué proporción de cada clase hay antes de entrenar").

<details><summary>Respuesta</summary>

Respuestas libres. Ideas válidas: revisar la proporción de clases, que varias personas etiqueten, medir `fp` y `fn` por separado, probar con mensajes legítimos que parecen spam, usar datos de prueba separados, no usar mensajes privados sin permiso, permitir rescatar un mensaje bueno de la carpeta de spam.

</details>

### Preguntas de cierre (3 min)

**1. ¿Qué "aprendió" exactamente tu modelo? ¿Entiende lo que dice un mensaje?**

<details><summary>Respuesta</summary>

Aprendió conteos de palabras por clase. No entiende el significado.

</details>

**2. ¿Por qué sumamos logaritmos en vez de multiplicar?**

<details><summary>Respuesta</summary>

Multiplicar muchos números pequeños da 0 (*underflow*); los logaritmos lo evitan.

</details>

**3. ¿Por qué evaluamos con mensajes que el modelo no vio?**

<details><summary>Respuesta</summary>

Para medir su comportamiento con datos nuevos, no cuánto memorizó.

</details>

**4. Si te dicen "el modelo acierta el 99 %", ¿qué dos preguntas haces antes de creerlo?**

<details><summary>Respuesta</summary>

"¿Cómo están repartidas las clases?" y "¿qué errores comete: fp o fn?".

</details>

**5. ¿Quién fijó los pesos: una persona (reglas) o los datos (modelo)?**

<details><summary>Respuesta</summary>

En las reglas, una persona; en el modelo, los datos (y quien los reunió y etiquetó).

</details>

**6. Un modelo tiene vp 9, fn 1, fp 1, vn 9. ¿Cuál es su exactitud?**

<details><summary>Respuesta</summary>

(9 + 9) ÷ 20 = **0,90**.

</details>

### Resumen en 5 líneas

1. La IA detecta **patrones**; el ML aprende de ejemplos con etiqueta (supervisado, en tu caso).
2. Un texto se **normaliza, tokeniza y cuenta** (bolsa de palabras); las reglas a mano se rompen con evasión, negación y contexto.
3. **Entrenar es contar** y **clasificar es comparar puntajes** (sumando logaritmos, con el +1 de suavizado).
4. Se mide con datos que el modelo **no vio**: exactitud, matriz de confusión, fp y fn.
5. Los datos crean **sesgos**: lo que no está en los datos, el modelo no lo conoce.

---

## Números esperados (para comparar tus resultados)

Calculados ejecutando el código con los datos que trae el taller:

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
| El cuadro amarillo sigue ahí | Dejaste la línea `const probSpam = pendiente(...)` o no recargaste (F5) |
| `probSpam` es `NaN` o aparece un error rojo en la consola | Nombre de variable mal escrito (`lpspam` en vez de `lpSpam`) o no usaste `logProbPalabra` |
| Todo sale ~50 % | Calculaste `lpSpam` pero no lo sumaste a `logSpam` |
| Probabilidades extremas siempre | Multiplicaste en vez de sumar logs, o usaste `Math.log10` con `Math.exp` |
| Editaste y no cambia | Editaste el archivo de `soluciones/` en vez de `modelo.js`, o el navegador guardó caché (Ctrl+F5) |
| Exactitud 100 % | Enseñaste mensajes del examen (fuga de datos): pulsa "Restaurar datos originales" |
| `Identifier ... has already been declared` en la consola | Pegaste dos veces un `const`; recarga con F5 |

---

## Siguiente paso: si quieres seguir

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
| Respuestas, números esperados y autoevaluación final | [99 · Soluciones y autoevaluación](./largo/99-soluciones-y-autoevaluacion.md) |

**Para seguir con el código (módulo 06):** vuelve al original que guardaste en el Bloque 5. En la terminal, dentro de la carpeta: `Copy-Item modelo.original.js modelo.js -Force`, o con el mouse: abre `modelo.original.js`, `Ctrl+A`, `Ctrl+C`; abre `modelo.js`, `Ctrl+A`, `Ctrl+V`, `Ctrl+S`. Recarga la página: la Autocomprobación mostrará `versión larga · 2 ✅ · 0 ❌ · 16 ⏳` y habrá 4 TODO por programar. Si hiciste solo la versión corta, un buen siguiente paso es el [Módulo 06](./largo/06-programa-tu-detective.md), que programa también `entrenar`, `logProbPalabra` y `evaluar`.
