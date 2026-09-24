import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useApp } from "../context/AppContext";
import {
  Search,
  Filter,
  X,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  Briefcase,
  GraduationCap,
  BookOpen,
  Award,
  Megaphone,
  Layers,
  ArrowRight
} from "lucide-react";
import OpportunityCard from "../components/OpportunityCard";
import { fuzzySearchOpportunities } from "../utils/fuzzySearch";
import { calculateUrgency } from "../utils/urgency";

export default function ExploreView() {
  const {
    opportunities,
    searchFilters,
    setSearchFilters
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const searchTerm = searchFilters.query || "";

  // Prevent background scrolling when mobile filter modal is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  // Update query in context when typing
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchFilters(prev => ({ ...prev, query: val }));
  };

  const handleApplySuggestion = (suggestionText) => {
    setSearchFilters(prev => ({ ...prev, query: suggestionText }));
  };

  const handleCategorySelect = (catId) => {
    setSearchFilters(prev => ({
      ...prev,
      category: catId,
      specific: {} // reset specific context filters on category switch
    }));
  };

  const handleModalitySelect = (mod) => {
    setSearchFilters(prev => ({ ...prev, modality: mod }));
  };

  const handleCostSelect = (cost) => {
    setSearchFilters(prev => ({ ...prev, cost: cost }));
  };

  const handleSpecificFilterChange = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      specific: {
        ...prev.specific,
        [key]: prev.specific?.[key] === value ? undefined : value
      }
    }));
  };

  const handleSortChange = (sortType) => {
    setSearchFilters(prev => ({ ...prev, sort: sortType }));
  };

  const clearAllFilters = () => {
    setSearchFilters({
      query: "",
      category: "todas",
      modality: "todas",
      cost: "todas",
      specific: {},
      sort: "relevancia"
    });
  };

  // 1. Fuzzy Search evaluation
  const searchEvaluation = useMemo(() => {
    return fuzzySearchOpportunities(opportunities, searchFilters.query);
  }, [opportunities, searchFilters.query]);

  // 2. Faceted filters
  const filteredResults = useMemo(() => {
    let list = [...searchEvaluation.results];

    // Filter by Category
    if (searchFilters.category && searchFilters.category !== "todas") {
      if (searchFilters.category === "aprender") {
        list = list.filter(item => item.category === "curso" || item.category === "certificacion");
      } else {
        list = list.filter(item => item.category === searchFilters.category);
      }
    }

    // Filter by Modality
    if (searchFilters.modality && searchFilters.modality !== "todas") {
      list = list.filter(item => item.modality === searchFilters.modality);
    }

    // Filter by Cost
    if (searchFilters.cost && searchFilters.cost !== "todas") {
      list = list.filter(item => item.cost === searchFilters.cost);
    }

    // Context-dependent specific filters
    const spec = searchFilters.specific || {};

    if (searchFilters.category === "empleo") {
      if (spec.jornada) {
        list = list.filter(item => item.specificFilters?.jornada === spec.jornada);
      }
      if (spec.remuneracion) {
        list = list.filter(item => item.specificFilters?.remuneracion === spec.remuneracion);
      }
    } else if (searchFilters.category === "curso" || searchFilters.category === "certificacion" || searchFilters.category === "aprender") {
      if (spec.duracion) {
        list = list.filter(item => item.specificFilters?.duracion === spec.duracion);
      }
      if (spec.nivel) {
        list = list.filter(item => item.specificFilters?.nivel === spec.nivel);
      }
      if (spec.certificacionOficial !== undefined) {
        list = list.filter(item => item.specificFilters?.certificacionOficial === spec.certificacionOficial);
      }
    } else if (searchFilters.category === "beca") {
      if (spec.nivelEducativo) {
        list = list.filter(item => item.specificFilters?.nivelEducativo === spec.nivelEducativo);
      }
      if (spec.cobertura) {
        list = list.filter(item => item.specificFilters?.cobertura === spec.cobertura);
      }
    } else if (searchFilters.category === "convocatoria") {
      if (spec.tipo) {
        list = list.filter(item => item.specificFilters?.tipo === spec.tipo);
      }
    }

    // 3. Sorting
    if (searchFilters.sort === "urgencia") {
      list.sort((a, b) => {
        const diffA = calculateUrgency(a.closingDate).daysRemaining ?? 999;
        const diffB = calculateUrgency(b.closingDate).daysRemaining ?? 999;
        return diffA - diffB;
      });
    } else if (searchFilters.sort === "recientes") {
      list.reverse();
    }

    return list;
  }, [searchEvaluation.results, searchFilters]);

  const hasActiveFilters = Boolean(
    searchFilters.query ||
    searchFilters.category !== "todas" ||
    searchFilters.modality !== "todas" ||
    searchFilters.cost !== "todas" ||
    Object.values(searchFilters.specific || {}).some(Boolean)
  );

  // Common Faceted Filter Body
  const renderFilterBody = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Category Global */}
      <div>
        <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "0.6rem", letterSpacing: "0.05em" }}>
          Categoría Global
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {[
            { id: "todas", label: "Todas las categorías", icon: <Layers size={14} /> },
            { id: "empleo", label: "Empleos & Pasantías", icon: <Briefcase size={14} /> },
            { id: "aprender", label: "Cursos & Certificaciones", icon: <BookOpen size={14} /> },
            { id: "beca", label: "Becas & Financiamiento", icon: <GraduationCap size={14} /> },
            { id: "curso", label: "Solo Cursos", icon: <BookOpen size={14} /> },
            { id: "certificacion", label: "Solo Certificaciones", icon: <Award size={14} /> },
            { id: "convocatoria", label: "Convocatorias", icon: <Megaphone size={14} /> }
          ].map(cat => {
            const isSelected = searchFilters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.55rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  background: isSelected ? "rgba(99, 102, 241, 0.18)" : "transparent",
                  color: isSelected ? "#ffffff" : "var(--text-muted)",
                  fontWeight: isSelected ? 600 : 400,
                  fontSize: "0.85rem",
                  border: isSelected ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid transparent",
                  textAlign: "left",
                  minHeight: "44px",
                  cursor: "pointer"
                }}
              >
                <span style={{ color: isSelected ? "var(--primary-light)" : "var(--text-dim)" }}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modality */}
      <div>
        <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "0.6rem", letterSpacing: "0.05em" }}>
          Modalidad
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
          {[
            { id: "todas", label: "Cualquiera" },
            { id: "remoto", label: "Remoto" },
            { id: "hibrido", label: "Híbrido" },
            { id: "presencial", label: "Presencial" }
          ].map(mod => {
            const isSelected = searchFilters.modality === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleModalitySelect(mod.id)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "var(--radius-sm)",
                  background: isSelected ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.04)",
                  border: isSelected ? "1px solid var(--primary-light)" : "1px solid var(--border-subtle)",
                  color: isSelected ? "#ffffff" : "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? 600 : 400,
                  minHeight: "44px",
                  cursor: "pointer"
                }}
              >
                {mod.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cost */}
      <div>
        <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "0.6rem", letterSpacing: "0.05em" }}>
          Costo / Inversión
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {[
            { id: "todas", label: "Todos los costos" },
            { id: "gratis", label: "100% Gratis / Sin costo" },
            { id: "beca_100", label: "Con Beca Completa (100%)" },
            { id: "de_pago", label: "De Pago / Financiable" }
          ].map(cost => {
            const isSelected = searchFilters.cost === cost.id;
            return (
              <button
                key={cost.id}
                onClick={() => handleCostSelect(cost.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.55rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  background: isSelected ? "rgba(16, 185, 129, 0.18)" : "transparent",
                  border: isSelected ? "1px solid rgba(16, 185, 129, 0.35)" : "1px solid transparent",
                  color: isSelected ? "#34d399" : "var(--text-muted)",
                  fontSize: "0.825rem",
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: "left",
                  minHeight: "44px",
                  cursor: "pointer"
                }}
              >
                <span>{cost.label}</span>
                {isSelected && <Check size={14} color="#10b981" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Context Specific: Empleo */}
      {searchFilters.category === "empleo" && (
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
          <span className="badge" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", marginBottom: "0.75rem", display: "inline-block" }}>
            Filtros Específicos: Empleo
          </span>

          <div style={{ marginBottom: "0.85rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.4rem" }}>
              Tipo de Jornada
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {[
                { id: "pasantia", label: "Pasantía / Prácticas" },
                { id: "tiempo_completo", label: "Tiempo Completo" },
                { id: "medio_tiempo", label: "Medio Tiempo" }
              ].map(j => (
                <button
                  key={j.id}
                  onClick={() => handleSpecificFilterChange("jornada", j.id)}
                  style={{
                    padding: "0.45rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: searchFilters.specific?.jornada === j.id ? "rgba(59, 130, 246, 0.25)" : "rgba(255,255,255,0.03)",
                    color: searchFilters.specific?.jornada === j.id ? "#93c5fd" : "var(--text-muted)",
                    fontSize: "0.8rem",
                    textAlign: "left",
                    minHeight: "44px",
                    cursor: "pointer"
                  }}
                >
                  {j.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.4rem" }}>
              Remuneración
            </label>
            <button
              onClick={() => handleSpecificFilterChange("remuneracion", "remunerado")}
              style={{
                width: "100%",
                padding: "0.45rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                background: searchFilters.specific?.remuneracion === "remunerado" ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.03)",
                color: searchFilters.specific?.remuneracion === "remunerado" ? "#34d399" : "var(--text-muted)",
                fontSize: "0.8rem",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "44px",
                cursor: "pointer"
              }}
            >
              <span>Con Sueldo / Remunerado</span>
              {searchFilters.specific?.remuneracion === "remunerado" && <Check size={14} color="#10b981" />}
            </button>
          </div>
        </div>
      )}

      {/* Context Specific: Cursos & Certs */}
      {(searchFilters.category === "curso" || searchFilters.category === "certificacion" || searchFilters.category === "aprender") && (
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
          <span className="badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", marginBottom: "0.75rem", display: "inline-block" }}>
            Filtros Específicos: Cursos & Certs
          </span>

          <div style={{ marginBottom: "0.85rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.4rem" }}>
              Duración Estimada
            </label>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {[
                { id: "corta", label: "< 1 mes" },
                { id: "media", label: "1-3 meses" },
                { id: "larga", label: "> 3 meses" }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => handleSpecificFilterChange("duracion", d.id)}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.25rem",
                    borderRadius: "var(--radius-sm)",
                    background: searchFilters.specific?.duracion === d.id ? "rgba(16, 185, 129, 0.25)" : "rgba(255,255,255,0.03)",
                    color: searchFilters.specific?.duracion === d.id ? "#34d399" : "var(--text-muted)",
                    fontSize: "0.75rem",
                    minHeight: "44px",
                    cursor: "pointer"
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.4rem" }}>
              Nivel de Dificultad
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {["principiante", "intermedio", "avanzado"].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleSpecificFilterChange("nivel", lvl)}
                  style={{
                    padding: "0.45rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: searchFilters.specific?.nivel === lvl ? "rgba(16, 185, 129, 0.25)" : "rgba(255,255,255,0.03)",
                    color: searchFilters.specific?.nivel === lvl ? "#34d399" : "var(--text-muted)",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                    textAlign: "left",
                    minHeight: "44px",
                    cursor: "pointer"
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Context Specific: Becas */}
      {searchFilters.category === "beca" && (
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
          <span className="badge" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#c084fc", marginBottom: "0.75rem", display: "inline-block" }}>
            Filtros Específicos: Becas
          </span>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", display: "block", marginBottom: "0.4rem" }}>
              Nivel Educativo
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {[
                { id: "secundaria", label: "Preparatoria / Bachillerato" },
                { id: "universitario", label: "Universidad / Pregrado" },
                { id: "posgrado", label: "Posgrado / Maestría" }
              ].map(n => (
                <button
                  key={n.id}
                  onClick={() => handleSpecificFilterChange("nivelEducativo", n.id)}
                  style={{
                    padding: "0.45rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: searchFilters.specific?.nivelEducativo === n.id ? "rgba(168, 85, 247, 0.25)" : "rgba(255,255,255,0.03)",
                    color: searchFilters.specific?.nivelEducativo === n.id ? "#d8b4fe" : "var(--text-muted)",
                    fontSize: "0.8rem",
                    textAlign: "left",
                    minHeight: "44px",
                    cursor: "pointer"
                  }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        
        {/* Page Title */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Explorar <span className="text-gradient">Oportunidades</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "620px" }}>
            Busca y filtra entre ofertas verificadas de empleo, becas de estudio, certificaciones y fondos de financiamiento.
          </p>
        </div>

        {/* Big Search Input (100% width on mobile) */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <div
            className="glass-panel"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-focus)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              background: "rgba(21, 27, 46, 0.88)"
            }}
          >
            <Search size={22} color="var(--primary-light)" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por cargo, habilidad (Python, React), institución o tema..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "var(--text-main)",
                fontSize: "1.05rem",
                minHeight: "44px"
              }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchFilters(prev => ({ ...prev, query: "" }));
                }}
                className="btn-icon"
                style={{ width: "36px", height: "36px", minWidth: "36px", minHeight: "36px" }}
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Fuzzy Search Suggestion Banner */}
          {searchEvaluation.suggestion && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: "0.75rem",
                padding: "0.6rem 1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                color: "#c7d2fe"
              }}
            >
              <Sparkles size={16} color="var(--primary-light)" />
              <span>
                ¿Quizás quisiste decir:{" "}
                <button
                  onClick={() => handleApplySuggestion(searchEvaluation.suggestion)}
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  "{searchEvaluation.suggestion}"
                </button>
                ?
              </span>
            </div>
          )}
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              padding: "0.6rem 1rem",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontWeight: 600 }}>
              Filtros activos:
            </span>

            {searchFilters.query && (
              <span className="badge badge-pill-tag" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc" }}>
                Búsqueda: "{searchFilters.query}"
                <X
                  size={12}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                  onClick={() => setSearchFilters(prev => ({ ...prev, query: "" }))}
                />
              </span>
            )}

            {searchFilters.category !== "todas" && (
              <span className="badge badge-pill-tag" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc" }}>
                Categoría: {searchFilters.category === "aprender" ? "Cursos & Certificaciones" : searchFilters.category}
                <X
                  size={12}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                  onClick={() => handleCategorySelect("todas")}
                />
              </span>
            )}

            {searchFilters.modality !== "todas" && (
              <span className="badge badge-pill-tag">
                Modalidad: {searchFilters.modality}
                <X
                  size={12}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                  onClick={() => handleModalitySelect("todas")}
                />
              </span>
            )}

            {searchFilters.cost !== "todas" && (
              <span className="badge badge-pill-tag">
                Costo: {searchFilters.cost.replace("_", " ")}
                <X
                  size={12}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                  onClick={() => handleCostSelect("todas")}
                />
              </span>
            )}

            {Object.entries(searchFilters.specific || {}).map(([key, val]) => {
              if (!val) return null;
              return (
                <span key={key} className="badge badge-pill-tag" style={{ color: "#38bdf8" }}>
                  {key}: {String(val)}
                  <X
                    size={12}
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                    onClick={() => handleSpecificFilterChange(key, val)}
                  />
                </span>
              );
            })}

            <button
              onClick={clearAllFilters}
              style={{
                marginLeft: "auto",
                fontSize: "0.78rem",
                color: "#f87171",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontWeight: 600,
                cursor: "pointer",
                minHeight: "44px",
                padding: "0.25rem 0.5rem"
              }}
            >
              <RotateCcw size={12} /> Limpiar filtros
            </button>
          </div>
        )}

        {/* Top Controls: Mobile Filter Button & Sorting */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          {/* Mobile Filter Toggle Button (hidden on desktop >=1024px) */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn btn-secondary mobile-filter-trigger"
            style={{
              fontSize: "0.85rem",
              padding: "0.55rem 1rem",
              minHeight: "44px"
            }}
          >
            <Filter size={15} color="var(--primary-light)" />
            <span>Filtros {hasActiveFilters && "•"}</span>
          </button>

          <span className="hidden sm:inline" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Mostrando <strong style={{ color: "var(--text-main)" }}>{filteredResults.length}</strong> {filteredResults.length === 1 ? "oportunidad" : "oportunidades"}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--text-dim)" }}>Ordenar por:</span>
            <select
              value={searchFilters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "0.5rem 0.85rem",
                color: "var(--text-main)",
                fontSize: "0.85rem",
                minHeight: "44px"
              }}
            >
              <option value="relevancia">Relevancia</option>
              <option value="urgencia">Cierre más próximo</option>
              <option value="recientes">Más recientes</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Desktop Sidebar + Results Grid */}
        <div className="explore-main-layout">
          
          {/* DESKTOP SIDEBAR (hidden on mobile, visible on desktop >=1024px) */}
          <aside
            className="glass-panel explore-desktop-sidebar"
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              height: "fit-content",
              position: "sticky",
              top: "90px",
              background: "rgba(21, 27, 46, 0.85)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Filter size={16} color="var(--primary-light)" />
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Filtros de Búsqueda</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{ fontSize: "0.75rem", color: "var(--text-dim)", textDecoration: "underline", cursor: "pointer" }}
                >
                  Restablecer
                </button>
              )}
            </div>

            {renderFilterBody()}
          </aside>

          {/* MAIN RESULTS COLUMN */}
          <main style={{ minWidth: 0, width: "100%" }}>
            {filteredResults.length > 0 ? (
              /* Grid of cards: spacious with 1.75rem gap */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1.75rem"
                }}
              >
                {filteredResults.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : (
              /* Zero Results Prevention */
              <div
                className="glass-panel animate-fade-in"
                style={{
                  padding: "3.5rem 2rem",
                  textAlign: "center",
                  borderRadius: "var(--radius-xl)",
                  border: "1px dashed rgba(255, 255, 255, 0.15)",
                  background: "rgba(21, 27, 46, 0.65)"
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(244, 63, 94, 0.1)",
                    color: "#f43f5e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem"
                  }}
                >
                  <AlertCircle size={32} />
                </div>

                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                  No encontramos resultados exactos
                </h3>
                <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 1.75rem", fontSize: "0.95rem" }}>
                  Los filtros aplicados no coinciden con ninguna oportunidad activa. Para evitar callejones sin salida, prueba restablecer los filtros o explorar opciones populares:
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem", marginBottom: "2rem" }}>
                  <button onClick={clearAllFilters} className="btn btn-primary" style={{ minHeight: "44px" }}>
                    <RotateCcw size={15} /> Restablecer todos los filtros
                  </button>

                  <button
                    onClick={() => {
                      clearAllFilters();
                      handleCostSelect("gratis");
                    }}
                    className="btn btn-secondary"
                    style={{ minHeight: "44px" }}
                  >
                    Ver cursos gratuitos
                  </button>

                  <button
                    onClick={() => {
                      clearAllFilters();
                      handleCategorySelect("empleo");
                    }}
                    className="btn btn-secondary"
                    style={{ minHeight: "44px" }}
                  >
                    Ver pasantías abiertas
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "2rem", marginTop: "1rem" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem", textAlign: "left" }}>
                    Sugerencias que podrían interesarte:
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
                      gap: "1.5rem",
                      textAlign: "left"
                    }}
                  >
                    {opportunities.slice(0, 2).map((sug) => (
                      <OpportunityCard key={sug.id} opportunity={sug} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER (Mounted via Portal into document.body to prevent backdrop-filter clipping) */}
      {mobileFilterOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 99999,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            {/* Dark Backdrop */}
            <div
              onClick={() => setMobileFilterOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)"
              }}
            />

            {/* Slide-over Drawer Panel */}
            <div
              className="animate-fade-in"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "360px",
                height: "100%",
                maxHeight: "100vh",
                background: "var(--bg-secondary)",
                borderLeft: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                overflowY: "auto",
                zIndex: 100000
              }}
            >
              <div>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    marginBottom: "1rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Filter size={18} color="var(--primary-light)" />
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Filtros de Búsqueda</h3>
                  </div>

                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="btn-icon"
                    style={{
                      width: "44px",
                      height: "44px",
                      minWidth: "44px",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-main)"
                    }}
                    aria-label="Cerrar filtros"
                  >
                    <X size={20} />
                  </button>
                </div>

                {hasActiveFilters && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--primary-light)" }}>Hay filtros aplicados</span>
                    <button
                      onClick={clearAllFilters}
                      style={{ fontSize: "0.8rem", color: "#f87171", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}
                    >
                      Restablecer todos
                    </button>
                  </div>
                )}

                {/* Filter Options */}
                {renderFilterBody()}
              </div>

              {/* Bottom Apply Action */}
              <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)", marginTop: "1.5rem" }}>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="btn btn-primary"
                  style={{ width: "100%", minHeight: "48px", fontSize: "0.95rem", fontWeight: 700 }}
                >
                  <span>Ver {filteredResults.length} {filteredResults.length === 1 ? "resultado" : "resultados"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Responsive layout styles */}
      <style>{`
        .explore-main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .explore-main-layout {
            grid-template-columns: 280px 1fr !important;
          }
          .explore-desktop-sidebar {
            display: block !important;
          }
          .mobile-filter-trigger {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .explore-desktop-sidebar {
            display: none !important;
          }
          .mobile-filter-trigger {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
