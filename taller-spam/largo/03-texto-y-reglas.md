# Módulo 03 · Texto para máquinas y filtro por reglas

> **Curso:** Detective de mensajes ([índice del taller largo](../TALLER_LARGO.md)) · **Duración:** 60 min · **Anterior:** [Módulo 02](./02-redes-neuronales.md) · **Siguiente:** [Módulo 04](./04-chatbots-y-llm.md) · **Glosario:** [00-glosario.md](./00-glosario.md)

## Antes de empezar

**Recuerda del módulo anterior:** una neurona multiplica entradas por pesos y decide; entrenar es ajustar los pesos. Pero las entradas eran **números** (0 o 1). Un mensaje es **texto**. ¿Cómo se convierte un texto en números? De eso trata este módulo.

Si llegas sin el módulo 02, solo necesitas saber abrir la consola del navegador: abre `index.html`, pulsa **F12** y entra a la pestaña **Consola**.

Después, programarás (mejor dicho, **leerás y romperás**) el primer filtro de spam: uno hecho con **reglas escritas a mano**. Sirve como punto de comparación: más adelante tu filtro aprendido tendrá que ganarle.

## Objetivos

- [ ] Explicar por qué un computador necesita convertir el texto en piezas y números.
- [ ] Usar `normalizar` y `tokenizar` y predecir lo que devuelven.
- [ ] Explicar qué es una **bolsa de palabras** y qué información pierde.
- [ ] Leer `reglas.js`: un léxico con puntajes, un umbral y una regla de negación.
- [ ] Mostrar con ejemplos reales **tres límites** de un filtro por reglas: evasión, negación y contexto.

## Mapa de tiempos

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Normalizar: limpiar el texto | 10 |
| 2 | Tokenizar y bolsa de palabras | 10 |
| 3 | El filtro por reglas: explora `reglas.js` | 15 |
| 4 | Descanso | 5 |
| 5 | Rompe las reglas | 15 |
| 6 | Cierre | 5 |
| | **Total** | **60** |

---

## Parte 1 · Normalizar: limpiar el texto (10 min)

Un computador **no entiende palabras**, solo números. Al trabajo de hacer que las máquinas manejen lenguaje humano se le llama **Procesamiento de Lenguaje Natural** (**PLN**, o **NLP** en inglés). Los pasos típicos son estos:

```
"¡GRATIS! Gana $$$ YA"
   │  1. Limpiar (normalizar)  →  "gratis gana ya"
   │  2. Separar en trozos     →  ["gratis", "gana", "ya"]     (cada trozo se llama token)
   │  3. Pasar a números       →  conteos o puntajes
   ▼  4. Analizar / decidir    →  spam o normal
```

### Por qué se normaliza

Para una máquina, `Gratis`, `GRATIS` y `gratis` son **tres palabras distintas**. Si no las limpias, tienes que enseñarle las tres. Normalizar es hacer que variantes iguales **valgan lo mismo**:

| Paso | Qué hace | Ejemplo |
|---|---|---|
| Minúsculas | `GRATIS` → `gratis` | Un solo "gratis" |
| Quitar tildes | `promoción` → `promocion` | Da igual si el spammer olvida la tilde |
| Quitar signos | `¡Gana!` → `gana` | Los signos no suman a la palabra |

Esto ya está hecho en `modelo.js` (la función `normalizar`). Pruébala en la consola:

```js
normalizar("¡GRATIS! Gana $$$ YA")
```

**Checkpoint · deberías ver:** `"gratis gana ya"`.

> **Actividad 1 · Predice y comprueba (5 min).** Antes de ejecutar, escribe en papel qué devolverá `normalizar("PROMOCIÓN!!! Compra ya")`. Después compruébalo. ¿Acertaste?

---

## Parte 2 · Tokenizar y bolsa de palabras (10 min)

**Tokenizar** es partir el texto limpio en piezas, llamadas **tokens**. Aquí cada token es una palabra. `tokenizar` también descarta las palabras de una sola letra (como "a" o "y").

```js
tokenizar("¡Gana dinero YA! 50% gratis")
```

**Checkpoint · deberías ver:** `["gana", "dinero", "ya", "50", "gratis"]`.

### La bolsa de palabras

Una forma muy usada de pasar un texto a números es la **bolsa de palabras**: ignorar el orden y solo **contar** cuántas veces aparece cada palabra.

```js
function bolsaDePalabras(texto) {
  const bolsa = {};
  for (const palabra of tokenizar(texto)) bolsa[palabra] = (bolsa[palabra] || 0) + 1;
  return bolsa;
}
bolsaDePalabras("gana gana dinero ya")
```

**Checkpoint · deberías ver:** `{gana: 2, dinero: 1, ya: 1}`.

> **Analogía:** imagina vaciar las palabras de una frase dentro de una bolsa y agitarla. Sabes **qué palabras hay y cuántas**, pero ya no sabes en qué orden estaban.

### Lo que se pierde

```js
const bolsaA = bolsaDePalabras("el perro muerde al hombre");
const bolsaB = bolsaDePalabras("el hombre muerde al perro");
JSON.stringify(Object.entries(bolsaA).sort()) === JSON.stringify(Object.entries(bolsaB).sort())
```

**Checkpoint · deberías ver:** `true`. Dos frases con significados muy distintos producen **la misma bolsa**. Es una limitación real, y aun así esta técnica funciona sorprendentemente bien para detectar spam.

> **Actividad 2 · ¿Qué pierde el modelo? (5 min, en parejas).** Predice qué devuelve `tokenizar("Mamá, ¿vienes a la fiesta?")` y luego compruébalo. Responde:
> 1. ¿Qué información se pierde al quitar las tildes y los signos?
> 2. ¿Qué pasa con `¡¡GRATIS!!!` frente a `gratis`? ¿Es bueno o malo para un filtro?
> 3. ¿Qué pasa con el orden de las palabras?

---

## Parte 3 · El filtro por reglas: explora `reglas.js` (15 min)

Antes de que una máquina aprendiera, la gente escribía **listas de palabras sospechosas**. Es el mismo diseño de un **léxico**: un diccionario de palabras con puntaje.

```
"Ganaste un premio gratis"  →  ganaste (+3) + premio (+3) + gratis (+2) = +8  →  ¡spam!
"Hola, ¿vamos a estudiar?"  →  estudiar (−2)                              = −2  →  normal
```

La regla es simple: **si la suma llega al umbral, es spam**.

### Tour por `reglas.js`

Abre `reglas.js` en VS Code. Tiene cuatro piezas. Léelas **sin cambiarlas todavía**:

| Pieza | Qué hace |
|---|---|
| `LEXICO_SPAM` | Diccionario palabra → puntos. Positivo = suena a spam; negativo = suena a conversación normal |
| `UMBRAL_REGLAS` | Cuántos puntos hacen falta para decir "spam" (vale **3**) |
| Regla de negación | Si hay un "no", "nunca", "jamas" o "tampoco" en las **dos palabras anteriores**, el puntaje de esa palabra cambia de signo |
| `puntuarPorReglas(texto)` | Devuelve `{ puntaje, etiqueta, coincidencias }` |
| `evaluarReglas(prueba)` | Devuelve exactitud y matriz de confusión (`vp`, `fp`, `vn`, `fn`) |

> `reglas.js` **no depende** de `modelo.js`. Funciona aunque tus TODO estén pendientes.

### Pruébalo

En la consola:

```js
puntuarPorReglas("Ganaste un premio gratis, haz clic en el enlace")
```

**Checkpoint · deberías ver:** puntaje **11**, etiqueta `"spam"` y la lista de `coincidencias` (`ganaste +3`, `premio +3`, `gratis +2`, `clic +2`, `enlace +1`).

```js
puntuarPorReglas("Hola, ¿vamos a estudiar mañana en la biblioteca?")
```

**Checkpoint · deberías ver:** puntaje **-4**, etiqueta `"normal"` (`estudiar -2`, `biblioteca -2`).

### El examen de las reglas

```js
evaluarReglas(PRUEBA)
```

**Checkpoint · deberías ver:** `exactitud: 0.8`, `vp: 6`, `fn: 4`, `fp: 0`, `vn: 10`. Es decir, acierta **16 de 20**: nunca bloquea un mensaje bueno, pero **deja pasar 4 spam**.

También lo puedes ver en la página: baja hasta el panel **5. Comparar: reglas vs aprendido**, escribe un mensaje en el panel 1, pulsa **Analizar** y mira el lado "Reglas a mano". El lado "Modelo aprendido" te avisará que aún no está listo (¡aún no programas tu detective!). Pulsa **Comparar en el examen** y verás **80 %** para las reglas.

> **Actividad 3 · Lee los errores (5 min, en parejas).** Ejecuta `evaluarReglas(PRUEBA).errores`. Son los 4 spam que se colaron. Para cada uno, escribe **por qué** las reglas lo dejaron pasar (¿qué palabra faltaba? ¿cuántos puntos sumó?).

---

## Parte 4 · Descanso (5 min)

Estira las piernas. Cuando vuelvas, vas a hacer lo que hace un spammer: **engañar al filtro**.

---

## Parte 5 · Rompe las reglas (15 min)

Un filtro de reglas es honesto y fácil de explicar, pero tiene límites. Vamos a verlos con ejemplos.

### Límite 1 · La evasión

El spammer escribe la palabra de otra forma para que no coincida con tu lista:

```js
puntuarPorReglas("Gana dinero gratis")
puntuarPorReglas("G4na d1nero gr4tis")
```

**Checkpoint · deberías ver:** el primero da puntaje **3** (`"spam"`, justo en el umbral); el segundo da puntaje **0** (`"normal"`). Para tus ojos es el mismo mensaje; para la lista, son palabras desconocidas.

### Límite 2 · La negación (o "los límites de una regla simple")

Nuestra regla mira solo las **dos palabras anteriores**. Prueba:

```js
puntuarPorReglas("No quiero dinero gratis")
puntuarPorReglas("No pierdas premio")
```

**Checkpoint · deberías ver:** el primero da puntaje **1** (`"normal"`: "no" invirtió a `dinero`, pero `gratis` está más lejos); el segundo da **-3** (`"normal"`: "no" invirtió a `premio`, aunque ese mensaje sigue siendo una oferta).

La regla se comporta bien con "No es gratis" (puntaje -2) y mal con "No pierdas premio". Con más reglas arreglarías un caso, pero aparecerían otros.

### Límite 3 · El contexto

```js
puntuarPorReglas("Ganaste el partido")
puntuarPorReglas("Te regalo un iPhone")
```

**Checkpoint · deberías ver:** el primero da **3** (`"spam"`, ¡pero es un mensaje normal!); el segundo da **2** (`"normal"`, pero suena a estafa). Las reglas miran palabras sueltas, no el contexto.

### Ajustar sin hacer trampa

Una tentación: "agrego las palabras que fallaron en el examen y listo". Eso es **hacer trampa**: ya viste las respuestas, y el 100 % de ahora no dice nada de mensajes nuevos. (Se llama **fuga de datos** y la estudiarás en el módulo 07.)

La forma honesta es mejorar las reglas mirando **solo** `ENTRENAMIENTO`, y usar `PRUEBA` una sola vez, al final.

> **Actividad 4 · Mejora las reglas, con honestidad (10 min, en parejas).**
> 1. Ejecuta `evaluarReglas(ENTRENAMIENTO).fn`. Verás cuántos spam de entrenamiento se escapan (**7**).
> 2. Ejecuta `evaluarReglas(ENTRENAMIENTO).errores.map(e => e.texto)` y lee esos mensajes.
> 3. Abre `reglas.js` y **agrega palabras** a `LEXICO_SPAM` que ayuden a atrapar esos spam (mira solo los de entrenamiento). Guarda y recarga (**F5**).
> 4. Mide otra vez con `evaluarReglas(ENTRENAMIENTO)` y, **solo cuando termines**, una vez con `evaluarReglas(PRUEBA)`.
> 5. Respondan: ¿subió la exactitud en el examen tanto como en el entrenamiento? ¿Cuánto tiempo les tomó? ¿Y si mañana el spammer cambia de truco?
>
> *Tip:* en la consola puedes probar un cambio sin editar el archivo, por ejemplo `LEXICO_SPAM.gana = 2`. Se pierde al recargar.

---

## Parte 6 · Cierre (5 min)

Reúnanse en grupos de cuatro y completen la tabla en el tablero:

| Filtro por reglas | Aprender de ejemplos (próximos módulos) |
|---|---|
| Fácil de explicar | ¿? |
| Se rompe con evasión | ¿? |
| Alguien debe escribir y mantener las reglas | ¿? |

Dejen las celdas de la derecha como hipótesis. Las verificarás en los módulos 05 a 07.

---

## Checkpoints

- [ ] `normalizar("¡GRATIS! Gana $$$ YA")` → `"gratis gana ya"`.
- [ ] `tokenizar("¡Gana dinero YA! 50% gratis")` → `["gana", "dinero", "ya", "50", "gratis"]`.
- [ ] `evaluarReglas(PRUEBA)` → exactitud `0.8`, `fn: 4`.
- [ ] Encontraste al menos un mensaje que engaña a las reglas.

## Errores comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `puntuarPorReglas is not defined` | Abriste otra página, o `index.html` no carga `reglas.js` | Abre `index.html` de esta carpeta y revisa que exista `<script src="reglas.js">` |
| Tus cambios a `LEXICO_SPAM` desaparecen | Los hiciste en la consola | Edítalos en `reglas.js`, guarda y recarga (**F5**) |
| La exactitud sube al 100 % de repente | Agregaste palabras mirando `PRUEBA` | Eso es fuga de datos; vuelve a empezar mirando solo `ENTRENAMIENTO` |
| `Unexpected token` al editar `LEXICO_SPAM` | Falta una coma entre palabras o sobra una al final de una línea | Revisa las comas del diccionario |
| `tokenizar` devuelve menos palabras de las que esperabas | Descarta las de una sola letra | Es intencional; mira la función en `modelo.js` |

## Resumen

- Para una máquina, el texto se **limpia** (normalizar), se **parte** (tokenizar) y se **cuenta** (bolsa de palabras).
- La bolsa de palabras pierde el **orden** y el **contexto**.
- Un filtro por reglas suma puntos de un léxico y compara con un umbral. Es claro y rápido.
- Sus límites: **evasión**, **negación** mal manejada y **falta de contexto**. Mejorarlo cuesta trabajo humano continuo.
- Si ajustas mirando el examen, haces **trampa** sin querer.

## Preguntas de cierre

1. ¿Por qué `GRATIS` y `gratis` deben tratarse como la misma palabra?
2. ¿Qué información pierde una bolsa de palabras?
3. Nombra un truco que engañe a un filtro de reglas y explica por qué funciona.
4. ¿Por qué es trampa agregar palabras al léxico mirando los mensajes del examen?

**Siguiente paso:** [Módulo 04 · Chatbots y modelos de lenguaje (LLM)](./04-chatbots-y-llm.md).
