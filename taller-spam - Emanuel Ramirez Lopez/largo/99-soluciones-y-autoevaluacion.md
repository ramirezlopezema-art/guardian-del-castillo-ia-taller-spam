# Soluciones, números esperados y autoevaluación final

> **Para ti, que estudias solo.** Aquí están las respuestas modelo, los números reales que debería dar el taller y una autoevaluación final. **Úsalo después de intentar** cada actividad: si lo lees antes, pierdes la parte que enseña. Índice del curso: [TALLER_LARGO.md](../TALLER_LARGO.md).

**Cómo usar este archivo (1 minuto):**

1. Cada módulo ya trae sus respuestas desplegables justo después de cada pregunta. Este archivo las **resume** y agrega lo que no cabía en los módulos.
2. Para comparar tus resultados con la realidad, ve a [Números esperados](#números-esperados).
3. Si algo no te cuadra, ve a [Cómo interpretar tus resultados](#cómo-interpretar-tus-resultados).
4. Al final del taller, haz la [autoevaluación final](#autoevaluación-final-ya-puedes).

---

## Números esperados

Todos se obtuvieron **ejecutando el código** del taller. Dependen de `datos.js` (60 ejemplos de entrenamiento: 30 spam y 30 normales; 20 de prueba: 10 y 10; **ninguno repetido** entre ambas listas) y de `reglas.js`. Si cambias los datos o las reglas, tus números serán otros.

### Tu modelo y las reglas

| Dato | Valor |
|---|---|
| Palabras totales por clase | spam **364**, normal **328** |
| Vocabulario | **347** palabras |
| Examen del modelo (`PRUEBA`) | exactitud **0,90**; vp 9, fn 1, fp 1, vn 9 |
| Mal clasificados por el modelo | Camila (spam, 41 % → NORMAL); tarjeta del banco (normal, 53,8 % → SPAM) |
| Examen de las reglas (`PRUEBA`) | exactitud **0,80**; vp 6, fn 4, fp 0, vn 10 |
| Reglas en `ENTRENAMIENTO` | exactitud 0,883; fn 7 |
| Spam que se escapan a las reglas (`PRUEBA`) | paquete retenido (puntaje 1), Camila (0), "Última oportunidad" (0), "Reunión urgente" (1) |
| Desacuerdos reglas vs modelo | 4: 3 los acierta el modelo (paquete, "Última oportunidad", "Reunión urgente"); 1 lo aciertan las reglas (tarjeta del banco) |
| Precisión / recall del modelo | 0,9 / 0,9 |
| Precisión / recall de las reglas | 1 / 0,6 |
| Mensajes con las reglas | Premio gratis: 11 · Biblioteca: −4 · `Gana dinero gratis`: 3 · `G4na d1nero gr4tis`: 0 · `Ganaste el partido`: 3 · `Te regalo un iPhone`: 2 · `No quiero dinero gratis`: 1 · `No pierdas premio`: −3 · `No es gratis`: −2 |
| `logProbPalabra("gratis", ...)` en spam / normal | −4,62 / −6,51 (aporte 1,89) |
| `logProbPalabra("zzzzz", "spam")` | −6,57 |
| Palabras más "spam" (aporte) | dinero 2,03; gratis 1,89; un 1,74; premio 1,74; tu 1,61 |
| Palabras más "normal" (aporte) | que −2,00; mi −1,84; la −1,70; por −1,66; clase −1,66 |
| Palabras más frecuentes en spam | tu (20), de (13), en (13), para (9), dinero (7) |
| Palabras más frecuentes en normal | la (25), el (20), de (15), que, para, con (6 cada una) |
| `tu` en spam / en normal | 20 / 3 |
| Chips de "Ganaste un premio gratis..." | gratis +1,9; un +1,7; premio +1,7; clic +1,3 (100 % spam) |
| Biblioteca | 0,6 % de spam (NORMAL); chips la −1,7; vamos −1,2 |

### Los ejemplos de juguete (módulo 05 y pruebas de la página)

| Dato | Valor |
|---|---|
| Tabla de conteos (3 mensajes) | spam: 6 palabras; normal: 3; vocabulario 7 |
| `gana gratis` | probSpam **0,842** (log spam −3,849; log normal −5,521; diferencia 1,672) |
| `hola clase` | probSpam **0,182** |
| `gana ya` / `gratis hola` | 0,727 / 0,470 |
| Aportes de `gana gratis` | previa +0,41; gana +0,84; gratis +0,43 (total +1,67) |
| Con un 4.º mensaje `gratis clase ya` (normal) | normal: 6 palabras; vocabulario 7 |
| `Math.pow(0.001, 120)` / `120 * Math.log(0.001)` | 0 / −828,93 |

### Evaluación (módulo 07)

| Dato | Valor |
|---|---|
| Examen desbalanceado (10 normales + Camila) | modelo 0,818 (vp 0, fn 1, fp 1, vn 9); reglas 0,909; "siempre normal" 0,909 |
| Umbral 0,1 / 0,3 / 0,5 / 0,7 / 0,9 / 0,99 | (fp, fn) = (1,0) / (1,0) / (1,1) / (0,1) / (0,1) / (0,3) |
| Evaluar el modelo en `ENTRENAMIENTO` | exactitud 1 (frente a 0,9 en prueba) |
| Entrenar con `ENTRENAMIENTO + PRUEBA` y evaluar en `PRUEBA` | exactitud 1 (fuga de datos) |
| Umbral de las reglas (`UMBRAL_REGLAS`) → exactitud en `PRUEBA` | 1 → 0,85; 2 → 0,75; **3 → 0,80 (el que trae el archivo)**; 4 → 0,80; 5 → 0,75; 6 → 0,70 |

El umbral 3 de las reglas se eligió **antes** de medir y no se ajustó mirando `PRUEBA`. Si descubres que 1 da mejor nota en el examen (0,85), recuerda la lección de fuga de datos: elegirlo mirando `PRUEBA` sería trampa. En `ENTRENAMIENTO`, el umbral 1 da 0,983, pero con 1 falso positivo.

### Sesgo (módulo 08)

| Dato | Valor |
|---|---|
| Dataset sesgado (30 spam, 3 normales) | exactitud 0,65; vp 10, fn 0, fp 7, vn 3; vocabulario 210; la frase de la biblioteca: SPAM 51,7 % |
| Sin una clase completa | exactitud 0,50 en ambos casos (sin normales: vp 10, fp 10; sin spam: fn 10, vn 10) |
| Enseñar el mensaje de Camila como spam | 41 % → 99,7 %; el examen sube a 1,0 (fuga de datos: el mensaje está en la prueba) |
| Boletín tecnológico, enseñando "Es NORMAL" 0 / 1 / 2 / 3 veces | 66,3 % / 2 % / 0,2 % / 0 % de spam |
| Pedido enviado | SPAM 99,6 % |
| Oferta de trabajo | SPAM 77,7 % |
| Jerga (`Parce...`, `Bro...`, `Uy...`, `Wey...`) | NORMAL con 4,1 %, 4,1 %, 1 %, 0,2 % de spam |
| `Gratiz` | 50 % (NORMAL): no la reconoce |
| Reto "palabras vacías" (lista de 23 palabras) | exactitud 0,85 (vp 9, fn 1, **fp 2**, vn 8), vocabulario 325: **no siempre mejora** |
| Reto "bigramas" (pares unidos con `_`) | exactitud 0,90 (igual), vocabulario 921 |
| Reglas mejoradas (ejemplo: gana 2, paquete 1, aduana 2, tarifa 2) | entrenamiento 0,967 (fn 2); examen 0,85 (vp 7, fn 3, fp 0) |

Los 8 mensajes de la Actividad 1 del módulo 08, según el detective (y según las reglas, entre paréntesis):

| # | Mensaje | Modelo | Reglas |
|---|---|---|---|
| 1 | Boletín de ofertas de tecnología | SPAM 66,3 % | normal (0) |
| 2 | Pedido enviado, sigue tu paquete | SPAM 99,6 % | normal (1) |
| 3 | Juego, 100 puntos | NORMAL (prob. spam 32,4 %) | normal (0) |
| 4 | Vota por mi candidato | NORMAL (10,2 %) | normal (0) |
| 5 | Tamales, WhatsApp del conjunto | SPAM 59,8 % | normal (0) |
| 6 | Oferta de trabajo (bodega) | SPAM 77,7 % | normal (2) |
| 7 | Amigo te invitó a ganar dinero fácil | SPAM 99,5 % | normal (1) |
| 8 | Recordatorio de cita médica | NORMAL (19,4 %) | normal (1) |

### La neurona del módulo 02

| Dato | Valor |
|---|---|
| Neurona del cine: `[1,1,0]`, `[0,1,1]`, `[1,1,1]` con sesgo 0 | sí, no, no |
| Actividad 1 del módulo 02 (a, b, c) | no, no, sí |
| `entrenarNeurona(ejemplosNeurona, 10)` | ronda 1: 2 errores; ronda 2: 0; pesos [1, 1, −1], sesgo 0 |
| Con el 8.º ejemplo contradictorio | ronda 1: 3 errores; ronda 2: 3; desde la ronda 3, 2 errores por ronda hasta la 10 (nunca llega a 0); pesos [2, 1, −1], sesgo 0 |

### Lo que debe mostrar la Autocomprobación

| Momento | Resumen que debe aparecer |
|---|---|
| Antes de empezar los TODO (versión larga) | 2 ✅ · 0 ❌ · 16 ⏳ |
| TODO 1 listo | 6 ✅ · 0 ❌ · 12 ⏳ |
| TODO 2 listo | 8 ✅ · 0 ❌ · 10 ⏳ |
| TODO 3 listo | 16 ✅ · 0 ❌ · 2 ⏳ |
| TODO 4 listo (todo terminado) | 18 ✅ · 0 ❌ · 0 ⏳ |
| Versión corta, antes del TODO | 10 ✅ · 0 ❌ · 8 ⏳ |
| Versión corta, con `clasificar` listo | 18 ✅ · 0 ❌ · 0 ⏳ |

---

## Cómo interpretar tus resultados

### Tu exactitud no coincide con 90 %

| Si ves... | Probablemente... |
|---|---|
| **100 %** en el examen | Entrenaste con `PRUEBA`, o le enseñaste mensajes del examen (fuga de datos). Pulsa *Restaurar datos originales* |
| **65 %**, con muchos falsos positivos | Quedó activado el *dataset sesgado* |
| **50 %** | Quedó quitada una clase completa (*Quitar todo el spam / lo normal*) |
| Un número cercano pero distinto (por ejemplo 85 %) | Cambiaste `datos.js`, `tokenizar` o `reglas.js`. Es normal si hiciste un reto: compara con la tabla de retos |
| Todo da ≈ 50 % de probabilidad | No estás sumando los logaritmos de las palabras (revisa el TODO 3) |
| `NaN` o `-Infinity` | Falta el `\|\| 0` al contar (TODO 1) o el `+ 1` del suavizado (TODO 2) |

### Si tu 90 % coincide, ¿ya está todo bien?

No del todo. Un 90 % en **este** examen de 20 mensajes significa 18 aciertos y 2 errores; con tan pocos datos, un solo mensaje cambia 5 puntos. Por eso en el módulo 07 aprendiste a mirar la matriz, la precisión y el recall, y por qué el examen se usa una sola vez.

### Cómo leer la Autocomprobación

| Ves... | Significa | Qué haces |
|---|---|---|
| ✅ **Bien** | La pieza hace lo que dice su descripción | Sigue |
| ❌ **Falla** | Hay un error; la línea de abajo dice qué salió y qué se esperaba | Lee la pista y corrige |
| ⏳ **Pendiente** | Aún no completas esa parte (no es error) | Haz el TODO correspondiente |
| ⚪ **Omitida** | Una prueba anterior tardó demasiado | Busca un bucle que no termina |

Las pruebas usan datos de juguete propios (3 mensajes), no `datos.js`. Si todo sale en ✅ pero tu examen real da algo raro, el problema suele estar en los datos o en los controles de la página (sesgo, clases quitadas), no en tu código.

---

## Respuestas por módulo (resumen)

> Cada módulo ya tiene las respuestas completas, con su explicación, en los bloques desplegables. Aquí van versiones cortas por si quieres repasar todo de corrido.

### Módulo 01 · ¿Qué es la IA?

- **Actividad 1:** libre; pistas típicas: premios, prisa, enlaces, datos o claves, remitente desconocido.
- **Actividad 2 (mito o realidad):** las tres frases son falsas.
- **Actividad 3:** (1) por refuerzo; (2) no supervisado; (3) supervisado; (4) no es IA con aprendizaje: es un programa fijo.
- **Actividad 4:** libre; casi siempre se rompen las reglas con una variante de ortografía o con un mensaje normal que contiene una palabra "prohibida".
- **Quiz:** (1) la regla escrita la fija una persona; la del modelo sale de los datos. (2) Filtro de spam, recomendaciones, traductor. (3) Encuentra relaciones estadísticas sin saber qué significan. (4) Reglas: reescribirlas; aprendizaje: agregar ejemplos y reentrenar. (5) No: un semáforo fijo no aprende.

### Módulo 02 · Redes neuronales

- **Actividad 1:** (a) 0 → no; (b) −1 → no; (c) 3 → sí.
- **Actividad 2:** con `[1, -5, 0]` y sesgo 0, la tarea manda (−5) y la lluvia no pesa (0).
- **Actividad 3:** libre; verifica 4 entradas de 0 o 1 y un peso nuevo con sentido.
- **Actividad 4:** nunca llega a 0 errores: el ruido en las etiquetas limita al modelo.
- **Quiz:** (1) empuja hacia el "no". (2) Se ajustaron en la dirección que corrige el error. (3) Para saber si aprendió y no solo memorizó. (4) El modelo aprende el error o no logra converger. (5) Una red son muchas neuronas en capas.

### Módulo 03 · Texto y reglas

- **Actividad 1:** `'promocion compra ya'`.
- **Actividad 2:** `['mama', 'vienes', 'la', 'fiesta']`; se pierde énfasis y orden; `¡¡GRATIS!!!` = `gratis`.
- **Actividad 3:** paquete retenido suma 1 (solo "enlace"); Camila suma 0; "Última oportunidad" suma 0; "Reunión urgente" suma 1.
- **Actividad 4:** el ejemplo observado está en el módulo; cada persona tendrá números distintos.
- **Tabla de hipótesis:** ver módulo 03, Parte 6.
- **Quiz:** (1) si no, serían dos palabras distintas. (2) El orden y el contexto. (3) Escribir "g4na". (4) El examen deja de ser una medida honesta. (5) Descarta las palabras de una letra.

### Módulo 04 · Chatbots y LLM

- **Actividad 1:** libre; los mensajes con dos intenciones se resuelven por el orden de la lista.
- **Ejercicio opcional:** no hay clave; usa la **rúbrica de 5 criterios** del módulo (formato, acierto en lo fácil, fallos solo en lo difícil, nota creíble comparada con 16 y 18, estabilidad). Los mensajes difíciles son el 6 (Camila), el 9 (reunión urgente) y el 16 (tarjeta del banco).
- **Quiz:** (1) intención = lo que quiere el usuario; entidad = un dato dentro del mensaje. (2) Genera texto probable, no verifica si es verdad. (3) Privacidad y velocidad, pero menos contexto. (4) Inventar algo falso con seguridad. (5) Cualquiera la ve con F12. (6) Dos intenciones o una negación.

### Módulo 05 · Naive Bayes

- **Actividad 1:** normal pasa a 6 palabras; el vocabulario sigue en 7.
- **Actividad 2:** spam 3/5 × 1/13 × 1/13 ≈ 0,0036; normal 2/5 × 2/10 × 2/10 = 0,016; probSpam ≈ 0,18 → NORMAL.
- **Actividad 3:** (1) `0` y `−828,93`; (2) para no cambiar el orden entre palabras; (3) aporte 0.
- **Quiz:** (1) una tabla de conteos. (2) Su probabilidad sería 0 y anularía todo el puntaje. (3) Para evitar underflow. (4) *gana* (+0,84) frente a *gratis* (+0,43). (5) La proporción de spam con el +1 de suavizado.

### Módulo 06 · Programa tu detective

- **Actividad 1:** `entrenar` cuenta; `logProbPalabra` calcula la probabilidad suavizada en log; `clasificar` suma logs y decide; `evaluar` cuenta aciertos y errores.
- **Actividad 2:** normal: la 25, el 20, de 15; spam: tu 20, de 13, en 13, para 9, dinero 7.
- **Actividad 3:** sin el `+ 1`, `Math.log(0)` da `-Infinity`.
- **Actividad 4:** reglas y modelo coinciden en ambos mensajes (spam el primero, normal el segundo).
- **Actividad 5:** tu nota es 90 %; la gravedad del error es una opinión justificada.
- **Actividad 6:** (1) paquete retenido, "Última oportunidad" y "Reunión urgente" los acierta el modelo; (2) la tarjeta del banco la aciertan las reglas; (3) "distinto".
- **Quiz:** (1) conteos de palabras por clase. (2) No hay conteos suficientes: ignorarla es lo más neutro. (3) Cuánto empuja hacia spam (+) o normal (−). (4) Para medir con datos nuevos. (5) Intercambiaste spam y normal en `Math.exp`. (6) Los chips cambian: el comportamiento depende de los datos.

### Módulo 07 · Evaluación honesta

- **Actividad 1:** matriz de las reglas: vp 6, fn 4, fp 0, vn 10; la preferencia es libre y justificada.
- **Actividad 2:** "¿Cómo están repartidas las clases?" y "¿Qué errores comete: falsos positivos o falsos negativos?".
- **Actividad 3:** (a) universidad: más **precisión** (reglas 1,0 o umbral alto); (b) banco: más **recall** (modelo 0,9 o umbral bajo).
- **Actividad 4:** universidad → 0,7 (fp 0, fn 1); banco → 0,3 (fp 1, fn 0).
- **Tabla de cierre:** no perder mensajes buenos → precisión y fp; que no se cuele spam → recall y fn; saber si aprendió → exactitud en datos de prueba que no vio.
- **Quiz:** (1) reparto de clases y tipo de error. (2) Depende del costo en ese contexto. (3) fp baja, fn sube. (4) Mide memoria, no aprendizaje. (5) Exactitud 0,70, precisión 0,667, recall 0,80. (6) Información del examen que se filtra al entrenamiento.

### Módulo 08 · Sesgo, ética y proyecto

- **Actividad 1:** libre; la etiqueta cambia con la persona.
- **Experimentos:** ver la tabla de [sesgo](#sesgo-módulo-08).
- **Actividad 2:** ideas: quien depende de un trabajo, quien hace un pedido, quien recibe un aviso médico.
- **Actividad 3:** permiso, anonimizar, guardar poco tiempo, permitir borrar; un modelo "desaprende" solo reentrenándolo sin esos datos.
- **Reto final y reflexión:** libres; usa la autoevaluación del módulo.
- **Quiz:** (1) conteos de palabras por clase; no entiende significado. (2) Quien reunió y etiquetó los datos. (3) Preguntar el reparto de las clases y el tipo de error. (4) Depende del contexto. (5) Libre. (6) Opción (b): datos incompletos.

---

## Rúbrica para tu reto final

Puntúa cada criterio de 0 a 2 y suma (máximo 8):

| Criterio | Qué es un 2 |
|---|---|
| Hizo el cambio y la página sigue funcionando | La página abre, no hay errores en la consola |
| Midió antes y después con el examen (y lo reportó aunque no mejoró) | Tienes los dos números anotados |
| Explica con sus palabras qué hace el código que cambió | Puedes explicarlo sin leer |
| Identifica un riesgo ético concreto y una medida | Nombras a quién afecta y qué harías |

De 7 a 8: reto completo. De 4 a 6: repasa el criterio donde sacaste 0 o 1. Menos de 4: vuelve a la Parte 6 del módulo 08 y haz un reto más sencillo.

---

## Autoevaluación final: ya puedes…

Marca cada casilla **solo si puedes hacer la prueba**. La prueba te dice qué hacer; si no puedes, el módulo te dice dónde repasar.

### Ya puedes **explicar**…

| ✔ | Ya puedes explicar... | Prueba rápida (hazla en voz alta o por escrito) | Si no puedes, repasa |
|---|---|---|---|
| ☐ | qué es la IA, el ML y el DL | Dibuja los tres óvalos y da un ejemplo de cada uno | [Módulo 01](./01-que-es-la-ia.md) |
| ☐ | los tres estilos de aprendizaje | Nombra uno por estilo y di cuál es el de tu detective | [Módulo 01](./01-que-es-la-ia.md) |
| ☐ | cómo decide una neurona | Calcula a mano la salida de la neurona del cine con otras entradas | [Módulo 02](./02-redes-neuronales.md) |
| ☐ | qué significa "entrenar" | Explica qué pasa con los pesos cuando la neurona se equivoca | [Módulo 02](./02-redes-neuronales.md) |
| ☐ | cómo se convierte texto en piezas contables | Predice `tokenizar("¡Hola, Mundo!")` sin ejecutarlo | [Módulo 03](./03-texto-y-reglas.md) |
| ☐ | los límites de un filtro por reglas | Da un ejemplo de evasión, de negación y de contexto | [Módulo 03](./03-texto-y-reglas.md) |
| ☐ | cómo funcionan un chatbot y un LLM | Diferencia intención y entidad; explica "predice la siguiente pieza de texto" | [Módulo 04](./04-chatbots-y-llm.md) |
| ☐ | por qué una clave de API es secreta | Explica qué pasa si se escribe en el código de una página | [Módulo 04](./04-chatbots-y-llm.md) |
| ☐ | por qué el +1 y por qué los logaritmos | Explica qué pasaría sin cada uno | [Módulo 05](./05-naive-bayes.md) |
| ☐ | qué guarda un modelo Naive Bayes | Describe sus cuatro campos (`conteos`, `totalPalabras`, `documentos`, `vocabulario`) | [Módulo 05](./05-naive-bayes.md) / [06](./06-programa-tu-detective.md) |
| ☐ | por qué la exactitud puede engañar | Explica el caso del "modelo tonto" con 99 % | [Módulo 07](./07-evaluacion-honesta.md) |
| ☐ | la diferencia entre fp y fn, y entre precisión y recall | Pon un ejemplo de cada uno con mensajes | [Módulo 07](./07-evaluacion-honesta.md) |
| ☐ | qué es una fuga de datos | Da un ejemplo de este taller | [Módulo 07](./07-evaluacion-honesta.md) |
| ☐ | de dónde viene el sesgo de tu detective | Nombra los tres orígenes y un ejemplo de cada uno | [Módulo 08](./08-sesgo-etica-proyecto.md) |

### Ya puedes **hacer**…

| ✔ | Ya puedes hacer... | Prueba rápida | Si no puedes, repasa |
|---|---|---|---|
| ☐ | programar una neurona y verla aprender | Pega `entrenarNeurona` y obtén pesos `[1, 1, -1]` | [Módulo 02](./02-redes-neuronales.md) |
| ☐ | usar `normalizar`, `tokenizar` y la bolsa de palabras | Obtén `{gana: 2, dinero: 1, ya: 1}` con `bolsaDePalabras` | [Módulo 03](./03-texto-y-reglas.md) |
| ☐ | romper un filtro por reglas | Encuentra un mensaje de evasión que dé puntaje 0 | [Módulo 03](./03-texto-y-reglas.md) |
| ☐ | calcular a mano una clasificación Naive Bayes | Obtén 0,84 para `gana gratis` y 0,18 para `hola clase` | [Módulo 05](./05-naive-bayes.md) |
| ☐ | programar `entrenar`, `logProbPalabra`, `clasificar` y `evaluar` | La Autocomprobación muestra `18 ✅ · 0 ❌ · 0 ⏳` | [Módulo 06](./06-programa-tu-detective.md) |
| ☐ | medir con una matriz de confusión | Obtén vp 9, fn 1, fp 1, vn 9 en el examen | [Módulo 07](./07-evaluacion-honesta.md) |
| ☐ | mover el umbral y explicar el efecto | Reproduce la tabla de umbrales y elige uno para un banco | [Módulo 07](./07-evaluacion-honesta.md) |
| ☐ | provocar un sesgo y explicarlo | Obtén 65 % con el dataset sesgado y explica por qué | [Módulo 08](./08-sesgo-etica-proyecto.md) |
| ☐ | aplicar la lista de chequeo de IA responsable | Marca honestamente qué casillas cumple tu detective | [Módulo 08](./08-sesgo-etica-proyecto.md) |

### Cómo interpretar tu autoevaluación

Cuenta tus casillas marcadas (hay 23):

| Casillas | Qué significa | Qué hacer |
|---|---|---|
| **20 a 23** | Dominas el taller | Haz otro reto del módulo 08 o prueba tus propias ideas con el detective |
| **15 a 19** | Buen nivel; hay huecos | Repasa los módulos de las casillas vacías y repite las pruebas rápidas |
| **8 a 14** | Entendiste lo principal, pero falta práctica | Repite los módulos 05 a 07 (son el corazón del taller), haciendo las actividades antes de abrir las respuestas |
| **0 a 7** | Aún no consolidas el material | Vuelve a empezar por el módulo 01 con calma; usa el ritmo del Plan A del índice |

> **Un buen cierre:** elige **una** casilla vacía y mañana, en 10 minutos, haz su prueba rápida. Eso vale más que releer todo.

---

## Archivos de apoyo

| Archivo | Para qué |
|---|---|
| `soluciones/modelo.solucion.js` | Solución completa de los 4 TODO (escalera de ayuda, último escalón) |
| `soluciones/modelo.corto.js` | Base de la versión corta (solo falta `clasificar`) |
| `pruebas.js` | Pruebas de la Autocomprobación (puedes leerlas para ver qué se comprueba) |
| `reglas.js` | Filtro por reglas (módulo 03 y panel 5) |
| [00-glosario.md](./00-glosario.md) | Glosario de 57 términos |
