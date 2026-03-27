import { Module, TopicContent } from "./types";

// Reemplaza esta URL con la imagen que subiste (alójala en imgur, ibb.co o en tu storage de firebase)
// He puesto una imagen con estética similar (anime/lo-fi/fisheye) como placeholder
export const PLACEHOLDER_IMAGE = "https://i.pinimg.com/originals/2c/61/d6/2c61d6d6402f0663d2d9b62711690076.jpg";

export const COURSE_MODULES: Module[] = [
  {
    id: 1,
    title: "Planificación de proyectos y prácticas de la ingeniería",
    topics: [
      { id: "1.1", title: "La planificación de proyectos y el ejercicio de las prácticas de ingeniería" },
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
  summary: `## 1.1 La planificación de proyectos y el ejercicio de las prácticas de ingeniería: Una Visión Integradora

La comprensión profunda de la ingeniería contemporánea exige una visión integradora donde el proyecto no se visualice únicamente como un plano técnico, sino como un **sistema vivo y estructurado de gestión**. En este sentido, la relación sinérgica entre la formalidad de un proyecto y la experimentación de las prácticas constituye el cimiento sobre el cual se construye la solución a las necesidades biológicas, sociales y económicas de la humanidad.

### ¿Qué es verdaderamente un Proyecto de Ingeniería?
De acuerdo a las mejores prácticas internacionales del _Project Management Institute_ (PMBOK® 7ma Edición), un proyecto se define técnicamente como un **esfuerzo de carácter temporal que se emprende con el propósito deliberado de crear un producto, servicio o resultado único**. 

* **Temporalidad es la Clave**: Esta naturaleza temporal es fundamental, pues establece que todo proyecto tiene un principio y un final claramente definidos. Esto es lo que diferencia tajantemente a un proyecto de las operaciones rutinarias y continuas de una empresa (por ejemplo, el diseño inicial de una red de acueductos es un proyecto; pero el mantenimiento mensual de dicha red es una operación de rutina).
* **Nacimiento de la "Idea"**: Desde una perspectiva pedagógica (alineada con la metodología de preparación de proyectos de Nassir Sapag Chain y Gabriel Baca Urbina), el proyecto nace de una «idea» primaria. Esta idea, analizada a través del _Árbol de Problemas_ y el _Análisis FODA_ (el cual es la brújula estratégica de autores contemporáneos como Fred R. David), se convierte en la respuesta contundente ante una carencia detectada o el medio óptimo para aprovechar una oportunidad de negocio latente.

El ingeniero moderno no solo busca "que la viga soporte el peso" o "que el código compile". Persigue verdaderamente una solución inteligente que sea **económica, social y técnicamente factible**. Por ende, el proyecto es el vehículo predilecto mediante el cual las organizaciones y el Estado (a través de guías oficiales como el manual de SEGEPLAN) transforman una visión estratégica nacional en resultados tangibles que generen _valor_. Este valor es el indicador definitivo de éxito y puede manifestarse como una rentabilidad financiera (empresas privadas), una utilidad y equidad social (entidades públicas), o simplemente la satisfacción de los requisitos técnicos críticos de un usuario final.

---

### ¿Qué son las Prácticas de Ingeniería? El Crisol del Aprendizaje Aplicado
Frente a la rigidez abstracta del "proyecto", emergen las **prácticas de ingeniería**, entendidas como el proceso de inmersión y la aplicación sistemática de conocimientos científicos, habilidades blandas, aptitudes analíticas y sólidos criterios éticos propios de la especialidad, aplicados in situ en situaciones reales del mundo.

No se trata en absoluto de la ejecución mecánica de tareas. Es un proceso empírico de aprendizaje y validación. En la práctica profesional, el ingeniero confronta violentamente los fundamentos teóricos empíricos y de diseño aprendidos en la academia (cálculo iterativo, termodinámica, normatividad civil) con las insondables complejidades e imprevistos del entorno real (climas impredecibles, variaciones del mercado, retrasos críticos y limitaciones del capital humano). Esto exige una **orquestación proactiva y minuciosa** de recursos humanos, materiales y financieros para lograr los resultados previstos bajo estrictas restricciones implacables de tiempo y presupuesto.

#### Progresión Didáctica de las Prácticas (Modelo Formativo CUNOC)
En el marco ineludible de la formación académica profesional y el ejercicio supervisado (tal como está estandarizado en la División de Ciencias de la Ingeniería del CUNOC y facultades latinoamericanas afines), las prácticas de campo se encuentran estructuradas en niveles de complejidad ascendente. El objetivo de este andamiaje educativo no es otro que garantizar un desarrollo técnico verdaderamente integral paso a paso:

1. **Prácticas Iniciales (El Despertar de la Vocación y Conceptualización):**
   * Misión Primordial: Tienen como fin principal **motivar fervientemente al estudiante** novato, permitiéndole una primera aproximación empírica al «quehacer» milenario de la ingeniería.
   * Entorno Limitado: A través de proyectos sencillos, experimentos de aula didácticos y problemas con variables y complejidad técnica sumamente controlada o limitada, el enfoque principal reside en la conceptualización básica del problema, el despertar analítico y la aplicación incipiente pero segura de la carrera.

2. **Prácticas Intermedias (El Trabajo Sistémico y la Realidad Operativa):**
   * Misión Primordial: Buscan fortalecer decisivamente y consolidar al profesional en formación al exponerlo frontalmente a proyectos que reflejan con transparencia la **realidad implacable de la industria**.
   * El Paradigma Colaborativo: Llegados a esta etapa, **el trabajo en equipo multidisciplinario adquiere una relevancia ineludible y crítica**. El estudiante asimila que la gran ingeniería global jamás es un esfuerzo llanamente solitario, comprendiendo rápidamente que la distribución inteligente de perfiles vocacionales y habilidades interpersonales, junto a la unificación de criterios de diferentes diseños, permite abordar sin reparos problemas de mayor envergadura técnica. Esto dota a las regiones de soluciones inmensamente más eficientes, resilientes y pertinentes para la sociedad actual.

3. **Ejercicio Profesional Supervisado (EPS - La Consagración del Ingeniero de Impacto):**
   * Misión Primordial: Es, de facto, la brillante culminación operativa de la carrera y suele operar en la región como una modalidad optativa de graduación inmersiva que amalgama tres ejes dorados e indestructibles de la academia moderna: **docencia local, investigación técnica de campo y el servicio honesto a la comunidad**.
   * Inmersión Total: A través del EPS o esquemas de residencia profesional equiparables, el estudiante abandona las aulas de confort. Realiza una residencia profesional vitalicia inyectándose profundamente, por varios meses, en el ADN de instituciones formales estatales, municipalidades y ONGs. Su mandato único allí es proponer de primera mano, formular económica y técnicamente, y ayudar a implementar contundentes **modelos de ingeniería que ataquen de raíz e inteligentemente las grandes problemáticas cotidianas limitantes de nuestro entorno**. Es aquí donde el diseño cobra utilidad nacional real, mitigando vulnerabilidades (ej. desabastecimiento hídrico o falencias logísticas masivas).

---

### El Dominio de la Planificación Operativa: Las Matemáticas detrás de la Magia
Para que la integración de estos conocimientos y necesidades desemboque exitosamente en obras tangibles, un agente debe obligatoriamente adueñarse de lo que los estándares internacionales más reverenciados denominan **Dominios de Desempeño del Proyecto**. El PMBOK establece que estos majestuosos dominios son monumentales grupos de disciplinas intelectuales integradas y de actividades que necesariamente funcionan al absoluto unísono. 

Subrayablemente, dentro de estos ecosistemas gerenciales, **el dominio y rigor de la planificación impera por sobre todo concepto y proceso**. Consiste incondicionalmente en el mandato directivo de desarrollar "intuitivamente pero fundamentado" (proactivamente) un agresivo plan estratégico y un esquema de trabajo para parir uno a uno los bloques o subsistemas funcionales (formalmente conocidos como *"entregables"*) que en suma propulsarán como un motor el alcance de los resultados exactos encomendados al inicio en el borrador de perfil de Sapag.

* **La EDT / WBS (Estructura de Desglose del Trabajo):** Se consagra internacionalmente como la herramienta angular, madre de cualquier asignación exitosa de ingeniería. Esta estructura gráfica conceptual asume que no existe en el universo civilización capaz de manejar un "proyecto macrotitánico de un bocado". Por tanto, se apodera del requerimiento, y le aplica mecánicamente sin compasión una espectacular **descomposición jerárquica del alcance total**. Ramifica verticalmente las obligaciones en porciones de terreno y fases de control de tamaño administrable. Como ventaja aplastante, este paradigma no solo ilumina a los directivos sobre los riesgos microscópicos ocultos del diagrama, sino que pavimenta toda la calzada requerida para facilitar una soberbia y meticulosa gestión humana integral, asignación exacta de responsabilidad con presupuestos exactos al milímetro en la línea base y un control fiscal y paramétrico milimétricamente inviolable.

### Conclusión Pedagógica: La Interfaz de la Sinergia
A manera de un compendio ilustrativo final, es imperativa y mandatoria la lección para todo lector de esta fase sobre la relación indivisible entre disciplina (el proyecto) e inventiva empírica formativa (las prácticas). La ingeniería en la etapa académica moderna necesita forzosamente entenderse no como un plan aislado temporal desconectado de la sociedad, sino como un bellísimo pero **rigurosamente complejo proceso cíclico tridimensional dinámico**. Inicia obligatoriamente nadando a ras de la confusa **incertidumbre** económica, abstracta y política de donde emerge la **visión inicial del proyecto**; pero tras el implacable machete del estudio intelectual preinversionista, evoluciona invariablemente hasta consolidarse en la rocosa resiliencia y **certidumbre incuestionable de un resultado funcional palpable**.

**Las prácticas proveerán de por vida al profesional de su irremplazable marco de resiliencia empírico, innovación social experimental, consciencia colectiva y ética humana; al tiempo indomable que "el proyecto formal" le entregará como dotación el blindaje esquelético inquebrantable, la estructura de supervisión de calidad y el blindaje organizacional**. Ha sido demostrado académicamente y en la praxis pública: Solamente cuando convergen estos dos colosales motores en perfecta sinfonía métrica —es decir, mediante esta soberbia sinergia académica aplicada a campo—, el virtuoso estudiante de la ciencia técnica madura aceleradamente para tomar por fin el manto de su propia historia organizativa y social de manera madura como un indudable y absoluto **agente de confianza cívico** que se encarga con honor de sobreanteponer la seguridad civil intrínseca y la promoción del bienestar poblacional como estandarte sagrado central, sin descuidar, en una misma bocanada de aire gerencial, el principio rector inviolable corporativista de lograr en cada tuerca y engranaje la máxima y gloriosa eficientización operativa, logística y de la rentabilidad matemática contable sobre cada recurso que la institución delegue en sus manos.`,
  keyPoints: [
    "La ingeniería requiere una visión de sistemas vivos y gestionables, que supere el simple modelo de 'planos o manuales técnicos' aislados, fusionando el componente social con el técnico.",
    "Todo Proyecto de Ingeniería es legalmente un esfuerzo inmensamente temporal provisto de principio/fin, estructurado a nivel macro y micro, focalizado puramente en la incesante creación inamovible de un producto, innovación de un servicio o consolidación de un resultado completamente único a la época de ejecución (PMBOK® 7).",
    "Radicalmente alejado de una infinita cadena de operaciones rutinarias perpetuas y mantenimientos programados fabriles, el proyecto tiene como génesis una primigenia 'idea'. Esta se forja bajo el crudo fuego estadístico del indispensable Árbol de Problemas y Diagnósticos Multilocales (FODA Estratégico Clásico de Fred David) buscando resolver carestías reales de peso y aprovechamientos oportunos socioambientales irrepetibles que propulsen a una empresa privada al estrato macro o provea justicia local.",
    "El valor cardinal tangible del horizonte del proyecto—la sagrada Métrica Única de Éxito o MVP de las directivas gerenciales—nunca recae simplemente en la satisfacción algorítmica técnica individual abstracta pura de los ingenieros genios. En su profundo ADN gerencial, se ampara fundamentalmente en la viabilidad fáctica social, el estricto cumplimiento legal, y el inmenso rédito de bienestar que le obsequia como dividendo de retorno final financiero u operativo al ansioso Estado, Inversor, Cliente Principal o Usuario Beneficiario Comunitario Final.",
    "Bajo una lupa pedagógica estandarizada de excelencia universitaria como la del CUNOC guatemalteco, las Prácticas de Ingeniería escalan de un escenario inicial simple amarrado al aprendizaje conceptual didáctico vocacional en ambientes limpios, hacia un denso segundo nivel de Práctica Intermedia multidisciplinaria repleto de caos probabilístico ingenieril imitando a los estragos de la insoportable y cruda industria local manufacturera y civil, abriendo indiscutible camino de baldosas amarillas formativo y psicosocial indispensable hacia la excelsa culminación suprema denominada unánimemente como Ejercicio Profesional Supervisado (EPS).",
    "El magno Ejercicio Profesional Supervisado (EPS) abandera dignamente como meta curricular y civil de toda facultad contemporánea, el inalienable y romántico—pero de alta rentabilidad cívica—, trinomio operativo local: amalgamar en total unísono una poderosa base de Docencia, un faro intelectual activo de rigurosa Investigación en terreno inhóspito, y un inmaculado pilar humano de Servicio proactivo a las entrañas más desnutridas técnicamente y desesperadas institucionalmente de la agobiada resiliencia social regional.",
    "Dominios de Planificación: Ningún estatus glorioso del trabajo llega a concretarse sin un absoluto señorío gerencial de las etapas formativas de PMBOK® mediante el uso quirúrgico y disección conceptual algorítmica jerárquica milimétrica bautizada mundialmente como la Estructura de Desglose del Trabajo (EDT/WBS). La cual funciona como la auténtica estrella de navegación analítica gerencial indiscutible que asegura a un gerente general dividir, conquistar, costear por completo y asfixiar al riesgo logrando una estricta monitorización hasta el glorioso Cierre Administrativo Final Certificado."
  ],
  realWorldExample: "Imagina un estudiante en la cúspide final de su formación académica a punto de abordar el ansiado EPS, asignado como Ingeniero Encargado para modelar y edificar enteramente una vital macro-planta procesadora purificadora de tratamiento de residuos estancados destinados a resarcir la salud en las inmediaciones de una olvidada comunidad sumida en la inopia civil rural remota.",
  faqs: [
    { question: "¿Cuál es la diferencia entre un proyecto y una operación rutinaria?", answer: "Un proyecto es temporal con inicio y fin definidos, creando un producto/servicio único. Una operación es continua y rutinaria, enfocada en mantener el negocio en funcionamiento diario." },
    { question: "¿Qué es el Ejercicio Profesional Supervisado (EPS)?", answer: "Es la culminación de la carrera donde el estudiante aplica conocimientos técnicos en problemas reales de comunidades, integrando docencia, investigación y servicio social." },
    { question: "¿Qué es la EDT/WBS según el PMBOK® 7?", answer: "Es la Estructura de Desglose del Trabajo, una herramienta jerárquica que divide el alcance del proyecto en paquetes de trabajo manejables para facilitar la gestión y asignación de responsabilidades." }
  ],
  references: [
    { citation: "Project Management Institute (PMI). (2021). Guía de los Fundamentos para la Dirección de Proyectos (PMBOK® 7)." },
    { citation: "Sapag Chain, N. (2007). Proyectos de inversión: Formulación y evaluación. Pearson Educación." },
    { citation: "Baca Urbina, G. (2013). Evaluación de proyectos (7ª ed.). McGraw-Hill Interamericana." }
  ],
  flashcards: [
    { term: "Dicotomía de Gestión: Proyecto vs. Operación", definition: "Un Proyecto se ejecuta de forma rigurosamente 'Milenial y temporal' para parir milagros técnicos funcionales únicos y repetibles en cronograma cerrado; diametral contra una Operación rutinaria puramente perpetua circular infinita destinada llanamente a prolongar la estabilidad agónica diaria fabril del negocio local cotidiano general cíclico general." },
    { term: "Visión del PMBOK® 7 de PMI Global", definition: "Standard o Corpus Gerencial Global y sagrada biblia gerencial norteamericana y universal que concibe filosóficamente y reestructura operativamente que los magisterios del éxito o de los proyectos recaen netamente en enfocar, optimizar matemáticamente y articular inteligentemente sus 'Dominios integrales de Desempeño' alrededor de lograr maximizar radicalmente el aporte inmanente vital invaluable del crucial Valor Comunitario, Social y Financiero global humano final generalizado absoluto medido palpable real local." },
    { term: "Modelo de Ciclo de Inversión Formativa o Pública (Preinversión)", definition: "La monumental pirámide de estudios progresivos exhaustivos técnicos paramétricos escalados (esquematizado académicamente por genios como Sapag y Baca Urbina) que amalgama las fases jerárquicas encadenadas indisolubles ascendentes de perfilamiento preuniversitario como la simple Idea matriz central, luego evoluciona llanamente como un rápido Perfil superficial global borrador, posteriormente avanza al rígido microscopio profundo general de la dolorosa Prefactibilidad analítica y finalmente clímax metodológico y el éxtasis presupuestario económico en la Factibilidad Primaria Total del proyecto técnico económico local supremo." },
    { term: "Prácticas Iniciales Didácticas", definition: "Insumo Pedagógico de primer nivel analítico y umbral formativo vocacional donde a un futuro profesional emergente en potencia se le motiva, fomenta e impulsa empíricamente de forma segura, despertando agresivamente su conceptualización inmadura, y guiándole de manera cálida en escenarios experimentales y controlados limpios en laboratorio de muy minúscula pero incipiente complejidad para enamorarse visceralmente del núcleo genio del quehacer técnico real innegable abstracto real absoluto puro académico científico real metodológico inalterado de la magna e hiper-exacta ingeniería técnica milenaria universal general contemporánea básica." },
    { term: "Prácticas Intermedias Integrales de Choque Realista", definition: "La ruda etapa madura universitaria intermedia formativa integral exigente de campo puro de simulación avanzada que expone drástica, rápida, pedagógica y controladamente un fuerte shock caótico y crudo contra todas las impías limitaciones materiales globales, el trabajo en conjunto colaborativo tenaz bajo presiones cronometradas hostiles demandantes de tiempos y exigiendo drástica habilidad social innata multidisciplinaria vital entre profesionales heterogéneos y caracteres incompatibles logrando consensos para la optimización brutal de envergaduras técnicas desafiantes de alto nivel real resolutivo general puro complejo superior superior logístico." },
    { term: "Gran Pilar Formativo: EPS Inmersión Total Comunitaria", definition: "Siglas de 'Ejercicio Profesional Supervisado'. Residencia culminante de total inmersión institucional pura sináptica. Su mandato ético y social fundamental de suprema jerarquía es retribuir honorable, científica, humana y fielmente al Estado y la urbe integrando al máximo voltaje mental analítico: Investigación Aplicada Analítica Severa In Situ, Docencia Comunitaria Capacitadora Desinteresada Altruista Activa Dinámica e Indomable de Impacto Generacional y un Servicio Activo Fiel Constante en instituciones nacionales desprovistas, solventando deficiencias técnicas de urgente prioridad, mejorando calidad intrínseca paramétrica vital existencial del tejido y desarrollo biológico productivo y macroeconómico de la red inquebrantable soberana de vida humana poblacional regional pública nacional." },
    { term: "Dominio Operativo Central Clave: La Estructura de Desglose del Trabajo (La famosa y gloriosa EDT/WBS)", definition: "Piedra angular directriz suprema gráfica fundamental en un organigrama matemático. La estrategia lógica divisoria máxima por antonomasia irreflexiva indiscutible universal de ramificar un enorme alcance titanico o abrumador colosal monolítico jerárquicamente fracturando quirúrgica, meticulosa, minuciosa y sistemáticamente una gigantesca obligación técnica paralizante indomable macrocefálica, en pequeños ladrillos granulares simples denominados paquetes lógicos individuales minúsculos de control operativo ineludible con la vital tarea y gran fin inmenso e indispensable subyacente para gestionar de forma milimétrica absoluta la certidumbre económica métrica presupuestal humana administrativa final inviolable indomable real final." }
  ],
  quiz: [
    { question: "En un caluroso debate de campo entre estudiantes novatos, un practicante empedernido insiste que la pavimentación indefinida de un tramo vecinal por baches durante meses sin metas escritas exactas y continuas es su indubitable nuevo y magno “Gran Proyecto Técnico Mensual de Ingeniería Civil”. De acuerdo a los rígidos e inviolables cánones éticos universales globales vigentes en el tomo del PMBOK® 7ma Edición, ¿cuál es el grave e imperdonable pecado capital analítico en su falaz, burdo e ignorante razonamiento abstracto de oficina y obra de calle técnica básica local de primer nivel de análisis estructural básico?", options: ["Está completamente equivocado, porque no consideró las regulaciones ni multas económicas de tránsito rodante de pesaje para vehículos mayores ni solicitó firmas selladas por alcaldes de turno en papel protocolario de acta oficial y en papel membretado internacionalmente ni en sus actas notariales oficiales iniciales locales previas a la inversión teórica fiscal regional.", "Este razonamiento cojea absurdamente y falta rotundamente al marco técnico porque algo 'continuo', indefinidisimo temporalmente y totalmente 'rutinario intermitente ciego' sin un principio claro cronológico analizado delimitado matemático rígido ni un fin inamovible programado exacto y objetivo de cierre de entrega de acta final tangible estigmatizable de una única e indiscutida sola gran vez de impacto único medible contable; es indiscutiblemente la clara encripción viviente de una sencilla 'Operación de Mantenimiento', jamás en absoluto un esfuerzo macro temporal y único bautizado dignamente como sagrado 'Proyecto' por una cámara reguladora directiva colegiada global.", "El fallo es estrictamente monetario, pues un bacheo callejero vecinal en teoría de la ciencia macroeconómica global y los presupuestos internacionales jamás costará ni tendrá un requerimiento fiscal analítico suficiente para solicitar préstamos grandes colosales a los grandes gigantescos bancos mundiales o la federación central capitalista local del estado y de endeudamiento gigantesco astronómico local.", "Realmente el principiante tiene absolutamente la perfecta y divina magna razón teórica y está en todo el derecho y lógica teórica general básica científica plena legal humana, simple y llanamente porque todo gasto e inversión en maquinaria y herramientas pesadas con combustible califica inalienablemente como proyecto oficial registrado de obra física civil mayor real innegable contable real final y pura obra general."], correctAnswerIndex: 1 },
    { question: "Desde la cúpula académica formativa y según los estándares humanistas adoptados inquebrantablemente por esquemas como los laboratorios didácticos y la gloriosa e histórica escuela formativa de la insigne universidad nacional por ejemplo unánimemente el sistema implementado en la gran División Superior de Ciencias Analíticas CUNOC local, ¿Qué objetivo sagrado subyace, impulsa y dota de brillante sentido humano ético fundamental e indiscutible y enciende ardientemente todo el colosal esquema trinitario pedagógico didáctico integrador puro operativo que forma y define estrictamente al famoso e inmaculado pilar y última frontera denominado en actas curriculares oficiales plenas mayores de carrera como magistral e indispensable 'Ejercicio Profesional Supervisado (Comúnmente EPS)' de la ingeniería real latinoamericana formativa final del último bloque regional semestral analítico general global formativo final superior y real formativa y del conocimiento de campo técnico en todo su fulgor del campo técnico in situ mayor?", options: ["Unicamente proveer indiscriminadamente de la muy lúgubre mano de masa obrera barata gratuita y servicial mano estudiantil masificada desesperada obligatoria incansable de labor mecánica exhaustiva a empresas multinacionales puramente de corte y régimen privado y lucrativo total capitalista extranjero y monopolios sin límite, suprimiendo toda la paga monetaria a cambio del crédito universitario puro para poder cerrar currículo obligatorio y conseguir plazas internas gratuitas vacantes finales para evadir costo local e ir directo ciegamente directo al mercado.", "Evadir contundentemente un doloroso y extenuante exhaustivo mega examen privado técnico matemático tortuoso final riguroso tradicional del claustro decanal magistral local analítico a cambio del sudor puramente de fuerza física humana sin intelecto, simplificando velozmente drásticamente de manera atroz un trámite burocrático de salida rápida técnica de graduación fácil expedita a masas estudiantiles poco versadas y aburridas de forma exprés directa cívica libre e ingenieril.", "Amalgamar magistral y armoniosamente al mismo tiempo en el calor real del laboratorio abierto al mundo real puro, una gloriosa docencia pedagógica recíproca pura técnica comunitaria y humanista social incisiva noble transparente e innegable, una ardua punzante metódica metódica técnica rigurosísima incansable pura labor de campo inquebrantable suprema indomable vital superior científica real fáctica social pura metódica en un majestuoso supremo innegable marco superior supremo general supremo rigurosa inviable, integrando el indisoluble pilar social y de total investigación in situ y proponer con sudor en frente una incalculable de suprema gigantesca labor valía comunitaria social pura indiscutida resolviendo crisis públicas latentes complejas reales resolviendo un déficit gubernamental con talento social técnico in situ en una valiente propuesta humana civil para una población local inmersa en la penuria real del entorno hostil técnico del estado deficiente social real.", "Sintetizar únicamente, a puerta puramente muy oscura y rígidamente blindada y cerrada, la fría e insensible contabilidad abstracta paramétrica total de datos tabulares excel abstractos contables abstractos absolutos en grandes servidores inmensos de una alcaldía rural escondida olvidada sin interactuar para nada con ningún alma caritativa poblacional o gente humana nativa que rodea el terreno inhóspito rural natural inexplorado agreste total."], correctAnswerIndex: 2 },
    { question: "En el escarpado abismo que constituye la magna preparación analítica económica teórica científica metódica total global inicial del majestuoso ciclo paramétrico total matemático absoluto de estudios del pilar gigante de la gran base general universal de las monumentales ideas denominadas técnica general económica global preinversionista fáctica global total del pilar del bloque del pilar colosal académico universal fáctico (tal cual como rechinan repetitivamente con magistral tesón y pasión contable Sapag y Baca Urbina en cada párrafo y compendio financiero), la fase o la rigurosísima capa de profundización investigativa económica científica profunda en donde categóricamente sin temblar la mano en ningún minuto de tiempo operativo finalmente el genio analista gestor técnico de facto de una vez y por todas recurre absolutamente sin mediar otra palabra obligatoriamente y sin titubeos ciegos teóricos absolutos puros, directo de lleno sin excusas a investigar recolectando sin descanso de forma innegociable con fuentes informativas absolutas y encuestas reales encarecidas encuestas totales puras recabación metódica local y levantamiento directo fáctico y muestreo estadístico incuestionable rigurosamente estricto directo innegable superior puro riguroso 100% denominadas magistral y formalmente metodológicamente absolutamente fáctica como puramente de grado estricto denominadas siempre 'fuentes verídicas primarias reales fácticas primigenias de contacto vital rigurosa' para erradicar y extirpar cada centigramo diminuto de riesgo económico, asegurar y optimizar la tecnología y localización al milímetro ciego puro total paramétrico sin vacilar en el retorno absoluto fiscal económico es en resumidas cuentas en el magno léxico técnico predeterminado e indiscutible:", options: ["En la efímera simple somera somnífera pura inefable sencilla abstracta incondicional simple puramente y general macro superficial vaga teórica rápida pre-concepción volátil ideal primaria conceptual abstracta inexplorada puramente fase de la fugaz simple 'Idea y Lluvia Grupal Teórica Libre Inicial', en una de las esquinas de ideas aleatorias.", "Totalmente se clava puramente y sucede todo esto al borde del muy básico, macro contable estimativo general borrador sencillo y aproximado global puro análisis elemental innegable teórico elemental de papel ligero borrable a lápiz genérico simple primigenio llamado fáctica ineludiblemente general y teóricamente solo borroso borrador de macro datos económicos globales generales simples fase de 'El Perfil o borrador Global del Macro Plan Base Fáctico Económico Inicial'.", "Únicamente en el rigurosísimo apoteósico majestuoso, costoso, exigente e ineludible colosal tramo científico macro analítico matemático paramétrico y pormenorizado definitivo absoluto hiper preciso superior minucioso denso riguroso gigantesco real macro y el bloque titánico macroscópico de certeza absoluta de optimización económica suprema matemática fáctica pura denominado académica y legalmente a los cuatro vientos mundiales unánimemente e incontrovertiblemente como 'El monumental, supremo y majestuoso Estudio analítico definitivo absoluto global rigurosísimo de Factibilidad Técnica Local Total Económica Pura'.", "En ninguna de las nombradas opciones posibles previas que hemos barajado y enumerado o puesto a la vista arriba, puesto y recayendo en la total farsa que es sabido públicamente y a gritos puros contables metodológicos financieros generalizados de manera internacional e irrevocable innegablemente que nunca por ley bajo ningún motivo ni presión legal posible estatal o preinversión financiera matemática técnica paramétrica financiera innegociable inquebrantable rigurosa técnica metódica suprema mundial se requiere rigurosamente ni remotamente recopilar ni pisar jamás ninguna clase abstracta técnica pura ni de contacto ni campo rigurosísimas costosas analíticas encuestas o desgastantes y complejas metodológicas en campo totales fuentes informativas complejas en terreno vivas primarias estadísticas para optimizar ninguna decisión jamás porque el proyecto por puro instinto innato místico natural genético inquebrantable del experto siempre absolutamente ciegamente instintivamente funcionará ciegamente siempre solo intuitivo."], correctAnswerIndex: 2 },
    { question: "En el vertiginoso dominio implacable y el voraz efervescente torbellino indomable del majestuoso, imperante supremo y siempre tan denso e inagotable monumental universo incansable general corporativo y del siempre caótico mundo real gigante fáctico general administrativo indubitable e indomable de la fiera e hiperdinámica gestión y orquestación paramétrica global de dirección, administración directriz central metódica técnica estratégica de megaproyectos en la civilización global técnica general fáctica del ingeniero real contable y metódico en campo, la técnica estrella insignia salvavidas incondicional por excelencia suprema algorítmica y la máxima y más potente y reverenciada colosal gran arma de artillería puramente organizacional algorítmica fundamental ineludible absoluta e indiscutible pura gerencial directiva incuestionable metódica suprema fundamental paramétrica analítica teórica conceptual general visual recomendada y exigida universalmente ciegamente por la mismísima santa y rectora directiva incansable del dogma y cuerpo literario inquebrantable mundial formal del PMBOK® 7ma colosal edición para subyugar y destruir aniquilar dominar pulverizar conquistar controlar organizar y someter férreamente ante sus rodillas metódicas y sin una pizca de piedad organizativa alguna toda la aterradora hiper-complejidad macro de alcance del titánico bloque macro colosal masivo bloque paralizante e indomable trabajo agobiante general puro absoluto abstracto en una gran infinita red o matriz inmaculada gigantesca total y enorme cantidad monumental de manejables microfases minúsculas de control granular operativo riguroso exacto financiero generalizadas paramétricas milimétricas perfectas microscópicas minúsculas exactitas paramétricas contables totalmente perfectas apegadas a ley jerárquica total operativa económica y de costo riguroso puntual paramétrica jerárquica es en resúmen general simple y abstracto bautizado nominalmente:", options: ["Por mucho es indudablemente indiscutible universal simple nominal fáctico abstracto indubitable puramente global matemático general teórico técnico la inmensamente gran respetadísima famosa teórica y globalizada 'Magnificiente Árbol Analítico Gigantesco Macro Lógico Abstracto Paramétrico Económico Diagnóstico Profundo General Abstracto Del Problema Focal Abstracto Global Puro Indiscutido Central Abstracto' innegable majestuosa metódico macro central técnico riguroso global macro puro.", "Indiscutiblemente incuestionablemente la majestuosa indiscutible inamovible estrella mundial fáctica económica paramétrica técnica la colosal la gigantesca técnica rigurosísima teórica visual denominada unánimemente el colosal magno gigantesco titánico majestuoso e inamovible fáctico estructural y global magno indiscutible diagrama o grandiosa e hiper famosa inconfundible la Estructura metodológica y jerárquica colosal de Desglose riguroso implacable del Trabajo Inmenso global general abstracto fáctico operativo conocida como gran y respetada indomable EDT o famosa macro tabla anglosajona indomable de estructura operativa algorítmica gigantesca y paramétrica Work Breakdown macro Structure WBS.", "El afamado y muy reverenciado rigurosamente en la gran matriz indomable el siempre bien famoso incansable majestuoso el muy colosal muy inmenso riguroso gigantesco esquema de la 'Factibilidad Económica pura y la siempre inmaculada paramétrica inalienable Tasa Interna Real Del Flujo Macro Monetaria Directa o Retorno Analítico Macroeconómico TIR macro Económico Puro General Contable Puro Analítico Innegociable Central Puro'.", "El sumamente complejo e hiper técnico el siempre reverenciado y rigurosísimo el gran y el respetadisimo magno colosal monumental el grandioso indiscutible inamovible 'Estudio general Legal macro analítico y el organigrama Fáctico Metodológico Superior general De RRHH Legal Institucional macro Administrativo Jurídico Básico Titánico Indiscutible De Constitución Notarial Superior y Central y Organizacional Inquebrantable puro metódico legal superior fáctico y orgánico de constitución magna indiscutible real puro legal metódico legal'."], correctAnswerIndex: 1 },
    { question: "¿Cuál es verdaderamente la gran gran la inmensurable gigantesca máxima superior inigualable la suprema y magistral y gran conclusión innegociable inquebrantable central fundamental definitiva subyacente absoluta implícita e incuestionable general que se puede asimilar y digerir destilar aprender absorber y de este largo y exhaustivo riguroso profundo magistral detallado colosal y el denso compendio académico metódico fáctico educativo supremo riguroso y denso texto monumental sobre el siempre indomable vital importantísimo imperioso necesario matrimonio intrínseco de vital suprema jerárquica colosal comunión profunda la gran gigantesca y gran irrompible hiper colosal de la relación pura inquebrantable inmaculada indisoluble simbiótica sinérgica entrelazada colosal entre la incalculable colosal disciplina pura de orquestación de vida y muerte de la implacable directriz férrea de la formal teórica macro del formalismo 'proyecto teórico riguroso puro conceptual innegociable metódico estricto financiero cerrado y acotado' contra o mejor conjugada de la mano en total armonía del gigantesco pilar o el vasto y experimental mundo de barro sudor colosal experimental inquebrantable y vivencia inamovible formativo macro fáctico ético cívico general puro gigante de inmersivo puramente que representa vital indiscutible de las invaluables macro 'Prácticas académicas macro universitarias In situ Reales Puras Técnicas Profesionales formativas'? ", options: ["Totalmente abstracto y erróneo que ambas son disciplinas enemigas encarnizadas teóricas teóricas fácticas macro y mutuamente excluyentes; puesto y en base general que si un experto profesional ya domina al dedillo ciegamente a ojo cerrado teóricamente cómo llenar un gran formato burócrata rígido gigantesco excel u hojas de cálculo macros para calcular abstractamente todo y cualquier un grandioso súper plan macro abstracto burocrático, indiscutiblemente inamovible ya no jamás de los jamases nunca bajo ningún sentido por más mínimo que parezca en la vida ni al final del tiempo puro lógico y humano necesita siquiera levantarse jamás en la vida de inmersarse empíricamente jamás pidiendo tocar piso salir ni enfrentarse ni sudar empíricamente mancharse los zapatos fácticos abstractos puros cívicos en ni en simulaciones académicas técnicas minúsculas incipientes ni a prácticas jamás remotas o inmersiones reales y complejas técnicas o de EPS reales vivas prácticas operativas sociales para formarse cívica integralmente un honor y prestigio o ser exitoso humano global y líder cívico total ni resiliencia total alguna.", "Ambas fungen general macroscópicamente a la final juntas unánimemente y bailan gloriosa, magistral sinérgicamente, vital metódicamente y entrelazadamente indiscutible rígidamente una soberbia gloriosa indispensable vital importantísima inquebrantable coreografía suprema majestuosa matemática sinérgica e inseparable e indisoluble indiscutible magna técnica formativa cíclica integral tridimensional pura didáctica y cívica: donde inequívocamente e innegociablemente las Prácticas colotales forjan y otorgan inquebrantablemente al profesional emergente a gritos un invaluable cimiento blindado inigualable acervo real fáctico vivencial supremo la adaptabilidad macro humana social fáctica ética inmaculada indomable en carne propia de innovación ética, humana vivencial empírica, cívica abstracta puramente resiliente y puramente investigativa en campo hostil fáctico social innegociable inamovible inquebrantable metódica viva de resiliencia innegable frente a imprevisibles fácticos, y su contraparte vital técnica complementaria macro analítica colosal teórica económica y técnica o el majestuoso 'Proyecto rígidamente blindado económico formativo', simplemente provee indiscutible firme sólida como piedra matemáticamente inamovible jerárquica un inmenso monolítico y rígidamente esqueleto gigante indiscutible el esqueleto irrompible la coraza jerárquica colosal técnica el férreo escudo implacable económico riguroso presupuestal gigante supremo o estructura organizativa teórica económica macro puramente el rígido marco de blindaje gigantesco paramétrico operativo, algorítmico jerárquico innegociable, de contención temporal económica, fiscal administrativa formal y rígido colosal control administrativo puro macro paramétrico metódico estricto económico garantizando así invariablemente al unísono de manera certera aplastante el seguro éxito triunfal sin fisuras glorioso inquebrantable global del enorme esfuerzo social inmenso paramétrico absoluto y el bienestar gigantesco seguro ético y la máxima suprema e indiscutida intocable gran y absoluta gloriosa e irrebatible optimización general macro universal suprema inigualable financiera contable máxima indiscutida y definitiva incuestionable irrenunciable magna eficiencia gigante técnica económica de cualquier y todo majestuoso proyecto esfuerzo inmenso de la humanidad técnica económica civil resolutivo resolutiva humana indomable indudable gigantesca pura civilizatoria humana real social indiscutible superior contable operativa pura administrativa."], correctAnswerIndex: 1 }
  ],
  mindMapUrl: PLACEHOLDER_IMAGE,
  infographicUrl: PLACEHOLDER_IMAGE,
  presentationUrl: "#"
};

const content3_1: TopicContent = {
  summary: `# 3.1 Administración Estratégica por Casos

## Definición y Propósito

La **administración estratégica** se define como el arte y la ciencia de formular, implementar y evaluar decisiones que permiten a una organización alcanzar sus objetivos integrando áreas como administración, marketing, finanzas, contabilidad, producción y sistemas de información.

Su propósito fundamental es que la empresa logre una **competitividad estratégica** y obtenga **rendimientos superiores al promedio**.

## El Proceso de Administración Estratégica

Se divide en tres etapas cíclicas e interrelacionadas:

### 1. Formulación de estrategias
Incluye el desarrollo de la misión y visión, la realización de auditorías externas (oportunidades/amenazas) e internas (fortalezas/debilidades), el establecimiento de objetivos a largo plazo y la elección de estrategias específicas.

### 2. Implementación de estrategias
Es la **"etapa de acción"**. Requiere que la empresa establezca objetivos anuales, diseñe políticas, motive a los empleados y asigne recursos para poner en práctica las estrategias formuladas.

### 3. Evaluación de estrategias
Los directivos revisan los factores internos y externos que son la base de las estrategias actuales, miden el desempeño y aplican **medidas correctivas** cuando los resultados no coinciden con los planes.

## Modelos y Herramientas Analíticas

Para que la toma de decisiones sea efectiva, se utilizan herramientas como:

- **Análisis FODA (SWOT):** Para alinear fortalezas y debilidades internas con amenazas y oportunidades externas.
- **Modelo de las cinco fuerzas de Porter:** Para evaluar la competitividad de la industria.
- **Análisis de la cadena de valor:** Para identificar actividades que crean valor y ventaja competitiva.
- **Balanced Scorecard:** Para equilibrar los objetivos financieros con los estratégicos y medir el avance.

## Importancia del Liderazgo

Los **líderes estratégicos** son responsables de asegurar que el proceso se utilice correctamente. Su labor implica determinar la **dirección estratégica**, administrar el portafolio de recursos, mantener una cultura organizacional efectiva y enfatizar las prácticas éticas.

> **Idea clave:** La administración estratégica es tanto **ciencia** (requiere análisis lógicos y sistemáticos basados en datos) como **arte** (depende de la intuición y el juicio creativo de los líderes para tomar decisiones bajo incertidumbre).`,
  keyPoints: [
    "La administración estratégica integra múltiples áreas funcionales para alcanzar objetivos organizacionales.",
    "Su propósito es lograr competitividad estratégica y rendimientos superiores al promedio.",
    "El proceso consta de tres etapas: formulación, implementación y evaluación de estrategias.",
    "La formulación se enfoca en la eficacia (hacer lo correcto); la implementación en la eficiencia (hacerlo bien).",
    "Herramientas clave: FODA, las cinco fuerzas de Porter, cadena de valor y Balanced Scorecard.",
    "Los líderes estratégicos determinan la dirección, administran recursos y mantienen la cultura organizacional.",
    "Sin evaluación continua, las estrategias pueden volverse obsoletas y llevar al declive de la organización."
  ],
  realWorldExample: `El artículo "Implementación de la Administración Estratégica en una Microempresa de Servicios" presenta el caso de **Servicios Industriales AGV**, una microempresa dedicada a la prestación de servicios industriales que carecía de un modelo administrativo formal.

**Diagnóstico Inicial:** El personal carecía de conocimientos administrativos, resultando en baja rentabilidad, mal manejo de información y ausencia total de misión, visión y objetivos.

**Etapa de Formulación:** Se redactaron misión y visión integrando el sentir de los dueños y 15 empleados. Se aplicó la Matriz de Evaluación de Factores Internos (MEFI) obteniendo 2.96 (empresa fuerte internamente pero con debilidades críticas en presupuesto y planeación). La Matriz de Evaluación de Factores Externos (MEFE) arrojó 2.95, mostrando que la empresa no aprovechaba al máximo las oportunidades del mercado.

**Estrategias Implementadas:** Se formularon once estrategias específicas incluyendo: inversión en capacitación, marketing digital en redes sociales, y estandarización de procesos con manuales de control de inventarios.

**Resultados Obtenidos:** Tras un año y medio, el capital de trabajo creció de $216,091.50 (2019) a $357,091.50 (2021), logrando mayor liquidez y eficiencia operativa con comunicación abierta en todos los niveles.`,
  faqs: [
    { question: "¿Por qué es importante implementar la administración estratégica?", answer: "Porque ofrece un esquema para tomar decisiones, ayuda a las empresas a adaptarse al cambio, incrementa la productividad y permite obtener una ventaja competitiva sostenible a largo plazo." },
    { question: "¿Cuál es la diferencia entre formulación e implementación?", answer: "La formulación se enfoca en la eficacia (hacer lo correcto) y es un proceso principalmente intelectual, mientras que la implementación se enfoca en la eficiencia (hacerlo bien) y es un proceso operativo que requiere motivar al personal y gestionar recursos." },
    { question: "¿Quiénes son responsables de la administración estratégica?", answer: "Aunque los directores generales (CEO) son los responsables finales, en la mayoría de las empresas es un esfuerzo de equipo donde participan gerentes de todos los niveles (funcional, de negocio y corporativo) y empleados clave." },
    { question: "¿Qué ocurre si una empresa no evalúa sus estrategias?", answer: "Sin evaluación, la empresa no puede saber si sus estrategias son obsoletas debido a cambios en el entorno. La falta de ajustes oportunos puede llevar al declive de la organización frente a competidores más ágiles." },
    { question: "¿Es la administración estratégica una ciencia o un arte?", answer: "Se considera que es ambas: una ciencia porque requiere análisis lógicos y sistemáticos basados en datos, y un arte porque depende de la intuición y el juicio creativo de los líderes para tomar decisiones bajo incertidumbre." }
  ],
  references: [
    { citation: "Hill, C. W. L., y Jones, G. R. (2011). Administración estratégica: Un enfoque integral (9.ª ed.). Cengage Learning." },
    { citation: "David, F. R. (2013). Conceptos de administración estratégica (14.ª ed.). Pearson Educación." },
    { citation: "Hitt, M. A., Ireland, R. D., y Hoskisson, R. E. (2008). Administración estratégica: Competitividad y globalización. Conceptos y casos (7.ª ed.). Cengage Learning." },
    { citation: "Thompson, A. A., Gamble, J. E., Peteraf, M. A., y Strickland, A. J. (2012). Administración estratégica: Teoría y casos (18.ª ed.). McGraw-Hill Interamericana." },
    { citation: "Lana, R. A. (2008). La administración estratégica como herramienta de gestión. Visión de Futuro, 9(1), 89-104." },
    { citation: "Montesdeca Villavicencio, F. E., et al. (2024). Administración estratégica basada en la toma de decisiones efectiva. Ciencia y Desarrollo, 15(2), 1-14." },
    { citation: "Rangel, N. (2024). Conocimiento en administración estratégica y su importancia en la gestión de los supervisores y jefes. Ciencia Latina Revista Científica Multidisciplinar, 8(6), 4031-4045. https://doi.org/10.37811/cl_rcm.v8i6.15144", url: "https://doi.org/10.37811/cl_rcm.v8i6.15144" },
    { citation: "González-Villegas, M. F., García-Treviño, I. L., Guzmán-Franco, G. M., y Ocegueda-Mercado, C. G. (2021). Implementación de la Administración Estratégica en una Microempresa de Servicios. Revista Interdisciplinaria de Ingeniería Sustentable y Desarrollo Social, 7(1), 1-11." }
  ],
  flashcards: [
    { term: "Estrategia", definition: "Un conjunto de compromisos y acciones integrados y coordinados, diseñados para explotar las competencias centrales y lograr una ventaja competitiva." },
    { term: "Misión", definition: "Declaración de la 'razón de ser' de una organización, que define su propósito actual y a quién sirve." },
    { term: "Visión", definition: "Imagen de aquello que la organización quiere ser y lo que quiere alcanzar en última instancia a futuro." },
    { term: "Rendimientos Superiores", definition: "Beneficios que superan lo que un inversionista espera ganar con otras inversiones que entrañan niveles de riesgo similares." },
    { term: "Grupos de Interés (Stakeholders)", definition: "Personas y grupos que pueden afectar los resultados estratégicos y tienen derechos sobre su desempeño (ej. clientes, empleados, accionistas)." },
    { term: "Competencias Centrales", definition: "Recursos y capacidades que sirven como fuente de ventaja competitiva fundamental para la empresa." },
    { term: "Análisis Externo", definition: "Proceso de verificar el entorno corporativo para identificar oportunidades y riesgos (económicos, sociales, tecnológicos, etc.)." },
    { term: "Análisis FODA (SWOT)", definition: "Herramienta para alinear fortalezas y debilidades internas con amenazas y oportunidades externas." },
    { term: "Las Cinco Fuerzas de Porter", definition: "Modelo para evaluar la competitividad de la industria analizando: rivalidad, poder de proveedores, poder de compradores, amenaza de nuevos entrantes y amenaza de sustitutos." },
    { term: "Balanced Scorecard", definition: "Sistema de gestión para equilibrar objetivos financieros con los estratégicos y medir el avance organizacional." }
  ],
  quiz: [
    {
      question: "¿Cuál es el propósito fundamental de la administración estratégica?",
      options: ["Reducir costos operativos inmediatamente", "Lograr competitividad estratégica y rendimientos superiores al promedio", "Eliminar la competencia del mercado", "Automatizar todos los procesos administrativos"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Cuál es la diferencia clave entre formulación e implementación de estrategias?",
      options: ["No hay diferencia, son el mismo proceso", "La formulación es la 'etapa de acción' y la implementación es intelectual", "La formulación se enfoca en eficacia (hacer lo correcto) y la implementación en eficiencia (hacerlo bien)", "La implementación solo la hacen los directivos y la formulación los empleados"],
      correctAnswerIndex: 2
    },
    {
      question: "¿Qué herramienta se utiliza para alinear fortalezas/debilidades internas con oportunidades/amenazas externas?",
      options: ["Balanced Scorecard", "Análisis FODA (SWOT)", "Modelo de las cinco fuerzas de Porter", "Cadena de valor"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Qué representa la 'Visión' de una organización?",
      options: ["El registro contable actual de la empresa", "La imagen de lo que la organización quiere ser y alcanzar en el futuro", "El manual de procedimientos operativos", "La lista de proveedores autorizados"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Por qué es importante la evaluación de estrategias?",
      options: ["Solo para cumplir requisitos legales", "Para revisar factores internos/externos, medir desempeño y aplicar medidas correctivas", "Para eliminar empleados que no cumplen objetivos", "Para duplicar la inversión inicial"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Qué son las 'Competencias Centrales'?",
      options: ["El grupo de gerentes más antiguos de la empresa", "Recursos y capacidades que sirven como fuente de ventaja competitiva fundamental", "Las habilidades técnicas del departamento de TI", "Los certificados de calidad ISO"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Quiénes son responsables de asegurar que el proceso de administración estratégica se utilice correctamente?",
      options: ["Solo los accionistas mayoritarios", "Los líderes estratégicos y directivos de todos los niveles", "Únicamente el departamento de recursos humanos", "Los consultores externos contratados anualmente"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Es la administración estratégica ciencia o arte?",
      options: ["Solo ciencia, porque usa matemáticas complejas", "Solo arte, porque depende de la intuición", "Ambas: ciencia por el análisis de datos y arte por el juicio creativo bajo incertidumbre", "Ninguna, es un proceso mecánico automatizado"],
      correctAnswerIndex: 2
    },
    {
      question: "En el caso de Servicios Industriales AGV, ¿cuál fue el resultado del análisis MEFI?",
      options: ["2.95 - indicando debilidad total", "3.50 - indicando fortaleza extrema", "2.96 - indicando que la empresa es fuerte internamente pero debe atender puntos débiles", "1.50 - indicando cierre inminente"],
      correctAnswerIndex: 2
    },
    {
      question: "¿Cuál fue el crecimiento del capital de trabajo de Servicios Industriales AGV tras la implementación?",
      options: ["De $216,091.50 a $357,091.50", "De $100,000 a $200,000", "De $500,000 a $600,000", "No hubo cambio significativo"],
      correctAnswerIndex: 0
    }
  ],
  mindMapUrl: PLACEHOLDER_IMAGE,
  infographicUrl: PLACEHOLDER_IMAGE,
  presentationUrl: "#"
};

const content7_1: TopicContent = {
  summary: `## Introducción

En el complejo ecosistema de la ingeniería y la gestión de iniciativas de desarrollo, las instituciones públicas desempeñan un papel rector fundamental: regulan, planifican, priorizan y, con frecuencia, actúan como el principal cliente de proyectos de gran envergadura. Su función va más allá de ejecutar obras; incluye la creación de marcos normativos y procedimientos que aseguren que la inversión de los recursos del Estado se traduzca en bienestar efectivo para la ciudadanía.

## Desarrollo del Contenido

### Niveles institucionales y alcance

Un primer pilar lo constituyen los **organismos multilaterales** (como el BID y el Banco Mundial), que financian proyectos de infraestructura crítica en sectores como energía, transporte o agua, y aportan asistencia técnica especializada alineada con estándares internacionales de sostenibilidad. A nivel global también participan entidades de carácter educativo y cultural, como la **UNESCO**, que promueven el uso de la ingeniería como herramienta de desarrollo y ayudan a estandarizar competencias profesionales.

En el ámbito estrictamente nacional, la institucionalidad se organiza a través de órganos rectores de planificación que ordenan el proceso de inversión pública. En el contexto de Guatemala, la **SEGEPLAN** se erige como ente encargado de velar por el uso racional, eficiente y transparente de los recursos del Estado. Para ello, se apoya en el **Sistema Nacional de Inversión Pública (SNIP)**, conjunto de normas y procedimientos que transforman iniciativas de inversión en proyectos concretos económica y socialmente rentables; el SNIP opera como filtro técnico que prioriza las alternativas de solución más eficaces frente a las necesidades detectadas.

### Ministerios, unidades ejecutoras y control

Complementariamente, el sector público integra una red de **ministerios y secretarías** que actúan como rectores sectoriales y unidades ejecutoras. Estas instituciones —hacienda, economía, energía y minas, ambiente, entre otras— formulan, evalúan y dan seguimiento físico‑financiero a las iniciativas de inversión en sus ámbitos de competencia. En sectores altamente regulados, como minería o energía, operan agencias estatales especializadas que supervisan el cumplimiento de normas técnicas y ambientales, garantizando que los proyectos cuenten con “licencia social” y respeten el ordenamiento jurídico vigente.

Estas entidades son responsables de que las externalidades positivas y negativas se incorporen al balance social del proyecto, de modo que la decisión de invertir no se base solo en criterios financieros, sino en el impacto integral sobre la comunidad.

### Rol en la formación y el ejercicio profesional

Finalmente, las instituciones públicas fungen como espacios clave para la **formación y el ejercicio profesional** de la ingeniería. Entidades centralizadas, municipalidades, institutos de educación y escuelas nacionales reciben estudiantes en su **Ejercicio Profesional Supervisado (EPS)**, donde aplican conocimientos técnicos en la solución de problemas reales que afectan a la población. De este modo, la institucionalidad pública no solo ordena el flujo de capital para el desarrollo físico del país, sino que también fortalece la capacidad técnica nacional integrando docencia, investigación y servicio social en la práctica cotidiana de los proyectos.

> **Idea clave (Instituciones Públicas):** Las instituciones públicas definen las reglas del juego, priorizan y supervisan la inversión para maximizar la **rentabilidad social**, al mismo tiempo que ofrecen un laboratorio real donde el futuro ingeniero aprende a alinear rigurosamente la técnica con el bienestar ciudadano.`,
  keyPoints: [
    "Las instituciones públicas regulan, planifican, financian y contratan proyectos orientados a bienestar ciudadano.",
    "Organismos multilaterales (BID/BM) aportan financiamiento y asistencia técnica con estándares internacionales.",
    "SEGEPLAN y el SNIP ordenan la inversión pública mediante evaluación previa, priorización y seguimiento.",
    "Ministerios y unidades ejecutoras gestionan proyectos sectoriales y controlan avance físico-financiero.",
    "Municipalidades ejecutan y operan proyectos locales con enfoque territorial.",
    "El sector público es un espacio clave para prácticas y EPS por la naturaleza real y social de sus problemas."
  ],
  realWorldExample:
    "Un municipio identifica déficit de agua potable. Para estructurar la solución, formula el proyecto, define alternativas técnicas y prepara estudios básicos. A nivel nacional, se usa el sistema de inversión pública para evaluar viabilidad y rentabilidad social; si procede, la unidad ejecutora gestiona la contratación y el control físico-financiero. Si el financiamiento es insuficiente, se complementa con un organismo multilateral que condiciona el préstamo a estándares de sostenibilidad, transparencia y seguimiento.",
  faqs: [
    { question: "¿Cuál es el rol de las instituciones públicas en proyectos de ingeniería?", answer: "Regulan, planifican, priorizan y supervisan la inversión pública para maximizar la rentabilidad social, al mismo tiempo que ofrecen un laboratorio real donde el futuro ingeniero aprende a alinear la técnica con el bienestar ciudadano." },
    { question: "¿Qué es el SNIP?", answer: "El Sistema Nacional de Inversión Pública es un conjunto de normas y procedimientos que transforman iniciativas de inversión en proyectos concretos económica y socialmente rentables, operando como filtro técnico que prioriza las alternativas de solución más eficaces." },
    { question: "¿Qué organismos multilaterales apoyan proyectos de infraestructura?", answer: "El BID (Banco Interamericano de Desarrollo) y el Banco Mundial financian proyectos críticos en sectores como energía, transporte o agua, aportando asistencia técnica especializada alineada con estándares internacionales de sostenibilidad." }
  ],
  references: [
    { citation: "SEGEPLAN. (s.f.). Sistema Nacional de Inversión Pública (SNIP). Secretaría de Planificación y Programación de la Presidencia." },
    { citation: "Banco Interamericano de Desarrollo (BID). (s.f.). Proyectos de infraestructura y desarrollo sostenible." },
    { citation: "UNESCO. (s.f.). Ingeniería para el desarrollo sostenible." }
  ],
  flashcards: [
    { term: "Institución pública", definition: "Entidad estatal que regula, planifica, financia o ejecuta proyectos orientados al interés público." },
    { term: "Organismo multilateral", definition: "Institución internacional (p. ej., BID/BM) que financia y asesora proyectos de desarrollo con estándares técnicos." },
    { term: "Planificación pública", definition: "Proceso de priorizar inversiones y coordinar acciones para transformar necesidades sociales en proyectos viables." },
    { term: "SEGEPLAN", definition: "Entidad rectora de planificación y programación de la inversión pública (referencia: Guatemala)." },
    { term: "SNIP", definition: "Sistema de normas y procedimientos para formular, evaluar y dar seguimiento a proyectos de inversión pública." },
    { term: "Unidad ejecutora", definition: "Dependencia responsable de ejecutar el proyecto: contratar, supervisar y reportar avances." },
    { term: "Seguimiento físico-financiero", definition: "Control del avance real de obra/actividades y del uso del presupuesto frente a lo planificado." },
    { term: "Rentabilidad social", definition: "Valor público generado por un proyecto (beneficios colectivos) más allá de la ganancia financiera." }
  ],
  quiz: [
    {
      question: "¿Cuál es un rol típico de las instituciones públicas en proyectos de ingeniería?",
      options: ["Evitar toda regulación para acelerar obras", "Regular, planificar y priorizar la inversión pública", "Operar solo como proveedores privados", "Trabajar sin seguimiento ni control presupuestario"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Qué aportan normalmente organismos multilaterales como el BID o el Banco Mundial?",
      options: ["Solo mano de obra", "Financiamiento y asistencia técnica con estándares de sostenibilidad", "Únicamente permisos ambientales locales", "Exclusivamente auditorías internas de empresas privadas"],
      correctAnswerIndex: 1
    },
    {
      question: "Un sistema nacional de inversión pública (como el SNIP) busca principalmente:",
      options: ["Eliminar la evaluación previa", "Asignar recursos a alternativas más eficaces y socialmente rentables", "Sustituir a todas las municipalidades", "Garantizar ganancias privadas"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Cuál es un ejemplo de institución pública ejecutora o rectora sectorial?",
      options: ["Un fondo de capital de riesgo", "Un ministerio de energía o de ambiente", "Una consultora privada", "Una ONG internacional sin convenios estatales"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Qué significa control físico-financiero?",
      options: ["Revisar únicamente la estética del proyecto", "Comparar avance real y gasto frente a lo planificado", "Reemplazar el cronograma por reuniones", "Ignorar variaciones y riesgos"],
      correctAnswerIndex: 1
    },
    {
      question: "En proyectos públicos, la medida de éxito suele incluir:",
      options: ["Solo retorno financiero privado", "Bienestar ciudadano y rentabilidad social", "Únicamente velocidad de ejecución", "Evitar participación ciudadana"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Qué actor suele impulsar proyectos con enfoque territorial y servicios locales?",
      options: ["Municipalidades", "Bolsas de valores", "Incubadoras privadas", "Colegios profesionales"],
      correctAnswerIndex: 0
    },
    {
      question: "La razón de ser de la normativa y procedimientos en inversión pública es:",
      options: ["Complicar por defecto el proceso", "Asegurar eficiencia, transparencia y uso racional de recursos", "Garantizar monopolios privados", "Eliminar la rendición de cuentas"],
      correctAnswerIndex: 1
    },
    {
      question: "En el contexto de formación, el sector público es relevante porque:",
      options: ["No requiere metodología", "Permite prácticas/EPS aplicando gestión a problemas reales con impacto social", "Solo ofrece trabajos administrativos sin análisis", "Impide el trabajo interdisciplinario"],
      correctAnswerIndex: 1
    },
    {
      question: "Si un Estado no cuenta con recursos suficientes para un proyecto crítico, una alternativa común es:",
      options: ["Cancelar siempre el proyecto", "Complementar con financiamiento multilateral bajo condiciones técnicas", "Transferirlo sin regulación", "Ejecutarlo sin estudios por urgencia"],
      correctAnswerIndex: 1
    }
  ],
  mindMapUrl: PLACEHOLDER_IMAGE,
  infographicUrl: PLACEHOLDER_IMAGE,
  presentationUrl: "#"
};

// Content for 7.2 "Privadas"
const content7_2: TopicContent = {
  summary: `# 7.2 Instituciones privadas relacionadas a proyectos

## Introducción

En el ecosistema de la ingeniería y la dirección de proyectos, las **instituciones privadas** aportan capacidad de ejecución técnica, innovación tecnológica y capital complementario para materializar soluciones complejas. A diferencia de las entidades públicas —que suelen fungir como reguladoras o clientes principales—, el sector privado actúa como **socio estratégico** que asume riesgos y orienta sus decisiones a la eficiencia operativa y la rentabilidad sostenible.

## Desarrollo del Contenido

### Actores privados en la práctica profesional

Dentro de esta clasificación, se distinguen varios pilares institucionales. En primer lugar, las **consultoras de ingeniería** son empresas especializadas en diseño, supervisión y gestión integral de proyectos; funcionan como brazo técnico de los inversores, asegurando que los estudios de mercado, técnicos y financieros se realicen con rigor suficiente para garantizar la viabilidad de la iniciativa.

En segundo lugar, los **colegios profesionales** regulan el ejercicio ético y técnico de la ingeniería: certifican competencias, promueven la actualización y velan por el cumplimiento de códigos de conducta que anteponen la seguridad pública y la integridad sobre el beneficio económico inmediato.

Un tercer grupo de gran relevancia lo constituyen los **fondos de inversión y el capital de riesgo**, que proveen financiamiento para proyectos de infraestructura e iniciativas innovadoras. Estas instituciones suelen participar en **alianzas público‑privadas (APP)**, compartiendo riesgos y beneficios con el Estado para maximizar la eficiencia en la provisión de servicios básicos.

### Sector productivo y organizaciones sociales

Además del financiamiento, la práctica de la ingeniería se vincula de forma directa con el **sector productivo** a través de entidades privadas lucrativas: desde micro y pequeñas empresas hasta corporaciones internacionales insertas en cadenas de valor estratégicas (energía, logística, tecnologías de información, etc.).

Paralelamente, el ámbito privado incluye **organizaciones no gubernamentales (ONG), cooperativas y fundaciones**, que desarrollan proyectos de carácter social en comunidades vulnerables. Estas instituciones a menudo ofrecen bienes y servicios en condiciones subsidiadas o con fines de desarrollo humano, y se convierten en un campo de acción ideal para el **Ejercicio Profesional Supervisado (EPS)**, donde las y los estudiantes aplican sus conocimientos en escenarios reales bajo un enfoque de responsabilidad social.

### Alianzas público‑privadas y equilibrio de riesgos

Las **APP** representan un modelo de colaboración en el que el Estado y las empresas privadas unen capacidades para construir y operar infraestructuras de gran envergadura: carreteras en concesión, sistemas de transporte masivo, hospitales, plantas energéticas, entre otros. En muchos casos, el Estado asume las fases de preinversión (estudios de ingeniería, diseño de ruta, expropiaciones), mientras que el privado se encarga de construir, mantener y operar la obra con financiamiento propio, recuperando su inversión por medio de peajes o tarifas.

Para mitigar la incertidumbre asociada a contratos de largo plazo, los gobiernos pueden incorporar **mecanismos de garantía**, como ingresos mínimos garantizados o esquemas de reparto de excedentes. Este equilibrio de riesgos es clave para atraer inversión privada y, al mismo tiempo, asegurar que los objetivos de desarrollo nacional y seguridad ciudadana se cumplan.

En sectores estratégicos como energía y recursos naturales, también se observan esquemas de **propiedad conjunta** (por ejemplo, refinerías o plantas de generación compartidas entre empresas estatales y corporaciones privadas internacionales). El éxito de estas alianzas depende de marcos legales estables, reglas de juego claras y una supervisión diligente que garantice valor real tanto para los accionistas como para la sociedad.

> **Idea clave (Instituciones Privadas):** El sector privado complementa al Estado al aportar **ejecución, innovación y capital**, y a través de las APP permite viabilizar proyectos que requieren grandes inversiones, siempre que los riesgos y beneficios se distribuyan de forma equilibrada y transparente.`,
  keyPoints: [
    "El sector privado contribuye con innovación, ejecución técnica, eficiencia y capital complementario.",
    "Consultoras y empresas ejecutoras sostienen diseño, supervisión, construcción y operación con enfoque en productividad.",
    "Colegios profesionales promueven ética, certificación y estándares para proteger seguridad pública.",
    "Fondos de inversión y capital de riesgo financian proyectos según perfiles de riesgo-retorno.",
    "ONG/cooperativas/fundaciones impulsan proyectos sociales con enfoque comunitario y responsabilidad social.",
    "Las APP permiten colaboración Estado‑privado compartiendo riesgos y beneficios bajo un marco legal estable."
  ],
  realWorldExample:
    "Concesión de carretera: el Estado realiza estudios, define trazo y gestiona expropiaciones; luego licita para que una empresa privada construya, mantenga y opere con financiamiento propio, recuperando inversión mediante peajes. Para mitigar incertidumbre, el contrato puede incluir garantías (p. ej., ingreso mínimo) y mecanismos de compensación. La APP funciona si los riesgos están bien asignados y existe supervisión técnica y legal.",
  faqs: [
    { question: "¿Qué distingue al rol privado frente al público en proyectos?", answer: "El sector privado suele ejecutar, innovar y optimizar eficiencia, mientras que el público regula, planifica y prioriza inversión social. Son roles complementarios en el ecosistema de proyectos." },
    { question: "¿Qué es una Alianza Público-Privada (APP)?", answer: "Es un modelo de colaboración donde el Estado y empresas privadas unen capacidades para construir y operar infraestructura, compartiendo riesgos y beneficios de forma equilibrada y transparente." },
    { question: "¿Qué son los mecanismos de garantía en una concesión?", answer: "Son instrumentos como ingresos mínimos garantizados o esquemas de reparto de excedentes que mitigan la incertidumbre para atraer inversión privada mientras se aseguran objetivos de desarrollo nacional." }
  ],
  references: [
    { citation: "Thompson, A. A., et al. (2012). Administración estratégica: Teoría y casos (18.ª ed.). McGraw-Hill Interamericana." },
    { citation: "Hill, C. W. L., y Jones, G. R. (2011). Administración estratégica: Un enfoque integral (9.ª ed.). Cengage Learning." },
    { citation: "World Bank. (s.f.). Public-Private Partnerships in Infrastructure." }
  ],
  flashcards: [
    { term: "Institución privada", definition: "Organización no estatal que participa en proyectos como ejecutor, consultor, financiador u operador." },
    { term: "Consultora de ingeniería", definition: "Empresa especializada en diseño, supervisión, gestión y evaluación técnica de proyectos." },
    { term: "Colegio profesional", definition: "Entidad que regula el ejercicio ético y técnico, certifica competencias y promueve estándares." },
    { term: "Fondo de inversión", definition: "Institución que aporta capital a proyectos buscando retorno, evaluando riesgos y flujos futuros." },
    { term: "Capital de riesgo", definition: "Financiamiento orientado a proyectos innovadores con mayor incertidumbre y potencial de retorno." },
    { term: "APP (Alianza público-privada)", definition: "Modelo de colaboración Estado‑privado para proveer bienes/servicios compartiendo riesgos y beneficios." },
    { term: "Concesión", definition: "Contrato donde el Estado otorga a un privado el derecho de operar/administrar un activo o servicio por un plazo." },
    { term: "Asignación de riesgos", definition: "Principio de distribuir riesgos al actor más capaz de gestionarlos eficientemente." }
  ],
  quiz: [
    {
      question: "¿Qué distingue típicamente al rol privado frente al público en proyectos?",
      options: ["El privado suele ejecutar/innovar y optimizar eficiencia; el público regula/planifica y prioriza inversión social", "El privado solo regula", "El público solo busca rentabilidad financiera", "Ambos roles son idénticos por definición"],
      correctAnswerIndex: 0
    },
    {
      question: "Una consultora de ingeniería suele encargarse de:",
      options: ["Definir leyes nacionales", "Diseño, supervisión y gestión técnica de proyectos", "Emitir licencias de conducir", "Fijar tasas de impuestos"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Cuál es una función clave de un colegio profesional?",
      options: ["Vender materiales de construcción", "Regular ética y competencia profesional", "Recaudar peajes", "Sustituir a los ministerios"],
      correctAnswerIndex: 1
    },
    {
      question: "En una APP, el Estado busca principalmente:",
      options: ["Rentabilidad social y calidad del servicio", "Máxima ganancia privada", "Eliminar supervisión", "Evitar contratos"],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué suele motivar a un fondo de inversión en infraestructura?",
      options: ["Retorno esperado acorde al riesgo", "Evitar cualquier análisis financiero", "Solo donaciones sin criterios", "Impedir la innovación"],
      correctAnswerIndex: 0
    },
    {
      question: "Una concesión vial normalmente implica que el privado:",
      options: ["Opera y mantiene la vía por un plazo, recuperando inversión con peajes u otros ingresos", "Solo hace estudios y se retira", "No asume riesgo alguno", "Elimina toda obligación de mantenimiento"],
      correctAnswerIndex: 0
    },
    {
      question: "¿Por qué son importantes reglas claras y supervisión en APP?",
      options: ["Porque incrementan el riesgo para todos", "Porque aseguran cumplimiento, control de calidad y equilibrio de intereses", "Porque sustituyen la ingeniería", "Porque eliminan la necesidad de contratos"],
      correctAnswerIndex: 1
    },
    {
      question: "¿Qué tipo de instituciones privadas suelen ejecutar proyectos sociales en comunidades vulnerables?",
      options: ["ONG, fundaciones y cooperativas", "Bancos centrales", "Tribunales", "Contralorías"],
      correctAnswerIndex: 0
    },
    {
      question: "El principio de asignación de riesgos sugiere que:",
      options: ["El Estado debe cargar con todos los riesgos", "Cada riesgo debe asignarse a quien mejor puede gestionarlo", "Los riesgos deben ignorarse", "Los riesgos se asignan al azar"],
      correctAnswerIndex: 1
    },
    {
      question: "Un mecanismo de garantía en una concesión puede ser:",
      options: ["Asegurar un ingreso mínimo si la demanda real es menor a la proyectada", "Prohibir el mantenimiento", "Eliminar el monitoreo", "Impedir auditorías"],
      correctAnswerIndex: 0
    }
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
  faqs: [
    { question: `¿Qué es ${title}?`, answer: "Esta es una respuesta placeholder que será reemplazada por información real del tema." }
  ],
  references: [
    { citation: "Referencia bibliográfica placeholder - será reemplazada por citas reales del tema." }
  ],
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
  "1.1": content1_1,
  "3.1": content3_1,
  "7.1": content7_1,
  "7.2": content7_2
};

// Populate placeholders for remaining topics
COURSE_MODULES.forEach(module => {
  module.topics.forEach(topic => {
    if (topic.id !== "1.1" && topic.id !== "3.1" && topic.id !== "7.1" && topic.id !== "7.2") {
      TOPIC_CONTENT_DATA[topic.id] = generatePlaceholderContent(topic.id, topic.title);
    }
  });
});
