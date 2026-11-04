import { useEffect, useRef, useState, type ReactNode } from 'react';

type CutoutCardProps = {
  children: ReactNode;
  action: ReactNode;
  className?: string;
};

/**
 * Pixel-based SVG geometry: all convex and concave corners are 10px,
 * independent of card width or height. The SVG is intentionally unclipped.
 */
export function CutoutCard({children,action,className=''}:CutoutCardProps) {
 const ref=useRef<HTMLElement>(null);
 const [size,setSize]=useState({width:800,height:250});
 useEffect(()=>{
  const node=ref.current;
  if(!node)return;
  const update=()=>setSize({width:node.clientWidth,height:node.clientHeight});
  update();
  const observer=new ResizeObserver(update);
  observer.observe(node);
  return ()=>observer.disconnect();
 },[]);
 const w=size.width,h=size.height,r=10;
 const right=w-1,bottom=h-1,left=1,top=1;
 const notchWidth=Math.min(120,Math.max(100,w*.25));
 const tabLeft=right-notchWidth;
 const gap=8;
 const mainTopEnd=tabLeft-gap;
 const shelfY=49;
 const mainPath=[
  `M ${left+r} ${top}`,
  `H ${mainTopEnd-r}`,
  `Q ${mainTopEnd} ${top} ${mainTopEnd} ${top+r}`,
  `V ${shelfY-r}`,
  `Q ${mainTopEnd} ${shelfY} ${mainTopEnd+r} ${shelfY}`,
  `H ${right-r}`,
  `Q ${right} ${shelfY} ${right} ${shelfY+r}`,
  `V ${bottom-r}`,
  `Q ${right} ${bottom} ${right-r} ${bottom}`,
  `H ${left+r}`,
  `Q ${left} ${bottom} ${left} ${bottom-r}`,
  `V ${top+r}`,
  `Q ${left} ${top} ${left+r} ${top}`,
  'Z'
 ].join(' ');
 const tabPath=[
  `M ${tabLeft+r} ${top}`,
  `H ${right-r}`,
  `Q ${right} ${top} ${right} ${top+r}`,
  `V ${shelfY-gap-r}`,
  `Q ${right} ${shelfY-gap} ${right-r} ${shelfY-gap}`,
  `H ${tabLeft+r}`,
  `Q ${tabLeft} ${shelfY-gap} ${tabLeft} ${shelfY-gap-r}`,
  `V ${top+r}`,
  `Q ${tabLeft} ${top} ${tabLeft+r} ${top}`,
  'Z'
 ].join(' ');
 return <section ref={ref} className={`cutout-card ${className}`}>
  <svg className="cutout-card-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
   <path d={mainPath} className="cutout-card-main"/>
   <path d={tabPath} className="cutout-card-tab"/>
  </svg>
  <div className="cutout-card-action">{action}</div>
  <div className="cutout-card-content">{children}</div>
 </section>;
}
