# Testing Plan - Rent DDD Entity

## Cenários de Teste

### 1. Testes Unitários: Entidade Rent (Financeiro)
- **Cenário**: Cálculo de total com desconto fixo.
  - **Entrada**: Subtotal 200, Desconto Fixo 50.
  - **Esperado**: Total 150.
- **Cenário**: Cálculo de total com desconto percentual.
  - **Entrada**: Subtotal 200, Desconto 10%.
  - **Esperado**: Total 180.
- **Cenário**: Saldo restante com sinal pago.
  - **Entrada**: Total 150, Sinal 50.
  - **Esperado**: Saldo Restante 100.

### 2. Testes Unitários: Máquina de Estados (Status)
- **Cenário**: Transição válida SCHEDULED -> IN_PROGRESS.
  - **Esperado**: Sucesso.
- **Cenário**: Transição inválida FINISHED -> SCHEDULED.
  - **Esperado**: Erro "Não é possível alterar um aluguel já finalizado".
- **Cenário**: Transição inválida IN_PROGRESS -> SCHEDULED.
  - **Esperado**: Erro "Não é possível voltar um aluguel em andamento para agendado".

### 3. Testes Unitários: Disponibilidade (conflitosWith)
- **Cenário**: Conflito de data considerando buffer de limpeza.
  - **Entrada**: Aluguel atual termina dia 10, buffer 2 dias. Novo aluguel começa dia 11.
  - **Esperado**: Conflito (Ocupado até dia 12).

## Dados de Mock
- Utilizar `faker` para nomes de clientes e IDs.
- Datas fixas usando `new Date('2026-05-01')` para previsibilidade nos testes.
