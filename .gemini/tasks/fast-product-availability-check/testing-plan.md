# [cite_start]Testing Plan: Fast Product Availability Check [cite: 1]

## 1. Unit Tests

### Repository (PrismaRentalRepository)
- Criar testes que validam a query de sobreposição de datas.
- Garantir que aluguéis com `deleted_at != null` não sejam retornados.

### Use Case (CheckProductAvailabilityUseCase)
- **Mock do Repositório**: Simular retorno de nenhum aluguel e validar o status `AVAILABLE`.
- **Mock de Aluguel Ativo**: Simular retorno de um aluguel com status `SCHEDULED` e validar status `RENTED`.
- **Mock de Buffer**: Simular retorno de um aluguel `FINISHED` onde a data inicial do novo período cai nos dias de buffer. Validar status `IN_BUFFER` e o retorno do aluguel original.
- **Teste de Múltiplos Conflitos**: Simular dois aluguéis conflitantes e validar se o sistema retorna o primeiro (cronologicamente mais próximo).

## 2. Faker Scenarios

### Cenário: Produto em Preparação
- Aluguel Finalizado: `realDevolutionDate` = Ontem.
- Buffer Days = 3 dias.
- Busca: Hoje até Amanhã.
- **Esperado**: status `IN_BUFFER`.

### Cenário: Aluguel Atrasado
- Aluguel Agendado: `expectedDevolutionDate` = Anteontem.
- Produto não devolvido (status `SCHEDULED` ou `RENTED`).
- Busca: Hoje.
- **Esperado**: status `RENTED`.

## 3. Success Criteria
- O sistema retorna o status correto para os 3 estados (Available, Rented, Buffer).
- O `RentCard` é exibido corretamente quando o produto não está disponível.
- A validação de datas (Zod) impede buscas com data final anterior à inicial.
- Filtros de soft delete funcionam perfeitamente.

## 4. Failure Cases (Edge Cases)
- **ID de Produto Inválido**: Retornar erro 404 amigável via API.
- **Datas Inválidas**: Garantir que o frontend trate erros 400 (Bad Request) graciosamente.
- **Timeout da API**: Exibir notificação do `Toaster.tsx`.
- **Conflito de Buffer e Aluguel**: Se um intervalo cair em um buffer de um aluguel E no período de outro, priorizar a informação mais imediata para o atendente.