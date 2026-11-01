# Módulo 06 · Programa tu detective

> **Tiempo de estudio:** 75 min · **Anterior:** [Módulo 05](./05-naive-bayes.md) · **Siguiente:** [Módulo 07](./07-evaluacion-honesta.md) · **Glosario:** [00-glosario.md](./00-glosario.md) · **Ayuda y escalera de pistas:** [TALLER_LARGO.md](../TALLER_LARGO.md#cómo-estudiar-esto-solo)

**Meta de este módulo:** completar **4 piezas de código** (los TODO) en `modelo.js` para tener un detective que aprende de ejemplos. Después de cada pieza guardas, recargas y **verificas** con la **Autocomprobación** de la página: ella es tu profesor automático.

## Antes de empezar: ¿estás listo?

**Recuerda del módulo anterior (Naive Bayes):**

- **Entrenar** = contar cuántas veces aparece cada palabra en cada clase.
- **Probabilidad de una palabra** = (veces + 1) ÷ (palabras de la clase + vocabulario). El `+1` es el suavizado de Laplace.
- **Clasificar** = sumar logaritmos de esas probabilidades (más la probabilidad previa de cada clase) y comparar.
- Con el ejemplo de 3 mensajes, `gana gratis` daba 0,84 de probabilidad de spam y `hola clase`, 0,18.

Si llegas solo con este módulo, lee la sección "Resumen en 5 líneas" del [módulo 05](./05-naive-bayes.md): te basta con esas cinco ideas. Y necesitas saber leer JavaScript básico (variables, `for`, funciones, objetos); aquí te lo vamos recordando.

**1. En la fórmula de la probabilidad de una palabra, ¿qué se pone en el denominador?**

<details><summary>Respuesta</summary>

El total de **palabras de la clase** más el **tamaño del vocabulario**: `(veces + 1) ÷ (palabras de la clase + vocabulario)`.

</details>

**2. ¿Por qué se suman logaritmos en lugar de multiplicar probabilidades?**

<details><summary>Respuesta</summary>

Para evitar el *underflow*: multiplicar muchos números diminutos da 0 en el computador. La suma de logaritmos da el mismo resultado sin ese problema.

</details>

**3. En JavaScript, ¿qué hace `conteos[p] = (conteos[p] || 0) + 1;`?**

<details><summary>Respuesta</summary>

Suma 1 al contador de la palabra `p`. El `|| 0` cubre la primera vez, cuando `conteos[p]` aún no existe (`undefined`): sin él, `undefined + 1` da `NaN`.

</details>

## Objetivos

- [ ] Completar `entrenar` (TODO 1): contar palabras por clase.
- [ ] Completar `logProbPalabra` (TODO 2): el suavizado de Laplace con logaritmo.
- [ ] Completar `clasificar` (TODO 3): sumar logaritmos y dar el veredicto.
- [ ] Completar `evaluar` (TODO 4): el examen con matriz de confusión.
- [ ] Comparar tu detective con el filtro por reglas del [módulo 03](./03-texto-y-reglas.md).

## Mapa de tiempos (estudio estimado)

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Prepara el taller y recorre el código | 15 |
| 2 | TODO 1 · `entrenar` | 10 |
| 3 | TODO 2 · `logProbPalabra` | 7 |
| 4 | Descanso | 5 |
| 5 | TODO 3 · `clasificar` | 13 |
| 6 | TODO 4 · `evaluar` | 10 |
| 7 | Explicar decisiones, enseñar y comparar | 10 |
| 8 | Cierre: quiz y resumen | 5 |
| | **Total** | **75** |

> **Tu ciclo de trabajo en cada TODO (memorízalo):** 1) editas `modelo.js` → 2) **Ctrl+S** (guardar) → 3) pestaña de la página → **F5** (recargar) → 4) pulsas **Ejecutar autocomprobación** → 5) lees los ✅ ❌ ⏳. Si algo falla, la página muestra un cuadro amarillo con la pista y la Autocomprobación te dice cuál prueba falla y por qué.
>
> **Si te atascas más de 10 minutos:** sube la [escalera de ayuda](../TALLER_LARGO.md#2-qué-hacer-cuando-te-atascas-la-escalera). Primero pistas y autocomprobación; la solución es el último escalón.

---

## Parte 1 · Prepara el taller y recorre el código (15 min)

### Paso 1.0 · Haz una copia de seguridad de `modelo.js`

Antes de tocar nada, guarda el punto de partida. En VS Code, en la barra lateral de archivos: clic derecho sobre `modelo.js` > **Copiar**; clic derecho en un espacio vacío > **Pegar**; renombra la copia (tecla **F2**) a `modelo.original.js`. Así siempre puedes volver al inicio.

**Deberías ver:** dos archivos, `modelo.js` y `modelo.original.js`, con el mismo contenido.

### Paso 1.1 · Abre la página

Haz doble clic en `index.html`. **Deberías ver:**

- El panel **Autocomprobación** arriba, y un cuadro amarillo: "Aún falta completar una parte del código" (normal, aún no hay TODO hechos).
- Más abajo, en el panel 3, "ejemplos de spam" en **30** y "ejemplos normales" en **30**.
- El panel **5. Comparar: reglas vs aprendido**: si escribes un mensaje arriba y pulsas **Analizar**, el lado de las **reglas ya funciona** y el del modelo avisa que no está listo.

Pulsa **Ejecutar autocomprobación**. **Deberías ver:** `Versión del taller detectada: larga · 2 ✅ · 0 ❌ · 16 ⏳ · 0 ⚪`. Los dos ✅ son `normalizar` y `tokenizar` (ya vienen hechas); los 16 ⏳ son las piezas que vas a programar. **⏳ no es un error:** es el aviso de que esa parte aún no se hace.

**Si no te sale…** si el botón no hace nada o la lista no aparece, abre la consola (F12) y lee el primer error rojo. Revisa que `pruebas.js` esté en la carpeta y que `index.html` tenga la línea `<script src="pruebas.js">`.

### Paso 1.2 · Abre `modelo.js` en VS Code

Las partes **ya hechas** (no las cambies):

| Función | Qué hace |
|---|---|
| `nuevoContador()` | Crea un diccionario vacío y seguro para contar palabras |
| `normalizar(texto)` | Minúsculas, sin tildes ni signos (módulo 03) |
| `tokenizar(texto)` | Parte el texto en palabras (módulo 03) |
| `pendiente(numero, queFalta)` | Avisa a la página que un TODO está sin completar |
| `logPrior(clase, modelo)` | La probabilidad previa de una clase, en logaritmo |
| `agruparAportes(lista)` | Une palabras repetidas y las ordena por importancia |

Y las **4 funciones con TODO**: `entrenar`, `logProbPalabra`, `clasificar` y `evaluar`. Cada una termina con una línea `return pendiente(...)`. **Esa línea hay que borrarla** cuando termines tu código.

### Paso 1.3 · Mira el modelo en forma de objeto

Un `modelo` es solo un objeto con las cuentas:

```text
modelo = {
  conteos:        { spam: { gana: 2, ... },  normal: { hola: 1, ... } },
  totalPalabras:  { spam: 6,  normal: 3 },     // palabras totales por clase
  documentos:     { spam: 2,  normal: 1 },     // mensajes por clase
  vocabulario:    { gana: true, dinero: true, ... },
  tamVocabulario: 7
}
```

Es la tabla del módulo 05 convertida en datos.

> **Actividad 1 · Lee antes de escribir (5 min).** Lee los comentarios de los 4 TODO en `modelo.js`. Sin mirar el código, **escribe con tus palabras** (una línea cada una) qué hace cada una de las 4 funciones. También puedes explicárselo en voz alta a un amigo imaginario o a un peluche. Si no puedes explicarlo, relee el comentario antes de programar.

<details><summary>Respuesta</summary>

Una explicación correcta, con otras palabras:

- `entrenar` **cuenta** las palabras de cada clase y arma el modelo.
- `logProbPalabra` calcula el **logaritmo de la probabilidad suavizada** de una palabra dentro de una clase.
- `clasificar` **suma logaritmos** de las palabras de un mensaje para cada clase y decide cuál gana.
- `evaluar` clasifica los mensajes del examen y **cuenta aciertos y errores** (matriz de confusión).

</details>

**Checkpoint · deberías ver:** la página abre con el cuadro amarillo, 30/30 en los conteos y `2 ✅ · 0 ❌ · 16 ⏳` en la Autocomprobación.

---

## Parte 2 · TODO 1: `entrenar` (10 min)

**Meta:** que `entrenar(datos)` cuente las palabras de cada clase.

### Pasos

1. En `modelo.js`, busca `// TODO 1`. Lee los pasos del comentario.
2. Recorre `datos` con `for (const ejemplo of datos)`.
3. Por cada ejemplo: guarda su clase (`ejemplo.etiqueta`) y suma 1 a `modelo.documentos[clase]`.
4. Por cada palabra de `tokenizar(ejemplo.texto)`:
   - suma 1 a `modelo.conteos[clase][palabra]`
   - suma 1 a `modelo.totalPalabras[clase]`
   - marca `modelo.vocabulario[palabra] = true`
5. Después del bucle, calcula `modelo.tamVocabulario` con `Object.keys(modelo.vocabulario).length`.
6. Termina con `return modelo;` y **borra** la línea `return pendiente(1, ...)`.

### Pistas

- Contar con un objeto: `conteos[p] = (conteos[p] || 0) + 1;` El `|| 0` cubre la primera vez, cuando la palabra aún no existe.
- `clase` es una variable, así que va **entre corchetes**: `modelo.conteos[clase]`, no `modelo.conteos.clase`.

<details><summary>Pista extra: esqueleto con huecos (ábrelo solo si llevas varios minutos atascado)</summary>

```js
for (const ejemplo of datos) {
  const clase = ejemplo.etiqueta;
  // ... suma 1 a los documentos de esa clase
  for (const palabra of tokenizar(ejemplo.texto)) {
    // ... tres líneas: conteos, totalPalabras y vocabulario
  }
}
// ... calcula tamVocabulario
return modelo;
```

</details>

### Checkpoint (guarda con Ctrl+S, recarga con F5 y pulsa **Ejecutar autocomprobación**)

**Deberías ver:** `6 ✅ · 0 ❌ · 12 ⏳`. Las cuatro líneas **TODO 1 · entrenar** en ✅:

```
✅ Bien · TODO 1 · entrenar · entrenar devuelve un modelo con sus cuatro cuentas
✅ Bien · TODO 1 · entrenar · entrenar cuenta los mensajes y las palabras de cada clase
✅ Bien · TODO 1 · entrenar · entrenar cuenta cuántas veces aparece cada palabra en su clase
✅ Bien · TODO 1 · entrenar · entrenar arma el vocabulario (palabras distintas)
```

La línea final "todo junto" seguirá en ⏳ (necesita también `clasificar`). Si alguna de las cuatro sale ❌, lee la pista debajo: dice qué número obtuviste y cuál era el esperado.

Ahora verifica con los datos reales. En la consola (F12):

| Qué haces | Deberías ver |
|---|---|
| Mirar la página (recarga) | El cuadro amarillo desapareció al cargar; "palabras conocidas" = **347**; 30 de spam y 30 normales. (Si pulsas **Analizar**, el cuadro vuelve a aparecer: ahora dice que falta el TODO 3, y es lo esperado) |
| `estado.modelo.totalPalabras` | `{spam: 364, normal: 328}` |
| `estado.modelo.conteos.spam.gratis` | `6` |

Y tu ejemplo del módulo 05, en la consola (el `const` se pega una vez):

```js
const JUGUETE = [
  { texto: "gana dinero gratis", etiqueta: "spam" },
  { texto: "gana premio ya", etiqueta: "spam" },
  { texto: "hola clase ya", etiqueta: "normal" }
];
```

Pega eso (verás `undefined`) y ejecuta **una por una**:

```js
entrenar(JUGUETE).tamVocabulario
JSON.stringify(entrenar(JUGUETE).totalPalabras)
```

**Deberías ver:** `7` y `'{"spam":6,"normal":3}'`, igual que tu tabla a mano.

**Si no te sale…**

| Síntoma | Qué revisar |
|---|---|
| El cuadro amarillo dice "TODO 1 sin completar" | Quedó la línea `return pendiente(1, ...)`: bórrala (tu `return modelo;` debe ser lo último de la función) |
| ❌ con `conteos.spam.gana salió NaN` | Falta el `\|\| 0` al contar |
| ❌ con `documentos salió {"spam":0,...}` | Olvidaste `modelo.documentos[clase] += 1` |
| ❌ con `totalPalabras salió ...` | Sumaste por mensaje, no por palabra: va **dentro** del bucle de palabras |
| `Cannot read properties of undefined` en la consola | Escribiste `modelo.conteos.clase` en vez de `modelo.conteos[clase]` |
| Nada cambia al recargar | ¿Guardaste (Ctrl+S)? ¿Editaste `modelo.js` de la carpeta principal? Prueba **Ctrl+F5** |

> **Actividad 2 · ¿Qué palabras domina cada clase? (2 min).** Ejecuta en la consola estas dos líneas, y mira qué palabras aparecen. Anota si alguna es una "palabra de relleno" como *la* o *de*.
>
> ```js
> Object.entries(estado.modelo.conteos.normal).sort((a,b)=>b[1]-a[1]).slice(0,8).map(p=>p[0]+" "+p[1]).join(", ")
> Object.entries(estado.modelo.conteos.spam).sort((a,b)=>b[1]-a[1]).slice(0,8).map(p=>p[0]+" "+p[1]).join(", ")
> ```
>
> (Una por una.)

<details><summary>Respuesta</summary>

**Deberías ver:**

- Normal: `'la 25, el 20, de 15, que 6, para 6, con 6, no 5, te 5'`
- Spam: `'tu 20, de 13, en 13, para 9, dinero 7, el 6, gratis 6, un 5'`

Casi todo son **palabras de relleno** (`la`, `el`, `de`, `que`, `para`): son las más frecuentes en cualquier texto. En spam destaca `tu` (el spam le habla al lector) y `dinero`, `gratis`. Más adelante verás por qué las palabras de relleno pesan poco... o a veces demasiado.

</details>

---

## Parte 3 · TODO 2: `logProbPalabra` (7 min)

**Meta:** que `logProbPalabra(palabra, clase, modelo)` devuelva el **logaritmo** de la probabilidad suavizada que calculaste a mano en el módulo 05.

### Pasos

1. Busca `// TODO 2`.
2. Calcula `veces`: cuántas veces apareció la palabra en esa clase (o 0 si nunca).
3. Calcula `total`: palabras totales de esa clase (`modelo.totalPalabras[clase]`).
4. Devuelve `Math.log((veces + 1) / (total + modelo.tamVocabulario))`.
5. **Borra** la línea `return pendiente(2, ...)`.

### Pista

`modelo.conteos[clase][palabra] || 0` te da `veces`.

### Checkpoint (guarda, recarga y pulsa **Ejecutar autocomprobación**)

**Deberías ver:** `8 ✅ · 0 ❌ · 10 ⏳`, con las dos líneas **TODO 2 · logProbPalabra** en ✅. Si fallan, la pista distingue el error más común: "Falta el + 1", "Olvidaste el logaritmo", "Falta sumar modelo.tamVocabulario" o "Usaste Math.log10".

Ahora la comprobación con los datos reales (consola):

| Escribe | Deberías ver (aprox.) |
|---|---|
| `logProbPalabra("gratis", "spam", estado.modelo)` | `-4.620762280747927` (≈ -4.62) |
| `logProbPalabra("gratis", "normal", estado.modelo)` | `-6.51471269087253` (≈ -6.51) |

La diferencia, `-4.62 - (-6.51)`, es **1,89**. Guárdala: es lo que "pesa" *gratis* hacia el lado spam (lo verás como `gratis +1.9`).

**Si no te sale…**

| Síntoma | Qué revisar |
|---|---|
| Sale `-Infinity` | Te falta el `+ 1`: `Math.log(0)` es `-Infinity` |
| Sale `NaN` | `estado.modelo` es `null` o `tamVocabulario` es `undefined`: revisa el TODO 1 |
| Números cercanos pero distintos (por ejemplo, `-4.2`) | Usaste el total de mensajes en vez de `totalPalabras`, o te falta sumar `tamVocabulario` |
| El número es positivo | Olvidaste `Math.log(...)` (devolviste la probabilidad sin logaritmo) |

> **Actividad 3 · La palabra imposible (3 min).** Pide `logProbPalabra("zzzzz", "spam", estado.modelo)`. Nunca vio esa palabra y no da error ni infinito. ¿Qué habría pasado sin el `+ 1`? (Pista: `Math.log(0)`.)

<details><summary>Respuesta</summary>

**Deberías ver:** `-6.566672429803241` (≈ -6.57), un número normal. Sin el `+ 1` el numerador sería 0 y `Math.log(0)` da `-Infinity`: cualquier mensaje con una palabra nueva quedaría con puntaje `-Infinity` en esa clase, y la comparación dejaría de tener sentido.

</details>

---

## Parte 4 · Descanso (5 min)

Levántate. Hasta aquí tu modelo **ya aprendió** (solo guardó cuentas) y sabe calcular qué tan probable es una palabra. En lo que sigue aprende a **decidir**.

---

## Parte 5 · TODO 3: `clasificar` (13 min)

**Meta:** que `clasificar(texto, modelo)` devuelva `{ etiqueta, probSpam, aportes }`.

### Pasos

1. Busca `// TODO 3`. Ya tienes una lista vacía `lista`.
2. Crea los dos puntajes iniciales con la función lista: `logSpam = logPrior("spam", modelo)` y `logNormal = logPrior("normal", modelo)`. (Usa `let`, porque irán cambiando.)
3. Recorre `tokenizar(texto)`. Para cada palabra:
   - si `!modelo.vocabulario[palabra]`, haz `continue` (palabra desconocida: se ignora);
   - calcula `lpSpam` y `lpNormal` con `logProbPalabra`;
   - suma cada uno a su puntaje (`logSpam += lpSpam`, etc.);
   - agrega a `lista`: `{ palabra: palabra, aporte: lpSpam - lpNormal }`.
4. Calcula `probSpam = 1 / (1 + Math.exp(logNormal - logSpam))` (la fórmula del módulo 05).
5. Devuelve `{ etiqueta: probSpam > umbral ? "spam" : "normal", probSpam: probSpam, aportes: agruparAportes(lista) }`.
6. **Borra** la línea `return pendiente(3, ...)`.

### Pistas

- `aporte > 0` significa "esta palabra empuja hacia spam"; `< 0`, "hacia normal".
- `agruparAportes` ya está hecha: une repetidas y ordena de mayor a menor peso.
- Si `probSpam` sale `NaN`, revisa que **sumaste** logaritmos (no multiplicaste) y que usaste `Math.exp`.

<details><summary>Pista extra: esqueleto con huecos (ábrelo solo si llevas varios minutos atascado)</summary>

```js
let logSpam = ...;
let logNormal = ...;
for (const palabra of tokenizar(texto)) {
  if (...) continue;
  const lpSpam = ...;
  const lpNormal = ...;
  logSpam += ...;
  logNormal += ...;
  lista.push({ palabra: palabra, aporte: ... });
}
const probSpam = 1 / (1 + Math.exp( ... ));
return { etiqueta: ..., probSpam: probSpam, aportes: ... };
```

</details>

### Checkpoint 1 · la Autocomprobación

Guarda, recarga y pulsa **Ejecutar autocomprobación**. **Deberías ver:** `16 ✅ · 0 ❌ · 2 ⏳` (lo único que queda pendiente es `evaluar`, el TODO 4). Las siete líneas **TODO 3 · clasificar** y la de "todo junto" en ✅. Cada prueba mira algo concreto:

| Prueba | Qué comprueba |
|---|---|
| devuelve `{ etiqueta, probSpam, aportes }` | La forma del resultado |
| `gana gratis` → SPAM ≈ 84 % | Que tu cálculo coincide con el de papel del módulo 05 |
| `hola clase` → NORMAL ≈ 18 % | Tu Actividad 2 del módulo 05 |
| palabras desconocidas se ignoran | El `continue` del vocabulario |
| aportes sumados y ordenados | `lista.push(...)` y `agruparAportes` |
| el umbral decide la etiqueta | Que usas el parámetro `umbral` |
| `probSpam` entre 0 y 1, incluso con textos larguísimos | Que sumas logaritmos y no multiplicas |

### Checkpoint 2 · la página

Escribe en la caja del panel 1 y pulsa **Analizar**:

| Mensaje | Deberías ver |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, `Probabilidad de spam: 100%`, chips rojos: `gratis +1.9`, `un +1.7`, `premio +1.7`, `clic +1.3` |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, `Probabilidad de spam: 0.6%`, chips: `la -1.7`, `vamos -1.2`, `en +0.8` |
| `Tu banco te regala dinero gratis, confirma tu clave` | **SPAM**, `100%`, chips `tu +3.2`, `dinero +2.0`, `gratis +1.9` |

(La página escribe el decimal con punto, `0.6%`; en el texto de la guía lo escribimos con coma.)

Y tu ejemplo de papel del módulo 05 (usa la constante `JUGUETE` de la Parte 2; si recargaste, vuelve a pegarla):

```js
clasificar("hola clase", entrenar(JUGUETE)).probSpam
clasificar("gana gratis", entrenar(JUGUETE)).probSpam
```

(Una por una.)

**Deberías ver:** `0.18159806295399497` (≈ **0,18**, igual que tu cálculo a mano) y `0.8419083255378859` (≈ **0,84**).

**Si no te sale…**

| Síntoma | Qué revisar |
|---|---|
| Autocomprobación: "salió justo la probabilidad previa (0,6)" | Calculaste `lpSpam`/`lpNormal` pero no los sumaste a `logSpam`/`logNormal` |
| "salió el complemento (1 - 0,842)" | Invertiste la resta: es `Math.exp(logNormal - logSpam)` |
| `probSpam` es `NaN` | Multiplicaste en vez de sumar, o escribiste mal un nombre de variable (`lpspam` en vez de `lpSpam`) |
| Probabilidades extremas siempre (0 o 1) | Usaste `Math.log10` con `Math.exp`: solo `Math.log` combina con `Math.exp` |
| Todo da casi 50 % | No sumaste `logProbPalabra`, o olvidaste el `logPrior` |
| ❌ "los aportes ... deberían ser 3" | Falta el `lista.push(...)` dentro del bucle |
| Sigue el cuadro amarillo | Queda la línea `return pendiente(3, ...)` |

> **Actividad 4 · Lado a lado (3 min).** Con el mensaje `Ganaste un premio gratis, haz clic en el enlace` ya en la caja, baja al panel **5. Comparar**. ¿Qué dicen las reglas? ¿Y tu modelo? Prueba ahora con `Hola, ¿vamos a estudiar mañana en la biblioteca?`.

<details><summary>Respuesta</summary>

**Deberías ver:** en los dos mensajes, **reglas y modelo coinciden**: el primero es SPAM para ambos (reglas: `Puntaje: 11`; modelo: 100 %) y el segundo NORMAL para ambos (reglas: `Puntaje: -4`; modelo: 0.6 %). Lo interesante es *cómo* llegan: las reglas muestran las palabras que sumaron o restaron puntos; el modelo muestra sus chips con los aportes aprendidos.

Prueba también `gratis` solo: las reglas dicen NORMAL (puntaje 2, bajo el umbral de 3) y el modelo dice SPAM (86.9 %). Primer desacuerdo entre los dos filtros.

</details>

---

## Parte 6 · TODO 4: `evaluar` (10 min)

**Meta:** medir a tu detective con mensajes que **nunca vio** (`PRUEBA`). Aquí "spam" es la clase **positiva**.

### Pasos

1. Busca `// TODO 4`. Ya tienes los contadores `vp`, `fp`, `vn`, `fn` en 0 y la lista `errores`.
2. Por cada ejemplo de `prueba`: `const res = clasificar(ejemplo.texto, modelo);`.
3. Compara `ejemplo.etiqueta` (la real) con `res.etiqueta` (la predicha) y suma a **uno** de los cuatro contadores:

| Real | Predijo | Contador | Significa |
|---|---|---|---|
| spam | spam | `vp` | Verdadero positivo: spam atrapado |
| normal | spam | `fp` | **Falso positivo:** mensaje bueno enviado al spam |
| normal | normal | `vn` | Verdadero negativo: normal bien |
| spam | normal | `fn` | **Falso negativo:** spam que se coló |

4. Si `res.etiqueta !== ejemplo.etiqueta`, agrega a `errores`: `{ texto: ejemplo.texto, esperada: ejemplo.etiqueta, predicha: res.etiqueta, probSpam: res.probSpam }`.
5. Al final: `total = prueba.length`, `exactitud = (vp + vn) / total`.
6. Devuelve `{ exactitud, vp, fp, vn, fn, total, errores }` y **borra** `return pendiente(4, ...)`.

### Checkpoint 1 · la Autocomprobación

Guarda, recarga y pulsa **Ejecutar autocomprobación**. **Deberías ver:** `18 ✅ · 0 ❌ · 0 ⏳` y el mensaje "¡Todo en ✅! Tu modelo pasó todas las pruebas." Para probar `evaluar` sin depender de tu `clasificar`, la autocomprobación usa un "detective de mentira" que responde cosas conocidas sobre un examen de 5 mensajes:

| Mensaje | Real | El detective de mentira dice | Cuenta como |
|---|---|---|---|
| premio gratis | spam | spam | vp |
| gana dinero | spam | spam | vp |
| hola clase | normal | normal | vn |
| clase gratis | normal | spam | fp |
| premio escondido | spam | normal | fn |

Resultado esperado de tu `evaluar`: `vp = 2, fp = 1, vn = 1, fn = 1`, `total = 5`, `exactitud = 0.6` y 2 errores.

### Checkpoint 2 · la página

Pulsa **Tomar el examen**. **Deberías ver:**

| Medida | Valor |
|---|---|
| Exactitud | **90%** (`18 aciertos de 20`) |
| vp / fn | 9 / 1 |
| fp / vn | 1 / 9 |
| Errores | Dos líneas: `Era spam, dijo normal (prob. spam: 41%)` (el de **Camila**) y `Era normal, dijo spam (prob. spam: 54%)` (el de la **tarjeta del banco**) |

**Si no te sale…**

| Síntoma | Qué revisar |
|---|---|
| Autocomprobación: "Salió vp=2 fp=0 vn=1 fn=2" | `fp` y `fn` invertidos. Positivo = **spam**, la clase que buscamos |
| ❌ "exactitud salió 60" | Multiplicaste por 100: la exactitud es un número entre 0 y 1 (la página la convierte en %) |
| ❌ "errores tiene 0 elementos" | Falta el `errores.push({...})` |
| La página dice "evaluar debe devolver ..." | Falta el `return { exactitud, vp, fp, vn, fn, total, errores };` o quedó la línea `pendiente(4, ...)` |
| Exactitud 100 % | Entrenaste con `PRUEBA` o le enseñaste mensajes del examen: pulsa **Restaurar datos originales** |

> **Actividad 5 · Tu primera nota (2 min).** Anota tu exactitud. Mira la matriz: ¿cuál de los dos errores te parece más grave? Escribe una frase con tu razón. Lo profundizarás en el [módulo 07](./07-evaluacion-honesta.md).

<details><summary>Respuesta</summary>

Tu nota debería ser **90 %**. No hay una respuesta única sobre cuál error es más grave: depende de quién eres. Perder el aviso de la tarjeta (un **falso positivo**, mensaje bueno al spam) molesta a una persona que espera algo importante; dejar pasar a Camila (un **falso negativo**, spam que se coló) expone a alguien a una captación engañosa. Lo importante es que justifiques con consecuencias concretas.

</details>

---

## Parte 7 · Explicar decisiones, enseñar y comparar (10 min)

Tu detective ya funciona. Ahora usa la página para entender **por qué** decide lo que decide.

### 7.1 · Mira los chips

1. Analiza `Tu banco te regala dinero gratis, confirma tu clave`. La palabra `tu` pesa más (`+3.2`) que `dinero` (`+2.0`). ¿Por qué? Mira el conteo en la consola:

   ```js
   estado.modelo.conteos.spam.tu + " / " + estado.modelo.conteos.normal.tu
   ```

   **Deberías ver:** `'20 / 3'`. `tu` aparece 20 veces en spam y solo 3 en normales: el spam le habla al lector.

2. Analiza solo `gratis`: **Probabilidad de spam: 86.9%**. Y `xyzzy qwerty` (palabras que nunca vio): **50%**, decide NORMAL "por beneficio de la duda" y la página avisa que no conoce ninguna palabra.

### 7.2 · Enséñale al detective

1. Escribe: `Hola, soy Camila de recursos humanos, tengo una vacante para ti, escríbeme al privado`.
2. Pulsa **Analizar**: **41%**, NORMAL. Es un spam disfrazado, y se coló.
3. Pulsa **Es SPAM**. **Deberías ver:** el aviso "Listo: lo guardé como SPAM. Ya llevas 1 ejemplo(s) tuyo(s)..." y la probabilidad sube a **99.7%**. No tocaste una línea de código: **solo cambió el dato**. Eso es aprender.
4. **Pulsa "Restaurar datos originales"** antes de seguir. (Ese mensaje está en el examen: lo que hiciste se llama *fuga de datos* y lo verás en el módulo 07.)

### 7.3 · Reglas contra aprendido

Pulsa **Comparar en el examen** en el panel 5. **Deberías ver:**

| Filtro | Exactitud | Detalle |
|---|---|---|
| Reglas a mano | **80%** | `16 aciertos de 20 · spam atrapado 6, spam colado 4, normal bloqueado 0, normal bien 10` |
| Modelo aprendido | **90%** | `18 aciertos de 20 · spam atrapado 9, spam colado 1, normal bloqueado 1, normal bien 9` |

Y una lista de **4 mensajes** donde no están de acuerdo (3 los acierta tu modelo; 1 lo aciertan las reglas).

> **Actividad 6 · Quién gana y por qué (5 min).** Mira la lista de desacuerdos. Escribe: (1) ¿qué mensajes acierta el modelo y no las reglas? ¿Qué palabras le sirvieron? (2) ¿Cuál acierta la regla y no el modelo? ¿Por qué crees que el modelo se equivoca ahí? (3) ¿Dirías que el modelo es "mejor", o solo "distinto"?

<details><summary>Respuesta</summary>

1. El modelo acierta **tres spam** que las reglas dejaron pasar: *Tu paquete está retenido...*, *Última oportunidad...* y *Reunión urgente...*. Las reglas no tenían esas palabras; el modelo aprendió de los ejemplos de entrenamiento palabras como `tu`, `enlace` o `casa`, que acompañan al spam.
2. Las reglas aciertan el de la **tarjeta del banco** (un mensaje normal): suma solo 2 por `gratis` (umbral 3) y queda NORMAL; el modelo lo marca SPAM por palabras como `tu`, `banco` y `gratis`, típicas del spam de entrenamiento.
3. **Distinto**: cada uno falla en casos diferentes. El modelo gana en este examen, pero eso no significa que sea mejor en todo.

</details>

---

## Parte 8 · Cierre (5 min)

### Checkpoints finales: ¿cumpliste el módulo?

- [ ] Autocomprobación: `18 ✅ · 0 ❌ · 0 ⏳`.
- [ ] "Palabras conocidas" = 347 (30 spam, 30 normales).
- [ ] `estado.modelo.totalPalabras` → `{spam: 364, normal: 328}`.
- [ ] `logProbPalabra("gratis", "spam", estado.modelo)` → ≈ `-4.62`.
- [ ] `Hola, ¿vamos a estudiar mañana en la biblioteca?` → NORMAL, 0.6%.
- [ ] Examen → 90%, vp 9, fn 1, fp 1, vn 9.
- [ ] Comparar: reglas 80%, aprendido 90%.

**Guarda tu progreso:** copia `modelo.js` como `modelo.completo.js` (o haz tu `git commit`; ver [cómo guardar tu progreso](../TALLER_LARGO.md#3-cómo-guardar-tu-progreso)). Lo necesitarás en los módulos 07 y 08.

### Si no te sale… (errores comunes)

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| El cuadro amarillo no desaparece | Sigue la línea `return pendiente(...)` o no recargaste | Borra esa línea, guarda y presiona **F5** |
| `NaN` en los conteos o probabilidades | Olvidaste el `\|\| 0` al contar | La primera vez la palabra no existe: `undefined + 1` es `NaN` |
| `Cannot read properties of undefined` | Escribiste `modelo.conteos.clase` en vez de `modelo.conteos[clase]` | Si la clase está en una variable, va entre corchetes |
| Probabilidades enormes o siempre 0 o 1 | Multiplicaste en vez de sumar logs, o usaste `Math.log10` con `Math.exp` | Solo `Math.log` combina con `Math.exp` |
| Todo da casi 50 % | No sumaste `logProbPalabra`, o olvidaste `tamVocabulario` | Revisa el paso 3 de la Parte 5 |
| `fp` y `fn` invertidos | Confundiste "positivo" con "bueno" | Positivo = **spam**, la clase que buscamos |
| Exactitud 100 % | Le enseñaste mensajes del examen, o entrenaste con `PRUEBA` | Pulsa **Restaurar datos originales** |
| Editas y la página no cambia | Editaste `soluciones/` o el navegador guardó caché | Edita `modelo.js` de la carpeta principal y pulsa **Ctrl+F5** |
| Error de sintaxis (todo deja de funcionar) | Falta un `}` o una coma | Mira la consola (**F12**): dice la línea |
| La pestaña se congela | Un bucle sin fin (por ejemplo, un `while` que nunca termina) | Cierra la pestaña, reabre `index.html` y corrige el bucle |

> **Si te atascas:** la solución completa está en `soluciones/modelo.solucion.js`. Intenta primero; si llevas más de 10 minutos en un TODO y ya probaste pistas y autocomprobación, **mira solo la función que te falta**, entiéndela, cierra el archivo y escríbela tú con tus palabras. Para seguir con el taller sin perder el avance, también puedes copiar la solución completa sobre `modelo.js` (guarda antes tu intento con otro nombre) y volver a los TODO más tarde.

### Quiz final (responde primero, despliega después)

**1. ¿Qué "sabe" exactamente tu modelo después de `entrenar`?**

<details><summary>Respuesta</summary>

Solo **conteos de palabras por clase** (y cuántos mensajes y palabras hay por clase). No entiende el significado.

</details>

**2. ¿Por qué ignoramos las palabras que no están en el vocabulario?**

<details><summary>Respuesta</summary>

Porque no hay conteos suficientes para esa palabra: ignorarla es lo más neutro (no empuja hacia ningún lado).

</details>

**3. ¿Qué mide el `aporte` de una palabra y qué significa que sea negativo?**

<details><summary>Respuesta</summary>

Cuánto empuja esa palabra hacia spam (`lpSpam - lpNormal`). Positivo: hacia spam. Negativo: hacia normal.

</details>

**4. ¿Por qué `evaluar` usa datos distintos de los de entrenamiento?**

<details><summary>Respuesta</summary>

Para medir con datos nuevos y no con lo memorizado. Con los mismos datos de entrenamiento la nota sale inflada.

</details>

**5. Si `clasificar("hola clase", entrenar(JUGUETE)).probSpam` da 0.82 en vez de 0.18, ¿qué error cometiste?**

<details><summary>Respuesta</summary>

Intercambiaste spam y normal: probablemente `Math.exp(logSpam - logNormal)` en vez de `Math.exp(logNormal - logSpam)`. 0.82 ≈ 1 − 0.18.

</details>

**6. ¿Qué pasa con los chips de un mensaje si cambias los datos de entrenamiento (por ejemplo, pulsas "Es SPAM")?**

<details><summary>Respuesta</summary>

Cambian, porque los conteos cambian. No tocaste el código: el comportamiento depende de los datos.

</details>

### Resumen en 5 líneas

1. Un `modelo` es solo conteos: `conteos`, `totalPalabras`, `documentos`, `vocabulario`.
2. `entrenar` cuenta; `logProbPalabra` calcula el log de la probabilidad suavizada.
3. `clasificar` suma logs, convierte la diferencia en `probSpam` y decide con el umbral.
4. `evaluar` cuenta aciertos y errores (matriz de confusión) en datos que el modelo no vio.
5. Si cambias los datos, cambia la decisión sin tocar el código; la Autocomprobación te confirma qué pieza funciona.

**Siguiente paso:** [Módulo 07 · Evaluación honesta](./07-evaluacion-honesta.md).
