# User Documentation - Observações Internas por Produto

## Feature Overview
Esta funcionalidade permite adicionar notas específicas para cada item alugado. Isso é útil para registrar detalhes como ajustes necessários, defeitos pré-existentes ou cuidados especiais que devem ser tomados com aquela peça específica durante o período de aluguel.

## Business Rules
- As observações internas são privadas e não aparecem no comprovante do cliente (Recibo).
- Elas aparecem apenas no relatório interno "Aluguéis por Período" para controle da equipe.
- Não há limite prático de caracteres para a observação, mas recomenda-se brevidade para não poluir o relatório.

## User Guide
1. Ao criar ou editar um aluguel, selecione um produto.
2. Expanda os detalhes do produto (onde ficam as medidas).
3. Você verá um novo campo chamado "Observação Interna".
4. Digite as notas relevantes para aquele item.
5. Salve o aluguel.
6. Ao gerar o relatório de "Aluguéis por Período", as notas aparecerão logo abaixo do nome de cada produto.

## Warnings
- Lembre-se que estas observações são salvas por aluguel. Se o mesmo produto for alugado novamente, a observação anterior não aparecerá automaticamente (pois cada aluguel pode ter necessidades diferentes).
