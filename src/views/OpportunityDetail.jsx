import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Mail,
  Globe,
  Sparkles,
  AlertTriangle,
  Award,
  Layers,
  Check
} from "lucide-react";
import UrgencyBadge from "../components/UrgencyBadge";
import OpportunityCard from "../components/OpportunityCard";
import { formatDate } from "../utils/urgency";

export default function OpportunityDetail() {
  const {
    routeParams,
    opportunities,
    navigateTo,
    isFavorite,
    toggleFavorite,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const oppId = routeParams?.id;
  const opportunity = opportunities.find((o) => o.id === oppId);

  // If not found, show friendly error state
  if (!opportunity) {
    return (
      <div className="container" style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div className="glass-panel" style={{ maxWidth: "500px", margin: "0 auto", padding: "3rem" }}>
          <AlertTriangle size={48} color="#f59e0b" style={{ margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>Ficha no encontrada</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            La oportunidad que buscas ha finalizado, fue retirada o el identificador es incorrecto.
          </p>
          <button onClick={() => navigateTo("/explorar")} className="btn btn-primary">
            <ArrowLeft size={16} /> Explorar otras oportunidades
          </button>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(opportunity.id);

  // Similar opportunities (same category, different ID)
  const similarOpps = opportunities
    .filter((o) => o.category === opportunity.category && o.id !== opportunity.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showToast("Enlace de la ficha copiado al portapapeles", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyRedirect = () => {
    window.open(opportunity.externalUrl, "_blank", "noopener,noreferrer");
    setShowApplyModal(false);
    showToast("Redirigiendo al portal oficial del emisor...", "info");
  };

  return (
    <div className="animate-fade-in" style={{ padding: "2rem 0 5rem" }}>
      <div className="container">
        
        {/* Breadcrumb & Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <button
            onClick={() => navigateTo("/explorar")}
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
          >
            <ArrowLeft size={16} /> Volver al listado
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <button
              onClick={handleCopyLink}
              className="btn btn-secondary"
              style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
            >
              {copied ? <Check size={16} color="#34d399" /> : <Share2 size={16} />}
              <span>{copied ? "¡Copiado!" : "Compartir"}</span>
            </button>

            <button
              onClick={() => toggleFavorite(opportunity.id)}
              className={`btn btn-secondary ${isFav ? "active" : ""}`}
              style={{
                padding: "0.45rem 0.9rem",
                fontSize: "0.85rem",
                borderColor: isFav ? "rgba(251, 191, 36, 0.6)" : "var(--border-subtle)",
                color: isFav ? "#fbbf24" : "var(--text-main)"
              }}
            >
              <Bookmark size={16} fill={isFav ? "#fbbf24" : "none"} />
              <span>{isFav ? "Guardado" : "Guardar en Favoritos"}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: 2 Columns (Details left, Sticky Action Box right) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="detail-layout-grid">
          
          {/* Main Info Column */}
          <div>
            
            {/* Header Card */}
            <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #6366f1, #06b6d4, #8b5cf6)"
                }}
              />

              {/* Urgency & Category Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span className="badge badge-empleo" style={{ textTransform: "capitalize" }}>
                  {opportunity.category}
                </span>
                <UrgencyBadge closingDate={opportunity.closingDate} />
                <span className="badge badge-pill-tag">
                  <MapPin size={12} /> {opportunity.location || "Remoto"}
                </span>
                {opportunity.cost && (
                  <span className="badge badge-pill-tag" style={{ textTransform: "capitalize" }}>
                    Costo: {opportunity.cost.replace("_", " ")}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.25, marginBottom: "1.25rem", color: "var(--text-main)" }}>
                {opportunity.title}
              </h1>

              {/* Issuer Profile Card Inline */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    background: opportunity.issuer.avatarBg || "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {opportunity.issuer.logo ? (
                    <img
                      src={opportunity.issuer.logo}
                      alt={opportunity.issuer.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                      {opportunity.issuer.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                      {opportunity.issuer.name}
                    </h3>
                    {opportunity.issuer.verified && (
                      <span className="badge badge-verified">
                        <ShieldCheck size={12} /> Verificado
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                    {opportunity.issuer.type} • Calificación de confianza: {opportunity.issuer.rating || 4.9} / 5.0
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={18} color="var(--primary-light)" />
                Sobre esta Oportunidad
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#cbd5e1", whiteSpace: "pre-line" }}>
                {opportunity.description}
              </p>
            </div>

            {/* Requisitos estructurados */}
            <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Award size={18} color="#34d399" />
                Requisitos de Postulación
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {(opportunity.detailedRequirements || opportunity.requirements || []).map((req, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      background: "rgba(255, 255, 255, 0.02)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}
                  >
                    <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.95rem", color: "#e2e8f0", lineHeight: 1.5 }}>
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficios y compensación */}
            {opportunity.benefits && opportunity.benefits.length > 0 && (
              <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Sparkles size={18} color="#fbbf24" />
                  Beneficios y Qué incluye
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                  {opportunity.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "1rem",
                        background: "rgba(99, 102, 241, 0.04)",
                        border: "1px solid rgba(99, 102, 241, 0.18)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.9rem",
                        color: "#f1f5f9",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem"
                      }}
                    >
                      <CheckCircle2 size={16} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proceso de selección */}
            {opportunity.selectionProcess && (
              <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
                  Proceso de Postulación y Fases
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {opportunity.selectionProcess.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(99, 102, 241, 0.06)",
                        borderLeft: "3px solid var(--primary)",
                        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                        fontSize: "0.9rem",
                        color: "#cbd5e1"
                      }}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Anti-misinformation / Verification Note */}
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                background: "rgba(6, 182, 212, 0.08)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                marginBottom: "3rem"
              }}
            >
              <ShieldCheck size={24} color="#38bdf8" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#38bdf8", marginBottom: "0.25rem" }}>
                  Verificación de Seguridad Punto Nexus
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  Esta ficha ha sido revisada por nuestro equipo editorial para protegerte de fraudes y ofertas engañosas. 
                  <strong> Recuerda:</strong> Ninguna oportunidad oficial te cobrará cuotas de postulación ni exigirá pagos por adelantado.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar / Sticky Action Box */}
          <div>
            <div
              className="glass-panel-elevated"
              style={{
                padding: "1.75rem",
                position: "sticky",
                top: "90px"
              }}
            >
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                Resumen de Fechas & Postulación
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                
                {/* Closing Date */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", flexShrink: 0 }}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
                      Fecha Límite (Cierre)
                    </span>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>
                      {formatDate(opportunity.closingDate)}
                    </p>
                    <div style={{ marginTop: "4px" }}>
                      <UrgencyBadge closingDate={opportunity.closingDate} />
                    </div>
                  </div>
                </div>

                {/* Start Date */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary-light)", flexShrink: 0 }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
                      Fecha de Inicio
                    </span>
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" }}>
                      {formatDate(opportunity.startDate) || "Inmediata"}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399", flexShrink: 0 }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
                      Duración Estimada
                    </span>
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" }}>
                      {opportunity.duration || "Por determinar"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Apply Button */}
              <button
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.9rem 1.25rem", fontSize: "1.05rem", marginBottom: "0.85rem", fontWeight: 700 }}
              >
                Aplicar / Ir al recurso <ExternalLink size={18} />
              </button>

              <button
                onClick={() => toggleFavorite(opportunity.id)}
                className="btn btn-secondary"
                style={{ width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem" }}
              >
                <Bookmark size={16} fill={isFav ? "#fbbf24" : "none"} color={isFav ? "#fbbf24" : "currentColor"} />
                {isFav ? "Guardada en Favoritos" : "Guardar para después"}
              </button>

              {/* Issuer contact meta */}
              <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: "1.5rem", paddingTop: "1.25rem", fontSize: "0.825rem", color: "var(--text-dim)" }}>
                <p style={{ fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  Canales Oficiales del Emisor:
                </p>
                {opportunity.issuer.website && (
                  <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                    <Globe size={14} />
                    <a href={opportunity.issuer.website} target="_blank" rel="noreferrer" style={{ color: "var(--primary-light)", textDecoration: "underline" }}>
                      {opportunity.issuer.website.replace("https://", "")}
                    </a>
                  </p>
                )}
                {opportunity.issuer.contactEmail && (
                  <p style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Mail size={14} />
                    <span>{opportunity.issuer.contactEmail}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Opportunities Section */}
        {similarOpps.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Oportunidades Relacionadas
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {similarOpps.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal before redirecting to External Application */}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px", padding: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "var(--primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}
              >
                <ExternalLink size={26} />
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Saliendo hacia el portal oficial
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Estás a punto de ser redirigido a la plataforma externa de <strong>{opportunity.issuer.name}</strong> para completar tu postulación.
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                marginBottom: "1.5rem",
                fontSize: "0.85rem",
                color: "#94a3b8",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={15} color="#34d399" style={{ flexShrink: 0 }} />
                <span>Asegúrate de tener tu CV o expediente preparado en formato PDF.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={15} color="#34d399" style={{ flexShrink: 0 }} />
                <span>Revisa los requisitos antes de enviar tu solicitud.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={15} color="#34d399" style={{ flexShrink: 0 }} />
                <span>Recuerda que el trámite de postulación es gratuito.</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button onClick={() => setShowApplyModal(false)} className="btn btn-secondary">
                Cancelar
              </button>
              <button onClick={handleApplyRedirect} className="btn btn-primary">
                Continuar a la postulación <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive layout styles */}
      <style>{`
        @media (min-width: 960px) {
          .detail-layout-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
