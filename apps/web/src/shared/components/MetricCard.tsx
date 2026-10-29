import {Copy} from 'lucide-react';
export function MetricCard({label,value,hint}:{label:string,value:string|number,hint?:string}){
 return <div className="metric"><div className="metric-head"><span>{label}</span><button title={`Copiar ${label}`} aria-label={`Copiar ${label}`} onClick={()=>navigator.clipboard.writeText(String(value))}><Copy size={14}/></button></div><strong>{value}</strong>{hint&&<small>{hint}</small>}</div>;
}
