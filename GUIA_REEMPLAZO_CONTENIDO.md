# Guía de Reemplazo de Contenido Real 🚀

Esta guía detalla los pasos exactos para sustituir los placeholders actuales por la información de investigación real en tu plataforma de aprendizaje.

## 📍 Ubicación del Archivo
Todo el contenido de los temas se gestiona centralizadamente en:
constants.ts

---

## 🛠️ Procedimiento Paso a Paso

### Paso 1: Definir el nuevo objeto de contenido
Para cada tema (por ejemplo, el **1.2 "Importancia de la planificación"**), debes crear una constante de tipo `TopicContent` que contenga la información real.

**Ejemplo de código a añadir:**

```typescript
const content1_2: TopicContent = {
  summary: `Aquí va el resumen detallado en formato **Markdown** sobre la importancia de la planificación...`,
  keyPoints: [
    "Punto clave real 1",
    "Punto clave real 2",
    "Punto clave real 3"
  ],
  realWorldExample: "Un caso de éxito real donde la planificación salvó un proyecto técnico.",
  flashcards: [
    { term: "Planificación", definition: "Proceso de establecer objetivos y elegir los medios para alcanzarlos." },
    { term: "Cronograma", definition: "Representación gráfica de las actividades en el tiempo." }
  ],
  quiz: [
    { 
      question: "¿Cuál es el beneficio primordial de planificar?", 
      options: ["Gastar más dinero", "Reducir la incertidumbre", "Tener más reuniones", "Ignorar riesgos"], 
      correctAnswerIndex: 1 
    },
    // Añade hasta 10 preguntas por tema
  ],
  mindMapUrl: "URL_DE_TU_IMAGEN_O_PLACEHOLDER",
  infographicUrl: "URL_DE_TU_INFOGRAFIA",
  presentationUrl: "URL_DE_CANVA_O_SLIDES"
};
```

### Paso 2: Registrar el contenido en el Diccionario
Busca la constante `TOPIC_CONTENT_DATA` y añade la relación del ID del tema con la constante que acabas de crear.

```typescript
export const TOPIC_CONTENT_DATA: Record<string, TopicContent> = {
  "1.1": content1_1,
  "1.2": content1_2, // <-- Añade esta línea
  // Sigue añadiendo aquí conforme investigues más temas
};
```

### Paso 3: Limpiar la lógica de Placeholders
Para que el sistema no sobrescriba tu información con datos falsos, debes actualizar el filtro en el bucle final del archivo `constants.ts`.

**Cambia esto:**
```typescript
if (topic.id !== "1.1") { ... }
```

**Por esto (añadiendo los IDs que ya tienen contenido real):**
```typescript
if (topic.id !== "1.1" && topic.id !== "1.2") { ... }
```

> [!TIP]
> **Recomendación Final:** Una vez que hayas completado toda la investigación, puedes eliminar por completo la función `generatePlaceholderContent` y el bucle `forEach` final, dejando únicamente el objeto `TOPIC_CONTENT_DATA` poblado manualmente con todos los IDs.

---

## 📝 Estructura de Datos Requerida (`TopicContent`)

Asegúrate de que el objeto cumpla con esta interfaz (definida en `types.ts`):

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `summary` | `string` | Párrafos narrativos. Soporta negritas `**` y listas. |
| `keyPoints` | `string[]` | Lista de puntos fundamentales. |
| `realWorldExample`| `string` | Un caso práctico de la vida real. |
| `quiz` | `QuizQuestion[]`| Array de 10 preguntas con sus opciones e índice correcto. |
| `flashcards` | `Flashcard[]` | Términos y definiciones para estudio rápido. |
| `mindMapUrl` | `string` | Link a imagen (Imgur, Firebase Storage, etc). |
| `infographicUrl` | `string` | Link a infografía visual. |
| `presentationUrl`| `string` | Link externo a diapositivas (opcional). |

---

## 🖼️ Manejo de Imágenes
Para las imágenes (`mindMapUrl`, `infographicUrl`), te recomendamos:
1.  Subir tus archivos a un servicio como **Firebase Storage** o **Imgur**.
2.  Pegar el enlace directo (que termine en `.jpg` o `.png`) en el campo correspondiente.
3.  Si aún no tienes la imagen, usa la constante `PLACEHOLDER_IMAGE` definida al inicio de `constants.ts`.

---
*Documento generado para el proyecto PracticasIniciales_Clone.*
