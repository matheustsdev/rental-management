# Testing Plan - CreateRentUseCase Implementation

## Unit Tests (Mocks)
- **Repository Mocks**: `rentalRepo` e `productRepo` mockados via `jest-mock-extended`.
- **Isolation**: Garantir que nenhum código de banco de dados real seja executado.

## Faker Scenarios
- **Desconto Fixo**: Valor fixo (ex: R$ 50) deduzido do subtotal.
- **Indisponibilidade**: Mockar `rentalRepo.findActiveByProduct` retornando aluguel conflitante.
- **Datas Inválidas**: `return_date` anterior ou igual a `rent_date`.
- **Datas Passadas**: `rent_date` < hoje.
- **Sinal**: `signal_value` presente no input e persistido.

## Success Criteria
- O teste de desconto fixo deve validar a subtração correta.
- O teste de indisponibilidade deve lançar `ServerError` com mensagem apropriada.
- Os testes de datas devem lançar erros de validação (Zod ou manual no Use Case).
- O teste de preço total deve somar corretamente o preço de múltiplos produtos.

## Failure Cases (Edge Cases)
- Desconto fixo maior que o total (deve resultar em total 0 ou erro, validar comportamento).
- Conflito exato na data de buffer.
- Data de aluguel exatamente igual à data de devolução.
