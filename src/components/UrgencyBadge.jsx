import React from "react";
import { calculateUrgency } from "../utils/urgency";
import { Clock, AlertCircle } from "lucide-react";

export default function UrgencyBadge({ closingDate }) {
  const urgency = calculateUrgency(closingDate);

  return (
    <div className={`urgency-badge ${urgency.className}`} title={`Fecha límite: ${closingDate || 'No especificada'}`}>
      {urgency.severity === "critical" && <span className="pulse-dot" />}
      {urgency.severity === "critical" ? (
        <AlertCircle size={13} style={{ flexShrink: 0 }} />
      ) : (
        <Clock size={13} style={{ flexShrink: 0 }} />
      )}
      <span>{urgency.label}</span>
    </div>
  );
}
