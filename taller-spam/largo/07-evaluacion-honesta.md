# Módulo 07 · Evaluación honesta

> **Curso:** Detective de mensajes ([índice del taller largo](../TALLER_LARGO.md)) · **Duración:** 50 min · **Anterior:** [Módulo 06](./06-programa-tu-detective.md) · **Siguiente:** [Módulo 08](./08-sesgo-etica-proyecto.md) · **Glosario:** [00-glosario.md](./00-glosario.md)

## Antes de empezar

**Recuerda del módulo anterior:** programaste `entrenar`, `logProbPalabra`, `clasificar` y `evaluar`. Tu detective saca **90 %** de exactitud en el examen (18 de 20) y el filtro por reglas saca **80 %**.

Si llegas solo con este módulo, necesitas una página `index.html` con un detective que funcione. Para ello copia `soluciones/modelo.solucion.js` encima de `modelo.js` (es la solución completa del módulo 06) y recarga la página. Así puedes seguir todo el módulo.

Pero... ¿es el 90 % una buena nota? ¿Y qué significa de verdad? Hoy aprendes a medir **con honestidad**.

## Objetivos

- [ ] Leer una **matriz de confusión** y calcular la exactitud.
- [ ] Explicar por qué la exactitud puede engañar cuando las clases están **desbalanceadas**.
- [ ] Distinguir **falso positivo** de **falso negativo** y decidir cuál duele más según el contexto.
- [ ] Calcular **precisión** y **recall**.
- [ ] Mover el **umbral** y ver el intercambio entre fp y fn.
- [ ] Reconocer una **fuga de datos** y el **sobreajuste**.

## Mapa de tiempos

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Exactitud y matriz de confusión | 10 |
| 2 | La trampa del desbalance | 10 |
| 3 | Falsos positivos, falsos negativos, precisión y recall | 10 |
| 4 | El umbral: ajustar la exigencia | 10 |
| 5 | Fuga de datos y sobreajuste | 5 |
| 6 | Cierre | 5 |
| | **Total** | **50** |

---

## Parte 1 · Exactitud y matriz de confusión (10 min)

La **exactitud** (*accuracy*) es la fracción de mensajes bien clasificados:

> **exactitud = (vp + vn) ÷ total**

La **matriz de confusión** cuenta los cuatro casos posibles. En este taller "spam" es la clase **positiva**:

|  | Predijo SPAM | Predijo NORMAL |
|---|---|---|
| **Era SPAM** | **vp**: spam atrapado | **fn**: spam que se coló |
| **Era NORMAL** | **fp**: mensaje bueno enviado al spam | **vn**: normal bien |

> **Truco para recordar:** el nombre dice si **acertó o no** (verdadero/falso) y **lo que predijo** (positivo/negativo). "Falso positivo" = predijo spam (positivo) y falló.

Pulsa **Tomar el examen** en la página y compara con esta tabla:

| | Predijo SPAM | Predijo NORMAL |
|---|---|---|
| **Era SPAM** | vp = 9 | fn = 1 |
| **Era NORMAL** | fp = 1 | vn = 9 |

Exactitud = (9 + 9) ÷ 20 = **0,90**. Los dos errores son el mensaje de **Camila** (spam disfrazado, se coló) y el de la **tarjeta del banco** (normal, bloqueado).

> **Actividad 1 · Lee la matriz de las reglas (3 min).** Baja al panel **5. Comparar** y pulsa **Comparar en el examen**. Para las reglas, la página muestra 6 spam atrapados, 4 colados, 0 normales bloqueados y 10 normales bien. Dibuja su matriz de confusión. ¿Cuál de las dos matrices (reglas o modelo) preferirías si fueras el dueño de un correo? Anota por qué.

---

## Parte 2 · La trampa del desbalance (10 min)

Imagina 1000 mensajes reales: **990 normales y solo 10 spam**. Un "modelo" que **siempre responde normal** acierta 990 de 1000 = **99 %**. ¡Y no atrapa ningún spam! Su exactitud es altísima y es **inútil**.

Esto pasa cuando las clases están **desbalanceadas**: una es mucho más frecuente que la otra. Compruébalo con tu detective, en la consola:

```js
const normales = PRUEBA.filter(e => e.etiqueta === "normal");
const desbalanceado = normales.concat([PRUEBA[5]]);   // 10 normales + el spam de Camila
evaluar(estado.modelo, desbalanceado)
```

**Checkpoint · deberías ver:** `exactitud` ≈ **0.818**, con `vp: 0`, `fn: 1`, `fp: 1`, `vn: 9`.

Ahora calcula la exactitud del "modelo tonto" que siempre responde normal:

```js
desbalanceado.filter(e => e.etiqueta === "normal").length / desbalanceado.length
```

**Checkpoint · deberías ver:** ≈ **0.909** (10 de 11). ¡El modelo tonto le gana a tu detective en exactitud! Y también a la nota que da el mismo examen para las reglas:

```js
evaluarReglas(desbalanceado).exactitud
```

**Checkpoint · deberías ver:** ≈ **0.909**, con `vp: 0` y `fn: 1`: las reglas tampoco atrapan a Camila, y su nota es la misma que la del modelo tonto.

> **Analogía:** un guardia de seguridad que nunca ve a un ladrón en un edificio donde nunca entran ladrones. Dirá "todo bien" y acertará siempre; no sirve de nada el día que entre uno.

**Conclusión:** antes de creer un porcentaje, pregunta **cómo están repartidas las clases** y **qué errores comete**.

> **Actividad 2 · Dos preguntas antes de creer (4 min, en parejas).** Alguien te dice "mi modelo acierta el 99 %". Escribe las **dos preguntas** que le harías antes de creerle. (Pistas: una sobre el reparto de los datos, otra sobre qué tipo de error comete.)

---

## Parte 3 · Falsos positivos, falsos negativos, precisión y recall (10 min)

No todos los errores cuestan lo mismo.

| Error | Qué pasa | Quién sufre |
|---|---|---|
| **Falso positivo (fp)** | Un mensaje bueno va a la carpeta de spam | Tú: puedes perder el aviso del banco, una oferta de trabajo, la nota del profesor |
| **Falso negativo (fn)** | Un spam llega a tu bandeja | Tú: puede ser una estafa que te robe datos o dinero |

¿Cuál es peor? **Depende de quién eres y qué hace el filtro:**

- Para un **correo personal**, perder un mensaje importante (fp) suele doler más.
- Para un **banco** que bloquea fraudes, dejar pasar un fraude (fn) puede costar mucho dinero.

### Dos medidas que miran cada error por separado

> **Precisión = vp ÷ (vp + fp)**: de todo lo que marqué como spam, ¿cuánto lo era de verdad?
> **Recall (sensibilidad) = vp ÷ (vp + fn)**: de todo el spam que existe, ¿cuánto atrapé?

Cálculo con tu detective, en la consola:

```js
const miExamen = evaluar(estado.modelo, PRUEBA);
({ precision: miExamen.vp / (miExamen.vp + miExamen.fp), recall: miExamen.vp / (miExamen.vp + miExamen.fn) })
```

**Checkpoint · deberías ver:** `{precision: 0.9, recall: 0.9}`.

Y con las reglas:

```js
const examenReglas = evaluarReglas(PRUEBA);
({ precision: examenReglas.vp / (examenReglas.vp + examenReglas.fp), recall: examenReglas.vp / (examenReglas.vp + examenReglas.fn) })
```

**Checkpoint · deberías ver:** `{precision: 1, recall: 0.6}`. Las reglas **nunca** bloquean un mensaje bueno (precisión 100 %), pero solo atrapan el 60 % del spam. Son "prudentes": dudan y dejan pasar.

| | Exactitud | Precisión | Recall |
|---|---|---|---|
| Reglas a mano | 0,80 | 1,0 | 0,6 |
| Modelo aprendido | 0,90 | 0,9 | 0,9 |

> **Actividad 3 · ¿A cuál elegirías? (6 min, en grupos).** Dos clientes: (a) una universidad que filtra correos de estudiantes; (b) un banco que filtra mensajes de clientes. Para cada uno, decidan cuál de los dos filtros (reglas o modelo) pondrían y por qué, usando precisión y recall.

---

## Parte 4 · El umbral: ajustar la exigencia (10 min)

Tu `clasificar` decide "spam" cuando `probSpam > umbral`, con umbral = **0,5**. Pero ese número se puede cambiar:

- Umbral **bajo** (0,1): marca como spam casi todo lo dudoso. Atrapas más spam (menos fn) pero bloqueas más mensajes buenos (más fp).
- Umbral **alto** (0,99): solo marca como spam lo que está **muy** seguro. Menos fp, pero se cuelan más spam (más fn).

Es como regular la sensibilidad de una alarma: muy sensible, suena por todo; poco sensible, no suena cuando hace falta.

Pega esto en la consola:

```js
function examenConUmbral(umbral) {
  let fp = 0, fn = 0;
  for (const e of PRUEBA) {
    const pred = clasificar(e.texto, estado.modelo, umbral).etiqueta;
    if (pred === "spam" && e.etiqueta === "normal") fp++;
    if (pred === "normal" && e.etiqueta === "spam") fn++;
  }
  return { umbral: umbral, fp: fp, fn: fn };
}
[0.1, 0.3, 0.5, 0.7, 0.9, 0.99].map(examenConUmbral)
```

**Checkpoint · deberías ver:**

| Umbral | fp | fn |
|---|---|---|
| 0,1 | 1 | 0 |
| 0,3 | 1 | 0 |
| 0,5 | 1 | 1 |
| 0,7 | 0 | 1 |
| 0,9 | 0 | 1 |
| 0,99 | 0 | 3 |

No hay un umbral perfecto: **mover un error lo cambia por otro**. Elegir el umbral es una decisión de personas, no de la máquina.

> **Actividad 4 · Elige el umbral (4 min, en parejas).** Para el correo de una universidad, ¿qué umbral elegirían de la tabla? ¿Y para el banco? ¿Qué error están dispuestos a aceptar en cada caso?

---

## Parte 5 · Fuga de datos y sobreajuste (5 min)

Para saber si el modelo **aprendió de verdad**, debes probarlo con mensajes que **nunca vio**. Si no, es como darle a un estudiante el examen antes de la prueba: sacará 100, pero no sabrás si aprendió.

Se llama **fuga de datos** (*data leakage*) cuando información del examen se "filtra" al entrenamiento. Pruébalo en la consola:

```js
evaluar(entrenar(ENTRENAMIENTO.concat(PRUEBA)), PRUEBA).exactitud
```

**Checkpoint · deberías ver:** `1`. El modelo vio las respuestas. Esa nota no vale nada.

Y algo parecido pasa si lo evalúas con los mismos datos con los que aprendió:

```js
evaluar(estado.modelo, ENTRENAMIENTO).exactitud
```

**Checkpoint · deberías ver:** `1` en entrenamiento, pero 0,9 en el examen real. Esa diferencia es una señal de **sobreajuste**: le va mejor con lo que **memorizó** que con lo nuevo.

> **Regla de oro:** los datos de **prueba** se usan **una sola vez, al final**, y **nunca** se mira ni se corrige nada mirándolos.

Esto explica también la Actividad 4 del módulo 03: si agregas palabras a las reglas mirando `PRUEBA`, haces trampa sin querer.

(Opcional, del [módulo 04](./04-chatbots-y-llm.md)): si hiciste el ejercicio con un asistente de chat, compara sus aciertos con los de tu modelo y las reglas. ¿Quién acertó en cuáles mensajes?

---

## Parte 6 · Cierre (5 min)

Completa esta tabla de decisiones en tu cuaderno:

| Situación | Qué medida miro |
|---|---|
| Clases muy desbalanceadas | Matriz de confusión, precisión y recall (no solo exactitud) |
| No quiero perder mensajes buenos | ¿? |
| No quiero que se cuele spam | ¿? |
| Quiero saber si de verdad aprendió | ¿? |

(Respuestas en las [notas del docente](./99-notas-docente.md).)

---

## Checkpoints

- [ ] Matriz del modelo: vp 9, fn 1, fp 1, vn 9 (exactitud 0,90).
- [ ] Examen desbalanceado: modelo 0,818; "siempre normal" 0,909; reglas 0,909.
- [ ] Precisión y recall: modelo 0,9 y 0,9; reglas 1 y 0,6.
- [ ] Tabla de umbrales reproducida.
- [ ] Con fuga de datos, `exactitud` = 1.

## Errores comunes

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| `estado is not defined` | No estás en `index.html` del taller | Abre la página del taller y abre la consola ahí |
| `estado.modelo` es `null` | Algún TODO sigue pendiente | Revisa el cuadro amarillo; completa el TODO; si necesitas seguir, usa la solución |
| Confundir fp con fn | Positivo = spam (la clase buscada) | fp: **normal** que se marcó como spam. fn: **spam** que no se marcó |
| "100 % es lo mejor" | Es sospechoso | Pregúntate si hubo fuga de datos |
| `examenConUmbral is not defined` | Reiniciaste la página | Pega otra vez la función |
| "Un solo número basta" | La exactitud oculta los errores | Siempre mira la matriz |

## Resumen

- **Exactitud** = (vp + vn) ÷ total; puede engañar con clases desbalanceadas.
- La **matriz de confusión** separa los dos tipos de error: **fp** y **fn**.
- **Precisión** y **recall** miran cada error por separado.
- El **umbral** cambia un error por otro; elegirlo es una decisión humana.
- La **fuga de datos** infla la nota; el examen se usa una vez y sin mirarlo.

## Preguntas de cierre

1. Si te dicen "acierta el 99 %", ¿qué dos preguntas haces antes de creerlo?
2. ¿Qué es peor, un falso positivo o un falso negativo? ¿De qué depende?
3. ¿Qué pasa con fp y fn al subir el umbral?
4. ¿Por qué evaluar con los datos de entrenamiento da una nota engañosa?

**Siguiente paso:** [Módulo 08 · Sesgo, ética y proyecto final](./08-sesgo-etica-proyecto.md).
