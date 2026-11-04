import type {SubnetResult} from '@wkm/core';
export function BinaryVisualizer({result}:{result:SubnetResult}){
 const bits=result.binary.replaceAll('.','');
 return <section className="panel binary-panel"><div className="section-top"><div><h2>Visualização binária</h2><p>Os primeiros {result.prefix} bits identificam a rede; os demais, os hosts.</p></div><span className="pill">32 BITS</span></div><div className="octets">{[0,1,2,3].map(o=><div className="octet" key={o}>{bits.slice(o*8,o*8+8).split('').map((b,i)=><span className={o*8+i<result.prefix?'network-bit':'host-bit'} key={i}>{b}</span>)}</div>)}</div><div className="legend"><span><i className="green-dot"/> {result.prefix} bits de rede</span><span><i className="blue-dot"/> {32-result.prefix} bits de host</span></div></section>;
}
