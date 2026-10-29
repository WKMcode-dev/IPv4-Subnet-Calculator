import { useMemo, useState } from 'react';
import { Plus, Trash2, RotateCcw, Download } from 'lucide-react';
import { planVLSM, type VLSMRequest } from '@wkm/core';

const initial: VLSMRequest[] = [
 {id:'1',name:'Administração',hosts:100},
 {id:'2',name:'TI',hosts:50},
 {id:'3',name:'Câmeras',hosts:20},
 {id:'4',name:'Enlace',hosts:2}
];
export function VLSMCalculator() {
 const [network,setNetwork]=useState('192.168.10.0/24');
 const [requests,setRequests]=useState<VLSMRequest[]>(initial);
 const [counter,setCounter]=useState(5);
 const result=useMemo(()=>{try{return {plan:planVLSM(network,requests),error:''};}catch(e){return {plan:null,error:e instanceof Error?e.message:'Falha no cálculo'};}},[network,requests]);
 const update=(id:string,patch:Partial<VLSMRequest>)=>setRequests(old=>old.map(r=>r.id===id?{...r,...patch}:r));
 const exportCSV=()=>{
  if(!result.plan)return;
  const rows=[['Departamento','Hosts solicitados','Rede','Máscara','Primeiro host','Último host','Broadcast','Hosts disponíveis'],
   ...result.plan.allocations.map(a=>[a.name,a.requestedHosts,`${a.subnet.network}/${a.subnet.prefix}`,a.subnet.mask,a.subnet.firstHost,a.subnet.lastHost,a.subnet.broadcast,a.subnet.usableHosts])];
  const csv=rows.map(row=>row.map(value=>'"'+String(value).replaceAll('"','""')+'"').join(',')).join('\r\n');
  const blob=new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download='wkm-vlsm.csv';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 return <div className="vlsm-page">
  <div className="hero"><div><span className="eyebrow">NETWORK ENGINEERING / VLSM</span><h1>Planejador <span>VLSM</span></h1><p>Distribuição de sub-redes por demanda, priorizando os maiores blocos.</p></div></div>
  <section className="vlsm-cutout">
   <svg className="vlsm-outline" viewBox="0 0 800 220" preserveAspectRatio="none" aria-hidden="true">
    <path d="M 12 10 L 635 10 Q 645 10 645 20 L 645 46 Q 645 56 655 56 L 788 56 L 788 208 Q 788 218 778 218 L 12 218 Q 2 218 2 208 L 2 20 Q 2 10 12 10 Z" fill="#1b1e24" stroke="#373d47" strokeWidth="2"/>
    <path d="M 665 10 L 778 10 Q 788 10 788 20 L 788 44 Q 788 50 782 50 L 655 50 L 655 20 Q 655 10 665 10 Z" fill="#242930" stroke="#373d47" strokeWidth="2"/>
   </svg>
   <button className="vlsm-cutout-action" onClick={()=>{setNetwork('192.168.10.0/24');setRequests(initial);setCounter(5);}} title="Restaurar exemplo"><RotateCcw size={15}/> Restaurar</button>
   <div className="vlsm-cutout-body"><label>Bloco de rede disponível<input value={network} onChange={e=>setNetwork(e.target.value)} spellCheck={false} placeholder="192.168.10.0/24"/></label><p>O bloco será dividido automaticamente em redes sem sobreposição. Endereços não alocados permanecem livres.</p></div>
  </section>
  <section className="panel"><div className="section-top"><div><h2>Demandas de rede</h2><p>Informe a quantidade de hosts de cada setor.</p></div><button className="secondary" onClick={()=>{setRequests(r=>[...r,{id:String(counter),name:'Nova rede',hosts:10}]);setCounter(c=>c+1);}}><Plus size={15}/> Adicionar rede</button></div>
   <div className="vlsm-input-list">{requests.map(r=><div className="vlsm-input-row" key={r.id}><label>Nome<input aria-label="Nome da rede" value={r.name} onChange={e=>update(r.id,{name:e.target.value})}/></label><label>Hosts<input aria-label={`Hosts de ${r.name}`} type="number" min="1" step="1" value={r.hosts} onChange={e=>update(r.id,{hosts:Number(e.target.value)})}/></label><button className="secondary vlsm-remove" title="Remover rede" aria-label={`Remover ${r.name}`} onClick={()=>setRequests(old=>old.filter(x=>x.id!==r.id))}><Trash2 size={16}/></button></div>)}</div>
  </section>
  {result.error&&<div className="error" role="alert">{result.error}</div>}
  {result.plan&&<section className="panel"><div className="section-top"><div><h2>Plano de endereçamento</h2><p>{result.plan.allocations.length} redes alocadas · {result.plan.remainingAddresses.toLocaleString('pt-BR')} endereços não utilizados</p></div><button className="secondary" onClick={exportCSV}><Download size={15}/> Exportar CSV</button></div>
  {result.plan.unallocated.length>0&&<div className="vlsm-warning" role="alert">Bloco insuficiente para: {result.plan.unallocated.map(r=>r.name).join(', ')}. Aumente o bloco disponível ou reduza as demandas.</div>}
  <div className="table-scroll"><table><thead><tr><th>Setor</th><th>Hosts pedidos</th><th>Rede / CIDR</th><th>Máscara</th><th>Primeiro host</th><th>Último host</th><th>Broadcast</th><th>Capacidade</th></tr></thead><tbody>{result.plan.allocations.map(a=><tr key={a.id}><td>{a.name}</td><td>{a.requestedHosts}</td><td className="accent">{a.subnet.network}/{a.subnet.prefix}</td><td>{a.subnet.mask}</td><td>{a.subnet.firstHost}</td><td>{a.subnet.lastHost}</td><td>{a.subnet.broadcast}</td><td>{a.subnet.usableHosts}</td></tr>)}</tbody></table></div></section>}
 </div>;
}
