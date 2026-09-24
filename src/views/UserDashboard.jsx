import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Bookmark,
  Bell,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import OpportunityCard from "../components/OpportunityCard";

export default function UserDashboard() {
  const {
    currentUserRole,
    switchRole,
    registeredProfile,
    setRegisteredProfile,
    opportunities,
    favorites,
    applicationTracker,
    updateApplicationStatus,
    navigateTo,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState("favoritos"); // 'favoritos' | 'alertas'
  const [statusFilter, setStatusFilter] = useState("todos");

  // Get full opportunity objects from favorites array
  const favoriteOpps = opportunities.filter((o) => favorites.includes(o.id));

  // Filter by pipeline status if selected
  const displayedFavorites = statusFilter === "todos"
    ? favoriteOpps
    : favoriteOpps.filter(o => (applicationTracker[o.id] || "guardado") === statusFilter);

  const handleInterestToggle = (interestKey) => {
    setRegisteredProfile(prev => {
      const current = prev.interests || [];
      const updated = current.includes(interestKey)
        ? current.filter(i => i !== interestKey)
        : [...current, interestKey];
      return { ...prev, interests: updated };
    });
    showToast("Preferencias de intereses actualizadas", "success");
  };

  const handleSaveAlerts = (e) => {
    e.preventDefault();
    showToast("Preferencias de alertas guardadas exitosamente", "success");
  };

  return (
    <div className="animate-fade-in" style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        
        {/* Visitor Warning Banner if not switched */}
        {currentUserRole === "visitor" && (
          <div
            className="glass-panel"
            style={{
              padding: "1rem 1.5rem",
              marginBottom: "2rem",
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Sparkles size={20} color="var(--primary-light)" />
              <div>
                <strong style={{ color: "var(--text-main)", fontSize: "0.95rem" }}>
                  Estás explorando el tablero en modo visitante
                </strong>
                <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
                  Activa el rol de Usuario Registrado para probar la experiencia personalizada de Sofía.
                </p>
              </div>
            </div>

            <button
              onClick={() => switchRole("user")}
              className="btn btn-primary"
              style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}
            >
              Conectar como Sofía (Usuario)
            </button>
          </div>
        )}

        {/* User Header Profile */}
        <div
          className="glass-panel"
          style={{
            padding: "2rem",
            marginBottom: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "4px",
              background: "linear-gradient(to bottom, #6366f1, #06b6d4)"
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--primary-light)",
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)"
              }}
            >
              <img
                src={registeredProfile.avatar}
                alt={registeredProfile.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                  {registeredProfile.name}
                </h1>
                <span className="badge badge-empleo" style={{ fontSize: "0.7rem" }}>
                  Usuario Registrado
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-dim)", marginTop: "2px" }}>
                {registeredProfile.education} • {registeredProfile.email}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ textAlign: "center", padding: "0.5rem 1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-light)", display: "block" }}>
                {favoriteOpps.length}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                Guardadas
              </span>
            </div>

            <div style={{ textAlign: "center", padding: "0.5rem 1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#34d399", display: "block" }}>
                {Object.values(applicationTracker).filter(s => s === "postulado").length}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                Postuladas
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "0.75rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setActiveTab("favoritos")}
            className={`btn ${activeTab === "favoritos" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "0.9rem" }}
          >
            <Bookmark size={16} /> Mis Oportunidades ({favoriteOpps.length})
          </button>

          <button
            onClick={() => setActiveTab("alertas")}
            className={`btn ${activeTab === "alertas" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "0.9rem" }}
          >
            <Bell size={16} /> Alertas de Interés
          </button>
        </div>

        {/* TAB 1: FAVORITOS & TRACKER */}
        {activeTab === "favoritos" && (
          <div>
            {/* Filter by status pipeline */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {[
                  { id: "todos", label: "Todas" },
                  { id: "guardado", label: "Solo Guardadas" },
                  { id: "postulado", label: "Postulado" },
                  { id: "entrevista", label: "En Entrevista" }
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.8rem",
                      background: statusFilter === st.id ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                      border: statusFilter === st.id ? "1px solid var(--primary-light)" : "1px solid var(--border-subtle)",
                      color: statusFilter === st.id ? "#ffffff" : "var(--text-muted)",
                      cursor: "pointer"
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigateTo("/explorar")}
                className="btn btn-secondary"
                style={{ fontSize: "0.85rem", padding: "0.45rem 0.85rem" }}
              >
                + Explorar y guardar más
              </button>
            </div>

            {/* List / Cards */}
            {displayedFavorites.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
                {displayedFavorites.map((opp) => {
                  const currentStatus = applicationTracker[opp.id] || "guardado";
                  return (
                    <div key={opp.id} style={{ display: "flex", flexDirection: "column" }}>
                      <OpportunityCard opportunity={opp} />
                      
                      {/* Application status pipeline selector below card */}
                      <div
                        className="glass-panel"
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.6rem 0.85rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: "var(--radius-md)",
                          fontSize: "0.8rem",
                          background: "rgba(15, 20, 34, 0.95)"
                        }}
                      >
                        <span style={{ color: "var(--text-dim)", fontWeight: 600 }}>
                          Estado:
                        </span>
                        
                        <select
                          value={currentStatus}
                          onChange={(e) => updateApplicationStatus(opp.id, e.target.value)}
                          style={{
                            background: "var(--bg-card)",
                            color: currentStatus === "postulado" ? "#34d399" : "var(--text-main)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-sm)",
                            padding: "0.25rem 0.5rem",
                            fontSize: "0.75rem",
                            fontWeight: 600
                          }}
                        >
                          <option value="guardado">Guardado</option>
                          <option value="postulado">Postulado / Aplicado</option>
                          <option value="entrevista">En Entrevista</option>
                          <option value="aceptado">Aceptado</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="glass-panel"
                style={{
                  padding: "4rem 2rem",
                  textAlign: "center",
                  borderRadius: "var(--radius-xl)"
                }}
              >
                <Bookmark size={48} color="var(--primary-light)" style={{ margin: "0 auto 1rem", opacity: 0.7 }} />
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Aún no tienes oportunidades con este filtro
                </h3>
                <p style={{ color: "var(--text-muted)", maxWidth: "420px", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
                  Guarda las ofertas que llamen tu atención para darles seguimiento y recibir recordatorios de fecha de cierre.
                </p>
                <button onClick={() => navigateTo("/explorar")} className="btn btn-primary">
                  Explorar catálogo de oportunidades
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALERTAS DE INTERÉS */}
        {activeTab === "alertas" && (
          <div className="glass-panel" style={{ padding: "2rem", maxWidth: "700px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <Bell size={22} color="var(--primary-light)" />
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Configuración de Alertas & Notificaciones
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Recibe novedades personalizadas directamente en tu correo antes de que venzan los plazos.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAlerts}>
              {/* Category checkboxes */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "0.75rem" }}>
                  Categorías de Interés
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.6rem" }}>
                  {[
                    { id: "empleo", label: "Empleos y Pasantías" },
                    { id: "beca", label: "Becas de Pregrado / Posgrado" },
                    { id: "curso", label: "Cursos de Formación" },
                    { id: "certificacion", label: "Certificaciones Tech" },
                    { id: "convocatoria", label: "Hackathons y Fondos" }
                  ].map(cat => {
                    const isChecked = (registeredProfile.interests || []).includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleInterestToggle(cat.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "var(--radius-md)",
                          background: isChecked ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.02)",
                          border: isChecked ? "1px solid var(--primary-light)" : "1px solid var(--border-subtle)",
                          cursor: "pointer"
                        }}
                      >
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "4px",
                            border: isChecked ? "none" : "1px solid var(--text-dim)",
                            background: isChecked ? "var(--primary)" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff"
                          }}
                        >
                          {isChecked && <CheckCircle2 size={14} />}
                        </div>
                        <span style={{ fontSize: "0.85rem", color: isChecked ? "#ffffff" : "var(--text-muted)" }}>
                          {cat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alert Frequency */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "0.75rem" }}>
                  Frecuencia de Notificaciones
                </label>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {["diario", "semanal"].map((freq) => (
                    <label key={freq} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                      <input
                        type="radio"
                        name="frequency"
                        checked={registeredProfile.alertEmailFrequency === freq}
                        onChange={() => setRegisteredProfile(prev => ({ ...prev, alertEmailFrequency: freq }))}
                      />
                      <span style={{ textTransform: "capitalize" }}>Resumen {freq}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Urgent reminder toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  marginBottom: "2rem"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", display: "block" }}>
                    Recordatorio de Urgencia Crítica (3 días antes del cierre)
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                    Te enviaremos una notificación prioritaria cuando una oportunidad guardada esté a punto de expirar.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={registeredProfile.alertsEnabled}
                  onChange={(e) => setRegisteredProfile(prev => ({ ...prev, alertsEnabled: e.target.checked }))}
                  style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.7rem 1.5rem" }}>
                Guardar Configuración de Alertas
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
