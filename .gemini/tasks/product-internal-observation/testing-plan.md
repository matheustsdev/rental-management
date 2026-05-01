# Testing Plan - Product Internal Observation

## Unit Tests
- **RentProduct Entity**: Verificar se a propriedade `internalObservations` é armazenada e retornada corretamente.
- **RentMapper**: Garantir que o mapeamento entre o campo `internal_observations` do banco e a propriedade `internalObservations` da entidade ocorra sem erros.

## Faker Scenarios
- **Com Observação**: Produto com nota "Ajustar barra".
- **Sem Observação**: Produto com `internal_observations` nulo.
- **Texto Longo**: Observação com múltiplas linhas para testar o layout do relatório.

## Success Criteria
- O banco de dados possui a coluna `internal_observations` na tabela `rent_products`.
- É possível salvar uma observação para um produto ao criar um aluguel.
- A observação é exibida corretamente no formulário de edição.
- A observação aparece no relatório PDF abaixo da descrição do produto correspondente.

## Failure Cases
- Tentar salvar um texto extremamente longo que exceda o limite do tipo TEXT (improvável, mas testar integridade).
- Garantir que a falta de observação não quebre a renderização do formulário ou do relatório.
