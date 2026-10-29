import {describe,it,expect} from 'vitest';
import {calculate,parseIPv4,subnetAt,maskFromPrefix} from '../src/index';
describe('IPv4 core',()=>{
 it('calcula /26',()=>{const r=calculate('192.168.10.70/26');expect(r.network).toBe('192.168.10.64');expect(r.broadcast).toBe('192.168.10.127');expect(r.usableHosts).toBe(62);});
 it('calcula /8',()=>{const r=calculate('10.0.0.0/8');expect(r.usableHosts).toBe(16777214);expect(r.broadcast).toBe('10.255.255.255');});
 it('suporta /0',()=>{expect(calculate('8.8.8.8/0').totalAddresses).toBe(4294967296);expect(maskFromPrefix(0)).toBe(0);});
 it('suporta /31 e /32',()=>{expect(calculate('10.0.0.0/31').usableHosts).toBe(2);expect(calculate('10.0.0.1/32').usableHosts).toBe(1);});
 it('subdivide sem sobreposição',()=>{expect(subnetAt('192.168.10.0/24',26,3).network).toBe('192.168.10.192');});
 it('rejeita IPv4 inválido',()=>{expect(()=>parseIPv4('300.1.1.1')).toThrow();expect(()=>parseIPv4('1.2.3')).toThrow();});
});
