import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  PlusCircle,
  Edit,
  Trash2,
  Star,
  Layers,
  FileText,
  X
} from "lucide-react";
import UrgencyBadge from "../components/UrgencyBadge";

const getInitialOppForm = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return {
    title: "",
    category: "empleo",
    modality: "remoto",
    cost: "gratis",
    location: "Remoto (Latinoamérica)",
    issuerName: "",
    issuerType: "Empresa Tecnológica",
    issuerLogo: "",
    issuerVerified: true,
    issuerWebsite: "https://",
    issuerContactEmail: "contacto@oportunidad.org",
    requirements: ["", "", ""],
    description: "",
    benefits: "",
    closingDate: d.toISOString().split("T")[0],
    startDate: "Inmediata",
    duration: "3 a 6 meses",
    externalUrl: "https://",
    featured: false,
    tags: "Remoto, Pasantía, Sin Experiencia"
  };
};

export default function AdminCMS() {
  const {
    currentUserRole,
    switchRole,
    opportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    toggleFeatured,
    articles,
    addArticle,
    deleteArticle,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState("fichas"); // 'fichas' | 'articulos'
  const [modalMode, setModalMode] = useState(null); // 'create_opp' | 'edit_opp' | 'create_art'
  const [editingOpp, setEditingOpp] = useState(null);

  const [oppForm, setOppForm] = useState(getInitialOppForm);

  // Article Form State
  const [artForm, setArtForm] = useState({
    title: "",
    category: "Empleabilidad & CV",
    readTime: "4 min de lectura",
    author: "Comité Editorial Nexus",
    summary: "",
    content: "",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
  });

  // Open Create Opp Modal
  const handleOpenCreateOpp = () => {
    setOppForm(getInitialOppForm());
    setModalMode("create_opp");
  };

  // Open Edit Opp Modal
  const handleOpenEditOpp = (opp) => {
    setEditingOpp(opp);
    setOppForm({
      title: opp.title,
      category: opp.category,
      modality: opp.modality || "remoto",
      cost: opp.cost || "gratis",
      location: opp.location || "Remoto",
      issuerName: opp.issuer?.name || "",
      issuerType: opp.issuer?.type || "Emisor",
      issuerLogo: opp.issuer?.logo || "",
      issuerVerified: opp.issuer?.verified ?? true,
      issuerWebsite: opp.issuer?.website || "https://",
      issuerContactEmail: opp.issuer?.contactEmail || "",
      requirements: [
        opp.requirements?.[0] || "",
        opp.requirements?.[1] || "",
        opp.requirements?.[2] || ""
      ],
      description: opp.description || "",
      benefits: (opp.benefits || []).join(", "),
      closingDate: opp.closingDate || "",
      startDate: opp.startDate || "Inmediata",
      duration: opp.duration || "",
      externalUrl: opp.externalUrl || "https://",
      featured: !!opp.featured,
      tags: (opp.tags || []).join(", ")
    });
    setModalMode("edit_opp");
  };

  // Submit Opportunity Form
  const handleSubmitOpp = (e) => {
    e.preventDefault();
    if (!oppForm.title || !oppForm.issuerName) {
      showToast("Por favor completa el título y el nombre del emisor", "warning");
      return;
    }

    const structuredOpp = {
      id: editingOpp ? editingOpp.id : `opp-cms-${Date.now()}`,
      title: oppForm.title,
      category: oppForm.category,
      modality: oppForm.modality,
      cost: oppForm.cost,
      location: oppForm.location,
      issuer: {
        name: oppForm.issuerName,
        type: oppForm.issuerType,
        logo: oppForm.issuerLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        verified: oppForm.issuerVerified,
        website: oppForm.issuerWebsite,
        contactEmail: oppForm.issuerContactEmail,
        rating: 4.9
      },
      tags: oppForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      requirements: oppForm.requirements.filter(r => r.trim().length > 0),
      detailedRequirements: oppForm.requirements.filter(r => r.trim().length > 0),
      benefits: oppForm.benefits.split(",").map(b => b.trim()).filter(Boolean),
      description: oppForm.description || "Oportunidad verificada para el desarrollo integral juvenil.",
      closingDate: oppForm.closingDate,
      startDate: oppForm.startDate,
      duration: oppForm.duration,
      featured: oppForm.featured,
      externalUrl: oppForm.externalUrl
    };

    if (modalMode === "create_opp") {
      addOpportunity(structuredOpp);
    } else {
      updateOpportunity(structuredOpp);
    }

    setModalMode(null);
  };

  // Submit Article Form
  const handleSubmitArticle = (e) => {
    e.preventDefault();
    if (!artForm.title || !artForm.summary) {
      showToast("Completa al menos el título y el resumen del artículo", "warning");
      return;
    }

    addArticle({
      ...artForm,
      date: new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(new Date())
    });

    setModalMode(null);
    setArtForm({
      title: "",
      category: "Empleabilidad & CV",
      readTime: "4 min de lectura",
      author: "Comité Editorial Nexus",
      summary: "",
      content: "",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        
        {/* Banner if role is not admin */}
        {currentUserRole !== "admin" && (
          <div
            className="glass-panel"
            style={{
              padding: "1rem 1.5rem",
              marginBottom: "2rem",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ShieldCheck size={22} color="#f87171" />
              <div>
                <strong style={{ color: "#f87171", fontSize: "0.95rem" }}>
                  Modo Vista Previa de Administrador
                </strong>
                <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
                  Activa el rol de Administrador para gestionar el CMS y guardar cambios en el sistema.
                </p>
              </div>
            </div>

            <button
              onClick={() => switchRole("admin")}
              className="btn btn-primary"
              style={{ background: "#ef4444", fontSize: "0.85rem", padding: "0.45rem 1rem" }}
            >
              Activar Rol Administrador
            </button>
          </div>
        )}

        {/* CMS Header & Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#f87171", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
              <ShieldCheck size={16} /> CMS Interno & Gestión de Contenido
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>
              Panel de Administración Nexus
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Crea, actualiza, destaca y audita oportunidades para salvaguardar la confianza de las juventudes.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handleOpenCreateOpp}
              className="btn btn-primary"
              style={{ padding: "0.65rem 1.25rem" }}
            >
              <PlusCircle size={18} /> Crear Ficha de Oportunidad
            </button>
            <button
              onClick={() => setModalMode("create_art")}
              className="btn btn-secondary"
              style={{ padding: "0.65rem 1.25rem" }}
            >
              <FileText size={18} /> Publicar Tip / Artículo
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem"
          }}
        >
          <div className="glass-panel" style={{ padding: "1.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Total Fichas Activas
            </span>
            <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.25rem" }}>
              {opportunities.length}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "1.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Destacadas en Home
            </span>
            <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fb7185", marginTop: "0.25rem" }}>
              {opportunities.filter(o => o.featured).length}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "1.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Artículos / Tips
            </span>
            <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--primary-light)", marginTop: "0.25rem" }}>
              {articles.length}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "1.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Emisores Verificados
            </span>
            <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#38bdf8", marginTop: "0.25rem" }}>
              100%
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "0.75rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setActiveTab("fichas")}
            className={`btn ${activeTab === "fichas" ? "btn-primary" : "btn-secondary"}`}
          >
            <Layers size={16} /> Oportunidades ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab("articulos")}
            className={`btn ${activeTab === "articulos" ? "btn-primary" : "btn-secondary"}`}
          >
            <FileText size={16} /> Artículos & Tips ({articles.length})
          </button>
        </div>

        {/* TAB 1: OPPORTUNITIES TABLE / MANAGER */}
        {activeTab === "fichas" && (
          <div className="glass-panel" style={{ overflowX: "auto", borderRadius: "var(--radius-lg)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255, 255, 255, 0.02)" }}>
                  <th style={{ padding: "1rem" }}>Oportunidad & Emisor</th>
                  <th style={{ padding: "1rem" }}>Categoría</th>
                  <th style={{ padding: "1rem" }}>Urgencia / Cierre</th>
                  <th style={{ padding: "1rem", textAlign: "center" }}>Destacado</th>
                  <th style={{ padding: "1rem", textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr
                    key={opp.id}
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
                  >
                    {/* Title & Issuer */}
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "var(--radius-sm)",
                            background: opp.issuer?.avatarBg || "rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          {opp.issuer?.logo ? (
                            <img src={opp.issuer.logo} alt="" style={{ width: "100%", height: "100%", borderRadius: "var(--radius-sm)", objectFit: "cover" }} />
                          ) : (
                            opp.issuer?.name?.charAt(0)
                          )}
                        </div>
                        <div>
                          <strong style={{ color: "var(--text-main)", display: "block" }}>
                            {opp.title}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                            {opp.issuer?.name} • {opp.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: "1rem" }}>
                      <span className="badge badge-empleo" style={{ textTransform: "capitalize" }}>
                        {opp.category}
                      </span>
                    </td>

                    {/* Urgency */}
                    <td style={{ padding: "1rem" }}>
                      <UrgencyBadge closingDate={opp.closingDate} />
                    </td>

                    {/* Featured Toggle */}
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <button
                        onClick={() => toggleFeatured(opp.id)}
                        className="btn-icon"
                        title={opp.featured ? "Quitar de destacados" : "Marcar como destacado"}
                        style={{
                          margin: "0 auto",
                          color: opp.featured ? "#fbbf24" : "var(--text-dim)"
                        }}
                      >
                        <Star size={18} fill={opp.featured ? "#fbbf24" : "none"} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => handleOpenEditOpp(opp)}
                          className="btn-icon"
                          title="Editar ficha"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Seguro que deseas eliminar "${opp.title}"?`)) {
                              deleteOpportunity(opp.id);
                            }
                          }}
                          className="btn-icon"
                          title="Eliminar ficha"
                          style={{ color: "#f87171" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: ARTICLES MANAGER */}
        {activeTab === "articulos" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {articles.map((art) => (
              <div
                key={art.id}
                className="glass-panel"
                style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span className="badge badge-curso">
                      {art.category}
                    </span>
                    <button
                      onClick={() => deleteArticle(art.id)}
                      className="btn-icon"
                      style={{ color: "#f87171", width: "30px", height: "30px" }}
                      title="Eliminar artículo"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    {art.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {art.summary}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-dim)" }}>
                  {art.author} • {art.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: CREATE / EDIT OPPORTUNITY */}
      {modalMode && (modalMode === "create_opp" || modalMode === "edit_opp") && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "700px", padding: "2rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800 }}>
                {modalMode === "create_opp" ? "Crear Nueva Ficha de Oportunidad" : "Editar Ficha de Oportunidad"}
              </h3>
              <button onClick={() => setModalMode(null)} className="btn-icon">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitOpp} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Title */}
              <div>
                <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                  Título de la Oportunidad *
                </label>
                <input
                  type="text"
                  required
                  value={oppForm.title}
                  onChange={(e) => setOppForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej. Pasantía Desarrollador Cloud Junior"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-main)"
                  }}
                />
              </div>

              {/* Category, Modality, Cost */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Categoría *
                  </label>
                  <select
                    value={oppForm.category}
                    onChange={(e) => setOppForm(prev => ({ ...prev, category: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  >
                    <option value="empleo">Empleo / Pasantía</option>
                    <option value="beca">Beca</option>
                    <option value="curso">Curso</option>
                    <option value="certificacion">Certificación</option>
                    <option value="convocatoria">Convocatoria</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Modalidad
                  </label>
                  <select
                    value={oppForm.modality}
                    onChange={(e) => setOppForm(prev => ({ ...prev, modality: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  >
                    <option value="remoto">Remoto</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="presencial">Presencial</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Costo
                  </label>
                  <select
                    value={oppForm.cost}
                    onChange={(e) => setOppForm(prev => ({ ...prev, cost: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  >
                    <option value="gratis">Gratis</option>
                    <option value="beca_100">Beca 100%</option>
                    <option value="de_pago">De Pago</option>
                  </select>
                </div>
              </div>

              {/* Issuer Details */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Nombre del Emisor / Institución *
                  </label>
                  <input
                    type="text"
                    required
                    value={oppForm.issuerName}
                    onChange={(e) => setOppForm(prev => ({ ...prev, issuerName: e.target.value }))}
                    placeholder="Ej. Microsoft Latinoamérica"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={oppForm.location}
                    onChange={(e) => setOppForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ej. Remoto o Ciudad de México"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  />
                </div>
              </div>

              {/* Requirements (Max 3 as per Card preview spec) */}
              <div>
                <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                  Requisitos Clave (Máximo 3 para la Ficha Preview)
                </label>
                {[0, 1, 2].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={oppForm.requirements[idx] || ""}
                    onChange={(e) => {
                      const newReqs = [...oppForm.requirements];
                      newReqs[idx] = e.target.value;
                      setOppForm(prev => ({ ...prev, requirements: newReqs }));
                    }}
                    placeholder={`Requisito #${idx + 1}`}
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)",
                      marginBottom: "0.5rem"
                    }}
                  />
                ))}
              </div>

              {/* Closing Date & External URL */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Fecha de Cierre (Calcula urgencia automáticamente) *
                  </label>
                  <input
                    type="date"
                    required
                    value={oppForm.closingDate}
                    onChange={(e) => setOppForm(prev => ({ ...prev, closingDate: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Enlace Oficial para Aplicar (External Link) *
                  </label>
                  <input
                    type="url"
                    required
                    value={oppForm.externalUrl}
                    onChange={(e) => setOppForm(prev => ({ ...prev, externalUrl: e.target.value }))}
                    placeholder="https://..."
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  />
                </div>
              </div>

              {/* Tags & Featured Checkbox */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ flex: 1, minWidth: "240px" }}>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Etiquetas Visuales (Separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={oppForm.tags}
                    onChange={(e) => setOppForm(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Remoto, Sin Experiencia, Beca 100%"
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.85rem",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-main)"
                    }}
                  />
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={oppForm.featured}
                    onChange={(e) => setOppForm(prev => ({ ...prev, featured: e.target.checked }))}
                    style={{ width: "18px", height: "18px", accentColor: "var(--primary)" }}
                  />
                  <span>Destacar en Home (Featured)</span>
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setModalMode(null)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === "create_opp" ? "Crear y Publicar Ficha" : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE ARTICLE */}
      {modalMode === "create_art" && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800 }}>
                Publicar Nuevo Artículo / Tip
              </h3>
              <button onClick={() => setModalMode(null)} className="btn-icon">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitArticle} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                  Título del Artículo *
                </label>
                <input
                  type="text"
                  required
                  value={artForm.title}
                  onChange={(e) => setArtForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej. Cómo responder a preguntas técnicas sin ponerse nervioso"
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", color: "var(--text-main)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Categoría
                  </label>
                  <select
                    value={artForm.category}
                    onChange={(e) => setArtForm(prev => ({ ...prev, category: e.target.value }))}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", color: "var(--text-main)" }}
                  >
                    <option value="Empleabilidad & CV">Empleabilidad & CV</option>
                    <option value="Becas & Financiación">Becas & Financiación</option>
                    <option value="Seguridad & Verificación">Seguridad & Verificación</option>
                    <option value="Cursos & Certificaciones">Cursos & Certificaciones</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                    Tiempo de Lectura
                  </label>
                  <input
                    type="text"
                    value={artForm.readTime}
                    onChange={(e) => setArtForm(prev => ({ ...prev, readTime: e.target.value }))}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", color: "var(--text-main)" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                  Resumen Corto *
                </label>
                <textarea
                  required
                  rows={2}
                  value={artForm.summary}
                  onChange={(e) => setArtForm(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Breve descripción que se mostrará en las tarjetas..."
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", color: "var(--text-main)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.35rem" }}>
                  Contenido Completo
                </label>
                <textarea
                  rows={5}
                  value={artForm.content}
                  onChange={(e) => setArtForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Desarrolla el artículo con consejos prácticos..."
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", color: "var(--text-main)" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                <button type="button" onClick={() => setModalMode(null)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Publicar Artículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
