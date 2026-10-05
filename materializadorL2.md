# Materializador L2 novo — briefing para quem vai construir

> Escrito em 30/09/2026 (reescrito em 05/10, depois do BFF por página: d2_73…d2_78, merge `mls-102020` `1318b948`) pelo planner L2 a pedido do Wagner, para quem vai construir o novo
> materializador do frontend e não acompanhou as decisões. O que está aqui é **desenho decidido**,
> com as frases do Wagner. O que ainda não existe está marcado como **pendente**. Na dúvida, a fonte
> de verdade são os arquivos citados, não este resumo.

## Princípio: o defs tem a intenção e os compromissos, não o script

> **Wagner, 05/10/2026:** *"O defs deve ter a intenção, não o script para o materializador"*. Teste para qualquer campo: ele diz **o que** tem de ser, ou **como** fazer?

| entra no defs | exemplo | por quê |
|---|---|---|
| **intenção** | JSDoc da rota (finalidade, processamento), intenção da página, texto do organismo, regras com o texto | é o que a LLM precisa para decidir bem |
| **compromisso** (cruza fronteira, não pode variar) | rota, tipos de entrada e saída, `access`, `rules` por rota, que entidades e usecases existem, autoridade de cada rota | se variar, quebra o outro lado ou a segurança |
| **script (não entra; onde ainda existe, é pista)** | `uses`, `params`, árvore de saída, `sequence` do usecase, listas de entrada e saída copiadas do l4, ligações decididas por regra mecânica | a LLM com o l4 decide melhor, e cada campo desses pede um gate |

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

| arquivo | o que é | quem escreve |
|---|---|---|
| `desktop/page11/<pageId>.defs.ts` | **page11 v2 desktop**: intenção, sections com `purpose`, organismos em prosa com intents, moléculas sugeridas, template collabux | LLM (`pages50`) |
| `mobile/page11/<pageId>.defs.ts` | page11 v2 mobile, com os mesmos organismos e configuração própria (P5) | LLM (`pages50`) |
| `contracts/<pageId>.defs.ts` | **contrato BFF**: os endpoints da página, cada um com **JSDoc** (Finalidade, Entrada, Processamento, Saída), tipos literais de entrada e saída, tipos nomeados, `rules` e `access`. **Sem `meta`**. | código, a partir do desenho do BFF |
| `shared/<pageId>.defs.ts` | **shared v2**: o motor da página (P9). Traz `entry.params`, `forms`, `requests`, `states`, `functions`, `journeys`, `rules` e `access` | código, transcrevendo o desenho do BFF |

Exemplo real e atual: `mls-102047/l2/comandaRestaurante/web/` (bancada `83b4de0`, 5 páginas, 19 rotas). O desenho de cada
página está em `l2/<mod>/pipeline/agentDefsL2/bff/<pageId>.json` e é só contexto, porque o materializador lê os defs.

Princípios, com as frases do Wagner: `todo/gerarApp/l4/docs/como-deve-ser-o-l2.md` (P1–P11). Os que mudam o seu trabalho:
- **P1, BFF por página.** Os endpoints são da página, e não de um organismo ou de uma entidade. A página tem poucas
  chamadas: carregar ao abrir, consultas de interação (buscar, paginar, selecionar) e uma ação por intenção de gravar.
- **P2 e P7, endpoint é função.** O JSDoc de cada rota foi escrito **para a LLM** que materializa: leia a Finalidade para
  ligar a tela e a Saída para saber o que redesenhar. Nenhum código precisa interpretar o JSDoc. O parser
  (`/_102020_/l2/helpers/contractV2/`) o expõe em `route.jsdoc`.
- **P10, a LLM estruturou e o código gerou.** O shared e o contrato são consequência mecânica do desenho. Não "corrija" o
  shared: se algo faltar, é defeito do gerador, e deve ser avisado ao planner L2.
- **P11, o contrato diz o que a página precisa, não de onde vem.** Não existe `meta`, entidade de origem nem tabela.

Também servem de contexto:
- o template collabux referenciado em `page11.template`, em `_102020_/l4/collabux/templates/<categoria>/<page>.md`. Nas palavras do próprio template: *"the defs wins on DATA and this skill wins on BEHAVIOR"*;
- o design system do projeto, `l2/designSystem.ts`;
- as moléculas sugeridas, com o índice e o `usage` de cada grupo (`_102040_/l2/molecules/<grupo>/index.defs.ts` e `_102020_/l2/aura/molecules/skills/<Grupo>/usage.ts`).

## 3. Ordem de geração (Wagner, 30/09)

> “o materializador deve primeiro gerar o contracts, depois o shared e depois os pagexx, porque um
> depende do outro para contexto”

1. **Contrato.** O `.defs.ts` já é TypeScript de tipos. Ainda está **pendente de desenho** o que gerar a partir dele: um
   cliente tipado ou o uso direto. O transporte de hoje é `execBff` de `/_102029_/l2/bffClient.js`, e a rota é
   `<mod>.<pageId>.<endpointId>`.
2. **Shared** `shared/<pageId>.ts`: a classe com os states e as funções, que chama os endpoints do contrato. Ela também
   produz o `.d.ts` do shared, que é o contexto da etapa 3.
3. **Páginas** `desktop/page11/<pageId>.ts` + `.less` e o mesmo em `mobile/`. A LLM lê o `.d.ts` do shared e o
   `page11.defs.ts` do device. A página **só renderiza e chama funções do shared**: não tem estado de negócio nem
   chamada de BFF própria.

Os ids de state e de função são **estáveis** entre gerações, e a função tem o mesmo id do endpoint que ela chama. Mantenha
esses ids exatamente.

## 4. O que o contrato promete
- **Pedido da tela, não usecase.** Wagner: *"Se na tela tenho uma função exemplo 'aprovaUsuario' isto é um serviço, que
  pode gerar vários usecases, alterar várias tabelas, de preferência ou tudo ou nada (atômico)"*.
- **A saída já vem no formato da tela.** Exemplos:
  - a comanda já vem **com** os itens e o subtotal;
  - os indicadores já vêm **calculados**, porque o cálculo é do L1 (P4);
  - a lista já vem **filtrada** pela situação que a intenção pede.

  Não some no navegador, não filtre em memória nem junte duas chamadas.
- **O comando devolve o que a tela redesenha.** Use esse retorno, e não chame a carga de novo, a não ser que o shared
  mande recarregar (seção 5).
- **Campos `readonly`** são calculados pelo backend e nunca são editados. `version` vem quando a página altera o registro, e
  deve ser reenviado.
- **`rules` e `access` por rota.** As `rules` são as da **ação**. O frontend pode pré-validar, mas quem garante é o backend.
  O `access` não substitui a sessão.
- **Forma dos campos e das listas (d2_79, `mls-102020` `6aba3764`, 05/10):**
  - a folha de campo mantém o caminho da ontologia: `details: { subtotal }`, e `mesa: { code }` quando o campo vem de
    outra entidade. O parser expõe as folhas aninhadas pelo caminho com ponto (`details.subtotal`);
  - a lista paginada tem uma forma só: `{ items, page, pageSize, hasMore }`, com entrada `page`/`pageSize`. "Carregar mais"
    acrescenta em `items`. Uma lista não paginada é `T[]`.

  A bancada (`mls-102047` `83b4de0`) ainda está na forma antiga, com nomes achatados e quatro formas de paginação, até a
  regeração da p4_30.

## 5. O que o shared manda o código fazer
- **States.** Cada state tem `source` em `<endpoint>.<chave>`, em `entry.params.<param>` ou em `<cmd>.input` (form). Nenhum
  state tem uma função como fonte.
- **Functions.** Há uma por endpoint, com `calls` igual a ele.
  - Uma consulta põe (`sets`) a sua saída num state.
  - Um comando atualiza (`updates`) os states que a saída dele redesenha.
  - O **modo** vem no fim da descrição, entre parênteses (`(comanda: upsert)`, `(pagina: append)`):
    - `replace`: trocar a lista;
    - `append`: acrescentar a próxima página;
    - `upsert`: inserir ou atualizar o item pelo id na lista ou no item;
    - `remove`: tirar o item.
  - **Recarga:** quando o desenho declarou que um comando recarrega consultas, a função as chama depois, com os parâmetros
    atuais.
- **Forms.** `forms: { <submit>: { organism, submit } }` liga o organismo que edita a entrada da escrita ao seu comando. O
  input do comando é **só a entrada da escrita**. Um botão de ação sem nada a digitar (abrir, aprovar, cancelar) **não está
  em `forms`** e chama a função direto, com o contexto e a identidade.
- **Parâmetros de entrada (toda página).** Wagner: *"Toda página tem que ter uma leitura de campos opcionais que podem vir na
  URL ou estar no local storage, a navegação é importante"*.
  - Lê da URL; se estiver ausente, do localStorage, com chave `<mod>.<pageId>.<param>`. A URL vence. Todos são opcionais.
  - O efeito vem declarado: `select:<organism>`, `filter:<organism>` ou pré-preencher. A seleção vence o filtro.
  - `persist` grava no localStorage ao mudar.
  - Converta o tipo de verdade (number/boolean), sem cast.
- **Seleção.** O parâmetro `select:` guarda o id. O state selecionado é o **item**:
  - vem da consulta de detalhe que o desenho declarou, quando existe;
  - se não existe, é resolvido pelo id na lista carregada.
- **Navegação.** As funções `navigate` levam `carries` para os `entry.params` da página de destino.
- **Jornadas.** `journeys` diz qual passo de negócio cada organismo e função atende, e onde ele continua (`continuesIn`).
  Use para textos, foco e ordem, e depois para os casos de teste.
- **Página sem leitura nem escrita** (hub): o shared tem só navegação, o contrato não tem rotas, e não há chamada de BFF.

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
- **Regeração do comandaRestaurante com a d2_79** (p4_30, supervisor l4). Até lá, o exemplo real está na forma antiga.
- **Backend.** O L1 está passando a planejar pelos tipos, pelo JSDoc e pelo L4, sem `meta`
  (`todo/gerarApp/l1/tasks/backlog/00_l1_contrato_sem_meta.md`). O endpoint composto, filtrado e agregado do contrato
  depende de o L1 escrever o request service pela LLM (T6, em `como-deve-ser-o-l2.md`).
- **Paginação, ordenação e filtros pela molécula:** ficam para depois (Wagner, 04/10).
- **Ainda por desenhar:** o que se gera a partir do contrato (seção 3, item 1) e como o `.d.ts` do shared é produzido e
  salvo.
- **Página × workflow** (tela anexada a uma task) ainda não foi definido e não aparece nos defs.

## 8. Quem procurar

- Decisões de desenho: Wagner.
- Formatos e specs do L2: `todo/gerarApp/l2/agents/planner/STATE.md` e os planos em `todo/gerarApp/l2/doc/`.
- Contratos entre sub-projetos: `todo/gerarApp/contratos.md`.
