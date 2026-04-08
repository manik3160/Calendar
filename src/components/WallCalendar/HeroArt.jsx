import { memo } from "react";

const HeroArt = memo(({ theme, isDarkMode }) => {
  const opacityBase = isDarkMode ? 0.3 : 0.6;
  
  const seed1 = (theme.monthIndex * 13) % 100;
  const seed2 = (theme.monthIndex * 27) % 100;
  
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-container-low transition-colors duration-1000 z-0">
      <svg 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`glow-${theme.monthIndex}`} cx={`${seed1}%`} cy={`${seed2}%`} r="60%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity={opacityBase + 0.2} />
            <stop offset="50%" stopColor={theme.accentDim} stopOpacity={opacityBase} />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id={`bg-grad-${theme.monthIndex}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--wc-surface-container-lowest)" />
            <stop offset="100%" stopColor={theme.accentDim} stopOpacity="0.4" />
          </linearGradient>

          <filter id="blur-filter">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill={`url(#bg-grad-${theme.monthIndex})`} />
        
        <circle 
          cx={`${50 + (seed1 % 30)}%`} 
          cy={`${40 + (seed2 % 20)}%`} 
          r="400" 
          fill={`url(#glow-${theme.monthIndex})`} 
          filter="url(#blur-filter)"
        />
        
        <circle 
          cx={`${10 + (seed2 % 40)}%`} 
          cy={`${80 - (seed1 % 30)}%`} 
          r="250" 
          fill={`url(#glow-${theme.monthIndex})`} 
          filter="url(#blur-filter)"
          opacity="0.8"
        />

        <path 
          d={`M 0,600 L ${150 + seed1 * 2},${300 + seed2} L ${300 + seed2 * 2},400 L ${500 + seed1},${200 + seed2} L 800,450 L 800,600 Z`}
          fill="var(--wc-surface-container)"
          opacity={isDarkMode ? "0.9" : "0.5"}
        />
        
        <path 
          d={`M -100,600 L ${200 + seed2},${350 + seed1} L 400,500 L ${700 + seed1 * 2},${250 + seed2} L 900,600 Z`}
          fill="var(--wc-surface-container-low)"
          opacity={isDarkMode ? "1" : "0.7"}
        />

        {Array.from({ length: 40 }).map((_, i) => (
          <circle 
            key={i}
            cx={`${(i * 37 + seed1) % 100}%`}
            cy={`${(i * 59 + seed2) % 100}%`}
            r={i % 3 === 0 ? 1.5 : 0.8}
            fill="var(--wc-on-surface)"
            opacity={isDarkMode ? (i % 2 === 0 ? 0.8 : 0.3) : (i % 2 === 0 ? 0.4 : 0.1)}
          />
        ))}
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-surface-container/20 to-transparent"></div>
    </div>
  );
});

HeroArt.displayName = "HeroArt";
export default HeroArt;
