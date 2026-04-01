# Plano de Testes: Gestão de Categorias

**Objetivo**: Garantir que o cadastro, atualização e listagem de categorias funcionem conforme o esperado, seguindo as regras de negócio e preservando a integridade dos dados.

## Testes Unitários
### UseCase - CreateCategory
- **Cenário 1**: Registrar uma categoria válida (ex: "Sapatos", Buffer: 0, Tipo: `NONE`).
- **Cenário 2**: Tentar registrar uma categoria com nome que já existe.
- **Cenário 3**: Validar se o nome é obrigatório e se os dias de buffer não são negativos.

**Arquivos a serem gerados:**
- `src/core/application/use-cases/__tests__/CreateCategoryUseCase.test.ts`
- **Mocks**: Mock para `ICategoryRepository`.

### UseCase - UpdateCategory
- **Cenário 1**: Atualizar o nome de uma categoria existente.
- **Cenário 2**: Atualizar o buffer de dias para uma categoria existente.
- **Cenário 3**: Tentar atualizar uma categoria que não existe no banco.

**Arquivos a serem gerados:**
- `src/core/application/use-cases/__tests__/UpdateCategoryUseCase.test.ts`

## Cenários com Faker
### Geração de Dados Aleatórios
- **Cenário 1**: Gerar nomes de categorias randômicos para testar a listagem.
- **Cenário 2**: Gerar categorias com diferentes tipos de medida (`SUIT`, `DRESS`, `NONE`).

## Critérios de Sucesso
### Critérios de Aceitação
- **C1**: Ao criar uma categoria válida, ela deve aparecer imediatamente na listagem com todos os dados corretos.
- **C2**: Ao editar uma categoria, a alteração de nome ou buffer deve ser refletida na interface imediatamente após o sucesso.
- **C3**: O tipo de medida deve ser salvo corretamente conforme a seleção do usuário.

## Casos de Falha
### Casos de Erro
- **Caso 1**: Tentar criar uma categoria sem nome. -> Exibir erro de validação (Zod).
- **Caso 2**: Tentar criar com buffer negativo. -> Exibir erro de validação (Zod).
- **Caso 3**: Inserir um tipo de medida inválido (não contido no Enum). -> Exibir erro HTTP 400.
