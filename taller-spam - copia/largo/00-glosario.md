# Glosario del taller

> Parte de [Detective de mensajes · taller largo](../TALLER_LARGO.md). Consulta este glosario cuando una palabra no te suene. Cada término tiene **una sola línea** y el módulo donde lo conocerás.

## Ideas generales de IA

| Término | En una línea | Módulo |
|---|---|---|
| **Inteligencia artificial (IA)** | Programas que hacen tareas que normalmente requieren inteligencia humana: entender texto, reconocer caras, traducir, recomendar. | [01](./01-que-es-la-ia.md) |
| **Machine Learning (ML)** | IA que no recibe las reglas escritas a mano: las descubre a partir de ejemplos. | [01](./01-que-es-la-ia.md) |
| **Deep Learning (DL)** | Machine Learning con redes neuronales de muchas capas. | [01](./01-que-es-la-ia.md) |
| **Modelo** | Lo que queda después de entrenar: el "cerebro" ya ajustado, listo para dar respuestas. | [01](./01-que-es-la-ia.md) |
| **Aprendizaje supervisado** | Aprender con ejemplos que ya traen su respuesta (etiqueta). Tu detective es de este tipo. | [01](./01-que-es-la-ia.md) |
| **Aprendizaje no supervisado** | Aprender sin etiquetas: la máquina agrupa cosas parecidas por su cuenta. | [01](./01-que-es-la-ia.md) |
| **Aprendizaje por refuerzo** | Aprender por prueba y error con premios y castigos. | [01](./01-que-es-la-ia.md) |
| **Etiqueta** | La respuesta correcta de un ejemplo, puesta por una persona (aquí: "spam" o "normal"). | [01](./01-que-es-la-ia.md) |
| **Clasificación** | Tarea de elegir una categoría entre varias para un dato nuevo. | [01](./01-que-es-la-ia.md) |

## Redes neuronales y entrenamiento

| Término | En una línea | Módulo |
|---|---|---|
| **Neurona artificial** | Pieza que multiplica entradas por pesos, las suma y decide un resultado. | [02](./02-redes-neuronales.md) |
| **Peso** | Número que dice cuánto importa una entrada; es lo que la red "aprende". | [02](./02-redes-neuronales.md) |
| **Sesgo de una neurona (bias)** | Número fijo que se suma antes de decidir; mueve el punto de corte. No confundir con el sesgo injusto de los datos. | [02](./02-redes-neuronales.md) |
| **Red neuronal** | Muchas neuronas conectadas en capas. | [02](./02-redes-neuronales.md) |
| **Capa oculta** | Capa intermedia de una red, entre la entrada y la salida. | [02](./02-redes-neuronales.md) |
| **Entrenar** | Ajustar los pesos una y otra vez comparando con la respuesta correcta. | [02](./02-redes-neuronales.md) |
| **Dataset** | Colección de ejemplos para entrenar y probar un modelo. | [02](./02-redes-neuronales.md) |
| **Datos de entrenamiento** | Los ejemplos con los que el modelo aprende. | [02](./02-redes-neuronales.md) |
| **Datos de prueba** | Ejemplos que el modelo nunca vio, para comprobar si de verdad aprendió. | [02](./02-redes-neuronales.md) |
| **Sobreajuste** | El modelo memorizó los ejemplos y falla con datos nuevos. | [02](./02-redes-neuronales.md) |

## Texto y reglas

| Término | En una línea | Módulo |
|---|---|---|
| **PLN / NLP** | Procesamiento de lenguaje natural: que las máquinas trabajen con texto o voz humana. | [03](./03-texto-y-reglas.md) |
| **Normalizar** | Limpiar el texto para que variantes iguales valgan lo mismo (minúsculas, sin tildes ni signos). | [03](./03-texto-y-reglas.md) |
| **Token / tokenizar** | Cada pieza en que se parte un texto (aquí, una palabra); tokenizar es hacer esa partición. | [03](./03-texto-y-reglas.md) |
| **Bolsa de palabras** | Representar un texto solo por qué palabras tiene y cuántas veces, sin importar el orden. | [03](./03-texto-y-reglas.md) |
| **Vocabulario** | Conjunto de palabras distintas que el modelo conoce. | [03](./03-texto-y-reglas.md) |
| **Léxico** | Diccionario de palabras con un puntaje. | [03](./03-texto-y-reglas.md) |
| **Umbral** | Número desde el cual se cambia de decisión (en las reglas: puntos; en el modelo: probabilidad). | [03](./03-texto-y-reglas.md) |
| **Negación** | Palabra como "no" que invierte el sentido de lo que sigue. | [03](./03-texto-y-reglas.md) |
| **Evasión** | Truco del spammer para escapar de un filtro, por ejemplo escribir "g4na" en vez de "gana". | [03](./03-texto-y-reglas.md) |

## Chatbots y modelos de lenguaje

| Término | En una línea | Módulo |
|---|---|---|
| **Chatbot** | Programa que conversa con personas. | [04](./04-chatbots-y-llm.md) |
| **Intención** | Lo que el usuario quiere lograr con su mensaje. | [04](./04-chatbots-y-llm.md) |
| **Entidad** | Dato dentro de un mensaje: una fecha, un nombre, un lugar. | [04](./04-chatbots-y-llm.md) |
| **LLM** | Modelo de lenguaje grande: red neuronal gigante que predice la siguiente pieza de texto. | [04](./04-chatbots-y-llm.md) |
| **Prompt** | Las instrucciones o el texto que le das a una IA generativa. | [04](./04-chatbots-y-llm.md) |
| **Temperatura** | Qué tan variada o arriesgada es la respuesta de un LLM. | [04](./04-chatbots-y-llm.md) |
| **Alucinación** | Cuando una IA inventa algo falso con total seguridad. | [04](./04-chatbots-y-llm.md) |
| **API** | Puerta por la que un programa le pide un servicio a otro por internet. | [04](./04-chatbots-y-llm.md) |
| **Clave de API** | Contraseña secreta para usar un servicio; nunca se comparte ni se sube a un repositorio. | [04](./04-chatbots-y-llm.md) |
| **Inyección de prompt** | Truco para que una IA ignore sus reglas y obedezca al usuario. | [04](./04-chatbots-y-llm.md) |

## Naive Bayes y evaluación

| Término | En una línea | Módulo |
|---|---|---|
| **Naive Bayes** | Clasificador que cuenta palabras por clase y compara qué clase explica mejor el mensaje. | [05](./05-naive-bayes.md) |
| **Probabilidad previa (prior)** | Cuánto spam llega "en general", antes de mirar las palabras. | [05](./05-naive-bayes.md) |
| **Suavizado de Laplace** | Sumar 1 a cada conteo para que ninguna palabra tenga probabilidad 0. | [05](./05-naive-bayes.md) |
| **Logaritmo** | Operación que convierte multiplicaciones de números diminutos en sumas manejables. | [05](./05-naive-bayes.md) |
| **Underflow** | Cuando el computador redondea a 0 un número demasiado pequeño. | [05](./05-naive-bayes.md) |
| **Exactitud (accuracy)** | Fracción de mensajes bien clasificados: (vp + vn) ÷ total. | [07](./07-evaluacion-honesta.md) |
| **Matriz de confusión** | Tabla que cuenta los aciertos y los dos tipos de error. | [07](./07-evaluacion-honesta.md) |
| **Falso positivo (fp)** | Un mensaje bueno que el filtro mandó al spam. | [07](./07-evaluacion-honesta.md) |
| **Falso negativo (fn)** | Un spam que el filtro dejó pasar. | [07](./07-evaluacion-honesta.md) |
| **Precisión** | De lo que marcó como spam, cuánto era spam de verdad: vp ÷ (vp + fp). | [07](./07-evaluacion-honesta.md) |
| **Recall (sensibilidad)** | De todo el spam que existe, cuánto atrapó: vp ÷ (vp + fn). | [07](./07-evaluacion-honesta.md) |
| **Desbalance de clases** | Cuando una clase es mucho más frecuente que la otra. | [07](./07-evaluacion-honesta.md) |
| **Fuga de datos (data leakage)** | Cuando el modelo "ve" las respuestas del examen durante el entrenamiento y la nota sale inflada. | [07](./07-evaluacion-honesta.md) |

## Ética

| Término | En una línea | Módulo |
|---|---|---|
| **Sesgo (algorítmico)** | Tendencia injusta del sistema a favorecer o perjudicar a ciertos grupos, aprendida de los datos o del diseño. | [08](./08-sesgo-etica-proyecto.md) |
| **Datos personales** | Cualquier información que identifica a alguien: nombre, voz, ubicación, mensajes. | [08](./08-sesgo-etica-proyecto.md) |
| **Minimización** | Recoger solo los datos que de verdad hacen falta. | [08](./08-sesgo-etica-proyecto.md) |
| **Consentimiento** | Permiso informado de la persona para usar sus datos. | [08](./08-sesgo-etica-proyecto.md) |
| **Supervisión humana** | Que una persona pueda revisar y corregir las decisiones importantes de una IA. | [08](./08-sesgo-etica-proyecto.md) |
| **Transparencia** | Que el usuario sepa que hay una IA y cómo se usan sus datos. | [08](./08-sesgo-etica-proyecto.md) |
