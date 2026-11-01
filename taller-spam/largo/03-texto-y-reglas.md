# Módulo 03 · Texto para máquinas y filtro por reglas

> **Tiempo de estudio:** 60 min · **Anterior:** [Módulo 02](./02-redes-neuronales.md) · **Siguiente:** [Módulo 04](./04-chatbots-y-llm.md) · **Glosario:** [00-glosario.md](./00-glosario.md) · **Ayuda y consola:** [TALLER_LARGO.md](../TALLER_LARGO.md#cómo-estudiar-esto-solo)

**Meta de este módulo:** entender cómo se convierte un texto en piezas que una máquina puede contar, y **probar y romper** un filtro de spam hecho con reglas escritas a mano. Ese filtro será tu punto de comparación: más adelante tu modelo que aprende tendrá que ganarle.

## Antes de empezar: ¿estás listo?

**Recuerda del módulo anterior:** una neurona multiplica entradas por pesos y decide; entrenar es ajustar los pesos. Pero las entradas eran **números** (0 o 1). Un mensaje es **texto**. ¿Cómo se convierte un texto en números? De eso trata este módulo.

**1. En una neurona, ¿cuándo dice "sí"?**

<details><summary>Respuesta</summary>

Cuando la suma de (entrada × peso) más el sesgo es **mayor que 0**.

</details>

**2. Con la consola abierta (F12), ¿qué responde `2 + 3 * 4`?**

<details><summary>Respuesta</summary>

`14` (la multiplicación va primero). Si no pudiste escribirlo, repasa [cómo abrir la consola](../TALLER_LARGO.md#4-cómo-abrir-la-consola-del-navegador-f12): abre `index.html`, pulsa F12, pestaña *Consola*, haz clic en la línea de abajo y escribe.

</details>

**3. ¿Qué es una etiqueta?**

<details><summary>Respuesta</summary>

La respuesta correcta de un ejemplo, puesta por una persona (aquí, `"spam"` o `"normal"`).

</details>

## Objetivos

- [ ] Explicar por qué un computador necesita convertir el texto en piezas y números.
- [ ] Usar `normalizar` y `tokenizar` y predecir lo que devuelven.
- [ ] Explicar qué es una **bolsa de palabras** y qué información pierde.
- [ ] Leer `reglas.js`: un léxico con puntajes, un umbral y una regla de negación.
- [ ] Mostrar con ejemplos reales **tres límites** de un filtro por reglas: evasión, negación y contexto.

## Mapa de tiempos (estudio estimado)

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Normalizar: limpiar el texto | 10 |
| 2 | Tokenizar y bolsa de palabras | 10 |
| 3 | El filtro por reglas: explora `reglas.js` | 15 |
| 4 | Descanso | 5 |
| 5 | Rompe las reglas | 15 |
| 6 | Cierre: quiz y resumen | 5 |
| | **Total** | **60** |

> **Antes de las partes con consola:** abre `index.html` y deja abierta la consola (F12). Las funciones `normalizar`, `tokenizar` y `puntuarPorReglas` ya existen en la página; no tienes que pegarlas.

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

**Deberías ver:** `'gratis gana ya'`.

**Si no te sale…** y la consola dice `normalizar is not defined`, no estás en `index.html` del taller (o `modelo.js` tiene un error de sintaxis: mira el primer error rojo).

> **Actividad 1 · Predice y comprueba (5 min).** Antes de ejecutar, escribe en papel qué devolverá `normalizar("PROMOCIÓN!!! Compra ya")`. Después ejecútalo y compara.

<details><summary>Respuesta</summary>

**Deberías ver:** `'promocion compra ya'`. Pasa a minúsculas, quita la tilde de la Ó y cambia `!!!` por espacios, que luego se juntan en uno solo.

Si tu predicción tenía los signos o las mayúsculas, vuelve a leer la tabla de arriba: la función hace los tres pasos a la vez.

</details>

---

## Parte 2 · Tokenizar y bolsa de palabras (10 min)

**Tokenizar** es partir el texto limpio en piezas, llamadas **tokens**. Aquí cada token es una palabra. `tokenizar` también descarta las palabras de una sola letra (como "a" o "y").

```js
tokenizar("¡Gana dinero YA! 50% gratis")
```

**Deberías ver:** `(5) ['gana', 'dinero', 'ya', '50', 'gratis']`.

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

**Deberías ver:** `{gana: 2, dinero: 1, ya: 1}`.

> **Analogía:** imagina vaciar las palabras de una frase dentro de una bolsa y agitarla. Sabes **qué palabras hay y cuántas**, pero ya no sabes en qué orden estaban.

### Lo que se pierde

```js
const bolsaA = bolsaDePalabras("el perro muerde al hombre");
const bolsaB = bolsaDePalabras("el hombre muerde al perro");
JSON.stringify(Object.entries(bolsaA).sort()) === JSON.stringify(Object.entries(bolsaB).sort())
```

**Deberías ver:** `true`. Dos frases con significados muy distintos producen **la misma bolsa**. Es una limitación real, y aun así esta técnica funciona sorprendentemente bien para detectar spam.

**Si no te sale…**

- `bolsaDePalabras is not defined`: pega otra vez el bloque de la función (la consola olvida todo al recargar).
- `Identifier 'bolsaA' has already been declared`: pegaste dos veces las líneas con `const`. Recarga (F5) y pégalas una vez.

> **Actividad 2 · ¿Qué pierde el modelo? (5 min).** Predice qué devuelve `tokenizar("Mamá, ¿vienes a la fiesta?")` y luego compruébalo. Después responde por escrito:
> 1. ¿Qué información se pierde al quitar las tildes y los signos?
> 2. ¿Qué pasa con `¡¡GRATIS!!!` frente a `gratis`? ¿Es bueno o malo para un filtro?
> 3. ¿Qué pasa con el orden de las palabras?

<details><summary>Respuesta</summary>

**Deberías ver:** `(4) ['mama', 'vienes', 'la', 'fiesta']`. La "a" desaparece porque tiene una sola letra.

1. Se pierde el énfasis y el significado de algunas tildes (`papá` y `papa` son cosas distintas).
2. `¡¡GRATIS!!!` y `gratis` quedan **iguales**: bueno para no depender de signos y mayúsculas, malo si los signos eran una pista (el spam grita mucho).
3. Se pierde el orden, y con él parte del significado ("el perro muerde al hombre" = "el hombre muerde al perro").

</details>

---

## Parte 3 · El filtro por reglas: explora `reglas.js` (15 min)

Antes de que una máquina aprendiera, la gente escribía **listas de palabras sospechosas**. Es el mismo diseño de un **léxico**: un diccionario de palabras con puntaje.

```
"Ganaste un premio gratis"  →  ganaste (+3) + premio (+3) + gratis (+2) = +8  →  ¡spam!
"Hola, ¿vamos a estudiar?"  →  estudiar (−2)                              = −2  →  normal
```

La regla es simple: **si la suma llega al umbral, es spam**.

### Tour por `reglas.js`

Abre `reglas.js` en VS Code. Tiene cinco piezas. Léelas **sin cambiarlas todavía**:

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

**Deberías ver:** `{puntaje: 11, etiqueta: 'spam', coincidencias: Array(5)}`. Despliega `coincidencias` (flechita ▸): `ganaste +3`, `premio +3`, `gratis +2`, `clic +2`, `enlace +1`.

```js
puntuarPorReglas("Hola, ¿vamos a estudiar mañana en la biblioteca?")
```

**Deberías ver:** `{puntaje: -4, etiqueta: 'normal', coincidencias: Array(2)}` (`estudiar -2`, `biblioteca -2`).

### El examen de las reglas

```js
evaluarReglas(PRUEBA)
```

**Deberías ver:** `{exactitud: 0.8, vp: 6, fp: 0, vn: 10, fn: 4, total: 20, errores: Array(4)}`. Es decir, acierta **16 de 20**: nunca bloquea un mensaje bueno, pero **deja pasar 4 spam**.

También lo puedes ver en la página: baja hasta el panel **5. Comparar: reglas vs aprendido**, escribe un mensaje en el panel 1, pulsa **Analizar** y mira el lado "Reglas a mano". El lado "Modelo aprendido" te avisará que aún no está listo (¡aún no programas tu detective!). Pulsa **Comparar en el examen** y verás **80 %** para las reglas.

> **Actividad 3 · Lee los errores (5 min).** Ejecuta este código, que lista los 4 spam que se colaron:
>
> ```js
> evaluarReglas(PRUEBA).errores.map(e => e.texto + " (puntaje " + e.puntaje + ")")
> ```
>
> Para cada uno, escribe **por qué** las reglas lo dejaron pasar: ¿qué palabra faltaba? ¿cuántos puntos sumó?

<details><summary>Respuesta</summary>

**Deberías ver** una lista de 4 textos con su puntaje:

1. *Tu paquete está retenido, paga la tarifa en el enlace para recibirlo* (puntaje 1): solo suma "enlace" (+1). Faltan "paquete", "retenido" y "tarifa" en el léxico.
2. *Hola, soy Camila de recursos humanos...* (puntaje 0): ninguna palabra del léxico. Es un spam "educado", sin palabras sospechosas.
3. *Última oportunidad: inscríbete y trabaja desde casa* (puntaje 0): tampoco hay palabras del léxico.
4. *Reunión urgente: abre este documento...* (puntaje 1): "reunion" resta 1 y "urgente" suma 2; queda en 1, bajo el umbral de 3.

Patrón: las reglas atrapan lo que la persona **previó**; lo imprevisto se cuela.

</details>

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

(Ejecuta cada línea por separado.)

**Deberías ver:** el primero da `puntaje: 3` y `etiqueta: 'spam'` (justo en el umbral); el segundo da `puntaje: 0` y `'normal'`. Para tus ojos es el mismo mensaje; para la lista, son palabras desconocidas.

### Límite 2 · La negación (o "los límites de una regla simple")

Nuestra regla mira solo las **dos palabras anteriores**. Prueba:

```js
puntuarPorReglas("No quiero dinero gratis")
puntuarPorReglas("No pierdas premio")
```

(Una por una.)

**Deberías ver:** el primero da `puntaje: 1` (`'normal'`: "no" invirtió a `dinero`, pero `gratis` está más lejos); el segundo da `puntaje: -3` (`'normal'`: "no" invirtió a `premio`, aunque ese mensaje sigue siendo una oferta).

La regla se comporta bien con "No es gratis" (puntaje -2) y mal con "No pierdas premio". Con más reglas arreglarías un caso, pero aparecerían otros.

### Límite 3 · El contexto

```js
puntuarPorReglas("Ganaste el partido")
puntuarPorReglas("Te regalo un iPhone")
```

(Una por una.)

**Deberías ver:** el primero da `puntaje: 3` (`'spam'`, ¡pero es un mensaje normal!); el segundo da `puntaje: 2` (`'normal'`, pero suena a estafa). Las reglas miran palabras sueltas, no el contexto.

### Ajustar sin hacer trampa

Una tentación: "agrego las palabras que fallaron en el examen y listo". Eso es **hacer trampa**: ya viste las respuestas, y el 100 % de ahora no dice nada de mensajes nuevos. (Se llama **fuga de datos** y la estudiarás en el módulo 07.)

La forma honesta es mejorar las reglas mirando **solo** `ENTRENAMIENTO`, y usar `PRUEBA` una sola vez, al final.

> **Actividad 4 · Mejora las reglas, con honestidad (10 min).**
> 1. Ejecuta `evaluarReglas(ENTRENAMIENTO).fn`. Verás cuántos spam de entrenamiento se escapan.
> 2. Ejecuta `evaluarReglas(ENTRENAMIENTO).errores.map(e => e.texto)` y lee esos mensajes.
> 3. Abre `reglas.js` y **agrega palabras** a `LEXICO_SPAM` que ayuden a atrapar esos spam (mira solo los de entrenamiento). Guarda y recarga (**F5**).
> 4. Mide otra vez con `evaluarReglas(ENTRENAMIENTO)` y, **solo cuando termines**, una vez con `evaluarReglas(PRUEBA)`.
> 5. Escribe: ¿subió la exactitud en el examen tanto como en el entrenamiento? ¿Cuánto tiempo te tomó? ¿Y si mañana el spammer cambia de truco?
>
> *Tip:* en la consola puedes probar un cambio sin editar el archivo, por ejemplo `LEXICO_SPAM.gana = 2`. Se pierde al recargar.

<details><summary>Respuesta</summary>

**Deberías ver:** el paso 1 da `7` (7 spam de entrenamiento se escapan; la exactitud en entrenamiento es 0,883).

**Ejemplo observado** (tus números pueden diferir según las palabras que elijas): agregar `gana: 2, paquete: 1, aduana: 2, tarifa: 2` sube la exactitud en entrenamiento a **0,967** (quedan 2 spam sin atrapar) y en el examen a **0,85** (vp 7, fn 3, fp 0).

Lecciones:

- La mejora en el examen es **menor** que en entrenamiento, y parte de ella ocurre porque `PRUEBA` comparte temas con `ENTRENAMIENTO` (paquete, tarifa), no porque las reglas hayan "generalizado".
- Siguen sin atraparse Camila, "Última oportunidad" y "Reunión urgente": nada en el entrenamiento los anticipa.
- Cada ajuste costó trabajo humano. Si mañana cambia el truco, hay que repetirlo.

Si tu exactitud en el examen subió a 1,0 de golpe, probablemente miraste `PRUEBA` para elegir palabras: eso es la trampa de la que habla esta sección.

</details>

---

## Parte 6 · Cierre (5 min)

### Completa tu tabla de hipótesis

En tu cuaderno, copia esta tabla y escribe en cada celda de la derecha lo que **crees** que pasará con un filtro que aprende de ejemplos (los módulos 05 a 07 lo verifican):

| Filtro por reglas | Aprender de ejemplos (hipótesis tuya) |
|---|---|
| Fácil de explicar | ¿? |
| Se rompe con evasión | ¿? |
| Alguien debe escribir y mantener las reglas | ¿? |

<details><summary>Respuesta</summary>

Una hipótesis razonable (se confirma o se corrige más adelante):

- **Fácil de explicar:** sí, porque puedes ver cada palabra y su peso (lo verás en los chips de la página), aunque menos directo que una lista escrita a mano.
- **Se rompe con evasión:** también. Una palabra que nunca vio (`g4na`) no aporta nada. Aprender de ejemplos no es magia: si no hay ejemplos de la evasión, no la reconoce.
- **Alguien debe escribir y mantener las reglas:** no escribe reglas, pero alguien debe **reunir y etiquetar** ejemplos nuevos y reentrenar.

</details>

### Checkpoints: ¿cumpliste el módulo?

- [ ] `normalizar("¡GRATIS! Gana $$$ YA")` → `'gratis gana ya'`.
- [ ] `tokenizar("¡Gana dinero YA! 50% gratis")` → `['gana', 'dinero', 'ya', '50', 'gratis']`.
- [ ] `evaluarReglas(PRUEBA)` → exactitud `0.8`, `fn: 4`.
- [ ] Encontraste al menos un mensaje que engaña a las reglas.

### Si no te sale… (errores comunes)

| Síntoma | Causa probable | Solución |
|---|---|---|
| `puntuarPorReglas is not defined` | Abriste otra página, o `index.html` no carga `reglas.js` | Abre `index.html` de esta carpeta y revisa que exista `<script src="reglas.js">` |
| Tus cambios a `LEXICO_SPAM` desaparecen | Los hiciste en la consola | Edítalos en `reglas.js`, guarda y recarga (**F5**) |
| La exactitud sube al 100 % de repente | Agregaste palabras mirando `PRUEBA` | Eso es fuga de datos; vuelve a empezar mirando solo `ENTRENAMIENTO` |
| `Unexpected token` al editar `LEXICO_SPAM` | Falta una coma entre palabras o sobra una al final de una línea | Revisa las comas del diccionario |
| `tokenizar` devuelve menos palabras de las que esperabas | Descarta las de una sola letra | Es intencional; mira la función en `modelo.js` |

### Quiz final (responde primero, despliega después)

**1. ¿Por qué `GRATIS` y `gratis` deben tratarse como la misma palabra?**

<details><summary>Respuesta</summary>

Si no, serían dos palabras distintas y habría que contarlas (o puntuarlas) por separado. Normalizar hace que las variantes iguales valgan lo mismo.

</details>

**2. ¿Qué información pierde una bolsa de palabras?**

<details><summary>Respuesta</summary>

El orden y el contexto: "el perro muerde al hombre" y "el hombre muerde al perro" dan la misma bolsa.

</details>

**3. Nombra un truco que engañe a un filtro de reglas y explica por qué funciona.**

<details><summary>Respuesta</summary>

Escribir `g4na` en vez de `gana`: la lista solo reconoce palabras exactas, y la variante no está. (Otros válidos: negaciones lejanas, o un spam sin palabras sospechosas, como el de Camila.)

</details>

**4. ¿Por qué es trampa agregar palabras al léxico mirando los mensajes del examen?**

<details><summary>Respuesta</summary>

Porque el examen deja de ser una medida honesta: el filtro ya "vio" las respuestas y la nota sube sin que haya aprendido nada general (fuga de datos).

</details>

**5. ¿Por qué `tokenizar("Mamá, ¿vienes a la fiesta?")` no devuelve la "a"?**

<details><summary>Respuesta</summary>

Porque `tokenizar` descarta las palabras de una sola letra (decisión de diseño, para ignorar "a", "y", "o").

</details>

### Resumen en 5 líneas

1. Para una máquina, el texto se **limpia** (normalizar), se **parte** (tokenizar) y se **cuenta** (bolsa de palabras).
2. La bolsa de palabras pierde el **orden** y el **contexto**.
3. Un filtro por reglas suma puntos de un léxico y compara con un umbral: es claro y rápido.
4. Sus límites son la **evasión**, la **negación** mal manejada y la **falta de contexto**; mejorarlo cuesta trabajo humano continuo.
5. Si ajustas mirando el examen, haces **trampa** sin querer.

**Siguiente paso:** [Módulo 04 · Chatbots y modelos de lenguaje (LLM)](./04-chatbots-y-llm.md).
