# Problemas encontrados nos defs do L2

**Testado em:** comandaRestaurante e agendaClinica, de 06/10 a 09/10/2026, rodando o materializador L2 (v4) e testando as
telas na VM local.

**O que é este documento:** a lista dos problemas que nasceram no **desenho** das páginas, ou seja, nos `.defs.ts`
gerados pelo planner L2. Os problemas do materializador e das moléculas foram corrigidos à parte e não aparecem aqui.

**A ideia geral:** em quase todos os casos, o desenho **promete uma coisa e não entrega o que é preciso para cumpri-la**,
ou **esquece de dizer** algo que a tela precisa saber. O materializador segue o desenho à risca e não pode inventar o que
falta, então a tela sai errada mesmo com o código "certo".

---

## 1. A ação muda os dados, mas a lista da tela não fica sabendo

**O que a pessoa vê**
- **Fechamento:** fecha uma comanda, e ela continua aparecendo na lista de comandas abertas.
- **Atendimento:** abre uma comanda para uma mesa, e a mesa continua em "Mesas disponíveis". A comanda nova também não
  aparece em "Comandas abertas".

**Por que acontece**
Cada ação do desenho diz o que ela atualiza na tela. Nesses dois casos:
- **Fechamento:** a ação "fechar comanda" dizia que atualizava só a comanda. Ela não dizia que a comanda **sai da lista**
  de abertas.
- **Atendimento:** a ação "abrir comanda" até diz que atualiza as listas, mas o servidor **só devolve a comanda nova**,
  e não as listas. A promessa existe, mas falta o dado para cumpri-la.

A tela não pode calcular sozinha quem sai ou quem entra na lista, porque essa regra é do servidor. Então ela fica com a
lista antiga.

**O que o desenho deveria dizer**
Toda ação precisa listar **tudo** o que ela muda na tela. Para cada coisa listada, o servidor devolve o dado novo, ou o
desenho diz que a tela deve **buscar a lista de novo**.

> Exemplo do fechamento, já corrigido à mão: "fechar comanda" atualiza a comanda **e** remove o item da lista de abertas.

---

## 2. A tela abre sem um dado obrigatório

**O que a pessoa vê**
- **Consultas (agendaClinica):** ao abrir a página, aparece o erro "dataAgenda is required" e a agenda não carrega.

**Por que acontece**
Para carregar a agenda, o servidor exige uma data. O desenho diz que essa data vem do endereço da página ou da última
data usada, mas **não diz o que usar na primeira vez**, quando não existe nenhuma das duas. A tela mandou a data vazia, e
o servidor recusou.

**O que o desenho deveria dizer**
Quando um dado obrigatório pode faltar ao abrir a página, o desenho precisa dizer o **valor de partida**. Neste caso, o
óbvio é "hoje". Outra saída é o servidor aceitar a data vazia e usar a data de hoje.

---

## 3. A lista só existe se a pessoa digitar, mas o campo escolhido não deixa digitar

**O que a pessoa vê**
- **Consultas, "Novo agendamento":** os campos de paciente e de profissional aparecem vazios e não mostram ninguém.

**Por que acontece**
São duas coisas juntas:
- As buscas de paciente e de profissional **só funcionam com um nome digitado**. O servidor recusa a busca vazia, e o
  desenho não prevê uma lista inicial.
- Para escolher o profissional, o desenho recomendou um campo de **lista simples** (`ml-select-dropdown`), que **não tem
  onde digitar**. Para o paciente, recomendou um campo que até filtra o que já está na lista, mas **não avisa a tela do que
  foi digitado**, então ela também não consegue buscar no servidor.

O desenho pede uma busca por nome e escolhe um campo que não permite fazer essa busca.

**O que o desenho deveria dizer**
O tipo de campo recomendado precisa combinar com a forma de buscar:
- busca por texto digitado → um campo com digitação que avise a tela (`ml-combobox`);
- lista fechada e pequena → um campo de lista, com a lista carregada ao abrir.

Outra saída: o servidor aceita a busca vazia e devolve os primeiros resultados.

> Corrigido à mão nas páginas atuais, trocando os dois campos por `ml-combobox`.

---

## 4. O desenho não diz de onde vem um dado do formulário

**O que a pessoa vê**
- **Atendimento:** a pessoa escolhe o item e a quantidade e clica em "Lançar item". Aparece "Não foi possível lançar o
  item", e nada chega ao servidor.

**Por que acontece**
Para lançar um item, o servidor precisa saber **em qual comanda**. A pessoa não digita isso: é a comanda que ela abriu ou
selecionou na tela. O desenho não diz essa diferença. Para ele, o formulário "lançar item" tem três dados (comanda, item e
quantidade), todos no mesmo pacote. A tela tratou a comanda como um campo para a pessoa preencher, e ninguém preenchia.

**O que o desenho deveria dizer**
Num formulário, separar o que **a pessoa preenche** do que **vem do contexto da tela**: o registro selecionado, a página
aberta, quem está logado.

> O materializador agora detecta esse caso quando o nome do dado é igual ao da seleção (`comandaId`). Se o nome for
> diferente, ele não percebe.

---

## 5. Dois nomes para a mesma coisa

**O que acontece**
Algumas páginas declaram **dois parâmetros de endereço** para o mesmo registro:
- **Consultas:** `id` e `consultaId`, os dois apontando para a consulta aberta;
- **Pacientes:** `patientId` e `pacienteId`, os dois apontando para o paciente aberto.

Existem também parâmetros que não alimentam nada. Na Consultas, `pacienteId` diz que seleciona um paciente, mas nenhum
dado da tela usa esse valor.

**Por que importa**
A tela precisa decidir qual dos dois usar, e cada geração pode decidir diferente. Um link vindo de outra página pode
mandar um nome e a tela ler o outro.

**O que o desenho deveria dizer**
Um nome só para cada coisa, e todo parâmetro declarado sendo usado por algum dado da tela.

---

## 6. Descrições copiadas ou trocadas

**O que acontece**
A descrição de alguns dados da tela não descreve aquele dado:
- **Consultas:** `quantidadePendentes` (um número) tem a descrição "Devolve o cabeçalho da data, o indicador já
  calculado e uma página de linhas de agenda…", que é a descrição da resposta inteira do servidor.
- **Consultas:** `selectedConsulta` (só o identificador da consulta escolhida) tem a mesma descrição de `consulta` (a
  consulta completa).
- **Pacientes:** `selectedPaciente` tem a mesma descrição de `patient`.
- **Mesas:** `selectedMesa` tem a mesma descrição de `mesas` (a lista inteira).

**Por que importa**
Essas descrições são o que o gerador de telas lê para entender cada dado. Com o texto errado, ele pode mostrar o dado no
lugar errado ou do jeito errado, e o erro é difícil de perceber.

**O que o desenho deveria dizer**
Uma descrição própria para cada dado, dizendo o que ele guarda.

---

## Resumo para o planner L2

| # | problema | o que pedir ao desenho |
|---|---|---|
| 1 | a ação muda a lista, e a tela não sabe | listar tudo que a ação muda; o servidor devolve o dado novo, ou a tela busca de novo |
| 2 | a tela abre sem um dado obrigatório | dizer o valor de partida (ex.: data de hoje) |
| 3 | busca por texto com campo que não deixa digitar | o campo recomendado combina com a forma de buscar |
| 4 | não se sabe se o dado vem da pessoa ou da tela | separar o que a pessoa preenche do que vem do contexto |
| 5 | dois nomes para a mesma coisa | um nome por coisa, e nenhum parâmetro sem uso |
| 6 | descrições copiadas | uma descrição própria para cada dado |
