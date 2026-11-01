# Detective de mensajes: entrena tu propio filtro anti-spam

Taller de Introducción a la IA, **autocontenido** (no hace falta haber hecho otro proyecto).
Parte de qué es la IA y llega a programar un clasificador **Naive Bayes** en JavaScript puro:
compara un filtro de reglas con uno que aprende, lo mide con un examen y lo rompe con datos sesgados.
Sin internet, sin librerías y sin API key.

## Cómo abrirlo

Doble clic en `index.html` (Chrome o Edge). Edita en VS Code y recarga con F5.

## ¿Qué versión uso?

| Versión | Guía | Archivo de trabajo |
|---|---|---|
| **Larga** (8 h, 8 módulos, 4 TODO) | [TALLER_LARGO.md](TALLER_LARGO.md) (índice) y carpeta `largo/` | `modelo.js` |
| **Corta** (2 h, 1 TODO) | [TALLER_CORTO.md](TALLER_CORTO.md) | copia `soluciones/modelo.corto.js` sobre `modelo.js` |
| Docente | `largo/99-notas-docente.md` y notas al final de la corta | `soluciones/modelo.solucion.js` |

## Archivos

- `reglas.js`: el filtro hecho con reglas a mano (sirve aunque falten TODO).
- `modelo.js`: tu filtro que aprende (aquí van los TODO). `datos.js`: mensajes de entrenamiento y de prueba.
- `index.html`, `app.js`, `style.css`: la página del detective (incluye el panel "Comparar: reglas vs aprendido").
- `largo/00-glosario.md`: glosario de términos.

## Requisitos

Un navegador moderno y un editor de texto (VS Code). No necesita Node.js.
