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
      className={`opportunity-card glass-panel w-full flex flex-col justify-between p-4 sm:p-5 md:p-6 rounded-2xl cursor-pointer relative transition-all duration-200 overflow-hidden ${
        isFeatured 
          ? "opportunity-card-featured border border-indigo-500/40 shadow-lg shadow-indigo-500/10 bg-gradient-to-br from-slate-900/95 to-slate-950/95" 
          : "border border-white/10 bg-slate-900/80 hover:border-indigo-500/30"
      }`}
    >
      {/* Top ambient glow line for featured cards */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />
      )}

      {/* Card Header: Issuer Info, Urgency Badge, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          {/* Issuer logo & info */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 border border-white/15 shadow-sm"
              style={{ background: opportunity.issuer.avatarBg || "rgba(255, 255, 255, 0.1)" }}
            >
              {opportunity.issuer.logo ? (
                <img
                  src={opportunity.issuer.logo}
                  alt={opportunity.issuer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="font-bold text-base text-white">
                  {opportunity.issuer.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
                  {opportunity.issuer.name}
                </span>
                {opportunity.issuer.verified && (
                  <span title="Institución verificada por Punto Nexus" className="flex-shrink-0">
                    <ShieldCheck size={14} className="text-cyan-400" />
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 block truncate">
                {opportunity.issuer.type || "Emisor Verificado"}
              </span>
            </div>
          </div>

          {/* Bookmark Button (Guaranteed 44x44px minimum touch target) */}
          <button
            type="button"
            className={`bookmark-action-btn btn-bookmark min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-95 flex-shrink-0 ${
              isFav ? "active" : ""
            }`}
            onClick={handleBookmarkClick}
            title={isFav ? "Guardado en Favoritos" : "Guardar en Favoritos"}
            aria-label="Guardar oportunidad"
          >
            <Bookmark size={18} fill={isFav ? "#fbbf24" : "none"} />
          </button>
        </div>

        {/* Urgency and Category Row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
          <span className={`badge ${getCategoryBadgeClass(opportunity.category)}`}>
            {getCategoryLabel(opportunity.category)}
          </span>
          <UrgencyBadge closingDate={opportunity.closingDate} />
          {isFeatured && (
            <span className="badge bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <Sparkles size={11} className="inline mr-1" /> Destacado
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold leading-snug text-slate-100 mb-2.5 line-clamp-2 ${
          isFeatured ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base md:text-lg"
        }`}>
          {opportunity.title}
        </h3>

        {/* Dynamic visual tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {(opportunity.tags || []).slice(0, 4).map((tag, idx) => (
            <span key={idx} className="badge-pill-tag text-xs">
              #{tag}
            </span>
          ))}
          {opportunity.location && (
            <span className="badge-pill-tag text-xs text-slate-400 flex items-center gap-1">
              <MapPin size={11} /> {opportunity.location}
            </span>
          )}
        </div>

        {/* Key requirements (Max 3 bullet points) */}
        <div className="border-t border-white/5 pt-3 mb-3">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Requisitos Clave:
          </p>
          <ul className="space-y-1.5">
            {previewRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-snug">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Action (44px min height touch target) */}
      <div className="min-h-[44px] flex items-center justify-between border-t border-white/5 pt-3 mt-1">
        <span className="text-xs text-slate-400">
          {opportunity.duration || "Duración variable"}
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-2">
          Ver detalles <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
