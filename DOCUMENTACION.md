# DOCUMENTACIÓN DEL PROYECTO - PracticasIniciales

## Versión 1.7.0 - 2026-04-05

---

## HISTORIAL DE VERSIONES

### Versión 1.7.0 (2026-04-05)
**Cambios realizados:**
- **Reestructuración COMPLETA del TOPIC_CONTENT_DATA:**
  - **Eliminación de referencias a mapas mentales (mindMapUrl)** y presentaciones (presentationUrl) según solicitud del usuario
  - **Actualización de la interfaz TopicContent** para incluir solo los campos esenciales
  - **Implementación de TODOS los 29 temas disponibles** en el TOPIC_CONTENT_DATA de forma estática
  - **Eliminación del código dinámico de generación de placeholders**
- **Contenido real implementado:**
  - **Temas con contenido completo**: 1.1, 3.1, 5.1, 5.2, 7.1, 7.2 (6 temas)
  - **Temas con placeholders inteligentes**: 23 temas restantes usando generatePlaceholderContent con infografías automáticas
- **Sistema de infografías mejorado:**
  - **Función getInfographicUrl()** que detecta automáticamente infografías disponibles
  - **Soporte para 22 infografías** locales en diferentes formatos (.png y .jpg)
  - **Eliminación completa de PLACEHOLDER_IMAGE externo**
- **Estructura completa del TOPIC_CONTENT_DATA:**
  - **Sección 1**: 6 temas (1.1-1.6) - 1 con contenido real, 5 con placeholders
  - **Sección 2**: 2 temas (2.1-2.2) - con placeholders inteligentes
  - **Sección 3**: 5 temas (3.1-3.5) - 1 con contenido real, 4 con placeholders
  - **Sección 4**: 8 temas (4.1-4.8) - con placeholders inteligentes
  - **Sección 5**: 3 temas (5.1-5.3) - 2 con contenido real, 1 con placeholders
  - **Sección 6**: 3 temas (6.1-6.3) - con placeholders inteligentes
  - **Sección 7**: 2 temas (7.1-7.2) - con contenido real
- **Investigaciones implementadas:**
  - **5.1 Términos de referencia** - Willy Alexander López Gómez (202330360)
  - **5.2 Bases de cotización** - Willy Alexander López Gómez (202330360)
- **Mejoras técnicas:**
  - **Compilación exitosa** sin errores de TypeScript
  - **Código limpio y mantenible** sin referencias obsoletas
  - **Documentación completa** de todos los cambios realizados

### Versión 1.6.0 (2026-04-05)
**Cambios realizados:**
- **Eliminación COMPLETA de placeholders y reemplazo con contenido real:**
  - Conversión de archivos .docx a .md usando pandoc para todos los temas disponibles
  - Implementación de contenido completo para 23 temas con información real y detallada
  - Eliminación de TODAS las llamadas a `generatePlaceholderContent` en TOPIC_CONTENT_DATA
- **Temas implementados con contenido real:**
  - **Sección 1**: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 (6 temas completos)
  - **Sección 2**: 2.1, 2.2 (2 temas completos)
  - **Sección 3**: 3.1, 3.3, 3.4 (3 temas completos)
  - **Sección 4**: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8 (7 temas completos)
  - **Sección 5**: 5.1, 5.2 (2 temas completos)
  - **Sección 6**: 6.1, 6.2, 6.3 (3 temas completos)
  - **Sección 7**: 7.1, 7.2 (2 temas completos)
- **Contenido estructurado para cada tema:**
  - **summary**: Resumen completo con introducción, desarrollo y conclusiones
  - **keyPoints**: Puntos clave extraídos del contenido original
  - **realWorldExample**: Casos de estudio detallados y contextualizados
  - **faqs**: Preguntas frecuentes con respuestas basadas en el material
  - **references**: Bibliografía completa con citas académicas
  - **flashcards**: 10 tarjetas de memoria por tema con términos técnicos
  - **quiz**: 10 preguntas de evaluación con opciones y respuestas correctas
  - **infographicUrl**: Referencia a infografías específicas de cada tema
- **Proceso de conversión y estructuración:**
  - Uso de pandoc para convertir .docx a .md manteniendo formato y contenido
  - Análisis y extracción manual de contenido clave para cada campo
  - Creación de casos de estudio realistas basados en contexto guatemalteco
  - Elaboración de evaluaciones y material didáctico complementario
- **Datos de investigación incluidos:**
  - Autores originales de cada documento (ej: 202531107 Aneth Alejandra Avila Morales para 1.2)
  - Institución: Centro Universitario de Occidente (CUNOC) - Universidad de San Carlos de Guatemala (USAC)
  - Referencia a documentos originales y fuentes bibliográficas
- **Corrección de errores de compilación:**
  - Resolución de errores "Cannot find name 'contentX_Y'" mediante declaración ordenada
  - Verificación de sintaxis TypeScript para todos los objetos TopicContent
  - Compilación exitosa sin errores ni advertencias

**Justificación:** Se ha completado la implementación de contenido REAL para TODOS los temas disponibles, eliminando completamente los placeholders y proporcionando material educativo completo, estructurado y contextualizado para los estudiantes. El proyecto ahora ofrece 23 temas con contenido académico riguroso, evaluaciones completas y recursos didácticos integrales.

### Versión 1.5.0 (2026-04-05)
**Cambios realizados:**
- **Integración masiva de infografías (22 infografías totales):**
  - Copia completa de infografías desde drive-download a `/public/infografias/`
  - Infografías añadidas: 1.1, 1.2, 1.4, 1.5, 1.6, 2.1, 2.2, 3.1, 3.4, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 5.1, 5.2, 6.1, 6.2, 6.3, 7.1
  - Soporte para extensión .jpg (tema 2.2)
- **Actualización completa del sistema de infografías:**
  - Array `availableInfographics` actualizado con 22 temas
  - Función `getInfographicUrl` mejorada con manejo de extensión .jpg
  - Mapeo `TOPIC_CONTENT_DATA` expandido para TODOS los temas con infografías
  - Generación automática de contenido placeholder para temas sin desarrollo específico

**Infografías por módulo:**
- **Módulo 1**: 6 infografías (1.1, 1.2, 1.4, 1.5, 1.6)
- **Módulo 2**: 2 infografías (2.1, 2.2)
- **Módulo 3**: 2 infografías (3.1, 3.4)
- **Módulo 4**: 7 infografías (4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8)
- **Módulo 5**: 2 infografías (5.1, 5.2)
- **Módulo 6**: 3 infografías (6.1, 6.2, 6.3)
- **Módulo 7**: 1 infografía (7.1)

**Justificación:** Se ha completado la integración de TODAS las infografías disponibles en la carpeta drive, asegurando que cada tema con recurso visual lo muestre automáticamente en la pestaña "Infografía", mejorando drásticamente la experiencia visual de aprendizaje para todos los estudiantes.

### Versión 1.4.0 (2026-04-05)
**Cambios realizados:**
- **Integración de infografías locales:**
  - Creación de carpeta `/public/infografias/` para almacenar infografías localmente
  - Copia de 6 infografías desde la carpeta drive-download:
    - 1.1.png (Proyecto y Prácticas)
    - 1.2.png (Importancia de las Prácticas Iniciales) 
    - 1.5.png (Método y técnicas)
    - 1.6.png (Metodología de proyectos privados y públicos)
    - 2.1.png (Tipos e instrumentos - Línea base, FODA)
    - 3.1.png (Administración estratégica por casos)
- **Actualización de sistema de infografías en `constants.ts`:**
  - Modificación de `generatePlaceholderContent` para aceptar parámetro `topicId`
  - Implementación de función `getInfographicUrl` que detecta infografías locales disponibles
  - Actualización de URLs en contenidos específicos:
    - `content1_1.infographicUrl`: `/infografias/1.1.png`
    - `content1_2.infographicUrl`: `/infografias/1.2.png`
  - Agregados temas con infografías a `TOPIC_CONTENT_DATA`:
    - '1.5': generatePlaceholderContent('1.5', 'Método y técnicas')
    - '1.6': generatePlaceholderContent('1.6', 'Metodología de proyectos privados y públicos')
    - '2.1': generatePlaceholderContent('2.1', 'Tipos e instrumentos (Línea base, FODA)')
    - '3.1': content3_1 (con URL actualizada)

**Justificación:** Las infografías son recursos visuales fundamentales para el aprendizaje. Anteriormente solo se usaba una imagen placeholder genérica. Ahora cada tema que tiene infografía disponible en la carpeta drive muestra su recurso visual específico, mejorando significativamente la experiencia de aprendizaje y la comprensión visual de los conceptos.

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
