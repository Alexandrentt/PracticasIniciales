const fs = require('fs');

let file = fs.readFileSync('constants.ts', 'utf8');

// fix content1_5 references
const bad15ref = `  references: [
    { 
      citation: "Ahuja, H. N., & Lendzion, C. (s.f.). *Métodos y técnicas de planeación"
    },
    { 
      citation: "y control de proyectos de ingeniería.* Editorial Académica."
    },
    { 
      citation: "Asana. (s.f.). *Las 12 metodologías más populares para la gestión de"
    },
    { 
      citation: "proyectos de ingeniería.* Recuperado de asana.com"
    },
    { 
      citation: "Banco Interamericano de Desarrollo \\\\[BID\\\\]. (s.f.). *Guía metodología"
    },
    { 
      citation: "PM4R para resultados de desarrollo sostenibles.* BID."
    },
    { 
      citation: "GanttPRO. (s.f.). *Herramientas de planeación en administración de"
    },
    { 
      citation: "proyectos eficaces.*"
    },
    { 
      citation: "Gray, C. F., & Larson, E. W. (2009). *Administración de proyectos:"
    },
    { 
      citation: "Enfoque técnico* (4ta ed.). McGraw-Hill."
    },
    { 
      citation: "Lledó, P., & Rivarola, G. (2007). *Gestión de proyectos: Del alcance"
    },
    { 
      citation: "al plan del proyecto.* Pearson Educación."
    },
    { 
      citation: "Project Management Institute \\\\[PMI\\\\]. (2013). *Guía del PMBOK®* (5ta"
    },
  ],`;

const good15ref = `  references: [
    { citation: "Ahuja, H. N., & Lendzion, C. (s.f.). *Métodos y técnicas de planeación y control de proyectos de ingeniería.* Editorial Académica." },
    { citation: "Asana. (s.f.). *Las 12 metodologías más populares para la gestión de proyectos de ingeniería.* Recuperado de asana.com" },
    { citation: "Banco Interamericano de Desarrollo [BID]. (s.f.). *Guía metodología PM4R para resultados de desarrollo sostenibles.* BID." },
    { citation: "GanttPRO. (s.f.). *Herramientas de planeación en administración de proyectos eficaces.*" },
    { citation: "Gray, C. F., & Larson, E. W. (2009). *Administración de proyectos: Enfoque técnico* (4ta ed.). McGraw-Hill." },
    { citation: "Lledó, P., & Rivarola, G. (2007). *Gestión de proyectos: Del alcance al plan del proyecto.* Pearson Educación." },
    { citation: "Project Management Institute [PMI]. (2013). *Guía del PMBOK®* (5ta ed)." }
  ],`;

file = file.replace(bad15ref.replace(/\\\\/g, '\\'), good15ref);

const bad13ref = `  references: [
    { 
      citation: "Glosario de Términos Clave:"
    },
    { 
      citation: "Alcance: La suma total de todos los productos del proyecto y sus requisitos."
    },
    { 
      citation: "Hito: Un punto de referencia que marca un evento importante en el proyecto."
    },
    { 
      citation: "Stakeholders: Interesados o partes afectadas por el proyecto."
    },
    { 
      citation: "KPI: Indicador clave de desempeño para medir el éxito técnico."
    },
    { 
      citation: "Asana (2026). Las 5 fases de la gestión de proyectos."
    },
    { 
      citation: "GanttPRO (2023). Guía de planificación y tipos de proyectos industriales."
    },
    { 
      citation: "Coursera Staff (2023). El ciclo de vida de la gestión de proyectos explicado."
    },
    { 
      citation: "Documentación Técnica de la Facultad de Ingeniería CUNOC."
    }
  ],`;

const good13ref = `  references: [
    { citation: "Asana (2026). Las 5 fases de la gestión de proyectos." },
    { citation: "GanttPRO (2023). Guía de planificación y tipos de proyectos industriales." },
    { citation: "Coursera Staff (2023). El ciclo de vida de la gestión de proyectos explicado." },
    { citation: "Documentación Técnica de la Facultad de Ingeniería CUNOC." }
  ],`;

file = file.replace(bad13ref, good13ref);

const bad16ref = `  references: [
    { 
      citation: "Asociación de Gestión de Proyectos. (2013). Guía del PMBOK (5ta ed.). PMI."
    },
    { 
      citation: "Fontaine, ER (2008). Evaluación social de proyectos (13va ed.). Pearson."
    },
    { 
      citation: "ILPÉS. (2006). Metodología general de identificación, preparación y evaluación de proyectos de inversión pública. CEPAL."
    },
    { 
      citation: "Ministerio de Finanzas Públicas y SEGEPLAN. (2025). Normas del SNIP 2025. Gobierno de Guatemala."
    },
    { 
      citation: "SEGEPLAN. (2021). Guía FEPIP: Manual de formulación y evaluación de proyectos."
    }
  ],`;

const good16ref = `  references: [
    { citation: "Asociación de Gestión de Proyectos. (2013). Guía del PMBOK (5ta ed.). PMI." },
    { citation: "Congreso de la República de Guatemala. (1970). Decreto 2-70: Código de Comercio." },
    { citation: "Fontaine, ER (2008). Evaluación social de proyectos (13va ed.). Pearson." },
    { citation: "ILPÉS. (2006). Metodología general de identificación, preparación y evaluación de proyectos de inversión pública. CEPAL." },
    { citation: "Ministerio de Finanzas Públicas y SEGEPLAN. (2025). Normas del SNIP 2025. Gobierno de Guatemala." },
    { citation: "SEGEPLAN. (2021). Guía FEPIP: Manual de formulación y evaluación de proyectos." }
  ],`;

file = file.replace(bad16ref, good16ref);

fs.writeFileSync('constants.ts', file, 'utf8');
console.log('constants.ts fixed.');
