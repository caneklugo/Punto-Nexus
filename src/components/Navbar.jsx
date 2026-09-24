import React, { useState, useRef, useEffect } from "react";
import { Compass, Bookmark, ShieldCheck, Newspaper, User, ChevronDown, Check, Menu, X, PlusCircle, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import logoIcon from "../assets/logo-icon.png";

export default function Navbar() {
  const {
    currentUserRole,
    switchRole,
    currentRoute,
    navigateTo,
    favorites
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navItems = [
    { label: "Inicio", route: "/", icon: <Compass size={17} /> },
    { label: "Explorar", route: "/explorar", icon: <Search size={17} /> },
    { label: "Recursos & Tips", route: "/recursos", icon: <Newspaper size={17} /> },
    {
      label: "Mi Tablero",
      route: "/mi-tablero",
      icon: <Bookmark size={17} />,
      badge: favorites.length > 0 ? favorites.length : null
    },
    {
      label: "Panel Admin",
      route: "/admin",
      icon: <ShieldCheck size={17} />,
      adminOnly: false,
      tag: "CMS"
    }
  ];

  const getRoleDisplay = () => {
    switch (currentUserRole) {
      case "admin":
        return {
          title: "Admin Nexus",
          subtitle: "Gestor de Contenido",
          badgeColor: "rgba(239, 68, 68, 0.2)",
          textColor: "#f87171",
          icon: <ShieldCheck size={15} color="#f87171" />
        };
      case "user":
        return {
          title: "Sofía Martínez",
          subtitle: "Usuario Registrado",
          badgeColor: "rgba(99, 102, 241, 0.2)",
          textColor: "#818cf8",
          icon: <User size={15} color="#818cf8" />
        };
      default:
        return {
          title: "Visitante",
          subtitle: "Público General",
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

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 90,
        background: "rgba(10, 13, 20, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        
        {/* Brand / Official Logo */}
        <div
          onClick={() => handleNavClick("/")}
          style={{ display: "flex", alignItems: "center", gap: "0.85rem", cursor: "pointer" }}
        >
          <img
            src={logoIcon}
            alt="Punto Nexus"
            style={{
              width: "44px",
              height: "44px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))"
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "var(--font-heading)" }}>
                PUNTO <span className="text-gradient">NEXUS</span>
              </span>
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Hub de Oportunidades Juveniles
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav style={{ display: "none" }} className="desktop-nav">
          <ul style={{ display: "flex", alignItems: "center", gap: "0.35rem", listStyle: "none" }}>
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <li key={item.route}>
                  <button
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
                      transition: "all var(--transition-fast)"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
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
                      <span style={{ fontSize: "0.65rem", padding: "1px 5px", background: "rgba(239, 68, 68, 0.2)", color: "#f87171", borderRadius: "4px", fontWeight: 700 }}>
                        {item.tag}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side: Role Switcher & CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          
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
                cursor: "pointer"
              }}
              title="Cambiar rol de usuario para probar la experiencia"
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: roleInfo.badgeColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {roleInfo.icon}
              </div>

              <div style={{ textAlign: "left", lineHeight: 1.15 }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: roleInfo.textColor, display: "block" }}>
                  {roleInfo.title}
                </span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", display: "block" }}>
                  Rol actual
                </span>
              </div>

              <ChevronDown size={14} color="var(--text-muted)" style={{ transform: roleMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
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
                      textAlign: "left"
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
                      textAlign: "left"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#818cf8" }}>Usuario Registrado</span>
                        <span style={{ fontSize: "0.65rem", padding: "1px 5px", background: "rgba(99,102,241,0.2)", borderRadius: "4px", color: "#818cf8" }}>Sofía</span>
                      </div>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                        Guarda oportunidades en Favoritos y activa alertas.
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
                      textAlign: "left"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f87171" }}>Administrador</span>
                        <span style={{ fontSize: "0.65rem", padding: "1px 5px", background: "rgba(239,68,68,0.2)", borderRadius: "4px", color: "#f87171" }}>CMS</span>
                      </div>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                        Panel para crear, editar, eliminar y destacar fichas.
                      </p>
                    </div>
                    {currentUserRole === "admin" && <Check size={16} color="#f87171" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA Button */}
          {currentUserRole === "admin" ? (
            <button
              onClick={() => handleNavClick("/admin")}
              className="btn btn-primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              <PlusCircle size={16} /> Crear Ficha
            </button>
          ) : (
            <button
              onClick={() => handleNavClick("/explorar")}
              className="btn btn-primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              <Search size={15} /> Explorar
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-toggle-btn"
            style={{ display: "inline-flex" }}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            background: "var(--bg-secondary)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "1rem 1.5rem 1.5rem"
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {navItems.map((item) => (
              <li key={item.route}>
                <button
                  onClick={() => handleNavClick(item.route)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.95rem",
                    fontWeight: currentRoute === item.route ? 600 : 500,
                    color: currentRoute === item.route ? "#ffffff" : "var(--text-muted)",
                    background: currentRoute === item.route ? "rgba(99, 102, 241, 0.15)" : "transparent"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="badge-count">{item.badge}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Responsive CSS helper */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
