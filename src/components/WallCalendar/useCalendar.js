import { useState, useCallback } from "react";
import { isSameDay, startOfDay } from "date-fns";

export function useCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [slideDir, setSlideDir] = useState(1);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const navigate = useCallback((dir) => {
    setSlideDir(dir);
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + dir, 1);
      return newDate;
    });
  }, []);

  const jumpToMonth = useCallback((targetMonth, targetYear) => {
    setCurrentDate((prev) => {
      const newDate = new Date(targetYear, targetMonth, 1);
      setSlideDir(newDate.getTime() > prev.getTime() ? 1 : -1);
      return newDate;
    });
  }, []);

  const clickDay = useCallback((dayDate) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(dayDate);
      setRangeEnd(null);
    } else {
      if (dayDate.getTime() < rangeStart.getTime()) {
        setRangeEnd(rangeStart);
        setRangeStart(dayDate);
      } else {
        setRangeEnd(dayDate);
      }
    }
  }, [rangeStart, rangeEnd]);

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  const isStart = useCallback((dayDate) => {
    return rangeStart && isSameDay(rangeStart, dayDate);
  }, [rangeStart]);

  const isEnd = useCallback((dayDate) => {
    return rangeEnd && isSameDay(rangeEnd, dayDate);
  }, [rangeEnd]);

  const inRange = useCallback((dayDate) => {
    if (!rangeStart) return false;
    
    const time = dayDate.getTime();
    if (rangeEnd) {
      return time >= rangeStart.getTime() && time <= rangeEnd.getTime();
    } else if (hovered) {
      const hTime = hovered.getTime();
      return (time >= rangeStart.getTime() && time <= hTime) || 
             (time <= rangeStart.getTime() && time >= hTime);
    }
    return false;
  }, [rangeStart, rangeEnd, hovered]);

  const isTodayDate = useCallback((dayDate) => {
    return isSameDay(today, dayDate);
  }, [today]);

  return {
    month,
    year,
    rangeStart,
    rangeEnd,
    hovered,
    setHovered,
    slideDir,
    navigate,
    jumpToMonth,
    clickDay,
    clearRange,
    isStart,
    isEnd,
    inRange,
    isToday: isTodayDate
  };
}
