# Notas para el docente (taller largo, 480 min)

> **Solo para el docente.** Contiene respuestas, números esperados y consejos de tiempo. No lo compartas con el grupo antes de las actividades. Índice del curso: [TALLER_LARGO.md](../TALLER_LARGO.md).

## 1. Cómo conducir el curso

- **Cada módulo se puede enviar solo.** Todos traen un "Antes de empezar" con un repaso y un enlace al módulo anterior.
- **Ritmo recomendado:** alternar explicación breve (5 a 10 min) con actividad. Las actividades están pensadas **en parejas**; así se ayudan con la consola y con VS Code.
- **No resuelvas por ellos los TODO del módulo 06.** Si un grupo se atasca más de 10 minutos, que mire **solo la función que falta** en `soluciones/modelo.solucion.js` y la reescriba con sus palabras.
- **Antes del módulo 07 u 08, si alguien llega sin haber hecho el 06:** que copie `soluciones/modelo.solucion.js` encima de `modelo.js`.
- Los módulos 01 a 05 **no requieren** que los TODO estén hechos. La página funciona con el cuadro amarillo; el panel 5 (reglas) ya sirve.

## 2. Cronograma y qué recortar

| Módulo | Min | Si vas justo, recorta... | Ahorro |
|---|---|---|---|
| 01 | 50 | Actividad 2 (mito o realidad) solo oral | 4 |
| 02 | 70 | Actividad 3 (diseña tu neurona) y la Parte 7 en 2 min | 10 |
| 03 | 60 | La Actividad 4 se hace en casa o se resume en una discusión | 8 |
| 04 | 60 | La Parte 6 (ejercicio con asistente), que ya es opcional | 10 |
| 05 | 45 | Actividad 1 y 3; haz solo el cálculo guiado | 6 |
| 06 | 75 | Entrega TODO 1 resuelto (copia el bucle de la solución) | 12 |
| 07 | 50 | Parte 4 (umbral) como demostración en el proyector | 7 |
| 08 | 70 | Experimentos 3 y 4; deja un solo reto final | 15 |

| Si te sobra tiempo | Haz esto |
|---|---|
| 5 a 10 min | Debate abierto en el módulo 08 (¿quién decide qué es spam?) |
| 15 a 20 min | Dos retos finales; o que las parejas expliquen un TODO a otra pareja |
| Un grupo avanzado | Retos: bigramas + palabras vacías y comparar |

> **Cuidado con los descansos:** los módulos 02, 03, 04, 06 y 08 traen un descanso de 5 min. Si no lo usas, repártelo en preguntas.

## 3. Números esperados (calculados ejecutando el código)

> Los números dependen de `datos.js` (60 ejemplos de entrenamiento: 30 spam y 30 normales; 20 de prueba: 10 y 10; sin mensajes repetidos entre las dos listas). Si cambias los datos o `reglas.js`, recalcula.

| Dato | Valor |
|---|---|
| Palabras totales por clase | spam **364**, normal **328** |
| Vocabulario | **347** palabras |
| Examen del modelo (`PRUEBA`) | exactitud **0,90**; vp 9, fn 1, fp 1, vn 9 |
| Mal clasificados por el modelo | Camila (spam, 41 % → NORMAL); tarjeta del banco (normal, 53,8 % → SPAM) |
| Examen de las reglas (`PRUEBA`) | exactitud **0,80**; vp 6, fn 4, fp 0, vn 10 |
| Reglas en `ENTRENAMIENTO` | exactitud 0,883; vp 23, fn 7, fp 0, vn 30 |
| Spam que se escapan a las reglas (`PRUEBA`) | paquete retenido (puntaje 1), Camila (0), "Última oportunidad" (0), "Reunión urgente" (1) |
| Desacuerdos reglas vs modelo | 4: 3 los acierta el modelo (paquete, "Última oportunidad", "Reunión urgente"); 1 lo aciertan las reglas (tarjeta del banco) |
| Precisión / recall del modelo | 0,9 / 0,9 |
| Precisión / recall de las reglas | 1 / 0,6 |
| Ejemplo de juguete `gana gratis` | probSpam **0,842** (log spam −3,849; log normal −5,521; diferencia 1,672) |
| Ejemplo de juguete `hola clase` | probSpam **0,182** |
| Ejemplo de juguete `gana ya` / `gratis hola` | 0,727 / 0,470 |
| `logProbPalabra("gratis", "spam")` / `"normal"` | −4,62 / −6,51 (aporte 1,89) |
| Palabras más "spam" (aporte) | dinero 2,03; gratis 1,89; un 1,74; premio 1,74; tu 1,61 |
| Palabras más "normal" (aporte) | que −2,00; mi −1,84; la −1,70; por −1,66; clase −1,66 |
| Palabras más frecuentes en spam | tu (20), de (13), en (13), para (9), dinero (7) |
| Palabras más frecuentes en normal | la (25), el (20), de (15), que, para, con (6 cada una) |
| `tu` en spam / en normal | 20 / 3 |
| Examen desbalanceado (10 normales + Camila) | modelo 0,818 (vp 0, fn 1, fp 1, vn 9); reglas 0,909; "siempre normal" 0,909 |
| Umbral 0,1 / 0,3 / 0,5 / 0,7 / 0,9 / 0,99 | (fp, fn) = (1,0) / (1,0) / (1,1) / (0,1) / (0,1) / (0,3) |
| Dataset sesgado (30 spam, 3 normales) | exactitud 0,65; vp 10, fn 0, fp 7, vn 3; la frase de la biblioteca: SPAM 51,7 % |
| Sin ejemplos normales / sin ejemplos spam | exactitud 0,50 en ambos casos |
| Enseñar el mensaje de Camila como spam | 41 % → 99,7 %; el examen sube a 1,0 (fuga de datos: el mensaje está en la prueba) |
| Entrenar con `ENTRENAMIENTO + PRUEBA` y evaluar en `PRUEBA` | exactitud 1 |
| Evaluar el modelo en `ENTRENAMIENTO` | exactitud 1 (frente a 0,9 en prueba) |
| Neurona de aprender (módulo 02) | ronda 1: 2 errores; ronda 2: 0; pesos [1, 1, −1], sesgo 0 |
| Neurona con ejemplo contradictorio | se queda en 2 errores por ronda en las 10 rondas |
| Reto "palabras vacías" (lista de 23 palabras, abajo) | exactitud 0,85 (fp 2): **no siempre mejora** |
| Reto "bigramas" (agregar pares unidos con `_`) | exactitud 0,90 (igual), vocabulario 921 |

Lista de 23 palabras vacías usada: `de, la, el, en, que, y, los, las, un, una, para, con, por, tu, te, mi, me, se, es, al, del, ya, no`.

**Umbral de las reglas (`UMBRAL_REGLAS`)** — exactitud en `PRUEBA` con cada valor: 1 → 0,85; 2 → 0,75; **3 → 0,80 (el que trae el archivo)**; 4 → 0,80; 5 → 0,75; 6 → 0,70. El umbral 3 se eligió **antes** de medir y no se ajustó mirando `PRUEBA`: si un grupo "descubre" que 1 es mejor, es buen momento para hablar de fuga de datos (en `ENTRENAMIENTO` el umbral 1 da 0,983, pero con más falsos positivos).

## 4. Respuestas por módulo

### Módulo 01

- **Actividad 2 (mito o realidad):** todas las frases propuestas son falsas ("mi celular me escucha porque piensa", "nunca se equivoca", "entiende el idioma como yo"). Lo importante es la discusión.
- **Actividad 3:** (1) por refuerzo; (2) no supervisado; (3) supervisado; (4) no es IA: es un programa fijo sin datos ni aprendizaje.
- **Actividad 4:** libre. Casi siempre rompen las reglas con una variante de ortografía o con un mensaje normal que contiene una palabra "prohibida".
- **Preguntas de cierre:** (1) la regla escrita la fija una persona; la del modelo sale de los datos. (2) Reconocer spam, recomendaciones, traductor. (3) Porque encuentra relaciones estadísticas entre palabras y etiquetas, sin saber qué significan. (4) Reglas: reescribirlas; aprendizaje: agregar ejemplos y reentrenar.

### Módulo 02

- **Actividad 1:** (a) 3 − 2 − 1 = 0, no es mayor que 0: **no**. (b) 0 + 0 − 1 = −1: **no**. (c) 3 + 0 + 0 = 3: **sí**.
- **Actividad 2:** libre. Ejemplo: con `[1, -5, 0]` y sesgo 0, un mensaje con tarea (`[0, 1, 0]`) suma −5 y da "no"; para que vaya aunque llueva, el peso de la lluvia debe ser 0 o solo un poco negativo.
- **Actividad 3:** libre. Verificar que usen entradas 0 o 1 y que el peso nuevo tenga sentido.
- **Actividad 4:** con el ejemplo contradictorio **nunca llega a 0 errores** (se queda en 2 errores por ronda en las 10 rondas). Dos personas etiquetando igual de mal lo mismo producen un modelo que no puede acertar todo: **el ruido en las etiquetas limita al modelo**.
- **Preguntas de cierre:** (1) empuja hacia el "no". (2) Se ajustaron en la dirección que corrige el error. (3) Para saber si aprendió y no solo memorizó. (4) El modelo aprende el error o no logra converger.

### Módulo 03

- **Actividad 1:** `"promocion compra ya"`.
- **Actividad 2:** `["mama", "vienes", "la", "fiesta"]` (se quita la "a" por tener una sola letra). (1) Se pierde el énfasis y el significado de algunas tildes. (2) `¡¡GRATIS!!!` y `gratis` quedan iguales: bueno para no depender de signos, malo si los signos eran una pista. (3) Se pierde el orden.
- **Actividad 3:** el de **paquete retenido** suma 1 (solo "enlace"; faltan "paquete", "retenido", "tarifa"); **Camila** suma 0 (ninguna palabra del léxico); **"Última oportunidad"** suma 0; **"Reunión urgente"** suma 1 (reunion −1 + urgente +2).
- **Actividad 4 (ejemplo observado):** agregando `gana: 2, paquete: 1, aduana: 2, tarifa: 2` (palabras vistas en spam de entrenamiento que se escapaban) la exactitud sube a 0,967 en entrenamiento y a 0,85 en prueba (vp 7, fn 3). Ojo: parte de la mejora en prueba ocurre porque `PRUEBA` comparte temas con `ENTRENAMIENTO` (paquete, tarifa), no porque las reglas generalicen. Siguen sin atraparse Camila, "Última oportunidad" y "Reunión urgente". Cada grupo tendrá números distintos.
- **Preguntas de cierre:** (1) Si no, serían dos palabras distintas y habría que contarlas por separado. (2) El orden y el contexto. (3) Escribir "g4na" en vez de "gana". (4) Porque el examen deja de ser una medida honesta.

### Módulo 04

- **Actividad 1:** libre. Mensajes con dos intenciones se resuelven por el orden de la lista.
- **Ejercicio opcional:** no hay clave: los resultados dependen del asistente que use cada estudiante. Si el grupo lo hace, conviene proyectar un resumen de aciertos por asistente y mirar **en qué mensajes** discrepan (los difíciles son Camila, la tarjeta del banco y "Reunión urgente").
- **Preguntas de cierre:** (1) Intención: lo que quiere el usuario ("reportar"). Entidad: un dato dentro del mensaje (un número de teléfono). (2) Porque genera texto probable, no verifica si es verdad. (3) Privacidad y velocidad (nada sale del navegador); pero entiende menos contexto. (4) Inventar algo falso con seguridad; en un filtro puede acusar a alguien de estafa sin motivo.

### Módulo 05

- **Actividad 1:** tabla con el cuarto mensaje (`gratis clase ya`, normal): *gratis* 1 spam / 1 normal; *clase* 0 / 2; *ya* 1 / 2; *hola* 0 / 1. La clase *normal* pasa a tener **6 palabras**; el vocabulario sigue en **7**.
- **Actividad 2:** spam = 3/5 × 1/13 × 1/13 ≈ 0,0036; normal = 2/5 × 2/10 × 2/10 = 0,016; probSpam ≈ 0,0036 ÷ 0,0196 ≈ **0,18** → NORMAL.
- **Actividad 3:** (1) `Math.pow(0.001, 120)` devuelve `0` (underflow); `120 * Math.log(0.001)` devuelve ≈ −828,93, un número perfectamente manejable. (2) Se suma a todos para no cambiar el orden entre palabras ni favorecer a unas sobre otras; así todas las palabras mantienen su comparación. (3) El aporte es 0 (mismas probabilidades en las dos clases).
- **Preguntas de cierre:** (1) Una tabla de conteos. (2) Su probabilidad sería 0 y anularía todo el puntaje. (3) Para evitar underflow. (4) *gana*: +0,84 frente a *gratis*: +0,43, porque *gana* aparece 2 veces en spam y *gratis* solo 1 (con las mismas cantidades totales).

### Módulo 06

- **Actividad 1:** que expliquen, por ejemplo: `entrenar` cuenta, `logProbPalabra` calcula la probabilidad suavizada en log, `clasificar` suma logs y decide, `evaluar` cuenta aciertos y errores.
- **Actividad 2:** las más frecuentes en normal son palabras comunes como `la` (25), `el` (20), `de` (15), `que`, `para`, `con` (6 cada una). En spam: `tu` (20), `de` (13), `en` (13), `para` (9), `dinero` (7).
- **Actividad 3:** sin el `+ 1`, `Math.log(0)` da `-Infinity` y cualquier mensaje con una palabra nueva quedaría con puntaje `-Infinity` en esa clase.
- **Actividad 4:** el modelo y las reglas coinciden en ambos mensajes (spam el primero, normal el segundo). Lo interesante es ver las coincidencias de las reglas y los chips del modelo.
- **Actividad 5:** libre.
- **Actividad 6:** (1) paquete retenido, "Última oportunidad" y "Reunión urgente": las reglas no tenían esas palabras; el modelo aprendió `tu`, `enlace`, etc. (2) tarjeta del banco, que las reglas dejan como normal (solo suma 2 por `gratis`, y el umbral es 3) pero el modelo marca spam por palabras como `tu`, `banco` y `gratis`. (3) "Distinto": cada uno falla en casos diferentes.
- **Preguntas de cierre:** (1) Conteos de palabras por clase. (2) No hay conteos suficientes para esa palabra; ignorarla es lo más neutro. (3) Cuánto empuja hacia spam (+) o normal (−). (4) Para medir con datos nuevos y no con lo memorizado.

### Módulo 07

- **Actividad 1:** matriz de las reglas: vp 6, fn 4, fp 0, vn 10. Respuesta libre; un dueño de correo personal suele preferir menos fp.
- **Actividad 2:** "¿Cómo están repartidas las clases?" y "¿Qué errores comete: falsos positivos o falsos negativos?"
- **Actividad 3:** (a) universidad: probablemente el filtro con **más precisión** (reglas: 1,0) o un umbral alto, para no perder avisos; (b) banco: más **recall** (modelo: 0,9) o un umbral bajo, para no dejar pasar fraudes. Valorar el razonamiento, no una única respuesta.
- **Actividad 4:** libre. Una buena respuesta liga el umbral con el error que cada cliente tolera: universidad → 0,7 (fp 0, fn 1); banco → 0,3 (fp 1, fn 0).
- **Tabla de cierre:** no quiero perder mensajes buenos → precisión y fp; no quiero que se cuele spam → recall y fn; quiero saber si aprendió → exactitud en datos de prueba que no vio (y que no se usaron para ajustar).
- **Preguntas de cierre:** (1) cómo están repartidas las clases y qué errores comete; (2) depende del costo en ese contexto; (3) fp baja, fn sube; (4) porque mide memoria, no aprendizaje.

### Módulo 08

- **Actividad 1:** libre. Lo esperable es que los grupos discrepen en los mensajes 1, 3, 4, 5, 6 y 7. Úsalo para mostrar que "spam" depende del contexto.
- **Salida del detective con los 8 mensajes** (modelo entrenado con los 60 ejemplos; reglas entre paréntesis):

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

- **Experimento 4 y la jerga:** los mensajes con jerga que se probaron (`Parce, mañana nos vemos en la u`, `Bro, mándame el link de la presentación`, `Uy, qué chimba la fiesta de ayer`, `Wey, pásame la tarea por el grupo`) salen **NORMAL** con probabilidades de spam de 4,1 %, 4,1 %, 1 % y 0,2 %, porque el detective **ignora** las palabras que no conoce. Es un hallazgo honesto: el sesgo más visible de este modelo no es contra la jerga sino contra **mensajes legítimos que usan palabras de spam** (pedidos, ofertas de trabajo, boletines). `Gratiz` (con falta de ortografía) sale 50 % NORMAL: no la reconoce. Aprovecha para hablar de evasión.
- **Actividad 2:** libre. Ideas: quien depende de un trabajo, quien hace un pedido, quien recibe un aviso médico.
- **Actividad 3:** libre. Ideas válidas: pedir permiso, anonimizar, guardar poco tiempo, permitir borrar. Un modelo "desaprende" solo reentrenándolo sin esos datos.
- **Pistas de los retos (resultados observados):** palabras vacías con la lista de arriba → 0,85; bigramas → 0,90; umbral deslizante → ver la tabla del módulo 07.
- **Preguntas de cierre:** libres. (1) Conteos de palabras por clase; no entiende significado. (2) Quien reunió y etiquetó los datos. (3) Preguntar el reparto de las clases y el tipo de error. (4) Depende del contexto. (5) Libre.

## 5. Rúbrica sugerida para el reto final (opcional)

| Criterio | Peso |
|---|---|
| Hizo el cambio y la página sigue funcionando | 30 % |
| Midió antes y después con el examen (y lo reportó aunque no mejoró) | 30 % |
| Explica con sus palabras qué hace el código que cambió | 20 % |
| Identifica un riesgo ético concreto y una medida | 20 % |

## 6. Problemas frecuentes (para el docente)

| Síntoma | Causa probable | Qué decirles |
|---|---|---|
| El cuadro amarillo no desaparece | Siguen con la línea `return pendiente(...)` o no recargaron | "¿Borraste la línea de `pendiente`? ¿Presionaste F5?" |
| `NaN` en los conteos | Olvidaron el `\|\| 0` al contar | "La primera vez la palabra no existe: `undefined + 1` es `NaN`" |
| `Cannot read properties of undefined` | `modelo.conteos.clase` en vez de `modelo.conteos[clase]` | "Si la clase está en una variable, va entre corchetes" |
| Probabilidades enormes o 0 en todo | Multiplicaron en vez de sumar logs, o usaron `Math.log10` con `Math.exp` | "Solo `Math.log` combina con `Math.exp`" |
| Todo da casi 50 % | No sumaron `logProbPalabra` o olvidaron `tamVocabulario` | Revisar el paso 3 de la Parte 5 del módulo 06 |
| `fp` y `fn` invertidos | Confundieron "positivo" con "bueno" | "Positivo = spam, la clase que buscamos" |
| Exactitud 100 % | Enseñaron mensajes del examen, o entrenaron con `PRUEBA` | Hablar de fuga de datos |
| Editan pero la página no cambia | Editaron `soluciones/` o caché del navegador | Abrir `modelo.js` de la carpeta principal y Ctrl+F5 |
| `Identifier ... has already been declared` en la consola | Pegaron dos veces un `const` | Recargar con F5 |
| La caja de reglas dice "No se pudo cargar reglas.js" | Se borró o renombró `reglas.js` o su `<script>` | Revisar `index.html` |

## 7. Archivos de apoyo

| Archivo | Para qué |
|---|---|
| `soluciones/modelo.solucion.js` | Solución completa de los 4 TODO |
| `soluciones/modelo.corto.js` | Base de la versión corta (solo falta `clasificar`) |
| `reglas.js` | Filtro por reglas (módulo 03 y panel 5) |
| [00-glosario.md](./00-glosario.md) | Glosario de 57 términos |
