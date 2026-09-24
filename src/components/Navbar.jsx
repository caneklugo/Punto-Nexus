import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
          badgeColor: "rgba(239, 68, 68, 0.2)",
          textColor: "#f87171",
          icon: <ShieldCheck size={15} color="#f87171" />
        };
      case "user":
        return {
          title: "Sofía Martínez",
          subtitle: "Registrado",
          badgeColor: "rgba(99, 102, 241, 0.2)",
          textColor: "#818cf8",
          icon: <User size={15} color="#818cf8" />
        };
      default:
        return {
          title: "Visitante",
          subtitle: "Público",
          badgeColor: "rgba(148, 163, 184, 0.15)",
          textColor: "#cbd5e1",
          icon: <User size={15} color="#94a3b8" />
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
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 90,
          background: "rgba(10, 13, 20, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px"
          }}
        >
          {/* Brand / Official Logo */}
          <div
            onClick={() => handleNavClick("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              cursor: "pointer",
              minHeight: "44px"
            }}
          >
            <img
              src={logoIcon}
              alt="Punto Nexus"
              style={{
                width: "42px",
                height: "42px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.45))"
              }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    fontFamily: "var(--font-heading)"
                  }}
                >
                  PUNTO <span className="text-gradient">NEXUS</span>
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600
                }}
                className="hidden xs:block"
              >
                Hub de Oportunidades Juveniles
              </span>
            </div>
          </div>

          {/* Desktop Nav Items (hidden on mobile, visible on desktop) */}
          <nav className="desktop-nav-links" style={{ alignItems: "center", gap: "0.5rem" }}>
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#ffffff" : "var(--text-muted)",
                    background: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                    border: isActive ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid transparent",
                    transition: "all var(--transition-fast)",
                    minHeight: "44px",
                    cursor: "pointer"
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="badge-count" style={{ marginLeft: "2px" }}>
                      {item.badge}
                    </span>
                  )}
                  {item.tag && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        padding: "1px 5px",
                        background: "rgba(239, 68, 68, 0.2)",
                        color: "#f87171",
                        borderRadius: "4px",
                        fontWeight: 700
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side: Role Switcher & Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Role Switcher Pill with Dropdown */}
            <div ref={roleDropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  transition: "all var(--transition-fast)",
                  cursor: "pointer",
                  minHeight: "44px"
                }}
                title="Cambiar rol de usuario para probar la experiencia"
                aria-label="Selector de rol"
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: roleInfo.badgeColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {roleInfo.icon}
                </div>

                <div className="hidden sm:block" style={{ textAlign: "left", lineHeight: 1.15 }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: roleInfo.textColor, display: "block" }}>
                    {roleInfo.title}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", display: "block" }}>
                    {roleInfo.subtitle}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  color="var(--text-muted)"
                  style={{ transform: roleMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                />
              </button>

              {/* Dropdown Menu */}
              {roleMenuOpen && (
                <div
                  className="animate-fade-in"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: "290px",
                    background: "var(--bg-secondary)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.6rem",
                    boxShadow: "var(--shadow-lg)",
                    zIndex: 100
                  }}
                >
                  <div style={{ padding: "0.4rem 0.6rem 0.6rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "0.4rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                      Simular Experiencia por Rol
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Cambia de rol para probar los flujos de visitantes, registrados y administradores.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {/* Visitor */}
                    <button
                      onClick={() => { switchRole("visitor"); setRoleMenuOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "var(--radius-md)",
                        background: currentUserRole === "visitor" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                        textAlign: "left",
                        minHeight: "44px"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)" }}>Visitante</span>
                          <span style={{ fontSize: "0.65rem", padding: "1px 5px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", color: "var(--text-muted)" }}>Público</span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                          Búsqueda pública y lectura de fichas completas.
                        </p>
                      </div>
                      {currentUserRole === "visitor" && <Check size={16} color="#34d399" />}
                    </button>

                    {/* Registered User */}
                    <button
                      onClick={() => { switchRole("user"); setRoleMenuOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "var(--radius-md)",
                        background: currentUserRole === "user" ? "rgba(99, 102, 241, 0.15)" : "transparent",
                        textAlign: "left",
                        minHeight: "44px"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#818cf8" }}>Usuario Registrado</span>
                          <span style={{ fontSize: "0.65rem", padding: "1px 5px", background: "rgba(99,102,241,0.2)", borderRadius: "4px", color: "#818cf8" }}>Sofía</span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                          Guarda en Favoritos y activa alertas.
                        </p>
                      </div>
                      {currentUserRole === "user" && <Check size={16} color="#818cf8" />}
                    </button>

                    {/* Admin */}
                    <button
                      onClick={() => { switchRole("admin"); setRoleMenuOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "var(--radius-md)",
                        background: currentUserRole === "admin" ? "rgba(239, 68, 68, 0.15)" : "transparent",
                        textAlign: "left",
                        minHeight: "44px"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f87171" }}>Administrador</span>
                          <span style={{ fontSize: "0.65rem", padding: "1px 5px", background: "rgba(239,68,68,0.2)", borderRadius: "4px", color: "#f87171" }}>CMS</span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                          Panel para crear, editar y destacar fichas.
                        </p>
                      </div>
                      {currentUserRole === "admin" && <Check size={16} color="#f87171" />}
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
                  className="btn btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minHeight: "44px" }}
                >
                  <PlusCircle size={16} /> Crear Ficha
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick("/explorar")}
                  className="btn btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minHeight: "44px" }}
                >
                  <Search size={15} /> Explorar
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button (44x44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="btn-icon mobile-hamburger-btn"
              style={{
                width: "44px",
                height: "44px",
                minWidth: "44px",
                minHeight: "44px",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-main)"
              }}
              aria-label="Abrir menú de navegación"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive CSS for Navbar */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: inline-flex !important;
          }
        }
      `}</style>

      {/* PORTAL FOR MOBILE LATERAL DRAWER (Rendered into document.body to avoid backdrop-filter clipping) */}
      {mobileMenuOpen &&
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
            {/* Backdrop Blur Layer */}
            <div
              onClick={() => setMobileMenuOpen(false)}
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
                maxWidth: "340px",
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
                {/* Drawer Header */}
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
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <img src={logoIcon} alt="Punto Nexus" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                      PUNTO <span className="text-gradient">NEXUS</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
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
                    aria-label="Cerrar menú"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* 100% Width Mobile Search Bar */}
                <form onSubmit={handleMobileSearchSubmit} style={{ width: "100%", marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-focus)"
                    }}
                  >
                    <Search size={18} color="var(--primary-light)" style={{ marginRight: "0.5rem", flexShrink: 0 }} />
                    <input
                      type="text"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      placeholder="Buscar becas, pasantías..."
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        color: "var(--text-main)",
                        fontSize: "0.9rem"
                      }}
                    />
                  </div>
                </form>

                {/* Navigation Items (Touch target min 44px with py-3 px-4) */}
                <nav style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--text-dim)",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Navegación Principal
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {navItems.map((item) => {
                      const isActive = currentRoute === item.route;
                      return (
                        <li key={item.route}>
                          <button
                            onClick={() => handleNavClick(item.route)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                              padding: "0.75rem 1rem",
                              minHeight: "44px",
                              borderRadius: "var(--radius-md)",
                              fontSize: "0.925rem",
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? "#ffffff" : "var(--text-muted)",
                              background: isActive ? "rgba(99, 102, 241, 0.18)" : "transparent",
                              border: isActive ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid transparent",
                              textAlign: "left"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              {item.icon}
                              <span>{item.label}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              {item.badge && <span className="badge-count">{item.badge}</span>}
                              {item.tag && (
                                <span
                                  style={{
                                    fontSize: "0.65rem",
                                    padding: "1px 5px",
                                    background: "rgba(239, 68, 68, 0.2)",
                                    color: "#f87171",
                                    borderRadius: "4px",
                                    fontWeight: 700
                                  }}
                                >
                                  {item.tag}
                                </span>
                              )}
                              <ArrowRight size={14} color="var(--text-dim)" />
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Role Simulation Switcher in Drawer */}
                <div
                  style={{
                    padding: "0.85rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    marginBottom: "1rem"
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--text-dim)",
                      marginBottom: "0.6rem"
                    }}
                  >
                    Rol de Simulación
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.35rem" }}>
                    <button
                      onClick={() => switchRole("visitor")}
                      style={{
                        minHeight: "44px",
                        padding: "0.5rem 0.25rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                        background: currentUserRole === "visitor" ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.03)",
                        color: currentUserRole === "visitor" ? "#ffffff" : "var(--text-muted)",
                        border: currentUserRole === "visitor" ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid transparent"
                      }}
                    >
                      <User size={14} /> Visitante
                    </button>
                    <button
                      onClick={() => switchRole("user")}
                      style={{
                        minHeight: "44px",
                        padding: "0.5rem 0.25rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                        background: currentUserRole === "user" ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.03)",
                        color: currentUserRole === "user" ? "#818cf8" : "var(--text-muted)",
                        border: currentUserRole === "user" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent"
                      }}
                    >
                      <User size={14} /> Usuario
                    </button>
                    <button
                      onClick={() => switchRole("admin")}
                      style={{
                        minHeight: "44px",
                        padding: "0.5rem 0.25rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                        background: currentUserRole === "admin" ? "rgba(239, 68, 68, 0.25)" : "rgba(255, 255, 255, 0.03)",
                        color: currentUserRole === "admin" ? "#f87171" : "var(--text-muted)",
                        border: currentUserRole === "admin" ? "1px solid rgba(239, 68, 68, 0.4)" : "1px solid transparent"
                      }}
                    >
                      <ShieldCheck size={14} /> Admin
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                {currentUserRole === "admin" ? (
                  <button
                    onClick={() => handleNavClick("/admin")}
                    className="btn btn-primary"
                    style={{ width: "100%", minHeight: "48px", fontSize: "0.9rem" }}
                  >
                    <PlusCircle size={16} /> Crear Ficha de Convocatoria
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick("/explorar")}
                    className="btn btn-primary"
                    style={{ width: "100%", minHeight: "48px", fontSize: "0.9rem" }}
                  >
                    <Search size={16} /> Explorar Oportunidades
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
