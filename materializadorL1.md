# Materializador L1 — briefing para quem vai construir

> Escrito em 05/10/2026 pelo planner l4, a pedido do Wagner, para o time que vai construir o materializador do backend e não acompanhou as
> decisões. É o par do `materializadorL2.md`. O que está aqui é **desenho decidido**, com as frases do Wagner. O que ainda não existe está marcado
> como **pendente**. Na dúvida, a fonte de verdade são os arquivos citados, não este resumo.

## 1. Onde isto se encaixa

A cadeia de um módulo (mapa completo em `todo/gerarApp/cadeia.md`):

```
L4 (negócio) → planners (menu, needs, backend, effort) → agentDefsL2 (defs do frontend + CONTRATO por página)
                                                       → agentDefsL1 (defs do backend, lendo o contrato)
              → MATERIALIZADOR L1 (este) → .ts do backend + registro do módulo + casos do monitor → publish
```

O materializador **lê defs e gera código**. Ele não decide negócio e não inventa campo, rota ou regra. O que já existe hoje é
`mls-102021/l2/agentMaterializeL1/`, que gera boa parte do código **por template**: o serviço de pedido e o controller nunca passam por LLM (§4).
Estamos em alpha: tudo é regerado, nada é migrado.

## 2. O que chega (produzido pelo `agentDefsL1`)

Para um módulo `<mod>` do projeto cliente, em `l1/<mod>/`. A tabela usa o comandaRestaurante como exemplo; o formato dos defs é
`schemaVersion: "2026-09-24-d1-definition-v2"`, com `artifactType`, `dependencies` e `data`:

| pasta | `artifactType` | o que é |
|---|---|---|
| `layer_3_domain/entities/` | `domainEntity` | a entidade: campos, invariantes, ciclo de vida, onde mora (`storageTarget`) |
| `layer_2_application/ports/` | `repositoryPort` | a porta do repositório da entidade |
| `layer_2_application/usecases/` | `usecase` | **um por entidade e operação** (`create`, `get`, `list`, `update`, transição): portas, regras, sequência, transação, efeitos |
| `layer_2_application/requests/` | `requestService` | **o serviço de pedido de uma página**: uma função por rota do contrato. É o BFF da página |
| `layer_2_application/scope/` | `accessScope` | o escopo de dados por ator (organização, próprio, relacionado) |
| `layer_1_external/adapters/http/controllers/` | `httpController` | um por página: cada rota, o grant e a função do serviço que ela chama |
| `layer_1_external/adapters/persistence/` | `table`, `repositoryAdapter`, `repositoryRegistration`, `persistenceSeeds` | tabela, adaptador do repositório, registro e dados iniciais |
| `layer_1_external/adapters/integration/` | `integrationOutbound` | eventos que saem do módulo |
| `layer_1_external/auth/` | `authorityMap` | o mapa de autoridades |

E a fonte que manda em tudo isso: o **contrato da página**, `l2/<mod>/web/contracts/<pageId>.defs.ts` (§3).

## 3. O contrato: o que a página precisa, não de onde vem

Decisões de 04/10, registradas em `todo/gerarApp/l4/docs/como-deve-ser-o-l2.md`:

- **BFF por página.** Cada rota `<mod>.<pageId>.<requestId>` é uma função da página: *"podemos pensar que cada endpoint é uma função, tem a
  finalidade, entrada, processamento e saída"*.
- **O JSDoc de cada rota é a especificação do endpoint**, escrita para LLM e para gente: finalidade, entrada, processamento (filtros, regras da ação,
  cálculos) e saída.
- **Saídas compostas e agregadas.** Exemplos: a comanda com os itens; os indicadores do salão.
  - *"o ideal é um BFF que retorne os indicadores, o cálculo fica no l1, no endpoint e não no usecases"*.
  - O endpoint compõe e calcula; o usecase continua de entidade e operação.
- **O contrato não diz de onde vem o dado.** Não há `meta` de origem: *"Se um campo 'endereço' não preciso dizer em que tabela, só que preciso de tal
  informação e o l1 é responsável por prover aquela informação"*.
  - Os nomes de campo seguem as chaves da ontologia do l4.
  - A partir do contrato, do JSDoc e do l4, **o L1 decide como prover**.
- **O comando é atômico:** *"Se na tela tenho uma função exemplo 'aprovaUsuario' isto é um serviço, que pode gerar vários usecases, alterar várias
  tabelas, de preferência ou tudo ou nada (atômico)"*. O retorno do comando é o que a página redesenha.
- **`rules` e `access` por rota:** o que o backend tem de garantir e quem pode chamar. O frontend pode validar antes, mas **quem garante é o backend**.

## 4. Como o backend se organiza (102021)

- **Hexagonal, com o usecase independente da tela** (d1_44, Wagner, 30/09): *"o l1 montar o usecases a partir dos endpoints é um defeito antigo que
  viola o modelo hexagonal"*. O usecase nasce da entidade e da operação e aceita o que a entidade aceita. O recorte por tela é do serviço de pedido.
- **O serviço de pedido é onde mora o processamento do JSDoc:** chama um ou mais usecases, compõe (cabeçalho com itens), filtra ("só comandas
  abertas"), calcula (indicadores) e projeta exatamente a saída do contrato. Hoje ele é emitido por template
  (`agentMaterializeL1/handlers/structure/emit.ts:721`, `emitRequestService`) e só sabe chamar um usecase por chave e projetar campos. **Para as
  saídas compostas e agregadas, o corpo do endpoint precisa ser escrito a partir do JSDoc** (por LLM ou pelo time).
- **O usecase recebe LLM só quando não é derivável:** mais de uma porta, operação fora das derivadas, regra local
  (`handlers/behavior/emitBehavior.ts:121-133`, `behaviorNeedsLlm`).
- **Regras:** o usecase traz `rulePlan`. Uma regra `pending` com `gap: RULE_UNBOUND` é uma regra do negócio que o D1 não conseguiu amarrar. Ela tem de
  ser implementada lendo o texto em `l4/<mod>/rules.defs.ts`, e não ignorada. Exemplo do comandaRestaurante: `umaComandaAbertaPorMesa` e
  `mesaDisponivelParaAbrirComanda` no `createComanda`.
- **Campo que o sistema preenche:** por exemplo, o `precoUnitario` do item da comanda é o preço vigente do cardápio no lançamento
  (`precoUnitarioRegistradoNoLancamento`). A tela não manda; o backend preenche. Prova pendente no monitor.

## 5. Peças de runtime em uso (102034; confira antes de usar)

- `AppError` e `RequestContext`: `/_102034_/l1/server/layer_2_controllers/contracts.js`.
- `resolveRepository`: `/_102034_/l1/server/layer_2_application/repositoryRegistry.js`.
- Dados do módulo: `/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js`. A paginação é `page`/`pageSize` → limit/offset, com padrão 20,
  teto 200 e corte declarado, nunca silencioso.
- MDM: `ctx.mdm` (`mdmFacade.ts`), descrito em `todo/gerarApp/contratos.md` §"Fachada MDM".
- Registro do módulo no `l5`: `agentMaterializeL1/register/reconcileL5.ts` (rotas e `routeKeys`).

## 6. Regras do ambiente que já custaram caro

- **Roda no navegador, no Studio.** O agente nunca depende de Node, disco, processo filho ou biblioteca de servidor; o `collabmsg` só simula o
  navegador.
- **Prova = compilação pelo compilador do Studio** (TypeScript 5.0.2 nesta etapa). O `tsc` 5.9 do mls-base é auxiliar e não prova nada.
- **Casos de teste para o monitor:** `.test.ts` no formato do monitor (`mls-base/skills/monitorTests.md`). O caso de negócio roda pelo monitor, contra o
  runtime. Um vermelho vira achado nomeado.
- **Imports** começam com `/` e terminam com `.js`.
- **Textos em i18n** (default en).
- **Sem hard code de módulo:** o mesmo materializador serve todos os módulos, sem mapa por domínio.
- **Código privado do agente:** nada fora da pasta do materializador importa de dentro dela, e ele não importa pasta de outro agente. O compartilhado
  vai para `mls-102021/l2/helpers/` (`mls-base/skills/agentCodeIsPrivate.md`).
- **Sem erro silencioso:** `catch` mudo e default inválido custaram dias. A mensagem aponta a causa.
- **Status do def:** `pending`, `generated`, `blocked`, `failed`. `generated` só depois de gravar, compilar e passar as verificações
  (`todo/gerarApp/l1/doc/agentMaterializeL1.md` §"Status e manutenção").

## 7. Pendências que afetam o materializador (05/10)

- **Os defs L1 do comandaRestaurante na bancada são do contrato antigo** (`c6fe294`, com `meta`). Serão regerados sobre o contrato novo
  (`todo/gerarApp/l4/tasks/backlog/p4_30_publicar_comandaRestaurante_l2_l1.md`). **Pendente.**
- **D1 sem `meta`** (fila `todo/gerarApp/l1/tasks/backlog/00_l1_contrato_sem_meta.md`, em andamento):
  - o D1 deriva a rota pelos tipos;
  - o que o código não resolve vira **lacuna declarada** (`unresolved`) no def, e o D1 fecha `complete`. O materializador resolve a lacuna ou recusa
    com o nome;
  - a etapa `resolve25` usa LLM para as lacunas;
  - **d1_61:** o def do serviço de pedido passa a levar o JSDoc e as `rules` de cada rota.
- **Paginação, ordenação e filtros pela molécula:** desenho para depois (Wagner, 04/10). Até lá, o contrato usa uma forma só de lista.
- **O que se gera do contrato e como o endpoint composto e agregado é escrito** (template, LLM ou time): está **por decidir** com o Wagner.

## 8. Quem procurar

- Decisões de desenho: Wagner.
- Formatos e specs do L1: `todo/gerarApp/l1/agents/planner/STATE.md` e `todo/gerarApp/l1/doc/` (`agentDefsL1.md`, `agentMaterializeL1.md`).
- Contratos entre sub-projetos: `todo/gerarApp/contratos.md`.
- O desenho do BFF por página: `todo/gerarApp/l4/docs/como-deve-ser-o-l2.md`.
