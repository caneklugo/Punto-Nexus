import React from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "380px"
      }}
    >
      {toasts.map(toast => {
        let icon = <Info size={18} color="#38bdf8" />;
        let borderColor = "rgba(56, 189, 248, 0.4)";
        let bg = "rgba(15, 23, 42, 0.95)";

        if (toast.type === "success") {
          icon = <CheckCircle2 size={18} color="#34d399" />;
          borderColor = "rgba(52, 211, 153, 0.4)";
        } else if (toast.type === "warning") {
          icon = <AlertCircle size={18} color="#fbbf24" />;
          borderColor = "rgba(251, 191, 36, 0.4)";
        }

        return (
          <div
            key={toast.id}
            className="animate-fade-in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.85rem 1.15rem",
              background: bg,
              border: `1px solid ${borderColor}`,
              borderRadius: "var(--radius-md)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              color: "var(--text-main)",
              fontSize: "0.875rem",
              backdropFilter: "blur(12px)"
            }}
          >
            {icon}
            <span style={{ flex: 1, lineHeight: 1.35 }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
