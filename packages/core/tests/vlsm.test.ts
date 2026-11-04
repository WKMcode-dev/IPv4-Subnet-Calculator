import {describe,it,expect} from 'vitest';
import {planVLSM} from '../src/vlsm';
describe('VLSM planner',()=>{
 it('aloca maiores redes primeiro, sem sobreposição',()=>{
  const p=planVLSM('192.168.10.0/24',[{id:'a',name:'TI',hosts:20},{id:'b',name:'Admin',hosts:100},{id:'c',name:'Operação',hosts:50}]);
  expect(p.allocations.map(a=>a.subnet.network+'/'+a.subnet.prefix)).toEqual(['192.168.10.0/25','192.168.10.128/26','192.168.10.192/27']);
  expect(p.unallocated).toHaveLength(0);
 });
 it('informa quando bloco não comporta as demandas',()=>{
  const p=planVLSM('10.0.0.0/30',[{id:'a',name:'Grande',hosts:100},{id:'b',name:'Pequena',hosts:2}]);
  expect(p.unallocated.map(x=>x.id)).toEqual(['a']);
  expect(p.allocations[0].subnet.network).toBe('10.0.0.0');
 });
 it('respeita alinhamento CIDR',()=>{
  const p=planVLSM('10.0.0.0/24',[{id:'a',name:'Único',hosts:1},{id:'b',name:'Pequeno',hosts:2}]);
  expect(p.allocations[0].subnet.prefix).toBe(30);
  expect(p.allocations[1].subnet.network).toBe('10.0.0.4');
 });
 it('rejeita hosts inválidos e IDs duplicados',()=>{
  expect(()=>planVLSM('10.0.0.0/24',[{id:'a',name:'Teste',hosts:-1}])).toThrow();
  expect(()=>planVLSM('10.0.0.0/24',[{id:'a',name:'A',hosts:1},{id:'a',name:'B',hosts:2}])).toThrow();
 });
});
