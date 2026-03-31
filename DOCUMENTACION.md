# DOCUMENTACIÓN DEL PROYECTO - PracticasIniciales

## Versión 1.3.0 - 2026-03-30

---

## HISTORIAL DE VERSIONES

### Versión 1.3.0 (2026-03-30)
**Cambios realizados:**
- **Eliminación de pestañas obsoletas:**
  - Eliminada pestaña "Mapa Mental" (id: 'mapa')
  - Eliminada pestaña "Presentación" (id: 'presentacion')
- **Actualización de `TopicViewer.tsx`:**
  - Simplificado el tipo `TabType` a: 'investigacion' | 'flashcards' | 'infografia' | 'quiz'
  - Removidos botones de navegación para mapa y presentación
  - Removidos bloques de renderizado de contenido para estas pestañas

**Justificación:** Las pestañas de Mapa Mental y Presentación no se utilizan en el flujo actual de la aplicación. Los recursos de infografía (`infographicUrl`) permanecen disponibles en la pestaña "Infografía".

### Versión 1.2.0 (2026-03-27)
**Cambios realizados:**
- **Arreglo de redacción del ejemplo real** en `content3_1` (Administración Estratégica) para mejor claridad
- **Nuevas interfaces `FAQ` y `Reference`** en `types.ts` para estandarizar preguntas frecuentes y referencias bibliográficas
- **Actualización de `TopicContent`** para incluir `faqs: FAQ[]` y `references: Reference[]`
- **Agregadas FAQs y Referencias a TODOS los contenidos implementados:**
  - `content1_1`: 3 FAQs sobre proyectos/EPS/EDT-WBS, 3 referencias (PMBOK, Sapag, Baca Urbina)
  - `content3_1`: 5 FAQs completas de Administración Estratégica, 8 referencias bibliográficas de `alex.html`
  - `content7_1`: 3 FAQs sobre instituciones públicas, 3 referencias (SEGEPLAN, BID, UNESCO)
  - `content7_2`: 3 FAQs sobre APP/concesiones, 3 referencias (Thompson, Hill, World Bank)
- **Actualización de `generatePlaceholderContent`** para incluir campos faqs y references en todos los placeholders futuros

**Justificación:** El contenido de `alex.html` incluía secciones completas de "Preguntas Frecuentes" y "Referencias Bibliográficas" que no se habían integrado. Ahora toda la información académica está completa y estructurada de manera uniforme en todos los temas.

### Versión 1.1.0 (2026-03-27)
**Cambios realizados:**
- **Integración completa del contenido de `alex.html`** en la sección **3.1 Administración estratégica por casos**
- Creación del objeto `content3_1` en `constants.ts` con toda la información de Administración Estratégica
- Actualización de `TOPIC_CONTENT_DATA` para incluir la referencia `"3.1": content3_1`
- Modificación de la condición de exclusión de placeholders para incluir `topic.id !== "3.1"`

**Justificación:** El archivo `alex.html` contenía material académico completo sobre Administración Estratégica que necesitaba estar disponible en la plataforma de aprendizaje en la sección correspondiente (3.1). El contenido incluye definiciones, proceso estratégico, herramientas analíticas, caso de estudio real (Servicios Industriales AGV), flashcards y evaluación.

### Versión 1.0.0 (Inicial)
- Estructura base de la aplicación React con TypeScript
- Sistema de módulos y temas definido en `constants.ts`
- Componentes: TopicViewer, Quiz, Flashcards, Layout
- Contenido implementado inicialmente para temas 1.1, 7.1 y 7.2

---

## ESTRUCTURA DEL PROYECTO

### Archivos Principales

#### `constants.ts`
**Ubicación:** `/home/alexander/CunocProyectos/PracticasIniciales_Clone/constants.ts`

**Función:** Este archivo es el núcleo de contenido de la aplicación. Centraliza toda la información académica que se muestra en la plataforma de aprendizaje.

**Estructura interna:**
1. **PLACEHOLDER_IMAGE**: URL de imagen por defecto para recursos visuales no disponibles
2. **COURSE_MODULES**: Array que define los 7 módulos del curso con sus temas
3. **Objetos de contenido** (`contentX_Y`): Cada tema tiene su propio objeto con la interfaz `TopicContent`
4. **TOPIC_CONTENT_DATA**: Diccionario que mapea IDs de temas a sus objetos de contenido
5. **generatePlaceholderContent**: Función que genera contenido placeholder para temas no implementados

**Por qué existe:** La arquitectura separa la definición de módulos (`COURSE_MODULES`) del contenido real (`TOPIC_CONTENT_DATA`) para permitir:
- Carga diferida de contenido
- Facilidad de actualización sin modificar la estructura
- Placeholders automáticos para contenido pendiente

#### `types.ts`
**Ubicación:** `/home/alexander/CunocProyectos/PracticasIniciales_Clone/types.ts`

**Función:** Define las interfaces TypeScript que garantizan la integridad de datos.

**Interfaces clave:**
```typescript
interface FAQ {
  question: string;
  answer: string;
}

interface Reference {
  citation: string;
  url?: string;
}

interface TopicContent {
  summary: string;           // Resumen académico en Markdown
  keyPoints: string[];       // Puntos clave del tema
  realWorldExample: string;  // Caso de estudio real
  faqs: FAQ[];               // Preguntas frecuentes
  references: Reference[];   // Referencias bibliográficas
  flashcards: Flashcard[];   // Tarjetas de estudio
  quiz: QuizQuestion[];      // Evaluación (10 preguntas)
  mindMapUrl: string;        // URL del mapa mental
  infographicUrl: string;  // URL de infografía
  presentationUrl: string;   // URL de presentación
}
```

**Por qué es necesaria:** TypeScript necesita estas definiciones para:
- Validación en tiempo de compilación
- Autocompletado en el IDE
- Prevención de errores de tipado

#### `components/TopicViewer.tsx`
**Ubicación:** `/home/alexander/CunocProyectos/PracticasIniciales_Clone/components/TopicViewer.tsx`

**Función:** Componente principal de visualización de contenido académico.

**Props:**
- `topic: Topic` - Información del tema actual
- `module: Module` - Módulo al que pertenece
- `onFinishTopic: () => void` - Callback al completar
- `isCompleted: boolean` - Estado de completitud
- `onBackToModule: () => void` - Callback para volver

**Tabs disponibles (v1.3.0):**
1. **investigacion** - Muestra el resumen, puntos clave, ejemplo real, FAQs y referencias bibliográficas
2. **flashcards** - Renderiza el componente Flashcards
3. **infografia** - Visualización de infografía
4. **quiz** - Renderiza el componente Quiz para evaluación

**Tabs eliminados (v1.3.0):**
- ~~mapa~~ - Visualización del mapa mental (eliminada)
- ~~presentacion~~ - Enlace a material descargable (eliminada)

**Renderizado Markdown:**
El componente incluye una función `renderMarkdown()` que convierte:
- `#` → `<h1>`
- `##` → `<h2>`
- `###` → `<h3>`
- `**texto**` → `<strong>` (negrita)
- `> ` → Bloque de cita destacada
- Listas con `-` → `<ul>`/`<li>`

Esta función se aplica a `summary`, `realWorldExample` y cualquier contenido con formato Markdown.

**Nuevas secciones (v1.2.0):**
- **FAQs**: Sección condicional que muestra preguntas frecuentes con diseño de tarjeta con borde izquierdo verde
- **Referencias Bibliográficas**: Lista numerada con enlaces clicables cuando tienen URL (DOI)

#### `components/Quiz.tsx`
**Función:** Sistema de evaluación con 10 preguntas por tema.

**Lógica interna:**
- Mantiene estado de respuestas seleccionadas
- Calcula puntuación final
- Valida que todas las preguntas tengan respuesta antes de terminar
- Invoca `onFinish` al completar

#### `components/Flashcards.tsx`
**Función:** Sistema de tarjetas de estudio 3D interactivas.

**Características:**
- Efecto flip 3D al hacer clic
- Navegación entre tarjetas
- Visualización de término y definición

---

## CONTENIDO IMPLEMENTADO

### Módulo 1: Planificación de proyectos
- **1.1 La planificación de proyectos y el ejercicio de las prácticas de ingeniería** ✅

### Módulo 2: Diagnósticos
- 2.1 Tipos e instrumentos (Línea base, FODA) - Placeholder
- 2.2 Niveles (Micro y Macrodiagnósticos) - Placeholder

### Módulo 3: Estudio de casos como herramienta en la ingeniería
- **3.1 Administración estratégica por casos** ✅ (IMPLEMENTADO EN V1.1.0)
- 3.2 Conceptos y aplicaciones - Placeholder
- 3.3 Técnicas de documentación - Placeholder
- 3.4 Métodos de evaluación interna y externa - Placeholder
- 3.5 Metodología para implementación - Placeholder

### Módulo 4: Estudios en los proyectos
- 4.1 Estudio legal - Placeholder
- 4.2 Estudio ambiental - Placeholder
- 4.3 Estudio de mercado - Placeholder
- 4.4 Estudio económico - Placeholder
- 4.5 Estudio financiero - Placeholder
- 4.6 Estudio social - Placeholder
- 4.7 Estudio administrativo - Placeholder
- 4.8 Estudio técnico o de ingeniería - Placeholder

### Módulo 5: Elaboración y preparación de documentos
- 5.1 Términos de referencia - Placeholder
- 5.2 Bases de cotización - Placeholder
- 5.3 Ética y responsabilidad social - Placeholder

### Módulo 6: Estrategias de Implementación
- 6.1 Corporativa - Placeholder
- 6.2 Competitiva - Placeholder
- 6.3 Comparativa - Placeholder

### Módulo 7: Instituciones relacionadas a proyectos
- **7.1 Públicas** ✅
- **7.2 Privadas** ✅

---

## DETALLE DE IMPLEMENTACIÓN - TEMA 3.1

### Fuentes del contenido
El contenido del tema 3.1 proviene íntegramente del archivo `alex.html`, que contiene material académico sobre Administración Estratégica estructurado en secciones HTML.

### Estructura del objeto `content3_1`

#### 1. Resumen (`summary`)
Contenido Markdown con:
- Definición y propósito de la administración estratégica
- El proceso de administración estratégica (3 etapas)
- Modelos y herramientas analíticas (FODA, Porter, Cadena de valor, Balanced Scorecard)
- Importancia del liderazgo
- Cita destacada sobre ciencia vs arte

**Por qué Markdown:** El componente `TopicViewer` tiene un renderizador Markdown personalizado que convierte:
- `#` → `<h1>`
- `##` → `<h2>`
- `###` → `<h3>`
- `**texto**` → `<strong>`
- `> ` → Bloque de cita destacada
- Listas con `-` → `<ul>`/`<li>`

#### 2. Puntos Clave (`keyPoints`)
Array de 7 strings que sintetizan:
- Integración de áreas funcionales
- Propósito de competitividad y rendimientos superiores
- Las 3 etapas del proceso
- Diferencia entre eficacia (formulación) y eficiencia (implementación)
- Herramientas clave
- Rol del liderazgo estratégico
- Importancia de la evaluación continua

#### 3. Ejemplo Real (`realWorldExample`)
Caso de estudio: **Servicios Industriales AGV**

**Estructura del caso:**
- Contexto: Microempresa de servicios industriales sin modelo administrativo formal
- Diagnóstico inicial: Falta de conocimientos administrativos, baja rentabilidad, ausencia de misión/visión
- Formulación: MEFI (2.96), MEFE (2.95), misión/visión redactadas
- Estrategias: 11 estrategias específicas (capacitación, marketing digital, estandarización)
- Resultados: Capital de trabajo creció de $216,091.50 (2019) a $357,091.50 (2021)

**Por qué incluir el caso:** Proporciona evidencia empírica de la aplicación práctica de la teoría, aumentando la credibilidad académica y mostrando resultados tangibles.

#### 4. Flashcards (`flashcards`)
10 tarjetas de estudio con términos y definiciones:

| Término | Definición |
|---------|------------|
| Estrategia | Compromisos y acciones integrados para explotar competencias centrales |
| Misión | Razón de ser de la organización |
| Visión | Imagen de lo que la organización quiere ser en el futuro |
| Rendimientos Superiores | Beneficios que superan expectativas de inversionistas |
| Grupos de Interés | Stakeholders que afectan y tienen derechos sobre el desempeño |
| Competencias Centrales | Recursos y capacidades fuente de ventaja competitiva |
| Análisis Externo | Proceso de identificar oportunidades y riesgos |
| Análisis FODA | Herramienta de alineación interna/externa |
| Cinco Fuerzas de Porter | Modelo de competitividad industrial |
| Balanced Scorecard | Sistema de equilibrio financiero-estratégico |

#### 5. Evaluación (`quiz`)
10 preguntas de opción múltiple con 4 opciones cada una:

| # | Tema de la pregunta | Respuesta correcta |
|---|---------------------|-------------------|
| 1 | Propósito fundamental de la administración estratégica | B (Competitividad y rendimientos superiores) |
| 2 | Diferencia formulación vs implementación | C (Eficacia vs eficiencia) |
| 3 | Herramienta FODA | B (Alinea fortalezas/debilidades con oportunidades/amenazas) |
| 4 | Definición de Visión | B (Imagen del futuro deseado) |
| 5 | Importancia de la evaluación | B (Revisar factores, medir desempeño, medidas correctivas) |
| 6 | Competencias Centrales | B (Fuente de ventaja competitiva) |
| 7 | Responsables del proceso | B (Líderes estratégicos y directivos) |
| 8 | Ciencia vs Arte | C (Ambas: análisis de datos + juicio creativo) |
| 9 | Resultado MEFI en caso AGV | C (2.96 - fuerte internamente con debilidades) |
| 10 | Crecimiento capital de trabajo AGV | A ($216,091.50 → $357,091.50) |

#### 6. FAQs (`faqs`)
5 preguntas frecuentes con respuestas completas:

| # | Pregunta |
|---|----------|
| 1 | ¿Por qué es importante implementar la administración estratégica? |
| 2 | ¿Cuál es la diferencia entre formulación e implementación? |
| 3 | ¿Quiénes son responsables de la administración estratégica? |
| 4 | ¿Qué ocurre si una empresa no evalúa sus estrategias? |
| 5 | ¿Es la administración estratégica una ciencia o un arte? |

#### 7. Referencias Bibliográficas (`references`)
8 referencias académicas del archivo `alex.html`:

| # | Referencia |
|---|------------|
| 1 | Hill, C. W. L., y Jones, G. R. (2011). Administración estratégica: Un enfoque integral (9.ª ed.). Cengage Learning. |
| 2 | David, F. R. (2013). Conceptos de administración estratégica (14.ª ed.). Pearson Educación. |
| 3 | Hitt, M. A., Ireland, R. D., y Hoskisson, R. E. (2008). Administración estratégica: Competitividad y globalización (7.ª ed.). Cengage Learning. |
| 4 | Thompson, A. A., et al. (2012). Administración estratégica: Teoría y casos (18.ª ed.). McGraw-Hill Interamericana. |
| 5 | Lana, R. A. (2008). La administración estratégica como herramienta de gestión. Visión de Futuro, 9(1), 89-104. |
| 6 | Montesdeca Villavicencio, F. E., et al. (2024). Administración estratégica basada en la toma de decisiones efectiva. Ciencia y Desarrollo, 15(2), 1-14. |
| 7 | Rangel, N. (2024). Conocimiento en administración estratégica... (con DOI) |
| 8 | González-Villegas, M. F., et al. (2021). Implementación de la Administración Estratégica en una Microempresa de Servicios... |

| # | Tema de la pregunta | Respuesta correcta |
|---|---------------------|-------------------|
| 1 | Propósito fundamental de la administración estratégica | B (Competitividad y rendimientos superiores) |
| 2 | Diferencia formulación vs implementación | C (Eficacia vs eficiencia) |
| 3 | Herramienta FODA | B (Alinea fortalezas/debilidades con oportunidades/amenazas) |
| 4 | Definición de Visión | B (Imagen del futuro deseado) |
| 5 | Importancia de la evaluación | B (Revisar factores, medir desempeño, medidas correctivas) |
| 6 | Competencias Centrales | B (Fuente de ventaja competitiva) |
| 7 | Responsables del proceso | B (Líderes estratégicos y directivos) |
| 8 | Ciencia vs Arte | C (Ambas: análisis de datos + juicio creativo) |
| 9 | Resultado MEFI en caso AGV | C (2.96 - fuerte internamente con debilidades) |
| 10 | Crecimiento capital de trabajo AGV | A ($216,091.50 → $357,091.50) |

---

## FLUJO DE DATOS EN LA APLICACIÓN

### Carga de un tema:

1. **Usuario selecciona tema** en `App.tsx`
2. **Se renderiza `TopicViewer`** con las props del tema seleccionado
3. **`useEffect` llama a `getTopicContent(topic.id)`**
4. **Servicio busca en `TOPIC_CONTENT_DATA[id]`**
5. **Si no existe contenido real, retorna placeholder**
6. **El contenido se almacena en el estado `content`**
7. **El renderizador muestra la información según la pestaña activa**

### Diagrama de relaciones:

```
App.tsx
    ├── ModuleCard (lista de módulos)
    └── TopicViewer (vista de tema)
            ├── getTopicContent() → constants.ts
            │       └── TOPIC_CONTENT_DATA[id]
            ├── renderMarkdown()
            ├── Quiz
            └── Flashcards
```

---

## ARCHIVOS RELACIONADOS

### Documentación complementaria:
- `GUIA_REEMPLAZO_CONTENIDO.md` - Guía técnica para agregar nuevos temas
- `README.md` - Instrucciones de ejecución local
- `InvestigacionMario.md` - Investigación adicional (pendiente de integrar)

### Origen del contenido 3.1:
- `alex.html` - Archivo fuente con el contenido de Administración Estratégica

---

## CONSIDERACIONES TÉCNICAS

### Por qué TypeScript:
- Tipado estático previene errores en tiempo de desarrollo
- Interfaces garantizan consistencia en los objetos de contenido
- Autocompletado facilita el mantenimiento

### Por qué React:
- Componentes reutilizables (TopicViewer, Quiz, Flashcards)
- Virtual DOM para actualizaciones eficientes
- Hooks para manejo de estado y efectos secundarios

### Por qué la estructura centralizada en constants.ts:
- Facilita la actualización de contenido sin modificar lógica de presentación
- Permite versionado claro del material académico
- Posibilita futura migración a backend/API

---

## PRÓXIMOS PASOS SUGERIDOS

1. **Integrar contenido pendiente de otros temas:**
   - Módulo 2: Diagnósticos (2.1, 2.2)
   - Módulo 3: 3.2, 3.3, 3.4, 3.5
   - Módulos 4, 5, 6 completos

2. **Agregar recursos visuales:**
   - Crear/subir mapas mentales reales para cada tema
   - Diseñar infografías específicas
   - Preparar presentaciones descargables

3. **Mejoras técnicas:**
   - Implementar persistencia de progreso en Firebase
   - Agregar sistema de autenticación completo
   - Crear modo offline con service workers

---

## CONTACTO Y MANTENIMIENTO

**Repositorio:** PracticasIniciales_Clone
**Estructura de datos:** Cualquier modificación a `TopicContent` requiere actualizar:
1. `types.ts` (interfaz)
2. Todos los objetos `contentX_Y` existentes
3. La función `generatePlaceholderContent` (si aplica)

**Regla de oro:** Nunca modificar la estructura de `TopicContent` sin planificar la migración de todo el contenido existente.

---

*Documentación generada automáticamente. Última actualización: 2026-03-30 (Versión 1.3.0)*
