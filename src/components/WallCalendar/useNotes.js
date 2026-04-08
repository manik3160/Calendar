import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

export function useNotes() {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wc-notes");
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read notes from localStorage", e);
    }
  }, []);

  const saveNote = useCallback((key, text) => {
    setNotes((prev) => {
      const updated = { ...prev, [key]: text };
      try {
        localStorage.setItem("wc-notes", JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to write notes to localStorage", e);
      }
      return updated;
    });
  }, []);

  const deleteNote = useCallback((key) => {
    setNotes((prev) => {
      const updated = { ...prev };
      delete updated[key];
      try {
        localStorage.setItem("wc-notes", JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to format notes to localStorage", e);
      }
      return updated;
    });
  }, []);

  const noteKey = useCallback((start, end) => {
    if (!start) return null;
    const startStr = format(start, "yyyy-MM-dd");
    if (!end || start.getTime() === end.getTime()) {
      return startStr;
    }
    const endStr = format(end, "yyyy-MM-dd");
    return start.getTime() < end.getTime() ? `${startStr}:${endStr}` : `${endStr}:${startStr}`;
  }, []);

  const hasNoteFor = useCallback((dateString) => {
    if (notes[dateString]) return true;
    
    for (const key of Object.keys(notes)) {
      if (key.includes(":")) {
        const [start, end] = key.split(":");
        if (dateString >= start && dateString <= end) {
          return true;
        }
      }
    }
    return false;
  }, [notes]);

  return { notes, saveNote, deleteNote, noteKey, hasNoteFor };
}
