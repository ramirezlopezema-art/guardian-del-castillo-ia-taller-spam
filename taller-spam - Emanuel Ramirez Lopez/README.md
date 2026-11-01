# Detective de mensajes: entrena tu propio filtro anti-spam

**Trabajo de Emanuel Ramirez Lopez**

Taller de Introducción a la IA, **autocontenido** y pensado para **estudiar solo, en casa** (no hace falta haber hecho otro proyecto ni tener un profesor al lado).
Parte de qué es la IA y llega a programar un clasificador **Naive Bayes** en JavaScript puro:
compara un filtro de reglas con uno que aprende, lo mide con un examen y lo rompe con datos sesgados.
Sin internet, sin librerías y sin API key.

## Cómo abrirlo

Doble clic en `index.html` (Chrome o Edge). Edita en VS Code, guarda con `Ctrl+S` y recarga con F5.

La página tiene un panel de **Autocomprobación**: un botón que revisa tu `modelo.js` y te dice, línea por línea, qué parte funciona (✅), cuál falla con una pista (❌) y cuál falta (⏳). Es tu profesor automático.

## ¿Qué versión uso?

| Versión | Guía | Estudio estimado | Archivo de trabajo |
|---|---|---|---|
| **Larga** (8 módulos, 4 TODO) | [TALLER_LARGO.md](TALLER_LARGO.md) (índice) y carpeta `largo/` | 480 min | `modelo.js` |
| **Corta** (1 TODO) | [TALLER_CORTO.md](TALLER_CORTO.md), completa por sí misma | 120 min | copia `soluciones/modelo.corto.js` sobre `modelo.js` (la guía explica cómo guardar antes el original) |

Las dos guías traen su sección **"Cómo estudiar esto solo"**: ritmo sugerido, cómo abrir la consola (F12), qué hacer si te atascas, cómo guardar tu progreso y las preguntas frecuentes.

Al terminar la versión larga, usa [largo/99-soluciones-y-autoevaluacion.md](largo/99-soluciones-y-autoevaluacion.md): soluciones, números esperados y autoevaluación final.

## Archivos

- `reglas.js`: el filtro hecho con reglas a mano (sirve aunque falten TODO).
- `modelo.js`: tu filtro que aprende (aquí van los TODO). `datos.js`: mensajes de entrenamiento y de prueba.
- `pruebas.js`: las pruebas del panel **Autocomprobación** (usan sus propios datos mínimos, no `datos.js`). También: escribe `autocomprobar()` en la consola.
- `index.html`, `app.js`, `style.css`: la página del detective (incluye el panel "Comparar: reglas vs aprendido").
- `soluciones/modelo.solucion.js` (los 4 TODO resueltos) y `soluciones/modelo.corto.js` (base de la versión corta): úsalos solo después de intentarlo.
- `largo/00-glosario.md`: glosario de términos.

## Requisitos

Un navegador moderno y un editor de texto (VS Code). No necesita Node.js.
