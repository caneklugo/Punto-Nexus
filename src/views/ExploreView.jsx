import React, { useState, useMemo, useEffect } from "react";
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

  // Common Faceted Filter Body for both Desktop Sidebar and Mobile Drawer Modal
  const renderFilterBody = (isMobile = false) => (
    <div className="space-y-5">
      {/* Category Global */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Categoría Global
        </label>
        <div className="space-y-1">
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
                className={`w-full min-h-[44px] flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left ${
                  isSelected
                    ? "bg-indigo-600/25 text-indigo-300 border border-indigo-500/40 font-semibold"
                    : "text-slate-300 hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className={isSelected ? "text-indigo-400" : "text-slate-400"}>
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
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Modalidad
        </label>
        <div className="grid grid-cols-2 gap-1.5">
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
                className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs font-medium transition-all text-center ${
                  isSelected
                    ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 font-semibold"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                {mod.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cost */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Costo / Inversión
        </label>
        <div className="space-y-1">
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
                className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left ${
                  isSelected
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                    : "text-slate-300 hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>{cost.label}</span>
                {isSelected && <Check size={14} className="text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Context Specific Filters: Empleo */}
      {searchFilters.category === "empleo" && (
        <div className="border-t border-white/10 pt-4 space-y-3">
          <span className="badge bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Filtros Específicos: Empleo
          </span>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
              Tipo de Jornada
            </label>
            <div className="space-y-1">
              {[
                { id: "pasantia", label: "Pasantía / Prácticas" },
                { id: "tiempo_completo", label: "Tiempo Completo" },
                { id: "medio_tiempo", label: "Medio Tiempo" }
              ].map(j => (
                <button
                  key={j.id}
                  onClick={() => handleSpecificFilterChange("jornada", j.id)}
                  className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-all ${
                    searchFilters.specific?.jornada === j.id
                      ? "bg-blue-600/30 text-blue-200 border border-blue-500/40 font-semibold"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  {j.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
              Remuneración
            </label>
            <button
              onClick={() => handleSpecificFilterChange("remuneracion", "remunerado")}
              className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm text-left flex items-center justify-between transition-all ${
                searchFilters.specific?.remuneracion === "remunerado"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent"
              }`}
            >
              <span>Con Sueldo / Remunerado</span>
              {searchFilters.specific?.remuneracion === "remunerado" && <Check size={14} className="text-emerald-400" />}
            </button>
          </div>
        </div>
      )}

      {/* Context Specific Filters: Cursos & Certificaciones */}
      {(searchFilters.category === "curso" || searchFilters.category === "certificacion" || searchFilters.category === "aprender") && (
        <div className="border-t border-white/10 pt-4 space-y-3">
          <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Filtros Específicos: Cursos & Certs
          </span>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
              Duración Estimada
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "corta", label: "< 1 mes" },
                { id: "media", label: "1-3 meses" },
                { id: "larga", label: "> 3 meses" }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => handleSpecificFilterChange("duracion", d.id)}
                  className={`min-h-[44px] py-2 px-1 text-xs rounded-xl text-center transition-all ${
                    searchFilters.specific?.duracion === d.id
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-semibold"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
              Nivel de Dificultad
            </label>
            <div className="space-y-1">
              {["principiante", "intermedio", "avanzado"].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleSpecificFilterChange("nivel", lvl)}
                  className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm capitalize text-left transition-all ${
                    searchFilters.specific?.nivel === lvl
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-semibold"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Context Specific Filters: Becas */}
      {searchFilters.category === "beca" && (
        <div className="border-t border-white/10 pt-4 space-y-3">
          <span className="badge bg-purple-500/15 text-purple-400 border border-purple-500/30">
            Filtros Específicos: Becas
          </span>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
              Nivel Educativo
            </label>
            <div className="space-y-1">
              {[
                { id: "secundaria", label: "Preparatoria / Bachillerato" },
                { id: "universitario", label: "Universidad / Pregrado" },
                { id: "posgrado", label: "Posgrado / Maestría" }
              ].map(n => (
                <button
                  key={n.id}
                  onClick={() => handleSpecificFilterChange("nivelEducativo", n.id)}
                  className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-all ${
                    searchFilters.specific?.nivelEducativo === n.id
                      ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 font-semibold"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent"
                  }`}
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
    <div className="animate-fade-in px-4 sm:px-6 md:px-8 py-6 sm:py-10 pb-16">
      <div className="container mx-auto">
        
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">
            Explorar <span className="text-gradient">Oportunidades</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl">
            Busca y filtra entre ofertas verificadas de empleo, becas de estudio, certificaciones y fondos de financiamiento.
          </p>
        </div>

        {/* Big Search Input (100% width on mobile) */}
        <div className="relative mb-4 sm:mb-6">
          <div className="glass-panel w-full flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border border-indigo-500/40 shadow-lg bg-slate-900/90">
            <Search size={22} className="text-indigo-400 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por cargo, habilidad (Python, React), institución o tema..."
              className="w-full min-h-[44px] bg-transparent border-none text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchFilters(prev => ({ ...prev, query: "" }));
                }}
                className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white"
                aria-label="Limpiar texto de búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Fuzzy Search Suggestion Banner */}
          {searchEvaluation.suggestion && (
            <div className="mt-2.5 p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center gap-2 text-xs sm:text-sm text-indigo-200 animate-fade-in">
              <Sparkles size={16} className="text-indigo-400 flex-shrink-0" />
              <span>
                ¿Quizás quisiste decir:{" "}
                <button
                  onClick={() => handleApplySuggestion(searchEvaluation.suggestion)}
                  className="font-bold underline text-white hover:text-indigo-300"
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
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 font-semibold">
              Filtros activos:
            </span>

            {searchFilters.query && (
              <span className="badge badge-pill-tag text-xs bg-indigo-500/20 text-indigo-300">
                Búsqueda: "{searchFilters.query}"
                <X
                  size={12}
                  className="cursor-pointer ml-1 inline"
                  onClick={() => setSearchFilters(prev => ({ ...prev, query: "" }))}
                />
              </span>
            )}

            {searchFilters.category !== "todas" && (
              <span className="badge badge-pill-tag text-xs bg-indigo-500/20 text-indigo-300">
                Categoría: {searchFilters.category === "aprender" ? "Cursos & Certs" : searchFilters.category}
                <X
                  size={12}
                  className="cursor-pointer ml-1 inline"
                  onClick={() => handleCategorySelect("todas")}
                />
              </span>
            )}

            {searchFilters.modality !== "todas" && (
              <span className="badge badge-pill-tag text-xs">
                Modalidad: {searchFilters.modality}
                <X
                  size={12}
                  className="cursor-pointer ml-1 inline"
                  onClick={() => handleModalitySelect("todas")}
                />
              </span>
            )}

            {searchFilters.cost !== "todas" && (
              <span className="badge badge-pill-tag text-xs">
                Costo: {searchFilters.cost.replace("_", " ")}
                <X
                  size={12}
                  className="cursor-pointer ml-1 inline"
                  onClick={() => handleCostSelect("todas")}
                />
              </span>
            )}

            {Object.entries(searchFilters.specific || {}).map(([key, val]) => {
              if (!val) return null;
              return (
                <span key={key} className="badge badge-pill-tag text-xs text-cyan-400">
                  {key}: {String(val)}
                  <X
                    size={12}
                    className="cursor-pointer ml-1 inline"
                    onClick={() => handleSpecificFilterChange(key, val)}
                  />
                </span>
              );
            })}

            <button
              onClick={clearAllFilters}
              className="min-h-[44px] ml-auto text-xs text-rose-400 hover:text-rose-300 font-semibold inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-rose-500/10"
            >
              <RotateCcw size={13} /> Limpiar todos
            </button>
          </div>
        )}

        {/* Mobile Filter Toggle & Sort Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Mobile Filter Trigger Button (hidden on desktop lg:hidden) */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden btn btn-secondary min-h-[44px] py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 border-indigo-500/30"
          >
            <Filter size={16} className="text-indigo-400" />
            <span>Filtros</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
            )}
          </button>

          {/* Results count label */}
          <span className="text-xs sm:text-sm text-slate-400 hidden sm:inline">
            Mostrando <strong className="text-white">{filteredResults.length}</strong> {filteredResults.length === 1 ? "oportunidad" : "oportunidades"}
          </span>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 hidden xs:inline">Ordenar:</span>
            <select
              value={searchFilters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="min-h-[44px] py-2 px-3 bg-slate-900 border border-white/15 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="relevancia">Relevancia</option>
              <option value="urgencia">Cierre próximo</option>
              <option value="recientes">Más recientes</option>
            </select>
          </div>
        </div>

        {/* Main Grid Layout: Desktop Sidebar + Results Cards */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS (hidden on mobile, visible on lg+) */}
          <aside className="hidden lg:block w-72 lg:w-80 flex-shrink-0 glass-panel p-5 rounded-2xl border border-white/10 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto bg-slate-900/70">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filtros</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-slate-400 hover:text-rose-400 underline font-semibold"
                >
                  Restablecer
                </button>
              )}
            </div>

            {renderFilterBody(false)}
          </aside>

          {/* MAIN RESULTS COLUMN */}
          <main className="w-full flex-1 min-w-0">
            {filteredResults.length > 0 ? (
              /* Grid: 1 col on mobile (grid-cols-1), 2 on tablet (md:grid-cols-2), 3 on desktop (xl:grid-cols-3) */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredResults.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : (
              /* Zero Results Prevention View */
              <div className="glass-panel p-8 sm:p-12 text-center rounded-2xl border border-dashed border-white/15 bg-slate-900/60">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  No encontramos resultados exactos
                </h3>
                <p className="text-slate-400 max-w-md mx-auto text-xs sm:text-sm mb-6 leading-relaxed">
                  Los filtros actuales no coinciden con ninguna ficha activa. Para evitar callejones sin salida, prueba restablecer o explorar opciones populares:
                </p>

                <div className="flex flex-wrap justify-center gap-2.5 mb-8">
                  <button
                    onClick={clearAllFilters}
                    className="btn btn-primary min-h-[44px] py-2.5 px-5 text-xs sm:text-sm font-semibold rounded-xl"
                  >
                    <RotateCcw size={15} /> Restablecer filtros
                  </button>

                  <button
                    onClick={() => {
                      clearAllFilters();
                      handleCostSelect("gratis");
                    }}
                    className="btn btn-secondary min-h-[44px] py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl"
                  >
                    Ver cursos gratuitos
                  </button>

                  <button
                    onClick={() => {
                      clearAllFilters();
                      handleCategorySelect("empleo");
                    }}
                    className="btn btn-secondary min-h-[44px] py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl"
                  >
                    Ver pasantías abiertas
                  </button>
                </div>

                {/* Suggestions */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-left">
                    Sugerencias que podrían interesarte:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
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

      {/* MOBILE FILTERS MODAL / BOTTOM SHEET (Drawer with backdrop - does not push content down) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-slate-900 border-l border-white/10 h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-fade-in">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-100">Filtros de Búsqueda</h3>
                </div>
                
                {/* Close Button (44x44px min touch target) */}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                  aria-label="Cerrar filtros"
                >
                  <X size={20} />
                </button>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                  <span className="text-xs text-indigo-300">Hay filtros aplicados</span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-400 font-semibold underline"
                  >
                    Restablecer todos
                  </button>
                </div>
              )}

              {/* Filter Options */}
              {renderFilterBody(true)}
            </div>

            {/* Bottom Apply Action */}
            <div className="pt-4 border-t border-white/10 mt-6 sticky bottom-0 bg-slate-900 pb-1">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary w-full min-h-[48px] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <span>Ver {filteredResults.length} {filteredResults.length === 1 ? "resultado" : "resultados"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
