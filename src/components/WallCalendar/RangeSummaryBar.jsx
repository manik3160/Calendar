"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import { isHoliday } from "./holidays";
import { ArrowLeftRight } from "lucide-react";

export default function RangeSummaryBar({ rangeStart, rangeEnd, theme, onAddNote }) {
  const show = rangeStart && rangeEnd;
  
  let nights = 0;
  let holidaysCount = 0;
  
  if (show) {
    nights = Math.abs(differenceInDays(rangeEnd, rangeStart));
    
    const start = rangeStart.getTime() < rangeEnd.getTime() ? rangeStart : rangeEnd;
    const end = rangeStart.getTime() < rangeEnd.getTime() ? rangeEnd : rangeStart;
    
    let current = new Date(start);
    while (current <= end) {
      if (isHoliday(current.getMonth(), current.getDate())) {
        holidaysCount++;
      }
      current.setDate(current.getDate() + 1);
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
          exit={{ height: 0, opacity: 0, marginTop: 0 }}
          className="overflow-hidden"
        >
          <div 
            className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 rounded-2xl border backdrop-blur-md"
            style={{ 
              backgroundColor: `${theme.accent}15`,
              borderColor: `${theme.accent}30`
            }}
          >
            <div className="flex items-center gap-3 text-sm font-medium" style={{ color: theme.accent }}>
              <ArrowLeftRight className="w-4 h-4 opacity-70" />
              <div className="flex items-center gap-2">
                <span>{format(rangeStart, "MMM d")}</span>
                <span className="opacity-50">→</span>
                <span>{format(rangeEnd, "MMM d")}</span>
              </div>
              
              <span className="opacity-40 px-1">·</span>
              <span>{nights} {nights === 1 ? 'night' : 'nights'}</span>
              
              {holidaysCount > 0 && (
                <>
                  <span className="opacity-40 px-1">·</span>
                  <span className="font-bold">includes {holidaysCount} {holidaysCount === 1 ? 'holiday' : 'holidays'}</span>
                </>
              )}
            </div>
            
            <button 
              onClick={onAddNote}
              className="mt-3 sm:mt-0 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors hover:text-white"
              style={{ backgroundColor: `${theme.accent}30`, color: theme.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.accent;
                e.currentTarget.style.color = "var(--wc-surface-container-lowest)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.accent}30`;
                e.currentTarget.style.color = theme.accent;
              }}
            >
              Add note
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
