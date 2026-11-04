# WKM IPv4 Subnet Calculator

Ferramenta gratuita de engenharia de redes IPv4, executada inteiramente no navegador, sem servidor ou coleta de endereços inseridos.

**Aplicação:** https://wkmcode-dev.github.io/IPv4-Subnet-Calculator/

## Funcionalidades

- **Calculadora IPv4/CIDR:** endereço de rede, máscara, wildcard, broadcast, faixa de hosts, capacidade, classificação e representação binária.
- **Subdivisão:** tabela paginada de sub-redes com seleção de novo prefixo e exportação CSV da página atual.
- **Planejador VLSM:** demandas por setor, alocação do maior bloco para o menor, verificação de capacidade, indicação de demandas não atendidas e CSV.
- **Comparador:** dois blocos IPv4/CIDR, igualdade, contenção e redes distintas, com contagem e intervalo de endereços em comum.
- **Interface:** tema WKM Dark, visualização SVG animada com respeito à preferência por movimento reduzido e layout adaptável.

## Desenvolvimento local

Requisitos: Node.js >=20.19 e npm.

```bash
npm ci
npm run dev
```

## Verificações

```bash
npm run typecheck
npm test
npm run build
```

O build estático é gerado em `apps/web/dist`. O GitHub Actions publica automaticamente a branch `main` no GitHub Pages.

## Estrutura

- `apps/web`: React, Vite e interface.
- `packages/core`: cálculos IPv4, CIDR, VLSM e comparação.
- `docs`: documentação de arquitetura.

## Convenções de endereçamento

- `/31`: dois endereços utilizáveis para enlaces ponto a ponto (RFC 3021).
- `/32`: endereço individual.
- O planejador VLSM trata solicitações como **redes LAN convencionais** e reserva endereços de rede e broadcast; não utiliza `/31` automaticamente.
- `/0`: 4.294.967.296 endereços.
- Endereço classificado como não privado não é necessariamente roteável na Internet.
- Exportação CSV da subdivisão inclui somente a página visível, para evitar gerar bilhões de linhas.
- O comparador trabalha com blocos CIDR canônicos: quando se intersectam, são iguais ou um contém o outro.

## Licença

Consulte os arquivos de licença do repositório, quando disponíveis.
