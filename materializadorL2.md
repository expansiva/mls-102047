# Materializador L2 novo — briefing para quem vai construir

> Escrito em 30/09/2026 (atualizado em 02/10) pelo planner L2 a pedido do Wagner, para quem vai construir o novo
> materializador do frontend e não acompanhou as decisões. O que está aqui é **desenho decidido**,
> com as frases do Wagner. O que ainda não existe está marcado como **pendente**. Na dúvida, a fonte
> de verdade são os arquivos citados, não este resumo.

## 1. Onde isto se encaixa

A cadeia de geração de um módulo (mapa completo em `todo/gerarApp/cadeia.md`):

```
L4 (negócio, pronto) → planners (menu, needs, backend, effort) → agentDefsL2 (defs do frontend)
                                                               → agentDefsL1 (defs do backend)
                     → MATERIALIZADOR L2 (este) → .ts/.less/.test.ts do frontend → publish
```

O materializador **lê defs e gera código**. Ele não decide negócio, não inventa campo e não chama o
backend fora do contrato. O materializador atual, `mls-102020/l2/agentMaterializeL2/`, é **incompatível**
com os defs novos. Ele não deve ser adaptado nem ganhar leitor duplo: o novo substitui o antigo.
Estamos em alpha, então tudo é regerado e nada é migrado.

## 2. O que chega por página (produzido pelo `agentDefsL2`)

Para cada página `<pageId>` de um módulo `<mod>` do projeto cliente, em `l2/<mod>/web/`:

| arquivo | o que é | estado em 30/09 |
|---|---|---|
| `contracts/<pageId>.defs.ts` | **contrato BFF v2**: os pedidos da página, com tipos literais de input/output, `meta`, `rules` e `access` | **existe** (controleEstoque, 01/10) |
| `shared/<pageId>.defs.ts` | **shared v2**: states, funções, pedidos, forms, parâmetros de entrada, jornadas, rules e access, comuns aos dois devices | **existe** (controleEstoque, 01/10) |
| `desktop/page11/<pageId>.defs.ts` | **page11 v2 desktop**: intenção, sections com `purpose`, organismos em prosa com intents, moléculas sugeridas, template collabux | **existe** (controleEstoque) |
| `mobile/page11/<pageId>.defs.ts` | page11 v2 mobile, com os mesmos organismos e prosa própria | **existe** (controleEstoque) |

Página sem leitura nem escrita (hub, por exemplo `inicio`; d2_70, 02/10): o shared não tem `load` nem pedido, só funções
`navigate`, e o contrato é o arquivo vazio `export {};` (o parser devolve zero rotas). O materializador não gera chamada de
BFF para essa página.

Formatos e exemplos:
- page11 v2: `todo/gerarApp/l2/doc/plano_d2_page11_v2_2026-09-30.md`;
- shared v2 e contrato v2: `todo/gerarApp/l2/doc/plano_d2_shared_contrato_2026-09-30.md`.

Exemplos reais: `mls-102047/l2/controleEstoque/web/{contracts,shared,desktop/page11,mobile/page11}/produtos.defs.ts`.
O controleEstoque foi regerado em 02/10 com a d2_62 e a d2_63a (`mls-102047` `7eded58`), e já tem `load<Key>` e o
retorno do comando (seção 5).

Também servem de contexto:
- o template collabux referenciado em `page11.template`, em `_102020_/l4/collabux/templates/<categoria>/<page>.md`. Nas palavras do próprio template: *"the defs wins on DATA and this skill wins on BEHAVIOR"*;
- o design system do projeto, `l2/designSystem.ts`;
- as moléculas sugeridas, com o índice e o `usage` de cada grupo (`_102040_/l2/molecules/<grupo>/index.defs.ts` e `_102020_/l2/aura/molecules/skills/<Grupo>/usage.ts`).

## 3. Ordem de geração (Wagner, 30/09)

> “o materializador deve primeiro gerar o contracts, depois o shared e depois os pagexx, porque um
> depende do outro para contexto”
>
> “a LLM que for materializar deverá ler o .d.ts do shared e o .defs.ts também, um custo a mais”

1. **Contrato.** O `.defs.ts` já é TypeScript de tipos. O que o materializador precisa gerar a partir
   dele, se é um cliente tipado ou apenas o uso direto, está **pendente de desenho**. Ponto de partida:
   o transporte de hoje é `execBff` de `/_102029_/l2/bffClient.js`.
2. **Shared** `shared/<pageId>.ts`: a classe com os states e as funções, que chama os pedidos do
   contrato. Gera também o `.d.ts` do shared (hoje salvo como `<pageId>Dts.txt`), que é o contexto da etapa 3.
3. **Páginas** `desktop/page11/<pageId>.ts` + `.less` e o mesmo em `mobile/`: a LLM lê o `.d.ts` do
   shared e o `page11.defs.ts` do device. A página **só renderiza e chama funções do shared**; não tem
   estado de negócio nem chamada BFF própria.

Os ids de state e de função do shared são **estáveis** entre gerações. O materializador deve mantê-los
exatamente, porque as páginas e os testes dependem deles.

## 4. O modelo BFF: o que o contrato promete

- **Pedido da tela, não usecase do backend.** Wagner: *"Se na tela tenho uma função exemplo
  'aprovaUsuario' isto é um serviço, que pode gerar vários usecases, alterar várias tabelas, de
  preferência ou tudo ou nada (atômico)"*. A rota é `<mod>.<pageId>.<requestId>`, e o frontend nunca
  sabe quais usecases ou tabelas existem.
- **Poucas chamadas por página.** Há uma carga `load` com vários objetos (ex. `{ movimentacoes,
  produtos }`) e **um comando atômico por ação** do usuário. O detalhe usa o item já carregado quando
  basta; quando precisa de coleção relacionada, há `load<Entity>(id)`.
- **"Sem mais e sem menos".** O output traz exatamente os campos que os organismos leem, mais `id`.
  `version` vem quando a página altera o registro, porque é a precondição de escrita MDM e deve ser
  reenviada. Campos derivados (ex. saldo) vêm `readonly`, são calculados pelo backend e nunca editados.
- **O comando devolve** os objetos que a página precisa para atualizar seus states. Usar esse retorno
  para atualizar a tela; não chamar `load` de novo.
- **`rules` e `access`** vêm por pedido. O frontend pode validar antes de enviar (ex. quantidade ≥ 0),
  mas quem garante é o backend. `access` diz o ator e o grant, e não substitui a sessão.

## 5. O que o shared manda o código fazer

- **Paginação e filtro.** Wagner: *"o shared deve ter condições de comandar isto, ler mais dados e
  atualizar os states"*.
  - A carga inicial `load` já traz a 1ª página de cada lista, com as chaves de paginação no output.
  - Cada lista com busca ou paginação tem um pedido próprio, `load<Key>` (Key = chave da lista no output), que
    devolve **só** aquela lista e as chaves de paginação. Ele usa a mesma projeção e o mesmo `meta` do `load`.
  - `filter<List>` chama `load<Key>` desde o início e substitui a lista; `loadMore<List>` chama a próxima
    página e acrescenta. Nenhum dos dois chama `load`, então os outros objetos da página não são recarregados.
- **Forms.** O menu separa o organismo de campos (`form`) do organismo de botão (`actions`). O shared
  os une em `forms: { <form>: { organism, submit } }`. O form é um state, e a função de envio lê esse
  state. A página renderiza os dois organismos ligados ao mesmo state.
- **Parâmetros de entrada (toda página).** Wagner: *"Toda página tem que ter uma leitura de campos
  opcionais que podem vir na URL ou estar no local storage, a navegação é importante"*.
  - `entry.params` lista os parâmetros. Todos são opcionais.
  - Cada parâmetro é lido da URL; se estiver ausente, do localStorage, com chave `<mod>.<pageId>.<param>`.
    A URL vence.
  - O efeito é declarado: selecionar, filtrar ou pré-preencher.
  - Os parâmetros com `persist` são gravados no localStorage ao mudar.
  - O tipo vem do contrato; converter de verdade (number/boolean) em vez de fazer cast.
- **Comando.** Todo state em `updates` de um comando é alimentado por uma chave do retorno dele. Exemplo:
  `registrarMovimentacao` devolve `{ movimentacaoEstoque, produto }`, porque o saldo do produto muda. O código
  atualiza os states com esse retorno.
- **Navegação.** As funções `navigate` levam `carries` (ex. `produtoId: produtoSelecionado.id`) para os
  `entry.params` da página de destino. Só `navigate` tem `carries`, e `navigate` não tem `sets`.
- **Seleção.** Um parâmetro com efeito `select:<organism>` guarda o id na URL. O state é sempre o **item**,
  resolvido pelo id na lista carregada, e nunca o id solto.
- **Rules por pedido.** Cada pedido traz só as regras pertinentes a ele, e todo comando mantém pelo menos uma
  regra da entidade que escreve.
- **Jornadas.** `journeys` diz qual passo de negócio cada organismo e função atende, e em qual página o
  passo continua (`continuesIn`). Use para textos, foco e ordem de interação, e depois para os casos de teste.

## 6. Regras do ambiente que já custaram caro

- **Roda no navegador, no Studio.** O agente nunca depende de Node, disco, processo filho ou biblioteca
  de servidor. O `collabmsg` só simula o navegador. Capacidade que o navegador não tem não decide nada.
  (`todo/gerarApp/l2/tasks/completed/conduta_20260928_agentes_rodam_no_browser.md`)
- **Prova = compilação no Studio.** O agente compila o que gerou pelo compilador do Studio e repara com
  orçamento. Compilação quebrada bloqueia os dependentes. Compilador indisponível não é "limpo".
  (`m2_03_compilacao_somente_studio.md` em `todo/gerarApp/l2/tasks/completed/`)
- **Casos de teste para o monitor.** O agente emite `.test.ts` no formato do monitor
  (`mls-base/skills/monitorTests.md`). Caso de negócio roda pelo monitor no navegador, contra o runtime.
  Vermelho vira achado nomeado, não bloqueio (`m2_04_casos_pagina_monitor.md`).
- **Imports** começam com `/` e terminam com `.js`, inclusive os dos contratos (`….defs.js`)
  (`m2_05_imports_absolutos_js.md`).
- **Sem Shadow DOM.** `StateLitElement` (`/_102029_/l2/stateLitElement.js`) não usa Shadow DOM, e
  `static styles` é ignorado em silêncio. O CSS vai num `.less` com o mesmo nome do `.ts`, sob o seletor
  do custom element. Cor de fallback nunca supõe tema (o runtime é escuro).
- **Textos em i18n** (default en), nada de português fixo no código gerado.
- **Código privado do agente.** Nada fora da pasta do materializador importa arquivos de dentro dela,
  e ele também não importa pasta de outro agente. O compartilhado vai para `mls-102020/l2/helpers/`
  (`mls-base/skills/agentCodeIsPrivate.md`).
- **Sem hard code de módulo.** O mesmo agente serve todos os módulos, sem mapa por domínio ou categoria.
- **Peças de runtime em uso hoje** (confira antes de usar): `StateLitElement`, `execBff`
  (`/_102029_/l2/bffClient.js`), `collabState.js` e `interactionRuntime.js` (`runBlockingUiAction`).

## 7. Pendências que afetam o materializador

- **Defs L2 completos só no controleEstoque** (seção 2). A validação geral com vários
  módulos é do Wagner.
- **Backend v2.** Wagner liberou o L1 em 01/10. O L1 passou a ler as rotas do contrato v2 e a compor os
  pedidos em usecases; o backend v2 do controleEstoque foi gerado (`mls-102047` `bc647be`). Fila e estado:
  `todo/gerarApp/l1/tasks/backlog/00_l1_contrato_v2.md`.
- **O que se gera a partir do contrato** (item 3.1) e **como o `.d.ts` do shared é produzido e salvo**
  estão por desenhar.
- **Página × workflow** (tela anexada a uma task) ainda não foi definido e não aparece nos defs.

## 8. Quem procurar

- Decisões de desenho: Wagner.
- Formatos e specs do L2: `todo/gerarApp/l2/agents/planner/STATE.md` e os planos em `todo/gerarApp/l2/doc/`.
- Contratos entre sub-projetos: `todo/gerarApp/contratos.md`.
