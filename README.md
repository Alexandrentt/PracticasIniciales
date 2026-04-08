<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Plataforma de Aprendizaje - Prácticas Iniciales de Ingeniería

Plataforma educativa interactiva para el aprendizaje de prácticas iniciales de ingeniería, con módulos estructurados, contenido multimedia y evaluaciones.

## Características Principales

- **Módulos de Aprendizaje**: 7 módulos principales cubriendo planificación de proyectos, diagnósticos, estudios de casos y más
- **Contenido Interactivo**: Investigación estructurada, infografías visuales, flashcards y evaluaciones
- **Sistema de Progreso**: Seguimiento del avance del estudiante con autenticación Firebase
- **Recursos Visuales**: Infografías específicas para cada tema disponible
- **Diseño Responsivo**: Interfaz moderna y adaptable a diferentes dispositivos
- **Diseño Académico Elegante**: Sistema de diseño profesional con paleta de colores académicos y tipografía formal
- **Evaluaciones Diversificadas**: Sistema de evaluación con preguntas de opción múltiple y verdadero/falso
- **Bibliografía Estandarizada**: Sistema de citación académica unificado y completo para cada tema de investigación
- **Formato Estandarizado**: Contenido con formato "Realizado por:" para autoría consistente

## Módulos Disponibles

1. **Planificación de proyectos y prácticas de la ingeniería**
   - La planificación de proyectos y el ejercicio de las prácticas de ingeniería
   - Importancia de la planificación
   - Tipos de proyectos
   - Etapas y ciclos
   - Método y técnicas
   - Metodología de proyectos privados y públicos

2. **Diagnósticos**
   - Tipos e instrumentos (Línea base, FODA)
   - Niveles (Micro y Macrodiagnósticos)

3. **Estudio de casos como herramienta en la ingeniería**
   - Administración estratégica por casos
   - Conceptos y aplicaciones
   - Técnicas de documentación
   - Métodos de evaluación interna y externa
   - Metodología para implementación

4. **Estudios en los proyectos**
   - Estudio legal, ambiental, de mercado, económico, financiero, social, administrativo y técnico

5. **Elaboración y preparación de documentos en el proyecto**
   - Términos de referencia, bases de cotización, ética y responsabilidad social

6. **Estrategias de Implementación**
   - Corporativa, competitiva, comparativa

7. **Instituciones relacionadas a proyectos**
   - Públicas y privadas

## Tecnologías Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Estilos**: TailwindCSS
- **Backend**: Firebase (Authentication + Firestore)
- **IA**: Gemini API para generación de contenido
- **Infografías**: Almacenamiento local en `/public/infografias/`

## Instalación y Ejecución Local

**Prerrequisitos:** Node.js 16+

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variable de entorno:
   Crear archivo `.env.local` con:
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. Ejecutar aplicación:
   ```bash
   npm run dev
   ```

4. Abrir navegador:
   ```
   http://localhost:5173
   ```

## Compilación para Producción

```bash
npm run build
```

## Estructura del Proyecto

```
├── public/
│   └── infografias/          # Infografías por tema (1.1.png, 1.2.png, etc.)
├── src/
│   ├── components/           # Componentes React
│   │   ├── TopicViewer.tsx  # Visor de contenido con pestañas
│   │   ├── Quiz.tsx         # Componente de evaluación
│   │   └── Flashcards.tsx   # Tarjetas de aprendizaje
│   ├── services/            # Servicios API
│   ├── constants.ts         # Contenido y configuración
│   ├── types.ts            # Tipos TypeScript
│   └── App.tsx            # Aplicación principal
├── DOCUMENTACION.md         # Documentación detallada del proyecto
└── README.md              # Este archivo
```

## Actualizaciones Recientes

### v2.4.0 (2026-04-08)
- **Optimización Mobile Full-Responsive y Refinamiento UX Académico Final**
  - Rediseño de contenedores y sistema de navegación para dispositivos móviles.
  - Implementación de scroll horizontal suavizado en pestañas adaptativas.
  - Optimización de Flashcards y Quiz para máxima legibilidad en pantallas pequeñas.
  - Sincronización estética definitiva con la paleta de colores istitucional.

### v2.3.0 (2026-04-08)
- **Refinamiento Estético Premium y Estandarización de Diseño (online_viewer_net.html)**
  - Integración de Playfair Display de Google Fonts para encabezados académicos.
  - Sistema de clases utilitarias académicas (.heading-serif, .academic-paper).
  - Cards de Atribución estilizadas para el formato "Realizado por:".

### v1.8.1 (2026-04-07)
- **Mejoras de Formato y Evaluación**
  - Cambio de "Investigador" a "Realizado por:" para estandarizar autoría.
  - Implementación de preguntas de verdadero/falso junto a opción múltiple.
- **Actualización de Componentes**: Todos los componentes actualizados con diseño académico elegante.

## Contribución

Este proyecto está diseñado para ser un recurso educativo completo para estudiantes de ingeniería en sus prácticas iniciales.
