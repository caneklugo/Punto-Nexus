import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  BookOpen,
  Clock,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import ArticleModal from "../components/ArticleModal";

export default function ResourcesView() {
  const { articles } = useApp();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const categories = [
    "todas",
    "Empleabilidad & CV",
    "Becas & Financiación",
    "Seguridad & Verificación",
    "Cursos & Certificaciones"
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === "todas" || art.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="animate-fade-in" style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "720px", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-cyan)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            <BookOpen size={15} /> Centro de Aprendizaje y Orientación
          </div>
          <h1 style={{ fontSize: "2.3rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Recursos, Consejos y <span className="text-gradient">Verificación</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Estrategias comprobadas para conseguir tu primer empleo, preparar postulaciones a becas y protegerte de fraudes laborales en línea.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem"
          }}
        >
          {/* Categories pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.825rem",
                  background: selectedCategory === cat ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                  color: selectedCategory === cat ? "#ffffff" : "var(--text-muted)",
                  border: selectedCategory === cat ? "1px solid var(--primary-light)" : "1px solid var(--border-subtle)",
                  fontWeight: selectedCategory === cat ? 600 : 400
                }}
              >
                {cat === "todas" ? "Todos los temas" : cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div
            className="glass-panel"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.85rem",
              borderRadius: "var(--radius-md)",
              minWidth: "260px"
            }}
          >
            <Search size={16} color="var(--text-dim)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en artículos..."
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-main)",
                fontSize: "0.85rem",
                width: "100%"
              }}
            />
          </div>
        </div>

        {/* Anti-misinformation Highlight Banner */}
        <div
          className="glass-panel"
          style={{
            padding: "1.25rem 1.75rem",
            marginBottom: "2.5rem",
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(6, 182, 212, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#e0f2fe", marginBottom: "0.2rem" }}>
                Manifiesto de Verificación Punto Nexus
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Revisamos manualmente la autenticidad de cada convocatoria para erradicar las estafas y ofertas falsas dirigidas a jóvenes.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const antiFraud = articles.find(a => a.id === "art-detectar-estafas-laborales");
              if (antiFraud) setSelectedArticle(antiFraud);
            }}
            className="btn btn-secondary"
            style={{ fontSize: "0.85rem", padding: "0.45rem 0.9rem", color: "#38bdf8", borderColor: "rgba(6, 182, 212, 0.4)" }}
          >
            Leer Guía Anti-fraude →
          </button>
        </div>

        {/* Articles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}
        >
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="glass-panel"
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all var(--transition-normal)",
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
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span className="badge badge-curso" style={{ fontSize: "0.7rem" }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.75rem", color: "var(--text-main)" }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {article.summary}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem" }}>
                  <span style={{ color: "var(--text-dim)" }}>
                    {article.author}
                  </span>
                  <span style={{ color: "var(--primary-light)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    Leer completo <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

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
