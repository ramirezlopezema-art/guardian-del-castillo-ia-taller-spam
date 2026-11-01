# Detective de mensajes: entrena tu propio filtro anti-spam
### Taller largo de autoestudio: 8 horas de estudio (480 minutos), en 8 módulos

**Necesitas:** Chrome o Edge y VS Code · **Sin internet, sin cuenta, sin API key** · **Sin profesor: este material se explica solo**

Este taller te lleva **desde cero** (qué es la inteligencia artificial) hasta **programar y evaluar tu propio filtro anti-spam**: un clasificador *Naive Bayes* que aprende de ejemplos, se mide con un examen honesto y se rompe a propósito para ver cómo nacen los sesgos.

Es **autocontenido**: no necesitas haber hecho ningún proyecto anterior. Está pensado para estudiarlo **tú solo**, a tu ritmo: cada paso dice qué deberías ver, cada pregunta trae su respuesta desplegable y la página tiene un panel de **Autocomprobación** que revisa tu código por ti.

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

---

## Empieza aquí (3 pasos)

1. Abre la carpeta `taller-spam` en **VS Code** y haz doble clic en `index.html`: se abre la página del detective. Es normal ver un cuadro amarillo: aún no programas nada.
2. Lee la sección [Cómo estudiar esto solo](#cómo-estudiar-esto-solo) (5 minutos): ahí está el plan, cómo abrir la consola y qué hacer si te atascas.
3. Empieza por el [Módulo 01 · ¿Qué es la IA?](./largo/01-que-es-la-ia.md).

---

## Tu ruta de 8 horas de estudio

Los minutos son **tiempo de estudio estimado** para alguien que lee con calma, hace las actividades y escribe sus respuestas. Incluyen las pausas cortas de 5 minutos que traen algunos módulos. Cada uno puede tomarte más o menos: no es una carrera.

| # | Módulo | Minutos | Al terminar podrás... |
|---|---|---|---|
| 01 | [¿Qué es la IA?](./largo/01-que-es-la-ia.md) | 50 | Distinguir IA, ML y DL, y los tres estilos de aprender |
| 02 | [Redes neuronales y cómo aprende una máquina](./largo/02-redes-neuronales.md) | 70 | Programar una neurona en la consola y verla aprender |
| 03 | [Texto para máquinas y filtro por reglas](./largo/03-texto-y-reglas.md) | 60 | Normalizar, tokenizar y romper un filtro hecho con reglas |
| 04 | [Chatbots y modelos de lenguaje (LLM)](./largo/04-chatbots-y-llm.md) | 60 | Explicar cómo conversa un bot y cómo funciona un LLM |
| 05 | [Naive Bayes: aprender de ejemplos](./largo/05-naive-bayes.md) | 45 | Entrenar y clasificar a mano con un ejemplo pequeño |
| 06 | [Programa tu detective](./largo/06-programa-tu-detective.md) | 75 | Tener un filtro que aprende, funcionando en la página |
| 07 | [Evaluación honesta](./largo/07-evaluacion-honesta.md) | 50 | Medir con matriz de confusión, umbral y sin trampa |
| 08 | [Sesgo, ética y proyecto final](./largo/08-sesgo-etica-proyecto.md) | 70 | Provocar y explicar un sesgo, y escribir tu reflexión final |
| | **Total** | **480** | |

Al final tienes [las soluciones y tu autoevaluación](./largo/99-soluciones-y-autoevaluacion.md) (úsalas **después** de intentar) y el [glosario](./largo/00-glosario.md).

---

## Cómo estudiar esto solo

### 1. Ritmo sugerido, con puntos de parada naturales

Elige el plan que se parezca más a tu vida. En todos, **terminas la sesión en un punto de parada** (el final de un módulo o de una Parte), nunca a mitad de un ejercicio.

**Plan A · 8 sesiones de 1 hora** (el más cómodo)

| Sesión | Contenido | Minutos | Dónde parar |
|---|---|---|---|
| 1 | Módulo 01 completo + Módulo 02, Parte 1 | 50 + 10 = 60 | Al terminar la Parte 1 del módulo 02 |
| 2 | Módulo 02, Partes 2 a 8 | 60 | Final del módulo 02 |
| 3 | Módulo 03 completo | 60 | Final del módulo 03 |
| 4 | Módulo 04 completo | 60 | Final del módulo 04 |
| 5 | Módulo 05 completo + Módulo 06, Parte 1 | 45 + 15 = 60 | Al terminar la Parte 1 del módulo 06 |
| 6 | Módulo 06, Partes 2 a 8 | 60 | Final del módulo 06 (tu detective funciona) |
| 7 | Módulo 07 completo + Módulo 08, Parte 1 | 50 + 10 = 60 | Al terminar la Parte 1 del módulo 08 |
| 8 | Módulo 08, Partes 2 a 7 | 60 | Final del taller |

**Plan B · 4 sesiones de 2 horas**

| Sesión | Módulos | Minutos |
|---|---|---|
| 1 | 01 + 02 | 50 + 70 = 120 |
| 2 | 03 + 04 | 60 + 60 = 120 |
| 3 | 05 + 06 | 45 + 75 = 120 |
| 4 | 07 + 08 | 50 + 70 = 120 |

**Plan C · 2 días intensivos de 4 horas** (con pausas de 10 minutos cada hora): día 1 = módulos 01 a 05 (285 min, más repaso), día 2 = módulos 06 a 08 (195 min, más el proyecto final).

> **Consejo:** no estudies más de 90 minutos seguidos. Los módulos 06 y 08 son los más largos; usa sus pausas.

**Antes de cada sesión (2 minutos):** abre el último módulo que viste y lee su *Resumen en 5 líneas*. Después haz el *mini-quiz* "Antes de empezar" del módulo nuevo: si fallas más de una pregunta, repasa el módulo anterior antes de seguir.

### 2. Qué hacer cuando te atascas (la escalera)

No saltes directo a la solución: aprender es la parte que se pierde. Sube **un escalón a la vez** y dale unos minutos a cada uno.

| Escalón | Qué haces | Tiempo máximo |
|---|---|---|
| 1 | **Relee** el paso con calma, leyendo en voz alta o con el dedo sobre la línea | 3 min |
| 2 | Lee la **pista** (la sección "Si no te sale…" del paso, o la tabla *Errores comunes* del módulo) | 3 min |
| 3 | **Autocomprobación**: pulsa *Ejecutar autocomprobación* en la página (o escribe `autocomprobar()` en la consola). Lee el ❌ y su pista | 5 min |
| 4 | Abre la consola (F12) y mira el **mensaje de error rojo**: dice el archivo y la línea | 5 min |
| 5 | Mira **solo la función que te falta** en `soluciones/modelo.solucion.js`. Cierra el archivo y escríbela tú con tus palabras | cuando llegues aquí |
| 6 | Si aún no cuadra: copia la solución completa sobre `modelo.js` (guarda antes tu intento con otro nombre) y **sigue**. Vuelve al TODO otro día | |

> **Regla para no engañarte:** si usaste la solución, anótalo en tu cuaderno ("TODO 3: vi la solución"). En la autoevaluación final te servirá para saber qué repasar.

### 3. Cómo guardar tu progreso

Guarda tu trabajo **al final de cada sesión**. Elige una de estas dos formas.

**Opción 1 · Copiar la carpeta (la más simple)**

1. Cierra VS Code y abre el Explorador de archivos de Windows.
2. Clic derecho sobre la carpeta `taller-spam` > **Copiar**.
3. Clic derecho en un espacio vacío del mismo lugar > **Pegar**. Se crea `taller-spam - copia`.
4. Cámbiale el nombre, por ejemplo `taller-spam-sesion3`.

Para guardar solo tu código, basta con copiar `modelo.js` (y `reglas.js` si lo cambiaste) con otro nombre, por ejemplo `modelo.todo2-listo.js`. Para volver atrás, copia ese archivo sobre `modelo.js`.

**Opción 2 · Git** (si ya lo tienes instalado). Abre una terminal en la carpeta (clic derecho en la carpeta > *Abrir en Terminal*) y escribe:

```
git init
git add .
git commit -m "Sesion 3: terminé el TODO 2"
```

**Deberías ver:** una línea como `[master (root-commit) 1a2b3c4] Sesion 3...` (o `[main (root-commit) ...]`, según tu Git) y la lista de archivos creados. Si Git responde que no sabe quién eres, ejecuta una vez `git config --global user.name "Tu Nombre"` y `git config --global user.email "tu@correo.com"`. Cada sesión repite `git add .` y `git commit -m "..."`. Para ver tu historial: `git log --oneline`.

### 4. Cómo abrir la consola del navegador (F12)

Varios módulos te piden escribir código en la **consola**. Pasos exactos para **Chrome o Edge en Windows**:

1. Abre la página: doble clic en `index.html`. Si se abre en otro navegador, clic derecho > *Abrir con* > Chrome o Edge.
2. Pulsa **F12**. Se abre un panel (a la derecha o abajo) llamado *Herramientas para desarrolladores*.
3. Haz clic en la pestaña **Consola** (*Console* si tu navegador está en inglés). Si no la ves, haz clic en el icono `»` al final de las pestañas.
4. Haz clic en la línea de abajo, la que empieza con el símbolo `>`. Ahí escribes.
5. Pega tu código con **Ctrl+V** y pulsa **Enter**. El resultado aparece justo debajo, con una flecha `←`.

**Atajos útiles:**

| Quieres... | Haz esto |
|---|---|
| Abrir la consola directo | `Ctrl+Shift+J` (Chrome y Edge) |
| Repetir o corregir la línea anterior | Flecha ↑ |
| Escribir varias líneas sin ejecutar | `Shift+Enter` al final de cada línea |
| Limpiar la consola | `Ctrl+L` |
| Cerrar el panel | `F12` otra vez |

**Cosas que conviene saber:**

- Si Chrome muestra un aviso largo y te pide escribir `allow pasting`, escríbelo, pulsa Enter y vuelve a pegar. Es una protección normal; el código del taller es seguro.
- **Al recargar la página (F5) la consola se vacía**: las funciones y variables que pegaste se pierden y hay que pegarlas de nuevo.
- Una línea sola como `const x = 5` muestra `undefined`: es normal. Lo que importa es la línea que devuelve un valor.
- **Una instrucción a la vez:** si pegas varias líneas juntas, la consola ejecuta todo pero **solo muestra el valor de la última**. Cuando una guía diga "línea por línea" o "una por una", pega y ejecuta cada línea por separado (Enter) para ver cada resultado.
- **Cómo muestra los resultados la consola:** las listas llevan su tamaño delante y comillas simples, por ejemplo `(5) ['gana', 'dinero', 'ya', '50', 'gratis']`; los objetos salen como `{pesos: Array(3), sesgo: 0}` y se despliegan con la flechita ▸. Es lo mismo que ves escrito en esta guía con otro formato. Un texto devuelto se muestra entre comillas: `'gratis gana ya'`.

### 5. Problemas frecuentes (FAQ)

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| **La página sale en blanco** o sin estilos | Abriste otro archivo, o falta `style.css` | Abre `index.html` de la carpeta `taller-spam`. No muevas `index.html` solo: necesita los demás archivos a su lado |
| La página abre pero **los botones no hacen nada** | Hay un error al cargar un script | Pulsa F12 > Consola y lee el primer error rojo: dice el archivo y la línea |
| `... is not defined` (por ejemplo `neurona is not defined`, `estado is not defined`) | Recargaste y se perdió lo que pegaste, o no estás en `index.html` | Pega otra vez el bloque de código, o abre la consola desde `index.html` |
| El cuadro amarillo **"Aún falta completar una parte del código"** no se va | Sigue la línea `return pendiente(...)` o no recargaste | Borra esa línea, guarda con **Ctrl+S** y recarga con **F5** |
| Sale ⏳ **Pendiente** en la Autocomprobación | Esa parte aún tiene su línea `pendiente(...)` | No es un error: es el aviso de que falta hacerla |
| **CORS** u otro error al cargar archivos | Abriste la página desde un servidor o vista previa que cambia las rutas | Abre `index.html` con doble clic. Este taller no necesita servidor |
| Los **acentos** se ven raros (`Ã³`, `Ã±`) | El archivo se guardó con otra codificación | En VS Code, abajo a la derecha, clic en la codificación > *Guardar con codificación* > **UTF-8** |
| `Invalid or unexpected token` al pegar código | **Comillas "curvas"** (“ ” ‘ ’) copiadas de un PDF, Word o web | Escribe las comillas con el teclado: `"` y `'` rectas |
| Editas y **la página no cambia** | Editaste otro archivo (por ejemplo, el de `soluciones/`) o el navegador guardó una copia vieja | Edita `modelo.js` de la carpeta principal. Recarga con **Ctrl+F5** (recarga forzada: ignora la copia guardada) |
| `Identifier 'x' has already been declared` | Pegaste dos veces un `const` | Recarga con F5 y pega una sola vez |
| La pestaña **se congela** | Un bucle que nunca termina en tu código (por ejemplo, `while (true)`) | Cierra la pestaña, abre `index.html` otra vez y corrige el bucle en `modelo.js` |
| `Unexpected token` / `Unexpected identifier` | Falta o sobra una coma, un paréntesis o una llave | Mira la línea que indica la consola, y la anterior |

**F5 contra Ctrl+F5:** F5 recarga la página usando archivos que el navegador pudo guardar; **Ctrl+F5** (o `Ctrl+Shift+R`) obliga a leerlos de nuevo del disco. Si cambiaste un archivo y no ves el cambio, prueba Ctrl+F5.

---

## Archivos del taller

| Archivo | ¿Lo editas? | Para qué sirve |
|---|---|---|
| `modelo.js` | **Sí (módulo 06)** | Aquí viven los 4 TODO de tu detective |
| `reglas.js` | Sí (módulo 03, opcional) | El filtro "de antes", hecho con reglas a mano |
| `datos.js` | Solo en retos | 60 mensajes de entrenamiento y 20 de prueba |
| `pruebas.js` | No | Las pruebas del panel **Autocomprobación** (usan sus propios datos mínimos) |
| `index.html`, `app.js`, `style.css` | No (salvo retos) | La página del detective |
| `soluciones/modelo.solucion.js` | No lo mires antes de tiempo | Solución completa de los 4 TODO (escalera, escalón 5 y 6) |
| `largo/00-glosario.md` | No | Glosario de 57 términos |
| `largo/99-soluciones-y-autoevaluacion.md` | Léelo al final | Soluciones, números esperados y autoevaluación final |

Para la versión de **2 horas** usa [TALLER_CORTO.md](./TALLER_CORTO.md).

## La página y su Autocomprobación

La página tiene un panel de **Autocomprobación** arriba y cinco paneles de trabajo:

| Panel | Para qué |
|---|---|
| Autocomprobación | Botón que revisa tu `modelo.js` y marca cada pieza con ✅ (bien), ❌ (falla, con pista) o ⏳ (pendiente) |
| 1. Analiza un mensaje | Escribes un texto; ves el veredicto, la probabilidad y las palabras que pesaron |
| 2. Enséñale al detective | Corriges un error y ves si cambia de opinión |
| 3. Los datos con los que aprende | Quitas una clase o cargas un dataset sesgado |
| 4. Examen del detective | Exactitud, matriz de confusión y los mensajes que falló |
| 5. Comparar: reglas vs aprendido | El filtro por reglas y tu modelo, lado a lado |

**Qué verás en la Autocomprobación mientras avanzas** (módulo 06):

| Momento | Resumen que debe aparecer |
|---|---|
| Antes de empezar los TODO | 2 ✅ · 0 ❌ · 16 ⏳ |
| TODO 1 listo | 6 ✅ · 0 ❌ · 12 ⏳ |
| TODO 2 listo | 8 ✅ · 0 ❌ · 10 ⏳ |
| TODO 3 listo | 16 ✅ · 0 ❌ · 2 ⏳ |
| TODO 4 listo | 18 ✅ · 0 ❌ · 0 ⏳ |

Sus pruebas usan tres mensajes de juguete escritos dentro de `pruebas.js`, no `datos.js`: no se rompen si editas los datos. Sin ❌ no significa "perfecto": significa que esa pieza hace lo que dice su descripción.

## Lo que podrás hacer al terminar

- [ ] Explicar qué es la IA, el ML y el DL, con ejemplos de la vida diaria.
- [ ] Programar una neurona y explicar cómo se "aprenden" los pesos.
- [ ] Convertir texto en piezas que una máquina puede contar (normalizar, tokenizar, bolsa de palabras).
- [ ] Construir y romper un filtro por reglas, y decir cuáles son sus límites.
- [ ] Explicar a nivel de concepto cómo funcionan un chatbot y un LLM.
- [ ] Calcular a mano una clasificación Naive Bayes con suavizado y logaritmos.
- [ ] Programar `entrenar`, `logProbPalabra`, `clasificar` y `evaluar`.
- [ ] Leer una matriz de confusión, y explicar el desbalance de clases, el umbral y la fuga de datos.
- [ ] Provocar un sesgo en tu modelo y explicar de dónde viene.
- [ ] Aplicar una lista de chequeo de IA responsable.

La [autoevaluación final](./largo/99-soluciones-y-autoevaluacion.md#autoevaluación-final-ya-puedes) te pide demostrar cada una de estas frases.

## Siguiente paso

Empieza por el [Módulo 01 · ¿Qué es la IA?](./largo/01-que-es-la-ia.md).
