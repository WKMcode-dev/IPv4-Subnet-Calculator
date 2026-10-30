import {useEffect,useRef,useState} from 'react';
import {Check,Copy} from 'lucide-react';

export function MetricCard({label,value,hint}:{label:string,value:string|number,hint?:string}){
 const ref=useRef<HTMLDivElement>(null);
 const [size,setSize]=useState({w:320,h:110});
 const [copied,setCopied]=useState(false);
 useEffect(()=>{
  const element=ref.current;
  if(!element)return;
  const resize=()=>setSize({w:element.clientWidth,h:element.clientHeight});
  resize();
  const observer=new ResizeObserver(resize);
  observer.observe(element);
  return ()=>observer.disconnect();
 },[]);
 const w=size.w,h=size.h;
 // Shape based on the provided SVG: 10px exterior corners,
 // a 24px inward curve and a separate circular 20px-radius action.
 const main=[
  'M 11 1',`H ${w-59}`,`Q ${w-49} 1 ${w-49} 11`,
  'V 25',`A 24 24 0 0 0 ${w-25} 49`,
  `H ${w-11}`,`Q ${w-1} 49 ${w-1} 59`,
  `V ${h-11}`,`Q ${w-1} ${h-1} ${w-11} ${h-1}`,
  `H 11`,`Q 1 ${h-1} 1 ${h-11}`,'V 11','Q 1 1 11 1','Z'
 ].join(' ');
 const circle=`M ${w-41} 21 A 20 20 0 1 1 ${w-1} 21 A 20 20 0 1 1 ${w-41} 21 Z`;
 const copy=async()=>{try{await navigator.clipboard.writeText(String(value));setCopied(true);}catch{setCopied(false);}};
 return <div className="metric metric-cutout" ref={ref}>
  <svg className="metric-cutout-svg" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
   <path d={main}/><path d={circle}/>
  </svg>
  <button className="metric-copy-action" title={`Copiar ${label}`} aria-label={`Copiar ${label}`} onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>}</button>
  <div className="metric-head"><span>{label}</span></div>
  <strong>{value}</strong>{hint&&<small>{hint}</small>}
 </div>;
}
