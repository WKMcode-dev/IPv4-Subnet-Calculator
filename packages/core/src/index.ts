export type SubnetResult = {
  input: string; ip: string; prefix: number; network: string; broadcast: string;
  mask: string; wildcard: string; firstHost: string; lastHost: string;
  totalAddresses: number; usableHosts: number; binary: string; hex: string;
  category: string; addressType: string;
};
export function parseIPv4(value: string): number {
  const parts = value.trim().split('.');
  if (parts.length !== 4 || parts.some(p => !/^\d{1,3}$/.test(p) || Number(p) > 255)) throw new Error('Informe um IPv4 válido (ex.: 192.168.10.1).');
  return parts.reduce((n, p) => ((n * 256) + Number(p)) >>> 0, 0);
}
export function formatIPv4(value: number): string {
  const n = value >>> 0;
  return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}
export function parseCIDR(input: string, fallbackPrefix = 24): { ip: number; prefix: number } {
  const [address, cidr, ...extra] = input.trim().split('/');
  if (extra.length || (cidr !== undefined && !/^\d{1,2}$/.test(cidr))) throw new Error('Prefixo CIDR inválido.');
  const prefix = cidr === undefined ? fallbackPrefix : Number(cidr);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw new Error('O prefixo deve estar entre /0 e /32.');
  return { ip: parseIPv4(address), prefix };
}
export function maskFromPrefix(prefix: number): number {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw new Error('Prefixo inválido.');
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
}
export function classifyIP(ip: number): string {
  const a = ip >>> 24, b = (ip >>> 16) & 255;
  if (a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return 'Privado (RFC 1918)';
  if (a === 127) return 'Loopback';
  if (a === 169 && b === 254) return 'Link-local';
  if (a === 0) return 'Este host / reservado';
  if (a >= 224 && a <= 239) return 'Multicast';
  if (a >= 240) return 'Reservado / experimental';
  if (a === 100 && b >= 64 && b <= 127) return 'Compartilhado (CGNAT)';
  if (a === 192 && b === 0 && ((ip >>> 8) & 255) === 2 || a === 198 && (b === 51 && ((ip >>> 8) & 255) === 100 || b === 18 && ((ip >>> 8) & 255) === 0) || a === 203 && b === 0 && ((ip >>> 8) & 255) === 113) return 'Documentação / teste';
  if (a === 255 && (ip & 0xffffff) === 0xffffff) return 'Broadcast limitado';
  return 'Não privado (verificar registro e roteabilidade)';
}
export function calculate(input: string, fallbackPrefix = 24): SubnetResult {
  const {ip, prefix} = parseCIDR(input, fallbackPrefix);
  const mask = maskFromPrefix(prefix), wildcard = (~mask) >>> 0;
  const network = (ip & mask) >>> 0, broadcast = (network | wildcard) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);
  const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.max(0, totalAddresses - 2);
  const first = prefix >= 31 ? network : network + 1;
  const last = prefix >= 31 ? broadcast : broadcast - 1;
  return {
    input, ip: formatIPv4(ip), prefix, network: formatIPv4(network), broadcast: formatIPv4(broadcast),
    mask: formatIPv4(mask), wildcard: formatIPv4(wildcard), firstHost: formatIPv4(first),
    lastHost: formatIPv4(last), totalAddresses, usableHosts,
    binary: Array.from({length:4}, (_,i) => ((ip >>> ((3-i)*8)) & 255).toString(2).padStart(8,'0')).join('.'),
    hex: '0x' + ip.toString(16).toUpperCase().padStart(8,'0'),
    category: classifyIP(ip),
    addressType: prefix === 32 ? 'Host / rota individual' : prefix === 31 ? 'Ponto a ponto (RFC 3021)' : ip === network ? 'Endereço de rede' : ip === broadcast ? 'Broadcast' : 'Host'
  };
}
export function* subdivide(input: string, newPrefix: number): Generator<SubnetResult> {
  const base = calculate(input);
  if (!Number.isInteger(newPrefix) || newPrefix < base.prefix || newPrefix > 32) throw new Error('Novo prefixo fora do intervalo permitido.');
  const count = 2 ** (newPrefix - base.prefix);
  const step = 2 ** (32 - newPrefix);
  const start = parseIPv4(base.network);
  for (let i = 0; i < count; i++) yield calculate(`${formatIPv4((start + i * step) >>> 0)}/${newPrefix}`);
}
export function subnetAt(input: string, newPrefix: number, index: number): SubnetResult {
  const base = calculate(input);
  if (!Number.isInteger(newPrefix) || newPrefix < base.prefix || newPrefix > 32) throw new Error('Novo prefixo inválido.');
  const count = 2 ** (newPrefix - base.prefix);
  if (!Number.isSafeInteger(index) || index < 0 || index >= count) throw new Error('Índice de sub-rede inválido.');
  const start = parseIPv4(base.network), step = 2 ** (32 - newPrefix);
  return calculate(`${formatIPv4((start + index * step) >>> 0)}/${newPrefix}`);
}
