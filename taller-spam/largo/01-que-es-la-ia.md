# Módulo 01 · ¿Qué es la inteligencia artificial?

> **Curso:** Detective de mensajes ([índice del taller largo](../TALLER_LARGO.md)) · **Duración:** 50 min · **Siguiente:** [Módulo 02 · Redes neuronales](./02-redes-neuronales.md) · **Glosario:** [00-glosario.md](./00-glosario.md)

## Antes de empezar

Este es el primer módulo: no necesitas saber nada de IA. Solo necesitas ganas de preguntar.

Durante todo el taller vas a construir **un filtro anti-spam** (el que decide si un mensaje es basura o no). Lo usaremos como ejemplo en cada módulo para que la teoría tenga un lugar donde aterrizar.

> Tus compañeros del curso lo vieron con un dragón; tú lo verás con un filtro de mensajes. Las ideas son las mismas.

**Lo que necesitas:** Chrome o Edge, VS Code, y esta carpeta. Sin internet, sin cuenta, sin clave.

## Objetivos

Al terminar este módulo podrás:

- [ ] Explicar con tus palabras qué es (y qué **no** es) la IA.
- [ ] Distinguir **IA con reglas**, **Machine Learning** y **Deep Learning**.
- [ ] Nombrar los **tres estilos** de aprendizaje de una máquina y dar un ejemplo de cada uno.
- [ ] Explicar por qué un filtro de spam **aprende de ejemplos** en vez de seguir reglas escritas a mano.

## Mapa de tiempos

| Parte | Tema | Minutos |
|---|---|---|
| 1 | Bienvenida y lo que traes | 5 |
| 2 | ¿Qué es la IA? Mitos y alcance | 10 |
| 3 | IA, Machine Learning y Deep Learning | 10 |
| 4 | Tres estilos de aprender | 10 |
| 5 | El spam: reglas contra ejemplos | 10 |
| 6 | Cierre | 5 |
| | **Total** | **50** |

---

## Parte 1 · Bienvenida y lo que traes (5 min)

Abre la carpeta del taller en VS Code. Haz **doble clic en `index.html`**: se abre la página del detective en tu navegador. Verás un cuadro amarillo que dice "Aún falta completar una parte del código". Es normal: al final del taller ese cuadro desaparecerá porque **tú** habrás programado la pieza que falta.

Mientras tanto, mira la página: tiene un lugar para escribir un mensaje, un botón **Analizar** y un panel de examen. Aún no hace nada. Va a ser tu detective.

> **Actividad 1 · Lo que ya sabes (3 min, en parejas).** Cada uno cuenta una vez que le llegó un mensaje de spam (SMS, WhatsApp, correo). ¿Cómo supo que era spam? Anoten **dos pistas** que usó. Guárdenlas: las usarás en la Parte 5.

---

## Parte 2 · ¿Qué es la IA? Mitos y alcance (10 min)

**Inteligencia artificial (IA):** programas que hacen tareas que normalmente requieren inteligencia humana, como entender texto, reconocer caras, traducir, recomendar videos o decidir si un mensaje es spam.

Piensa en la IA como una **herramienta muy especializada**, no como un cerebro. Una calculadora multiplica mejor que tú, pero no "entiende" qué es un número. Con la IA pasa algo parecido.

### Tres mitos muy comunes

| Mito | Realidad |
|---|---|
| "La IA piensa y entiende como una persona" | No. Detecta **patrones** en datos. No tiene conciencia ni sentimientos. |
| "La IA siempre acierta" | No. Se equivoca, y a veces con mucha seguridad. Tú medirás los errores de tu filtro en el módulo 07. |
| "La IA hace lo que quiere" | No. Hace lo que sus **datos y su diseño** permiten. Siempre hay personas detrás. |

### Alcance: qué puede y qué no

Hoy la IA es muy buena en tareas **específicas**: traducir, clasificar fotos, sugerir canciones, filtrar spam. Una IA que haga *de todo* como un humano (la llamada "IA general") **todavía no existe**.

> **Analogía:** un filtro de spam es como un portero de discoteca que solo sabe una cosa: decidir quién entra. Es excelente en eso, pero no puede cocinar ni conducir.

> **Actividad 2 · ¿Mito o realidad? (4 min, de pie).** El docente lee una frase; si crees que es verdad, te paras; si es falsa, te quedas sentado. Ejemplos: "Mi celular me escucha porque piensa", "El filtro de spam de mi correo nunca se equivoca", "Una IA que traduce entiende el idioma como yo".

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

> **Actividad 3 · Clasifica el estilo (5 min, en parejas).** Para cada caso, decidan si es supervisado, no supervisado o por refuerzo, y si usa reglas o aprendizaje:
> 1. Un robot aspiradora que choca, aprende a evitar los muebles y gana "puntos" por cada rincón limpio.
> 2. Una tienda que agrupa a sus clientes en "tipos" sin que nadie les diga cuáles.
> 3. Un banco que entrena una IA con miles de transacciones marcadas como "fraude" o "legítima".
> 4. Un semáforo que cambia cada 30 segundos.

---

## Parte 5 · El spam: reglas contra ejemplos (10 min)

El **spam** son mensajes no deseados, casi siempre ofertas, estafas o intentos de robarte datos. Es perfecto para estudiar IA porque tiene dos caminos para resolverlo.

### Camino 1 · Escribir reglas

> **Actividad 4 · Tus reglas en papel (6 min).** En parejas:
> 1. Escribe **3 reglas** para detectar spam, usando las pistas de la Actividad 1 ("si el mensaje contiene... entonces es spam").
> 2. Intercambia tus reglas con tu pareja. Su misión: **escribir un mensaje de spam que tus reglas no detecten**, y un mensaje normal que tus reglas marquen como spam por error.
> 3. ¿Lo lograron? Casi siempre sí, en menos de un minuto.

Eso es la **debilidad de las reglas**: la persona que las escribe no puede prever todos los casos, y quien hace spam puede cambiar el truco cada día.

### Camino 2 · Aprender de ejemplos

En vez de escribir reglas, juntas muchos mensajes, le pones a cada uno su etiqueta y dejas que la máquina descubra qué palabras delatan al spam. Si aparece un truco nuevo, **no reescribes reglas: agregas ejemplos y vuelves a entrenar**.

| | Reglas a mano | Aprender de ejemplos |
|---|---|---|
| ¿Quién decide qué importa? | La persona | Los datos |
| Si cambia el spam | Hay que reescribir reglas | Se agregan ejemplos y se reentrena |
| ¿Se puede explicar por qué decidió? | Sí, fácil | A veces, depende del modelo |
| ¿Qué necesita? | Tiempo y mucha imaginación | Muchos ejemplos buenos |

Esto **no** significa que las reglas sean malas. Son rápidas, claras y predecibles. En el [módulo 03](./03-texto-y-reglas.md) las programarás y mediremos honestamente qué tan lejos llegan.

---

## Checkpoints

**Deberías ver / poder decir:**

- [ ] `index.html` abre en tu navegador y muestra el cuadro amarillo (es lo esperado).
- [ ] Puedes dibujar los tres niveles: IA ⊃ ML ⊃ DL.
- [ ] Puedes decir en una frase por qué "aprender de ejemplos" es distinto de "escribir reglas".
- [ ] Sabes qué es una etiqueta y por qué la pone una persona.

## Errores comunes (ideas que se confunden)

| Idea equivocada | Cómo corregirla |
|---|---|
| "IA y Machine Learning son lo mismo" | ML es **una parte** de la IA. Hay IA sin aprendizaje (reglas). |
| "Si es Deep Learning es mejor siempre" | No. Es más potente en tareas difíciles, pero necesita más datos y es más difícil de explicar. Para un problema pequeño, una idea simple puede ganar. |
| "La máquina entiende los mensajes" | Reconoce **patrones** de palabras. No entiende el significado. |
| "Supervisado significa que alguien vigila a la máquina" | Significa que los ejemplos **traen su respuesta** (etiqueta). |

## Resumen

- **IA** = programas que hacen tareas "inteligentes". **ML** = IA que aprende de ejemplos. **DL** = ML con redes neuronales grandes.
- En ML das **datos + respuestas** y obtienes **reglas** (el modelo).
- Tres estilos: **supervisado**, **no supervisado**, **por refuerzo**. Tu detective es supervisado.
- Las reglas a mano son claras pero frágiles; aprender de ejemplos se adapta, pero depende de los datos.

## Preguntas de cierre

1. ¿Qué diferencia hay entre una regla escrita por una persona y una "regla" descubierta por un modelo?
2. Da un ejemplo de aprendizaje supervisado que uses en tu vida diaria.
3. ¿Por qué decimos que la IA "detecta patrones" y no que "entiende"?
4. Si mañana aparece un tipo de estafa nuevo, ¿qué harías con un filtro de reglas y qué harías con uno que aprende?

**Siguiente paso:** [Módulo 02 · Redes neuronales y cómo aprende una máquina](./02-redes-neuronales.md).
