import { useEffect, useRef, useCallback } from "react";
import { addDays, subDays } from "date-fns";

export function useKeyboard(calendarProps) {
  const { navigate, jumpToMonth, clickDay, clearRange } = calendarProps;
  const focusRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      clearRange();
      return;
    }

    if (e.key === "t" || e.key === "T") {
      const today = new Date();
      jumpToMonth(today.getMonth(), today.getFullYear());
      return;
    }

    if (!focusRef.current || !focusRef.current.contains(document.activeElement)) {
      return;
    }

    const currentElem = document.activeElement;
    if (!currentElem.dataset.date) return;

    const currentDate = new Date(currentElem.dataset.date);
    let targetDate = null;

    if (e.key === "ArrowLeft") {
      targetDate = subDays(currentDate, 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      targetDate = addDays(currentDate, 1);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      targetDate = subDays(currentDate, 7);
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      targetDate = addDays(currentDate, 7);
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      clickDay(currentDate);
      e.preventDefault();
    }

    if (targetDate) {
      const targetStr = targetDate.toISOString().split("T")[0];
      const nextElem = focusRef.current.querySelector(`[data-date="${targetStr}"]`);
      if (nextElem) {
        nextElem.focus();
      } else {
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();
        jumpToMonth(targetMonth, targetYear);
        requestAnimationFrame(() => {
           const recheck = document.querySelector(`[data-date="${targetStr}"]`);
           if(recheck) recheck.focus();
        });
      }
    }
  }, [clearRange, jumpToMonth, clickDay]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { focusRef };
}
