import React from "react";
import { X, Clock, User, Calendar, BookOpen, Share2, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ArticleModal({ article, onClose }) {
  const { showToast } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showToast("Enlace del artículo copiado al portapapeles", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "750px" }}>
        
        {/* Header Cover Image */}
        {article.image && (
          <div style={{ width: "100%", height: "240px", overflow: "hidden", position: "relative" }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, var(--bg-secondary) 0%, transparent 60%)"
              }}
            />
            <button
              onClick={onClose}
              className="btn-icon"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(0, 0, 0, 0.6)",
                color: "#ffffff"
              }}
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div style={{ padding: "2rem" }}>
          {!article.image && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
              <button onClick={onClose} className="btn-icon">
                <X size={20} />
              </button>
            </div>
          )}

          {/* Meta Info */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span className="badge badge-curso">
              <BookOpen size={12} /> {article.category}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={13} /> {article.readTime}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Calendar size={13} /> {article.date}
            </span>
          </div>

          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1.25, marginBottom: "1rem", color: "var(--text-main)" }}>
            {article.title}
          </h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(99, 102, 241, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8" }}>
                <User size={16} />
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)" }}>
                {article.author}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="btn btn-secondary"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
            >
              {copied ? <Check size={14} color="#34d399" /> : <Share2 size={14} />}
              <span>{copied ? "¡Copiado!" : "Compartir"}</span>
            </button>
          </div>

          {/* Content */}
          <div style={{ fontSize: "1rem", lineHeight: 1.8, color: "#cbd5e1" }}>
            {article.content ? (
              article.content.split("\n\n").map((para, i) => (
                <p key={i} style={{ marginBottom: "1.25rem" }}>
                  {para}
                </p>
              ))
            ) : (
              <p>{article.summary}</p>
            )}
          </div>

          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.5rem", marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
            <button onClick={onClose} className="btn btn-secondary">
              Cerrar lectura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
