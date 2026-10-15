# Como testar o reembolsoDespesas

O módulo controla o reembolso de despesas, com três perfis:

| Perfil | O que faz | Tela inicial |
|---|---|---|
| **Colaborador** | registra as próprias despesas, envia para aprovação, corrige e reenvia (uma vez) as rejeitadas | `/reembolsoDespesas/minhas_despesas` |
| **Gestor da equipe** | vê as despesas pendentes da equipe e aprova ou rejeita, com motivo | `/reembolsoDespesas/inicio` e `/reembolsoDespesas/despesas_da_equipe` |
| **Financeiro** | vê as despesas aprovadas e registra a data do pagamento | `/reembolsoDespesas/despesas_aprovadas` |

Neste ambiente de teste, **todo login tem os três perfis ao mesmo tempo** (`alphaAllAuthorities` no `l5/config.json` do 102047). Uma pessoa sozinha consegue fazer o caminho inteiro: registrar, aprovar e pagar.

---

## 1. Preparar o login (uma vez por pessoa)

Só ter os três perfis não basta. O sistema precisa saber **quem é a pessoa**, por três motivos:

- a despesa fica gravada em nome da pessoa logada;
- o gestor só vê despesas de quem é da equipe dele;
- o nome do colaborador aparece nas listas.

Sem essa preparação, aparecem erros como *"The authenticated collaborator could not be identified"*, *"manager identity not resolved"* ou "Colaborador não identificado", ou a fila do gestor fica vazia.

A preparação é feita por um script, **rodado na VM por quem tem acesso a ela**:

```bash
cd /data/mls-base
node mls-102047/scripts/bindTestLogin.mjs \
  --email pessoa@exemplo.com \
  --name "Nome da Pessoa (teste)" \
  --project 102047 \
  --role reembolsoDespesas.Colaborador \
  --report-manager self
pm2 restart app2047
```

O que cada parte faz:

| Opção | Para quê |
|---|---|
| `--email` | O e-mail do login da pessoa, o mesmo que ela usa para entrar. |
| `--name` | O nome que aparece nas telas. Só é usado na primeira vez. |
| `--role reembolsoDespesas.Colaborador` | Marca a pessoa como colaboradora do módulo. Sem isso, as listas mostram "Colaborador não identificado". |
| `--report-manager self` | Faz a pessoa ser **o próprio gestor**. Assim, as despesas que ela envia aparecem na fila de aprovação dela mesma. |

- **Pode rodar o script mais de uma vez:** o que já foi feito não é refeito.
- **No fim, ele mostra o código (id) da pessoa.** Guarde esse código, que serve para conferir problemas.
- O script só funciona em ambiente de desenvolvimento ou apresentação. Em produção, ele se recusa a rodar.

> Teste com duas pessoas reais (um colaborador e um gestor): rode o script para as duas, **sem** `--report-manager self`. Depois rode de novo para o colaborador com `--report-manager <id do gestor>`. Assim a despesa do colaborador cai na fila do gestor.

---

## 2. Roteiro de teste

1. **Como colaborador**, abra `/reembolsoDespesas/minhas_despesas`:
   - registre uma despesa (data, categoria, valor, descrição); ela fica como **Rascunho**;
   - abra a despesa e clique em **Enviar para aprovação**; ela passa para **Aguardando aprovação**.
2. **Como gestor**, abra `/reembolsoDespesas/inicio` ou `/reembolsoDespesas/despesas_da_equipe`:
   - a despesa enviada aparece na fila, com o seu nome;
   - abra-a e **aprove**. Ela sai da fila.
3. **Como financeiro**, abra `/reembolsoDespesas/despesas_aprovadas`:
   - a despesa aprovada aparece;
   - escolha a data do pagamento e confirme. Ela fica como **Paga** e sai da fila.
4. **Correção:** registre e envie outra despesa, **rejeite** como gestor e, como colaborador, corrija e reenvie. O reenvio só pode ser feito uma vez. (Veja o item 2 dos problemas conhecidos.)

**Trocar o perfil exibido (opcional):** na página inicial do Monitor, a troca de autoridade (modo apresentação) muda **só o menu e a tela inicial**. Por exemplo, `reembolsoDespesas:gestorEquipe` mostra o sistema como o gestor vê. O que a pessoa pode fazer continua igual, porque ela já tem os três perfis.

---

## 3. Três versões de tela

Cada tela existe em três versões, para comparar estilos (mais detalhes em `analise-templates-variantes-14-10.md`):

| Versão | Estilo |
|---|---|
| **page11** | o original: tabelas, ler a despesa e decidir no fim |
| **page21** | cartões, decisão no topo, pagamento em passos |
| **page31** | o mesmo estilo da page21, com componentes escolhidos para ele |

Para trocar de versão na tela aberta, use **Ctrl+Alt+E**.

---

## 4. Problemas conhecidos

| # | O que acontece | Onde | Situação |
|---|---|---|---|
| 1 | **Comprovante:** não há onde anexar. O envio para aprovação pode ser recusado quando a regra do comprovante estiver valendo. | todas as versões | Falta no modelo de dados (defs). |
| 2 | **Rejeitar a própria despesa é recusado.** A mensagem é "A manager can only reject expenses of collaborators of their own team, not their own expense". Com `--report-manager self`, aprovar funciona e rejeitar não. | despesas da equipe | O backend confere a regra de jeitos diferentes para aprovar e para rejeitar. Para testar a rejeição, use duas pessoas (gestor e colaborador). |
| 3 | **Confirmar pagamento não liga:** a data escolhida não é guardada. | despesas aprovadas, **page31**, computador | Erro na tela gerada. Teste o pagamento na page11 ou na page21. |
| 4 | **Colaborador aparece como um código**, não como nome. | despesas aprovadas | Os dados dessa tela não trazem o nome. |
| 5 | **Pílulas de categoria incompletas:** só mostram as categorias das despesas já carregadas. | despesas aprovadas, page21 e page31 | O servidor não manda a lista de categorias. |
| 6 | **Mensagens de erro em inglês.** | todas | Os textos de erro do servidor ainda não são traduzidos. |

---

## 5. Se algo der errado

| Mensagem ou sintoma | Causa provável | O que fazer |
|---|---|---|
| "The authenticated collaborator could not be identified" ou "manager identity not resolved" | O login não está ligado a uma pessoa. | Rodar o script do passo 1 para esse e-mail. |
| "You have no identity for this scope" | Idem. | Idem. |
| A fila do gestor fica vazia | A pessoa não é gestora de quem enviou, ou a despesa ainda é rascunho. | Rodar o script com `--report-manager`. Conferir se a despesa foi **enviada**. |
| "Colaborador não identificado" | Falta o papel de colaborador. | Rodar o script com `--role reembolsoDespesas.Colaborador`. |
| Despesas antigas não aparecem ou não podem ser enviadas | Foram criadas antes de o login ser ligado a uma pessoa. | Criar despesas novas. |
