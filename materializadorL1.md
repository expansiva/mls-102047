# Materializador L1 — briefing para quem vai construir

> Escrito em 05/10/2026 pelo planner l4, a pedido do Wagner, para o time que vai construir o materializador do backend e não acompanhou as
> decisões. É o par do `materializadorL2.md`. O que está aqui é **desenho decidido**, com as frases do Wagner. O que ainda não existe está marcado
> como **pendente**. Na dúvida, a fonte de verdade são os arquivos citados, não este resumo.

## Princípio: o defs tem a intenção e os compromissos, não o script

> **Wagner, 05/10/2026:** *"O defs deve ter a intenção, não o script para o materializador"*. Teste para qualquer campo: ele diz **o que** tem de ser, ou **como** fazer?

| entra no defs | exemplo | por quê |
|---|---|---|
| **intenção** | JSDoc da rota (finalidade, processamento), intenção da página, texto do organismo, regras com o texto | é o que a LLM precisa para decidir bem |
| **compromisso** (cruza fronteira, não pode variar) | rota, tipos de entrada e saída, `access`, `rules` por rota, que entidades e usecases existem, autoridade de cada rota | se variar, quebra o outro lado ou a segurança |
| **script (não entra; onde ainda existe, é pista)** | `uses`, `params`, árvore de saída, `sequence` do usecase, listas de entrada e saída copiadas do l4, ligações decididas por regra mecânica | a LLM com o l4 decide melhor, e cada campo desses pede um gate |

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

### 2.1 Como ler os defs: o que é fonte e o que é pista (Wagner, 05/10)
*"fazer o básico no defs e deixar a LLM definir com o l4, para evitar definir um monte de campos com um monte de gates"*.
- **Fonte:**
  - o **contrato** da página: tipos, JSDoc (`doc`), `rules` e `access` de cada rota;
  - o **l4** do módulo (`l4/<mod>/`): ontologia, regras com o texto, jornadas e access;
  - o **inventário** do def, isto é, que entidades, portas, usecases (entidade + operação), serviços de pedido e controllers existem, e a autoridade de
    cada rota.
- **Pista** (ajuda, não manda): os campos de implementação do def, ou seja, os `uses` e os `params` do serviço de pedido, a árvore `output`, as regras
  por usecase (`rules`/`rulePlan`; o `rulesApplied` passou a compromisso em 15/10, §10), as listas de `input`/`output` do usecase e a `sequence`. **Onde a pista diverge do contrato ou do l4,
  vale o contrato e o l4.** Campo vazio ou `unresolved` não quer dizer "não existe": quer dizer "decida pelo contrato e pelo l4".
- Exemplos reais (comandaRestaurante, bancada `c0f25ee`), todos casos de "vale o l4":
  1. entradas do contrato sem `params` (o `doc` diz o que cada uma filtra);
  2. `uses` faltando para um nó de saída (por exemplo, os itens da comanda nos comandos `lancarItem`/`cancelarItem`; o indicador do `inicio` com
     `uses: []`);
  3. a `mesa` do fechamento como `unresolved` (é `Mesa.code` + `Mesa.details.disponivel`);
  4. `details` do cardápio sem abrir (abrir o tipo do contrato até a folha);
  5. regra no usecase errado: vale a regra da rota e o texto da regra (por exemplo, `itensSomenteEmComandaAberta` é do lançamento de item);
  6. create aceitando o que o sistema define: o estado nasce no inicial, o número vem da sequência, o desconto e o pagamento são do fechamento, e o
     `precoUnitario` é copiado do cardápio, como diz a regra.

### 2.2 Manutenção: regra alterada só no texto (Wagner, 08/10)
*"Sobre uma mudança na rule, simples, o correto seria materializar novamente, porque irá pegar a rule alterada."*
- Quando só o **texto** de uma regra do l4 muda (ex.: "exige anotação" → "exige anotação com pelo menos 20 caracteres"), **nenhum def muda**: os defs
  guardam o id. O esforço calculado (`describeEffort`, `l2/helpers/effort/` em cada master) responde `materialize` para as unidades que **aplicam**
  o id e nada a regerar.
- Para isso funcionar, **a unidade rematerializada tem de ler o texto atual da regra no l4** (`l4/<mod>/rules.defs.ts`, pelo id que o def guarda) e
  implementá-lo. Um caminho que gera a unidade só pelos campos do def, sem ler o texto da regra, não pega a mudança.
- Medido em 08/10 no `agentMaterializeL1` de hoje (`mls-102021` `ccb1765`): o usecase de transição com uma porta e `transitionRef` é emitido sem LLM, só
  pelos campos do def (`handlers/behavior/emitBehavior.ts:121-133`), e o contexto das dependências leva só o hash, não o texto
  (`context/context.ts:68-77`). Hoje, rematerializar o `registrarAtendimento` depois de mudar o texto da regra gera o mesmo código.

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
- **Regras (até 15/10; ver §10):** o usecase trazia `rulePlan`. Uma regra `pending` com `gap: RULE_UNBOUND` é uma regra do negócio que o D1 não conseguiu amarrar. Ela tem de
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

- **Os defs L1 do comandaRestaurante estão regerados sobre o contrato final** (bancada `c0f25ee`, D1 `complete`, 46 defs). As divergências conhecidas
  entre pista e l4 estão em §2.1 e **não serão corrigidas no gerador agora**: o def será enxugado até o básico depois que o materializador estiver pronto.
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

## 9. Página de vários papéis: o backend filtra por quem chama (Wagner, 13/10/2026)

*"na tela pode ter seções hidden ou sem mostrar campos, seria da responsabilidade do materializador fazer isto"*; *"no defs colocamos o que deve
ser feito (how), o materializador tem as informações e irá fazer a página, ele deve resolver, só não pode o defs estar errado"*.

O L2 passa a aceitar numa página o campo que **algum** dos seus papéis vê (`l2_d2_93`). Hoje o backend gerado não suporta isso (medido em 13/10):
- `authorize` exige que quem chama tenha **todos** os papéis dos grants da rota (`mls-102021/l2/agentMaterializeL1/emitters/emit.ts:559-583`;
  `emitters/gate.ts:92-113` `decideRoute`): fora do alpha, quem tem um papel só leva **403** numa rota compartilhada. O alpha
  (`alphaAllAuthorities`, `mls-102034/l1/server/layer_2_controllers/execBff.ts:160-178`) dá todos os papéis a todos e esconde isso.
- A projeção da rota é uma só, fixa na materialização, pela interseção (`emit.ts:750-764`, `:1010-1019`); `emitAccess`/`grantsOf` descartam
  `entityRefs` e `allowedFields` (`:141-176`, `:1061-1072`).
- `scopeParams` força o escopo `own` para todo mundo quando a rota tem um grant `own` (`:541-557`).

O que precisa mudar no materializador L1 (mesma coisa na cópia `handlers/structure/emit.ts` e `gate.ts`):
1. `authorize` por **qualquer** papel que a pessoa tem entre os da rota;
2. a resposta projetada pelos grants **de quem chama** (o `accessScope` já tem `actorRef`, `entityRefs` e `allowedFields` por grant;
   `sessionContext.actorScope` já chega ao handler em `execBff.ts:263`); sem papel, fecha;
3. `scopeParams` aplica `own` só para o grant do papel que a pessoa tem;
4. testes com quem chama tendo **um** papel só (`testing/obligations.ts:298` hoje dá todos).
O D1 já decide por papel desde 15/10 (`l1_d1_70`): a rota leva o campo que algum papel vê; filtrar por quem chama é esta mudança do materializador.

## 10. O usecase fica só com a intenção (Wagner, 15/10/2026)

*"acho melhor corrigirmos agora"* · *"as regras usadas são importantes, sobre a manutenção do agentMaterializadorL1, será feito, e tem um arquivo no
root do 102047 para passar informações para a equipe"*. Mesmo caminho do shared do L2 (`materializadorL2.md` §10). Spec do gerador:
`todo/gerarApp/how/tasks/backlog/l1_d1_74_usecase_so_intencao.md` (roda depois que o inscricaoEvento for gerado e materializado no formato de hoje).

### O def de usecase depois da troca
```
data: {
  usecaseId,          // também o nome da função
  entityId, operation,
  transitionRef?,     // só em transição; payload e regras da transição: l4/<mod>/ontology/<Entidade>.defs.ts
  rulesApplied,       // ids que o usecase TEM de cumprir: os locais + os pendentes RULE_UNBOUND; o texto: l4/<mod>/rules.defs.ts
  effects,            // como hoje: { eventId, path, symbol }[]
  mdm?                // como hoje
}
```
**Saem:** `ports`, `functions`, `portCalls`, `transactional`, `sequence`, `uses`, `rules`, `rulePlan`, `transaction`, `lifecycle`. O `schemaVersion` fica
(`2026-09-24-d1-definition-v2`); os outros tipos de def não mudam. Alpha: uma versão só, sem leitor duplo. **Os defs L1 de hoje** (agendaClinica,
comandaRestaurante, reembolsoDespesas, inscricaoEvento) **ficam inválidos** até serem regerados: o validador é o mesmo para o D1 e para vocês
(`mls-102021/l2/helpers/l1Defs/definition.ts:78-82`, `DATA_KEYS`).

### Onde cada informação passa a estar
| antes (no usecase) | agora |
|---|---|
| `functions[0].functionName` | `usecaseId` |
| `functions[].input`/`output` | a operação, a entidade (`layer_3_domain/entities/<e>.defs.ts`) e as rotas que chamam o usecase (`requestService` + contrato L2) |
| `ports` | a entidade: `storageTarget: 'moduleDatabase'` ⇒ a porta da entidade (`layer_2_application/ports/`); continua nas `dependencies` do def |
| `portCalls`, `transaction`, `transactional` | a operação (`list`/`get` leem; `create`/`update`/transição gravam numa transação); a transação do comando está no `requestService` |
| `uses` (filter/selector/concurrency) | a operação: `id` filtra em leitura e seleciona em update/transição; `version` é concorrência em update/transição |
| `lifecycle` (payload da transição) | `transitionRef` + a transição no L4 |
| `rulePlan` / `rules` | `rulesApplied` + o texto da regra no L4. As linhas de **chave única** (`#uniqueKeys`) saem do `rulePlan`: as chaves estão no def `table` (`uniqueKeys`) e no L4 |
| `sequence` | não há roteiro: a ordem é decisão de vocês, com o texto das regras e o `doc` da rota |

### O que muda no `agentMaterializeL1` (medido em 15/10, `mls-102021`)
1. **Validador:** `helpers/m12Units.ts:73-76` carrega cada def por `readDefinition` (o mesmo `DATA_KEYS`): os defs novos passam, os antigos não.
   `parseDefinitionExport` (`emitters/emit.ts:1213-1226`, usado no `loadUses`) não valida chave: conferir que nada dependa disso.
2. **Nome e tipos da função:** `readFunction` (`emitters/emit.ts:1235-1242`), `emittedValueExports` (`:1027-1039`), `emitUsecase` (`:201-205`, `:216-250`,
   `:272-273`), `loadUses` do serviço de pedido (`:855-859`), `steps/usecases40/context.ts:172-175` (`FUNCTION_MISSING`), `emitBehavior.ts:302`,
   `:316-324`, `:1419-1465` (`signaturePaths`, `inputNames`, `outputNames`, `firstFunctionName`): nome pelo `usecaseId`; entrada/saída pela operação, pela
   entidade e pelas rotas.
3. **Porta:** `emit.ts:219-226` (`PORT_UNBOUND`), `:251-275` (scaffold), `:642-652` (`portBindings`, precisa da dependência `/ports/`, que continua),
   `:866-870`, `:1002-1004`; `emitBehavior.ts:127,131,297,874`: porta pela entidade.
4. **Regras:** `helpers/m12Materialize.ts:172-191` (`rulesToEnforce`, `RULE_NOT_EMITTED`), `steps/usecases40/context.ts:178-188`, `:199-201`, `:238-241`,
   `:406,415`; `emitBehavior.ts:133`, `:1280-1285`, `:1606-1626`: a lista a cumprir é o `rulesApplied`, e o texto vem de `l4/<mod>/rules.defs.ts`
   (isso também resolve o §2.2: rematerializar passa a ler o texto atual). **Sem isso, as regras deixam de ser cumpridas sem erro.**
5. **Chaves únicas:** `emitBehavior.ts:1475-1481` (`readUniqueKeys`), `:1519-1522` (`constraintRuleId`, `UNIQUE_RULE_UNNAMED`): pelo def `table`.
6. **Transição:** `steps/usecases40/context.ts:260-267` (`transitionOf` lê `lifecycle.transitionId`) → `transitionRef`; `emitBehavior.ts:1255-1281`
   (`planTransition`: payload, `portCalls`, `uses`): payload pelo L4, método da porta pela operação, seletor `id`.
7. **Update/seletor:** `emitBehavior.ts:132` (rota de update pelo primeiro `portCalls`), `:1348-1353` (`selectorField` pelo `uses`): pela operação.
8. **MDM:** `steps/usecases40/context.ts:308-311` e `emitters/context.ts:25-27` (`usesMdm` olha `sequence` com `kind:'mdm'`): fica só a dependência da
   ontologia MDM / o `mdm` do def.
9. **Prompt e fluxo:** `steps/usecases40/prompt.md:13,29,35,43,55-56,60-61` citam `ports`/`uses`/`rulePlan`/`sequence`/`transaction`; o título da seção
   em `context.ts:193` ("rulePlan and sequence are hints"); `flow.json:54,115,120` (`RULE_NOT_EMITTED`).
10. **Testes que vão quebrar (esperado):** o da bancada que valida o comandaRestaurante do 102047 (`agentMaterializeL1.test.ts`, ~:374, e os casos
    `RULE_NOT_EMITTED`/`UNIQUE_RULE_UNNAMED` ~:446-447), os de `rulesToEnforce`/`rulePlan` (~:213-224) e o de `usesMdm` (~:642-645). O caso
    `listBuoyPending` de `fixtures/cases.ts` é ajustado pelo D1 nesta task (dado de teste compartilhado com os testes do D1).

O que **não** muda para vocês: `domainEntity`, `requestService`, `accessScope`, `httpController`, persistência, `authorityMap`, `integrationOutbound`.


## 11. Serviço de workflow no L1: o def `workflowProcess` (How planner, 16/10/2026; direção aprovada pelo Wagner em 15/10)

Módulos com processo no L4 (`l4/<mod>/workflows.defs.ts`) passam a ter **um def por processo** em
`l1/<mod>/layer_2_application/workflows/<processId>.defs.ts`. É o 14º tipo de artefato (`artifactType: 'workflowProcess'`). Desenho do How:
`todo/gerarApp/how/docs/l1/workflow_servico_no_l1_20261016.md`; spec do gerador: `how/tasks/backlog/l1_d1_75_def_do_processo_de_workflow.md`.
Piloto: `tarefas` (`l4/tarefas`, gerado em `7495be0`), o primeiro L4 com `functions` por processo.

### O def
```
data: {
  processId,
  trigger,       // { kind: 'manual'|'event'|'scheduled', actorRef? | event? | schedule? } copiado do L4
  occurrence?,   // { entityId }: o registro de negócio que a Task referencia (ausente quando o processo não cria registro, ex.: aviso recorrente)
  functions,     // os functionId do L4; a prosa de cada um (quem chama, o que valida, grava, avisa, devolve e o que acontece ao repetir) está em
                 // l4/<mod>/workflows.defs.ts processes[].functions[].description — é a fonte, leiam lá
  operations     // [{ operation: 'Entidade.<op>' | 'Entidade.<transição>', steps: ['journey:<j>/<step>' | 'task:<taskId>'] }]: as operações de
                 // entidade alcançadas de etapas do processo; uma operação sem usecase no pool fica listada, com aviso POOL_ABSENT no run
}
```
`integrationOutbound` **perde** `processes[]` (vocês não liam) e o aviso `SCHEDULER_NOT_WRITTEN`.

### O que o def quer dizer (intenção, não roteiro)
- **Há um serviço de workflow na camada de aplicação**, ao lado dos usecases de entidade e dos serviços de página, **uma função por `functionId`**.
  Não é outro usecase de entidade nem um endpoint próprio: o BFF da página da jornada chama a função; **a função decide** se abre a ocorrência ou
  avança a etapa (Wagner, 15/10: *"a tela chama a função pelo BFF, e a função decide"*). O BFF não cria Task nem mensagem por conta própria.
- **As `operations` dizem quais handlers passam pelo serviço:** o handler da rota cujo usecase é uma dessas operações chama a função do processo
  (qual função: pela prosa do L4, que diz *"Chamada pelas telas de execução, revisão, retomada e cancelamento"*), e a função reaproveita o usecase e
  a porta da entidade, sem contornar identidade, autoridade e escopo. Uma operação que serve jornada em processo e jornada fora (`Tarefa.update`:
  reatribuir × editar) é uma função só que decide (`reatribuirQuemAge` só age quando o responsável muda).
- **`occurrence` é o vínculo registro ↔ Task:** o registro fica na tabela do módulo; a Task guarda a referência `{ project, module, entity,
  recordId, processId, workflowVersion }` e o andamento `{ etapa, quem age agora, histórico }`. Nada do negócio é copiado para a Task, nada do
  andamento vai para a tabela, salvo campo que o L4 declare.
- **Chave de idempotência da criação:** `ctx.requestMeta.requestId`. A página manda uma chave por submissão (§11 do `materializadorL2.md`;
  aviso ao runtime `todo/runtime/tasks/backlog/fromHow_chave_de_submissao_no_bff.md`). `abrirOcorrencia*` com a mesma chave devolve o mesmo registro
  e a mesma Task.
- **`trigger.kind: 'scheduled'`** roda no `onTick` do módulo (`mls-102034/l1/server/layer_2_application/tick/moduleTick.ts`, a cada minuto) com
  `evaluateSchedule` lendo a prosa do `schedule`; o `lastRun` fica na `tdm` do módulo (no `tarefas`, o próprio `AvisoVencimento` por responsável e dia).
- **Transições de sistema sem jornada e sem evento** (`AvisoVencimento.concluirAviso`/`falharAviso`, `by: []`) não têm usecase: a função
  (`gerarAvisosDiarios`) as aplica pela entidade e pela porta (precedente d1_73).
- **Os compromissos da direção** valem para a função, não para o def: não duplicar ao reenviar, não misturar ocorrências, não adiantar etapa,
  recuperar a falha parcial entre o app e o collab-messages sem presumir transação única, prender a ocorrência à versão do workflow, nenhuma espera
  segura request/transação/navegador, um só motor com o andamento.

### Collab-messages: o que ainda não existe
`TaskData` não tem campo para a referência nem para o andamento; abrir ocorrência hoje são três passos (`addMessage` → `createDynamicWorkflowTask` →
`ensureTaskRoom`). Os pontos estão nomeados em `todo/collabMessages/tasks/backlog/fromHow_task_da_ocorrencia_de_modulo.md`; até o contrato sair, a
chamada ao `msg` é o ponto a isolar (um adaptador em `layer_1_external`), e o resto do serviço não espera por ele.

### O que muda no `agentMaterializeL1` (medido em 16/10, `mls-102021` `b74df2f`)
1. `helpers/m12Core.ts:68-84` (`LAYER_OF_TYPE`): sem entrada, o def sai como `TYPE_UNPLANNED` (`m12Units.ts:81`); `m12Materialize.ts:46` e
   `core/registry.ts:50,67`/`emitters/registry.ts:50,67` (handler por tipo). Camada sugerida: `usecases` (aplicação).
2. `emitters/emitPersistence.ts:303-313` (`emitOutbound`): continua lendo só `events`; nada a fazer por `processes` sair.
3. O serviço, o adaptador do `msg` e o `onTick` são código novo de vocês; o def diz o quê, o L4 diz a prosa, o contrato da rota diz a entrada e a saída.

## 12. O que o D1 passou a entregar desde 15/10 e muda a leitura (l1Supervisor, 16/10/2026)

Medido nos defs gerados do `inscricaoEvento` e do `reembolsoDespesas` (102047 `c0029de`). Gerador: `mls-102021` `aeccbec`, `5988189`, `0658ff7`, `e43830d`
(d1_73) e `f990ecf`…`2c87dae` (d1_75).

### Evento com `consumer` que não é usecase
- Em `layer_1_external/adapters/integration/outbound.defs.ts`, `events[].consumer` é o usecase que dispara o evento. **Quando nenhum usecase selecionado
  executa a transição**, o `consumer` fica com o nome da transição (`"Entidade.transição"`), sem dependência para usecase, e o run traz o aviso `POOL_ABSENT`.
- Caso real: `inscricaoPromovida` com `consumer: "Inscricao.promover"`. A transição é de sistema (`by: []` no L4) e quem a aplica é o processo
  `promoverListaEspera` (§11: `operations` = `Inscricao.promover` [`task:promoverPrimeiraDaFila`]), disparado pelo evento `Inscricao.cancelar`. Publiquem o
  evento onde a transição acontece, na função do processo.
- Evento em operação (`on: "Inscricao.create"`) liga ao usecase da mesma entidade e operação (`consumer: "createInscricao"`); sem esse usecase, cai no caso
  acima (`"Entidade.create"` + `POOL_ABSENT`).

### Transição sem ator (`by: []`)
O def de entidade (`layer_3_domain/entities/<e>.defs.ts`, `lifecycle.transitions[]`) traz a transição com `by: []` e os `ruleRefs`. Não há usecase nem rota
para ela: quem a aplica é a regra ou a função do processo (ver §11, `AvisoVencimento`).

### Rota do contrato sem handler (lacuna de rota)
Uma rota do contrato L2 que o D1 não consegue ligar a um usecase com autoridade sai **declarada como lacuna** e **sem handler no controller**:
no `layer_2_application/requests/<página>.defs.ts`, o item de `requests[]` da rota tem `output: [{ kind: "unresolved", path: <rota>, reason }]`, e o run
traz o aviso `ROUTE_UNRESOLVED`. Caso real: `inscricaoEvento.gestao_eventos.qryExportarInscritosCsv` (saída `{ nomeArquivo, conteudoCsv }`, sem entidade →
`AUTHORITY_REQUIRED`). **O handler é de vocês:** entrada, saída, regras e `access` estão no contrato da rota (`l2/<mod>/web/contracts/<página>.defs.ts`); a
autorização segue o `access` dela, sem atalho.

### Processo sem operações no `reembolsoDespesas`
`aprovarDespesaEnviada` e `aprovarDespesaReenviada` saem com `occurrence: Despesa` e `operations: []`. A jornada de decisão do L4
(`l4/reembolsoDespesas/journeys/analisarDecidirDespesa.defs.ts`) só tem passos `locate`/`inspect`/`decide`, sem `act`, e o `aprovarDespesaReenviada` não tem
jornada em `journeyDecisions`. A aprovação/rejeição (`Despesa`) está na jornada, não no def; o aviso foi ao How planner
(`todo/gerarApp/how/tasks/backlog/toPlanner_d1_75_reembolso_processo_sem_passo_act.md`) e pode mudar quando o L4 for regerado.

### Sem efeito para vocês
- Grant `fieldsOnly` só com `deniedFields`: o D1 resolve a negação numa lista permitida e grava `allowedFields` como antes (d1_69).
- "Derivado na entrada de uma leitura é filtro" (d1_73): o usecase já não traz entrada (§10).
