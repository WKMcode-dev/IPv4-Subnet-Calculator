import {describe,it,expect} from 'vitest';
import {compareNetworks} from './comparator';
describe('IPv4 network comparator',()=>{
 it('identifies equal networks even for host inputs',()=>{const c=compareNetworks('192.168.1.9/24','192.168.1.200/24');expect(c.relationship).toBe('equal');expect(c.intersectionAddresses).toBe(256)});
 it('detects containment in both directions',()=>{expect(compareNetworks('10.0.0.0/8','10.1.2.0/24').relationship).toBe('a-contains-b');expect(compareNetworks('10.1.2.0/24','10.0.0.0/8').relationship).toBe('b-contains-a')});
 it('detects disjoint blocks',()=>{const c=compareNetworks('192.168.0.0/25','192.168.0.128/25');expect(c.relationship).toBe('disjoint');expect(c.intersectionAddresses).toBe(0)});
 it('handles the entire IPv4 space',()=>{const c=compareNetworks('0.0.0.0/0','255.255.255.255/32');expect(c.relationship).toBe('a-contains-b');expect(c.intersectionAddresses).toBe(1)});
 it('rejects invalid input',()=>expect(()=>compareNetworks('999.1.1.1/24','10.0.0.0/8')).toThrow());
});
