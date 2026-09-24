import React, { useState, useRef, useEffect } from "react";
import { Compass, Bookmark, ShieldCheck, Newspaper, User, ChevronDown, Check, Menu, X, PlusCircle, Search, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import logoIcon from "../assets/logo-icon.png";

export default function Navbar() {
  const {
    currentUserRole,
    switchRole,
    currentRoute,
    navigateTo,
    favorites,
    setSearchFilters
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const roleDropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Inicio", route: "/", icon: <Compass size={18} /> },
    { label: "Explorar", route: "/explorar", icon: <Search size={18} /> },
    { label: "Recursos & Tips", route: "/recursos", icon: <Newspaper size={18} /> },
    {
      label: "Mi Tablero",
      route: "/mi-tablero",
      icon: <Bookmark size={18} />,
      badge: favorites.length > 0 ? favorites.length : null
    },
    {
      label: "Panel Admin",
      route: "/admin",
      icon: <ShieldCheck size={18} />,
      tag: "CMS"
    }
  ];

  const getRoleDisplay = () => {
    switch (currentUserRole) {
      case "admin":
        return {
          title: "Admin Nexus",
          subtitle: "Gestor CMS",
          badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
          textColor: "text-red-400",
          icon: <ShieldCheck size={15} className="text-red-400" />
        };
      case "user":
        return {
          title: "Sofía Martínez",
          subtitle: "Registrado",
          badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
          textColor: "text-indigo-400",
          icon: <User size={15} className="text-indigo-400" />
        };
      default:
        return {
          title: "Visitante",
          subtitle: "Público",
          badgeColor: "bg-slate-700/30 text-slate-300 border-slate-600/30",
          textColor: "text-slate-300",
          icon: <User size={15} className="text-slate-400" />
        };
    }
  };

  const roleInfo = getRoleDisplay();

  const handleNavClick = (route) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      setSearchFilters(prev => ({
        ...prev,
        query: mobileSearchQuery.trim()
      }));
    }
    navigateTo("/explorar");
    setMobileMenuOpen(false);
    setMobileSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        
        {/* Brand / Official Logo */}
        <div
          onClick={() => handleNavClick("/")}
          className="flex items-center gap-3 cursor-pointer group select-none min-h-[44px] py-1"
        >
          <img
            src={logoIcon}
            alt="Punto Nexus Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_0_12px_rgba(99,102,241,0.45)] group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight font-heading">
              PUNTO <span className="text-gradient">NEXUS</span>
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold hidden xs:block">
              Hub de Oportunidades Juveniles
            </span>
          </div>
        </div>

        {/* Desktop Nav Items (hidden on mobile, visible on md+) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`min-h-[44px] py-2.5 px-3.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/35 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="badge-count ml-0.5">
                    {item.badge}
                  </span>
                )}
                {item.tag && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded font-bold border border-red-500/30">
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side: Role Switcher & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Role Switcher Pill with Dropdown */}
          <div ref={roleDropdownRef} className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="min-h-[44px] flex items-center gap-2 py-2 px-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer text-left"
              title="Cambiar rol de usuario para probar la experiencia"
              aria-label="Selector de rol de usuario"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${roleInfo.badgeColor} border`}>
                {roleInfo.icon}
              </div>

              <div className="hidden sm:block text-left leading-tight pr-1">
                <span className={`text-xs font-bold block ${roleInfo.textColor}`}>
                  {roleInfo.title}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {roleInfo.subtitle}
                </span>
              </div>

              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${
                  roleMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {roleMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-72 bg-slate-900 border border-white/15 rounded-2xl p-2.5 shadow-2xl z-50 animate-fade-in">
                <div className="p-2 border-b border-white/10 mb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Simular Experiencia por Rol
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Cambia de rol para probar los flujos de visitantes, registrados y administradores.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  {/* Visitor */}
                  <button
                    onClick={() => { switchRole("visitor"); setRoleMenuOpen(false); }}
                    className={`min-h-[44px] w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                      currentUserRole === "visitor" ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-100">Visitante</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-slate-300">Público</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Búsqueda pública y lectura de fichas.</p>
                    </div>
                    {currentUserRole === "visitor" && <Check size={16} className="text-emerald-400 flex-shrink-0" />}
                  </button>

                  {/* Registered User */}
                  <button
                    onClick={() => { switchRole("user"); setRoleMenuOpen(false); }}
                    className={`min-h-[44px] w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                      currentUserRole === "user" ? "bg-indigo-600/20 text-indigo-300" : "hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-indigo-400">Usuario Registrado</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded">Sofía</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Guarda en Favoritos y activa alertas.</p>
                    </div>
                    {currentUserRole === "user" && <Check size={16} className="text-indigo-400 flex-shrink-0" />}
                  </button>

                  {/* Admin */}
                  <button
                    onClick={() => { switchRole("admin"); setRoleMenuOpen(false); }}
                    className={`min-h-[44px] w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                      currentUserRole === "admin" ? "bg-red-500/20 text-red-400" : "hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-red-400">Administrador</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">CMS</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Crear, editar y destacar convocatorias.</p>
                    </div>
                    {currentUserRole === "admin" && <Check size={16} className="text-red-400 flex-shrink-0" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA Button (Desktop) */}
          <div className="hidden sm:block">
            {currentUserRole === "admin" ? (
              <button
                onClick={() => handleNavClick("/admin")}
                className="btn btn-primary min-h-[44px] py-2.5 px-4 text-sm"
              >
                <PlusCircle size={16} /> Crear Ficha
              </button>
            ) : (
              <button
                onClick={() => handleNavClick("/explorar")}
                className="btn btn-primary min-h-[44px] py-2.5 px-4 text-sm"
              >
                <Search size={15} /> Explorar
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button (min 44x44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex md:hidden min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl items-center justify-center bg-white/5 border border-white/10 text-slate-200 active:scale-95 transition-all"
            aria-label="Abrir menú de navegación móvil"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (Lateral / Full overlay menu) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-sm bg-slate-900 border-l border-white/10 h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-fade-in">
            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <img src={logoIcon} alt="Punto Nexus" className="w-8 h-8 object-contain" />
                  <span className="font-extrabold text-base tracking-tight font-heading">
                    PUNTO <span className="text-gradient">NEXUS</span>
                  </span>
                </div>
                
                {/* Close Button (44x44px minimum touch target) */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                  aria-label="Cerrar menú"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Full-width Search Bar for Mobile (w-full) */}
              <form onSubmit={handleMobileSearchSubmit} className="w-full mb-5">
                <div className="relative w-full">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    placeholder="Buscar becas, pasantías, cursos..."
                    className="w-full min-h-[44px] py-2.5 pl-10 pr-4 bg-slate-800/80 border border-white/15 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </form>

              {/* Navigation Items (Touch target min 44px with py-3 px-4) */}
              <nav className="space-y-1.5 mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Navegación Principal
                </p>
                {navItems.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full min-h-[44px] py-3 px-4 rounded-xl flex items-center justify-between text-left font-semibold text-sm transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-indigo-600/25 text-indigo-300 border border-indigo-500/40"
                          : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="badge-count">
                            {item.badge}
                          </span>
                        )}
                        {item.tag && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded font-bold">
                            {item.tag}
                          </span>
                        )}
                        <ArrowRight size={14} className="text-slate-500" />
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Direct Role Simulator for Mobile UX */}
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-white/5 mb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Cambiar Rol de Simulación
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => switchRole("visitor")}
                    className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                      currentUserRole === "visitor" ? "bg-white/20 text-white border border-white/30" : "bg-white/5 text-slate-400"
                    }`}
                  >
                    <User size={14} /> Visitante
                  </button>
                  <button
                    onClick={() => switchRole("user")}
                    className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                      currentUserRole === "user" ? "bg-indigo-600/40 text-indigo-300 border border-indigo-500/50" : "bg-white/5 text-slate-400"
                    }`}
                  >
                    <User size={14} /> Usuario
                  </button>
                  <button
                    onClick={() => switchRole("admin")}
                    className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                      currentUserRole === "admin" ? "bg-red-500/40 text-red-300 border border-red-500/50" : "bg-white/5 text-slate-400"
                    }`}
                  >
                    <ShieldCheck size={14} /> Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Quick Action in Drawer */}
            <div className="pt-3 border-t border-white/10">
              {currentUserRole === "admin" ? (
                <button
                  onClick={() => handleNavClick("/admin")}
                  className="btn btn-primary w-full min-h-[48px] py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <PlusCircle size={18} /> Crear Ficha de Convocatoria
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick("/explorar")}
                  className="btn btn-primary w-full min-h-[48px] py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Search size={18} /> Explorar Oportunidades
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
