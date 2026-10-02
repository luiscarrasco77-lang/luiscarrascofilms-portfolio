// UI copy + SEO copy for every locale. Imported by server components only (the
// layout passes the active dictionary down to the client provider), so the
// other languages never ship in the client bundle.
import type { Lang } from "./locales";

const en = {
  nav: { work: "Work", services: "Services", vision: "Vision", contact: "Contact", letsWork: "Let's Work" },
  hero: {
    eyebrow: "Filmmaker · Photographer",
    subtitle:
      "Turning stories into growth. We build digital stories that connect, convert, and create loyal communities.",
    cta: "View the Work",
    scroll: "Scroll",
  },
  location: {
    based: "Based in St. Gallen, Switzerland",
    short: "St. Gallen · Switzerland",
  },
  trust: { label: "Trusted by global brands & artists" },
  stats: {
    impact: "The Impact",
    years: "Years of Global Production",
    instagram: "Instagram Followers Reached",
    youtube: "YouTube Subs Built",
    monthly: "Monthly Views",
  },
  featured: {
    eyebrow: "Selected Work",
    title: "Featured Projects",
    viewAll: "View All Work",
  },
  cta: {
    eyebrow: "Available for new projects",
    title: "Let's make your next film.",
    text: "Based in St. Gallen, working across Switzerland, Europe and worldwide.",
    button: "Start a Project",
  },
  gallery: {
    title: "Portfolio",
    intro: "Brand films, commercials, event and travel videos, produced in St. Gallen for clients in Switzerland and worldwide.",
    hint: "Click any item to view",
    empty: "Nothing here yet in this filter.",
    media: { all: "All", video: "Video", photo: "Photography" },
    categories: {
      all: "All",
      travel: "Travel",
      festivals: "Festivals",
      action: "Action",
      commercial: "Commercial",
      lifestyle: "Lifestyle",
    },
  },
  vision: {
    eyebrow: "The Vision",
    titleLine1: "A kid with a camera",
    titleLine2: "full of dreams.",
    p1: "From a toy camera in my childhood hands to a cinema rig across five continents. The obsession never changed, only the tools did.",
    p2: "Every frame is a decision. Every cut is an argument. Every story is a reason to keep moving.",
    p3: "What started as curiosity became craft. What became craft became a career.",
    thenNow: "Then & now, always behind the lens",
    editorial1:
      "It started with a camera and the open road. What began as a personal obsession with capturing movement and light became a career spanning five continents, global brands, and millions of views.",
    editorial2:
      "From the snow-covered peaks of the French Alps to the electric energy of underground music festivals, every frame tells a story engineered for impact.",
    quote:
      "“In a world full of AI and noise, companies look for craftsmen, not machines. Storytelling is the engine behind growth.”",
    whatIDo: "What I Do",
    services: [
      {
        title: "Direction & Cinematography",
        desc: "Concept-to-delivery creative direction. From brand campaigns to travel documentaries, every project gets a cinematic treatment built for digital performance.",
      },
      {
        title: "Editing & Post-Production",
        desc: "Fast-paced, high-retention editing. Color grading, sound design, and motion graphics crafted for the platforms that matter: YouTube, Instagram, TikTok.",
      },
      {
        title: "Brand Strategy & Content",
        desc: "More than production: I help brands build visual ecosystems. Content strategies that turn viewers into communities and communities into customers.",
      },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    headingLine1: "Let's create your brand",
    headingLine2: "through visual storytelling.",
    intro:
      "Whether you're a hotel, a brand, a festival or a creator, I help you turn visual content into real growth. Let's talk.",
    direct: "Or reach out directly",
    phone: "Phone",
    whatsapp: "WhatsApp",
    location: "Location",
    name: "Name",
    email: "Email",
    company: "Brand / Hotel / Agency",
    budget: "Estimated Budget",
    details: "Project Details",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    companyPlaceholder: "Company or brand name",
    detailsPlaceholder: "Tell me about your project, timeline, and vision...",
    budgetSelect: "Select a range",
    budgetOptions: ["Under CHF 1,500", "CHF 1,500-5,000", "CHF 5,000-10,000", "CHF 10,000+"],
    submit: "Send Inquiry",
    sending: "Sending...",
    error: "Something went wrong. Please try again or email directly.",
    successTitle: "Message sent.",
    successMsg: "I'll be in touch shortly.",
  },
  services: {
    "eyebrow": "Services",
    "title": "Video production & photography in St. Gallen",
    "intro": "From concept to final cut: brand films, commercials, event films and photography for companies, hotels and tourism brands across Switzerland and worldwide.",
    "items": [
      {
        "title": "Brand & corporate films",
        "desc": "Image films that show who you are. For companies, universities and organisations, told with a cinematic look and a clear message."
      },
      {
        "title": "Commercials & social ads",
        "desc": "Short, high-retention spots for Instagram, TikTok, YouTube and campaigns, in vertical and horizontal formats, built to perform."
      },
      {
        "title": "Tourism & hospitality",
        "desc": "Films and photos for destinations, mountain resorts, hotels and restaurants that make people want to be there."
      },
      {
        "title": "Events & festivals",
        "desc": "Aftermovies and event coverage full of energy, from corporate events to international music festivals."
      },
      {
        "title": "Photography",
        "desc": "Brand, travel, hospitality and event photography with the same cinematic eye, ready for web, print and social."
      },
      {
        "title": "Aerial & drone",
        "desc": "Drone footage and aerial photography of landscapes, properties and events across Switzerland."
      }
    ],
    "processTitle": "How we work",
    "process": [
      {
        "title": "Brief",
        "desc": "We talk about your goals, your audience and your budget."
      },
      {
        "title": "Concept",
        "desc": "Idea, script and shot list, with a clear timeline and quote."
      },
      {
        "title": "Production",
        "desc": "Filming and photography on location, anywhere in Switzerland or abroad."
      },
      {
        "title": "Post-production",
        "desc": "Editing, color grading and sound design, delivered in every format you need."
      }
    ],
    "areasTitle": "Where I work",
    "areas": "Based in St. Gallen. Regularly filming in Zürich, Winterthur, Appenzell, Thurgau, the Rhine Valley and Liechtenstein, and on location worldwide.",
    "faqTitle": "Frequently asked questions",
    "faq": [
      {
        "q": "How much does a video production cost?",
        "a": "It depends on the scope: shooting days, crew, locations and post-production. After a short call you receive a clear quote."
      },
      {
        "q": "Do you also work outside St. Gallen?",
        "a": "Yes. I work across Switzerland, including Zürich and Eastern Switzerland, and travel for international projects."
      },
      {
        "q": "Can you deliver both video and photos?",
        "a": "Yes. Many clients book film and photography together, so the campaign looks consistent on every channel."
      },
      {
        "q": "How long does a project take?",
        "a": "Depending on the scope, from a few days for short social content to a few weeks for a brand film."
      },
      {
        "q": "Do you handle the whole production?",
        "a": "Yes: concept, filming, drone, editing, color grading and sound, with one single point of contact."
      }
    ],
    "ctaTitle": "Tell me about your project.",
    "ctaButton": "Request a quote",
    "homeTitle": "Film & photography for brands that want to stand out.",
    "homeLink": "All services"
  },
  cursor: {"play": "Play", "view": "View"},
  a11y: { menu: "Menu", language: "Language", close: "Close", enlarge: "Enlarge photo" },
  modal: { copyLink: "Copy link", copied: "Link copied" },
  footer: {
    tagline:
      "Cinematic films and photography for brands, hotels and festivals, from St. Gallen to the world.",
    navigate: "Navigate",
    connect: "Connect",
    rights: "All rights reserved.",
    crafted: "Crafted with vision",
  },
  watch: {
    back: "Back to Work",
    exploreMore: "Explore more work",
    kinds: {
      travel: "Travel film",
      festivals: "Festival aftermovie",
      action: "Action sports film",
      commercial: "Brand film",
      lifestyle: "Lifestyle video",
    },
    seoSuffix: "Video production by Luis Carrasco Films, cinematographer based in St. Gallen, Switzerland.",
  },
  // Project descriptions from data/projects.ts (written in English) → this language.
  descriptions: {} as Record<string, string>,
  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    back: "Back to home",
  },
  seo: {
    ogLocale: "en_US",
    siteDescription:
      "Filmmaker and photographer in St. Gallen, Switzerland: brand films, commercials, tourism and event videos, drone and photography across Switzerland.",
    home: {
      title: "Filmmaker & Photographer in St. Gallen | Luis Carrasco Films",
      description:
        "Filmmaker and photographer in St. Gallen, Switzerland: brand films, commercials, tourism and event videos, drone and photography across Switzerland.",
    },
    work: {
      title: "Portfolio: Films & Photography",
      description:
        "Selected video productions by Luis Carrasco, based in St. Gallen: brand and university films, tourism films, festival aftermovies and photography.",
    },
    vision: {
      title: "About: Filmmaker & Photographer",
      description:
        "The story behind Luis Carrasco Films: from a kid with a camera to a cinematographer and director based in St. Gallen, Switzerland.",
    },
    services: {
      title: "Services: Film & Photography in St. Gallen",
      description:
        "Brand films, commercials, event and tourism videos, drone footage and photography from St. Gallen for companies across Switzerland and worldwide.",
    },
    contact: {
      title: "Contact: Book a Video Production in Switzerland",
      description:
        "Planning a brand film or commercial in Switzerland? Contact Luis Carrasco Films in St. Gallen by phone, WhatsApp or email.",
    },
    keywords: [
      "photographer St. Gallen",
      "filmmaker St. Gallen",
      "photographer Switzerland",
      "commercial photographer Switzerland",
      "event photographer St. Gallen",
      "videographer St. Gallen",
      "video production St. Gallen",
      "video production Switzerland",
      "filmmaker Switzerland",
      "cinematographer Switzerland",
      "brand film Switzerland",
      "corporate video Switzerland",
      "commercial video production",
      "drone filming Switzerland",
      "festival aftermovie",
      "travel film",
      "Luis Carrasco",
    ],
  },
};

export type Dict = typeof en;

const es: Dict = {
  nav: { work: "Proyectos", services: "Servicios", vision: "Visión", contact: "Contacto", letsWork: "Trabajemos" },
  hero: {
    eyebrow: "Filmmaker · Fotógrafo",
    subtitle:
      "Convertimos historias en crecimiento. Creamos historias digitales que conectan, convierten y construyen comunidades leales.",
    cta: "Ver proyectos",
    scroll: "Desliza",
  },
  location: {
    based: "Con base en St. Gallen, Suiza",
    short: "St. Gallen · Suiza",
  },
  trust: { label: "Con la confianza de marcas y artistas de todo el mundo" },
  stats: {
    impact: "El Impacto",
    years: "Años de producción internacional",
    instagram: "Seguidores alcanzados en Instagram",
    youtube: "Suscriptores ganados en YouTube",
    monthly: "Vistas Mensuales",
  },
  featured: {
    eyebrow: "Trabajos seleccionados",
    title: "Proyectos destacados",
    viewAll: "Ver todos los proyectos",
  },
  cta: {
    eyebrow: "Disponible para nuevos proyectos",
    title: "Hagamos tu próximo film.",
    text: "Desde St. Gallen para toda Suiza, Europa y el mundo.",
    button: "Iniciar un Proyecto",
  },
  gallery: {
    title: "Portafolio",
    intro: "Films de marca, publicidad, videos de eventos y de viaje, producidos desde St. Gallen para clientes en Suiza y el mundo.",
    hint: "Haz clic para ver",
    empty: "Aún no hay contenido en este filtro.",
    media: { all: "Todos", video: "Video", photo: "Fotografía" },
    categories: {
      all: "Todos",
      travel: "Viajes",
      festivals: "Festivales",
      action: "Acción",
      commercial: "Publicidad",
      lifestyle: "Lifestyle",
    },
  },
  vision: {
    eyebrow: "La Visión",
    titleLine1: "Un niño con una cámara",
    titleLine2: "lleno de sueños.",
    p1: "De una cámara de juguete en mis manos de niño a un equipo de cine en cinco continentes. La obsesión nunca cambió, solo las herramientas.",
    p2: "Cada fotograma es una decisión. Cada corte es un argumento. Cada historia es una razón para seguir adelante.",
    p3: "Lo que empezó como curiosidad se convirtió en oficio. Y el oficio, en carrera.",
    thenNow: "Antes y ahora, siempre detrás del lente",
    editorial1:
      "Todo empezó con una cámara y la carretera por delante. Lo que comenzó como una obsesión personal por capturar el movimiento y la luz se convirtió en una carrera que abarca cinco continentes, marcas globales y millones de vistas.",
    editorial2:
      "Desde los picos nevados de los Alpes franceses hasta la energía eléctrica de los festivales de música underground, cada fotograma cuenta una historia diseñada para impactar.",
    quote:
      "“En un mundo lleno de IA y ruido, las empresas buscan artesanos, no máquinas. Contar historias es el motor del crecimiento.”",
    whatIDo: "Lo Que Hago",
    services: [
      {
        title: "Dirección y cinematografía",
        desc: "Dirección creativa de principio a fin. Desde campañas de marca hasta documentales de viaje, cada proyecto recibe un tratamiento cinematográfico pensado para el rendimiento digital.",
      },
      {
        title: "Edición y postproducción",
        desc: "Edición ágil y de alta retención. Corrección de color, diseño de sonido y motion graphics creados para las plataformas que importan: YouTube, Instagram, TikTok.",
      },
      {
        title: "Estrategia de marca y contenido",
        desc: "Más que producción: ayudo a las marcas a construir ecosistemas visuales. Estrategias de contenido que convierten espectadores en comunidades y comunidades en clientes.",
      },
    ],
  },
  contact: {
    eyebrow: "Ponte en Contacto",
    headingLine1: "Construyamos tu marca",
    headingLine2: "con narrativa visual.",
    intro:
      "Ya seas un hotel, una marca, un festival o un creador, te ayudo a convertir el contenido visual en crecimiento real. Hablemos.",
    direct: "O contáctame directamente",
    phone: "Teléfono",
    whatsapp: "WhatsApp",
    location: "Ubicación",
    name: "Nombre",
    email: "Correo",
    company: "Marca / Hotel / Agencia",
    budget: "Presupuesto Estimado",
    details: "Detalles del Proyecto",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "tu@correo.com",
    companyPlaceholder: "Nombre de la empresa o marca",
    detailsPlaceholder: "Cuéntame sobre tu proyecto, tiempos y visión...",
    budgetSelect: "Selecciona un rango",
    budgetOptions: ["Menos de CHF 1500", "CHF 1500-5000", "CHF 5000-10 000", "Más de CHF 10 000"],
    submit: "Enviar Consulta",
    sending: "Enviando...",
    error: "Algo salió mal. Inténtalo de nuevo o escríbeme directamente por correo.",
    successTitle: "Mensaje enviado.",
    successMsg: "Te contactaré pronto.",
  },
  services: {
    "eyebrow": "Servicios",
    "title": "Producción de video y fotografía en St. Gallen",
    "intro": "Del concepto al montaje final: films de marca, publicidad, videos de eventos y fotografía para empresas, hoteles y turismo, en toda Suiza y el mundo.",
    "items": [
      {
        "title": "Films de marca y corporativos",
        "desc": "Videos que muestran quién eres: empresas, universidades y organizaciones, con estética cinematográfica y un mensaje claro."
      },
      {
        "title": "Publicidad y anuncios para redes",
        "desc": "Spots cortos de alta retención para Instagram, TikTok, YouTube y campañas, en vertical y horizontal."
      },
      {
        "title": "Turismo y hotelería",
        "desc": "Films y fotos para destinos, estaciones de montaña, hoteles y restaurantes que dan ganas de estar allí."
      },
      {
        "title": "Eventos y festivales",
        "desc": "Aftermovies y cobertura de eventos llenos de energía, desde eventos corporativos hasta festivales internacionales."
      },
      {
        "title": "Fotografía",
        "desc": "Fotografía de marca, viajes, hotelería y eventos con la misma mirada cinematográfica, lista para web, impresión y redes."
      },
      {
        "title": "Tomas aéreas con dron",
        "desc": "Video y fotografía aérea de paisajes, propiedades y eventos en toda Suiza."
      }
    ],
    "processTitle": "Cómo trabajamos",
    "process": [
      {
        "title": "Briefing",
        "desc": "Hablamos de tus objetivos, tu público y tu presupuesto."
      },
      {
        "title": "Concepto",
        "desc": "Idea, guion y lista de planos, con un calendario y un presupuesto claros."
      },
      {
        "title": "Producción",
        "desc": "Rodaje y fotografía en locación, en cualquier lugar de Suiza o del extranjero."
      },
      {
        "title": "Postproducción",
        "desc": "Edición, corrección de color y diseño de sonido, entregados en todos los formatos que necesites."
      }
    ],
    "areasTitle": "Dónde trabajo",
    "areas": "Con base en St. Gallen. Rodajes frecuentes en Zúrich, Winterthur, Appenzell, Turgovia, el valle del Rin y Liechtenstein, y en cualquier parte del mundo.",
    "faqTitle": "Preguntas frecuentes",
    "faq": [
      {
        "q": "¿Cuánto cuesta una producción de video?",
        "a": "Depende del alcance: días de rodaje, equipo, locaciones y postproducción. Tras una breve llamada recibes un presupuesto claro."
      },
      {
        "q": "¿Trabajas fuera de St. Gallen?",
        "a": "Sí. Trabajo en toda Suiza (Zúrich, el este de Suiza y más allá) y viajo para proyectos internacionales."
      },
      {
        "q": "¿Ofreces video y fotografía a la vez?",
        "a": "Sí. Muchos clientes reservan film y fotografía juntos, para que la campaña se vea coherente en todos los canales."
      },
      {
        "q": "¿Cuánto tarda un proyecto?",
        "a": "Según el alcance, desde pocos días para contenido corto en redes hasta algunas semanas para un film de marca."
      },
      {
        "q": "¿Te encargas de toda la producción?",
        "a": "Sí: concepto, rodaje, dron, edición, color y sonido, con un único punto de contacto."
      }
    ],
    "ctaTitle": "Cuéntame sobre tu proyecto.",
    "ctaButton": "Pedir presupuesto",
    "homeTitle": "Film y fotografía para marcas que quieren destacar.",
    "homeLink": "Todos los servicios"
  },
  cursor: {"play": "Play", "view": "Ver"},
  a11y: { menu: "Menú", language: "Idioma", close: "Cerrar", enlarge: "Ampliar foto" },
  modal: { copyLink: "Copiar enlace", copied: "Enlace copiado" },
  footer: {
    tagline:
      "Films y fotografía cinematográfica para marcas, hoteles y festivales, desde St. Gallen para el mundo.",
    navigate: "Navegación",
    connect: "Conecta",
    rights: "Todos los derechos reservados.",
    crafted: "Hecho con visión",
  },
  watch: {
    back: "Volver a proyectos",
    exploreMore: "Explora más proyectos",
    kinds: {
      travel: "Film de viaje",
      festivals: "Aftermovie de festival",
      action: "Video de deportes de acción",
      commercial: "Film de marca",
      lifestyle: "Video lifestyle",
    },
    seoSuffix: "Producción de video de Luis Carrasco Films, director de fotografía con base en St. Gallen, Suiza.",
  },
  descriptions: {
    "Travel film, Central America": "Film de viaje, Centroamérica",
    "Commercial production": "Producción publicitaria",
    "Travel film, Mexico": "Film de viaje, México",
    "Action sports, French Alps": "Deportes de acción, Alpes franceses",
    "Luxury hotel campaign in Courchevel": "Campaña para un hotel de lujo en Courchevel",
    "Festival aftermovie": "Aftermovie de festival",
    "Vertical commercial": "Comercial en formato vertical",
    "Real estate production": "Producción inmobiliaria",
    "Corporate film for the Entrepreneurship Program": "Video corporativo del Programa de Emprendimiento",
    "Corporate film for the Prince Entrepreneurship Program": "Video corporativo del Prince Entrepreneurship Program",
    "Entrepreneurship reel": "Reel de emprendimiento",
    "Brand film": "Film de marca",
    "Brand film in the Swiss Alps": "Film de marca en los Alpes suizos",
    "Travel reel": "Reel de viaje",
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o fue movida.",
    back: "Volver al inicio",
  },
  seo: {
    ogLocale: "es_ES",
    siteDescription:
      "Filmmaker y fotógrafo en St. Gallen, Suiza: films de marca, publicidad, videos de turismo y eventos, dron y fotografía para clientes en Suiza y el mundo.",
    home: {
      title: "Filmmaker y fotógrafo en St. Gallen, Suiza | Luis Carrasco Films",
      description:
        "Filmmaker y fotógrafo en St. Gallen, Suiza: films de marca, publicidad, videos de turismo y eventos, dron y fotografía para clientes en Suiza y el mundo.",
    },
    work: {
      title: "Portafolio: films y fotografía",
      description:
        "Producciones seleccionadas de Luis Carrasco en St. Gallen: films para marcas y universidades, videos de turismo, aftermovies de festivales y fotografía.",
    },
    vision: {
      title: "Sobre mí: filmmaker y fotógrafo",
      description:
        "La historia detrás de Luis Carrasco Films: de un niño con una cámara a director de fotografía y realizador con base en St. Gallen, Suiza.",
    },
    services: {
      title: "Servicios: video y fotografía en St. Gallen",
      description:
        "Films de marca, publicidad, videos de eventos y turismo, tomas con dron y fotografía desde St. Gallen, para empresas en toda Suiza y el mundo.",
    },
    contact: {
      title: "Contacto: producción de video en Suiza",
      description:
        "¿Planeas un film de marca o un comercial en Suiza? Contacta a Luis Carrasco Films en St. Gallen por teléfono, WhatsApp o correo.",
    },
    keywords: [
      "fotógrafo St. Gallen",
      "fotógrafo Suiza",
      "filmmaker Suiza",
      "filmmaker St. Gallen",
      "videógrafo St. Gallen",
      "producción de video Suiza",
      "cineasta Suiza",
      "director de fotografía Suiza",
      "video corporativo Suiza",
      "film de marca",
      "aftermovie festival",
      "video de viajes",
      "Luis Carrasco",
    ],
  },
};

// Swiss Standard German: no "ß" (always "ss"), «Guillemets», formal "Sie".
const de: Dict = {
  nav: { work: "Projekte", services: "Leistungen", vision: "Vision", contact: "Kontakt", letsWork: "Anfragen" },
  hero: {
    eyebrow: "Filmemacher · Fotograf",
    subtitle:
      "Geschichten, die Wachstum schaffen. Imagefilme, Werbefilme und Eventvideos, vom Konzept bis zum fertigen Schnitt.",
    cta: "Projekte ansehen",
    scroll: "Scrollen",
  },
  location: {
    based: "Mit Sitz in St. Gallen, Schweiz",
    short: "St. Gallen · Schweiz",
  },
  trust: { label: "Internationale Marken & Kunstschaffende vertrauen uns" },
  stats: {
    impact: "Wirkung in Zahlen",
    years: "Jahre internationale Erfahrung",
    instagram: "Erreichte Instagram-Follower",
    youtube: "Gewonnene YouTube-Abonnenten",
    monthly: "Monatliche Aufrufe",
  },
  featured: {
    eyebrow: "Ausgewählte Arbeiten",
    title: "Projekt-Highlights",
    viewAll: "Alle Projekte ansehen",
  },
  cta: {
    eyebrow: "Offen für neue Projekte",
    title: "Realisieren wir Ihren nächsten Film.",
    text: "Mit Sitz in St. Gallen. Für Unternehmen in der Ostschweiz, in Zürich, in der ganzen Schweiz und weltweit.",
    button: "Projekt anfragen",
  },
  gallery: {
    title: "Portfolio",
    intro: "Imagefilme, Werbefilme, Event- und Tourismusvideos, produziert in St. Gallen für Kunden in der Schweiz und weltweit.",
    hint: "Zum Ansehen anklicken",
    empty: "Für diesen Filter gibt es noch keine Inhalte.",
    media: { all: "Alle", video: "Video", photo: "Fotografie" },
    categories: {
      all: "Alle",
      travel: "Reisen",
      festivals: "Festivals",
      action: "Action",
      commercial: "Werbung",
      lifestyle: "Lifestyle",
    },
  },
  vision: {
    eyebrow: "Die Vision",
    titleLine1: "Ein Kind mit einer Kamera",
    titleLine2: "voller Träume.",
    p1: "Von einer Spielzeugkamera in meinen Kinderhänden bis zur Kinokamera auf fünf Kontinenten. Die Leidenschaft ist geblieben, nur die Werkzeuge haben sich verändert.",
    p2: "Jedes Bild ist eine Entscheidung. Jeder Schnitt ist ein Argument. Jede Geschichte ist ein Grund, in Bewegung zu bleiben.",
    p3: "Was als Neugier begann, wurde zum Handwerk. Was zum Handwerk wurde, wurde zum Beruf.",
    thenNow: "Damals & heute, immer hinter der Kamera",
    editorial1:
      "Alles begann mit einer Kamera und viel Fernweh. Was als persönliche Leidenschaft für Bewegung und Licht anfing, wurde zu einer Karriere auf fünf Kontinenten, mit globalen Marken und Millionen von Aufrufen.",
    editorial2:
      "Von den verschneiten Gipfeln der Französischen Alpen bis zur elektrisierenden Energie von Underground-Musikfestivals: Jedes Bild erzählt eine Geschichte, die auf Wirkung ausgelegt ist.",
    quote:
      "«In einer Welt voller KI und Lärm suchen Unternehmen echtes Handwerk, keine Maschinen. Storytelling ist der Motor für Wachstum.»",
    whatIDo: "Leistungen",
    services: [
      {
        title: "Regie & Kamera",
        desc: "Konzept, Regie und Kamera aus einer Hand: vom Imagefilm für Ihr Unternehmen bis zum Werbefilm für Kampagnen und Social Media. Kinematografisch umgesetzt, optimiert für digitale Kanäle.",
      },
      {
        title: "Schnitt & Postproduktion",
        desc: "Dynamischer Schnitt mit hoher Zuschauerbindung. Color Grading, Sounddesign und Motion Graphics für die Plattformen, die zählen: YouTube, Instagram, TikTok.",
      },
      {
        title: "Markenstrategie & Content",
        desc: "Mehr als Produktion: Ich helfe Marken, visuelle Ökosysteme aufzubauen. Content-Strategien, die Zuschauer zu Communitys und Communitys zu Kunden machen.",
      },
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    headingLine1: "Gestalten wir Ihre Marke",
    headingLine2: "mit visuellem Storytelling.",
    intro:
      "Ob Unternehmen, Hotel, Festival oder Marke: Ich realisiere Ihren Imagefilm, Werbefilm oder Ihr Eventvideo, in St. Gallen und in der ganzen Schweiz. Sprechen wir darüber.",
    direct: "Oder direkt Kontakt aufnehmen",
    phone: "Telefon",
    whatsapp: "WhatsApp",
    location: "Standort",
    name: "Name",
    email: "E-Mail",
    company: "Marke / Hotel / Agentur",
    budget: "Geschätztes Budget",
    details: "Projektdetails",
    namePlaceholder: "Ihr Name",
    emailPlaceholder: "ihre@email.ch",
    companyPlaceholder: "Firmen- oder Markenname",
    detailsPlaceholder: "Erzählen Sie mir von Ihrem Projekt, Zeitplan und Ihrer Vision …",
    budgetSelect: "Bereich auswählen",
    budgetOptions: ["Unter CHF 1'500", "CHF 1'500-5'000", "CHF 5'000-10'000", "Über CHF 10'000"],
    submit: "Anfrage senden",
    sending: "Wird gesendet …",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt eine E-Mail.",
    successTitle: "Nachricht gesendet.",
    successMsg: "Ich melde mich in Kürze bei Ihnen.",
  },
  services: {
    "eyebrow": "Leistungen",
    "title": "Videoproduktion & Fotografie in St. Gallen",
    "intro": "Vom Konzept bis zum fertigen Schnitt: Imagefilme, Werbefilme, Eventvideos und Fotografie für Unternehmen, Hotels und Tourismus in der ganzen Schweiz und weltweit.",
    "items": [
      {
        "title": "Imagefilme & Unternehmensvideos",
        "desc": "Filme, die zeigen, wer Sie sind. Für Unternehmen, Hochschulen und Organisationen, kinematografisch umgesetzt und mit klarer Botschaft."
      },
      {
        "title": "Werbefilme & Social Ads",
        "desc": "Kurze Spots mit hoher Zuschauerbindung für Instagram, TikTok, YouTube und Kampagnen, im Hoch- und Querformat."
      },
      {
        "title": "Tourismus & Hotellerie",
        "desc": "Filme und Fotos für Destinationen, Bergbahnen, Hotels und Restaurants, die Lust aufs Erleben machen."
      },
      {
        "title": "Events & Festivals",
        "desc": "Aftermovies und Eventvideos voller Energie, vom Firmenanlass bis zum internationalen Musikfestival."
      },
      {
        "title": "Fotografie",
        "desc": "Business-, Tourismus-, Hotel- und Eventfotografie mit demselben filmischen Blick, bereit für Web, Print und Social Media."
      },
      {
        "title": "Drohnenaufnahmen",
        "desc": "Luftaufnahmen und Drohnenfotos von Landschaften, Immobilien und Events in der ganzen Schweiz."
      }
    ],
    "processTitle": "So arbeiten wir",
    "process": [
      {
        "title": "Briefing",
        "desc": "Wir besprechen Ihre Ziele, Ihre Zielgruppe und Ihr Budget."
      },
      {
        "title": "Konzept",
        "desc": "Idee, Drehbuch und Shotlist, mit klarem Zeitplan und Offerte."
      },
      {
        "title": "Produktion",
        "desc": "Dreh und Fotografie vor Ort, überall in der Schweiz und im Ausland."
      },
      {
        "title": "Postproduktion",
        "desc": "Schnitt, Color Grading und Sounddesign, geliefert in allen benötigten Formaten."
      }
    ],
    "areasTitle": "Einsatzgebiet",
    "areas": "Mit Sitz in St. Gallen. Regelmässig im Einsatz in Zürich, Winterthur, Appenzell, im Thurgau, im Rheintal und in Liechtenstein sowie weltweit vor Ort.",
    "faqTitle": "Häufige Fragen",
    "faq": [
      {
        "q": "Was kostet eine Videoproduktion?",
        "a": "Das hängt vom Umfang ab: Drehtage, Team, Locations und Postproduktion. Nach einem kurzen Gespräch erhalten Sie eine klare Offerte."
      },
      {
        "q": "Arbeiten Sie auch ausserhalb von St. Gallen?",
        "a": "Ja. Ich arbeite in der ganzen Schweiz, etwa in Zürich und der Ostschweiz, und reise für Projekte auch international."
      },
      {
        "q": "Bieten Sie Video und Fotografie aus einer Hand?",
        "a": "Ja. Viele Kunden buchen Film und Fotografie zusammen, so wirkt die Kampagne auf allen Kanälen einheitlich."
      },
      {
        "q": "Wie lange dauert ein Projekt?",
        "a": "Je nach Umfang wenige Tage für kurze Social-Media-Inhalte bis einige Wochen für einen Imagefilm."
      },
      {
        "q": "Übernehmen Sie die gesamte Produktion?",
        "a": "Ja: Konzept, Dreh, Drohne, Schnitt, Color Grading und Ton, mit einer einzigen Ansprechperson."
      }
    ],
    "ctaTitle": "Erzählen Sie mir von Ihrem Projekt.",
    "ctaButton": "Offerte anfragen",
    "homeTitle": "Film & Fotografie für Marken, die auffallen wollen.",
    "homeLink": "Alle Leistungen"
  },
  cursor: {"play": "Play", "view": "Ansehen"},
  a11y: { menu: "Menü", language: "Sprache", close: "Schliessen", enlarge: "Foto vergrössern" },
  modal: { copyLink: "Link kopieren", copied: "Link kopiert" },
  footer: {
    tagline:
      "Videoproduktion und Fotografie aus St. Gallen: Imagefilme, Werbefilme, Eventvideos und Drohnenaufnahmen für die ganze Schweiz und weltweit.",
    navigate: "Navigation",
    connect: "Kontakt",
    rights: "Alle Rechte vorbehalten.",
    crafted: "Mit Vision gestaltet",
  },
  watch: {
    back: "Zurück zu den Projekten",
    exploreMore: "Weitere Projekte entdecken",
    kinds: {
      travel: "Reisefilm",
      festivals: "Festival-Aftermovie",
      action: "Actionsport-Video",
      commercial: "Werbefilm",
      lifestyle: "Lifestyle-Video",
    },
    seoSuffix: "Videoproduktion von Luis Carrasco Films, Videograf mit Sitz in St. Gallen, Schweiz.",
  },
  descriptions: {
    "Travel film, Central America": "Reisefilm, Zentralamerika",
    "Commercial production": "Werbeproduktion",
    "Travel film, Mexico": "Reisefilm, Mexiko",
    "Action sports, French Alps": "Actionsport, Französische Alpen",
    "Luxury hotel campaign in Courchevel": "Kampagne für ein Luxushotel in Courchevel",
    "Festival aftermovie": "Festival-Aftermovie",
    "Vertical commercial": "Werbefilm im Hochformat",
    "Real estate production": "Immobilienfilm",
    "Corporate film for the Entrepreneurship Program": "Imagefilm für das Entrepreneurship-Programm",
    "Corporate film for the Prince Entrepreneurship Program": "Imagefilm für das Prince Entrepreneurship Program",
    "Entrepreneurship reel": "Entrepreneurship-Reel",
    "Brand film": "Markenfilm",
    "Brand film in the Swiss Alps": "Imagefilm in den Schweizer Alpen",
    "Travel reel": "Reise-Reel",
  },
  notFound: {
    title: "Seite nicht gefunden",
    text: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    back: "Zur Startseite",
  },
  seo: {
    ogLocale: "de_CH",
    siteDescription:
      "Videograf & Fotograf in St. Gallen: Imagefilme, Werbefilme, Eventvideos, Drohnenaufnahmen und Fotografie für Unternehmen in der ganzen Schweiz.",
    home: {
      title: "Videograf & Fotograf in St. Gallen | Luis Carrasco Films",
      description:
        "Videograf & Fotograf in St. Gallen: Imagefilme, Werbefilme, Eventvideos, Drohnenaufnahmen und Fotografie für Unternehmen in der ganzen Schweiz.",
    },
    work: {
      title: "Portfolio: Imagefilme & Fotografie",
      description:
        "Imagefilme, Werbefilme, Event- und Tourismusvideos von Luis Carrasco, Videograf in St. Gallen, u. a. für die Universität St. Gallen (HSG) und Pizol.",
    },
    vision: {
      title: "Über mich: Filmemacher & Fotograf",
      description:
        "Die Geschichte hinter Luis Carrasco Films: vom Kind mit einer Kamera zum Kameramann und Regisseur mit Sitz in St. Gallen, Schweiz.",
    },
    services: {
      title: "Leistungen: Video & Fotografie St. Gallen",
      description:
        "Imagefilme, Werbefilme, Event- und Tourismusvideos, Drohnenaufnahmen und Fotografie aus St. Gallen für Unternehmen in der ganzen Schweiz.",
    },
    contact: {
      title: "Kontakt & Offerte: Videoproduktion",
      description:
        "Sie planen einen Imagefilm, Werbefilm oder ein Eventvideo? Offerte anfragen bei Luis Carrasco Films in St. Gallen, per Telefon, WhatsApp oder E-Mail.",
    },
    keywords: [
      "Fotograf St. Gallen",
      "Fotograf Ostschweiz",
      "Fotograf Zürich",
      "Businessfotograf St. Gallen",
      "Eventfotograf St. Gallen",
      "Videograf St. Gallen",
      "Videoproduktion St. Gallen",
      "Videoproduktion Schweiz",
      "Videoproduktion Ostschweiz",
      "Filmemacher St. Gallen",
      "Kameramann Schweiz",
      "Imagefilm St. Gallen",
      "Imagefilm Schweiz",
      "Werbefilm Schweiz",
      "Unternehmensvideo",
      "Eventvideo",
      "Tourismusfilm",
      "Drohnenaufnahmen Schweiz",
      "Filmproduktion St. Gallen",
      "Aftermovie Schweiz",
      "Videograf Zürich",
      "Luis Carrasco",
    ],
  },
};

export const dictionaries: Record<Lang, Dict> = { en, es, de };

export function getDictionary(lang: Lang): Dict {
  return dictionaries[lang];
}
