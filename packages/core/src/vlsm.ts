import { calculate, formatIPv4, parseIPv4, type SubnetResult } from './index';

export type VLSMRequest = { id: string; name: string; hosts: number };
export type VLSMAllocation = { id: string; name: string; requestedHosts: number; subnet: SubnetResult; wastedHosts: number };
export type VLSMPlan = { base: SubnetResult; allocations: VLSMAllocation[]; usedAddresses: number; remainingAddresses: number; unallocated: VLSMRequest[] };

function prefixForHosts(hosts: number): number {
  if (!Number.isSafeInteger(hosts) || hosts < 1) throw new Error('A quantidade de hosts deve ser um inteiro positivo.');
  // /31 is valid for a two-endpoint point-to-point link, but ordinary LAN requests use /30 or larger.
  if (hosts === 1) return 32;
  const bits = Math.ceil(Math.log2(hosts + 2));
  if (bits > 32) throw new Error('Quantidade de hosts excede o IPv4.');
  return 32 - bits;
}

export function planVLSM(input: string, requests: VLSMRequest[]): VLSMPlan {
  const base = calculate(input);
  if (requests.length === 0) throw new Error('Adicione pelo menos uma rede.');
  if (requests.length > 1000) throw new Error('Limite de 1.000 redes por planejamento.');
  const ids = new Set<string>();
  for (const r of requests) {
    if (!r.id.trim() || ids.has(r.id)) throw new Error('Cada rede precisa de um identificador único.');
    ids.add(r.id);
    if (!r.name.trim()) throw new Error('Informe o nome de cada rede.');
    prefixForHosts(r.hosts);
  }
  const sorted = [...requests].sort((a,b) => b.hosts - a.hosts);
  let cursor = parseIPv4(base.network);
  const endExclusive = cursor + base.totalAddresses;
  const allocations: VLSMAllocation[] = [];
  const unallocated: VLSMRequest[] = [];
  for (const request of sorted) {
    const prefix = prefixForHosts(request.hosts);
    const size = 2 ** (32 - prefix);
    const aligned = Math.ceil(cursor / size) * size;
    if (aligned + size > endExclusive) { unallocated.push(request); continue; }
    const subnet = calculate(`${formatIPv4(aligned)}/${prefix}`);
    allocations.push({ id: request.id, name: request.name, requestedHosts: request.hosts, subnet, wastedHosts: subnet.usableHosts - request.hosts });
    cursor = aligned + size;
  }
  const usedAddresses = allocations.reduce((sum, item) => sum + item.subnet.totalAddresses, 0);
  return { base, allocations, usedAddresses, remainingAddresses: base.totalAddresses - usedAddresses, unallocated };
}
