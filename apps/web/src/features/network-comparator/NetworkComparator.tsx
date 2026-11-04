import {useMemo,useState} from 'react';
import {ArrowLeftRight,RotateCcw,Info} from 'lucide-react';
import {compareNetworks} from '@wkm/core';
import {CutoutCard} from '../../shared/components/CutoutCard';
import {MetricCard} from '../../shared/components/MetricCard';
const descriptions={
 equal:['Redes idênticas','Os dois blocos representam exatamente o mesmo intervalo IPv4.'],
 'a-contains-b':['Rede A contém a rede B','Todos os endereços da rede B pertencem à rede A.'],
 'b-contains-a':['Rede B contém a rede A','Todos os endereços da rede A pertencem à rede B.'],
 overlap:['Redes sobrepostas','As redes compartilham parte de seus endereços.'],
 disjoint:['Redes distintas','Os intervalos de endereços não possuem interseção.']
} as const;
export function NetworkComparator(){
 const [a,setA]=useState('192.168.10.0/24');
 const [b,setB]=useState('192.168.10.128/25');
 const result=useMemo(()=>{try{return {data:compareNetworks(a,b),error:''}}catch(e){return {data:null,error:e instanceof Error?e.message:'Endereço inválido'}}},[a,b]);
 const c=result.data;
 return <><div className="hero"><div><span className="eyebrow">NETWORK ENGINEERING / IPV4</span><h1>Comparador de <span>Redes</span></h1><p>Compare blocos CIDR e identifique automaticamente a relação entre suas faixas de endereços.</p></div><ArrowLeftRight size={48} color="#36c995"/></div>
 <CutoutCard className="input-panel" action={<button className="cutout-action-button" onClick={()=>{setA('192.168.10.0/24');setB('192.168.10.128/25')}}><RotateCcw size={15}/> Restaurar</button>}>
 <div className="section-top"><div><h2>Configuração da comparação</h2><p>Informe dois endereços IPv4 com prefixo CIDR (/0 a /32).</p></div></div>
 <div className="input-grid comparator-inputs"><label>Rede A<input spellCheck={false} value={a} onChange={e=>setA(e.target.value)} placeholder="192.168.10.0/24"/></label><button className="secondary comparator-swap" title="Inverter redes" aria-label="Inverter redes" onClick={()=>{setA(b);setB(a)}}><ArrowLeftRight size={18}/></button><label>Rede B<input spellCheck={false} value={b} onChange={e=>setB(e.target.value)} placeholder="192.168.10.128/25"/></label></div>
 {result.error&&<div className="error" role="alert"><Info size={16}/>{result.error}</div>}</CutoutCard>
 {c&&<><section className="panel comparator-result" aria-live="polite"><span className="eyebrow">RESULTADO DA ANÁLISE</span><h2>{descriptions[c.relationship][0]}</h2><p>{descriptions[c.relationship][1]}</p><div className="comparator-intersection"><span>Endereços em comum</span><strong>{c.intersectionAddresses.toLocaleString('pt-BR')}</strong>{c.intersectionStart&&<small>{c.intersectionStart} — {c.intersectionEnd}</small>}</div></section>
 <div className="comparator-columns">{[[c.a,'Rede A'],[c.b,'Rede B']].map(([r,label])=>{const x=r as typeof c.a;return <section className="panel comparator-network" key={label as string}><span className="eyebrow">{label as string}</span><h2>{x.network}/{x.prefix}</h2><dl>{[['Máscara',x.mask],['Broadcast',x.broadcast],['Primeiro host',x.firstHost],['Último host',x.lastHost],['Hosts utilizáveis',x.usableHosts.toLocaleString('pt-BR')],['Total de endereços',x.totalAddresses.toLocaleString('pt-BR')],['Máscara curinga',x.wildcard]].map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl></section>})}</div>
 <div className="metrics comparator-metrics"><MetricCard label="Endereços da rede A" value={c.a.totalAddresses.toLocaleString('pt-BR')}/><MetricCard label="Endereços da rede B" value={c.b.totalAddresses.toLocaleString('pt-BR')}/><MetricCard label="Endereços em comum" value={c.intersectionAddresses.toLocaleString('pt-BR')}/></div></>}</>;
}
