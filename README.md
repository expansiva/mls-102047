# 102047 · petShopAgendamento + controleChamados (client app)

Part of **collab.codes**.

`102047` is a **generated client application** (`projectType: "client"`,
`appEnv: "presentation"`) and the most recently exercised one. Unlike most
projects here it holds **two modules** side by side, each with its own
`l1` / `l2` / `l4` / `l5` subtree.

## Modules

**`petShopAgendamento`** — *"Permitir que clientes agendem serviços para seus
pets e acompanhem o atendimento, enquanto a loja gerencia a agenda, confirmações
e execução dos serviços."*
Two authorities (admin / cliente), pets per customer with before/after photos,
opening hours with pre-registered "busy" blocks, institutional home page.

**`controleChamados`** — *"Permitir que o atendente registre, acompanhe, comente
e encerre chamados com título, descrição e status."*
A single actor (atendente); a ticket has title, description and status
(open / closed) plus comments.

Both use the ns4 module schema (`2026-08-06-ns4-module-v4`) with the full e1–e10
step model under `l4/<module>/`.

## Layout

`l1/<module>/` backend · `l2/<module>/` frontend pages · `l4/<module>/` solution
model (`ontology`, `journeys`, `rules`, `operations`, `workflows`, `usecases`,
`access`, `contracts`, `composition`, `workspaces`, `siteMap.defs.ts`,
`workspace-model.defs.ts`) · `l5/<module>/` process and todo defs.

Last activity: 2026-08-31.

## Careful

`mls-base/config.json` still lists this project with modules `todo`,
`listaAssinatura` and `listaAssinatura3` — none of which exist on disk. The
modules above are what `l5/project.json` and the layer folders actually contain.
