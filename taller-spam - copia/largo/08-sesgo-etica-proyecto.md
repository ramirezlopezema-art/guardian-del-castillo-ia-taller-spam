# Módulo 08 · Sesgo, ética y proyecto final

> **Tiempo de estudio:** 70 min · **Anterior:** [Módulo 07](./07-evaluacion-honesta.md) · **Glosario:** [00-glosario.md](./00-glosario.md) · **Soluciones y autoevaluación final:** [99-soluciones-y-autoevaluacion.md](./99-soluciones-y-autoevaluacion.md) · **Ayuda:** [TALLER_LARGO.md](../TALLER_LARGO.md#cómo-estudiar-esto-solo)

**Meta de este módulo:** tu detective deja de ser un ejercicio y se vuelve una pregunta: **¿qué pasaría si de verdad decidiera por personas?** Provocarás sesgos a propósito, entenderás de dónde salen, pensarás en la privacidad, aplicarás una lista de chequeo y cerrarás el taller con un mini-proyecto y una reflexión por escrito.

## Antes de empezar: ¿estás listo?

**Recuerda del módulo anterior:** la exactitud puede engañar; fp y fn cuestan distinto según quién eres; el umbral cambia un error por otro; y la nota solo vale si el examen no se filtró al entrenamiento.

**Prepara tu detective:** abre `index.html`, pulsa **Ejecutar autocomprobación** y comprueba que ves `18 ✅ · 0 ❌ · 0 ⏳`. Si no, usa la solución como en el [módulo 07](./07-evaluacion-honesta.md#prepara-tu-detective-necesitas-uno-que-funcione) (guarda antes tu `modelo.js` con otro nombre).

**1. ¿Qué pasa con fp y fn al subir el umbral?**

<details><summary>Respuesta</summary>

Los fp bajan (se marca menos como spam) y los fn suben (se cuelan más spam).

</details>

**2. ¿Qué es una fuga de datos?**

<details><summary>Respuesta</summary>

Información del examen que se filtra al entrenamiento, y por eso infla la nota. Ejemplo: enseñarle al detective un mensaje del examen.

</details>

**3. Un modelo acierta el 99 %. ¿Qué dos preguntas haces antes de creerlo?**

<details><summary>Respuesta</summary>

"¿Cómo están repartidas las clases?" y "¿qué errores comete: falsos positivos o falsos negativos?".

</details>

## Objetivos

- [ ] Explicar por qué **quien etiqueta** los datos influye en el modelo.
- [ ] Provocar un **sesgo** en tu detective usando los controles de la página y explicar de dónde sale.
- [ ] Nombrar los riesgos de **privacidad** de un filtro de mensajes y las buenas prácticas.
- [ ] Aplicar una **lista de chequeo** de IA responsable a tu proyecto.
- [ ] Completar un **reto final** y escribir tu reflexión de una página.

## Mapa de tiempos (estudio estimado)

| Parte | Tema | Minutos |
|---|---|---|
| 1 | ¿Quién decide qué es spam? | 10 |
| 2 | Rompe el modelo: sesgo en la página | 15 |
| 3 | Privacidad de los mensajes | 10 |
| 4 | Descanso | 5 |
| 5 | IA responsable: principios y lista de chequeo | 5 |
| 6 | Proyecto final: elige un reto | 15 |
| 7 | Reflexión final por escrito, quiz y resumen | 10 |
| | **Total** | **70** |

---

## Parte 1 · ¿Quién decide qué es spam? (10 min)

Tu detective aprendió de 60 mensajes, y **una persona** puso la etiqueta de cada uno. El modelo no sabe qué es "spam": solo repite el criterio de quien etiquetó.

> **Actividad 1 · Etiqueta tú, dos veces (7 min).** En papel, etiqueta estos 8 mensajes como `spam`, `normal` o `depende`. Luego **vuelve a etiquetarlos pensando en otra persona** (por ejemplo, tu abuela, una vendedora de un mercado o un estudiante de colegio). Cuenta en cuántos mensajes tu etiqueta **cambió** al cambiar de persona.
>
> | # | Mensaje |
> |---|---|
> | 1 | Suscríbete a nuestro boletín semanal de ofertas de tecnología *(te habías suscrito)* |
> | 2 | Tu pedido fue enviado, sigue tu paquete en este enlace |
> | 3 | Gana 100 puntos en el juego completando la misión de hoy |
> | 4 | Vota por mi candidato este domingo, tu voz cuenta |
> | 5 | Vendo tamales ricos para todo el barrio, escríbeme al WhatsApp del conjunto |
> | 6 | Oferta de trabajo: auxiliar de bodega, escríbenos con tu hoja de vida |
> | 7 | Tu amigo te invitó a ganar dinero fácil con su negocio de cosméticos |
> | 8 | Recordatorio: tu cita médica es mañana a las 8, confirma respondiendo SÍ |

<details><summary>Respuesta</summary>

No hay etiquetas "oficiales": el ejercicio demuestra justamente eso. Lo esperable es que tu etiqueta cambie en varios de estos mensajes, sobre todo el 1, 3, 4, 5, 6 y 7. Por ejemplo, la vendedora de tamales (5) vive de ese tipo de mensajes; el aviso médico (8) es muy útil para quien tiene la cita, pero se parece a un phishing.

Si tus etiquetas no cambiaron nunca, prueba con una persona con una vida muy distinta a la tuya.

Moraleja: **"spam" depende de la persona y del contexto.** Si cada quien etiqueta distinto, el modelo aprenderá una mezcla confusa. Más abajo verás qué decide tu detective con cada mensaje.

</details>

**Pregunta para pensar y escribir:** ¿quiénes etiquetaron los datos de los filtros de spam que usan millones de personas? ¿De qué país, edad, idioma?

---

## Parte 2 · Rompe el modelo: sesgo en la página (15 min)

Un **sesgo** es una tendencia injusta del sistema a favorecer o perjudicar a ciertos grupos. La IA no es mala por intención: **aprende los prejuicios que hay en sus datos**. Vamos a provocarlos a propósito.

### Experimento 1 · Un dataset sesgado

1. Activa la casilla **"Cargar dataset sesgado"** (panel 3). **Deberías ver:** `30` ejemplos de spam, `3` normales y `210` palabras conocidas.
2. Pulsa **Tomar el examen**.

**Deberías ver:** exactitud **65%** (`13 aciertos de 20`), con vp 10, fn 0, **fp 7** y vn 3. Casi todo lo normal se marca como spam.

3. Prueba `Hola, ¿vamos a estudiar mañana en la biblioteca?`: antes salía NORMAL (0.6%); ahora sale **SPAM** con `Probabilidad de spam: 51.7%`.

> **Qué pasó:** como casi no vio mensajes normales, no sabe cómo suena una conversación cotidiana. **Lo que no está en los datos, el modelo no lo conoce.**

### Experimento 2 · Quitar una clase completa

Pulsa **Restaurar datos originales**. Luego:

| Qué haces | Resultado esperado |
|---|---|
| **Quitar todo lo normal** y tomar el examen | **50%**: todo se marca como spam (vp 10, fn 0, fp 10, vn 0) |
| Restaurar, **Quitar todo el spam** y tomar el examen | **50%**: nada se marca como spam (vp 0, fn 10, fp 0, vn 10) |

### Experimento 3 · Tu propio criterio

Restaura. Escribe el mensaje `Suscríbete a nuestro boletín semanal de ofertas de tecnología` y pulsa **Analizar**: sale SPAM con `66.3%`. Tú, que sí te suscribiste, sabes que es un mensaje que quieres. Pulsa **Es NORMAL** una vez, y observa la nueva probabilidad. Repítelo para ver qué pasa con más ejemplos.

**Deberías ver:** `66.3%` al inicio; tras **1** vez, `2%`; tras **2**, `0.2%`; tras **3**, `0%`. **El modelo tomó tu criterio.** Después pulsa **Restaurar datos originales** para borrar tus ejemplos.

### Experimento 4 · ¿A quiénes perjudica?

Restaura y prueba mensajes **legítimos** que usan palabras típicas del spam, y anota qué decide el detective y con qué probabilidad:

- `Tu pedido fue enviado, sigue tu paquete en este enlace`
- `Oferta de trabajo: auxiliar de bodega, escríbenos con tu hoja de vida`
- `Suscríbete a nuestro boletín semanal de ofertas de tecnología`
- Un mensaje **con la jerga de tu región** o con errores de ortografía.

**Deberías ver:** los tres primeros se marcan como **SPAM**: `99.6%`, `77.7%` y `66.3%`. El detective no distingue una compra real, una oferta de trabajo real o un boletín del spam: reconoce **palabras**, no **intenciones**.

Con la jerga, fíjate qué pasa con las palabras que no conoce: el detective las **ignora**. Con `Parce, mañana nos vemos en la u` sale NORMAL `4.1%`; con `Bro, mándame el link de la presentación`, NORMAL `4.1%`; con `Uy, qué chimba la fiesta de ayer`, NORMAL `1%`; con `Wey, pásame la tarea por el grupo`, NORMAL `0.2%`. Y `Gratiz` (con falta de ortografía) da `50%` NORMAL: no la reconoce.

**Si no te sale…** si los números no coinciden, probablemente quedó activado el dataset sesgado, una clase quitada o ejemplos que le enseñaste: pulsa **Restaurar datos originales** y repite.

> **Actividad 2 · ¿Quién paga? (5 min).** Para cada mensaje legítimo marcado como spam, escribe **quién pierde** y qué pierde (una oferta de trabajo, un pedido, un aviso médico). ¿Es lo mismo perder esos mensajes para una persona con muchos recursos que para una que depende de ese trabajo?

<details><summary>Respuesta</summary>

Ideas de respuesta (la tuya puede variar):

- **Oferta de trabajo marcada como spam:** pierde quien busca empleo y depende de ese ingreso; es el caso más grave.
- **Pedido enviado:** pierde quien compró y no ve que su paquete llegó (puede perder la entrega o pensar que lo estafaron).
- **Boletín al que te suscribiste:** pierde quien quería esa información; el costo es bajo para la mayoría.
- **Aviso médico:** puede perderse una cita o un tratamiento.

No es lo mismo para todos: una persona con muchos recursos puede buscar otras vías; quien depende de ese mensaje (un trabajo, un trámite) pierde más. **Los errores del modelo no se reparten parejo.** Eso es un daño por sesgo.

</details>

### De dónde viene el sesgo

| Origen | Ejemplo en tu detective |
|---|---|
| **Datos incompletos** | Muy pocos mensajes normales → casi todo es spam |
| **Datos con prejuicios** | Si quien etiquetó consideró "spam" toda oferta de trabajo, el modelo aprende eso |
| **Diseño** | Quien elige las palabras del léxico, el umbral o qué medir también pone su visión |

**Casos reales para investigar** (¡busca la fuente, no confíes en mi resumen!):

- **Herramienta de contratación de Amazon (2018):** según informó Reuters, la empresa dejó de usar un sistema de selección de hojas de vida que penalizaba a las mujeres, porque aprendió de contrataciones pasadas.
- **Reconocimiento facial (*Gender Shades*, 2018):** la investigadora Joy Buolamwini mostró que varios sistemas comerciales fallaban mucho más con mujeres de piel oscura.
- **Algoritmo COMPAS (EE. UU.):** ProPublica analizó una herramienta que estimaba el riesgo de reincidencia y encontró errores distintos según el grupo étnico.

---

## Parte 3 · Privacidad de los mensajes (10 min)

Un filtro de spam real **tiene que leer mensajes** de personas. Eso plantea preguntas serias.

Los **datos personales** son cualquier información que identifica a alguien: nombre, voz, ubicación, contactos y, claro, **el contenido de sus mensajes**.

### ¿Dónde corre tu detective?

Todo corre **en tu navegador**: ningún mensaje sale de tu computador. Esa es una decisión de diseño con efectos de privacidad. Compárala con las otras opciones:

| Opción | ¿Sale el mensaje de tu computador? |
|---|---|
| Tu detective (en el navegador) | No |
| Un servicio de IA en la nube | Sí: viaja a un servidor ajeno |
| Un asistente de chat | Sí: lo recibe la empresa del asistente |

(Por eso en el [módulo 04](./04-chatbots-y-llm.md) se te pidió pegar solo los 20 mensajes inventados.)

### Buenas prácticas de privacidad

- **Minimización:** pide y guarda solo lo necesario. Si para entrenar no hace falta el nombre del remitente, no lo guardes.
- **Consentimiento:** avisa qué datos recoges, para qué y con quién se comparten, y pide permiso.
- **No guardes** lo que no necesitas y bórralo cuando ya no sirva.
- **Protege** las claves y los datos; nunca los dejes en código público.
- **Conoce la ley:** por ejemplo, en Colombia la Ley 1581 de 2012 protege los datos personales (el llamado *habeas data*) y da derecho a conocer, corregir y eliminar tu información. Busca cuál aplica en tu país.

> **Actividad 3 · Entrena sin invadir (5 min).** Una empresa quiere entrenar su filtro con los mensajes reales de sus usuarios. Escribe **3 condiciones** que pondrías antes de aceptar (por ejemplo: pedir permiso, quitar nombres y números, guardarlos poco tiempo). ¿Qué pasa si un usuario pide que borren sus mensajes? ¿Cómo "desaprende" un modelo?

<details><summary>Respuesta</summary>

Condiciones válidas (elige tres o propón otras justificadas): pedir **permiso** claro y fácil de retirar; **anonimizar** (quitar nombres, teléfonos, direcciones); **guardar** los mensajes poco tiempo; permitir **borrarlos**; usar solo lo necesario (minimización); proteger el acceso a los datos.

Si un usuario pide borrar sus mensajes, hay que eliminarlos de la base de datos. Pero **un modelo ya entrenado no "desaprende" solo**: la forma segura es **reentrenarlo** sin esos datos. Por eso conviene decidir desde el principio qué se guarda y por cuánto tiempo.

</details>

---

## Parte 4 · Descanso (5 min)

Estira las piernas. Al volver: una lista que podrás usar en cualquier proyecto de IA.

---

## Parte 5 · IA responsable: principios y lista de chequeo (5 min)

| Principio | Qué significa | En tu detective |
|---|---|---|
| **Transparencia** | El usuario sabe que hay una IA y cómo se usan sus datos | Avisar "este mensaje fue marcado por un filtro automático" |
| **Justicia** | Probar que funcione bien para **todos** | Probar con distintos tipos de mensajes, jergas y personas |
| **Privacidad** | Proteger y minimizar los datos | Que corra en el navegador y no guarde mensajes |
| **Supervisión humana** | Una persona puede revisar y corregir | Poder rescatar un mensaje de la carpeta de spam |
| **Responsabilidad** | Hay una persona u organización que responde | "Fue la IA" no es excusa |

### Lista de chequeo antes de publicar un filtro

- [ ] ¿Medí **fp y fn** por separado, y no solo la exactitud?
- [ ] ¿Revisé cómo están **repartidas las clases** en los datos?
- [ ] ¿Probé con mensajes **legítimos** que parecen spam (pedidos, ofertas de trabajo, avisos médicos)?
- [ ] ¿Hay una forma de **recuperar** un mensaje bueno que se marcó como spam?
- [ ] ¿Quién **etiquetó** los datos y qué visión puede faltar?
- [ ] ¿Los datos de **prueba** estaban separados y nadie los miró para ajustar?
- [ ] ¿Qué datos personales usa y tengo **permiso** para usarlos?

**Aplícala a tu detective (2 min):** marca en papel cuáles casillas puedes marcar *honestamente* hoy. Verás que tu detective cumple pocas: es un ejercicio, no un producto.

---

## Parte 6 · Proyecto final: elige un reto (15 min)

Elige **un reto** (o varios, si te sobra tiempo) y trabaja en él. Deja la página funcionando. Al terminar, rellenarás tu reflexión de una página (Parte 7).

> **Antes de empezar:** guarda una copia de seguridad (`modelo.js` y los archivos que vayas a tocar), como en [Guardar tu progreso](../TALLER_LARGO.md#3-cómo-guardar-tu-progreso). Si algo se rompe, copias de vuelta.

| Reto | Qué haces | Dificultad |
|---|---|---|
| **Umbral deslizante** | Agrega un control deslizante (`<input type="range">`) en `index.html` y pasa su valor como tercer parámetro de `clasificar` desde `app.js`. Muestra qué pasa con `fp` y `fn` | Fácil |
| **Palabras vacías** | Elimina palabras muy comunes (`de`, `la`, `el`, `tu`, `ya`...) antes de contar, dentro de `tokenizar`. ¿Cambia la exactitud? | Medio |
| **Bigramas** | En `tokenizar`, además de cada palabra, agrega pares de palabras consecutivas: `"premio_gratis"`. ¿Mejora el examen? | Medio |
| **Reglas mejoradas** | Mejora `reglas.js` mirando solo `ENTRENAMIENTO`; compara con tu detective en el panel 5 | Medio |
| **Tu dataset** | Agrega 10 mensajes tuyos (5 spam, 5 normales) a `ENTRENAMIENTO` en `datos.js` y mide el cambio. Cuidado: no repitas mensajes de `PRUEBA` | Medio |

### Pistas

- Para el **umbral**, en `app.js` busca dónde se llama `clasificar(texto, estado.modelo)` y añade el tercer parámetro (`clasificar(texto, estado.modelo, umbral)`). El valor sale del control con `Number($("mi-control").value)`.
- Para las **palabras vacías**: dentro de `tokenizar`, filtra con `.filter(...)` las palabras que estén en una lista.
- Para los **bigramas**: recorre las palabras y, por cada posición `i`, agrega `palabras[i] + "_" + palabras[i + 1]`.
- **Mide siempre** antes y después con el examen, y anota los dos números. Si el cambio no mejora, **cuéntalo igual**: es un resultado válido.

<details><summary>Ayuda paso a paso: Palabras vacías</summary>

Reemplaza `tokenizar` en `modelo.js` por esta versión (y la lista arriba de la función):

```js
const PALABRAS_VACIAS = ["de", "la", "el", "en", "que", "y", "los", "las", "un", "una", "para", "con", "por", "tu", "te", "mi", "me", "se", "es", "al", "del", "ya", "no"];

function tokenizar(texto) {
  const limpio = normalizar(texto);
  if (limpio === "") return [];
  return limpio.split(" ").filter(function (p) { return p.length >= 2 && !PALABRAS_VACIAS.includes(p); });
}
```

Guarda, recarga y pulsa **Tomar el examen**. **Deberías ver:** exactitud **85%** (vp 9, fn 1, **fp 2**, vn 8) y 325 palabras conocidas. Quitar palabras de relleno **no siempre mejora**: aquí empeoró (de 90 % a 85 %). Anótalo igual.

**Aviso:** la Autocomprobación marcará ❌ en `tokenizar` y en algunas pruebas mientras tengas esta versión (las pruebas usan `ya`, que ahora se elimina). Es esperado: al terminar el reto, restaura tu copia de `modelo.js`.

</details>

<details><summary>Ayuda paso a paso: Bigramas</summary>

```js
function tokenizar(texto) {
  const limpio = normalizar(texto);
  if (limpio === "") return [];
  const palabras = limpio.split(" ").filter(function (p) { return p.length >= 2; });
  const resultado = palabras.slice();
  for (let i = 0; i < palabras.length - 1; i++) resultado.push(palabras[i] + "_" + palabras[i + 1]);
  return resultado;
}
```

Guarda, recarga y toma el examen. **Deberías ver:** exactitud **90%** (igual que antes) y **921** palabras conocidas (el vocabulario creció mucho). Más información no siempre mejora el resultado. Como arriba, la Autocomprobación mostrará ❌ mientras uses esta versión.

</details>

<details><summary>Ayuda paso a paso: Umbral deslizante</summary>

1. En `index.html`, dentro del panel 1 (después de la fila del botón **Analizar**), agrega:

   ```html
   <label>Umbral: <input type="range" id="umbral" min="0.05" max="0.99" step="0.01" value="0.5"> <span id="umbral-valor">0.5</span></label>
   ```

2. En `app.js`, en la función `analizar`, cambia `clasificar(texto, estado.modelo)` por `clasificar(texto, estado.modelo, Number($("umbral").value))`.
3. En `iniciar()` agrega: `$("umbral").addEventListener("input", function () { $("umbral-valor").textContent = $("umbral").value; analizar(); });`

Guarda, recarga y escribe un mensaje dudoso (por ejemplo, el de Camila). **Deberías ver:** al bajar el control por debajo de 0.41, Camila pasa a SPAM; arriba de 0.41 sigue NORMAL. Para ver `fp` y `fn` de todo el examen con un umbral, usa en la consola la función `examenConUmbral` del módulo 07 (la tabla de ese módulo es tu referencia).

**Si no te sale…** si el control no hace nada, revisa que el `id` en `index.html` (`umbral`) sea idéntico al que usas en `app.js`.

</details>

<details><summary>Ayuda: Tu dataset (cómo comprobar que no hay fuga de datos)</summary>

Después de agregar tus 10 mensajes a `ENTRENAMIENTO` en `datos.js`, pega en la consola:

```js
ENTRENAMIENTO.filter(e => PRUEBA.some(p => p.texto === e.texto)).length
```

**Deberías ver:** `0`. Si ves otro número, repetiste mensajes del examen: bórralos de `ENTRENAMIENTO`. Mide el examen antes y después de agregar tus mensajes y anota ambos números.

**Aviso:** `datos.js` debe seguir siendo JavaScript válido: cada mensaje va en `{ texto: "...", etiqueta: "spam" }` y separado por comas.

</details>

<details><summary>Ayuda: Reglas mejoradas</summary>

Sigue la Actividad 4 del [módulo 03](./03-texto-y-reglas.md): mira solo `ENTRENAMIENTO`, agrega palabras a `LEXICO_SPAM`, y recién al final mide en `PRUEBA`. Para comparar con tu detective usa el botón **Comparar en el examen** del panel 5.

</details>

### Cómo saber si tu reto salió bien (autoevaluación)

| Pregunta | Sí / No |
|---|---|
| ¿La página sigue abriendo y funcionando después de mi cambio? | |
| ¿Anoté la exactitud **antes** y **después** (aunque no mejorara)? | |
| ¿Puedo explicar con mis palabras qué hace el código que cambié? | |
| ¿Encontré al menos un caso que **sigue fallando**? | |
| ¿Identifiqué un riesgo ético concreto y una medida para reducirlo? | |

Si respondiste "Sí" a las cinco, tu reto está completo.

---

## Parte 7 · Reflexión final por escrito, quiz y resumen (10 min)

### Tu reflexión de una página

Nadie te va a evaluar en voz alta: esta reflexión es **por escrito** y para ti. Copia esta plantilla en un documento (o en tu cuaderno) y complétala. Escribe frases completas; entre 1 y 3 líneas por punto.

```text
MI REFLEXIÓN FINAL · Detective de mensajes

1. El reto que elegí: ____________________________________________
2. Qué cambié (en una frase): _____________________________________
3. Exactitud en el examen antes: ______   después: ______
4. Un mensaje que mi detective sigue fallando, y por qué creo que falla:
   ______________________________________________________________
5. Un riesgo ético que vi (por ejemplo: quién pierde cuando se equivoca):
   ______________________________________________________________
6. Una medida concreta para reducir ese riesgo:
   ______________________________________________________________
7. Lo que más me sorprendió de todo el taller:
   ______________________________________________________________
8. Si tuviera una semana más, mejoraría: ___________________________
```

**Cómo saber si tu reflexión está bien:** cada punto menciona algo **concreto** (un mensaje, un número, una persona afectada), no una frase vaga como "la IA es peligrosa". Si algún punto quedó vago, reescríbelo con un ejemplo.

### Preguntas de cierre del taller

Responde por escrito y luego despliega la respuesta modelo para comparar.

**1. ¿Qué "aprendió" exactamente tu modelo? ¿Entiende lo que dice un mensaje?**

<details><summary>Respuesta</summary>

Aprendió **conteos de palabras por clase**. No entiende el significado: reconoce palabras, no intenciones.

</details>

**2. ¿Quién decidió lo que el modelo considera spam?**

<details><summary>Respuesta</summary>

Quien reunió y etiquetó los datos (más quien diseñó el modelo, el umbral y la forma de medir). El modelo solo repite ese criterio.

</details>

**3. Si el 99 % de los mensajes es normal y tu filtro acierta el 99 %, ¿está bien? ¿Qué más preguntas?**

<details><summary>Respuesta</summary>

No necesariamente: un filtro que siempre dice "normal" acierta el 99 % y no atrapa ningún spam. Hay que preguntar cómo están repartidas las clases y qué tipo de error comete (fp o fn).

</details>

**4. ¿Es mejor que un filtro se equivoque dejando pasar spam o bloqueando mensajes buenos?**

<details><summary>Respuesta</summary>

Depende del contexto y de quién paga el error: para un correo personal suele ser peor bloquear mensajes buenos; para un banco, dejar pasar un fraude.

</details>

**5. ¿Qué dato tuyo no quisieras que usara un filtro? ¿Con qué condiciones dirías que sí?**

<details><summary>Respuesta</summary>

Respuesta personal. Condiciones habituales: que pidan **permiso**, que usen solo lo **necesario**, que lo **anonimicen**, que lo guarden **poco tiempo** y que puedas **pedir que lo borren**.

</details>

**6. ¿Cuál de estas opciones explica mejor el sesgo que provocaste en el Experimento 1? (a) un programador quiso discriminar; (b) los datos tenían pocos mensajes normales; (c) la computadora falló.**

<details><summary>Respuesta</summary>

**(b).** El sesgo salió de datos incompletos, no de una intención. Por eso se revisa cómo están repartidas las clases y quién etiquetó.

</details>

### Checkpoints: ¿cumpliste el módulo?

- [ ] Dataset sesgado → 65%, `fp: 7`; la frase de la biblioteca sale SPAM (51.7%).
- [ ] Sin lo normal / sin el spam → 50% en ambos casos.
- [ ] Mensajes legítimos con palabras de spam salen marcados como spam.
- [ ] Marcaste la lista de chequeo con al menos 5 casillas conscientes.
- [ ] Completaste tu reflexión de una página.

### Si no te sale… (errores comunes)

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Después de los experimentos nada coincide con lo esperado | Quedó activado el dataset sesgado o una clase quitada | Pulsa **Restaurar datos originales** |
| Exactitud 100 % tras enseñarle mensajes | Le enseñaste mensajes del examen | Restaura; es fuga de datos (módulo 07) |
| El control deslizante no hace nada | No pasaste el valor a `clasificar` o el `id` no coincide | Revisa el `id` en `index.html` y en `app.js` |
| La página se rompe al tocar `tokenizar` | Error de sintaxis | Mira la consola (**F12**); deshaz el último cambio (o copia tu respaldo) |
| "El sesgo es culpa del programador" | Puede venir de los datos, de quien etiqueta o del diseño | Revisa la tabla "de dónde viene el sesgo" |

### Resumen en 5 líneas

1. El modelo repite el criterio de **quien etiquetó** y de **lo que hay en los datos**.
2. Datos incompletos o desbalanceados producen sesgos visibles; en la página los provocaste (65 %, 50 %).
3. Un filtro lee mensajes privados: **minimiza, pide permiso, protege**.
4. La lista de chequeo (fp y fn, datos, privacidad, supervisión humana) debe preceder a cualquier publicación.
5. Medir antes y después, y contar incluso los resultados que no mejoran, es parte de la ética del trabajo.

**Fin del taller.** Ahora haz tu [autoevaluación final](./99-soluciones-y-autoevaluacion.md#autoevaluación-final-ya-puedes), consulta los números esperados si quieres comparar y repasa el [glosario](./00-glosario.md). Felicitaciones: llegaste al final por tu cuenta.
