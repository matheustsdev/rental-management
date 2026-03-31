# Development Plan - CreateRentUseCase Tests

## Objective
Implementar os testes unitários faltantes para o `CreateRentUseCase` conforme especificado no plano de testes (`tests-cases.md`).

## Architecture Impact
- **Arquivos Afetados**: `tests/core/application/cases/rent/CreateRentUseCase.test.ts`.
- **Dependências**: `IRentalRepository`, `IProductRepository`, `faker`, `jest-mock-extended`.

## Database Changes
- Nenhuma (testes unitários com mocks).

## Implementation Steps
1.  Revisar `tests/core/application/cases/rent/CreateRentUseCase.test.ts`.
2.  Adicionar Teste 3: Criação com desconto FIXO.
3.  Adicionar Teste 4: Rejeição quando produto está indisponível.
4.  Adicionar Teste 5: Rejeição com intervalo de datas inválido (return <= rent).
5.  Adicionar Teste 6: Rejeição com data de aluguel no passado.
6.  Adicionar Teste 7: Criação com sinal (depósito).
7.  Adicionar Teste 8: Cálculo correto do preço total para múltiplos produtos.
8.  Executar os testes e validar cobertura.
