/** Isometric IPv4 network construction, with accessible reduced-motion fallback. */
export function NetworkHeroMark(){
 return <svg className="network-hero-svg network-isometric" viewBox="0 0 1000 620" role="img" aria-label="Plataforma isométrica construída em camadas, quatro nós emergentes e conexões animadas">
 <defs>
  <linearGradient id="wkm-surface" x2="1" y2="1"><stop stopColor="#363c43"/><stop offset="1" stopColor="#20262d"/></linearGradient>
  <linearGradient id="wkm-edge" x2="0" y2="1"><stop stopColor="#293039"/><stop offset="1" stopColor="#161c23"/></linearGradient>
  <radialGradient id="wkm-orb"><stop stopColor="#d8fff5"/><stop offset=".35" stopColor="#5ee6c2"/><stop offset="1" stopColor="#177c71"/></radialGradient>
  <filter id="wkm-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8"/></filter>
 </defs>
 <g className="iso-lower" fill="#19232b" stroke="#53616d" strokeWidth="3"><path d="M72 255 439 42 920 256 920 314 554 530 72 314Z"/></g>
 <g className="iso-middle" fill="#202c35" stroke="#617381" strokeWidth="3"><path d="M72 255 439 42 920 256 920 314 554 530 72 314Z"/></g>
 <g className="iso-platform" stroke="#75808a" strokeWidth="5" strokeLinejoin="round">
  <path d="M72 255 554 470 920 256 920 314 554 530 72 314Z" fill="url(#wkm-edge)"/>
  <path d="M72 255 439 42 920 256 554 470Z" fill="url(#wkm-surface)"/>
  <path d="M72 255 439 42 920 256 554 470Z" fill="none" stroke="#6fe4c3" strokeOpacity=".42" strokeWidth="2"/>
  <path d="M554 470V530" fill="none"/>
  <g fill="none" stroke="#a6e8d0" strokeWidth="1.5" strokeOpacity=".12">
   <path d="M192 307 558 94 M313 362 679 148 M434 416 800 203"/>
   <path d="M174 195 656 410 M292 127 774 342 M410 59 892 274"/>
  </g>
 </g>
 <g className="iso-network">
  <path className="iso-trace-glow" d="M290 266 450 173 610 266 770 173" pathLength="100" fill="none" stroke="#5ee6c2" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" filter="url(#wkm-glow)"/>
  <path className="iso-trace" d="M290 266 450 173 610 266 770 173" pathLength="100" fill="none" stroke="#5ee6c2" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  {([[290,300],[450,207],[610,300],[770,207]] as const).map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}>
   <g className={`iso-pore iso-pore-${i+1}`}><ellipse rx="20" ry="7" fill="#101b20" stroke="#5ee6c2" strokeOpacity=".45" strokeWidth="2"/></g>
   <g className={`iso-node iso-node-${i+1}`}>
    <circle r="26" fill="#5ee6c2" opacity=".2" filter="url(#wkm-glow)"/>
    <circle r="15" fill="url(#wkm-orb)" stroke="#8af4d9" strokeWidth="2"/>
    <ellipse cx="-4" cy="-6" rx="5" ry="3" fill="#e2fff7" opacity=".65"/>
   </g>
  </g>)}
  <circle className="iso-data-dot" r="5" fill="#e4fff7"><animateMotion dur="8s" repeatCount="indefinite" keyTimes="0;.56;.62;.85;1" keyPoints="0;0;0;1;1" calcMode="linear" path="M290 266 450 173 610 266 770 173"/></circle>
 </g>
 </svg>;
}
