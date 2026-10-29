# Arquitetura

## Camadas
1. `packages/core`: domínio e matemática sem dependências de UI.
2. `apps/web/src/features`: funcionalidades independentes da apresentação global.
3. `apps/web/src/shared`: componentes reutilizáveis.
4. `apps/web/src/app`: composição e estado da aplicação.

## Decisões
- Node.js é necessário para ferramentas de build, não para executar cálculos no servidor.
- A primeira versão é totalmente client-side.
- Cálculos de endereços usam inteiros unsigned de 32 bits e potências de 2 em `number` (2^32 é exato em JavaScript).
- A geração de sub-redes usa índices e paginação; não armazena toda a coleção.
- SVGs futuros devem ser componentes em `shared` ou na feature correspondente.
