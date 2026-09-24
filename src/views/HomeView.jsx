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
  // If fewer than 3 featured, fill from top
  const featuredList = featuredOpportunities.length >= 3 
    ? featuredOpportunities 
    : opportunities.slice(0, 4);

  // 2. Themed Carousel buckets
  const becasOpen = opportunities.filter((o) => o.category === "beca");
  const cursosPopulares = opportunities.filter((o) => o.category === "curso" || o.category === "certificacion");
  const empleosRecientes = opportunities.filter((o) => o.category === "empleo");

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
      
      {/* 1. ONBOARDING WIZARD (HERO SECTION) */}
      <section
        style={{
          position: "relative",
          padding: "4.5rem 0 3.5rem",
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
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              fontSize: "0.8rem",
              color: "#a5b4fc",
              fontWeight: 600,
              marginBottom: "1.5rem"
            }}
          >
            <Sparkles size={14} color="#818cf8" />
            <span>Plataforma Oficial de Impulso Juvenil</span>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <span style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <ShieldCheck size={12} /> Cero Desinformación
            </span>
          </div>

          {/* Hero Title */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
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
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: "0 auto 2.25rem"
            }}
          >
            Centralizamos pasantías, becas de estudio, certificaciones tech y convocatorias verificadas. Diseñado para simplificar tu búsqueda y reducir tu carga cognitiva.
          </p>

          {/* Large Hero Search Bar */}
          <form
            onSubmit={handleHeroSearchSubmit}
            style={{
              maxWidth: "680px",
              margin: "0 auto 2rem",
              position: "relative"
            }}
          >
            <div
              className="glass-panel"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.6rem 0.8rem 0.6rem 1.4rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-focus)",
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.2)"
              }}
            >
              <Search size={22} color="var(--primary-light)" style={{ marginRight: "0.75rem", flexShrink: 0 }} />
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="¿Qué deseas lograr hoy? (Ej. Beca Alemania, React, Pasantía...)"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "var(--text-main)",
                  fontSize: "1.05rem"
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-full)", padding: "0.65rem 1.5rem" }}
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Intent Quick-Access Chips (As specified in 2.2) */}
          <div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "0.75rem" }}>
              Navegación guiada por intención:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem" }}>
              
              <button
                onClick={() => applyQuickIntent("empleo")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(59, 130, 246, 0.12)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  color: "#93c5fd"
                }}
              >
                <Briefcase size={15} /> Busco Empleo
              </button>

              <button
                onClick={() => applyQuickIntent("aprender")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(16, 185, 129, 0.12)",
                  borderColor: "rgba(16, 185, 129, 0.3)",
                  color: "#6ee7b7"
                }}
              >
                <BookOpen size={15} /> Quiero Aprender
              </button>

              <button
                onClick={() => applyQuickIntent("financiamiento")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(168, 85, 247, 0.12)",
                  borderColor: "rgba(168, 85, 247, 0.3)",
                  color: "#d8b4fe"
                }}
              >
                <GraduationCap size={15} /> Necesito Financiamiento
              </button>

              <button
                onClick={() => applyQuickIntent("convocatoria")}
                className="btn btn-secondary"
                style={{
                  borderRadius: "var(--radius-full)",
                  background: "rgba(236, 72, 153, 0.12)",
                  borderColor: "rgba(236, 72, 153, 0.3)",
                  color: "#f472b6"
                }}
              >
                <Megaphone size={15} /> Ver Convocatorias
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPORTUNIDADES DESTACADAS (FEATURED GRID) */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div className="container">
          
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#fb7185", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
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
              style={{ color: "var(--primary-light)" }}
            >
              Explorar todas ({opportunities.length}) <ArrowRight size={16} />
            </button>
          </div>

          {/* Grid of 3 to 4 Large Featured Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {featuredList.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} isFeatured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CARRUSELES TEMÁTICOS (HORIZONTAL SCROLLING CATEGORIES) */}
      <section style={{ padding: "3rem 0 1rem" }}>
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

      {/* 4. FEED DE RECURSOS Y TIPS (ARTICLES FEED) */}
      <section style={{ padding: "3.5rem 0 2rem", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" }}>
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
            >
              Ver todos los artículos
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem"
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
                  transition: "all var(--transition-normal)"
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
                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}

                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
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

                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
