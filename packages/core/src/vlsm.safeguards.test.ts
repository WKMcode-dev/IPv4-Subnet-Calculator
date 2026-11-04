import {describe,it,expect} from 'vitest';
import {planVLSM} from './vlsm';
describe('VLSM planning safeguards',()=>{
 it('reserves network and broadcast for a one-host LAN',()=>{
  const p=planVLSM('192.168.1.0/24',[{id:'1',name:'Um host',hosts:1}]);
  expect(p.allocations[0].subnet.prefix).toBe(30);
  expect(p.allocations[0].subnet.usableHosts).toBe(2);
 });
 it('allocates largest requests first without overlap',()=>{
  const p=planVLSM('10.0.0.0/24',[{id:'1',name:'Pequena',hosts:10},{id:'2',name:'Grande',hosts:100}]);
  expect(p.allocations.map(a=>a.name)).toEqual(['Grande','Pequena']);
  expect(p.unallocated).toHaveLength(0);
 });
 it('reports insufficient address space',()=>{
  const p=planVLSM('10.0.0.0/30',[{id:'1',name:'Grande',hosts:100}]);
  expect(p.unallocated).toHaveLength(1);
 });
 it('rejects duplicate identifiers and fractional host counts',()=>{
  expect(()=>planVLSM('10.0.0.0/24',[{id:'a',name:'A',hosts:1},{id:'a',name:'B',hosts:2}])).toThrow();
  expect(()=>planVLSM('10.0.0.0/24',[{id:'a',name:'A',hosts:1.5}])).toThrow();
 });
});
