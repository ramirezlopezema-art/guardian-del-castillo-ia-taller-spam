# Módulo 02 · Redes neuronales y cómo aprende una máquina

> **Tiempo de estudio:** 70 min · **Anterior:** [Módulo 01](./01-que-es-la-ia.md) · **Siguiente:** [Módulo 03](./03-texto-y-reglas.md) · **Glosario:** [00-glosario.md](./00-glosario.md) · **Ayuda y consola:** [TALLER_LARGO.md](../TALLER_LARGO.md#cómo-estudiar-esto-solo)

**Meta de este módulo:** entender cómo decide una neurona artificial, programar una en la consola del navegador y **verla aprender** sus propios pesos.

## Antes de empezar: ¿estás listo?

Si vienes del módulo 01, esto será un repaso rápido. Si llegas directo aquí, basta con que sepas esta idea: *una máquina puede aprender sus reglas a partir de ejemplos que ya traen su respuesta*.

**1. En Machine Learning, ¿qué le das a la máquina y qué obtienes?**

<details><summary>Respuesta</summary>

Le das **datos + respuestas** (ejemplos con su etiqueta) y obtienes las **reglas**: el *modelo*.

</details>

**2. ¿Qué es una etiqueta?**

<details><summary>Respuesta</summary>

La respuesta correcta de un ejemplo, puesta por una persona. En el taller: `"spam"` o `"normal"`.

</details>

**3. ¿Cómo abres la consola del navegador?**

<details><summary>Respuesta</summary>

Abres `index.html`, pulsas **F12** y haces clic en la pestaña **Consola**. Pasos detallados: [Cómo abrir la consola](../TALLER_LARGO.md#4-cómo-abrir-la-consola-del-navegador-f12). **Léelos ahora si es tu primera vez**: este módulo usa mucho la consola.

</details>

## Objetivos

- [ ] Explicar qué hace una **neurona artificial**: entradas × pesos, suma, decisión.
- [ ] Programar y modificar una neurona en la consola.
- [ ] Ver cómo **aprende** una neurona: ajusta sus pesos cuando se equivoca.
- [ ] Explicar qué es una red de muchas neuronas y qué significa "profundo".
- [ ] Explicar por qué el **dato** es el combustible y por qué se separa entrenamiento y prueba.

## Mapa de tiempos (estudio estimado)

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Una neurona: decidir con pesos | 10 |
| 2 | La neurona en la consola | 15 |
| 3 | Una neurona que detecta spam | 10 |
| 4 | Descanso | 5 |
| 5 | Muchas neuronas: una red | 10 |
| 6 | Entrenar: aprender los pesos | 10 |
| 7 | Los datos: el combustible | 5 |
| 8 | Cierre: quiz y resumen | 5 |
| | **Total** | **70** |

---

## Parte 1 · Una neurona: decidir con pesos (10 min)

Una **red neuronal artificial** es un programa inspirado (de muy lejos) en el cerebro. Está hecha de muchas piezas pequeñas llamadas **neuronas**. No hay nada mágico: **es matemática con sumas y multiplicaciones**.

Una neurona recibe **números**, multiplica cada uno por un **peso** (qué tan importante es), los suma y decide.

```
 ¿Voy al cine?

 Entradas                Pesos (importancia)
 amigos van       (1) ──×  +3 ──┐
 tengo tarea      (1) ──×  -2 ──┼──►  SUMA = 3 − 2 − 0 = 1  ──►  ¿SUMA > 0?  ──►  SÍ voy
 está lloviendo   (0) ──×  -1 ──┘
```

- Una entrada con valor **1** significa "sí pasa" y con **0**, "no pasa".
- Un **peso grande y positivo** dice: "esto importa y empuja hacia el sí".
- Un **peso negativo** dice: "esto empuja hacia el no".

> **Analogía:** piensa en una balanza. Cada dato pone una pesa a favor o en contra. Si al final la balanza se inclina a favor (suma mayor que 0), la neurona dice "sí".

Los **pesos** son lo que la neurona "sabe". Cambiar los pesos es cambiar lo que sabe.

> **Actividad 1 · A mano (5 min, con lápiz y papel).** Con los pesos `+3, -2, -1`, calcula la suma y la decisión para:
> - (a) van amigos, hay tarea, **sí** llueve → `1, 1, 1`
> - (b) **no** van amigos, **no** hay tarea, llueve → `0, 0, 1`
> - (c) van amigos, no hay tarea, no llueve → `1, 0, 0`
>
> Recuerda: la neurona dice "sí" solo si la suma es **mayor que 0** (0 no cuenta).

<details><summary>Respuesta</summary>

- (a) 3 − 2 − 1 = **0**. No es mayor que 0: **no**.
- (b) 0 + 0 − 1 = **−1**: **no**.
- (c) 3 + 0 + 0 = **3**: **sí**.

Luego lo comprobarás en la consola: debería darte `no`, `no`, `sí`. Si en (a) respondiste "sí", repasa: "mayor que 0" no incluye al 0.

</details>

---

## Parte 2 · La neurona en la consola (15 min)

1. Abre `index.html` con doble clic.
2. Pulsa **F12** y entra a la pestaña **Consola**.
3. Pega el siguiente código y pulsa **Enter**:

```js
function neurona(entradas, pesos, sesgo) {
  let suma = sesgo;
  for (let i = 0; i < entradas.length; i++) suma += entradas[i] * pesos[i];
  return suma > 0 ? "sí" : "no";
}
const pesosCine = [3, -2, -1];   // amigos, tarea, lluvia
```

**Deberías ver:** `undefined` (así responde la consola cuando solo declaras cosas). No hay error en rojo.

4. Ahora pega estas líneas, **una por una**, y compara con el resultado:

```js
neurona([1, 1, 0], pesosCine, 0)   // "sí": van amigos, hay tarea, no llueve
neurona([0, 1, 1], pesosCine, 0)   // "no": no van amigos, hay tarea y llueve
neurona([1, 1, 1], pesosCine, 0)   // "no": la suma da 0, y no es mayor que 0
```

**Deberías ver, en este orden:** `'sí'`, `'no'`, `'no'` (la consola los muestra con comillas simples).

**Si no te sale…**

- `neurona is not defined`: recargaste la página o pegaste el bloque en otra pestaña. Vuelve a pegar el primer bloque.
- `Identifier 'pesosCine' has already been declared`: pegaste el primer bloque dos veces. Recarga con **F5** y pégalo una vez.
- `Invalid or unexpected token`: las comillas se volvieron "curvas" al copiar. Escribe tú las comillas con el teclado.

### ¿Qué es el tercer parámetro, el `sesgo`?

Es un número fijo que se suma antes de decidir. Mueve el "punto de corte". Con `sesgo = 1`, la tercera línea daría `"sí"`, porque la suma pasaría de 0 a 1.

```js
neurona([1, 1, 1], pesosCine, 1)   // "sí": el sesgo inclina un poco la balanza
```

**Deberías ver:** `'sí'`.

> **Ojo con el nombre:** este "sesgo" (en inglés *bias*) es un número dentro de la neurona. **No** es lo mismo que el *sesgo injusto* de un sistema que discrimina; de ese hablaremos en el [módulo 08](./08-sesgo-etica-proyecto.md).

> **Actividad 2 · Cambia lo que sabe (6 min).** En la consola escribe una nueva lista de pesos, por ejemplo `const pesosCine2 = [1, -5, 0]`, y úsala en `neurona(...)`. Antes de abrir la respuesta, intenta contestar:
> 1. ¿Con qué pesos la neurona **nunca** va al cine si hay tarea?
> 2. ¿Con qué pesos va al cine **aunque llueva**?
> 3. ¿Qué pasó con lo que "sabe" la neurona cuando cambiaste los pesos?

<details><summary>Respuesta</summary>

Con `pesosCine2 = [1, -5, 0]` y sesgo 0:

1. El peso de la tarea es **−5**, mucho más grande (en valor) que el +1 de los amigos: `neurona([1, 1, 0], pesosCine2, 0)` da `'no'` (1 − 5 = −4). Con un peso negativo muy grande, "hay tarea" gana siempre.
2. El peso de la lluvia es **0**: no empuja ni a favor ni en contra. `neurona([1, 0, 1], pesosCine2, 0)` da `'sí'` (1 + 0 + 0 = 1), llueva o no.
3. Cambió lo que sabe: **antes** pesaba mucho a los amigos y poco a la lluvia; **ahora** la tarea manda. Mismas entradas, otra decisión. Los pesos son la memoria de la neurona.

Tus números pueden ser otros: lo importante es que el peso de la tarea sea claramente negativo y mayor en valor absoluto que los positivos.

</details>

---

## Parte 3 · Una neurona que detecta spam (10 min)

Usemos la misma neurona para algo del taller. Las entradas serán **tres pistas** de un mensaje: ¿dice "gratis"?, ¿trae un enlace?, ¿lo manda un amigo?

```js
// entradas: [dice "gratis", trae un enlace, lo manda un amigo]
const pesosSpam = [2, 2, -3];
```

Pega esa línea (verás `undefined`) y luego ejecuta estas tres **una por una**:

```js
neurona([1, 1, 0], pesosSpam, -1)   // "sí" es spam: gratis + enlace de un desconocido
neurona([0, 1, 1], pesosSpam, -1)   // "no": trae enlace, pero lo manda un amigo
neurona([0, 0, 0], pesosSpam, -1)   // "no": no pasa nada raro
```

**Deberías ver:** `'sí'`, `'no'`, `'no'`. (La primera suma da 2 + 2 + 0 − 1 = 3.)

Fíjate: el peso de "lo manda un amigo" es **negativo** (`-3`). Empuja hacia "no es spam". Es la misma idea que usará tu detective más adelante: cada palabra empuja hacia un lado.

> **Actividad 3 · Diseña tu neurona (7 min).** Inventa una cuarta pista (por ejemplo, "tiene muchos signos de exclamación") y decide su peso. Escribe **dos mensajes** y la lista de entradas de cada uno (4 números): uno que tu neurona marque como spam y uno que no. Pruébalos en la consola con tus nuevos pesos.

<details><summary>Respuesta</summary>

No hay una única solución. Un ejemplo que funciona:

```js
const pesosSpam4 = [2, 2, -3, 1];   // gratis, enlace, amigo, muchos signos de exclamación
neurona([1, 0, 0, 1], pesosSpam4, -1)   // "sí": gratis + exclamaciones (2 + 1 - 1 = 2)
neurona([0, 0, 1, 0], pesosSpam4, -1)   // "no": lo manda un amigo (-3 - 1 = -4)
```

**Rúbrica para revisar tu respuesta:** (1) tu lista de entradas tiene 4 números, todos 0 o 1; (2) el mensaje "spam" suma más que 0 y el otro no; (3) el peso nuevo tiene sentido (una pista de spam, positivo; una pista de mensaje confiable, negativo).

</details>

---

## Parte 4 · Descanso (5 min)

Levántate, toma agua. Hasta aquí: una neurona **decide** con pesos que **tú** escribiste. Lo que sigue es lo importante: que la máquina **encuentre los pesos sola**.

---

## Parte 5 · Muchas neuronas: una red (10 min)

Una neurona sola es muy limitada. Si conectas muchas, en capas, obtienes una **red neuronal**:

```
 ENTRADA              CAPAS OCULTAS                    SALIDA

 palabra 1 ──┐      ┌──(N)──┐      ┌──(N)──┐
 palabra 2 ──┼─────►│ (N)   │─────►│ (N)   │─────►  (spam)
 palabra 3 ──┘      └──(N)──┘      └──(N)──┘        (normal)
```

- **Capa de entrada:** recibe los datos (palabras, píxeles de una imagen, sonido).
- **Capas ocultas:** cada capa detecta patrones más complejos que la anterior. En una foto: primero bordes, luego formas, luego ojos y orejas, al final "es un gato".
- **Capa de salida:** da la respuesta ("spam" o "normal").

**Deep Learning** (aprendizaje *profundo*) significa simplemente que la red tiene **muchas capas ocultas**. Los modelos grandes tienen **miles de millones** de pesos.

> **Analogía:** una cadena de montaje. Cada puesto (capa) hace un trabajo simple con lo que recibe del anterior. Ninguno entiende el producto final, pero juntos lo arman.

### ¿Tu detective usa una red neuronal?

No. Tu detective usará **Naive Bayes**, que es más simple: no tiene capas ni neuronas, solo **cuenta palabras**. Pero resuelve el mismo problema (clasificar) y la idea de fondo es idéntica: **cada palabra empuja la decisión hacia un lado con un peso, y esos pesos se obtienen de los datos**.

**Comprueba que lo entendiste (1 min):** en una frase, ¿qué significa "profundo" en Deep Learning? (Respuesta: que la red tiene muchas capas ocultas.)

---

## Parte 6 · Entrenar: aprender los pesos (10 min)

Al principio los pesos de una red son **cero o al azar**, así que se equivoca. **Entrenar** es corregirla una y otra vez:

```
1. La red ve un ejemplo  →  2. Da una respuesta  →  3. Se compara con la respuesta correcta
        ▲                                                       │
        │                                                       ▼
5. Se ajustan los pesos un poquito  ◄──────────  4. Se mide el error
```

> **Analogía:** aprender a tirar penaltis. Pateas, ves dónde cayó el balón, corriges un poco la pierna y vuelves a intentar. Después de muchos intentos, aciertas.

### Hazlo tú: una neurona que aprende

Pega este código en la consola. Es la regla más simple de aprendizaje: **si te equivocas, mueve cada peso un paso en la dirección que corrige el error**.

```js
// Cada ejemplo: entradas [gratis, enlace, amigo] y la respuesta correcta (1 = spam, 0 = normal)
const ejemplosNeurona = [
  { entradas: [1, 1, 0], respuesta: 1 },
  { entradas: [1, 0, 0], respuesta: 1 },
  { entradas: [0, 1, 0], respuesta: 1 },
  { entradas: [0, 0, 1], respuesta: 0 },
  { entradas: [0, 1, 1], respuesta: 0 },
  { entradas: [1, 0, 1], respuesta: 0 },
  { entradas: [0, 0, 0], respuesta: 0 }
];

function entrenarNeurona(ejemplos, rondas) {
  const pesos = [0, 0, 0];     // empieza sin saber nada
  let sesgo = 0;
  for (let ronda = 1; ronda <= rondas; ronda++) {
    let errores = 0;
    for (const ej of ejemplos) {
      let suma = sesgo;
      for (let i = 0; i < pesos.length; i++) suma += ej.entradas[i] * pesos[i];
      const prediccion = suma > 0 ? 1 : 0;
      const error = ej.respuesta - prediccion;      // 0 si acertó; +1 o -1 si falló
      if (error !== 0) {
        errores += 1;
        for (let i = 0; i < pesos.length; i++) pesos[i] += error * ej.entradas[i];
        sesgo += error;
      }
    }
    console.log("ronda " + ronda + ": errores = " + errores + ", pesos = " + JSON.stringify(pesos) + ", sesgo = " + sesgo);
    if (errores === 0) break;     // ya no se equivoca: terminó de aprender
  }
  return { pesos: pesos, sesgo: sesgo };
}

entrenarNeurona(ejemplosNeurona, 10)
```

**Deberías ver:**

```
ronda 1: errores = 2, pesos = [1,1,-1], sesgo = 0
ronda 2: errores = 0, pesos = [1,1,-1], sesgo = 0
```

Y al final el objeto `{pesos: Array(3), sesgo: 0}`. Haz clic en la flechita ▸ y luego en `pesos` para ver `[1, 1, -1]`.

**Si no te sale…**

- `ejemplosNeurona is not defined` o `entrenarNeurona is not defined`: pega **todo** el bloque de una vez, completo (de la primera a la última línea).
- Si ves otros números de errores, revisa que copiaste exactamente los 7 ejemplos (cada `respuesta` es 1 o 0 como arriba).
- Si pegaste este bloque dos veces, sale `Identifier ... has already been declared`: recarga con F5 y pégalo una vez.

Lee lo que pasó: empezó sin saber nada, se equivocó en 2 ejemplos, **ajustó sus pesos** y en la segunda ronda ya acertó los 7. Descubrió sola que "gratis" y "enlace" empujan hacia spam y que "lo manda un amigo" empuja hacia normal. **Eso es aprender.**

> **Actividad 4 · Rompe el aprendizaje (5 min).** Agrega a `ejemplosNeurona` un octavo ejemplo **contradictorio**: `{ entradas: [1, 0, 1], respuesta: 1 }` (las mismas pistas que el sexto ejemplo, pero con la respuesta contraria). En la consola escribe:
>
> ```js
> ejemplosNeurona.push({ entradas: [1, 0, 1], respuesta: 1 });
> entrenarNeurona(ejemplosNeurona, 10)
> ```
>
> Antes de leer la respuesta, mira la salida: ¿llega a 0 errores? ¿Qué te dice eso sobre dos personas que etiquetan igual de mal un mensaje parecido?

<details><summary>Respuesta</summary>

**Deberías ver** (las primeras líneas): `ronda 1: errores = 3, pesos = [2,1,0], sesgo = 1`, `ronda 2: errores = 3, ...` y, desde la ronda 3, `errores = 2` en cada ronda hasta la 10, con pesos `[2,1,-1]` y sesgo 0. **Nunca llega a 0 errores.**

Por qué: dos ejemplos tienen **las mismas entradas pero respuestas contrarias**; ninguna combinación de pesos puede acertar los dos. Es lo que pasa cuando dos personas etiquetan de forma contradictoria mensajes parecidos: **el ruido en las etiquetas limita al modelo**. Un modelo no puede ser más consistente que sus datos.

(Para volver al caso normal, recarga con F5 y pega otra vez el bloque.)

</details>

---

## Parte 7 · Los datos: el combustible (5 min)

| Concepto | Qué es | En tu taller |
|---|---|---|
| **Dataset** | La colección de ejemplos | `datos.js` |
| **Datos de entrenamiento** | Con los que el modelo aprende | `ENTRENAMIENTO`: 60 mensajes (30 spam, 30 normales) |
| **Datos de prueba** | Ejemplos que el modelo **nunca vio**, para comprobar si de verdad aprendió | `PRUEBA`: 20 mensajes (10 spam, 10 normales) |
| **Sobreajuste** | El modelo **memorizó** los ejemplos como quien se aprende el examen de memoria: le va perfecto con lo visto y mal con lo nuevo | Lo medirás en el módulo 07 |

> **Regla de oro:** *basura entra, basura sale.* Si los datos tienen errores o prejuicios, el modelo los aprende. Un buen modelo con malos datos es un mal modelo.

**Tarea de lectura (2 min):** echa un vistazo a `datos.js` en VS Code. Lee 5 mensajes de cada lista. Fíjate en que cada uno tiene `texto` y `etiqueta`. **Esa etiqueta la puso una persona.** ¿Alguno te parece difícil de etiquetar?

> **Si tienes internet y te sobra tiempo (opcional, fuera del tiempo del módulo):** entra a *Teachable Machine* de Google, entrena un modelo de imágenes con tu cámara ("mano abierta" contra "puño") y mira qué pasa si le quitas la mitad de los ejemplos. Es la misma idea con una red neuronal de verdad.

---

## Parte 8 · Cierre (5 min)

### Checkpoints: ¿cumpliste el módulo?

- [ ] La consola devuelve `'sí'`, `'no'`, `'no'` con `pesosCine`.
- [ ] Con `pesosSpam`, devuelve `'sí'`, `'no'`, `'no'`.
- [ ] `entrenarNeurona(...)` imprime 2 rondas y termina con pesos `[1,1,-1]`.
- [ ] Puedes explicar la diferencia entre datos de entrenamiento y de prueba.

### Si no te sale… (errores comunes)

| Síntoma | Causa probable | Solución |
|---|---|---|
| `Identifier 'pesosCine' has already been declared` | Pegaste dos veces un `const` | Recarga la página (**F5**) o cambia el nombre de la variable |
| `neurona is not defined` | Reiniciaste la página y se perdió la función | Pega otra vez el bloque de la Parte 2 |
| La neurona siempre responde `'no'` | Todos los pesos son pequeños o el sesgo es muy negativo | Sube un peso o el sesgo y prueba |
| `NaN` en las sumas | Te faltan entradas o pesos (listas de distinto tamaño) | Revisa que `entradas` y `pesos` tengan el mismo largo |
| "Entonces el cerebro es una suma de números" | Es solo una **analogía** | Las neuronas reales son mucho más complejas; las artificiales solo se inspiran en ellas |

### Quiz final (responde primero, despliega después)

**1. ¿Qué significa que un peso sea negativo?**

<details><summary>Respuesta</summary>

Que esa entrada **empuja hacia el "no"**: cuando está presente, resta a la suma.

</details>

**2. ¿Qué pasó con los pesos cuando la neurona se equivocó durante el entrenamiento?**

<details><summary>Respuesta</summary>

Se ajustaron un paso en la dirección que corrige el error (hacia arriba si debía decir sí y dijo no; hacia abajo en el caso contrario), solo para las entradas que estaban presentes.

</details>

**3. ¿Por qué no probamos al modelo con los mismos ejemplos con los que aprendió?**

<details><summary>Respuesta</summary>

Porque así solo comprobamos que memorizó. Para saber si **aprendió** hay que probar con datos que nunca vio.

</details>

**4. ¿Qué pasa si alguien etiqueta mal varios ejemplos?**

<details><summary>Respuesta</summary>

El modelo aprende el error o no logra acertar todo (como en la Actividad 4). "Basura entra, basura sale".

</details>

**5. ¿Qué diferencia hay entre una neurona y una red neuronal?**

<details><summary>Respuesta</summary>

Una neurona suma entradas por pesos y decide. Una red conecta muchas neuronas en capas; con muchas capas ocultas se llama *profunda* (Deep Learning).

</details>

### Resumen en 5 líneas

1. Una **neurona** multiplica entradas por pesos, suma y decide (si la suma es mayor que 0, dice "sí").
2. Los **pesos** son lo que sabe; cambiarlos cambia las decisiones.
3. Una **red** son muchas neuronas en capas; **profundo** = muchas capas.
4. **Entrenar** = ajustar los pesos cuando hay error, una y otra vez, hasta que acierte.
5. Los **datos** son el combustible y se separan en entrenamiento y prueba para saber si de verdad aprendió.

**Siguiente paso:** [Módulo 03 · Texto para máquinas y filtro por reglas](./03-texto-y-reglas.md).
