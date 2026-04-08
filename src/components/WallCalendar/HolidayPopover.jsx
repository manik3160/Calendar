"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { getHoliday } from "./holidays";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HolidayPopover({ date, onClose, onToggleDayOff, isDayOff }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!date) return null;

  const month = date.getMonth();
  const day = date.getDate();
  const holiday = getHoliday(month, day);

  if (!holiday) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        ref={popoverRef}
        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-surface-container-highest border border-outline-variant/30 rounded-2xl shadow-card p-4 flex flex-col gap-3 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{holiday.emoji}</span>
            <h4 className="font-headline font-bold text-on-surface leading-tight text-lg">
              {holiday.name}
            </h4>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1"
            aria-label="Close popover"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-on-surface-variant font-body leading-relaxed">
          {holiday.desc}
        </p>

        <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Day Off
          </span>
          <button
            onClick={() => onToggleDayOff(date)}
            className={`w-10 h-6 rounded-full p-1 transition-colors relative flex items-center ${
              isDayOff ? "bg-primary" : "bg-surface-container-low"
            }`}
            aria-label="Toggle day off"
          >
            <motion.div
              layout
              className="w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: isDayOff ? 16 : 0 }}
            />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
