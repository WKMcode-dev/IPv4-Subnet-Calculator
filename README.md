# WKM IPv4 Subnet Calculator

Calculadora profissional de IPv4, CIDR e sub-redes. Interface WKM Dark, monorepositório TypeScript e motor matemático desacoplado.

## Requisitos
- Node.js 20.19+ (recomendado 22 LTS)
- npm 10+

## Início rápido
```bash
npm install
npm run dev
```
Abra a URL exibida pelo Vite (normalmente http://localhost:5173).

## Qualidade
```bash
npm test
npm run typecheck
npm run build
```

## Estrutura
- `apps/web`: aplicação React/Vite, interface, componentes e funcionalidades.
- `packages/core`: biblioteca TypeScript pura, cálculos de IPv4/CIDR e testes.
- `docs`: decisões arquiteturais e evolução do produto.

## Regras importantes
- `/31`: 2 endereços utilizáveis em enlaces ponto a ponto (RFC 3021).
- `/32`: 1 endereço individual.
- `/0`: 2^32 endereços totais.
- O indicador 'não privado' **não** garante que um endereço seja público e roteável.
- A exportação CSV inclui **somente a página exibida** (12 sub-redes), evitando gerar arquivos gigantes involuntariamente.
- A paginação calcula sub-redes sob demanda; não materializa bilhões de registros.

## Próximas entregas
VLSM, comparação de redes, exportação completa sob demanda, SVGs personalizados e PWA.
