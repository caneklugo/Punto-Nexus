import React from "react";
import { Bookmark, CheckCircle2, ShieldCheck, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import UrgencyBadge from "./UrgencyBadge";

export default function OpportunityCard({ opportunity, isFeatured = false }) {
  const { isFavorite, toggleFavorite, navigateTo } = useApp();

  const isFav = isFavorite(opportunity.id);

  const handleCardClick = (e) => {
    // If the click came from the bookmark button, do not navigate
    if (e.target.closest(".bookmark-action-btn")) {
      return;
    }
    navigateTo("/oportunidad/:id", { id: opportunity.id });
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleFavorite(opportunity.id);
  };

  // Limit requirements to maximum 3 bullets as per spec
  const previewRequirements = (opportunity.requirements || []).slice(0, 3);

  // Category badge styling helper
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "empleo": return "badge-empleo";
      case "beca": return "badge-beca";
      case "curso": return "badge-curso";
      case "certificacion": return "badge-certificacion";
      case "convocatoria": return "badge-convocatoria";
      default: return "badge-empleo";
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "empleo": return "Empleo / Pasantía";
      case "beca": return "Beca";
      case "curso": return "Curso";
      case "certificacion": return "Certificación";
      case "convocatoria": return "Convocatoria";
      default: return category;
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`opportunity-card glass-panel ${isFeatured ? "opportunity-card-featured" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.35rem",
        borderRadius: "var(--radius-lg)",
        cursor: "pointer",
        position: "relative",
        transition: "all var(--transition-normal)",
        background: isFeatured 
          ? "linear-gradient(145deg, rgba(26, 34, 58, 0.95) 0%, rgba(18, 23, 40, 0.95) 100%)" 
          : "rgba(21, 27, 46, 0.82)",
        border: isFeatured 
          ? "1px solid rgba(99, 102, 241, 0.35)" 
          : "1px solid var(--border-subtle)",
        boxShadow: isFeatured 
          ? "0 10px 25px -5px rgba(99, 102, 241, 0.15), var(--shadow-sm)" 
          : "var(--shadow-sm)",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* Top ambient glow line for featured cards */}
      {isFeatured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #6366f1, #06b6d4, #8b5cf6)"
          }}
        />
      )}

      {/* Card Header: Issuer Info, Urgency Badge, Bookmark */}
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
          {/* Issuer logo & info */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                minWidth: "44px",
                minHeight: "44px",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                background: opportunity.issuer.avatarBg || "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              {opportunity.issuer.logo ? (
                <img
                  src={opportunity.issuer.logo}
                  alt={opportunity.issuer.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#ffffff" }}>
                  {opportunity.issuer.name.charAt(0)}
                </span>
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {opportunity.issuer.name}
                </span>
                {opportunity.issuer.verified && (
                  <span title="Institución verificada por Punto Nexus" style={{ flexShrink: 0 }}>
                    <ShieldCheck size={14} color="#38bdf8" />
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {opportunity.issuer.type || "Emisor Verificado"}
              </span>
            </div>
          </div>

          {/* Bookmark Button (44x44px minimum touch target) */}
          <button
            type="button"
            className={`bookmark-action-btn btn-bookmark ${isFav ? "active" : ""}`}
            onClick={handleBookmarkClick}
            title={isFav ? "Guardado en Favoritos" : "Guardar en Favoritos"}
            aria-label="Guardar oportunidad"
            style={{ flexShrink: 0 }}
          >
            <Bookmark size={18} fill={isFav ? "#fbbf24" : "none"} />
          </button>
        </div>

        {/* Urgency and Category Row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
          <span className={`badge ${getCategoryBadgeClass(opportunity.category)}`}>
            {getCategoryLabel(opportunity.category)}
          </span>
          <UrgencyBadge closingDate={opportunity.closingDate} />
          {isFeatured && (
            <span className="badge" style={{ background: "rgba(244, 63, 94, 0.15)", color: "#fb7185", border: "1px solid rgba(244, 63, 94, 0.3)" }}>
              <Sparkles size={11} style={{ display: "inline", marginRight: "3px" }} /> Destacado
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: isFeatured ? "1.15rem" : "1.05rem",
            fontWeight: 700,
            lineHeight: 1.35,
            color: "var(--text-main)",
            marginBottom: "0.75rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {opportunity.title}
        </h3>

        {/* Dynamic visual tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
          {(opportunity.tags || []).slice(0, 4).map((tag, idx) => (
            <span key={idx} className="badge-pill-tag">
              #{tag}
            </span>
          ))}
          {opportunity.location && (
            <span className="badge-pill-tag" style={{ color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: "3px" }}>
              <MapPin size={11} /> {opportunity.location}
            </span>
          )}
        </div>

        {/* Key requirements (Max 3 bullet points) */}
        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "0.75rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--text-dim)", marginBottom: "0.4rem" }}>
            Requisitos Clave:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {previewRequirements.map((req, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem", fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Action (min-height 44px) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          paddingTop: "0.75rem",
          marginTop: "0.5rem",
          minHeight: "44px"
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          {opportunity.duration || "Duración variable"}
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.825rem",
            fontWeight: 600,
            color: "var(--primary-light)",
            transition: "all var(--transition-fast)",
            padding: "0.4rem 0"
          }}
        >
          Ver detalles <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
