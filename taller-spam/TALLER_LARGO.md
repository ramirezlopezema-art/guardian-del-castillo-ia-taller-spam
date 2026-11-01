# Detective de mensajes: entrena tu propio filtro anti-spam
### Taller largo de 8 horas (480 minutos), en 8 módulos

**Curso:** Introducción a la IA · **Necesitas:** Chrome o Edge y VS Code · **Sin internet, sin cuenta, sin API key**

Este taller te lleva **desde cero** (qué es la inteligencia artificial) hasta **programar y evaluar tu propio filtro anti-spam**, un clasificador *Naive Bayes* que aprende de ejemplos, se mide con un examen honesto y se rompe a propósito para ver cómo nacen los sesgos.

Es **autocontenido**: no necesitas haber hecho ningún proyecto anterior. (Tus compañeros vieron estas ideas con un dragón; tú las verás con un filtro de mensajes.)

```
Programación normal:   datos + REGLAS      ──►  respuestas
Machine Learning:      datos + RESPUESTAS  ──►  REGLAS (el "modelo")
```

---

## Cómo usar este taller

1. Abre esta carpeta en **VS Code**.
2. Lee el módulo del día en `largo/` y sigue los pasos **en orden**. Cada módulo tiene objetivos, un mapa de tiempos, pasos, *checkpoints* ("Deberías ver…"), actividades y preguntas de cierre.
3. Cada módulo empieza con un **"Antes de empezar"** que repasa el anterior, así que puedes entrar en cualquiera.
4. Si algo no cuadra con el *checkpoint*, no sigas: revisa la tabla **"Errores comunes"** al final del módulo.
5. Cuando no entiendas una palabra, ve al [glosario](./largo/00-glosario.md).

> **Regla de oro:** en el módulo 06 programas en `modelo.js`. Después de cada cambio: **guarda** (`Ctrl+S`) y **recarga** `index.html` con **F5**. La página te muestra un cuadro amarillo con la pista si algo falta.

## Antes de empezar (requisitos)

| Requisito | Detalle |
|---|---|
| Navegador | Chrome o Edge actualizados |
| Editor | VS Code (o cualquier editor de texto) |
| Programación | No hace falta experiencia previa con IA. Ayuda saber leer JavaScript básico (variables, `for`, funciones); lo vamos recordando |
| Internet | **No es necesaria.** Todo corre en tu navegador. Solo un ejercicio **opcional** del módulo 04 usa un asistente de chat que ya tengas |
| Cuentas y claves | **Ninguna** |

## Tu ruta de 8 horas

| # | Módulo | Minutos | Al terminar podrás... |
|---|---|---|---|
| 01 | [¿Qué es la IA?](./largo/01-que-es-la-ia.md) | 50 | Distinguir IA, ML y DL, y los tres estilos de aprender |
| 02 | [Redes neuronales y cómo aprende una máquina](./largo/02-redes-neuronales.md) | 70 | Programar una neurona en la consola y verla aprender |
| 03 | [Texto para máquinas y filtro por reglas](./largo/03-texto-y-reglas.md) | 60 | Normalizar, tokenizar y romper un filtro hecho con reglas |
| 04 | [Chatbots y modelos de lenguaje (LLM)](./largo/04-chatbots-y-llm.md) | 60 | Explicar cómo conversa un bot y cómo funciona un LLM |
| 05 | [Naive Bayes: aprender de ejemplos](./largo/05-naive-bayes.md) | 45 | Entrenar y clasificar a mano con un ejemplo pequeño |
| 06 | [Programa tu detective](./largo/06-programa-tu-detective.md) | 75 | Tener un filtro que aprende, funcionando en la página |
| 07 | [Evaluación honesta](./largo/07-evaluacion-honesta.md) | 50 | Medir con matriz de confusión, umbral y sin trampa |
| 08 | [Sesgo, ética y proyecto final](./largo/08-sesgo-etica-proyecto.md) | 70 | Provocar y explicar un sesgo, y presentar tu reto |
| | **Total** | **480** | |

> Los minutos incluyen los descansos cortos de 5 min que trae cada módulo.

### Si lo das en 4 sesiones de 2 horas

| Sesión | Módulos | Minutos |
|---|---|---|
| 1 | 01 + 02 | 50 + 70 = 120 |
| 2 | 03 + 04 | 60 + 60 = 120 |
| 3 | 05 + 06 | 45 + 75 = 120 |
| 4 | 07 + 08 | 50 + 70 = 120 |

### Si lo das en 8 sesiones de 1 hora

Los módulos no caben exactos en una hora; por eso algunas sesiones cortan un módulo en su **parte** indicada (cada módulo trae su mapa de tiempos).

| Sesión | Contenido | Minutos |
|---|---|---|
| 1 | Módulo 01 completo + Módulo 02, Parte 1 | 50 + 10 = 60 |
| 2 | Módulo 02, Partes 2 a 8 | 60 |
| 3 | Módulo 03 completo | 60 |
| 4 | Módulo 04 completo | 60 |
| 5 | Módulo 05 completo + Módulo 06, Parte 1 | 45 + 15 = 60 |
| 6 | Módulo 06, Partes 2 a 7 | 60 |
| 7 | Módulo 07 completo + Módulo 08, Parte 1 | 50 + 10 = 60 |
| 8 | Módulo 08, Partes 2 a 7 | 60 |

## Archivos del taller

| Archivo | ¿Lo editas? | Para qué sirve |
|---|---|---|
| `modelo.js` | **Sí (módulo 06)** | Aquí viven los 4 TODO de tu detective |
| `reglas.js` | Sí (módulo 03, opcional) | El filtro "de antes", hecho con reglas a mano |
| `datos.js` | Solo en retos | 60 mensajes de entrenamiento y 20 de prueba |
| `index.html`, `app.js`, `style.css` | No (salvo retos) | La página del detective |
| `soluciones/modelo.solucion.js` | No lo mires antes de tiempo | Solución completa (para el docente o si te atascas) |
| `largo/00-glosario.md` | No | Glosario de 57 términos |
| `largo/99-notas-docente.md` | No | Respuestas y números esperados (solo docente) |

Para la versión de **2 horas** usa [TALLER_CORTO.md](./TALLER_CORTO.md).

## Lo que podrás hacer al terminar

- [ ] Explicar qué es la IA, el ML y el DL, con ejemplos de la vida diaria.
- [ ] Programar una neurona y explicar cómo se "aprenden" los pesos.
- [ ] Convertir texto en piezas que una máquina puede contar (normalizar, tokenizar, bolsa de palabras).
- [ ] Construir y romper un filtro por reglas, y decir cuáles son sus límites.
- [ ] Explicar a nivel de concepto cómo funcionan un chatbot y un LLM.
- [ ] Calcular a mano una clasificación Naive Bayes con suavizado y logaritmos.
- [ ] Programar `entrenar`, `logProbPalabra`, `clasificar` y `evaluar`.
- [ ] Leer una matriz de confusión, y explicar el desbalance de clases, el umbral y la fuga de datos.
- [ ] Provocar un sesgo en tu modelo y explicar de dónde viene.
- [ ] Aplicar una lista de chequeo de IA responsable.

## Un vistazo a lo que verás

La página tiene cinco paneles:

| Panel | Para qué |
|---|---|
| 1. Analiza un mensaje | Escribes un texto; ves el veredicto, la probabilidad y las palabras que pesaron |
| 2. Enséñale al detective | Corriges un error y ves si cambia de opinión |
| 3. Los datos con los que aprende | Quitas una clase o cargas un dataset sesgado |
| 4. Examen del detective | Exactitud, matriz de confusión y los mensajes que falló |
| 5. Comparar: reglas vs aprendido | El filtro por reglas y tu modelo, lado a lado |

## Siguiente paso

Empieza por el [Módulo 01 · ¿Qué es la IA?](./largo/01-que-es-la-ia.md).

> **Docente:** las respuestas, los números esperados y los consejos de tiempo están en [largo/99-notas-docente.md](./largo/99-notas-docente.md).
