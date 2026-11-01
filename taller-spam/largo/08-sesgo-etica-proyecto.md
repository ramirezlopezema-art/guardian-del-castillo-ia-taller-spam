# Módulo 08 · Sesgo, ética y proyecto final

> **Curso:** Detective de mensajes ([índice del taller largo](../TALLER_LARGO.md)) · **Duración:** 70 min · **Anterior:** [Módulo 07](./07-evaluacion-honesta.md) · **Glosario:** [00-glosario.md](./00-glosario.md)

## Antes de empezar

**Recuerda del módulo anterior:** la exactitud puede engañar; fp y fn cuestan distinto según quién eres; el umbral cambia un error por otro; y la nota solo vale si el examen no se filtró al entrenamiento.

Si llegas solo con este módulo, necesitas un detective funcionando: copia `soluciones/modelo.solucion.js` encima de `modelo.js` y abre `index.html`. Verás los paneles de ejemplos, de datos y de examen que usaremos hoy.

Este es el módulo en que tu detective deja de ser un ejercicio y se vuelve una pregunta: **¿qué pasaría si de verdad decidiera por personas?**

## Objetivos

- [ ] Explicar por qué **quien etiqueta** los datos influye en el modelo.
- [ ] Provocar un **sesgo** en tu detective usando los controles de la página y explicar de dónde sale.
- [ ] Nombrar los riesgos de **privacidad** de un filtro de mensajes y las buenas prácticas.
- [ ] Aplicar una **lista de chequeo** de IA responsable a tu proyecto.
- [ ] Presentar un **reto final** (y cerrar el taller con una mini-presentación).

## Mapa de tiempos

| Parte | Tema | Minutos |
|---|---|---|
| 1 | ¿Quién decide qué es spam? | 10 |
| 2 | Rompe el modelo: sesgo en la página | 15 |
| 3 | Privacidad de los mensajes | 10 |
| 4 | Descanso | 5 |
| 5 | IA responsable: principios y lista de chequeo | 5 |
| 6 | Proyecto final: elige un reto | 15 |
| 7 | Mini-presentaciones y cierre | 10 |
| | **Total** | **70** |

---

## Parte 1 · ¿Quién decide qué es spam? (10 min)

Tu detective aprendió de 60 mensajes, y **una persona** puso la etiqueta de cada uno. El modelo no sabe qué es "spam": solo repite el criterio de quien etiquetó.

> **Actividad 1 · Etiqueta tú (7 min, en parejas).** Cada uno etiqueta **por separado** estos 8 mensajes como `spam`, `normal` o `depende`. Luego comparen y cuenten en cuántos **no** coincidieron.
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

Si no se pusieron de acuerdo en todos, no es que uno se equivoque: **"spam" depende de la persona y del contexto**. Si cada quien etiqueta distinto, el modelo aprenderá una mezcla confusa.

**Pregunta para pensar:** ¿quiénes etiquetaron los datos de los filtros de spam que usan millones de personas? ¿De qué país, edad, idioma?

---

## Parte 2 · Rompe el modelo: sesgo en la página (15 min)

Un **sesgo** es una tendencia injusta del sistema a favorecer o perjudicar a ciertos grupos. La IA no es mala por intención: **aprende los prejuicios que hay en sus datos**. Vamos a provocarlos a propósito.

### Experimento 1 · Un dataset sesgado

1. Activa la casilla **"Cargar dataset sesgado"** (panel 3). Quedan 30 spam y solo 3 normales.
2. Pulsa **Tomar el examen**.

**Checkpoint · deberías ver:** exactitud **65 %**, con **7 falsos positivos** (`fp: 7`). Casi todo lo normal se marca como spam.

3. Prueba `Hola, ¿vamos a estudiar mañana en la biblioteca?`: antes salía NORMAL (0,6 %); ahora sale **SPAM** (51,7 %).

> **Qué pasó:** como casi no vio mensajes normales, no sabe cómo suena una conversación cotidiana. **Lo que no está en los datos, el modelo no lo conoce.**

### Experimento 2 · Quitar una clase completa

Pulsa **Restaurar datos originales**. Luego:

| Qué haces | Resultado esperado |
|---|---|
| **Quitar todo lo normal** y tomar el examen | **50 %**: todo se marca como spam |
| Restaurar, **Quitar todo el spam** y tomar el examen | **50 %**: nada se marca como spam |

### Experimento 3 · Tu propio criterio

Restaura. Escribe un mensaje que **tú** consideres normal pero que parezca spam (por ejemplo, el boletín del que sí te suscribiste) y pulsa **Es NORMAL** varias veces con variaciones. Después, escribe mensajes parecidos. ¿Cambió su decisión? **El modelo tomó tu criterio.**

### Experimento 4 · ¿A quiénes perjudica?

Restaura y prueba mensajes **legítimos** que usan palabras típicas del spam, y anota qué decide el detective y con qué probabilidad:

- `Tu pedido fue enviado, sigue tu paquete en este enlace`
- `Oferta de trabajo: auxiliar de bodega, escríbenos con tu hoja de vida`
- `Suscríbete a nuestro boletín semanal de ofertas de tecnología`
- Un mensaje **con la jerga de tu región** o con errores de ortografía.

**Checkpoint · deberías ver:** los tres primeros se marcan como **SPAM** (66 % a 99 % según el mensaje). El detective no distingue una compra real, una oferta de trabajo real o un boletín del spam: reconoce **palabras**, no **intenciones**. Con la jerga, fíjate qué pasa con las palabras que no conoce: el detective las **ignora**.

> **Actividad 2 · ¿Quién paga? (5 min, en grupos).** Para cada mensaje legítimo marcado como spam, escriban **quién pierde** y qué pierde (una oferta de trabajo, un pedido, un aviso médico). ¿Es lo mismo perder esos mensajes para una persona con muchos recursos que para una que depende de ese trabajo?

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

| Opción | ¿Sale el mensaje de tu equipo? |
|---|---|
| Tu detective (en el navegador) | No |
| Un servicio de IA en la nube | Sí: viaja a un servidor ajeno |
| Un asistente de chat | Sí: lo recibe la empresa del asistente |

(Por eso en el [módulo 04](./04-chatbots-y-llm.md) te pedimos pegar solo los 20 mensajes inventados.)

### Buenas prácticas de privacidad

- **Minimización:** pide y guarda solo lo necesario. Si para entrenar no hace falta el nombre del remitente, no lo guardes.
- **Consentimiento:** avisa qué datos recoges, para qué y con quién se comparten, y pide permiso.
- **No guardes** lo que no necesitas y bórralo cuando ya no sirva.
- **Protege** las claves y los datos; nunca los dejes en código público.
- **Conoce la ley:** por ejemplo, en Colombia la Ley 1581 de 2012 protege los datos personales (el llamado *habeas data*) y da derecho a conocer, corregir y eliminar tu información. Busca cuál aplica en tu país.

> **Actividad 3 · Entrena sin invadir (5 min, en parejas).** Una empresa quiere entrenar su filtro con los mensajes reales de sus usuarios. Escriban **3 condiciones** que pondrían antes de aceptar (por ejemplo: pedir permiso, quitar nombres y números, guardarlos poco tiempo). ¿Qué pasa si un usuario pide que borren sus mensajes? ¿Cómo "desaprende" un modelo?

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

---

## Parte 6 · Proyecto final: elige un reto (15 min)

Elige **un reto** (o varios, si te sobra tiempo) y trabaja solo o en pareja. Deja la página funcionando.

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

**Entregable del reto (media hoja):** (1) qué cambiaste, (2) exactitud antes y después, (3) un caso que sigue fallando, (4) un riesgo ético que viste.

---

## Parte 7 · Mini-presentaciones y cierre (10 min)

Cada grupo (o pareja) tiene **1 a 2 minutos**:

1. **Qué reto elegiste** y qué cambió en la exactitud (antes → después).
2. **Una falla** de tu detective.
3. **Una medida** para que no le haga daño a nadie.

### Preguntas de cierre del taller

1. ¿Qué "aprendió" exactamente tu modelo? ¿Entiende lo que dice un mensaje?
2. ¿Quién decidió lo que el modelo considera spam?
3. Si el 99 % de los mensajes es normal y tu filtro acierta el 99 %, ¿está bien? ¿Qué más preguntas?
4. ¿Es mejor que un filtro se equivoque dejando pasar spam o bloqueando mensajes buenos? ¿De qué depende?
5. ¿Qué dato tuyo no quisieras que usara un filtro? ¿Con qué condiciones dirías que sí?

---

## Checkpoints

- [ ] Dataset sesgado → 65 %, `fp: 7`; la frase de la biblioteca sale SPAM (51,7 %).
- [ ] Sin lo normal / sin el spam → 50 % en ambos casos.
- [ ] Mensajes legítimos con palabras de spam salen marcados como spam.
- [ ] Marcaste la lista de chequeo con al menos 5 casillas conscientes.
- [ ] Entregaste tu media hoja del reto.

## Errores comunes

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Después de los experimentos nada coincide con lo esperado | Quedó activado el dataset sesgado o una clase quitada | Pulsa **Restaurar datos originales** |
| Exactitud 100 % tras enseñarle mensajes | Le enseñaste mensajes del examen | Restaura; es fuga de datos (módulo 07) |
| El control deslizante no hace nada | No pasaste el valor a `clasificar` o el `id` no coincide | Revisa el `id` en `index.html` y en `app.js` |
| La página se rompe al tocar `tokenizar` | Error de sintaxis | Mira la consola (**F12**); deshaz el último cambio |
| "El sesgo es culpa del programador" | Puede venir de los datos, de quien etiqueta o del diseño | Revisa la tabla "de dónde viene el sesgo" |

## Resumen

- El modelo repite el criterio de **quien etiquetó** y de **lo que hay en los datos**.
- Datos incompletos o desbalanceados producen sesgos visibles; en la página los provocaste.
- Un filtro lee mensajes privados: **minimiza, pide permiso, protege**.
- La lista de chequeo (fp y fn, datos, privacidad, supervisión humana) debe preceder a cualquier publicación.
- Medir antes y después, y contar incluso los resultados que no mejoran, es parte de la ética del trabajo.

**Fin del taller.** Vuelve al [índice](../TALLER_LARGO.md) para revisar tu lista de logros y al [glosario](./00-glosario.md) para repasar los términos.
