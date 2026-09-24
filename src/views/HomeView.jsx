import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  Sparkles,
  Briefcase,
  GraduationCap,
  BookOpen,
  Megaphone,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import OpportunityCard from "../components/OpportunityCard";
import ThematicCarousel from "../components/ThematicCarousel";
import ArticleModal from "../components/ArticleModal";

export default function HomeView() {
  const {
    opportunities,
    articles,
    applyQuickIntent,
    setSearchFilters,
    navigateTo
  } = useApp();

  const [heroSearchInput, setHeroSearchInput] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFilters(prev => ({
      ...prev,
      query: heroSearchInput
    }));
    navigateTo("/explorar");
  };

  // 1. Featured Opportunities (Grid of 3-4 high-impact cards)
  const featuredOpportunities = opportunities.filter((o) => o.featured).slice(0, 4);
  const featuredList = featuredOpportunities.length >= 3 
    ? featuredOpportunities 
    : opportunities.slice(0, 4);

  // 2. Themed Carousel buckets
  const becasOpen = opportunities.filter((o) => o.category === "beca");
  const cursosPopulares = opportunities.filter((o) => o.category === "curso" || o.category === "certificacion");
  const empleosRecientes = opportunities.filter((o) => o.category === "empleo");

  return (
    <div className="animate-fade-in pb-12 sm:pb-16">
      
      {/* 1. ONBOARDING HERO SECTION (Mobile-First Responsive) */}
      <section className="relative px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20 overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(99,102,241,0.25)_0%,transparent_70%)]">
        <div className="container mx-auto text-center max-w-4xl">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs sm:text-sm text-indigo-300 font-semibold mb-5 sm:mb-6 flex-wrap justify-center">
            <Sparkles size={14} className="text-indigo-400 flex-shrink-0" />
            <span>Plataforma Oficial de Impulso Juvenil</span>
            <span className="text-white/30 hidden xs:inline">|</span>
            <span className="text-cyan-400 inline-flex items-center gap-1">
              <ShieldCheck size={13} /> Cero Desinformación
            </span>
          </div>

          {/* Hero Title (Responsive typography: text-3xl to text-5xl/6xl) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-4 sm:mb-5">
            El puente entre tu talento y tus <span className="text-gradient">oportunidades reales</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Centralizamos pasantías, becas de estudio, certificaciones tech y convocatorias verificadas. Diseñado para simplificar tu búsqueda y reducir tu carga cognitiva.
          </p>

          {/* Large Hero Search Bar (100% width on mobile) */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="w-full max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            <div className="glass-panel p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-indigo-500/40 shadow-xl shadow-indigo-500/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-slate-900/90">
              <div className="flex items-center flex-1 px-3 sm:px-4 py-1">
                <Search size={20} className="text-indigo-400 mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  placeholder="¿Qué deseas lograr? (Ej. Beca, React, Pasantía...)"
                  className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary min-h-[44px] w-full sm:w-auto rounded-xl sm:rounded-full py-2.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Buscar</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* Intent Quick-Access Chips (Touch targets >= 44px) */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Navegación guiada por intención:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => applyQuickIntent("empleo")}
                className="min-h-[44px] py-2.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 active:scale-95 transition-all text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <Briefcase size={16} /> Busco Empleo
              </button>

              <button
                onClick={() => applyQuickIntent("aprender")}
                className="min-h-[44px] py-2.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 active:scale-95 transition-all text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <BookOpen size={16} /> Quiero Aprender
              </button>

              <button
                onClick={() => applyQuickIntent("financiamiento")}
                className="min-h-[44px] py-2.5 px-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 active:scale-95 transition-all text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <GraduationCap size={16} /> Necesito Financiamiento
              </button>

              <button
                onClick={() => applyQuickIntent("convocatoria")}
                className="min-h-[44px] py-2.5 px-4 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 active:scale-95 transition-all text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <Megaphone size={16} /> Ver Convocatorias
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPORTUNIDADES DESTACADAS (Responsive Grid: 1 col móvil, 2 tablet, 3-4 escritorio) */}
      <section className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap size={14} /> Alto Impacto Juvenil
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Oportunidades Destacadas
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Convocatorias seleccionadas por nuestro comité editorial por su prestigio y beneficios excepcionales.
              </p>
            </div>

            <button
              onClick={() => navigateTo("/explorar")}
              className="btn btn-ghost min-h-[44px] py-2.5 px-3 self-start sm:self-auto text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1.5"
            >
              <span>Explorar todas ({opportunities.length})</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Grid: 1 col on mobile (grid-cols-1), 2 on tablet (md:grid-cols-2), 3 on desktop (lg:grid-cols-3), 4 on xl (xl:grid-cols-4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredList.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} isFeatured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CARRUSELES TEMÁTICOS (Horizontal Native Swipe) */}
      <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        <div className="container mx-auto">
          
          {/* Carousel 1: Becas Abiertas */}
          <ThematicCarousel
            title="Becas y Financiamiento Educativo"
            subtitle="Estudios universitarios y posgrados 100% financiados sin deuda estudiantil"
            icon={<GraduationCap size={20} />}
            opportunities={becasOpen}
            onSeeAll={() => applyQuickIntent("financiamiento")}
          />

          {/* Carousel 2: Cursos y Certificaciones Populares */}
          <ThematicCarousel
            title="Cursos & Certificaciones Tech en Tendencia"
            subtitle="Adquiere competencias digitales de alta demanda con insignias oficiales"
            icon={<BookOpen size={20} />}
            opportunities={cursosPopulares}
            onSeeAll={() => applyQuickIntent("aprender")}
          />

          {/* Carousel 3: Primer Empleo y Pasantías Recientes */}
          <ThematicCarousel
            title="Primer Empleo & Pasantías Remuneradas"
            subtitle="Inicia tu trayectoria profesional en empresas con esquemas flexibles y mentoría"
            icon={<Briefcase size={20} />}
            opportunities={empleosRecientes}
            onSeeAll={() => applyQuickIntent("empleo")}
          />
        </div>
      </section>

      {/* 4. FEED DE RECURSOS Y TIPS (ARTICLES FEED) */}
      <section className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 border-t border-white/10">
        <div className="container mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                Guías de Orientación
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Recursos, Consejos y Verificación
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Artículos cortos creados por mentores para ayudarte a triunfar en tus postulaciones.
              </p>
            </div>

            <button
              onClick={() => navigateTo("/recursos")}
              className="btn btn-secondary min-h-[44px] py-2.5 px-4 self-start sm:self-auto text-xs sm:text-sm font-semibold rounded-xl"
            >
              Ver todos los artículos
            </button>
          </div>

          {/* Articles Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="glass-panel rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/40 bg-slate-900/80 border border-white/10"
              >
                {article.image && (
                  <div className="h-40 sm:h-44 overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="badge badge-curso text-xs">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-100 mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between min-h-[44px]">
                    <span className="text-xs text-slate-400">
                      {article.date}
                    </span>
                    <span className="text-xs sm:text-sm text-indigo-400 font-semibold inline-flex items-center gap-1 hover:text-indigo-300 py-2">
                      Leer artículo →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
