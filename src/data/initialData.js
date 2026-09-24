// Helper to create dates relative to now for dynamic urgency testing
const getFutureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

export const INITIAL_OPPORTUNITIES = [
  {
    id: "opp-ml-junior-fe",
    title: "Pasantía de Desarrollo Frontend Junior (React & TS)",
    issuer: {
      name: "Mercado Libre",
      type: "Empresa de Tecnología",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#ffe600",
      verified: true,
      website: "https://careers-mercadolibre.com",
      contactEmail: "talento-tech@mercadolibre.com",
      rating: 4.9
    },
    category: "empleo",
    modality: "remoto",
    cost: "gratis",
    location: "Remoto (Toda Latinoamérica)",
    tags: ["Remoto", "Pasantía Remunerada", "Estudiantes", "Tecnología"],
    requirements: [
      "Estudiante universitario de últimos ciclos o egresado reciente en carreras afines a TI",
      "Conocimientos básicos de JavaScript/TypeScript, React y Git",
      "Disponibilidad de 30 horas semanales"
    ],
    detailedRequirements: [
      "Cursando los últimos 2 semestres de Ingeniería en Sistemas, Informática o bootcamp certificado.",
      "Proyectos personales demostrables en GitHub con HTML, CSS, JavaScript o React.",
      "Capacidad de trabajo colaborativo en equipos multidisciplinarios.",
      "Pasión por resolver problemas de experiencia de usuario en escala masiva."
    ],
    benefits: [
      "Asignación mensual remunerada competitiva + bono de conectividad",
      "Laptop corporativa de última generación enviada a tu domicilio",
      "Mentores asignados semanalmente y plan de carrera acelerado",
      "Cobertura de seguro médico privado al 100%"
    ],
    description: "Únete al equipo que construye la plataforma de comercio electrónico líder de la región. En esta pasantía aprenderás a desarrollar interfaces de alto rendimiento, accesibles y resilientes para millones de usuarios diarios, guiado por ingenieros senior.",
    selectionProcess: [
      "1. Postulación en línea y revisión de portafolio/GitHub",
      "2. Prueba técnica asíncrona de lógica y React básico",
      "3. Entrevista cultural con el equipo de People",
      "4. Oferta formal e inicio del programa"
    ],
    closingDate: getFutureDate(2), // Cierra en 2 días -> Urgencia Crítica (Badge Rojo)
    startDate: getFutureDate(20),
    duration: "6 meses (con posibilidad de contratación efectiva)",
    featured: true,
    externalUrl: "https://mercadolibre.com/careers/pasantias-tech-2026",
    specificFilters: {
      jornada: "pasantia",
      remuneracion: "remunerado",
      sector: "tecnologia"
    }
  },
  {
    id: "opp-santander-beca-skills",
    title: "Becas Santander Habilidades Digitales & IA para Jóvenes 2026",
    issuer: {
      name: "Banco Santander & MIT",
      type: "Institución Financiera y Académica",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#ec0000",
      verified: true,
      website: "https://app.santanderopenacademy.com",
      contactEmail: "becas@santanderskills.org",
      rating: 4.8
    },
    category: "beca",
    modality: "remoto",
    cost: "beca_100",
    location: "Online / Internacional",
    tags: ["100% Financiada", "Certificación MIT", "Sin Costo", "Jóvenes 18-30"],
    requirements: [
      "Tener entre 18 y 30 años de edad al momento de la postulación",
      "Residir en cualquier país de Latinoamérica o España",
      "No se requiere experiencia técnica previa ni titulación universitaria"
    ],
    detailedRequirements: [
      "Disponibilidad de 6 a 8 horas semanales de estudio asíncrono durante 8 semanas.",
      "Acceso a computador con conexión estable a internet.",
      "Completar el test de motivación y competencias blandas en el portal del emisor."
    ],
    benefits: [
      "Exención total del 100% del costo de matrícula ($1,200 USD valor comercial)",
      "Certificado oficial co-emitido por MIT Professional Education",
      "Acceso a la comunidad alumni global y red de talento para empleo",
      "Masterclasses exclusivas en vivo con líderes de la industria tecnológica"
    ],
    description: "Una iniciativa conjunta para democratizar las habilidades de futuro en la juventud. Aprenderás prompt engineering, automatización con modelos de lenguaje, análisis de datos con Python y pensamiento crítico para la era digital.",
    selectionProcess: [
      "1. Registro en la plataforma Santander Open Academy",
      "2. Cuestionario de perfil socioeducativo y motivación",
      "3. Asignación directa de cupos a postulaciones destacadas"
    ],
    closingDate: getFutureDate(3), // Cierra en 3 días -> Crítica
    startDate: getFutureDate(15),
    duration: "8 semanas (Modalidad asíncrona)",
    featured: true,
    externalUrl: "https://santanderopenacademy.com/becas-ia-2026",
    specificFilters: {
      nivelEducativo: "universitario",
      cobertura: "total",
      area: "tecnologia"
    }
  },
  {
    id: "opp-google-cloud-genai",
    title: "Curso Certificado: Fundamentos de Inteligencia Artificial Generativa",
    issuer: {
      name: "Google Cloud Learning",
      type: "Organización Tecnológica",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#4285f4",
      verified: true,
      website: "https://cloud.google.com/training",
      contactEmail: "cloud-training-latam@google.com",
      rating: 4.95
    },
    category: "curso",
    modality: "remoto",
    cost: "gratis",
    location: "Plataforma Virtual Google Skills",
    tags: ["Gratuito", "Insignia Oficial Google", "Autodirigido", "Principiantes"],
    requirements: [
      "Cuenta de Google activa para acceder al entorno de laboratorio",
      "Conocimientos generales de internet y navegación",
      "No requiere experiencia en programación matemática avanzada"
    ],
    detailedRequirements: [
      "Ideal para estudiantes de todas las disciplinas interesados en IA.",
      "Laboratorios prácticos en Google Cloud Skills Boost sin costo.",
      "Evaluaciones por módulo con retroalimentación instantánea."
    ],
    benefits: [
      "Credencial e insignia digital verificable en LinkedIn emitida por Google Cloud",
      "Créditos de cómputo en la nube para experimentar con Gemini y Vertex AI",
      "Guías de estudio descargables en español"
    ],
    description: "Aprende qué es la IA generativa, cómo funcionan los modelos de lenguaje a gran escala (LLM) y cómo aplicar principios éticos y de seguridad en el diseño de soluciones tecnológicas.",
    selectionProcess: [
      "Inscripción instantánea con acceso inmediato a todo el material"
    ],
    closingDate: getFutureDate(28), // Cierra en 28 días -> Verde
    startDate: "Acceso Inmediato",
    duration: "30 horas (a tu propio ritmo)",
    featured: true,
    externalUrl: "https://cloud.google.com/training/course/generative-ai-fundamentals",
    specificFilters: {
      duracion: "corta",
      nivel: "principiante",
      certificacionOficial: true
    }
  },
  {
    id: "opp-bbva-data-trainee",
    title: "Programa Trainee: Analista de Datos Junior",
    issuer: {
      name: "BBVA México & Colombia",
      type: "Sector Bancario & Fintech",
      logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#004481",
      verified: true,
      website: "https://bbva.com/carreras",
      contactEmail: "talento.data@bbva.com",
      rating: 4.7
    },
    category: "empleo",
    modality: "hibrido",
    cost: "gratis",
    location: "CDMX / Bogotá / Monterrey (Híbrido 2 días oficina)",
    tags: ["Híbrido", "Contrato Indefinido", "Sueldo Competitivo", "SQL y Python"],
    requirements: [
      "Graduados o cursando último año de Economía, Matemáticas, Ingeniería o afines",
      "Manejo intermedio de SQL y nociones de Python o PowerBI",
      "Disponibilidad para esquema híbrido"
    ],
    detailedRequirements: [
      "Pensamiento analítico riguroso y curiosidad por el sector financiero.",
      "Experiencia académica con modelado de datos y visualización.",
      "Nivel de inglés técnico (lectura y comprensión de documentación)."
    ],
    benefits: [
      "Salario neto competitivo ($28,000 - $35,000 MXN / equivalente local)",
      "Prestaciones superiores a las de la ley y fondo de ahorro",
      "Bono por desempeño y seguro de gastos médicos mayores",
      "Certificaciones en Databricks y AWS cubiertas por la entidad"
    ],
    description: "Buscamos mentes analíticas que quieran transformar grandes volúmenes de transacciones en insights accionables para la banca del futuro. Trabajarás con arquitecturas de Data Lake en la nube y modelos predictivos.",
    selectionProcess: [
      "1. Filtro curricular automatizado",
      "2. Hackathon virtual de datos de 4 horas",
      "3. Panel con líderes de analítica avanzada",
      "4. Oferta de contratación por tiempo indefinido"
    ],
    closingDate: getFutureDate(5), // Cierra en 5 días -> Urgencia Media (Badge Ámbar)
    startDate: getFutureDate(35),
    duration: "Contrato Indefinido con 3 meses de inducción formativa",
    featured: true,
    externalUrl: "https://bbva.com/trainee-data-2026",
    specificFilters: {
      jornada: "tiempo_completo",
      remuneracion: "remunerado",
      sector: "finanzas"
    }
  },
  {
    id: "opp-aws-certified-practitioner",
    title: "Voucher y Preparación Oficial: AWS Certified Cloud Practitioner",
    issuer: {
      name: "Amazon Web Services (AWS)",
      type: "Líder en Cloud Computing",
      logo: "https://images.unsplash.com/photo-1523474255658-4af61b168344?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#232f3e",
      verified: true,
      website: "https://aws.amazon.com/es/training",
      contactEmail: "aws-academy@amazon.com",
      rating: 4.9
    },
    category: "certificacion",
    modality: "remoto",
    cost: "gratis",
    location: "Remoto / Examen Proctored Online",
    tags: ["Certificación Oficial", "Voucher 100% Gratis", "Cloud", "Alta Demanda"],
    requirements: [
      "Ser estudiante activo o egresado en los últimos 2 años",
      "Completar las 10 sesiones de mentoría asíncrona previas al examen",
      "Aprobar el simulador de examen diagnóstico con mínimo 75%"
    ],
    detailedRequirements: [
      "Sin requisito de experiencia previa en servidores o DevOps.",
      "Computador con cámara web funcional para la rendición remota del examen.",
      "Identificación oficial vigente para validar identidad con Pearson VUE."
    ],
    benefits: [
      "Código de voucher para rendir el examen oficial de AWS sin costo (Valor regular: $100 USD)",
      "Acceso a laboratorios interactivos AWS Jam durante 90 días",
      "Insignia digital oficial emitida en Credly para publicar en LinkedIn y CV"
    ],
    description: "Obtén una de las credenciales más valoradas por reclutadores tech a nivel global. Valida tus conocimientos esenciales sobre la nube de Amazon, seguridad, arquitectura y modelos de facturación.",
    selectionProcess: [
      "1. Registro con correo institucional o personal",
      "2. Realización del curso preparatorio en AWS Skill Builder",
      "3. Entrega de voucher para agendar la fecha de tu examen"
    ],
    closingDate: getFutureDate(6), // Cierra en 6 días -> Ámbar
    startDate: "Inmediata tras registro",
    duration: "4 semanas recomendadas",
    featured: false,
    externalUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    specificFilters: {
      duracion: "media",
      nivel: "principiante",
      certificacionOficial: true
    }
  },
  {
    id: "opp-convocatoria-semilla-impacto",
    title: "Convocatoria Capital Semilla para Emprendimientos Juveniles de Impacto Social",
    issuer: {
      name: "Fondo Juventudes Con Futuro",
      type: "Organización Sin Fines de Lucro & Banco Interamericano",
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#059669",
      verified: true,
      website: "https://juventudesconfuturo.org",
      contactEmail: "convocatorias@juventudesconfuturo.org",
      rating: 4.85
    },
    category: "convocatoria",
    modality: "hibrido",
    cost: "gratis",
    location: "Latinoamérica (Fase virtual + Demoday presencial)",
    tags: ["Financiamiento $10,000 USD", "No Reembolsable", "Impacto Social", "Startups"],
    requirements: [
      "Equipos de 2 a 4 jóvenes con edades entre 18 y 29 años",
      "Proyecto en etapa de idea validada o prototipo mínimo viable (MVP)",
      "Enfoque en sostenibilidad, educación, salud o inclusión financiera"
    ],
    detailedRequirements: [
      "Al menos el 50% de los fundadores deben ser jóvenes en el rango de edad especificado.",
      "Presentación de un video pitch de 3 minutos explicando el problema y solución.",
      "Compromiso de asistir al bootcamp de incubación de 6 semanas."
    ],
    benefits: [
      "Financiamiento no reembolsable (Equity-free) de $10,000 USD para los 5 mejores proyectos",
      "Incubación especializada y asesoría legal y contable para constitución de empresa",
      "Networking con fondos de Venture Capital e inversionistas ángeles"
    ],
    description: "¿Tienes una idea o proyecto que solucione una problemática real en tu comunidad? Esta convocatoria premia y financia iniciativas innovadoras lideradas por jóvenes soñadores y comprometidos.",
    selectionProcess: [
      "1. Envío de formulario y video pitch",
      "2. Evaluación de viabilidad por comité de expertos",
      "3. Pitch Day ante jurado internacional y premiación"
    ],
    closingDate: getFutureDate(4), // Cierra en 4 días -> Ámbar
    startDate: getFutureDate(25),
    duration: "6 meses de incubación",
    featured: false,
    externalUrl: "https://juventudesconfuturo.org/capital-semilla-2026",
    specificFilters: {
      tipo: "capital_semilla",
      sector: "impacto_social"
    }
  },
  {
    id: "opp-daad-beca-maestria",
    title: "Becas Completas DAAD para Estudios de Maestría en Alemania",
    issuer: {
      name: "Servicio Alemán de Intercambio Académico (DAAD)",
      type: "Agencia Gubernamental Académica",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#0284c7",
      verified: true,
      website: "https://www.daad.de",
      contactEmail: "info.latam@daad.de",
      rating: 4.95
    },
    category: "beca",
    modality: "presencial",
    cost: "beca_100",
    location: "Berlín, Múnich, Hamburgo (Alemania)",
    tags: ["Presencial", "Beca Completa", "Manutención", "Posgrado"],
    requirements: [
      "Título universitario de pregrado o licenciatura concluido con honores o buen promedio",
      "Nivel de inglés B2/C1 certificado (TOEFL o IELTS)",
      "Máximo 6 años de haber obtenido el título de grado"
    ],
    detailedRequirements: [
      "Carta de motivación estructurada de 2 páginas.",
      "Dos cartas de recomendación académica de profesores o investigadores.",
      "Propuesta de proyecto de estudio alineado a los programas elegibles."
    ],
    benefits: [
      "Estipendio mensual de 934 Euros para alojamiento y gastos de manutención",
      "Pasajes aéreos ida y vuelta financiados al 100%",
      "Seguro médico integral en Alemania",
      "Curso intensivo de idioma alemán previo al inicio de la maestría"
    ],
    description: "Realiza tus estudios de maestría en las universidades más prestigiosas de Alemania con todos los costos cubiertos. Abierto a programas de sostenibilidad, ciencias de la computación, energías renovables y ciencias sociales.",
    selectionProcess: [
      "1. Envío de expediente completo a la oficina regional del DAAD",
      "2. Preselección de candidaturas académicas",
      "3. Entrevista personal en embajada o virtual"
    ],
    closingDate: getFutureDate(18), // Cierra en 18 días -> Verde
    startDate: "Septiembre 2026",
    duration: "24 meses",
    featured: true,
    externalUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    specificFilters: {
      nivelEducativo: "posgrado",
      cobertura: "total",
      area: "internacional"
    }
  },
  {
    id: "opp-globant-uiux-junior",
    title: "Diseñador UI/UX Junior (Entry Level)",
    issuer: {
      name: "Globant Studios",
      type: "Consultora Global de Software y Diseño",
      logo: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#cbf500",
      verified: true,
      website: "https://globant.com/careers",
      contactEmail: "design-recruiting@globant.com",
      rating: 4.6
    },
    category: "empleo",
    modality: "remoto",
    cost: "gratis",
    location: "Remoto (Latinoamérica)",
    tags: ["Remoto", "Figma", "Design Systems", "Primer Empleo"],
    requirements: [
      "Portafolio con al menos 2 casos de estudio (UI/UX) bien documentados en Behance, Notion o web",
      "Dominio fluido de Figma y componentes con Auto-layout",
      "Conocimientos fundamentales de accesibilidad web (WCAG)"
    ],
    detailedRequirements: [
      "Capacidad para justificar decisiones de diseño basadas en heurísticas de usabilidad.",
      "Ganas de aprender e iterar rápidamente a partir de feedback.",
      "Buena comunicación interpersonal para colaborar con desarrolladores frontend."
    ],
    benefits: [
      "Contratación directa con sueldo internacional en dólares o moneda local indexada",
      "Presupuesto anual para cursos y conferencias de diseño",
      "Horarios flexibles y política de desconexión garantizada",
      "Clases de inglés gratuitas dos veces por semana"
    ],
    description: "Buscamos un diseñador con pasión por los detalles visuales y la empatía con los usuarios. Trabajarás diseñando aplicaciones móviles y sistemas web para clientes de entretenimiento, gaming y banca digital.",
    selectionProcess: [
      "1. Evaluación de portafolio y resolución de caso práctico de 48h",
      "2. Presentación del diseño ante el Design Lead",
      "3. Charla con el equipo y oferta"
    ],
    closingDate: getFutureDate(12), // Cierra en 12 días -> Verde
    startDate: getFutureDate(30),
    duration: "Tiempo Completo / Tiempo Indefinido",
    featured: false,
    externalUrl: "https://globant.com/job/uiux-junior-remote",
    specificFilters: {
      jornada: "tiempo_completo",
      remuneracion: "remunerado",
      sector: "diseno"
    }
  },
  {
    id: "opp-platzi-fullstack-scholarship",
    title: "Curso y Ruta: Desarrollo Web Moderno con React y Node.js",
    issuer: {
      name: "Platzi & Fundación Telmex",
      type: "Plataforma EdTech",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#98ca3f",
      verified: true,
      website: "https://platzi.com",
      contactEmail: "becas-comunidad@platzi.com",
      rating: 4.75
    },
    category: "curso",
    modality: "remoto",
    cost: "gratis",
    location: "Online / Plataforma Platzi",
    tags: ["100% Gratis", "Full-Stack", "JavaScript", "Certificado"],
    requirements: [
      "Tener ganas de transformar tu futuro profesional a través de la programación",
      "Disponibilidad de 10 horas semanales para clases y proyectos prácticos",
      "No requiere conocimientos previos en código"
    ],
    detailedRequirements: [
      "La beca cubre acceso completo a los 12 cursos de la ruta de desarrollo web durante 4 meses.",
      "Tutoría en Discord con la comunidad de estudiantes y profesores en vivo los viernes."
    ],
    benefits: [
      "Acceso ilimitado sin costo a la ruta completa de Full-Stack Developer",
      "Certificado digital de aprobación al completar los proyectos de cada módulo",
      "Revisión de tu perfil de LinkedIn y portafolio por reclutadores"
    ],
    description: "Aprende desde las bases de HTML5 y CSS moderno hasta arquitecturas de servidores en Node.js, bases de datos relacionales y despliegue continuo en la nube.",
    selectionProcess: [
      "Registro en el formulario oficial y prueba de lógica introductoria"
    ],
    closingDate: getFutureDate(2), // Cierra en 2 días -> Urgencia Crítica (Badge Rojo para Discovery Flow 2.3)
    startDate: getFutureDate(14),
    duration: "4 meses de membresía activa",
    featured: false,
    externalUrl: "https://platzi.com/becas-desarrollo-web-2026",
    specificFilters: {
      duracion: "media",
      nivel: "principiante",
      certificacionOficial: true
    }
  },
  {
    id: "opp-hackathon-ciberseguridad",
    title: "Hackathon Nacional Juvenil de Ciberseguridad & Defensa Digital 2026",
    issuer: {
      name: "Alianza por la Ciberseguridad Nacional",
      type: "Iniciativa Interinstitucional",
      logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#0f172a",
      verified: true,
      website: "https://ciberseguridadjuvenil.org",
      contactEmail: "contacto@ciberseguridadjuvenil.org",
      rating: 4.9
    },
    category: "convocatoria",
    modality: "remoto",
    cost: "gratis",
    location: "Virtual (Plataforma CTF)",
    tags: ["Capture The Flag (CTF)", "Premios en Efectivo", "Pre-empleo", "Ciberdefensa"],
    requirements: [
      "Jóvenes de 17 a 26 años apasionados por la seguridad informática y redes",
      "Participación individual o en equipos de hasta 3 personas",
      "Familiaridad con Linux básico y herramientas de análisis forense"
    ],
    detailedRequirements: [
      "Retos de seguridad ofensiva y defensiva de nivel introductorio a intermedio.",
      "Empresas patrocinadoras buscarán activamente reclutar finalistas para puestos de analistas SOC junior."
    ],
    benefits: [
      "$5,000 USD en premios para los tres primeros lugares",
      "Entrevistas prioritarias con firmas globales de ciberseguridad para empleo",
      "Swag pack oficial y diplomas de participación"
    ],
    description: "Pon a prueba tus destrezas en criptografía, análisis de tráfico, ingeniería inversa y seguridad web en un ambiente de competencia seguro y gamificado.",
    selectionProcess: [
      "Inscripción en línea hasta 24 horas antes del inicio de la competencia"
    ],
    closingDate: getFutureDate(1), // Cierra en 1 día -> Crítica
    startDate: getFutureDate(2),
    duration: "Fin de semana (48 horas ininterrumpidas)",
    featured: false,
    externalUrl: "https://ciberseguridadjuvenil.org/registro",
    specificFilters: {
      tipo: "innovacion",
      sector: "seguridad"
    }
  },
  {
    id: "opp-scrum-master-cert",
    title: "Certificación Ágil: Scrum Fundamentals Certified (SFC™)",
    issuer: {
      name: "SCRUMstudy & Agile Academy",
      type: "Organismo Internacional de Certificación",
      logo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#f97316",
      verified: true,
      website: "https://scrumstudy.com",
      contactEmail: "soporte@scrumstudy.com",
      rating: 4.7
    },
    category: "certificacion",
    modality: "remoto",
    cost: "gratis",
    location: "Online / Examen sin costo",
    tags: ["Metodologías Ágiles", "Gestión de Proyectos", "Sin Costo", "Certificado Global"],
    requirements: [
      "Sin requisitos formales previos de titulación",
      "Completar la lectura de la guía SBOK (Scrum Body of Knowledge) digital",
      "Aprobar el examen de 40 preguntas de opción múltiple"
    ],
    detailedRequirements: [
      "Válido para estudiantes que desean incorporar metodologías ágiles a su currículum para destacar ante empresas modernas."
    ],
    benefits: [
      "Certificado emitido digitalmente con número de registro único internacional",
      "10 PDUs acreditables para PMI",
      "Material audiovisual explicativo y casos de estudio reales"
    ],
    description: "Domina los roles de Scrum, eventos, sprints y artefactos para gestionar proyectos con velocidad y adaptabilidad en entornos corporativos o startups.",
    selectionProcess: [
      "Inscripción instantánea y disponibilidad para rendir el test en cualquier momento"
    ],
    closingDate: getFutureDate(45), // Cierra en 45 días
    startDate: "Inmediata",
    duration: "10 horas de autoestudio",
    featured: false,
    externalUrl: "https://scrumstudy.com/certification/scrum-fundamentals-certified",
    specificFilters: {
      duracion: "corta",
      nivel: "principiante",
      certificacionOficial: true
    }
  },
  {
    id: "opp-lideres-del-futuro",
    title: "Beca Universitaria Líderes del Futuro (Pregrado 100%)",
    issuer: {
      name: "Fundación Futuro Brillante",
      type: "Fondo Filantrópico Educativo",
      logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80",
      avatarBg: "#7c3aed",
      verified: true,
      website: "https://futurobrillante.org",
      contactEmail: "admisiones@futurobrillante.org",
      rating: 4.9
    },
    category: "beca",
    modality: "presencial",
    cost: "beca_100",
    location: "Sedes universitarias aliadas a nivel nacional",
    tags: ["Carrera Completa", "Pregrado", "Cobertura 100%", "Liderazgo Juvenil"],
    requirements: [
      "Estudiante de último año de preparatoria/bachillerato o recién graduado",
      "Promedio académico igual o superior a 8.5 / 10.0 (o equivalente)",
      "Historial de participación comunitaria, voluntariado o actividades extracurriculares"
    ],
    detailedRequirements: [
      "Comprobación de necesidad socioeconómica familiar.",
      "Carta de recomendación de directores o tutores escolares.",
      "Ensayo de propósito de 800 palabras sobre tu visión para generar impacto positivo."
    ],
    benefits: [
      "Pago del 100% de la colegiatura y matrícula durante toda la carrera universitaria",
      "Beca mensual para libros, transporte y alimentación",
      "Programa de mentoría con líderes empresariales y sociales",
      "Acceso a campamentos de verano de liderazgo internacional"
    ],
    description: "Una oportunidad que cambia vidas: impulsamos a jóvenes brillantes con espíritu de servicio que no cuentan con los recursos financieros suficientes para costear una educación superior de élite.",
    selectionProcess: [
      "1. Registro socioeconómico y envío de calificaciones",
      "2. Examen psicométrico y de razonamiento matemático",
      "3. Entrevista domiciliaria o virtual con la familia del aspirante",
      "4. Publicación oficial de la generación de becarios"
    ],
    closingDate: getFutureDate(10), // Cierra en 10 días
    startDate: "Enero 2027",
    duration: "4 a 5 años (duración oficial del plan de estudios)",
    featured: true,
    externalUrl: "https://futurobrillante.org/postulaciones-2026",
    specificFilters: {
      nivelEducativo: "secundaria",
      cobertura: "total",
      area: "universitario"
    }
  }
];

export const INITIAL_ARTICLES = [
  {
    id: "art-cv-sin-experiencia",
    title: "Cómo armar un CV de alto impacto para tu primer empleo sin experiencia",
    category: "Empleabilidad & CV",
    readTime: "4 min de lectura",
    author: "Sofía Méndez • Reclutadora Tech",
    date: "18 Sep 2026",
    summary: "Aprende a destacar tus proyectos académicos, habilidades blandas y voluntariados para captar la atención de reclutadores en menos de 10 segundos.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80",
    content: `
Muchas veces los jóvenes cometen el error de pensar que no tener experiencia previa significa dejar la hoja de vida vacía. ¡Nada más alejado de la realidad!

Los reclutadores de talento junior buscan principalmente tres cosas:
1. **Actitud y proactividad:** ¿Qué has hecho por tu cuenta para aprender?
2. **Proyectos prácticos:** Tareas escolares destacadas, proyectos en GitHub, prototipos en Figma o páginas web creadas para negocios locales.
3. **Habilidades transferibles:** Trabajo en equipo, resolución de problemas bajo presión y capacidad de comunicación.

Estructura sugerida para tu CV:
- **Resumen profesional (3 líneas):** Quién eres, qué estudias y qué valor aportas a la empresa.
- **Proyectos destacados:** Nombre del proyecto, herramientas utilizadas y qué impacto o resultado obtuviste.
- **Habilidades técnicas y blandas:** Sé honesto con tus niveles de dominio.
- **Educación y reconocimientos:** Cursos certificados que demuestren que sigues aprendiendo.
    `
  },
  {
    id: "art-claves-becas-internacionales",
    title: "5 Claves para postular y ganar una beca internacional este 2026",
    category: "Becas & Financiación",
    readTime: "5 min de lectura",
    author: "Carlos De La Cruz • Ex-becario Chevening",
    date: "14 Sep 2026",
    summary: "Los comités de becas evalúan cientos de solicitudes. Descubre la fórmula infalible para redactar cartas de motivación que enamoren al jurado.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    content: `
Postular a una beca en el extranjero parece un proceso titánico, pero en realidad es un juego de método y anticipación.

Aquí te dejamos las 5 claves más importantes:
1. **Anticípate mínimo 6 meses:** Las certificaciones de idioma (TOEFL, IELTS) y la traducción de notas tardan meses.
2. **Tu ensayo no es tu currículum en prosa:** El comité ya vio tus calificaciones. En la carta de motivación quieren saber tu 'Por qué' y cómo regresarás el impacto a tu sociedad.
3. **Elige cartas de recomendación con anécdotas reales:** Una carta genérica firmada por un decano vale mucho menos que la carta detallada de un profesor que vio tu superación constante.
4. **Investiga los objetivos del donante:** ¿Qué busca la institución? ¿Innovación, inclusión, relaciones bilaterales? Alinea tu discurso con su misión.
5. **Revisa la fecha de cierre con calendario:** Cada año miles de jóvenes pierden su oportunidad por dejar la carga de archivos para la última hora del servidor.
    `
  },
  {
    id: "art-detectar-estafas-laborales",
    title: "Guía para detectar ofertas laborales falsas y combatir la desinformación",
    category: "Seguridad & Verificación",
    readTime: "3 min de lectura",
    author: "Nexus Anti-Fraud Taskforce",
    date: "10 Sep 2026",
    summary: "En Punto Nexus verificamos cada oportunidad antes de publicarla. Conoce las banderas rojas para evitar caer en engaños o esquemas piramidales.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    content: `
Uno de los pilares de Punto Nexus es garantizar un entorno seguro y libre de información engañosa para la juventud. Desafortunadamente, en internet abundan falsas promesas.

Banderas rojas (Red Flags) que debes aprender a identificar:
- **Te piden dinero para exámenes médicos o uniformes antes de empezar:** Una empresa legítima NUNCA te cobrará por postularte o evaluarte.
- **Ofertas de 'Sé tu propio jefe' sin descripción de tareas reales:** Si no queda claro cuál es el producto o servicio y te piden reclutar amigos, es un esquema piramidal.
- **Comunicaciones por WhatsApp o Telegram desde números desconocidos:** Las corporaciones serias utilizan correos con dominio propio corporativo (ej. @mercadolibre.com, no @gmail.com).
- **Sueldos absurdamente inflados sin requisitos:** "Gana $500 USD diarios viendo videos 20 minutos". Esto es un anzuelo de estafa.

En Punto Nexus puedes reportar cualquier ficha sospechosa con el botón 'Reportar Oportunidad'.
    `
  },
  {
    id: "art-certificaciones-tech-rentables",
    title: "Las certificaciones tecnológicas más demandadas y con mejor retorno en 2026",
    category: "Cursos & Certificaciones",
    readTime: "6 min de lectura",
    author: "Elena Rostova • Tech Career Coach",
    date: "05 Sep 2026",
    summary: "Cloud, Inteligencia Artificial y Ciberseguridad dominan las contrataciones. Descubre cuáles tienen exámenes con vouchers gratuitos.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    content: `
El mercado laboral tech se ha vuelto más exigente con la validación de conocimientos prácticos. Las certificaciones oficiales de proveedores cloud y frameworks ágiles funcionan como un acelerador directo hacia la primera entrevista.

Top certificaciones recomendadas para perfiles junior:
1. **AWS Certified Cloud Practitioner & Azure Fundamentals (AZ-900):** La base obligatoria para entender arquitecturas cloud.
2. **Google Cloud Generative AI Leader:** Te posiciona a la vanguardia en la adopción empresarial de modelos de lenguaje.
3. **CompTIA Security+ o Cisco CCNA:** El estándar de oro para iniciar en redes y centros de operaciones de ciberseguridad.
4. **Scrum Fundamentals (SFC):** Fundamental para insertarte en células ágiles de trabajo sin tropiezos.
    `
  }
];

export const CATEGORIES_CONFIG = [
  { id: "todas", label: "Todas las categorías", icon: "Layers" },
  { id: "empleo", label: "Empleos & Pasantías", icon: "Briefcase", badgeClass: "badge-empleo" },
  { id: "beca", label: "Becas & Financiamiento", icon: "GraduationCap", badgeClass: "badge-beca" },
  { id: "curso", label: "Cursos de Formación", icon: "BookOpen", badgeClass: "badge-curso" },
  { id: "certificacion", label: "Certificaciones Oficiales", icon: "Award", badgeClass: "badge-certificacion" },
  { id: "convocatoria", label: "Convocatorias & Fondos", icon: "Megaphone", badgeClass: "badge-convocatoria" }
];
