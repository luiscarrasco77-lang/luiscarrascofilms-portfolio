"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

export const translations = {
  en: {
    nav: { work: "Work", vision: "Vision", contact: "Contact", letsWork: "Let's Work" },
    hero: {
      eyebrow: "Cinematographer · Director",
      subtitle:
        "Turning stories into growth. We build digital stories that connect, convert, and create loyal communities.",
      cta: "View the Work",
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
    gallery: {
      title: "Portfolio",
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
      p1: "From a toy camera in my childhood hands to a cinema rig across five continents — the obsession never changed. Only the tools did.",
      p2: "Every frame is a decision. Every cut is an argument. Every story is a reason to keep moving.",
      p3: "What started as curiosity became craft. What became craft became a career.",
      thenNow: "Then & now — always behind the lens",
      editorial1:
        "It started with a camera and the open road. What began as a personal obsession with capturing movement and light became a career spanning five continents, global brands, and millions of views.",
      editorial2:
        "From the snow-covered peaks of the French Alps to the electric energy of underground music festivals — every frame tells a story engineered for impact.",
      quote:
        "“In a world full of AI and noise, companies look for craftsmen — not machines. Storytelling is the engine behind growth.”",
      whatIDo: "What I Do",
      services: [
        {
          title: "Direction & Cinematography",
          desc: "Concept-to-delivery creative direction. From brand campaigns to travel documentaries, every project gets a cinematic treatment built for digital performance.",
        },
        {
          title: "Editing & Post-Production",
          desc: "Fast-paced, high-retention editing. Color grading, sound design, and motion graphics crafted for the platforms that matter — YouTube, Instagram, TikTok.",
        },
        {
          title: "Brand Strategy & Content",
          desc: "More than production — I help brands build visual ecosystems. Content strategies that turn viewers into communities and communities into customers.",
        },
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      headingLine1: "Let's create your brand",
      headingLine2: "through visual storytelling.",
      intro:
        "Whether you're a hotel, a brand, a festival, or a creator — I help you turn visual content into real growth. Let's talk.",
      name: "Name",
      email: "Email",
      company: "Brand / Hotel / Agency",
      budget: "Estimated Budget",
      details: "Project Details",
      namePlaceholder: "Your name",
      companyPlaceholder: "Company or brand name",
      detailsPlaceholder: "Tell me about your project, timeline, and vision...",
      budgetSelect: "Select a range",
      submit: "Send Inquiry",
      sending: "Sending...",
      error: "Something went wrong. Please try again or email directly.",
      successTitle: "Message sent.",
      successMsg: "I'll be in touch shortly.",
    },
    footer: {
      tagline:
        "Turning stories into growth. Cinematic audiovisual production for brands, festivals, and lifestyle content worldwide.",
      navigate: "Navigate",
      connect: "Connect",
      rights: "All rights reserved.",
      crafted: "Crafted with vision",
    },
    watch: { back: "Back to Work", exploreMore: "Explore more work" },
  },
  es: {
    nav: { work: "Trabajo", vision: "Visión", contact: "Contacto", letsWork: "Trabajemos" },
    hero: {
      eyebrow: "Director de Fotografía · Director",
      subtitle:
        "Convertimos historias en crecimiento. Creamos historias digitales que conectan, convierten y construyen comunidades leales.",
      cta: "Ver el Trabajo",
    },
    trust: { label: "La confianza de marcas y artistas globales" },
    stats: {
      impact: "El Impacto",
      years: "Años de Producción Global",
      instagram: "Seguidores de Instagram Alcanzados",
      youtube: "Suscriptores de YouTube Construidos",
      monthly: "Vistas Mensuales",
    },
    featured: {
      eyebrow: "Trabajo Seleccionado",
      title: "Proyectos Destacados",
      viewAll: "Ver Todo el Trabajo",
    },
    gallery: {
      title: "Portafolio",
      hint: "Haz clic en cualquier elemento para verlo",
      empty: "Nada aquí todavía en este filtro.",
      media: { all: "Todos", video: "Video", photo: "Fotografía" },
      categories: {
        all: "Todos",
        travel: "Viajes",
        festivals: "Festivales",
        action: "Acción",
        commercial: "Comercial",
        lifestyle: "Lifestyle",
      },
    },
    vision: {
      eyebrow: "La Visión",
      titleLine1: "Un niño con una cámara",
      titleLine2: "lleno de sueños.",
      p1: "De una cámara de juguete en mis manos de niño a un equipo de cine en cinco continentes — la obsesión nunca cambió. Solo las herramientas.",
      p2: "Cada fotograma es una decisión. Cada corte es un argumento. Cada historia es una razón para seguir adelante.",
      p3: "Lo que empezó como curiosidad se volvió oficio. Lo que se volvió oficio se volvió carrera.",
      thenNow: "Antes y ahora — siempre detrás del lente",
      editorial1:
        "Empezó con una cámara y el camino abierto. Lo que comenzó como una obsesión personal por capturar el movimiento y la luz se convirtió en una carrera por cinco continentes, marcas globales y millones de vistas.",
      editorial2:
        "Desde los picos nevados de los Alpes franceses hasta la energía eléctrica de los festivales de música underground — cada fotograma cuenta una historia diseñada para impactar.",
      quote:
        "“En un mundo lleno de IA y ruido, las empresas buscan artesanos — no máquinas. Contar historias es el motor del crecimiento.”",
      whatIDo: "Lo Que Hago",
      services: [
        {
          title: "Dirección y Cinematografía",
          desc: "Dirección creativa de principio a fin. Desde campañas de marca hasta documentales de viaje, cada proyecto recibe un tratamiento cinematográfico pensado para el rendimiento digital.",
        },
        {
          title: "Edición y Postproducción",
          desc: "Edición ágil y de alta retención. Corrección de color, diseño de sonido y motion graphics creados para las plataformas que importan — YouTube, Instagram, TikTok.",
        },
        {
          title: "Estrategia de Marca y Contenido",
          desc: "Más que producción — ayudo a las marcas a construir ecosistemas visuales. Estrategias de contenido que convierten espectadores en comunidades y comunidades en clientes.",
        },
      ],
    },
    contact: {
      eyebrow: "Ponte en Contacto",
      headingLine1: "Creemos tu marca",
      headingLine2: "a través de la narrativa visual.",
      intro:
        "Ya seas un hotel, una marca, un festival o un creador — te ayudo a convertir el contenido visual en crecimiento real. Hablemos.",
      name: "Nombre",
      email: "Correo",
      company: "Marca / Hotel / Agencia",
      budget: "Presupuesto Estimado",
      details: "Detalles del Proyecto",
      namePlaceholder: "Tu nombre",
      companyPlaceholder: "Nombre de la empresa o marca",
      detailsPlaceholder: "Cuéntame sobre tu proyecto, tiempos y visión...",
      budgetSelect: "Selecciona un rango",
      submit: "Enviar Consulta",
      sending: "Enviando...",
      error: "Algo salió mal. Intenta de nuevo o escribe directamente.",
      successTitle: "Mensaje enviado.",
      successMsg: "Te contactaré pronto.",
    },
    footer: {
      tagline:
        "Convertimos historias en crecimiento. Producción audiovisual cinematográfica para marcas, festivales y contenido lifestyle en todo el mundo.",
      navigate: "Navegar",
      connect: "Conecta",
      rights: "Todos los derechos reservados.",
      crafted: "Hecho con visión",
    },
    watch: { back: "Volver al Trabajo", exploreMore: "Explora más trabajo" },
  },
};

type Dict = (typeof translations)["en"];

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
}

const LanguageContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the saved choice (or the browser's language) after hydration.
  // This runs post-mount on purpose: SSR + first client render use "en" so the
  // markup matches (no hydration mismatch), then we switch to the stored lang.
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    const initial: Lang =
      saved === "en" || saved === "es"
        ? saved
        : navigator.language?.toLowerCase().startsWith("es")
          ? "es"
          : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate language from an external store (localStorage) on mount
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "en" ? "es" : "en"),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
