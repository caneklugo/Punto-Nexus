/**
 * Calculate dynamic urgency badge and status based on opportunity closing date
 */
export function calculateUrgency(closingDateString) {
  if (!closingDateString) {
    return {
      daysRemaining: null,
      label: "Convocatoria continua",
      className: "urgency-low",
      severity: "low",
      isUrgent: false
    };
  }

  const now = new Date();
  // Reset time to start of day for clean day diffs
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [year, month, day] = closingDateString.split("-").map(Number);
  const closing = new Date(year, month - 1, day);

  const diffTime = closing.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return {
      daysRemaining,
      label: "Convocatoria cerrada",
      className: "urgency-expired",
      severity: "expired",
      isUrgent: false,
      color: "#94a3b8"
    };
  }

  if (daysRemaining === 0) {
    return {
      daysRemaining,
      label: "¡Cierra hoy!",
      className: "urgency-critical",
      severity: "critical",
      isUrgent: true,
      color: "#ef4444"
    };
  }

  if (daysRemaining === 1) {
    return {
      daysRemaining,
      label: "Cierra en 1 día",
      className: "urgency-critical",
      severity: "critical",
      isUrgent: true,
      color: "#ef4444"
    };
  }

  if (daysRemaining <= 3) {
    return {
      daysRemaining,
      label: `Cierra en ${daysRemaining} días`,
      className: "urgency-critical",
      severity: "critical",
      isUrgent: true,
      color: "#ef4444"
    };
  }

  if (daysRemaining <= 7) {
    return {
      daysRemaining,
      label: `Cierra en ${daysRemaining} días`,
      className: "urgency-medium",
      severity: "medium",
      isUrgent: true,
      color: "#f59e0b"
    };
  }

  if (daysRemaining <= 30) {
    return {
      daysRemaining,
      label: `Cierra en ${daysRemaining} días`,
      className: "urgency-low",
      severity: "low",
      isUrgent: false,
      color: "#10b981"
    };
  }

  return {
    daysRemaining,
    label: "Convocatoria abierta",
    className: "urgency-low",
    severity: "low",
    isUrgent: false,
    color: "#10b981"
  };
}

export function formatDate(dateString) {
  if (!dateString || dateString.includes("Acceso") || dateString.includes("Inmediat")) {
    return dateString || "Por definir";
  }
  
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(date);
    }
    return dateString;
  } catch {
    return dateString;
  }
}
