import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

export default function ThematicCarousel({ title, subtitle, icon, opportunities, onSeeAll }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!opportunities || opportunities.length === 0) return null;

  return (
    <div style={{ marginBottom: "3rem" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
          gap: "1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {icon && (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                background: "rgba(99, 102, 241, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary-light)"
              }}
            >
              {icon}
            </div>
          )}
          <div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)" }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginTop: "2px" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="btn btn-ghost"
              style={{ fontSize: "0.825rem", padding: "0.4rem 0.75rem" }}
            >
              Ver todas ({opportunities.length})
            </button>
          )}

          <button
            onClick={() => scroll("left")}
            className="btn-icon"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-subtle)",
              width: "34px",
              height: "34px"
            }}
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="btn-icon"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-subtle)",
              width: "34px",
              height: "34px"
            }}
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Container */}
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          paddingBottom: "1rem",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "thin"
        }}
      >
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            style={{
              flex: "0 0 340px",
              maxWidth: "340px",
              scrollSnapAlign: "start"
            }}
          >
            <OpportunityCard opportunity={opp} />
          </div>
        ))}
      </div>
    </div>
  );
}
