"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Edit3, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotesPanel({ 
  rangeStart, 
  rangeEnd, 
  theme, 
  notes, 
  saveNote, 
  deleteNote, 
  noteKey,
  inputRef
}) {
  const [text, setText] = useState("");
  const [isExpandedMob, setIsExpandedMob] = useState(false);
  const currentKey = noteKey(rangeStart, rangeEnd);
  const existingNote = currentKey ? notes[currentKey] : "";

  useEffect(() => {
    setText(existingNote || "");
  }, [currentKey, existingNote]);

  const handleSave = () => {
    if (!currentKey) return;
    if (text.trim() === "") {
      deleteNote(currentKey);
    } else {
      saveNote(currentKey, text);
    }
  };

  let headerText = "Select a date to add a note";
  if (rangeStart && !rangeEnd) {
    headerText = format(rangeStart, "MMMM d, yyyy");
  } else if (rangeStart && rangeEnd) {
    const startStr = format(rangeStart, "MMM d");
    const endStr = format(rangeEnd, "MMM d, yyyy");
    headerText = `${startStr} — ${endStr}`;
  }

  const allNotesKeys = Object.keys(notes).sort();

  return (
    <div className="flex-1 p-6 md:p-12 bg-surface-container-low/50 backdrop-blur-md flex flex-col relative z-20 transition-colors duration-1000">
      <div 
        className="md:hidden flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpandedMob(!isExpandedMob)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight">Notes</h3>
          {allNotesKeys.length > 0 && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {allNotesKeys.length}
            </span>
          )}
        </div>
        {isExpandedMob ? <ChevronUp className="w-5 h-5 text-on-surface-variant"/> : <ChevronDown className="w-5 h-5 text-on-surface-variant"/>}
      </div>

      <div className="hidden md:flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight">Notes</h3>
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-highest">
          <Edit3 className="text-outline-variant w-5 h-5" />
        </div>
      </div>

      <div className={`flex-col h-full ${isExpandedMob ? 'flex' : 'hidden md:flex'}`}>
        <div className="mb-8">
          <label className="block text-xs font-bold text-on-surface-variant tracking-widest uppercase mb-2">
            {headerText}
          </label>
          <textarea
            ref={inputRef}
            className="w-full bg-surface-container-lowest/50 border border-outline-variant/20 rounded-xl p-4 text-on-surface font-body resize-none focus:outline-none focus:ring-1 transition-shadow placeholder:text-on-surface-variant/40"
            rows={3}
            placeholder={currentKey ? "Write your thoughts here..." : "Select a date range first..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSave();
                e.currentTarget.blur();
              }
            }}
            disabled={!currentKey}
            style={{ 
              focusRingColor: theme.accent, 
              boxShadow: text !== existingNote ? `0 0 0 1px ${theme.accent}40` : "none" 
            }}
          />
          <AnimatePresence>
            {text !== existingNote && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={handleSave}
                className="mt-3 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg transition-all active:scale-95"
                style={{ 
                  backgroundColor: theme.accent,
                  color: "var(--wc-surface-container-lowest)"
                }}
              >
                Save Note
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-0 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {allNotesKeys.map((key) => {
              const dates = key.split(":");
              let displayDate = format(new Date(dates[0]), "MMM d");
              if (dates.length > 1 && dates[0] !== dates[1]) {
                 displayDate += ` - ${format(new Date(dates[1]), "MMM d")}`;
              }

              return (
                <motion.div 
                   key={key}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, height: 0 }}
                   className="note-line flex items-center group relative gap-3"
                >
                  <span className="text-[10px] font-bold text-on-surface-variant/60 w-16 whitespace-nowrap">
                    {displayDate}
                  </span>
                  <span className="font-handwriting text-on-surface/90 text-lg translate-y-1 truncate flex-1" style={{ color: theme.accent }}>
                    {notes[key]}
                  </span>
                  <button 
                    onClick={() => deleteNote(key)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-on-surface-variant hover:text-tertiary transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {Array.from({ length: Math.max(0, 4 - allNotesKeys.length) }).map((_, i) => (
             <div key={`empty-${i}`} className="note-line"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
