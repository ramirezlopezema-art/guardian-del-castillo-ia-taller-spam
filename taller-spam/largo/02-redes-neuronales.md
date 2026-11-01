# Módulo 02 · Redes neuronales y cómo aprende una máquina

> **Curso:** Detective de mensajes ([índice del taller largo](../TALLER_LARGO.md)) · **Duración:** 70 min · **Anterior:** [Módulo 01](./01-que-es-la-ia.md) · **Siguiente:** [Módulo 03](./03-texto-y-reglas.md) · **Glosario:** [00-glosario.md](./00-glosario.md)

## Antes de empezar

**Recuerda del módulo anterior:** la IA con aprendizaje (Machine Learning) recibe **datos + respuestas** y produce **reglas** (el modelo). El Deep Learning es ML con *redes neuronales*.

Si empiezas aquí sin haber visto el módulo 01, solo necesitas esta idea: *una máquina puede aprender sus reglas a partir de ejemplos que ya traen su respuesta*.

Aquí abrirás por primera vez la **consola del navegador**. Es una ventana donde escribes JavaScript y ves el resultado al instante. Se abre con **F12** y la pestaña **Consola** (en la página `index.html` del taller sirve perfecto).

## Objetivos

- [ ] Explicar qué hace una **neurona artificial**: entradas × pesos, suma, decisión.
- [ ] Programar y modificar una neurona en la consola.
- [ ] Ver cómo **aprende** una neurona: ajusta sus pesos cuando se equivoca.
- [ ] Explicar qué es una red de muchas neuronas y qué significa "profundo".
- [ ] Explicar por qué el **dato** es el combustible y por qué se separa entrenamiento y prueba.

## Mapa de tiempos

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Una neurona: decidir con pesos | 10 |
| 2 | La neurona en la consola | 15 |
| 3 | Una neurona que detecta spam | 10 |
| 4 | Descanso | 5 |
| 5 | Muchas neuronas: una red | 10 |
| 6 | Entrenar: aprender los pesos | 10 |
| 7 | Los datos: el combustible | 5 |
| 8 | Cierre | 5 |
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

> **Actividad 1 · A mano (5 min, en parejas).** Con los pesos `+3, -2, -1`, calculen la suma y la decisión para:
> - (a) van amigos, hay tarea, **sí** llueve → `1, 1, 1`
> - (b) **no** van amigos, **no** hay tarea, llueve → `0, 0, 1`
> - (c) van amigos, no hay tarea, no llueve → `1, 0, 0`

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

4. Ahora pega estas líneas, **una por una**, y compara con el resultado:

```js
neurona([1, 1, 0], pesosCine, 0)   // "sí": van amigos, hay tarea, no llueve
neurona([0, 1, 1], pesosCine, 0)   // "no": no van amigos, hay tarea y llueve
neurona([1, 1, 1], pesosCine, 0)   // "no": la suma da 0, y no es mayor que 0
```

**Checkpoint · deberías ver:** `"sí"`, `"no"`, `"no"`.

### ¿Qué es el tercer parámetro, el `sesgo`?

Es un número fijo que se suma antes de decidir. Mueve el "punto de corte". Con `sesgo = 1`, la tercera línea daría `"sí"`, porque la suma pasaría de 0 a 1.

```js
neurona([1, 1, 1], pesosCine, 1)   // "sí": el sesgo inclina un poco la balanza
```

> **Ojo con el nombre:** este "sesgo" (en inglés *bias*) es un número dentro de la neurona. **No** es lo mismo que el *sesgo injusto* de un sistema que discrimina; de ese hablaremos en el [módulo 08](./08-sesgo-etica-proyecto.md).

> **Actividad 2 · Cambia lo que sabe (6 min).** Cambia los pesos de `pesosCine` (en la consola: escribe una nueva lista, por ejemplo `const pesosCine2 = [1, -5, 0]`, y úsala en `neurona(...)`). Responde:
> 1. ¿Con qué pesos la neurona nunca va al cine si hay tarea?
> 2. ¿Con qué pesos va al cine aunque llueva?
> 3. ¿Qué pasó con lo que "sabe" la neurona cuando cambiaste los pesos?

---

## Parte 3 · Una neurona que detecta spam (10 min)

Usemos la misma neurona para algo del taller. Las entradas serán **tres pistas** de un mensaje: ¿dice "gratis"?, ¿trae un enlace?, ¿lo manda un amigo?

```js
// entradas: [dice "gratis", trae un enlace, lo manda un amigo]
const pesosSpam = [2, 2, -3];
neurona([1, 1, 0], pesosSpam, -1)   // "sí" es spam: gratis + enlace de un desconocido
neurona([0, 1, 1], pesosSpam, -1)   // "no": trae enlace, pero lo manda un amigo
neurona([0, 0, 0], pesosSpam, -1)   // "no": no pasa nada raro
```

**Checkpoint · deberías ver:** `"sí"`, `"no"`, `"no"`.

Fíjate: el peso de "lo manda un amigo" es **negativo** (`-3`). Empuja hacia "no es spam". Es la misma idea que usará tu detective más adelante: cada palabra empuja hacia un lado.

> **Actividad 3 · Diseña tu neurona (7 min, en parejas).** Inventen una cuarta pista (por ejemplo, "tiene muchos signos de exclamación") y decidan su peso. Escriban **dos mensajes** y la lista de entradas de cada uno: uno que su neurona marque como spam y uno que no. Pruébenlos en la consola.

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

**Checkpoint · deberías ver:**

```
ronda 1: errores = 2, pesos = [1,1,-1], sesgo = 0
ronda 2: errores = 0, pesos = [1,1,-1], sesgo = 0
```

Y al final el objeto `{pesos: [1, 1, -1], sesgo: 0}`.

Lee lo que pasó: empezó sin saber nada, se equivocó en 2 ejemplos, **ajustó sus pesos** y en la segunda ronda ya acertó los 7. Descubrió sola que "gratis" y "enlace" empujan hacia spam y que "lo manda un amigo" empuja hacia normal. **Eso es aprender.**

> **Actividad 4 · Rompe el aprendizaje (5 min).** Agrega a `ejemplosNeurona` un octavo ejemplo **contradictorio**: `{ entradas: [1, 0, 1], respuesta: 1 }` (las mismas pistas que el sexto ejemplo, pero con la respuesta contraria). Vuelve a ejecutar `entrenarNeurona(ejemplosNeurona, 10)`. ¿Llega a 0 errores? ¿Qué te dice eso sobre dos personas que etiquetan igual de mal un mensaje parecido? (Pista: usa `ejemplosNeurona.push(...)` y vuelve a llamar la función.)

---

## Parte 7 · Los datos: el combustible (5 min)

| Concepto | Qué es | En tu taller |
|---|---|---|
| **Dataset** | La colección de ejemplos | `datos.js` |
| **Datos de entrenamiento** | Con los que el modelo aprende | `ENTRENAMIENTO`: 60 mensajes (30 spam, 30 normales) |
| **Datos de prueba** | Ejemplos que el modelo **nunca vio**, para comprobar si de verdad aprendió | `PRUEBA`: 20 mensajes (10 spam, 10 normales) |
| **Sobreajuste** | El modelo **memorizó** los ejemplos como quien se aprende el examen de memoria: le va perfecto con lo visto y mal con lo nuevo | Lo medirás en el módulo 07 |

> **Regla de oro:** *basura entra, basura sale.* Si los datos tienen errores o prejuicios, el modelo los aprende. Un buen modelo con malos datos es un mal modelo.

Echa un vistazo a `datos.js` en VS Code. Lee 5 mensajes de cada lista. Fíjate en que cada uno tiene `texto` y `etiqueta`. **Esa etiqueta la puso una persona.**

> **Si tienes internet y te sobra tiempo (opcional, fuera del horario):** entra a *Teachable Machine* de Google, entrena un modelo de imágenes con tu cámara ("mano abierta" contra "puño") y mira qué pasa si le quitas la mitad de los ejemplos. Es la misma idea con una red neuronal de verdad.

---

## Parte 8 · Cierre (5 min)

Revisa el resumen y responde las preguntas de cierre en voz alta con tu pareja.

---

## Checkpoints

- [ ] La consola devuelve `"sí"`, `"no"`, `"no"` con `pesosCine`.
- [ ] Con `pesosSpam`, devuelve `"sí"`, `"no"`, `"no"`.
- [ ] `entrenarNeurona(...)` imprime 2 rondas y termina con pesos `[1,1,-1]`.
- [ ] Puedes explicar la diferencia entre datos de entrenamiento y de prueba.

## Errores comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `Identifier 'pesosCine' has already been declared` | Pegaste dos veces un `const` | Recarga la página (**F5**) o cambia el nombre de la variable |
| `neurona is not defined` | Reiniciaste la página y se perdió la función | Pega otra vez el bloque de la Parte 2 |
| La neurona siempre responde `"no"` | Todos los pesos son pequeños o el sesgo es muy negativo | Sube un peso o el sesgo y prueba |
| `NaN` en las sumas | Te faltan entradas o pesos (listas de distinto tamaño) | Revisa que `entradas` y `pesos` tengan el mismo largo |
| "Entonces el cerebro es una suma de números" | Es solo una **analogía** | Las neuronas reales son mucho más complejas; las artificiales solo se inspiran en ellas |

## Resumen

- Una **neurona** multiplica entradas por pesos, suma y decide.
- Los **pesos** son lo que sabe; cambiarlos cambia las decisiones.
- Una **red** son muchas neuronas en capas; **profundo** = muchas capas.
- **Entrenar** = ajustar los pesos cuando hay error, una y otra vez.
- Los **datos** son el combustible; se separan en entrenamiento y prueba para saber si de verdad aprendió.

## Preguntas de cierre

1. ¿Qué significa que un peso sea negativo?
2. ¿Qué pasó con los pesos cuando la neurona se equivocó durante el entrenamiento?
3. ¿Por qué no probamos al modelo con los mismos ejemplos con los que aprendió?
4. ¿Qué pasa si alguien etiqueta mal varios ejemplos?

**Siguiente paso:** [Módulo 03 · Texto para máquinas y filtro por reglas](./03-texto-y-reglas.md).
