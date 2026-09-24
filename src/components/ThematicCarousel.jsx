import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

export default function ThematicCarousel({ title, subtitle, icon, opportunities, onSeeAll }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!opportunities || opportunities.length === 0) return null;

  return (
    <div style={{ marginBottom: "3.5rem" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
          {icon && (
            <div
              style={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
                borderRadius: "var(--radius-md)",
                background: "rgba(99, 102, 241, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary-light)",
                flexShrink: 0
              }}
            >
              {icon}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {title}
            </h3>
            {subtitle && (
              <p className="hidden sm:block" style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="btn btn-ghost"
              style={{ fontSize: "0.85rem", padding: "0.5rem 0.75rem", minHeight: "44px", color: "var(--primary-light)" }}
            >
              Ver todas ({opportunities.length})
            </button>
          )}

          <button
            onClick={() => scroll("left")}
            className="btn-icon hidden sm:flex"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-subtle)",
              width: "44px",
              height: "44px",
              minWidth: "44px",
              minHeight: "44px",
              borderRadius: "var(--radius-md)"
            }}
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="btn-icon hidden sm:flex"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-subtle)",
              width: "44px",
              height: "44px",
              minWidth: "44px",
              minHeight: "44px",
              borderRadius: "var(--radius-md)"
            }}
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile subtitle when hidden above */}
      {subtitle && (
        <p className="block sm:hidden" style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          {subtitle}
        </p>
      )}

      {/* Horizontal Native Touch Swipeable Container */}
      <div
        ref={scrollContainerRef}
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          paddingBottom: "1.25rem",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            style={{
              flex: "0 0 340px",
              maxWidth: "340px",
              width: "85vw",
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
