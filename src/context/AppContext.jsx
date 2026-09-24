import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_OPPORTUNITIES, INITIAL_ARTICLES } from "../data/initialData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. User & Role Management ('visitor' | 'user' | 'admin')
  const [currentUserRole, setCurrentUserRole] = useState(() => {
    return localStorage.getItem("nexus_user_role") || "visitor";
  });

  const [registeredProfile, setRegisteredProfile] = useState(() => {
    const saved = localStorage.getItem("nexus_registered_profile");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return {
      name: "Sofía Martínez",
      email: "sofia.martinez@nexus.dev",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      education: "Estudiante de Ingeniería de Software (7mo semestre)",
      interests: ["empleo", "curso", "beca"],
      alertsEnabled: true,
      alertEmailFrequency: "semanal"
    };
  });

  // 2. Opportunities Store (Persistent in localStorage)
  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem("nexus_opportunities");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_OPPORTUNITIES;
  });

  // 3. Articles Store
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("nexus_articles");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_ARTICLES;
  });

  // 4. Saved Favorites (Array of Opportunity IDs)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("nexus_favorites");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return ["opp-ml-junior-fe", "opp-santander-beca-skills"];
  });

  // 5. Application Tracking for User Board
  const [applicationTracker, setApplicationTracker] = useState(() => {
    const saved = localStorage.getItem("nexus_tracker");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return {
      "opp-ml-junior-fe": "postulado",
      "opp-santander-beca-skills": "guardado"
    };
  });

  // 6. Navigation & Routing (Synchronized with URL hash)
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace("#", "") || "/";
    return hash;
  });

  const [routeParams, setRouteParams] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("/oportunidad/")) {
      return { id: hash.replace("/oportunidad/", "") };
    }
    return {};
  });

  // 7. Search & Exploration Filters
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    category: "todas",
    modality: "todas",
    cost: "todas",
    specific: {},
    sort: "relevancia"
  });

  // 8. Toasts notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("nexus_user_role", currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    localStorage.setItem("nexus_opportunities", JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem("nexus_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("nexus_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("nexus_tracker", JSON.stringify(applicationTracker));
  }, [applicationTracker]);

  useEffect(() => {
    localStorage.setItem("nexus_registered_profile", JSON.stringify(registeredProfile));
  }, [registeredProfile]);

  // Listen to browser hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "/";
      if (hash.startsWith("/oportunidad/")) {
        const id = hash.replace("/oportunidad/", "");
        setCurrentRoute("/oportunidad/:id");
        setRouteParams({ id });
      } else {
        setCurrentRoute(hash);
        setRouteParams({});
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial parse
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigate helper
  const navigateTo = (route, params = {}) => {
    let targetHash = route;
    if (route === "/oportunidad/:id" && params.id) {
      targetHash = `/oportunidad/${params.id}`;
    }
    window.location.hash = targetHash;
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Role Switcher
  const switchRole = (newRole) => {
    setCurrentUserRole(newRole);
    if (newRole === "admin") {
      showToast("Modo Administrador activado: Acceso a gestión de fichas y publicaciones", "success");
    } else if (newRole === "user") {
      showToast("Conectado como Sofía Martínez (Usuario Registrado)", "info");
    } else {
      showToast("Navegando como Visitante anónimo", "info");
    }
  };

  // Toggle Favorite
  const toggleFavorite = (oppId) => {
    if (currentUserRole === "visitor") {
      // Prompt user about registered benefit
      showToast("¡Tip! Regístrate para sincronizar favoritos y recibir alertas personalizadas.", "warning");
      // Still allow visitor to bookmark locally for awesome UX!
    }

    setFavorites(prev => {
      const isAlready = prev.includes(oppId);
      if (isAlready) {
        showToast("Oportunidad eliminada de tu tablero", "info");
        return prev.filter(id => id !== oppId);
      } else {
        showToast("Guardado en tu tablero personal", "success");
        return [...prev, oppId];
      }
    });
  };

  const isFavorite = (oppId) => favorites.includes(oppId);

  // Application tracker update
  const updateApplicationStatus = (oppId, newStatus) => {
    setApplicationTracker(prev => ({
      ...prev,
      [oppId]: newStatus
    }));
    showToast(`Estado de postulación actualizado: ${newStatus.toUpperCase()}`, "success");
  };

  // Intent Chips Quick-actions
  const applyQuickIntent = (intentType) => {
    if (intentType === "empleo") {
      setSearchFilters({
        query: "",
        category: "empleo",
        modality: "todas",
        cost: "todas",
        specific: {},
        sort: "relevancia"
      });
      navigateTo("/explorar");
    } else if (intentType === "aprender") {
      // User requested: "Quiero Aprender" -> redirects to /explorar precargando Cursos y Certificaciones
      setSearchFilters({
        query: "",
        category: "aprender",
        modality: "todas",
        cost: "todas",
        specific: {},
        sort: "relevancia"
      });
      navigateTo("/explorar");
    } else if (intentType === "financiamiento") {
      setSearchFilters({
        query: "",
        category: "beca",
        modality: "todas",
        cost: "todas",
        specific: {},
        sort: "relevancia"
      });
      navigateTo("/explorar");
    } else if (intentType === "convocatoria") {
      setSearchFilters({
        query: "",
        category: "convocatoria",
        modality: "todas",
        cost: "todas",
        specific: {},
        sort: "relevancia"
      });
      navigateTo("/explorar");
    }
  };

  // Admin Actions for Opportunities
  const addOpportunity = (newOpp) => {
    const fullOpp = {
      ...newOpp,
      id: newOpp.id || `opp-custom-${Date.now()}`
    };
    setOpportunities(prev => [fullOpp, ...prev]);
    showToast("Ficha de oportunidad creada y publicada con éxito", "success");
    return fullOpp;
  };

  const updateOpportunity = (updatedOpp) => {
    setOpportunities(prev => prev.map(o => o.id === updatedOpp.id ? updatedOpp : o));
    showToast("Ficha de oportunidad actualizada correctamente", "success");
  };

  const deleteOpportunity = (id) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    setFavorites(prev => prev.filter(favId => favId !== id));
    showToast("Ficha eliminada del sistema", "info");
  };

  const toggleFeatured = (id) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === id) {
        const nextState = !o.featured;
        showToast(nextState ? "Ficha marcada como Destacada en la Home" : "Ficha retirada de Destacados", "info");
        return { ...o, featured: nextState };
      }
      return o;
    }));
  };

  // Admin Actions for Articles
  const addArticle = (newArt) => {
    const fullArt = {
      ...newArt,
      id: newArt.id || `art-custom-${Date.now()}`
    };
    setArticles(prev => [fullArt, ...prev]);
    showToast("Artículo publicado en el feed de recursos", "success");
    return fullArt;
  };

  const deleteArticle = (id) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    showToast("Artículo eliminado", "info");
  };

  return (
    <AppContext.Provider
      value={{
        currentUserRole,
        setCurrentUserRole,
        switchRole,
        registeredProfile,
        setRegisteredProfile,
        opportunities,
        articles,
        favorites,
        toggleFavorite,
        isFavorite,
        applicationTracker,
        updateApplicationStatus,
        currentRoute,
        routeParams,
        navigateTo,
        searchFilters,
        setSearchFilters,
        applyQuickIntent,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        toggleFeatured,
        addArticle,
        deleteArticle,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
