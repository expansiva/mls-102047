# Problemas nos novos defs do reembolsoDespesas (13/10/2026)

Defs gerados no formato novo do shared, no commit `aeb645b`. O materializador já lê esse formato. Dois pontos dos defs precisam de ajuste antes de gerarmos as telas.

## 1. Os dados da despesa ficam "um nível abaixo" do que deveriam (os 4 contratos)

**O que acontece:** nos contratos, cada tipo de dado ganhou um tipo separado para a parte `details`. Esse tipo separado já começa com `details` dentro dele. Com isso, o caminho fica com `details` repetido.

Exemplo de `web/contracts/minhas_despesas.defs.ts`:

```ts
export interface DespesaResumoDetalhes {
  details: {            // ← o tipo já abre "details"
    dataDespesa: string;
    valor: string;
  };
}

export interface DespesaResumo {
  id: string;
  details: DespesaResumoDetalhes;   // ← e aqui "details" de novo
}
```

Para ler o valor de uma despesa, o caminho fica `despesa.details.details.valor`. O certo é `despesa.details.valor`.

No `inicio` é pior. O nome do colaborador fica em
`despesa.colaborador.details.identification.details.identification.name`.
O certo é `despesa.colaborador.details.identification.name`.

**Por que importa:** o servidor (L1) devolve os dados no formato normal, com um `details` só. A tela é gerada a partir do contrato e vai procurar o valor no lugar errado. Resultado: campos vazios na tela, sem erro nenhum.

**Onde aparece:** nos quatro contratos (`inicio`, `minhas_despesas`, `despesas_da_equipe`, `despesas_aprovadas`), em todos os tipos `...Detalhes` / `...Details` e nos tipos do colaborador.

**Correção esperada:** um destes dois caminhos.
- O tipo separado ser só o conteúdo, sem o `details` por fora: `export interface DespesaResumoDetalhes { dataDespesa: string; valor: string; }`.
- Ou o tipo principal não repetir o `details`.

## 2. A descrição do `totalPendentes` (inicio) fala de dois dados

Em `web/shared/inicio.defs.ts`, a descrição do state `totalPendentes` descreve também o `despesasPendentes`:

> "totalPendentes: número de despesas aguardando decisão, ...; despesasPendentes: página de despesas com data, categoria, ..."

Parece que duas descrições foram juntadas numa só. É pequeno, mas a descrição é o que orienta a geração da tela.

**Correção esperada:** deixar no `totalPendentes` só a parte dele, por exemplo "Número de despesas aguardando decisão do gestor".

## O que melhorou em relação à versão anterior

- **Colaborador junto com a despesa:** em `despesas_da_equipe` e `inicio`, cada despesa já vem com o colaborador. A tela não vai mais mostrar "Colaborador não identificado" quando a pessoa existe.
- **Lista de "Minhas despesas":** não pede mais o `colaboradorId` na URL. O servidor usa o colaborador logado. Era o problema do relatório anterior.
