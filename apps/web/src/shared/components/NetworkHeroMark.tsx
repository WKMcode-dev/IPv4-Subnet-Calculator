/** Animated, self-contained SVG. Honors reduced-motion preferences. */
export function NetworkHeroMark(){
 return <svg className="network-hero-svg" viewBox="0 0 180 160" role="img" aria-label="Losango inclinado com conexões de rede animadas">
  <defs>
   <linearGradient id="wkm-diamond" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#29473d"/><stop offset="100%" stopColor="#182a27"/>
   </linearGradient>
   <linearGradient id="wkm-edge" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#a6e8d0"/><stop offset="100%" stopColor="#36c995"/>
   </linearGradient>
  </defs>
  <g className="network-diamond">
   <path d="M 26 78 L 101 31 L 154 82 L 79 129 Z" fill="url(#wkm-diamond)" stroke="url(#wkm-edge)" strokeWidth="2.4" strokeLinejoin="round"/>
   <path d="M 26 78 L 79 129 L 79 135 L 26 84 Z" fill="#14231f" opacity=".75"/>
   <path d="M 79 129 L 154 82 L 154 88 L 79 135 Z" fill="#1b352d" opacity=".85"/>
  </g>
  <g className="network-symbol" stroke="#a6e8d0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
   <path className="network-link" d="M 57 85 L 83 65 L 110 82 L 133 57"/>
   <path className="network-link" d="M 83 65 L 83 47"/>
  </g>
  <g className="network-nodes" fill="#36c995">
   <circle cx="57" cy="85" r="4.4"/><circle cx="83" cy="65" r="4.4"/>
   <circle cx="110" cy="82" r="4.4"/><circle cx="133" cy="57" r="4.4"/>
   <circle cx="83" cy="47" r="4.4"/>
  </g>
  <circle className="network-pulse" r="3" fill="#e0fff0">
   <animateMotion dur="3.8s" repeatCount="indefinite" path="M 57 85 L 83 65 L 110 82 L 133 57"/>
  </circle>
 </svg>;
}
