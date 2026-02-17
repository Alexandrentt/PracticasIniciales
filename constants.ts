import { Module, TopicContent } from "./types";

// Reemplaza esta URL con la imagen que subiste (alójala en imgur, ibb.co o en tu storage de firebase)
// He puesto una imagen con estética similar (anime/lo-fi/fisheye) como placeholder
export const PLACEHOLDER_IMAGE = "https://i.pinimg.com/originals/2c/61/d6/2c61d6d6402f0663d2d9b62711690076.jpg";

export const COURSE_MODULES: Module[] = [
  {
    id: 1,
    title: "Planificación de proyectos y prácticas de la ingeniería",
    topics: [
      { id: "1.1", title: "Proyecto y prácticas" },
      { id: "1.2", title: "Importancia de la planificación" },
      { id: "1.3", title: "Tipos de proyectos" },
      { id: "1.4", title: "Etapas y ciclos" },
      { id: "1.5", title: "Método y técnicas" },
      { id: "1.6", title: "Metodología de proyectos privados y públicos" },
    ],
  },
  {
    id: 2,
    title: "Diagnósticos",
    topics: [
      { id: "2.1", title: "Tipos e instrumentos (Línea base, FODA)" },
      { id: "2.2", title: "Niveles (Micro y Macrodiagnósticos)" },
    ],
  },
  {
    id: 3,
    title: "Estudio de casos como herramienta en la ingeniería",
    topics: [
      { id: "3.1", title: "Administración estratégica por casos" },
      { id: "3.2", title: "Conceptos y aplicaciones" },
      { id: "3.3", title: "Técnicas de documentación" },
      { id: "3.4", title: "Métodos de evaluación interna y externa" },
      { id: "3.5", title: "Metodología para implementación" },
    ],
  },
  {
    id: 4,
    title: "Estudios en los proyectos",
    topics: [
      { id: "4.1", title: "Estudio legal" },
      { id: "4.2", title: "Estudio ambiental" },
      { id: "4.3", title: "Estudio de mercado" },
      { id: "4.4", title: "Estudio económico" },
      { id: "4.5", title: "Estudio financiero" },
      { id: "4.6", title: "Estudio social" },
      { id: "4.7", title: "Estudio administrativo" },
      { id: "4.8", title: "Estudio técnico o de ingeniería" },
    ],
  },
  {
    id: 5,
    title: "Elaboración y preparación de documentos",
    topics: [
      { id: "5.1", title: "Términos de referencia" },
      { id: "5.2", title: "Bases de cotización" },
      { id: "5.3", title: "Ética y responsabilidad social" },
    ],
  },
  {
    id: 6,
    title: "Estrategias de Implementación",
    topics: [
      { id: "6.1", title: "Corporativa" },
      { id: "6.2", title: "Competitiva" },
      { id: "6.3", title: "Comparativa" },
    ],
  },
  {
    id: 7,
    title: "Instituciones relacionadas a proyectos",
    topics: [
      { id: "7.1", title: "Públicas" },
      { id: "7.2", title: "Privadas" },
    ],
  },
];

// Content for 1.1 "Proyecto y prácticas"
const content1_1: TopicContent = {
  summary: `En el ámbito de la ingeniería, un **proyecto** se define como un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único. La naturaleza temporal de los proyectos indica un principio y un final definidos. El final se alcanza cuando se logran los objetivos del proyecto o cuando se termina el proyecto porque sus objetivos no se cumplirán o ya no son necesarios.

**Prácticas de Ingeniería:**
Las prácticas de ingeniería no se limitan solo al cálculo y diseño técnico. Involucran una gestión integral que incluye:

1.  **Gestión del Alcance:** Definir qué se hará y qué no se hará.
2.  **Gestión del Tiempo:** Cronogramas, hitos y ruta crítica.
3.  **Gestión del Costo:** Presupuestos y control de gastos.
4.  **Ética y Responsabilidad:** Un ingeniero debe priorizar la seguridad, la salud y el bienestar del público.

La diferencia fundamental entre **operaciones** y **proyectos** es que las operaciones son continuas y repetitivas, mientras que los proyectos son temporales y únicos.`,
  keyPoints: [
    "Definición de Proyecto: Esfuerzo temporal para un resultado único.",
    "Triple Restricción: Alcance, Tiempo y Costo son las variables interdependientes.",
    "Ciclo de Vida: Inicio, Planificación, Ejecución, Monitoreo/Control y Cierre.",
    "Stakeholders: Todas las partes interesadas que afectan o son afectadas por el proyecto.",
    "Diferencia con Operaciones: La temporalidad y la unicidad."
  ],
  realWorldExample: "La construcción del Puente Chiapas en México. No fue una tarea rutinaria (operación), sino un esfuerzo único con un presupuesto definido, una fecha de entrega y retos técnicos específicos (geología, clima, materiales), requiriendo prácticas de ingeniería civil, estructural y ambiental coordinadas.",
  flashcards: [
    { term: "Proyecto", definition: "Esfuerzo temporal llevado a cabo para crear un producto, servicio o resultado único." },
    { term: "Operación", definition: "Trabajo continuo y repetitivo que sostiene el negocio (ej. manufactura en serie)." },
    { term: "Stakeholder", definition: "Individuo, grupo u organización que puede afectar, verse afectado o percibirse como afectado por una decisión del proyecto." },
    { term: "Triple Restricción", definition: "Modelo que describe el equilibrio entre Alcance, Tiempo y Costo." },
    { term: "Hito (Milestone)", definition: "Un punto o evento significativo dentro del proyecto, generalmente marca la finalización de un entregable importante." },
    { term: "Entregable", definition: "Cualquier producto, resultado o capacidad único y verificable para ejecutar un servicio que se debe producir para completar una fase." },
    { term: "Ciclo de Vida", definition: "Serie de fases por las que pasa un proyecto desde su inicio hasta su cierre." },
    { term: "PMBOK", definition: "Project Management Body of Knowledge. Estándar global para la gestión de proyectos." }
  ],
  quiz: [
    { question: "¿Cuál es la característica principal que diferencia un proyecto de una operación?", options: ["El costo", "La temporalidad y unicidad", "El uso de maquinaria", "El personal involucrado"], correctAnswerIndex: 1 },
    { question: "En la Triple Restricción, si aumentas el Alcance sin mover la fecha de entrega, ¿qué es lo más probable que aumente?", options: ["La calidad", "El costo", "La satisfacción", "El riesgo solamente"], correctAnswerIndex: 1 },
    { question: "¿Qué significa que un proyecto tiene 'elaboración progresiva'?", options: ["Que siempre cuesta más de lo planeado", "Que se detalla y precisa más conforme se dispone de mejor información", "Que no tiene plan inicial", "Que se hace rápido"], correctAnswerIndex: 1 },
    { question: "¿Qué es un 'Entregable' en un proyecto de ingeniería?", options: ["Un paquete de mensajería", "Un producto o resultado verificable y medible", "El dinero sobrante", "La firma del contrato"], correctAnswerIndex: 1 },
    { question: "¿A quién se le considera un 'Stakeholder'?", options: ["Solo al que paga (Patrocinador)", "Solo al equipo de ingeniería", "A cualquier persona o entidad afectada por el proyecto", "Solo al gobierno"], correctAnswerIndex: 2 },
    { question: "La fase donde se define el Acta de Constitución del proyecto es:", options: ["Ejecución", "Cierre", "Inicio", "Planificación"], correctAnswerIndex: 2 },
    { question: "¿Cuál NO es una restricción clásica de la gestión de proyectos?", options: ["Tiempo", "Costo", "Alcance", "Suerte"], correctAnswerIndex: 3 },
    { question: "El mantenimiento rutinario de una carretera se considera:", options: ["Un proyecto", "Una operación", "Un programa", "Un portafolio"], correctAnswerIndex: 1 },
    { question: "¿Qué documento autoriza formalmente la existencia de un proyecto?", options: ["El plano arquitectónico", "El Project Charter (Acta de Constitución)", "La factura de anticipo", "Un correo electrónico del jefe"], correctAnswerIndex: 1 },
    { question: "En ética de la ingeniería, la prioridad máxima es:", options: ["Maximizar las ganancias", "Cumplir el cronograma a toda costa", "La seguridad, salud y bienestar público", "Satisfacer al cliente aunque sea peligroso"], correctAnswerIndex: 2 }
  ],
  mindMapUrl: PLACEHOLDER_IMAGE,
  infographicUrl: PLACEHOLDER_IMAGE,
  presentationUrl: "#"
};

// Placeholder content generator for other topics
const generatePlaceholderContent = (topicId: string, title: string): TopicContent => ({
  summary: `Este es el contenido de investigación para el tema "${title}" (${topicId}). \n\nAquí se detallará la teoría, normativas y procedimientos de ingeniería relacionados. Este contenido será reemplazado por la información curricular específica.`,
  keyPoints: [
    "Punto clave 1 sobre ingeniería.",
    "Punto clave 2 sobre gestión.",
    "Punto clave 3 sobre normativas.",
    "Punto clave 4 sobre aplicación.",
    "Punto clave 5 sobre ética."
  ],
  realWorldExample: "Ejemplo de aplicación en una industria local o proyecto de infraestructura nacional.",
  flashcards: [
    { term: "Concepto A", definition: "Definición técnica del concepto A." },
    { term: "Concepto B", definition: "Definición técnica del concepto B." },
    { term: "Norma ISO", definition: "Explicación de la norma aplicable." },
    { term: "Variable X", definition: "Factor crítico en este tipo de análisis." }
  ],
  quiz: Array.from({ length: 10 }, (_, i) => ({
    question: `Pregunta ${i + 1} sobre ${title}. ¿Cuál es la opción correcta?`,
    options: ["Opción A (Incorrecta)", "Opción B (Correcta)", "Opción C (Incorrecta)", "Opción D (Incorrecta)"],
    correctAnswerIndex: 1
  })),
  mindMapUrl: PLACEHOLDER_IMAGE,
  infographicUrl: PLACEHOLDER_IMAGE,
  presentationUrl: "#"
});

// Mock database of content
export const TOPIC_CONTENT_DATA: Record<string, TopicContent> = {
  "1.1": content1_1
};

// Populate placeholders for remaining topics
COURSE_MODULES.forEach(module => {
  module.topics.forEach(topic => {
    if (topic.id !== "1.1") {
      TOPIC_CONTENT_DATA[topic.id] = generatePlaceholderContent(topic.id, topic.title);
    }
  });
});
