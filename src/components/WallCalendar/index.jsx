"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Share, Check, Calendar as CalendarIcon } from "lucide-react";

import { useCalendar } from "./useCalendar";
import { useNotes } from "./useNotes";
import { useKeyboard } from "./useKeyboard";
import { getThemeForMonth } from "./themes";
import { playFlipSound } from "./useSound";

import HeroArt from "./HeroArt";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import RangeSummaryBar from "./RangeSummaryBar";
import ThemeToggle from "./ThemeToggle";

const flipVariants = {
  enter: (dir) => ({ rotateX: dir > 0 ? -90 : 90, opacity: 0, scale: 0.95, transformOrigin: "top center" }),
  center: { rotateX: 0, opacity: 1, scale: 1, transformOrigin: "top center" },
  exit:  (dir) => ({ rotateX: dir > 0 ? 90 : -90, opacity: 0, scale: 0.95, transformOrigin: "top center" }),
};

export default function WallCalendar() {
  const calendarProps = useCalendar();
  const notesProps = useNotes();
  const { focusRef } = useKeyboard(calendarProps);
  const noteInputRef = useRef(null);
  const isFirstMount = useRef(true);
  const [showToast, setShowToast] = useState(false);

  const { month, year, slideDir, navigate, jumpToMonth, isToday } = calendarProps;
  
  useEffect(() => {
    if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
    }
    playFlipSound();
  }, [month, year]);

  const theme = useMemo(() => getThemeForMonth(month), [month]);

  const realMonth = new Date().getMonth();
  const realYear = new Date().getFullYear();
  const isNotRealMonth = month !== realMonth || year !== realYear;

  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const handleAddNoteFocus = () => {
    if (noteInputRef.current) {
      noteInputRef.current.focus();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Obsidian Wall Calendar',
      text: `Check out the ${theme.title} Edition for ${format(new Date(year, month, 1), "MMMM yyyy")}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="w-full max-w-6xl relative group animate-fade-in mx-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      
      <ThemeToggle />

      <div className="absolute -top-6 left-0 right-0 flex justify-around px-8 md:px-12 z-20 pointer-events-none">
        <div className="flex gap-3 md:gap-16">
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
        </div>
        <div className="hidden xs:flex gap-3 md:gap-16">
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
        </div>
        <div className="flex gap-3 md:gap-16">
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
          <div className="w-2 md:w-3 h-10 md:h-12 binding-ring rounded-full shadow-lg border"></div>
        </div>
      </div>

      <div style={{ perspective: "1200px" }}>
        <AnimatePresence custom={slideDir} mode="wait">
          <motion.div 
            key={`${year}-${month}`}
            custom={slideDir}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="bg-surface-container rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-card flex flex-col md:flex-row min-h-[600px] md:min-h-[800px] border border-outline-variant/20 relative"
          >
            <div className="w-full md:w-1/2 flex flex-col relative border-b md:border-b-0 md:border-r border-outline-variant/10">
              <div className="relative min-h-[160px] sm:min-h-[240px] md:h-2/3">
                <HeroArt theme={theme} isDarkMode={true} />
                
                <div className="relative h-full p-6 md:p-12 flex flex-col justify-end pointer-events-none z-10 text-shadow-md">
                  <span className="font-headline font-extrabold text-5xl md:text-8xl tracking-tighter mb-1 md:mb-2 drop-shadow-2xl" style={{ color: theme.accent }}>
                    {format(new Date(year, month, 1), "MMM").toUpperCase()}
                  </span>
                  <h2 className="text-on-surface font-headline font-bold text-2xl md:text-4xl mb-1 md:mb-2">{theme.title}</h2>
                  <p className="text-on-surface-variant max-w-xs text-xs md:text-base leading-relaxed font-body font-medium">{theme.subtitle}</p>
                </div>
              </div>
              
              <NotesPanel 
                {...notesProps} 
                rangeStart={calendarProps.rangeStart} 
                rangeEnd={calendarProps.rangeEnd} 
                theme={theme}
                inputRef={noteInputRef}
              />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-12 bg-surface-container-low flex flex-col relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-6 relative z-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
                    {format(new Date(year, month, 1), "MMMM yyyy")}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: theme.accent }}></span>
                    <span className="text-[10px] text-on-surface-variant font-bold tracking-[0.2em] uppercase">{theme.title} Edition</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  
                  <AnimatePresence>
                    {isNotRealMonth && (
                      <motion.button 
                        initial={{ opacity: 0, y: -4, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.9 }}
                        onClick={() => jumpToMonth(realMonth, realYear)}
                        className="h-12 px-4 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/20 hover:border-primary/50 transition-all font-bold text-xs uppercase tracking-wider text-on-surface"
                      >
                        Today
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <button onClick={() => navigate(-1)} aria-label="Previous month" className="flex-1 sm:flex-none w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/20 hover:border-primary/50 transition-all hover:bg-surface-container-highest active:scale-95">
                    <ChevronLeft className="text-on-surface w-6 h-6" />
                  </button>
                  <button onClick={() => navigate(1)} aria-label="Next month" className="flex-1 sm:flex-none w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/20 hover:border-primary/50 transition-all hover:bg-surface-container-highest active:scale-95">
                    <ChevronRight className="text-on-surface w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <CalendarGrid 
                  {...calendarProps} 
                  currentDate={new Date(year, month, 1)} 
                  theme={theme} 
                  hasNoteFor={notesProps.hasNoteFor}
                  focusRef={focusRef}
                />
                
                <RangeSummaryBar 
                  rangeStart={calendarProps.rangeStart} 
                  rangeEnd={calendarProps.rangeEnd} 
                  theme={theme} 
                  onAddNote={handleAddNoteFocus}
                />
              </div>

              <div className="mt-8 md:mt-auto pt-8 md:pt-10 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
                  <div className="flex items-center gap-2 md:gap-2.5">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full" style={{ backgroundColor: theme.accent }}></span>
                    <span className="text-[9px] md:text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Active Date</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-2.5">
                    <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full text-[10px] flex items-center justify-center" style={{ color: "var(--wc-tertiary)" }}>★</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Holiday</span>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-2.5 bg-surface-container-highest rounded-2xl text-[11px] md:text-xs font-bold transition-all border border-secondary/20 hover:border-secondary hover:bg-secondary/10 active:scale-95" 
                  style={{ color: "var(--wc-secondary)" }}
                >
                  <Share className="w-4 h-4" />
                  SHARE EDITION
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface-container-highest/80 backdrop-blur-xl border border-outline-variant shadow-2xl"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-bold text-on-surface tracking-wide">Link copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-black/40 blur-3xl -z-10 rounded-full"></div>
    </div>
  );
}
