# User Documentation - Regras de Negócio de Aluguel (DDD)

Esta documentação descreve as regras de integridade e cálculos aplicados automaticamente pelo sistema de aluguéis.

## 1. Ciclo de Vida do Aluguel (Status)
O sistema garante que um aluguel siga um fluxo lógico de estados. 

- **AGENDADO (SCHEDULED)**: O estado inicial. Pode ser alterado para "Em Andamento" ou "Finalizado".
- **EM ANDAMENTO (IN_PROGRESS)**: Quando o cliente retirou o produto. Não pode voltar para "Agendado".
- **FINALIZADO (FINISHED)**: Quando os produtos foram devolvidos. **Nenhuma alteração de dados financeiros ou de status é permitida após a finalização.**

## 2. Regras de Datas
- A **Data de Devolução** deve ser obrigatoriamente posterior à **Data de Aluguel**. O sistema impedirá a criação de aluguéis com datas iguais ou retroativas.
- **Período de Limpeza (Buffer)**: Após a devolução (real ou planejada), o produto permanece bloqueado por um número de dias definido na categoria (ex: 2 dias para vestidos). Este período é considerado na checagem de disponibilidade.

## 3. Cálculos Financeiros
- **Desconto Percentual**: Aplicado sobre o valor total dos produtos.
- **Desconto Fixo**: Subtraído do total. O valor final nunca será inferior a zero.
- **Saldo Restante**: É calculado subtraindo o **Sinal (Depósito)** do valor total. O sistema atualiza este valor automaticamente caso produtos sejam adicionados ou removidos.
