import React from "react";
import { ShieldCheck, Heart, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import logoIcon from "../assets/logo-icon.png";

export default function Footer() {
  const { navigateTo, applyQuickIntent } = useApp();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "5rem",
        padding: "4rem 0 2rem",
        position: "relative"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem"
          }}
        >
          {/* Brand & Manifesto */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <img
                src={logoIcon}
                alt="Punto Nexus"
                style={{ width: "36px", height: "36px", objectFit: "contain" }}
              />
              <span style={{ fontSize: "1.2rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                PUNTO <span className="text-gradient">NEXUS</span>
              </span>
            </div>

            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Plataforma digital dedicada a democratizar el acceso a oportunidades reales de desarrollo para las juventudes. Menor carga cognitiva, cero desinformación.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                fontSize: "0.75rem",
                color: "#38bdf8",
                fontWeight: 600
              }}
            >
              <ShieldCheck size={14} /> 100% Oportunidades Verificadas
            </div>
          </div>

          {/* Oportunidades Rápidas */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-main)", marginBottom: "1.25rem" }}>
              Oportunidades
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem" }}>
              <li>
                <button
                  onClick={() => applyQuickIntent("empleo")}
                  style={{ color: "var(--text-muted)", transition: "color var(--transition-fast)", textAlign: "left" }}
                  onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
                >
                  Pasantías y Primer Empleo
                </button>
              </li>
              <li>
                <button
                  onClick={() => applyQuickIntent("financiamiento")}
                  style={{ color: "var(--text-muted)", transition: "color var(--transition-fast)", textAlign: "left" }}
                  onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
                >
                  Becas Universitarias y Posgrados
                </button>
              </li>
              <li>
                <button
                  onClick={() => applyQuickIntent("aprender")}
                  style={{ color: "var(--text-muted)", transition: "color var(--transition-fast)", textAlign: "left" }}
                  onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
                >
                  Cursos & Certificaciones Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => applyQuickIntent("convocatoria")}
                  style={{ color: "var(--text-muted)", transition: "color var(--transition-fast)", textAlign: "left" }}
                  onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
                >
                  Hackathons y Fondos Semilla
                </button>
              </li>
            </ul>
          </div>

          {/* Rutas Principales */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-main)", marginBottom: "1.25rem" }}>
              Navegación
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem" }}>
              <li>
                <button
                  onClick={() => navigateTo("/")}
                  style={{ color: "var(--text-muted)" }}
                >
                  Dashboard de Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/explorar")}
                  style={{ color: "var(--text-muted)" }}
                >
                  Motor de Búsqueda & Filtros
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/recursos")}
                  style={{ color: "var(--text-muted)" }}
                >
                  Guías de Empleo & Artículos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/mi-tablero")}
                  style={{ color: "var(--text-muted)" }}
                >
                  Mi Tablero Personal (Favoritos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/admin")}
                  style={{ color: "#f87171", fontWeight: 600 }}
                >
                  Panel de Administración (CMS)
                </button>
              </li>
            </ul>
          </div>

          {/* Seguridad y Anti-fraude */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-main)", marginBottom: "1.25rem" }}>
              Seguridad Juvenil
            </h4>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.825rem",
                color: "var(--text-muted)"
              }}
            >
              <p style={{ marginBottom: "0.5rem" }}>
                ¿Detectaste una oferta irregular o sospechosa? Ayúdanos a mantener este espacio seguro.
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: "#38bdf8",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
                onClick={() => navigateTo("/recursos")}
              >
                Ver protocolo anti-fraude <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.75rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "var(--text-dim)"
          }}
        >
          <div>
            © {new Date().getFullYear()} Punto Nexus SPA. Diseñado para el progreso de la juventud.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Construido con <Heart size={14} color="#f43f5e" fill="#f43f5e" /> para conectar talento sin barreras
          </div>
        </div>
      </div>
    </footer>
  );
}
