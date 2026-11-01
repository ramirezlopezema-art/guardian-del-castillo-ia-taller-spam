# Módulo 05 · Naive Bayes: aprender de ejemplos

> **Tiempo de estudio:** 45 min · **Anterior:** [Módulo 04](./04-chatbots-y-llm.md) · **Siguiente:** [Módulo 06](./06-programa-tu-detective.md) · **Glosario:** [00-glosario.md](./00-glosario.md) · **Ayuda:** [TALLER_LARGO.md](../TALLER_LARGO.md#cómo-estudiar-esto-solo)

**Meta de este módulo:** entender con lápiz y calculadora cómo decide un clasificador **Naive Bayes**: entrenar es **contar**, clasificar es **comparar puntajes**. Entender esto a mano es lo que hará fácil programarlo en el módulo 06.

> **Qué necesitas hoy:** papel, lápiz y una calculadora (la del celular o la de Windows en modo científico, con las teclas `ln` y `e^x`). Hoy casi no se usa el computador.

## Antes de empezar: ¿estás listo?

**Recuerda de los módulos anteriores:** en Machine Learning le das a la máquina **ejemplos con su etiqueta** y ella descubre las reglas (módulo 01). Un texto se limpia, se parte en palabras y se cuentan (módulo 03). Y una decisión se puede ver como pistas que **empujan** hacia un lado con un peso (módulo 02).

**1. ¿Cuántas palabras tiene el mensaje `gana dinero gratis`, y cuántas distintas?**

<details><summary>Respuesta</summary>

Tres palabras, las tres distintas: `gana`, `dinero`, `gratis`.

</details>

**2. ¿Qué es un "token"?**

<details><summary>Respuesta</summary>

Cada pieza en que se parte un texto (aquí, una palabra). Tokenizar es hacer esa partición.

</details>

**3. En el módulo 02, si un peso es negativo, ¿hacia dónde empuja?**

<details><summary>Respuesta</summary>

Hacia el "no" (aquí lo usaremos como "hacia normal"). Un aporte positivo empujará hacia spam y uno negativo hacia normal.

</details>

## Objetivos

- [ ] Explicar con una analogía cómo decide un clasificador Naive Bayes.
- [ ] **Entrenar a mano**: contar palabras por clase en 3 mensajes.
- [ ] Calcular la probabilidad de que un mensaje sea spam con un ejemplo pequeño.
- [ ] Explicar para qué sirven el **suavizado** (+1) y el **logaritmo**.

## Mapa de tiempos (estudio estimado)

| Parte | Tema | Minutos |
|---|---|---|
| 1 | La intuición: pistas que suman | 10 |
| 2 | Contar = entrenar | 10 |
| 3 | Probabilidades y comparación | 10 |
| 4 | El truco del logaritmo y el suavizado | 10 |
| 5 | Cierre: quiz y resumen | 5 |
| | **Total** | **45** |

---

## Parte 1 · La intuición: pistas que suman (10 min)

Eres un detective. Te llega un mensaje con la palabra **"gratis"**. Del pasado recuerdas: "gratis" salió muchas veces en spam y casi nunca en mensajes normales. Esa palabra es una **pista a favor del spam**.

Ahora el mensaje trae también **"premio"**: otra pista a favor del spam. Y **"clase"**: una pista a favor de normal. Cada pista empuja un poco hacia un lado, y al final miras hacia dónde se inclinó la balanza.

```
 pistas a favor de SPAM  ◄──────[ balanza ]──────►  pistas a favor de NORMAL
   gratis, premio, clic                                clase, tarea, mamá
```

**Naive Bayes** es exactamente eso, hecho con números:

1. **Entrenar** = contar cuántas veces aparece cada palabra en los mensajes de cada clase.
2. **Clasificar** = para un mensaje nuevo, sumar las pistas de cada palabra y ver qué clase gana.

### ¿Por qué "ingenuo" (naive)?

Porque suma las pistas **como si cada palabra fuera independiente de las otras**. En el lenguaje real no lo son ("tarjeta" y "banco" suelen venir juntas), pero tratarlas como independientes es una simplificación que **funciona sorprendentemente bien** para clasificar texto.

> **Analogía:** un médico que revisa síntomas uno por uno y los suma, sin pensar en cómo se afectan entre sí. No es perfecto, pero en muchos casos acierta.

---

## Parte 2 · Contar = entrenar (10 min)

Tomemos un ejemplo diminuto, de tres mensajes ya etiquetados. **Estos tres mensajes se usarán en todo el módulo, en el módulo 06 y en las pruebas automáticas de la página**:

| # | Mensaje | Etiqueta |
|---|---|---|
| 1 | `gana dinero gratis` | spam |
| 2 | `gana premio ya` | spam |
| 3 | `hola clase ya` | normal |

**Entrenar** es llenar esta tabla contando:

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

- Las palabras **distintas** en total son **7**: ese número se llama **vocabulario**.
- Hay 3 mensajes: **2 de spam y 1 normal**.

¡Eso es todo! El modelo es solo esta tabla de conteos. (Por eso se dice que "entrenar es contar".)

> **Actividad 1 · Cuenta tú (3 min).** Agrega un cuarto mensaje: `gratis clase ya` (normal). Vuelve a llenar la tabla en tu cuaderno. ¿Cuántas palabras tiene ahora la clase *normal*? ¿Cuál es el nuevo vocabulario?

<details><summary>Respuesta</summary>

Ahora hay dos mensajes normales (`hola clase ya` y `gratis clase ya`). La tabla queda:

| Palabra | En spam | En normal |
|---|---|---|
| gana | 2 | 0 |
| dinero | 1 | 0 |
| gratis | 1 | 1 |
| premio | 1 | 0 |
| ya | 1 | 2 |
| hola | 0 | 1 |
| clase | 0 | 2 |
| **Total** | **6** | **6** |

La clase *normal* pasa a tener **6 palabras**. El vocabulario **sigue en 7**, porque `gratis` ya existía: solo ganó una aparición en normal.

</details>

---

## Parte 3 · Probabilidades y comparación (10 min)

Queremos clasificar `gana gratis` con la tabla de los **tres** mensajes originales. Necesitamos dos cosas.

### Pieza A · ¿Qué tan probable es cada palabra en cada clase?

Pregunta: *"si el mensaje fuera spam, ¿qué tan probable es ver la palabra **gana**?"*

> **P(palabra en la clase) = (veces que apareció + 1) ÷ (palabras totales de la clase + tamaño del vocabulario)**

Ese **+ 1** se llama **suavizado de Laplace** (lo explicamos en la Parte 4).

| Palabra | En spam | En normal |
|---|---|---|
| gana | (2+1) ÷ (6+7) = **3/13** | (0+1) ÷ (3+7) = **1/10** |
| gratis | (1+1) ÷ (6+7) = **2/13** | (0+1) ÷ (3+7) = **1/10** |

Léelo así: *"gana"* es más probable en spam (3/13 ≈ 0,23) que en normal (1/10 = 0,10). Es una pista a favor de spam.

### Pieza B · ¿Cuánto spam llega en general? (la probabilidad previa)

Antes de mirar las palabras, ya sabes que 2 de 3 mensajes fueron spam. Con el mismo "+1":

- spam: (2 + 1) ÷ (3 + 2) = **3/5**
- normal: (1 + 1) ÷ (3 + 2) = **2/5**

### Comparar los dos puntajes

Multiplica la probabilidad previa por la de cada palabra:

```
Puntaje spam   = 3/5 × 3/13 × 2/13 = 0,0213
Puntaje normal = 2/5 × 1/10 × 1/10 = 0,0040

Probabilidad de spam = 0,0213 ÷ (0,0213 + 0,0040) = 0,84  →  84 %  →  SPAM
```

El puntaje de spam es unas 5 veces el de normal. Por eso el veredicto es **SPAM con 84 %**.

**Compruébalo en la calculadora:** 3÷5×3÷13×2÷13 debe darte 0,0213. Si te da otro valor, revisa que hiciste las divisiones y multiplicaciones en orden.

> **Actividad 2 · Hazlo tú (5 min).** Con la misma tabla de la Parte 2 (la de los **3** mensajes), calcula la probabilidad de spam de `hola clase`. Pista: ninguna de las dos palabras aparece en spam. Calcula puntaje spam, puntaje normal y la probabilidad. ¿Qué veredicto da?

<details><summary>Respuesta</summary>

- Cada palabra en spam: (0+1) ÷ (6+7) = **1/13**. Cada palabra en normal: (1+1) ÷ (3+7) = **2/10**.
- Puntaje spam = 3/5 × 1/13 × 1/13 = **0,0036**.
- Puntaje normal = 2/5 × 2/10 × 2/10 = **0,016**.
- Probabilidad de spam = 0,0036 ÷ (0,0036 + 0,016) = 0,0036 ÷ 0,0196 ≈ **0,18** → **NORMAL**.

Esta cifra (0,18) aparecerá otra vez en el módulo 06 y en las pruebas automáticas de la página. Si te dio algo muy distinto (por ejemplo, 0,82), probablemente intercambiaste spam y normal.

</details>

---

## Parte 4 · El truco del logaritmo y el suavizado (10 min)

### ¿Para qué el "+ 1"? (suavizado de Laplace)

Imagina que no existiera el +1 y llega el mensaje `gratis hola`. La palabra *hola* nunca apareció en spam: su probabilidad en spam sería **0 ÷ 13 = 0**. Y como multiplicamos, **todo el puntaje de spam se vuelve 0**, sin importar cuántas pistas de spam tenga el mensaje. Una sola palabra desconocida arruinaría el cálculo.

El **+ 1** dice: "nunca vi esta palabra en esta clase, pero no es *imposible*; le doy una probabilidad pequeña". Así ninguna probabilidad queda en 0.

Con el +1, `gratis hola` da:

```
Puntaje spam   = 3/5 × 2/13 × 1/13 = 0,0071
Puntaje normal = 2/5 × 1/10 × 2/10 = 0,0080
Probabilidad de spam = 0,0071 ÷ (0,0071 + 0,0080) = 0,47  →  47 %  →  NORMAL (por poco)
```

Una pista de spam (*gratis*) y una de normal (*hola*) casi se cancelan.

### ¿Para qué el logaritmo?

Con 20 palabras multiplicaríamos 20 números diminutos. Los computadores guardan los números con precisión limitada: si el resultado es *demasiado* pequeño, lo **redondean a 0** (se llama *underflow*). Con mensajes largos pasaría siempre.

La solución es matemática: el **logaritmo** convierte multiplicaciones en sumas.

> **log(a × b) = log(a) + log(b)**

Sumar números moderados es seguro. Mismo resultado, sin problemas.

Para `gana gratis`, usando logaritmo natural (la tecla `ln` de tu calculadora):

| Parte | Cálculo | Resultado |
|---|---|---|
| Puntaje spam | ln(3/5) + ln(3/13) + ln(2/13) | **−3,85** |
| Puntaje normal | ln(2/5) + ln(1/10) + ln(1/10) | **−5,52** |
| Diferencia | −3,85 − (−5,52) | **1,67** |

Y para volver a una probabilidad:

> **probSpam = 1 ÷ (1 + e^(−diferencia))**  →  1 ÷ (1 + e^(−1,67)) ≈ **0,84**

(El mismo 84 % de antes.) Esa es la fórmula que programarás en el módulo 06. Tu calculadora la tiene como `e^x` o `exp`.

**Compruébalo en la consola del navegador** (F12; en JavaScript, `Math.log` es el logaritmo natural, el `ln`, y `Math.exp` es `e^x`):

```js
const logSpam = Math.log(3/5) + Math.log(3/13) + Math.log(2/13);
const logNormal = Math.log(2/5) + Math.log(1/10) + Math.log(1/10);
1 / (1 + Math.exp(logNormal - logSpam))
```

**Deberías ver:** `0.8419083255378859`. (Con `logSpam` valiendo `-3.848964869461009` y `logNormal` `-5.521460917862246`.)

**Si no te sale…** si aparece `Identifier 'logSpam' has already been declared`, ya lo habías pegado: recarga con F5. Si da `NaN`, revisaste mal un paréntesis o escribiste una coma decimal en vez de un punto.

### Cada palabra como "aporte"

Mira la diferencia **palabra por palabra**: cuánto empuja cada una hacia spam.

| Pista | Cálculo | Aporte (hacia spam) |
|---|---|---|
| Probabilidad previa | ln(3/5) − ln(2/5) | +0,41 |
| gana | ln(3/13) − ln(1/10) | +0,84 |
| gratis | ln(2/13) − ln(1/10) | +0,43 |
| **Total** | | **+1,67** |

Esos **aportes** son los números rojos y verdes ("chips") que verás en la página cuando analices un mensaje. Un aporte positivo empuja hacia spam; uno negativo, hacia normal.

> **Actividad 3 · Cierre de la intuición (5 min).** Responde en tu cuaderno y luego compara:
> 1. ¿Qué crees que devuelve `Math.pow(0.001, 120)` (multiplicar 120 probabilidades de 0,001) y qué devuelve `120 * Math.log(0.001)`? Compruébalo en la consola.
> 2. ¿Por qué sumamos un 1 a todos los conteos y no solo a los que valen 0?
> 3. Si una palabra aparece 5 veces en spam y 5 veces en normal (con las mismas cantidades totales), ¿cuánto vale su aporte?

<details><summary>Respuesta</summary>

1. `Math.pow(0.001, 120)` devuelve `0` (*underflow*: el resultado es demasiado pequeño para el computador). `120 * Math.log(0.001)` devuelve `-828.9306334778564`, un número perfectamente manejable.
2. Se suma a todos para **no cambiar el orden** entre palabras ni favorecer a unas sobre otras: todas mantienen su comparación (sumar 1 a todo es parejo).
3. El aporte es **0**: las probabilidades son iguales en las dos clases, así que ln(a) − ln(a) = 0. Esa palabra no empuja a ningún lado.

</details>

---

## Parte 5 · Cierre (5 min)

Completa la frase en voz alta o por escrito: **"Entrenar es ____; clasificar es ____."**

<details><summary>Respuesta</summary>

Entrenar es **contar**; clasificar es **comparar puntajes** (sumar los logaritmos de las pistas de cada clase y ver cuál es mayor).

</details>

Con esto tienes **toda la matemática** del taller. En el módulo 06 solo la traducirás a JavaScript.

### Checkpoints: ¿cumpliste el módulo?

- [ ] Rellenaste la tabla de conteos para 3 mensajes (palabras: 6 y 3, vocabulario 7).
- [ ] Obtuviste 0,84 para `gana gratis` y ≈ 0,18 para `hola clase`.
- [ ] Puedes explicar con tus palabras el +1 y el logaritmo.
- [ ] Sabes cuál es la "pista" que más empuja a spam en `gana gratis` (es *gana*, con +0,84).

### Si no te sale… (errores comunes)

| Error | Cómo se corrige |
|---|---|
| Usar el total de mensajes en vez del total de **palabras** en el denominador de la Pieza A | Pieza A usa **palabras** de la clase; la probabilidad previa usa **mensajes** |
| Olvidar el +1 en el vocabulario | El denominador de la Pieza A es *palabras de la clase + vocabulario* |
| Olvidar la probabilidad previa | El puntaje arranca con ella (3/5 y 2/5) |
| Confundir `ln` con `log10` en la calculadora | Para volver con `e^x`, necesitas `ln`; las dos van juntas |
| Pensar que 84 % significa "84 % del mensaje es spam" | Significa: "con lo aprendido, hay 84 % de probabilidad de que este mensaje sea spam" |
| Decir "el modelo entendió" | Solo **contó** palabras |

### Quiz final (responde primero, despliega después)

**1. ¿Qué guarda el modelo después de entrenar?**

<details><summary>Respuesta</summary>

Una tabla de conteos: cuántas veces apareció cada palabra en cada clase, cuántas palabras tiene cada clase, cuántos mensajes hubo por clase y el vocabulario.

</details>

**2. ¿Qué pasaría con una palabra que nunca apareció en spam si no existiera el +1?**

<details><summary>Respuesta</summary>

Su probabilidad en spam sería 0 y anularía todo el puntaje de spam del mensaje, sin importar las demás pistas.

</details>

**3. ¿Por qué sumamos logaritmos en vez de multiplicar probabilidades?**

<details><summary>Respuesta</summary>

Para evitar el *underflow*: multiplicar muchos números diminutos da 0 en el computador; sumar sus logaritmos da el mismo resultado sin problema.

</details>

**4. En `gana gratis`, ¿qué pesa más: *gana* o *gratis*? ¿Por qué?**

<details><summary>Respuesta</summary>

*gana* (+0,84 frente a +0,43), porque aparece 2 veces en spam y *gratis* solo 1, con las mismas cantidades totales.

</details>

**5. ¿Qué significa que la probabilidad previa sea 3/5 para spam si había 2 de 3 mensajes spam?**

<details><summary>Respuesta</summary>

Es (2 + 1) ÷ (3 + 2): la proporción de spam con el "+1" de suavizado. Antes de mirar palabras, el detective ya "espera" más spam que normal.

</details>

### Resumen en 5 líneas

1. **Entrenar** = contar palabras por clase. El modelo es una tabla de conteos.
2. **Clasificar** = sumar logaritmos de las probabilidades de las palabras (más la previa) y comparar las dos clases.
3. **Ingenuo** = trata las palabras como independientes.
4. **Suavizado (+1)** evita probabilidades en 0; el **logaritmo** evita que los números diminutos se redondeen a 0.
5. Los **aportes** por palabra explican cada decisión; con los 3 mensajes: `gana gratis` → 0,84 (SPAM) y `hola clase` → 0,18 (NORMAL).

**Siguiente paso:** [Módulo 06 · Programa tu detective](./06-programa-tu-detective.md).
