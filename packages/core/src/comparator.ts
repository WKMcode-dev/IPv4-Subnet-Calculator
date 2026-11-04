import {calculate,parseIPv4} from './index';
export type NetworkRelationship='equal'|'a-contains-b'|'b-contains-a'|'disjoint';
export type NetworkComparison={a:ReturnType<typeof calculate>;b:ReturnType<typeof calculate>;relationship:NetworkRelationship;intersectionAddresses:number;intersectionStart:string|null;intersectionEnd:string|null};
export function compareNetworks(aInput:string,bInput:string):NetworkComparison{
 const a=calculate(aInput),b=calculate(bInput);
 const aStart=parseIPv4(a.network),aEnd=parseIPv4(a.broadcast),bStart=parseIPv4(b.network),bEnd=parseIPv4(b.broadcast);
 const start=Math.max(aStart,bStart),end=Math.min(aEnd,bEnd);
 const overlap=start<=end;
 const relationship:NetworkRelationship=!overlap?'disjoint':aStart===bStart&&aEnd===bEnd?'equal':aStart<=bStart&&aEnd>=bEnd?'a-contains-b':bStart<=aStart&&bEnd>=aEnd?'b-contains-a':'disjoint';
 const toIP=(n:number)=>[n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
 return {a,b,relationship,intersectionAddresses:overlap?end-start+1:0,intersectionStart:overlap?toIP(start):null,intersectionEnd:overlap?toIP(end):null};
}
