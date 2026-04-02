# Testing Plan: Rent Summary View & Confirmation

## Cenários de Teste

### 1. Visualização de Aluguel Existente (Board)
- **Caso**: Clicar em "Ver Resumo" carregar corretamente os dados.
- **Resultado Esperado**: Dados de cliente batem, preços batem, medidas batem com o cadastro.
- **Edge Case**: Aluguel com +10 produtos -> Verificar se a caixa de diálogo não transborda e o scroll funciona.

### 2. Fluxo de Confirmação (Novo Aluguel)
- **Caso**: Avançar os passos do formulário até o final.
- **Resultado Esperado**: A tela de confirmação mostra exatamente o que foi preenchido.
- **Edge Case**: Mudar o desconto no passo anterior -> A confirmação deve recalcular o "Valor Restante" imediatamente.

### 3. Integridade Histórica (Soft Deletions)
- **Caso**: Visualizar resumo de aluguel de produto que foi deletado do estoque.
- **Resultado Esperado**: O nome e preço do produto devem aparecer (vindo da tabela pivô `Rent_Products`), mesmo que o produto não esteja mais no inventário ativo.

## Dados de Mock Sugeridos
- `RentID`: UUID existente no banco.
- `ProductData`: Mistura de categorias (Dress e Suit) para validar se as medidas corretas são exibidas.
- `Discount`: Caso de porcentagem vs valor fixo.
