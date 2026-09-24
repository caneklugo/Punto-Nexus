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

  // 1. Featured Opportunities (Grid of 3 high-impact cards for balanced 3-col desktop layout)
  const featuredOpportunities = opportunities.filter((o) => o.featured).slice(0, 3);
  const featuredList = featuredOpportunities.length >= 3 
    ? featuredOpportunities 
    : opportunities.slice(0, 3);

  // 2. Themed Carousel buckets
  const becasOpen = opportunities.filter((o) => o.category === "beca");
  const cursosPopulares = opportunities.filter((o) => o.category === "curso" || o.category === "certificacion");
  const empleosRecientes = opportunities.filter((o) => o.category === "empleo");

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      
      {/* 1. ONBOARDING HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "4rem 0 3.5rem",
          overflow: "hidden",
          borderBottom: "1px solid var(--border-subtle)",
          background: "radial-gradient(ellipse at 50% -20%, rgba(99, 102, 241, 0.22) 0%, transparent 70%)"
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "860px" }}>
          
          {/* Eyebrow badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              fontSize: "0.825rem",
              color: "#a5b4fc",
              fontWeight: 600,
              marginBottom: "1.5rem"
            }}
          >
            <Sparkles size={14} color="#818cf8" />
            <span>Plataforma Oficial de Impulso Juvenil</span>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <span style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <ShieldCheck size={13} /> Cero Desinformación
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <button
              onClick={() => navigateTo("/guia")}
              style={{
                background: "rgba(99, 102, 241, 0.3)",
                border: "1px solid rgba(99, 102, 241, 0.5)",
                color: "#ffffff",
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <BookOpen size={12} /> Guía & Tour
            </button>
          </div>

          {/* Hero Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1.25rem"
            }}
          >
            El puente entre tu talento y tus <span className="text-gradient">oportunidades reales</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: "0 auto 2.25rem"
            }}
          >
            Centralizamos pasantías, becas de estudio, certificaciones tech y convocatorias verificadas. Diseñado para simplificar tu búsqueda y reducir tu carga cognitiva.
          </p>

          {/* Large Hero Search Bar (100% width on mobile, max 680px on desktop) */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="hero-search-form"
            style={{
              maxWidth: "680px",
              margin: "0 auto 2rem",
              position: "relative",
              width: "100%"
            }}
          >
            <div
              className="glass-panel hero-search-container"
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-focus)",
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.2)",
                background: "rgba(21, 27, 46, 0.9)",
                transition: "all var(--transition-normal)",
                position: "relative"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                  paddingLeft: "1.1rem"
                }}
              >
                <Search size={20} color="var(--primary-light)" style={{ marginRight: "0.6rem", flexShrink: 0 }} />
                <input
                  type="text"
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  placeholder="¿Qué deseas lograr? (Beca, React...)"
                  className="hero-search-input"
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-main)",
                    minHeight: "44px"
                  }}
                />
              </div>

              {/* Action Button: Text + Arrow on desktop, compact and elegant on mobile */}
              <button
                type="submit"
                className="btn btn-primary hero-search-btn"
                aria-label="Buscar convocatorias"
              >
                <span className="hero-search-btn-text">Buscar</span>
                <ArrowRight size={17} className="hero-search-btn-icon" />
              </button>
            </div>
          </form>

          {/* Hero Search Responsive Styles */}
          <style>{`
            .hero-search-container {
              padding: 0.35rem 0.45rem 0.35rem 1.1rem;
            }
            .hero-search-input {
              font-size: 0.95rem;
            }
            .hero-search-btn {
              border-radius: var(--radius-full) !important;
              min-height: 44px !important;
              padding: 0.6rem 1.4rem !important;
              font-size: 0.925rem !important;
              display: inline-flex;
              align-items: center;
              gap: 0.4rem;
              flex-shrink: 0;
            }
            .hero-search-btn-icon {
              display: none;
            }
            @media (max-width: 639px) {
              .hero-search-container {
                padding: 0.25rem 0.35rem 0.25rem 0.85rem;
              }
              .hero-search-input {
                font-size: 0.875rem;
              }
              .hero-search-btn {
                padding: 0.55rem 0.95rem !important;
                font-size: 0.85rem !important;
                gap: 0.3rem;
                min-width: 44px !important;
              }
              .hero-search-btn-icon {
                display: inline-block;
              }
            }
            @media (max-width: 380px) {
              .hero-search-btn-text {
                display: none;
              }
              .hero-search-btn {
                width: 44px !important;
                height: 44px !important;
                padding: 0 !important;
                justify-content: center;
              }
              .hero-search-btn-icon {
                display: block;
              }
            }
          `}</style>

          {/* Intent Quick-Access Chips */}
          <div>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 700,
                marginBottom: "0.85rem"
              }}
            >
              Navegación guiada por intención:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.65rem" }}>
              <button
                onClick={() => applyQuickIntent("empleo")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(59, 130, 246, 0.12)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  color: "#93c5fd",
                  minHeight: "44px",
                  padding: "0.55rem 1.15rem"
                }}
              >
                <Briefcase size={16} /> Busco Empleo
              </button>

              <button
                onClick={() => applyQuickIntent("aprender")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(16, 185, 129, 0.12)",
                  borderColor: "rgba(16, 185, 129, 0.3)",
                  color: "#6ee7b7",
                  minHeight: "44px",
                  padding: "0.55rem 1.15rem"
                }}
              >
                <BookOpen size={16} /> Quiero Aprender
              </button>

              <button
                onClick={() => applyQuickIntent("financiamiento")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(168, 85, 247, 0.12)",
                  borderColor: "rgba(168, 85, 247, 0.3)",
                  color: "#d8b4fe",
                  minHeight: "44px",
                  padding: "0.55rem 1.15rem"
                }}
              >
                <GraduationCap size={16} /> Necesito Financiamiento
              </button>

              <button
                onClick={() => applyQuickIntent("convocatoria")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(236, 72, 153, 0.12)",
                  borderColor: "rgba(236, 72, 153, 0.3)",
                  color: "#f472b6",
                  minHeight: "44px",
                  padding: "0.55rem 1.15rem"
                }}
              >
                <Megaphone size={16} /> Ver Convocatorias
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPORTUNIDADES DESTACADAS (Spacious 1-col mobile, 2-col tablet, 3-col desktop layout) */}
      <section style={{ padding: "4rem 0 2.5rem" }}>
        <div className="container">
          
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#fb7185",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.35rem"
                }}
              >
                <Zap size={14} /> Alto Impacto Juvenil
              </div>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800 }}>
                Oportunidades Destacadas
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Convocatorias seleccionadas por nuestro comité editorial por su prestigio y beneficios excepcionales.
              </p>
            </div>

            <button
              onClick={() => navigateTo("/explorar")}
              className="btn btn-ghost"
              style={{ color: "var(--primary-light)", minHeight: "44px", padding: "0.5rem 0.75rem" }}
            >
              Explorar todas ({opportunities.length}) <ArrowRight size={16} />
            </button>
          </div>

          {/* Grid of 3 spacious cards: 1 col on mobile, 2 on tablet, 3 on desktop with generous gap */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.75rem"
            }}
          >
            {featuredList.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} isFeatured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CARRUSELES TEMÁTICOS */}
      <section style={{ padding: "2.5rem 0 1rem" }}>
        <div className="container">
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

      {/* 4. FEED DE RECURSOS Y TIPS */}
      <section style={{ padding: "3.5rem 0 2rem", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--accent-cyan)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  display: "block",
                  marginBottom: "0.25rem"
                }}
              >
                Guías de Orientación
              </span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800 }}>
                Recursos, Consejos y Verificación
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Artículos cortos creados por mentores para ayudarte a triunfar en tus postulaciones.
              </p>
            </div>

            <button
              onClick={() => navigateTo("/recursos")}
              className="btn btn-secondary"
              style={{ minHeight: "44px" }}
            >
              Ver todos los artículos
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.75rem"
            }}
          >
            {articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="glass-panel"
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all var(--transition-normal)",
                  background: "rgba(21, 27, 46, 0.82)",
                  border: "1px solid var(--border-subtle)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--border-focus)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                {article.image && (
                  <div style={{ height: "165px", overflow: "hidden" }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}

                <div style={{ padding: "1.35rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                      <span className="badge badge-curso" style={{ fontSize: "0.7rem" }}>
                        {article.category}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                        {article.readTime}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.6rem", color: "var(--text-main)" }}>
                      {article.title}
                    </h3>

                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {article.summary}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "44px" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                      {article.date}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--primary-light)", fontWeight: 600 }}>
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
