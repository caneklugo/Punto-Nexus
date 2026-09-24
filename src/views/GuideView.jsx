import React, { useState } from "react";
import { 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  Compass, 
  Search, 
  QrCode, 
  Layers, 
  Award, 
  ArrowRight,
  Code,
  Sparkles,
  BarChart3,
  Copy,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function GuideView() {
  const { navigateTo, switchRole } = useApp();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'tour' | 'pitch'
  const [copiedLink, setCopiedLink] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://caneklugo.github.io/Punto-Nexus/";
  const qrDemoUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(currentUrl)}&margin=10`;

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="container" style={{ paddingBottom: "5rem", paddingTop: "2rem" }}>
      {/* Top Banner / Hero */}
      <div 
        className="card-glass text-center animate-fade-in"
        style={{
          padding: "2.5rem 1.5rem",
          marginBottom: "2rem",
          background: "radial-gradient(ellipse at top, rgba(99, 102, 241, 0.18) 0%, rgba(10, 13, 20, 0.8) 70%)",
          borderColor: "rgba(99, 102, 241, 0.3)"
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "var(--radius-full)", background: "rgba(99, 102, 241, 0.15)", border: "1px solid rgba(99, 102, 241, 0.3)", marginBottom: "1rem" }}>
          <Sparkles size={16} color="var(--primary-light)" />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--primary-light)", textTransform: "uppercase" }}>
            Centro de Documentación y Guía de Uso
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 900, fontFamily: "var(--font-heading)", lineHeight: 1.15, marginBottom: "1rem" }}>
          Conoce <span className="text-gradient">Punto Nexus</span> a Fondo
        </h1>
        <p style={{ maxWidth: "720px", margin: "0 auto 1.75rem", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Explora la guía de uso interactiva, el manual de operaciones y la ficha técnica de arquitectura y métricas de la plataforma.
        </p>

        {/* Tab navigation buttons */}
        <div 
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            padding: "0.4rem",
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)"
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            className="btn"
            style={{
              padding: "0.6rem 1.1rem",
              fontSize: "0.88rem",
              background: activeTab === "overview" ? "var(--primary)" : "transparent",
              color: activeTab === "overview" ? "#ffffff" : "var(--text-muted)",
              border: "none",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem"
            }}
          >
            <BookOpen size={16} /> Resumen General & QR
          </button>

          <button
            onClick={() => setActiveTab("tour")}
            className="btn"
            style={{
              padding: "0.6rem 1.1rem",
              fontSize: "0.88rem",
              background: activeTab === "tour" ? "var(--primary)" : "transparent",
              color: activeTab === "tour" ? "#ffffff" : "var(--text-muted)",
              border: "none",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem"
            }}
          >
            <Compass size={16} /> Manual de Uso
          </button>

          <button
            onClick={() => setActiveTab("pitch")}
            className="btn"
            style={{
              padding: "0.6rem 1.1rem",
              fontSize: "0.88rem",
              background: activeTab === "pitch" ? "var(--primary)" : "transparent",
              color: activeTab === "pitch" ? "#ffffff" : "var(--text-muted)",
              border: "none",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem"
            }}
          >
            <TrendingUp size={16} /> Ficha Técnica
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & QR ENTRY */}
      {activeTab === "overview" && (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            
            {/* Direct Access QR Code Box */}
            <div className="card-glass" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <QrCode size={26} color="var(--primary-light)" />
              </div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Acceso Móvil Instantáneo (QR)
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Escanea con la cámara de cualquier smartphone para acceder a la experiencia móvil responsiva en vivo.
              </p>

              <div style={{ padding: "12px", background: "#ffffff", borderRadius: "16px", boxShadow: "0 8px 30px rgba(0,0,0,0.5)", marginBottom: "1.25rem" }}>
                <img 
                  src={qrDemoUrl} 
                  alt="QR Punto Nexus" 
                  style={{ width: "190px", height: "190px", display: "block" }} 
                />
              </div>

              <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.04)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <input 
                  type="text" 
                  readOnly 
                  value={currentUrl} 
                  style={{ background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "0.78rem", width: "100%", outline: "none" }}
                />
                <button 
                  onClick={copyUrlToClipboard}
                  className="btn"
                  style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", background: copiedLink ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.1)", color: copiedLink ? "#34d399" : "#ffffff", border: "none" }}
                >
                  {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Quick Summary of Capabilities */}
            <div className="card-glass" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                  <Award size={22} color="#38bdf8" />
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>¿Qué es Punto Nexus?</h2>
                </div>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  <strong>Punto Nexus</strong> es una plataforma web orientada al público juvenil que centraliza y verifica oportunidades reales de desarrollo: <strong>empleos iniciales, pasantías, becas universitarias, certificaciones técnicas y convocatorias de financiamiento</strong>.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                    <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.88rem", color: "var(--text-main)" }}>
                      <strong>Cero Desinformación:</strong> Curaduría estricta de requisitos, fechas límites reales y entidades verificadas.
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                    <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.88rem", color: "var(--text-main)" }}>
                      <strong>Búsqueda por Intención:</strong> Reduce la carga cognitiva con filtros directos como <em>"Busco Empleo"</em> o <em>"Quiero Aprender"</em>.
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                    <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.88rem", color: "var(--text-main)" }}>
                      <strong>Mobile-First Real:</strong> Arquitectura adaptativa con estándares de accesibilidad táctil (&gt;= 44px) y menú lateral optimizado.
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => navigateTo("/explorar")} className="btn btn-primary" style={{ flex: 1, minHeight: "44px" }}>
                  <Search size={16} /> Explorar Catálogo
                </button>
                <button onClick={() => setActiveTab("tour")} className="btn btn-secondary" style={{ flex: 1, minHeight: "44px" }}>
                  <BookOpen size={16} /> Ver Manual de Uso
                </button>
              </div>
            </div>

          </div>

          {/* Role Sandbox Shortcuts */}
          <div className="card-glass" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Simulador de Roles Integrado
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Permite alternar entre los 3 perfiles del sistema para conocer cada flujo:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <div 
                onClick={() => switchRole("visitor")} 
                style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", cursor: "pointer" }}
              >
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#cbd5e1", display: "block" }}>1. Visitante</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "4px", display: "block" }}>
                  Navegación pública, filtros de búsqueda y lectura completa de fichas.
                </span>
              </div>
              <div 
                onClick={() => switchRole("user")} 
                style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", cursor: "pointer" }}
              >
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#818cf8", display: "block" }}>2. Usuario Registrado</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "4px", display: "block" }}>
                  Tablero personal, gestión de favoritos, alertas y postulación en 1 clic.
                </span>
              </div>
              <div 
                onClick={() => switchRole("admin")} 
                style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer" }}
              >
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f87171", display: "block" }}>3. Administrador / CMS</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "4px", display: "block" }}>
                  Creación, edición y administración de convocatorias y artículos formativos.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL DE USO */}
      {activeTab === "tour" && (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div className="card-glass" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Compass size={22} color="var(--primary-light)" /> Manual Paso a Paso: Funcionalidades del Sistema
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              Este manual describe las acciones operativas que cualquier usuario puede ejecutar dentro de Punto Nexus.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Step 1 */}
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Búsqueda Guiada por Intención (Home Hero)
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    En la pantalla de inicio dispones de una barra de búsqueda de respuesta instantánea y 4 accesos rápidos que configuran automáticamente los filtros:
                  </p>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    <li><strong>Busco Empleo:</strong> Filtra pasantías y empleos de nivel inicial remunerados.</li>
                    <li><strong>Quiero Aprender:</strong> Filtra cursos certificados y diplomados técnicos.</li>
                    <li><strong>Necesito Financiamiento:</strong> Filtra becas universitarias completas y parciales.</li>
                    <li><strong>Ver Convocatorias:</strong> Filtra fondos semilla, certámenes y concursos de innovación.</li>
                  </ul>
                  <button onClick={() => navigateTo("/")} className="btn btn-secondary" style={{ marginTop: "0.75rem", padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}>
                    Ir a la Home <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Catálogo con Filtros Multidimensionales (/explorar)
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    Permite combinar simultáneamente:
                  </p>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    <li><strong>Categoría:</strong> Empleo, Becas, Cursos, Certificaciones, Convocatorias.</li>
                    <li><strong>Modalidad:</strong> Remoto, Presencial o Híbrido.</li>
                    <li><strong>Costo/Financiamiento:</strong> Gratuito, Con Beca o Pagado.</li>
                    <li><strong>Ordenamiento:</strong> Relevancia, Próximos a vencer (Urgencia) y Más recientes.</li>
                  </ul>
                  <button onClick={() => navigateTo("/explorar")} className="btn btn-secondary" style={{ marginTop: "0.75rem", padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}>
                    Abrir Explorador <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Ficha Técnica y Postulación Directa (/oportunidad/:id)
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    Cada oportunidad cuenta con su vista detallada completa que incluye:
                  </p>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    <li>Semáforo de urgencia de convocatoria (días restantes y badge de alerta).</li>
                    <li>Requisitos desglosados en viñetas directas para reducir la fatiga mental.</li>
                    <li>Entidad convocante con insignia de verificación y enlace a su sitio oficial.</li>
                    <li><strong>Modal de postulación integrada:</strong> Envío ágil con validación y confirmación inmediata.</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Mi Tablero Personal (/mi-tablero)
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    Espacio personal donde el usuario puede:
                  </p>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    <li>Consultar convocatorias marcadas con el icono de Favoritos.</li>
                    <li>Monitorear el estado de cada postulación (Guardado, Postulado, En Revisión, Aceptado).</li>
                    <li>Configurar alertas temáticas según sus intereses formativos y laborales.</li>
                  </ul>
                  <button onClick={() => navigateTo("/mi-tablero")} className="btn btn-secondary" style={{ marginTop: "0.75rem", padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}>
                    Ir a Mi Tablero <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Step 5 */}
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                  5
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Panel de Administración CMS (/admin)
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    Módulo administrativo para gestores de contenido:
                  </p>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    <li>Formulario para dar de alta nuevas convocatorias verificadas.</li>
                    <li>Fijar o retirar oportunidades destacadas del carrusel de la página principal.</li>
                    <li>Publicación de artículos y consejos para preparación de CV y entrevistas.</li>
                  </ul>
                  <button onClick={() => { switchRole("admin"); navigateTo("/admin"); }} className="btn btn-secondary" style={{ marginTop: "0.75rem", padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}>
                    Abrir Panel CMS (Modo Admin) <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FICHA TÉCNICA */}
      {activeTab === "pitch" && (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Executive Overview Banner */}
          <div className="card-glass" style={{ padding: "2rem", borderLeft: "4px solid var(--primary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", color: "var(--primary-light)", textTransform: "uppercase" }}>
                  Especificación de Producto y Arquitectura
                </span>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, marginTop: "0.25rem" }}>
                  Punto Nexus: Ficha Técnica de la Plataforma
                </h2>
              </div>
              <span style={{ padding: "0.35rem 0.75rem", borderRadius: "var(--radius-full)", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", fontSize: "0.8rem", fontWeight: 700 }}>
                Plataforma Web Integral
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Punto Nexus responde a la brecha crítica entre la juventud y las oportunidades de crecimiento académico y laboral. Centraliza, valida y estandariza las ofertas legítimas bajo una interfaz moderna que minimiza la dispersión de información y la fatiga mental.
            </p>
          </div>

          {/* Key Metrics / Value Proposition */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            <div className="card-glass" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-light)", marginBottom: "0.5rem" }}>
                <Zap size={20} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Velocidad & Carga</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#ffffff", marginBottom: "0.25rem" }}>
                &lt; 0.8s
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                Tiempo de primera interacción y navegación instantánea sin recargas de página.
              </p>
            </div>

            <div className="card-glass" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#38bdf8", marginBottom: "0.5rem" }}>
                <ShieldCheck size={20} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Curaduría</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#ffffff", marginBottom: "0.25rem" }}>
                100%
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                Convocatorias con entidad emisora verificada, requisitos claros y semáforo de vigencia.
              </p>
            </div>

            <div className="card-glass" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", marginBottom: "0.5rem" }}>
                <Smartphone size={20} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Mobile-First</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#ffffff", marginBottom: "0.25rem" }}>
                &gt;= 44px
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                Área táctil en botones y menús laterales bajo directrices estrictas de ergonomía móvil.
              </p>
            </div>

            <div className="card-glass" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f43f5e", marginBottom: "0.5rem" }}>
                <Layers size={20} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Disponibilidad</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#ffffff", marginBottom: "0.25rem" }}>
                99.9%
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                Despliegue distribuido en CDN global (GitHub Pages / Vercel Edge).
              </p>
            </div>
          </div>

          {/* Architecture & Tech Stack */}
          <div className="card-glass" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Code size={20} color="var(--primary-light)" /> Arquitectura Tecnológica (Fase Actual vs. Roadmap)
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Fase 1: Frontend SPA
                </div>
                <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  <li><strong>Motor:</strong> React 19 + Vite 8 para empaquetado ultra liviano.</li>
                  <li><strong>Estilos:</strong> Tailwind CSS + Design System Glassmorphism personalizado.</li>
                  <li><strong>Persistencia Local:</strong> LocalStorage para sesiones, favoritos y seguimiento de estado.</li>
                  <li><strong>Iconografía:</strong> Lucide Icons con estándar de accesibilidad.</li>
                </ul>
              </div>

              <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-light)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Fase 2: Backend Cloud (Roadmap de Escala)
                </div>
                <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  <li><strong>BaaS / Base de Datos:</strong> Supabase (PostgreSQL) con Row Level Security (RLS).</li>
                  <li><strong>Búsqueda:</strong> Full-Text Search indexado para grandes volúmenes de convocatorias.</li>
                  <li><strong>Autenticación:</strong> OAuth (Google, GitHub, LinkedIn) y Magic Links.</li>
                  <li><strong>Notificaciones:</strong> Webhooks y envíos de emails automáticos de cierre de convocatorias.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Impact / Business Model */}
          <div className="card-glass" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BarChart3 size={20} color="#34d399" /> Sostenibilidad y Modelo de Alianzas
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Punto Nexus es gratuito para el usuario final (jóvenes estudiantes y profesionales). El modelo de autosuficiencia se basa en:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
                <strong style={{ color: "#ffffff", fontSize: "0.88rem" }}>Sello de Verificación Institucional</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.35rem" }}>
                  Empresas y fundaciones patrocinan convocatorias destacadas para captar talento joven filtrado con alto estándar de conversión.
                </p>
              </div>
              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
                <strong style={{ color: "#ffffff", fontSize: "0.88rem" }}>Convenios Universitarios</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.35rem" }}>
                  Alianzas con departamentos de bolsa de trabajo académica que canalizan sus convocatorias de servicio social y pasantías.
                </p>
              </div>
              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
                <strong style={{ color: "#ffffff", fontSize: "0.88rem" }}>Fondos de Impacto Social</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.35rem" }}>
                  Convocatorias de desarrollo tecnológico orientadas a reducir la brecha de desempleo juvenil y deserción académica.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
