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
    <div className="mb-8 sm:mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-slate-100 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="btn btn-ghost min-h-[44px] py-2 px-3 text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Ver todas ({opportunities.length})
            </button>
          )}

          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile subtitle when truncated above */}
      {subtitle && (
        <p className="text-xs text-slate-400 -mt-2 mb-3 sm:hidden">
          {subtitle}
        </p>
      )}

      {/* Horizontal Native Touch Swipeable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 sm:gap-6 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="flex-none w-[84vw] sm:w-[320px] md:w-[350px] snap-start"
          >
            <OpportunityCard opportunity={opp} />
          </div>
        ))}
      </div>
    </div>
  );
}
