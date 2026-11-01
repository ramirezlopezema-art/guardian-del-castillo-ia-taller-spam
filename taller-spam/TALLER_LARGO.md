# Detective de mensajes: entrena tu propio filtro anti-spam
### Taller guiado de 120 minutos (versión larga)

**Curso:** Introducción a la IA · **Necesitas:** Chrome o Edge, VS Code · **Sin internet, sin cuenta, sin API key**

En el proyecto del dragón, **tú escribiste** el diccionario de puntajes y una IA en la nube hizo el resto. Hoy cambia todo: vas a **entrenar un modelo tú mismo**. Le darás ejemplos de mensajes con su respuesta ("spam" o "normal") y él **descubrirá solo** qué palabras delatan a un spam.

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

> Ya viste este esquema en el Bloque 1 de la guía del Guardián (`../PASO_A_PASO.md`). Hoy lo programas.

---

## Tu ruta de 120 minutos

| # | Minutos | Bloque | Al terminar tendrás... |
|---|---|---|---|
| 1 | 0:00 – 0:15 | Cómo aprende una máquina (Bayes con 3 mensajes) | La intuición de contar para decidir |
| 2 | 0:15 – 0:25 | Mira los datos y etiqueta | Ojo crítico sobre los datos |
| 3 | 0:25 – 0:35 | Tokenizar: del texto a palabras | Entender qué "ve" el modelo |
| 4 | 0:35 – 0:50 | **TODO 1** `entrenar` | Un modelo que cuenta palabras |
| 5 | 0:50 – 0:55 | Pausa | Agua y estirarse |
| 6 | 0:55 – 1:05 | **TODO 2** suavizado de Laplace | Probabilidades que no se rompen |
| 7 | 1:05 – 1:20 | **TODO 3** `clasificar` | ¡Un detective que da veredictos! |
| 8 | 1:20 – 1:30 | Explicar decisiones y enseñarle | Ver por qué decide lo que decide |
| 9 | 1:30 – 1:45 | **TODO 4** `evaluar` y la trampa de la exactitud | Medir con honestidad |
| 10 | 1:45 – 1:55 | Sesgo y ética | Romper el modelo a propósito |
| 11 | 1:55 – 2:00 | Cierre y retos extra | Preguntas de cierre |

> **Regla de oro:** en cada TODO, guarda el archivo y recarga `index.html` con **F5**. Si algo no funciona, la página te muestra un cuadro amarillo con la pista.

## Archivos del taller

| Archivo | ¿Lo editas? | Para qué sirve |
|---|---|---|
| `modelo.js` | **Sí** | Aquí viven los 4 TODO |
| `datos.js` | Solo en el bloque 2 | 60 mensajes de entrenamiento y 20 de prueba |
| `index.html`, `app.js`, `style.css` | No | La página del detective |
| `soluciones/modelo.solucion.js` | No lo mires antes de tiempo | Solución completa (para el docente o si te atascas) |

---

## Bloque 1 · Cómo aprende una máquina (15 min)

**Meta:** entender que "entrenar" es **contar**, y que decidir es **comparar cuentas**.

### Paso 1.1 · La idea en una frase

Mira estos tres mensajes de entrenamiento (ya traen su etiqueta):

| # | Mensaje | Etiqueta |
|---|---|---|
| 1 | `gana dinero gratis` | spam |
| 2 | `gana premio ya` | spam |
| 3 | `hola clase ya` | normal |

Pregunta rápida: llega `gana gratis`. ¿spam o normal? Tu intuición ya dice **spam**: "gana" y "gratis" aparecen en los spam y nunca en el normal. Eso es todo el truco. Ahora lo hacemos con números.

### Paso 1.2 · Contar (esto es "entrenar")

| Palabra | Veces en spam | Veces en normal |
|---|---|---|
| gana | 2 | 0 |
| dinero | 1 | 0 |
| gratis | 1 | 0 |
| premio | 1 | 0 |
| ya | 1 | 1 |
| hola | 0 | 1 |
| clase | 0 | 1 |
| **Total de palabras** | **6** | **3** |

Palabras distintas en total (el **vocabulario**): **7**.

### Paso 1.3 · Probabilidad de cada palabra en cada clase

> "Si el mensaje fuera spam, ¿qué tan probable es ver la palabra *gana*?"

Fórmula, con palabras: **(veces que apareció + 1) ÷ (palabras de la clase + tamaño del vocabulario)**.

El **+ 1** se llama *suavizado de Laplace*: evita que una palabra que nunca vimos en una clase tenga probabilidad **0** y arruine todo.

| Palabra | P(palabra · spam) | P(palabra · normal) |
|---|---|---|
| gana | (2+1) ÷ (6+7) = **3/13** | (0+1) ÷ (3+7) = **1/10** |
| gratis | (1+1) ÷ (6+7) = **2/13** | (0+1) ÷ (3+7) = **1/10** |

### Paso 1.4 · Comparar (esto es "clasificar")

Además de las palabras, cuenta cuánto spam llega en general: 2 de 3 mensajes eran spam. Con el mismo "+1": spam = (2+1) ÷ (3+2) = **3/5**, normal = (1+1) ÷ (3+2) = **2/5**.

Ahora multiplicamos para `gana gratis`:

```
Puntaje spam   = 3/5 × 3/13 × 2/13 = 0,0213
Puntaje normal = 2/5 × 1/10 × 1/10 = 0,0040

Probabilidad de spam = 0,0213 ÷ (0,0213 + 0,0040) = 0,84  ->  84 %  ->  SPAM
```

Se llama **"ingenuo"** (*naive*) porque multiplica como si cada palabra fuera independiente de las otras. No es cierto en el lenguaje real, pero funciona sorprendentemente bien.

### Paso 1.5 · Un truco: logaritmos

Con 20 palabras multiplicaríamos 20 números diminutos y el computador terminaría redondeando a 0. Solución: **sumar logaritmos** en vez de multiplicar (`log(a × b) = log(a) + log(b)`). Mismo resultado, sin problemas numéricos. Es lo que hará tu código.

> **Actividad 1 (3 min, en parejas):** calcula a mano la probabilidad de spam de `hola clase`, solo con los pasos 1.3 y 1.4. Pista: ninguna de las dos palabras aparece en spam. Comprueba tu resultado en el bloque 4.

**Checkpoint:** deberías poder explicar con tus palabras: *"entrenar = contar; clasificar = comparar puntajes"*.

---

## Bloque 2 · Mira los datos y etiqueta (10 min)

**Meta:** entender que el modelo solo sabe lo que sus datos le enseñan.

### Pasos

1. Haz **doble clic en `index.html`**. Verás un cuadro amarillo: "Aún falta completar una parte del código". Es normal: aún no hiciste el TODO 1.
2. Abre `datos.js` en VS Code. Lee 10 mensajes de `ENTRENAMIENTO` y 5 de `PRUEBA`.
3. Fíjate en el formato: `{ texto: "...", etiqueta: "spam" }`.

> **Actividad 2 (5 min, en parejas):** cada uno escribe **3 mensajes nuevos** (2 que parezcan spam, 1 normal) sin copiarlos de los datos. Intercámbienlos y **etiquétense** mutuamente los mensajes en un papel. ¿Discreparon en alguno? Anótalo: lo retomamos en el bloque 10.

**Checkpoint:** sabes dónde están los datos y que la etiqueta la puso una persona.

---

## Bloque 3 · Tokenizar: del texto a palabras (10 min)

**Meta:** ver exactamente qué "lee" el modelo. Las funciones `normalizar` y `tokenizar` ya están hechas.

### Pasos

1. Abre `index.html`, pulsa **F12** y entra a la pestaña **Consola**.
2. Prueba:

```js
normalizar("¡GRATIS! Gana $$$ YA")
tokenizar("¡Gana dinero YA! 50% gratis")
```

3. Abre `modelo.js` y lee `normalizar` y `tokenizar` (no las cambies).

**Checkpoint:** la segunda línea debe mostrar `["gana", "dinero", "ya", "50", "gratis"]`.

> **Actividad 3 (4 min):** predice sin ejecutar qué devuelve `tokenizar("Mamá, ¿vienes a la fiesta?")`. Luego compruébalo. Responde: ¿qué pierde el modelo al quitar las tildes y los signos? ¿Qué pasa con "¡¡GRATIS!!!" frente a "gratis"?

---

## Bloque 4 · TODO 1: `entrenar` (15 min)

**Meta:** que `entrenar(datos)` cuente las palabras de cada clase.

### Pasos

1. En `modelo.js`, busca `// TODO 1`. Lee los pasos del comentario.
2. Recorre `datos` con `for (const ejemplo of datos)`.
3. Por cada ejemplo, suma 1 a `modelo.documentos[clase]`.
4. Por cada palabra de `tokenizar(ejemplo.texto)`:
   - suma 1 a `modelo.conteos[clase][palabra]`
   - suma 1 a `modelo.totalPalabras[clase]`
   - marca `modelo.vocabulario[palabra] = true`
5. Después del bucle, calcula `modelo.tamVocabulario` con `Object.keys(...).length`.
6. Termina con `return modelo;` y **borra** la línea `return pendiente(1, ...)`.

### Pistas

- Contar con un objeto: `conteos[p] = (conteos[p] || 0) + 1;` (el `|| 0` cubre la primera vez).
- `clase` es `ejemplo.etiqueta` y se usa **entre corchetes**: `modelo.conteos[clase]`.

### Checkpoint (usa la consola, F12)

| Escribe en la consola | Deberías ver |
|---|---|
| (la página) | El cuadro amarillo desapareció; "palabras conocidas" = **347**; 30 de spam y 30 normales |
| `estado.modelo.totalPalabras` | `{spam: 364, normal: 328}` |
| `estado.modelo.conteos.spam.gratis` | `6` |
| `entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}])` | Tu ejemplo del bloque 1: `tamVocabulario` = 7, `totalPalabras` = `{spam: 6, normal: 3}` |

> **Actividad 4 (2 min):** ¿qué palabras tienen el conteo más alto en `estado.modelo.conteos.normal`? Ejecuta `Object.entries(estado.modelo.conteos.normal).sort((a,b)=>b[1]-a[1]).slice(0,8)`. ¿Te sorprenden?

---

## Bloque 5 · Pausa (5 min)

Levántate. Hasta aquí tu modelo **ya aprendió**: solo guardó cuentas. En el siguiente bloque aprende a usarlas.

---

## Bloque 6 · TODO 2: suavizado de Laplace (10 min)

**Meta:** que `logProbPalabra(palabra, clase, modelo)` devuelva el **logaritmo** de la probabilidad suavizada del bloque 1.

### Pasos

1. Busca `// TODO 2`.
2. Calcula `veces`: cuántas veces apareció la palabra en esa clase (o 0 si nunca).
3. Calcula `total`: palabras totales de esa clase.
4. Devuelve `Math.log((veces + 1) / (total + modelo.tamVocabulario))`.
5. **Borra** la línea `return pendiente(2, ...)`.

### Pista

`modelo.conteos[clase][palabra] || 0` te da las `veces`.

### Checkpoint (consola)

| Escribe | Deberías ver (aprox.) |
|---|---|
| `logProbPalabra("gratis", "spam", estado.modelo)` | `-4.62` |
| `logProbPalabra("gratis", "normal", estado.modelo)` | `-6.51` |

La diferencia, `-4.62 - (-6.51)`, es **1,89**. Guarda ese número: es lo que "pesa" la palabra *gratis* hacia el lado spam.

> **Actividad 5 (3 min):** pide `logProbPalabra("zzzzz", "spam", estado.modelo)`. Nunca vio esa palabra y no da error ni infinito. ¿Qué habría pasado sin el `+ 1`? (Pista: `Math.log(0)`).

---

## Bloque 7 · TODO 3: `clasificar` (15 min)

**Meta:** que `clasificar(texto, modelo)` devuelva `{ etiqueta, probSpam, aportes }`.

### Pasos

1. Busca `// TODO 3`. Ya tienes la lista vacía `lista`.
2. Crea dos puntajes iniciales con las funciones listas: `logSpam = logPrior("spam", modelo)` y `logNormal = logPrior("normal", modelo)`.
3. Recorre `tokenizar(texto)`. Para cada palabra:
   - si `!modelo.vocabulario[palabra]`, haz `continue` (palabra desconocida: se ignora);
   - calcula `lpSpam` y `lpNormal` con `logProbPalabra`;
   - suma cada uno a su puntaje;
   - agrega a `lista`: `{ palabra: palabra, aporte: lpSpam - lpNormal }`.
4. Calcula `probSpam = 1 / (1 + Math.exp(logNormal - logSpam))`.
5. Devuelve `{ etiqueta: probSpam > umbral ? "spam" : "normal", probSpam: probSpam, aportes: agruparAportes(lista) }`.
6. **Borra** la línea `return pendiente(3, ...)`.

### Pistas

- `aporte > 0` significa "esta palabra empuja hacia spam"; `< 0`, "hacia normal".
- `agruparAportes` ya está hecha: une repetidas y ordena de mayor a menor peso.
- Si `probSpam` sale `NaN`, revisa que sumaste logs (no que multiplicaste) y que usaste `Math.exp`.

### Checkpoint

Escribe en la caja de la página y pulsa **Analizar**:

| Mensaje | Deberías ver |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, 100 %, chips rojos: `gratis +1.9`, `un +1.7`, `premio +1.7`, `clic +1.3` |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, 0,6 %, chips verdes como `la -1.7`, `vamos -1.2` |
| `Tu banco te regala dinero gratis, confirma tu clave` | **SPAM**, 100 % |

> **Actividad 6 (3 min):** completa el bloque 1: ejecuta en consola `clasificar("hola clase", entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}]))`. Debe dar `probSpam` ≈ **0,18**. ¿Coincide con tu cálculo a mano de la Actividad 1?

---

## Bloque 8 · Explicar decisiones y enseñarle (10 min)

**Meta:** ver *por qué* decide el detective y comprobar que **aprende de nuevo** si le das ejemplos.

### Pasos

1. Analiza `Tu banco te regala dinero gratis, confirma tu clave`. Mira los chips: la palabra `tu` pesa más que `dinero`.
2. Analiza solo `gratis` (da 86,9 % spam) y luego `xyzzy qwerty` (no conoce ninguna palabra: 50 % y decide NORMAL, con el beneficio de la duda).
3. Escribe este mensaje y pulsa **Analizar**:
   `Hola, soy Camila de recursos humanos, tengo una vacante para ti, escríbeme al privado`
   Da **41 %** (NORMAL), pero es un spam disfrazado.
4. Pulsa **Es SPAM** en el panel "Enséñale al detective". Debe subir a **99,7 %**.

> **Actividad 7 (5 min):** ¿por qué `tu` empuja tanto hacia spam (aparece en 20 spam y solo 3 normales)? ¿Es una "razón de verdad" o una casualidad de **estos** datos? Discútelo con tu pareja.

**Checkpoint:** viste que el modelo cambia de opinión sin tocar una línea de código: solo cambió el dato. Eso es aprender.

> **Cuidado:** acabas de enseñarle un mensaje que está en el examen. En el bloque 9 verás qué pasa. Pulsa **Restaurar datos originales** antes de seguir.

---

## Bloque 9 · TODO 4: `evaluar` y la trampa de la exactitud (15 min)

**Meta:** medir al detective con mensajes que **nunca vio** y entender por qué un solo número puede engañar.

### Pasos (evaluar)

1. Busca `// TODO 4`. Usa "spam" como clase **positiva**.
2. Por cada ejemplo de `prueba`: `const res = clasificar(ejemplo.texto, modelo);`.
3. Compara `ejemplo.etiqueta` (la real) con `res.etiqueta` (la predicha) y suma a **uno** de los cuatro contadores:

| Real | Predijo | Contador | Significa |
|---|---|---|---|
| spam | spam | `vp` | Spam atrapado |
| normal | spam | `fp` | **Falso positivo:** mensaje bueno enviado al spam |
| normal | normal | `vn` | Normal bien |
| spam | normal | `fn` | **Falso negativo:** spam que se coló |

4. Si `res.etiqueta !== ejemplo.etiqueta`, agrega a `errores`: `{ texto, esperada, predicha, probSpam }`.
5. Devuelve `{ exactitud: (vp + vn) / total, vp, fp, vn, fn, total, errores }` y **borra** `return pendiente(4, ...)`.

### Checkpoint

Pulsa **Tomar el examen**. Deberías ver:

| Medida | Valor |
|---|---|
| Exactitud | **90 %** (18 de 20) |
| vp / fn | 9 / 1 |
| fp / vn | 1 / 9 |
| Errores | Un spam que se coló (el de **Camila**, 41 %) y un mensaje normal bloqueado (el de la **tarjeta del banco**, 53,8 %) |

### La trampa de la exactitud

Imagina 1000 mensajes reales: 990 normales y solo 10 spam. Un "modelo" que **siempre responde normal** acierta 990 de 1000 = **99 %**. ¡Y no atrapa ningún spam!

Compruébalo con el detective real. En la consola:

```js
const normales = PRUEBA.filter(e => e.etiqueta === "normal");
const desbalanceado = normales.concat([PRUEBA[5]]);   // 10 normales + el spam de Camila
evaluar(estado.modelo, desbalanceado)
```

Resultado: exactitud **81,8 %**, con `vp: 0` y `fn: 1`. En cambio, "responder siempre normal" tendría 10 de 11 = **90,9 %**. ¡El modelo tonto le gana al detective en exactitud!

> **Actividad 8 (5 min):** responde en parejas. **(a)** ¿Qué es peor para una persona normal: un falso positivo (pierde un mensaje del banco real) o un falso negativo (le llega un spam)? **(b)** ¿Y para una empresa que bloquea fraudes? **(c)** ¿Qué medida usarías además de la exactitud?

**Checkpoint:** sabes explicar por qué la matriz de confusión dice más que un porcentaje.

---

## Bloque 10 · Sesgo y ética (10 min)

**Meta:** romper el modelo a propósito para ver cómo los datos se vuelven decisiones injustas.

### Experimentos (en la página)

1. **Dataset sesgado.** Activa la casilla "Cargar dataset sesgado". Quedan 30 spam y solo 3 normales. Pulsa **Tomar el examen**.
   Resultado esperado: exactitud **65 %**, `fp: 7`. Casi todo lo normal se marca como spam.
   Prueba `Hola, ¿vamos a estudiar mañana en la biblioteca?`: ahora sale **SPAM** (51,7 %).
2. **Sin una clase.** Pulsa **Restaurar datos originales**, luego **Quitar todo lo normal** y toma el examen: **50 %** (todo es spam). Haz lo mismo con **Quitar todo el spam**: también **50 %**.
3. **Cambia el dato, cambia la decisión.** Restaura, y enséñale tú 3 mensajes que consideres spam y que otra persona de tu mesa consideraría normales (por ejemplo, un boletín de una tienda al que sí te suscribiste).

### Conversación guiada (conecta con la unidad de ética)

En el Bloque 9 de la guía del Guardián hablaste de **sesgos**, **privacidad** y **buenas prácticas**. Aquí aparecen de verdad:

| Pregunta | Idea para pensar |
|---|---|
| ¿Quién decide qué es spam? | Una persona etiquetó los datos. Tus compañeros discreparon en la Actividad 2. |
| ¿Spam para quién? | Un boletín que pediste, una campaña política, una oferta de trabajo real con la palabra "gana"... |
| ¿Qué voces silencia el modelo? | Si los datos "normales" son de universitarios, ¿cómo trata la jerga de otra región o un mensaje escrito con errores? |
| ¿Quién paga el error? | Un falso positivo puede ocultar un aviso médico o una oferta laboral real. |
| ¿Y la privacidad? | Para entrenar un filtro real hay que leer mensajes de personas. ¿Con qué permiso? |

> **Actividad 9 (4 min):** escribe, en grupo, **dos reglas de buenas prácticas** para quien entrene un filtro como este (por ejemplo: "revisar qué proporción de cada clase hay antes de entrenar").

---

## Bloque 11 · Cierre y retos (5 min)

### Preguntas de cierre

Responde en 1 o 2 frases cada una (en tu cuaderno o en voz alta):

1. ¿Qué "aprendió" exactamente tu modelo? ¿Entiende lo que dice un mensaje?
2. ¿Por qué sumamos logaritmos en vez de multiplicar probabilidades?
3. ¿Para qué sirve el `+ 1` del suavizado de Laplace?
4. ¿Por qué evaluamos con mensajes que el modelo no vio durante el entrenamiento?
5. Si te dicen "el modelo acierta el 99 %", ¿qué dos preguntas haces antes de creerlo?
6. ¿Es mejor que un filtro se equivoque dejando pasar spam o bloqueando mensajes buenos? ¿De qué depende?
7. ¿Qué cambió entre el diccionario del dragón y este modelo? ¿Quién fijó los pesos en cada caso?

### Retos extra (elige uno)

| Reto | Idea |
|---|---|
| **Bigramas** | En `tokenizar`, además de cada palabra, agrega pares: `"premio gratis"`. ¿Mejora el examen? |
| **Palabras vacías** | Elimina palabras como `de`, `la`, `el`, `tu`, `ya` antes de contar. ¿Qué pasa con la exactitud? |
| **Umbral deslizante** | `clasificar` ya recibe un `umbral` (por defecto 0,5). Agrega un control deslizante en `index.html` y pásalo desde `app.js`. ¿Cómo cambia el balance entre `fp` y `fn`? |

---

# Notas para el docente

## Flexibilidad de tiempo

| Si vas justo... | Haz esto |
|---|---|
| 10 min menos | Bloque 3 como demostración en el proyector (no individual) y Actividad 2 solo oral |
| 20 min menos | Entrega TODO 1 resuelto (copia el bucle de `soluciones/modelo.solucion.js` al grupo) y sáltate el bloque 5 |
| Un grupo se atasca | Que copien **solo la función** que falta desde `soluciones/modelo.solucion.js`; que el resto de TODO lo hagan ellos |
| Sobra tiempo | Bloque 10 con debate abierto y un reto extra de la lista |

> Para la versión de 60 minutos usa `TALLER_CORTO.md`.

## Números esperados (calculados ejecutando la solución)

| Dato | Valor |
|---|---|
| Datos de entrenamiento | 60 (30 spam, 30 normal) |
| Palabras totales por clase | spam 364, normal 328 |
| Vocabulario | 347 palabras |
| Examen (`PRUEBA`, 20 mensajes) | Exactitud **0,90**; vp 9, fn 1, fp 1, vn 9 |
| Mensajes mal clasificados | Camila (spam, 41 % → NORMAL); tarjeta del banco (normal, 53,8 % → SPAM) |
| Palabras más "spam" (aporte) | dinero 2,03; gratis 1,89; un 1,74; premio 1,74; tu 1,61 |
| Palabras más "normal" (aporte) | que -2,00; mi -1,84; la -1,70; por -1,66; clase -1,66 |
| Ejemplo de juguete `gana gratis` | probSpam 0,842 |
| Ejemplo de juguete `hola clase` | probSpam 0,182 |
| Examen desbalanceado (10 normales + Camila) | Exactitud 0,818; "siempre normal" 0,909 |
| Dataset sesgado (30 spam, 3 normal) | Exactitud 0,65; vp 10, fn 0, fp 7, vn 3 |
| Sin ejemplos normales / sin ejemplos spam | Exactitud 0,50 en ambos casos |
| Umbral 0,3 / 0,5 / 0,7 / 0,99 | fn 0 · fp 1 / fn 1 · fp 1 / fn 1 · fp 0 / fn 3 · fp 0 |
| Enseñar el mensaje de Camila como spam | Sube a 99,7 % y el examen pasa a 100 % (¡fuga de datos: el mensaje estaba en la prueba!) |
| Reto "palabras vacías" (lista de 23 palabras comunes) | Exactitud 0,85 (fp 2). No siempre mejora |

> Los números dependen de `datos.js`. Si cambias los datos, recalcula.

## Errores comunes de los estudiantes

| Síntoma | Causa probable | Qué decirles |
|---|---|---|
| El cuadro amarillo no desaparece | Siguen con la línea `return pendiente(...)` o no recargaron | "¿Borraste la línea de `pendiente`? ¿Presionaste F5?" |
| `NaN` en los conteos o probabilidades | Olvidaron el `|| 0` al contar | "La primera vez la palabra no existe: `undefined + 1` es `NaN`" |
| `Cannot read properties of undefined` | Usaron `modelo.conteos.clase` en vez de `modelo.conteos[clase]` | "Si la clase está en una variable, va entre corchetes" |
| Probabilidades enormes o 0 en todo | Multiplicaron en vez de sumar logs, o usaron `Math.log10` con `Math.exp` | "Solo `Math.log` combina con `Math.exp`" |
| Todo da casi 50 % | No sumaron `logProbPalabra` o olvidaron `tamVocabulario` | Revisar el paso 3 del bloque 7 |
| `fp` y `fn` invertidos | Confundieron "positivo" con "bueno" | "Positivo = spam, la clase que buscamos" |
| Exactitud 100 % | Enseñaron mensajes del examen, o entrenaron con `PRUEBA` | Hablar de fuga de datos (*data leakage*) |
| Editan pero la página no cambia | Editaron `soluciones/` o cache del navegador | Abrir `modelo.js` de la carpeta principal y Ctrl+F5 |

## Clave de respuestas

**Actividad 1.** `hola clase`: spam = 3/5 × 1/13 × 1/13 = 0,0036; normal = 2/5 × 2/10 × 2/10 = 0,016; probSpam = 0,0036 ÷ (0,0036 + 0,016) ≈ **0,18** (NORMAL).

**Actividad 3.** Devuelve `["mama", "vienes", "la", "fiesta"]` (se quita la "a" por tener una sola letra). Se pierde el énfasis ("¡¡GRATIS!!!" y "gratis" quedan iguales) y el significado de las tildes. Es una decisión de diseño con costos y beneficios.

**Actividad 4.** Las más frecuentes en normal son palabras comunes como `la` (25), `el` (20), `de` (15), `que`, `para`, `con` (6 cada una): no son "palabras de contenido", pero el modelo las cuenta igual.

**Actividad 5.** Sin `+ 1`, `Math.log(0)` da `-Infinity` y cualquier mensaje con una palabra nueva queda con puntaje `-Infinity` en esa clase.

**Actividad 7.** `tu` aparece porque los spam le hablan directamente al lector ("tu cuenta", "tu premio"). Es una pista real en estos datos, pero frágil: un mensaje normal como "¿tu tarea ya está lista?" se vería sospechoso. Idea clave: **el modelo aprende correlaciones, no razones**.

**Actividad 8.** (a) Depende, pero para una persona suele ser peor el falso positivo (perder el aviso importante); (b) para una empresa que bloquea fraude, el falso negativo puede costar dinero; (c) `fp` y `fn` por separado, o precisión (`vp/(vp+fp)`) y recall (`vp/(vp+fn)`). Aquí: precisión 0,9; recall 0,9.

**Actividad 9.** Respuestas libres. Ideas válidas: revisar la proporción de clases, tener varias personas etiquetando, medir `fp` y `fn` por separado, probar con mensajes de distintos grupos, no usar mensajes privados sin permiso.

**Preguntas de cierre.**

1. Aprendió **conteos de palabras por clase**. No entiende significado; reconoce patrones de palabras.
2. Los productos de muchos números pequeños se redondean a 0 (*underflow*); los logs los convierten en sumas estables.
3. Evita probabilidad 0 para palabras no vistas en una clase, que anularía todo el puntaje.
4. Para medir cómo se comporta con datos nuevos, no cuánto "memorizó". Evaluar con los mismos datos de entrenamiento infla el resultado.
5. "¿Cómo están repartidas las clases?" y "¿qué errores comete: fp o fn?".
6. Depende del costo de cada error en ese contexto (correo personal frente a banco).
7. En el diccionario del dragón **una persona** fijó los puntajes; aquí **los datos** (y por tanto quien los reunió y etiquetó) fijan los pesos.
