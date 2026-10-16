# Problemas encontrados nos defs do L2: módulo tarefas

**Testado em:** 16/10/2026. As 7 telas do módulo tarefas foram geradas pelo materializador L2, testadas na VM local e
comparadas uma a uma com o planejamento (L4) e com o que o servidor (L1) aceita e devolve.

**O que é este documento:** a lista do que ficou errado ou faltando no **desenho** das telas, ou seja, nos `.defs.ts`.
O materializador segue o desenho à risca. Quando falta alguma coisa, ou a tela sai incompleta, ou o materializador
precisa adivinhar. Desta vez ele adivinhou certo em vários pontos, mas outra geração pode não adivinhar.

No fim há uma lista curta do que **não** é problema dos defs (servidor, componentes e materializador), só para
registro.

---

## O que mais pesa

Os itens 3 e 4 atrapalham o uso hoje. Os itens 1 e 2 funcionam só porque o servidor corrige o que a tela manda.

### 1. "Quem está criando" é pedido à tela, mas é o servidor quem preenche (minhas_tarefas)

**O que a pessoa vê:** nada de errado. Criar tarefa funciona.

**Por que vale registrar:** o desenho e o contrato pedem à tela o campo "quem está criando" (`criadorId`), mas não dizem
de onde ele vem. A tela manda vazio. Funciona porque o servidor troca o campo pela pessoa logada antes de gravar. Isso
não está escrito em lugar nenhum do desenho: quem lê o contrato acha que a tela precisa mandar.

**O que o desenho deveria dizer:** tirar `criadorId` do que a tela manda, ou marcar que vem da sessão.

### 2. "Meus avisos" exige na entrada um dado que é a pessoa logada (meus_avisos)

**O que a pessoa vê:** deve abrir normalmente (a confirmar no teste). Assim como no item 1, o servidor troca o dado
vazio pela pessoa logada.

**Por que vale registrar:** o desenho marca `responsavelId` como **obrigatório** na entrada da tela, vindo do endereço
ou do navegador. Mas o próprio contrato diz que ele "vem do contexto, nunca da tela", e o menu diz "abre já com você
selecionado". Se o servidor deixar de fazer essa troca, a tela para de abrir pelo menu.

**O que o desenho deveria dizer:** tirar `responsavelId` da entrada da tela. É a pessoa logada, não um dado de
navegação.

### 3. Ninguém consegue ser responsável por tarefa (membros_equipe → minhas_tarefas)

**O que a pessoa vê:** cadastra uma pessoa na equipe e ela fica **Inativa**. Na hora de criar uma tarefa, essa pessoa
não aparece na escolha de responsável. Na tela de membros não há como ativá-la.

**Por que acontece, em duas partes:**
- A plataforma deixa **inativa** toda pessoa do Brasil ou da União Europeia que ainda não deu consentimento de
  privacidade (LGPD/GDPR). O desenho não diz quem registra esse consentimento. A tela não pede, e a permissão do gestor
  nem deixa ver esse dado.
- O planejamento (L4) prevê "inativar e reativar membro, feito pelo gestor", mas essa ação não foi para nenhuma tela. O
  plano de telas dá a membros_equipe só cadastrar, alterar e listar.

**O que o desenho deveria dizer:** quem registra o consentimento e onde; e as ações "inativar" e "reativar" na tela de
membros, para o gestor.

### 4. Botões aparecem para a pessoa errada (minhas_tarefas)

**O que a pessoa vê:**
- quem criou a tarefa vê "Iniciar" e "Enviar para revisão", que são do responsável;
- o responsável vê "Aceitar", "Devolver" e "Cancelar", que são de quem criou;
- qualquer um pode trocar o responsável na edição.

Ao clicar, recebe um erro de permissão.

**Por que acontece:** as regras estão listadas ("só o responsável executa", "só o criador revisa"…). Mas a tela não tem
como saber quem é a pessoa logada para comparar com o criador e o responsável da tarefa. O servidor sabe, e por isso
barra a ação, mas a tela não tem esse dado para esconder o botão.

**O que o desenho deveria dizer:** a informação "pessoa logada", e, em cada ação, quem pode vê-la.

---

## Problemas que se repetem em várias telas

### 5. A ação muda os dados, mas o desenho não diz o que muda na tela

**Onde:** inicio_membro, listas, membros_equipe, minhas_tarefas e tarefas_equipe.

Cada comando (criar, salvar, iniciar, cancelar…) devolve dados novos, mas nenhuma informação da tela diz que é
atualizada por eles. O materializador avisou sobre todos. Ele leu os comentários do contrato e improvisou a atualização.
O resultado nem sempre é certo:
- **minhas_tarefas:** com o filtro "Criadas por mim" ou "Devolvidas", uma tarefa nova ou alterada aparece mesmo sem
  pertencer ao filtro, e a tarefa criada vai para o topo, fora da ordem por prazo;
- **membros_equipe:** a pessoa nova vai para o fim da lista, fora da ordem por nome, mesmo que não bata com a busca.

**O que o desenho deveria dizer:** em cada comando, o que cada retorno atualiza (substitui o registro, entra ou sai da
lista). Ou então: "recarrega a lista".

### 6. Ações que o planejamento prevê e a tela não tem

| Tela | Previsto no L4 e ausente no desenho |
|---|---|
| membros_equipe | inativar e reativar; vincular e-mail ou telefone (base dos avisos); dar login ao membro; ver quem alterou; ver vínculos |
| listas | ver as tarefas de uma lista; buscar lista pelo nome; filtrar ativas e inativas |
| minhas_tarefas | busca pelo título (o componente foi escolhido, mas não há dado); tarefa pai, etiquetas e anexos (da jornada "criar tarefa"); uma ação própria de "trocar responsável" (está no menu) |
| tarefas_equipe | "quem age agora e a discussão" (pedido na jornada) |

Se alguma dessas ficou fora de propósito, o desenho deveria dizer isso, para não parecer esquecimento.

### 7. O histórico promete eventos que o servidor não devolve

**Onde:** minhas_tarefas e tarefas_equipe.

O texto do histórico fala em início, envio para revisão, reatribuição e avisos. O servidor só devolve as datas de
criação, da **última** devolução, de conclusão e de cancelamento. A linha do tempo sai pela metade, e as devoluções
anteriores se perdem.

**O que o desenho deveria dizer:** um pedido de "eventos da tarefa", ou um texto que prometa só o que existe.

### 8. Cliques que o desenho não declara

**Onde:** listas, membros_equipe, meus_avisos e inicio_membro.

Alguns pedidos dizem "dispara quando a pessoa escolhe", mas a ação de escolher não existe no desenho da tela. Os
exemplos são escolher uma lista, escolher um membro, abrir um aviso e o botão "nova". O materializador inventou o clique
na linha e o botão "Nova…".

Também faltam, nas navegações, **o que elas levam**:
- **inicio_membro:** "abrir aviso de hoje" não leva o aviso de hoje e cai na lista geral; não existe "abrir esta
  tarefa", então o código reusa "abrir para ajustar" para tudo;
- **inicio_gestor:** "agir na tarefa" não diz que deve abrir aquela tarefa.

### 9. Dados de entrada que não deveriam ser guardados ou que estão no lugar errado

- **Paginação tratada como filtro e guardada no navegador** (inicio_gestor, meus_avisos): quem volta à tela pode cair
  numa página do meio. No início do gestor, isso pode mostrar "Nada precisa de atenção agora" com tarefas atrasadas na
  página 1.
- **Seleção guardada no navegador** (listas, meus_avisos): pelo menu, a tela reabre a última lista editada, e não "nova
  lista", como o menu pede. Em meus_avisos, reabre um aviso antigo em vez do aviso de hoje.
- **Texto da busca como entrada obrigatória e guardada** (minhas_tarefas: `termo`; tarefas_equipe: `name` e
  `somenteAtivos`): é só o que a pessoa digita na busca, não um filtro da tela.
- **Dois nomes para a mesma seleção** (meus_avisos: `avisoId` e `avisoVencimentoId`).
- **Tamanho da página** (`pageSize`): o servidor exige, mas nenhuma tela diz o valor. O materializador fixou 20.

### 10. Componente escolhido que não combina com o dado

| Tela | Problema |
|---|---|
| tarefas_equipe | o filtro de **período** de prazo (de/até) usa só a data inicial, porque a entrada tem um único `prazo` |
| tarefas_equipe | situação: o servidor aceita várias, mas no computador o componente deixa escolher uma; no celular, várias |
| tarefas_equipe | uma única lista de membros serve ao filtro (todos) e à reatribuição (só ativos), e uma busca apaga a outra; a busca não diz que é por digitação |
| meus_avisos | filtro de período que o servidor não aceita (foi descartado) |
| membros_equipe, listas | paginação numerada, mas o servidor só diz "tem mais" (ou nem pagina) |
| membros_equipe | país em texto livre: "br" ou "Brasil" são recusados ao salvar (o formato é duas letras maiúsculas, padrão "US") |
| listas | "tipo" e "ativa" sem componente; saíram campos crus, fora do design system |
| inicio_membro | não há campo para digitar o **motivo** da devolução, que é obrigatório |
| inicio_membro | "ação esperada" aparece como código interno ("enviarParaRevisao"), sem os valores possíveis nem o rótulo de cada um |
| inicio_membro | a lista de tarefas do aviso não tem título para mostrar (o servidor só manda id e prazo) |

### 11. Descrições copiadas

Em quase todas as telas, o "id escolhido" tem a mesma descrição do registro completo. As listas são descritas como "uma
linha" em vez de "a página de itens". Em membros_equipe, as três informações têm o mesmo texto.

---

## Resumo para o planner L2

1. **A pessoa logada precisa existir no desenho**, ou sair dos pedidos. Sem ela, os botões não aparecem para a pessoa
   certa, e a tela depende do servidor para corrigir o que manda.
2. **Todo comando diz o que muda na tela.**
3. **Toda capacidade do L4 vira ação de alguma tela**, ou fica registrada como fora de escopo.
4. **Todo clique e toda navegação é declarado**, com o que leva.
5. **Busca, página e seleção não são filtros guardados**, e o tamanho da página é declarado.
6. **O componente combina com o dado:** período com de/até, uma ou várias escolhas, lista fechada de valores e campo de
   texto quando a regra exige motivo.

---

## Para registro: o que não é dos defs

- **Servidor (L1):**
  - "quem está criando" (minhas_tarefas) e "responsável" (meus_avisos) são trocados pela pessoa logada antes de chegar
    à regra; funciona, mas o contrato não diz;
  - o cadastro de membro não valida o país, mas a edição valida;
  - o contrato tem vários caminhos repetidos (`details.identification.details.identification.name`);
  - no `effort.json`, alguns endpoints estão desatualizados.
- **Componente `ml-combobox` (102040):** desabilita a caixa enquanto busca, e a digitação se perde depois da primeira
  letra.
- **Materializador:**
  - em listas, com uma lista guardada, a tela mostra "Escolha uma lista" com uma linha marcada;
  - várias telas ignoram componentes recomendados (cartões de número, gráfico, progresso) e mudam a ordem das seções;
  - esses pontos estão conosco.
