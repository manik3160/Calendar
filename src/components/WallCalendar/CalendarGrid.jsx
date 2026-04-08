import { useMemo, useState } from "react";
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format,
  isSameMonth,
  isBefore
} from "date-fns";
import { DAYS } from "./constants";
import { isHoliday } from "./holidays";
import { Star } from "lucide-react";
import HolidayPopover from "./HolidayPopover";

export default function CalendarGrid({ 
  currentDate, 
  theme,
  clickDay, 
  isStart, 
  isEnd, 
  inRange, 
  isToday,
  hasNoteFor,
  setHovered,
  focusRef
}) {
  const [activeDateInfo, setActiveDateInfo] = useState(null);
  const [daysOff, setDaysOff] = useState({});

  const toggleDayOff = (date) => {
    const key = format(date, "yyyy-MM-dd");
    setDaysOff(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  return (
    <div className="flex-1 flex flex-col relative" ref={focusRef}>
      <div className="grid grid-cols-7 mb-6 md:mb-8">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] md:text-[10px] font-black text-outline-variant uppercase tracking-[0.2em] md:tracking-[0.3em]">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 md:gap-y-1.5 flex-1 content-start relative">
        {days.map((dayDate, i) => {
          const dateStr = format(dayDate, "yyyy-MM-dd");
          const isCurrentMonth = isSameMonth(dayDate, currentDate);
          
          if (!isCurrentMonth) {
            return <div key={dateStr} className="aspect-square"></div>;
          }

          const actStart = isStart(dayDate);
          const actEnd = isEnd(dayDate);
          const actInRange = inRange(dayDate);
          const actToday = isToday(dayDate);
          const hasNote = hasNoteFor(dateStr);
          const holiday = isHoliday(dayDate.getMonth(), dayDate.getDate());
          const isDayOff = daysOff[dateStr];
          
          const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

          const isRowStart = dayDate.getDay() === 0;
          const isRowEnd = dayDate.getDay() === 6;

          let baseClasses = "relative aspect-square flex items-center justify-center transition-colors font-medium text-sm md:text-base outline-none group ";
          let style = {};

          if (actStart || actEnd) {
             baseClasses += " rounded-xl md:rounded-2xl z-10 font-bold shadow-lg scale-105 md:scale-110 ";
             style.backgroundColor = theme.accent;
             style.color = "var(--wc-surface-container-lowest)";
          } else if (actInRange) {
             baseClasses += " z-0 border-y ";
             style.backgroundColor = `${theme.accent}30`;
             style.borderColor = `${theme.accent}40`;
             style.color = theme.accent;
             
             if (isRowStart && isRowEnd) {
               baseClasses += " rounded-xl md:rounded-2xl border-x ";
             } else if (isRowStart) {
               baseClasses += " rounded-l-xl md:rounded-l-2xl border-l ";
             } else if (isRowEnd) {
               baseClasses += " rounded-r-xl md:rounded-r-2xl border-r ";
             }

             if (isDayOff) {
                style.backgroundColor = `${theme.accent}50`;
             }
          } else {
             baseClasses += " rounded-xl md:rounded-2xl hover:bg-surface-container-highest cursor-pointer ";
             if (isDayOff) {
                baseClasses += " bg-surface-container-highest opacity-70 ";
             }
             if (actToday) {
               style.color = theme.accent;
               style.fontWeight = "bold";
             } else if (isWeekend) {
               baseClasses += " text-outline-variant ";
             } else {
               baseClasses += " text-on-surface-variant group-hover:text-on-surface ";
             }
          }

          if (holiday && !actStart && !actEnd && !actInRange) {
             style.color = "var(--wc-tertiary)";
             style.fontWeight = "900";
          }

          return (
            <div
              key={dateStr}
              data-date={dateStr}
              role="button"
              tabIndex={0}
              className={baseClasses}
              style={style}
              onClick={() => {
                if (holiday && !activeDateInfo) {
                  setActiveDateInfo(dayDate);
                } else {
                  clickDay(dayDate);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (holiday && !activeDateInfo) {
                    setActiveDateInfo(dayDate);
                  } else {
                    clickDay(dayDate);
                  }
                }
              }}
              onMouseEnter={() => setHovered(dayDate)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(dayDate)}
              aria-label={`${format(dayDate, "MMMM d, yyyy")}${actToday ? " — today" : ""}${holiday ? " — holiday" : ""}`}
              aria-pressed={actStart || actEnd}
            >
               <span>{dayDate.getDate()}</span>
               
               {actToday && !actStart && !actEnd && !actInRange && (
                 <div className="w-1.5 h-1.5 rounded-full absolute bottom-2 shadow-sm" style={{ backgroundColor: theme.accent }}></div>
               )}

               {hasNote && !actStart && !actEnd && (
                 <div className="w-1 h-1 rounded-full absolute top-2 right-2 md:top-3 md:right-3" style={{ backgroundColor: actInRange ? 'var(--wc-surface-container-lowest)' : theme.accent }}></div>
               )}

               {holiday && (
                 <Star className="w-2 md:w-2.5 h-2 md:h-2.5 absolute top-1.5 right-1.5" style={{ color: "var(--wc-tertiary)", fill: "var(--wc-tertiary)" }} />
               )}

               {(actStart || actEnd) && (
                 <span className="absolute -bottom-3 text-[6px] md:text-[7px] tracking-widest uppercase font-black" style={{ color: "var(--wc-on-surface-variant)" }}>
                   {actStart && !actEnd ? "START" : actEnd && !actStart ? "END" : ""}
                 </span>
               )}

               {activeDateInfo && activeDateInfo.getTime() === dayDate.getTime() && (
                 <HolidayPopover 
                   date={activeDateInfo} 
                   onClose={() => setActiveDateInfo(null)} 
                   onToggleDayOff={toggleDayOff}
                   isDayOff={!!daysOff[dateStr]}
                 />
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
