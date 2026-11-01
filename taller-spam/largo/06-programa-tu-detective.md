# Módulo 06 · Programa tu detective

> **Curso:** Detective de mensajes ([índice del taller largo](../TALLER_LARGO.md)) · **Duración:** 75 min · **Anterior:** [Módulo 05](./05-naive-bayes.md) · **Siguiente:** [Módulo 07](./07-evaluacion-honesta.md) · **Glosario:** [00-glosario.md](./00-glosario.md)

## Antes de empezar

**Recuerda del módulo anterior (Naive Bayes):**

- **Entrenar** = contar cuántas veces aparece cada palabra en cada clase.
- **Probabilidad de una palabra** = (veces + 1) ÷ (palabras de la clase + vocabulario). El `+1` es el suavizado de Laplace.
- **Clasificar** = sumar logaritmos de esas probabilidades (más la probabilidad previa de cada clase) y comparar.
- Con el ejemplo de 3 mensajes, `gana gratis` daba 0,84 de probabilidad de spam y `hola clase`, 0,18.

Si llegas solo con este módulo, lee la sección "Resumen" del [módulo 05](./05-naive-bayes.md): te basta con esas cinco ideas. Y necesitas saber leer JavaScript básico (variables, `for`, funciones, objetos); aquí te lo vamos recordando.

Hoy completas **4 piezas de código** (los TODO) en `modelo.js`. Después de cada una, guardas, recargas y **verificas** con un checkpoint.

## Objetivos

- [ ] Completar `entrenar` (TODO 1): contar palabras por clase.
- [ ] Completar `logProbPalabra` (TODO 2): el suavizado de Laplace con logaritmo.
- [ ] Completar `clasificar` (TODO 3): sumar logaritmos y dar el veredicto.
- [ ] Completar `evaluar` (TODO 4): el examen con matriz de confusión.
- [ ] Comparar tu detective con el filtro por reglas del [módulo 03](./03-texto-y-reglas.md).

## Mapa de tiempos

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Prepara el taller y recorre el código | 15 |
| 2 | TODO 1 · `entrenar` | 12 |
| 3 | TODO 2 · `logProbPalabra` | 8 |
| 4 | Descanso | 5 |
| 5 | TODO 3 · `clasificar` | 15 |
| 6 | TODO 4 · `evaluar` | 10 |
| 7 | Explicar decisiones, enseñar y comparar | 10 |
| | **Total** | **75** |

> **Regla de oro:** en cada TODO, **guarda el archivo** (`Ctrl+S`) y **recarga `index.html` con F5**. Si algo falla, la página te muestra un cuadro amarillo con la pista. Léelo: casi siempre dice qué falta.

---

## Parte 1 · Prepara el taller y recorre el código (15 min)

### Paso 1.1 · Abre la página

Haz doble clic en `index.html`. Verás:

- Un cuadro amarillo: "Aún falta completar una parte del código" (normal, aún no hay TODO hechos).
- Arriba, "ejemplos de spam" en **30** y "ejemplos normales" en **30**.
- Abajo, el panel **5. Comparar: reglas vs aprendido**: si escribes un mensaje y pulsas **Analizar**, el lado de las **reglas ya funciona** y el del modelo avisa que no está listo.

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

> **Actividad 1 · Lee antes de escribir (5 min, en parejas).** Lean los comentarios de los 4 TODO en `modelo.js`. Cada pareja explica a la otra, **con sus palabras**, qué hace cada una de las 4 funciones. Si no pueden explicarlo, no empiecen a programar todavía.

**Checkpoint · deberías ver:** la página abre con el cuadro amarillo y 30/30 en los conteos.

---

## Parte 2 · TODO 1: `entrenar` (12 min)

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

### Checkpoint (guarda, recarga con F5 y abre la consola con F12)

| Qué haces | Deberías ver |
|---|---|
| Mirar la página | El cuadro amarillo desapareció; "palabras conocidas" = **347**; 30 de spam y 30 normales |
| `estado.modelo.totalPalabras` | `{spam: 364, normal: 328}` |
| `estado.modelo.conteos.spam.gratis` | `6` |
| `entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}])` | Tu ejemplo del módulo 05: `tamVocabulario` = **7**, `totalPalabras` = `{spam: 6, normal: 3}` |

> **Actividad 2 · ¿Qué palabras domina cada clase? (2 min).** Ejecuta en la consola:
> `Object.entries(estado.modelo.conteos.normal).sort((a,b)=>b[1]-a[1]).slice(0,8)` y lo mismo con `.spam`. ¿Qué palabras aparecen? ¿Te sorprenden? (Anota si alguna es una "palabra de relleno" como *la* o *de*.)

---

## Parte 3 · TODO 2: `logProbPalabra` (8 min)

**Meta:** que `logProbPalabra(palabra, clase, modelo)` devuelva el **logaritmo** de la probabilidad suavizada que calculaste a mano en el módulo 05.

### Pasos

1. Busca `// TODO 2`.
2. Calcula `veces`: cuántas veces apareció la palabra en esa clase (o 0 si nunca).
3. Calcula `total`: palabras totales de esa clase (`modelo.totalPalabras[clase]`).
4. Devuelve `Math.log((veces + 1) / (total + modelo.tamVocabulario))`.
5. **Borra** la línea `return pendiente(2, ...)`.

### Pista

`modelo.conteos[clase][palabra] || 0` te da `veces`.

### Checkpoint (consola)

| Escribe | Deberías ver (aprox.) |
|---|---|
| `logProbPalabra("gratis", "spam", estado.modelo)` | `-4.62` |
| `logProbPalabra("gratis", "normal", estado.modelo)` | `-6.51` |

La diferencia, `-4.62 - (-6.51)`, es **1,89**. Guárdala: es lo que "pesa" *gratis* hacia el lado spam (lo verás como `gratis +1.9`).

> **Actividad 3 · La palabra imposible (3 min).** Pide `logProbPalabra("zzzzz", "spam", estado.modelo)`. Nunca vio esa palabra y no da error ni infinito (da `-6.57`). ¿Qué habría pasado sin el `+ 1`? (Pista: `Math.log(0)`.)

---

## Parte 4 · Descanso (5 min)

Levántate. Hasta aquí tu modelo **ya aprendió** (solo guardó cuentas) y sabe calcular qué tan probable es una palabra. En lo que sigue aprende a **decidir**.

---

## Parte 5 · TODO 3: `clasificar` (15 min)

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

### Checkpoint

Escribe en la caja de la página y pulsa **Analizar**:

| Mensaje | Deberías ver |
|---|---|
| `Ganaste un premio gratis, haz clic en el enlace` | **SPAM**, 100 %, chips rojos: `gratis +1.9`, `un +1.7`, `premio +1.7`, `clic +1.3` |
| `Hola, ¿vamos a estudiar mañana en la biblioteca?` | **NORMAL**, 0,6 %, chips verdes como `la -1.7`, `vamos -1.2` |
| `Tu banco te regala dinero gratis, confirma tu clave` | **SPAM**, 100 % |

Y en la consola, tu ejemplo de papel del módulo 05:

```js
clasificar("hola clase", entrenar([{texto:"gana dinero gratis",etiqueta:"spam"},{texto:"gana premio ya",etiqueta:"spam"},{texto:"hola clase ya",etiqueta:"normal"}]))
```

**Checkpoint · deberías ver:** `probSpam` ≈ **0,18** y etiqueta `"normal"`, igual que tu cálculo a mano.

> **Actividad 4 · Lado a lado (3 min).** Con el mensaje `Ganaste un premio gratis, haz clic en el enlace` ya en la caja, baja al panel **5. Comparar**. ¿Qué dicen las reglas? ¿Y tu modelo? Prueba ahora con `Hola, ¿vamos a estudiar mañana en la biblioteca?`.

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

### Checkpoint

Pulsa **Tomar el examen**. Deberías ver:

| Medida | Valor |
|---|---|
| Exactitud | **90 %** (18 de 20) |
| vp / fn | 9 / 1 |
| fp / vn | 1 / 9 |
| Errores | Un spam que se coló (el de **Camila**, 41 %) y un mensaje normal bloqueado (el de la **tarjeta del banco**, 53,8 %) |

> **Actividad 5 · Tu primera nota (2 min).** Anota tu exactitud. Mira también la matriz: ¿cuál de los dos errores te parece más grave? Lo discutiremos en el [módulo 07](./07-evaluacion-honesta.md).

---

## Parte 7 · Explicar decisiones, enseñar y comparar (10 min)

Tu detective ya funciona. Ahora usa la página para entender **por qué** decide lo que decide.

### 7.1 · Mira los chips

1. Analiza `Tu banco te regala dinero gratis, confirma tu clave`. La palabra `tu` pesa más (`+3.2`) que `dinero` (`+2.0`). ¿Por qué? (Mira el conteo: `estado.modelo.conteos.spam.tu` y `estado.modelo.conteos.normal.tu`; da 20 y 3.)
2. Analiza solo `gratis`: **86,9 %** de spam. Y `xyzzy qwerty` (palabras que nunca vio): **50 %**, decide NORMAL "por beneficio de la duda" y la página avisa que no conoce ninguna palabra.

### 7.2 · Enséñale al detective

1. Escribe: `Hola, soy Camila de recursos humanos, tengo una vacante para ti, escríbeme al privado`.
2. Pulsa **Analizar**: **41 %**, NORMAL. Es un spam disfrazado, y se coló.
3. Pulsa **Es SPAM**. Ahora sube a **99,7 %**. No tocaste una línea de código: **solo cambió el dato**. Eso es aprender.
4. **Pulsa "Restaurar datos originales"** antes de seguir. (Ese mensaje está en el examen: lo que hiciste se llama *fuga de datos* y lo verás en el módulo 07.)

### 7.3 · Reglas contra aprendido

Pulsa **Comparar en el examen** en el panel 5. Deberías ver:

| Filtro | Exactitud |
|---|---|
| Reglas a mano | **80 %** |
| Modelo aprendido | **90 %** |

Y una lista de **4 mensajes** donde no están de acuerdo (3 los acierta tu modelo; 1 lo aciertan las reglas).

> **Actividad 6 · Quién gana y por qué (5 min, en parejas).** Miren la lista de desacuerdos. Respondan: (1) ¿qué mensajes acierta el modelo y no las reglas? ¿Qué palabras le sirvieron? (2) ¿Cuál acierta la regla y no el modelo? ¿Por qué crees que el modelo se equivoca ahí? (3) ¿Dirías que el modelo es "mejor", o solo "distinto"?

---

## Checkpoints finales

- [ ] "Palabras conocidas" = 347 (30 spam, 30 normales).
- [ ] `estado.modelo.totalPalabras` → `{spam: 364, normal: 328}`.
- [ ] `logProbPalabra("gratis", "spam", estado.modelo)` → ≈ `-4.62`.
- [ ] `Hola, ¿vamos a estudiar mañana en la biblioteca?` → NORMAL, 0,6 %.
- [ ] Examen → 90 %, vp 9, fn 1, fp 1, vn 9.
- [ ] Comparar: reglas 80 %, aprendido 90 %.

## Errores comunes

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

> **Si te atascas:** la solución completa está en `soluciones/modelo.solucion.js`. Intenta primero; si llevas más de 10 minutos en un TODO, **mira solo la función que te falta**, entiéndela y escríbela tú con tus palabras.

## Resumen

- Un `modelo` es solo conteos: `conteos`, `totalPalabras`, `documentos`, `vocabulario`.
- `entrenar` cuenta; `logProbPalabra` calcula el log de la probabilidad suavizada; `clasificar` suma logs y compara; `evaluar` cuenta aciertos y errores en datos que no vio.
- Los **aportes** de cada palabra explican la decisión.
- Si cambias los datos, cambia la decisión sin tocar el código.

## Preguntas de cierre

1. ¿Qué "sabe" exactamente tu modelo después de `entrenar`?
2. ¿Por qué ignoramos las palabras que no están en el vocabulario?
3. ¿Qué mide el `aporte` de una palabra y qué significa que sea negativo?
4. ¿Por qué `evaluar` usa datos distintos de los de entrenamiento?

**Siguiente paso:** [Módulo 07 · Evaluación honesta](./07-evaluacion-honesta.md).
