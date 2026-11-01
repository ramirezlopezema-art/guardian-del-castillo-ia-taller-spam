# Módulo 01 · ¿Qué es la inteligencia artificial?

> **Tiempo de estudio:** 50 min · **Siguiente:** [Módulo 02 · Redes neuronales](./02-redes-neuronales.md) · **Glosario:** [00-glosario.md](./00-glosario.md) · **Guía general y ayuda:** [TALLER_LARGO.md](../TALLER_LARGO.md#cómo-estudiar-esto-solo)

**Meta de este módulo:** entender qué es (y qué no es) la IA, y por qué un filtro de spam **aprende de ejemplos** en lugar de seguir reglas escritas a mano. No hace falta programar nada.

## Antes de empezar: ¿estás listo?

Este es el primer módulo: no necesitas saber nada de IA. Solo comprueba que tu computador está listo. Contesta en tu cabeza (o en papel) y luego despliega la respuesta.

**1. Tienes una carpeta con un archivo `index.html`. ¿Cómo lo abres en el navegador?**

<details><summary>Respuesta</summary>

Con doble clic sobre `index.html` en el Explorador de archivos de Windows (o clic derecho > *Abrir con* > Chrome o Edge). No hace falta instalar nada.

</details>

**2. ¿Qué tecla abre las herramientas para desarrolladores del navegador?**

<details><summary>Respuesta</summary>

**F12**. Allí está la pestaña **Consola**, que usarás desde el módulo 02. La guía completa está en [Cómo abrir la consola](../TALLER_LARGO.md#4-cómo-abrir-la-consola-del-navegador-f12).

</details>

**3. ¿Cómo distingues tú, sin ayuda de ninguna máquina, un mensaje de spam de uno normal?**

<details><summary>Respuesta</summary>

No hay una única respuesta correcta. Lo común: ofrece algo "demasiado bueno" (premios, dinero fácil), mete prisa ("urgente", "última oportunidad"), pide datos o claves, trae enlaces sospechosos o viene de alguien desconocido. Guarda tus pistas: las usarás en la Parte 5.

</details>

## Objetivos

Al terminar este módulo podrás:

- [ ] Explicar con tus palabras qué es (y qué **no** es) la IA.
- [ ] Distinguir **IA con reglas**, **Machine Learning** y **Deep Learning**.
- [ ] Nombrar los **tres estilos** de aprendizaje de una máquina y dar un ejemplo de cada uno.
- [ ] Explicar por qué un filtro de spam **aprende de ejemplos** en vez de seguir reglas escritas a mano.

## Mapa de tiempos (estudio estimado)

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Primer vistazo a la página y lo que ya sabes | 5 |
| 2 | ¿Qué es la IA? Mitos y alcance | 10 |
| 3 | IA, Machine Learning y Deep Learning | 10 |
| 4 | Tres estilos de aprender | 10 |
| 5 | El spam: reglas contra ejemplos | 10 |
| 6 | Cierre: quiz y resumen | 5 |
| | **Total** | **50** |

---

## Parte 1 · Primer vistazo a la página y lo que ya sabes (5 min)

Durante todo el taller vas a construir **un filtro anti-spam** (el que decide si un mensaje es basura o no). Lo usarás como ejemplo en cada módulo para que la teoría tenga un lugar donde aterrizar.

Abre la carpeta del taller en VS Code. Haz **doble clic en `index.html`**: se abre la página del detective en tu navegador.

**Deberías ver:**

- Un panel **Autocomprobación** con un botón azul.
- Un **cuadro amarillo** que dice "Aún falta completar una parte del código".
- Abajo, un lugar para escribir un mensaje, un botón **Analizar**, un panel de examen y uno para comparar filtros.

Ese cuadro amarillo es **normal**: al final del taller habrá desaparecido porque **tú** habrás programado la pieza que falta. Mientras tanto, la página aún no hace nada. Va a ser tu detective.

**Si no te sale…** y la página sale en blanco o sin colores, revisa que abriste `index.html` de la carpeta `taller-spam` (y no una copia suelta). Más ayuda en las [preguntas frecuentes](../TALLER_LARGO.md#5-problemas-frecuentes-faq).

> **Actividad 1 · Lo que ya sabes (3 min, en papel).** Recuerda una vez que te llegó un mensaje de spam (SMS, WhatsApp, correo). ¿Cómo supiste que era spam? Anota **dos pistas** que usaste. Guárdalas: las necesitas en la Parte 5.
>
> Si no recuerdas ninguno, inventa uno: "me llegó un mensaje de mi banco pidiendo mi clave".

---

## Parte 2 · ¿Qué es la IA? Mitos y alcance (10 min)

**Inteligencia artificial (IA):** programas que hacen tareas que normalmente requieren inteligencia humana, como entender texto, reconocer caras, traducir, recomendar videos o decidir si un mensaje es spam.

Piensa en la IA como una **herramienta muy especializada**, no como un cerebro. Una calculadora multiplica mejor que tú, pero no "entiende" qué es un número. Con la IA pasa algo parecido.

### Tres mitos muy comunes

| Mito | Realidad |
|---|---|
| "La IA piensa y entiende como una persona" | No. Detecta **patrones** en datos. No tiene conciencia ni sentimientos. |
| "La IA siempre acierta" | No. Se equivoca, y a veces con mucha seguridad. Medirás los errores de tu filtro en el módulo 07. |
| "La IA hace lo que quiere" | No. Hace lo que sus **datos y su diseño** permiten. Siempre hay personas detrás. |

### Alcance: qué puede y qué no

Hoy la IA es muy buena en tareas **específicas**: traducir, clasificar fotos, sugerir canciones, filtrar spam. Una IA que haga *de todo* como un humano (la llamada "IA general") **todavía no existe**.

> **Analogía:** un filtro de spam es como un portero de discoteca que solo sabe una cosa: decidir quién entra. Es excelente en eso, pero no puede cocinar ni conducir.

> **Actividad 2 · ¿Mito o realidad? (4 min).** Decide si cada frase es **verdadera** o **falsa** antes de abrir la respuesta:
>
> 1. "Mi celular me escucha porque piensa."
> 2. "El filtro de spam de mi correo nunca se equivoca."
> 3. "Una IA que traduce entiende el idioma como yo."

<details><summary>Respuesta</summary>

Las tres son **falsas**:

1. Un celular no "piensa". Si te muestra un anuncio parecido a lo que hablaste, casi siempre es por tus búsquedas, tu ubicación o lo que hacen personas parecidas a ti: **patrones**, no pensamiento.
2. Todo filtro se equivoca: deja pasar spam o manda mensajes buenos a la carpeta de spam. Tú medirás exactamente cuánto en el módulo 07.
3. Un traductor calcula qué palabras suelen corresponder a otras en millones de ejemplos. No sabe lo que es "una casa" como lo sabes tú.

Si acertaste las tres, ya piensas como alguien que usa IA con criterio.

</details>

---

## Parte 3 · IA, Machine Learning y Deep Learning (10 min)

Son tres niveles, uno dentro del otro:

```
┌───────────────────────────────────────┐
│ IA  (todo lo "inteligente")           │
│  ┌─────────────────────────────────┐  │
│  │ Machine Learning (ML)           │  │
│  │ aprende de ejemplos             │  │
│  │  ┌───────────────────────────┐  │  │
│  │  │ Deep Learning (DL)        │  │  │
│  │  │ redes neuronales grandes  │  │  │
│  │  └───────────────────────────┘  │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

| Nivel | ¿Quién crea las reglas? | Ejemplo con spam |
|---|---|---|
| **IA con reglas** | Una persona las escribe a mano | "Si dice *gratis* y *premio*, es spam" |
| **Machine Learning** | La máquina las **descubre** viendo ejemplos | Un filtro que cuenta qué palabras aparecen más en el spam |
| **Deep Learning** | Igual que ML, pero con **redes neuronales** de muchas capas | Un filtro que lee el mensaje completo y capta el tono |

### La diferencia clave

En la programación normal **tú escribes las reglas**. En Machine Learning **le das ejemplos con la respuesta** y la máquina encuentra las reglas sola.

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

> **Analogía:** enseñar a un niño qué es un perro. Puedes darle una lista de reglas ("tiene cuatro patas, cola, ladra") o puedes **mostrarle cien fotos** y decir "esto es perro, esto no". El segundo camino es Machine Learning. Y con el tiempo, el niño reconoce perros que jamás vio y que no cumplen tu lista.

La palabra **modelo** aparecerá mucho: es lo que queda después de aprender, el "cerebro" ya ajustado.

**Comprueba que lo entendiste (1 min):** sin mirar arriba, dibuja en papel los tres óvalos anidados y escribe dentro de cada uno su nombre. Luego compara con el dibujo. Si el de Deep Learning no quedó dentro del de Machine Learning, repasa la tabla.

---

## Parte 4 · Tres estilos de aprender (10 min)

| Tipo | Cómo aprende | Ejemplo cotidiano |
|---|---|---|
| **Supervisado** | Con ejemplos **ya etiquetados** ("este correo es spam, este no") | Filtro de spam, reconocer si una foto es gato o perro |
| **No supervisado** | Sin etiquetas: **agrupa** cosas parecidas por su cuenta | Spotify agrupa usuarios con gustos similares |
| **Por refuerzo** | Prueba y error con **premios y castigos** | Una IA que aprende a jugar un videojuego |

Una **etiqueta** es la respuesta correcta que una persona le puso a un ejemplo. En tu taller, cada mensaje tendrá la etiqueta `"spam"` o `"normal"`.

**Tu detective será supervisado**: aprenderá de 60 mensajes ya etiquetados.

### La IA que usas todos los días en la web

| Aplicación | ¿Cómo funciona, en simple? | ¿Qué dato tuyo usa? |
|---|---|---|
| **Recomendaciones** (TikTok, YouTube, Spotify, Netflix) | Compara lo que tú ves con lo que vieron personas parecidas | Qué ves, cuánto tiempo, qué likes das |
| **Asistentes virtuales** (Siri, Alexa) | Convierten tu voz en texto, entienden qué quieres y responden | Tu voz, tus preguntas |
| **Buscadores** (Google) | Entienden lo que quisiste decir y ordenan páginas por relevancia | Tus búsquedas, tu ubicación |
| **Bancos y tiendas** | Detectan lo "raro": un pago fraudulento, una reseña falsa | Tus compras, tus clics |
| **Tu bandeja de correo** | Separa el spam del correo normal | El contenido de tus mensajes |

> **Actividad 3 · Clasifica el estilo (5 min).** Para cada caso, decide si es supervisado, no supervisado o por refuerzo, y si usa reglas o aprendizaje. Escribe tus cuatro respuestas **antes** de abrir la solución.
>
> 1. Un robot aspiradora que choca, aprende a evitar los muebles y gana "puntos" por cada rincón limpio.
> 2. Una tienda que agrupa a sus clientes en "tipos" sin que nadie les diga cuáles.
> 3. Un banco que entrena una IA con miles de transacciones marcadas como "fraude" o "legítima".
> 4. Un semáforo que cambia cada 30 segundos.

<details><summary>Respuesta</summary>

1. **Por refuerzo**: aprende por prueba y error con premios (puntos) y castigos (choques).
2. **No supervisado**: nadie le dio etiquetas; encuentra grupos por parecido.
3. **Supervisado**: los ejemplos vienen etiquetados ("fraude" o "legítima").
4. **No es IA con aprendizaje**: es un programa fijo, sin datos ni aprendizaje. Hace siempre lo mismo cada 30 segundos.

Si fallaste el 4, recuerda: no todo lo automático es IA. Aprender implica mejorar con la experiencia.

</details>

---

## Parte 5 · El spam: reglas contra ejemplos (10 min)

El **spam** son mensajes no deseados, casi siempre ofertas, estafas o intentos de robarte datos. Es perfecto para estudiar IA porque tiene dos caminos para resolverlo.

### Camino 1 · Escribir reglas

> **Actividad 4 · Tus reglas en papel, y cómo romperlas (6 min).**
>
> 1. Escribe **3 reglas** para detectar spam, usando las pistas de la Actividad 1 ("si el mensaje contiene... entonces es spam").
> 2. Ahora ponte en el lugar de quien manda spam y ataca tus propias reglas: escribe **un mensaje de spam** que tus reglas **no detecten** y **un mensaje normal** que tus reglas marquen como spam **por error**.
> 3. ¿Lo lograste? Anota cuánto tardaste.

<details><summary>Respuesta</summary>

Casi siempre se logra en **menos de un minuto**. Ejemplos típicos:

- Regla: "si dice *gratis* es spam". Spam que la evade: `gr4tis`, `g r a t i s` o `regalo sin costo`. Mensaje normal que la dispara: "Mamá, el almuerzo es gratis hoy en la universidad".
- Regla: "si trae un enlace es spam". Mensaje normal que la dispara: "Te mandé el enlace de la reunión".

Eso es la **debilidad de las reglas**: la persona que las escribe no puede prever todos los casos, y quien hace spam puede cambiar el truco cada día. Si te costó mucho romper tus reglas, inténtalo con las de otra persona imaginaria: lo importante es notar lo fácil que es.

</details>

### Camino 2 · Aprender de ejemplos

En vez de escribir reglas, juntas muchos mensajes, le pones a cada uno su etiqueta y dejas que la máquina descubra qué palabras delatan al spam. Si aparece un truco nuevo, **no reescribes reglas: agregas ejemplos y vuelves a entrenar**.

| | Reglas a mano | Aprender de ejemplos |
|---|---|---|
| ¿Quién decide qué importa? | La persona | Los datos |
| Si cambia el spam | Hay que reescribir reglas | Se agregan ejemplos y se reentrena |
| ¿Se puede explicar por qué decidió? | Sí, fácil | A veces, depende del modelo |
| ¿Qué necesita? | Tiempo y mucha imaginación | Muchos ejemplos buenos |

Esto **no** significa que las reglas sean malas. Son rápidas, claras y predecibles. En el [módulo 03](./03-texto-y-reglas.md) las verás funcionar y medirás honestamente qué tan lejos llegan.

---

## Parte 6 · Cierre (5 min)

### Checkpoints: ¿cumpliste el módulo?

- [ ] `index.html` abre en tu navegador y muestra el cuadro amarillo (es lo esperado).
- [ ] Puedes dibujar los tres niveles: IA ⊃ ML ⊃ DL.
- [ ] Puedes decir en una frase por qué "aprender de ejemplos" es distinto de "escribir reglas".
- [ ] Sabes qué es una etiqueta y por qué la pone una persona.

### Si no te sale… (ideas que se confunden)

| Idea equivocada | Cómo corregirla |
|---|---|
| "IA y Machine Learning son lo mismo" | ML es **una parte** de la IA. Hay IA sin aprendizaje (reglas). |
| "Si es Deep Learning es mejor siempre" | No. Es más potente en tareas difíciles, pero necesita más datos y es más difícil de explicar. Para un problema pequeño, una idea simple puede ganar. |
| "La máquina entiende los mensajes" | Reconoce **patrones** de palabras. No entiende el significado. |
| "Supervisado significa que alguien vigila a la máquina" | Significa que los ejemplos **traen su respuesta** (etiqueta). |

### Quiz final (responde primero, despliega después)

**1. ¿Qué diferencia hay entre una regla escrita por una persona y una "regla" descubierta por un modelo?**

<details><summary>Respuesta</summary>

La regla escrita la fija una persona con su imaginación; la del modelo sale de los **datos** (los ejemplos con su etiqueta). La segunda puede encontrar pistas que a la persona no se le ocurrieron.

</details>

**2. Da un ejemplo de aprendizaje supervisado que uses en tu vida diaria.**

<details><summary>Respuesta</summary>

Cualquiera que aprenda con ejemplos etiquetados: el filtro de spam de tu correo, el reconocimiento de caras al desbloquear el celular, un traductor entrenado con textos ya traducidos.

</details>

**3. ¿Por qué decimos que la IA "detecta patrones" y no que "entiende"?**

<details><summary>Respuesta</summary>

Porque encuentra relaciones estadísticas entre palabras (o píxeles) y etiquetas, sin saber qué significan. Puede marcar bien un spam sin "saber" lo que es una estafa.

</details>

**4. Si mañana aparece un tipo de estafa nuevo, ¿qué harías con un filtro de reglas y qué con uno que aprende?**

<details><summary>Respuesta</summary>

Con reglas: reescribirlas o agregar nuevas a mano. Con aprendizaje: agregar ejemplos de la estafa nueva (con su etiqueta) y **volver a entrenar**.

</details>

**5. Un semáforo que cambia cada 30 segundos, ¿es Machine Learning?**

<details><summary>Respuesta</summary>

No. Es un programa fijo: no aprende de datos ni mejora con la experiencia.

</details>

### Resumen en 5 líneas

1. **IA** = programas que hacen tareas "inteligentes"; **ML** = IA que aprende de ejemplos; **DL** = ML con redes neuronales grandes.
2. En ML das **datos + respuestas** y obtienes **reglas** (el modelo).
3. Tres estilos: **supervisado**, **no supervisado**, **por refuerzo**. Tu detective es supervisado.
4. Las reglas a mano son claras pero frágiles; aprender de ejemplos se adapta, pero depende de los datos.
5. La IA detecta **patrones**: no entiende, y se equivoca.

**Guarda tu progreso** (si terminas aquí la sesión): mira cómo en [Guardar tu progreso](../TALLER_LARGO.md#3-cómo-guardar-tu-progreso).

**Siguiente paso:** [Módulo 02 · Redes neuronales y cómo aprende una máquina](./02-redes-neuronales.md).
