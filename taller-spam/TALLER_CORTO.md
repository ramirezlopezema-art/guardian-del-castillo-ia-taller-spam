# Detective de mensajes: entrena tu propio filtro anti-spam
### Taller express de 60 minutos (versión corta)

**Curso:** Introducción a la IA · **Necesitas:** Chrome o Edge, VS Code · **Sin internet, sin cuenta, sin API key**

En el proyecto del dragón, **tú escribiste** el diccionario de puntajes. Hoy el modelo los **descubre solo** a partir de ejemplos de mensajes "spam" y "normal". Casi todo el código ya está hecho: tú programas **una sola pieza**, el corazón del modelo, y luego lo pruebas, lo mides y lo rompes.

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

---

## Tu ruta de 60 minutos

| # | Minutos | Bloque | Al terminar tendrás... |
|---|---|---|---|
| 1 | 0:00 – 0:08 | Cómo aprende una máquina | La intuición: contar para decidir |
| 2 | 0:08 – 0:13 | Preparar el taller | La página abierta con el modelo corto |
| 3 | 0:13 – 0:33 | **El TODO:** `clasificar` | Un detective que da veredictos |
| 4 | 0:33 – 0:40 | Explicar y enseñar | Ver por qué decide y corregirlo |
| 5 | 0:40 – 0:48 | Medir con el examen | Exactitud y matriz de confusión |
| 6 | 0:48 – 0:56 | Romper y sesgar | Ver cómo los datos crean injusticia |
| 7 | 0:56 – 1:00 | Cierre | Preguntas de cierre |

> **Regla de oro:** guarda el archivo y recarga `index.html` con **F5** cada vez. Si algo falla, la página muestra un cuadro amarillo con la pista.

---

## Bloque 1 · Cómo aprende una máquina (8 min)

**Meta:** entender que "entrenar" es **contar** y "clasificar" es **comparar puntajes**.

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

El vocabulario tiene **7** palabras distintas.

**Paso 2 · Probabilidad de cada palabra en cada clase:** `(veces + 1) ÷ (palabras de la clase + vocabulario)`. El `+ 1` (suavizado de Laplace) evita probabilidades de 0.

- *gana* en spam: (2+1) ÷ (6+7) = **3/13**; en normal: (0+1) ÷ (3+7) = **1/10**.
- *gratis* en spam: (1+1) ÷ 13 = **2/13**; en normal: **1/10**.

**Paso 3 · Comparar** `gana gratis`, sumando cuánto spam llega en general (3/5 spam, 2/5 normal):

```
Puntaje spam   = 3/5 × 3/13 × 2/13 = 0,0213
Puntaje normal = 2/5 × 1/10 × 1/10 = 0,0040

Probabilidad de spam = 0,0213 ÷ (0,0213 + 0,0040) = 0,84  ->  SPAM
```

Se llama *ingenuo* (naive) porque multiplica como si cada palabra fuera independiente de las demás.

**Un truco:** con muchas palabras, multiplicar da números diminutos que el computador redondea a 0. Por eso se **suman logaritmos** (`log(a × b) = log(a) + log(b)`). Es lo que hará tu código.

> **Actividad 1 (2 min, en parejas):** calcula a mano la probabilidad de spam de `hola clase`. Pista: ninguna de las dos palabras aparece en los spam. Compruébala en el bloque 3.

---

## Bloque 2 · Preparar el taller (5 min)

1. **Copia** `soluciones/modelo.corto.js` encima de `modelo.js` (acepta reemplazar). Desde ahora trabajas en `modelo.js`.
2. Haz doble clic en `index.html`. Deberías ver la página **sin** cuadro amarillo: `entrenar` ya está hecho. Arriba, "palabras conocidas" = **347**, con 30 spam y 30 normales.
3. Escribe cualquier mensaje y pulsa **Analizar**: aparece el cuadro amarillo "Aún falta completar una parte del código". Eso es lo que vas a arreglar.
4. Abre `datos.js`, lee 5 mensajes de `ENTRENAMIENTO`. Cada uno tiene `texto` y `etiqueta`: **la etiqueta la puso una persona**.

**Checkpoint:** la página abre y te pide completar el TODO.

---

## Bloque 3 · El TODO: `clasificar` (20 min)

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

Y la Actividad 1: en la consola (F12) ejecuta
`clasificar("hola clase", entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}]))`.
Debe dar `probSpam` ≈ **0,18**.

> **Actividad 2 (en los últimos 2 min):** ¿cuál de tus dos mensajes tiene la palabra más "pesada"? ¿La palabra es una razón real o una casualidad de estos datos?

---

## Bloque 4 · Explicar y enseñar (7 min)

**Meta:** ver *por qué* decide el detective y comprobar que **aprende de nuevo** sin tocar el código.

1. Analiza `Tu banco te regala dinero gratis, confirma tu clave`. Mira los chips: `tu` pesa más que `dinero`. ¿Por qué? (Aparece en 20 spam y solo en 3 normales: los spam le hablan al lector.)
2. Escribe `Hola, soy Camila de recursos humanos, tengo una vacante para ti, escríbeme al privado` y pulsa **Analizar**. Da **41 %** (NORMAL), pero es un spam disfrazado.
3. Pulsa **Es SPAM** en "Enséñale al detective". Sube a **99,7 %**.
4. Pulsa **Restaurar datos originales**.

> **Actividad 3 (2 min):** ¿qué cambió: el código o los datos? ¿Eso es "aprender"?

**Checkpoint:** viste que cambiar el dato cambió la decisión.

---

## Bloque 5 · Medir con el examen (8 min)

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

> **Actividad 4 (3 min, en parejas):** ¿qué es peor para ti: un falso positivo o un falso negativo? ¿Y para un banco?

---

## Bloque 6 · Romper y sesgar (8 min)

**Meta:** ver cómo datos incompletos o desbalanceados producen un modelo injusto.

| Experimento | Qué haces | Resultado esperado |
|---|---|---|
| Dataset sesgado | Marca "Cargar dataset sesgado" (30 spam, 3 normales) y toma el examen | Exactitud **65 %**, 7 falsos positivos. `Hola, ¿vamos a estudiar mañana en la biblioteca?` ahora sale **SPAM** (51,7 %) |
| Sin lo normal | Restaura, pulsa "Quitar todo lo normal", toma el examen | **50 %**: todo es spam |
| Sin spam | Restaura, pulsa "Quitar todo el spam", toma el examen | **50 %**: nada es spam |
| Tu propio sesgo | Restaura y enséñale 3 mensajes que tú llamarías spam y tu pareja llamaría normales | El modelo toma tu criterio |

> **Actividad 5 (3 min, en grupo):** ¿quién decide qué es spam? Piensa en un boletín al que te suscribiste o en la jerga de otra región. Conecta con lo que viste sobre **sesgos** en el Bloque 9 de la guía del Guardián (`../PASO_A_PASO.md`).

---

## Bloque 7 · Cierre (4 min)

### Preguntas de cierre

1. ¿Qué "aprendió" exactamente tu modelo? ¿Entiende lo que dice un mensaje?
2. ¿Por qué sumamos logaritmos en vez de multiplicar?
3. ¿Por qué evaluamos con mensajes que el modelo no vio?
4. Si te dicen "el modelo acierta el 99 %", ¿qué dos preguntas haces antes de creerlo?
5. ¿Qué cambió entre el diccionario del dragón y este modelo? ¿Quién fijó los pesos en cada caso?

### Para seguir en casa

Pasa al taller largo (`TALLER_LARGO.md`) y programa tú `entrenar`, el suavizado y `evaluar`. Retos: bigramas, palabras vacías, umbral deslizante.

---

# Notas para el docente

## Qué recortar o ajustar

| Si vas justo... | Haz esto |
|---|---|
| 5 min menos | Bloque 1 como demostración en el proyector; la Actividad 1 solo oral |
| 10 min menos | Omite el bloque 6, deja un único experimento (dataset sesgado) y haz la conversación ética en voz alta |
| Un grupo se atasca en el TODO | Muéstrales el bucle de `clasificar` en `soluciones/modelo.solucion.js` y que escriban la fórmula de `probSpam` |
| Sobra tiempo | Retos del taller largo: umbral deslizante es el más rápido |

## Cómo extenderlo a la versión larga

Hay dos formas:

1. **Mismo grupo, otra sesión:** que dupliquen la carpeta, usen `modelo.js` original (con 4 TODO) y sigan `TALLER_LARGO.md` desde el bloque 4.
2. **Con los que terminan antes:** que en `soluciones/modelo.corto.js` reemplacen `logProbPalabra` por su propia versión (TODO 2 del largo) y que implementen `evaluar` desde cero comparando con la suya.

## Números esperados (calculados ejecutando la solución)

| Dato | Valor |
|---|---|
| Datos de entrenamiento | 60 (30 spam, 30 normal) |
| Vocabulario | 347 palabras; 364 palabras en spam, 328 en normal |
| Examen (`PRUEBA`, 20 mensajes) | Exactitud **0,90**; vp 9, fn 1, fp 1, vn 9 |
| Mal clasificados | Camila (spam, 41 % → NORMAL); tarjeta del banco (normal, 53,8 % → SPAM) |
| Ejemplo de juguete | `gana gratis` → 0,842; `hola clase` → 0,182 |
| Examen desbalanceado (10 normales + Camila) | 0,818; "siempre normal" 0,909 |
| Dataset sesgado (30 spam, 3 normal) | 0,65; vp 10, fn 0, fp 7, vn 3 |
| Sin una clase completa | 0,50 |
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

## Clave de respuestas

**Actividad 1.** `hola clase`: spam = 3/5 × 1/13 × 1/13 = 0,0036; normal = 2/5 × 2/10 × 2/10 = 0,016; probSpam ≈ **0,18** (NORMAL).

**Actividad 2.** `gratis` (+1,9), `premio` (+1,7). Es un patrón real en estos datos, pero el modelo no sabe por qué: solo contó.

**Actividad 3.** Cambiaron solo los datos. Sí es aprender: mejora su desempeño con experiencia.

**Actividad 4.** Depende del costo de cada error: para una persona, perder un aviso importante (fp) suele doler más; para un banco, dejar pasar un fraude (fn).

**Actividad 5.** Respuestas libres. Ideas: quien etiqueta, la región y la jerga, boletines legítimos, voces minoritarias silenciadas.

**Preguntas de cierre.**

1. Aprendió conteos de palabras por clase. No entiende significado.
2. Multiplicar muchos números pequeños da 0 (*underflow*); los logs lo evitan.
3. Para medir su comportamiento con datos nuevos, no cuánto memorizó.
4. "¿Cómo están repartidas las clases?" y "¿qué errores comete: fp o fn?".
5. En el diccionario del dragón una persona fijó los puntajes; aquí los datos (y quien los reunió y etiquetó).
