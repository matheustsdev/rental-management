# Testing Plan - Melhoria no Layout e Dados Financeiros do Recibo em PDF

Plano de testes para validar as melhorias no recibo em PDF e nos cálculos financeiros do aluguel.

## 1. Cenários de Teste

### Testes Unitários (Backend)
- **CT01 - Cálculo de Valor Restante (FindRentUseCase):**
  - Entrada: Total = 1000, Desconto = 100, Sinal = 200.
  - Saída Esperada: Valor Restante = 700.
- **CT02 - Cálculo com Desconto de Porcentagem:**
  - Garantir que o cálculo trate corretamente descontos do tipo `PERCENTAGE`.
- **CT03 - Valor Restante Mínimo (Zero):**
  - Entrada: Total = 500, Desconto = 300, Sinal = 300.
  - Saída Esperada: Valor Restante = 0 (não negativo).

### Testes de Integração (API)
- **CT04 - Retorno de Endpoint GET /api/rents/[id]:**
  - Validar se o objeto JSON contém o campo `remaining_balance` corretamente calculado.

### Testes de UI e PDF (Frontend)
- **CT05 - Layout em Duas Vias:**
  - Gerar PDF e visualizar se as duas cópias (Cliente e Loja) estão lado a lado no formato A4 Paisagem.
- **CT06 - Detalhamento Financeiro:**
  - Conferir se os campos Subtotal, Desconto, Sinal e Valor Restante são exibidos no recibo com os valores corretos.
- **CT07 - Paginação de Longas Listas:**
  - Gerar recibo para um aluguel com +15 produtos para testar a quebra automática de página (`wrap={true}`).
- **CT08 - Observações Extensas:**
  - Testar recibo com observações muito longas e verificar se há truncamento ou sobreposição de layout.
- **CT09 - Feedback Visual (Loading):**
  - Validar se o botão de emissão exibe o estado `isLoading` enquanto o PDF está sendo processado.

## 2. Dados de Mock

### Dados Base do Aluguel
```json
{
  "id": "mock-rent-id",
  "client_name": "João da Silva",
  "rent_date": "2026-04-10T10:00:00Z",
  "return_date": "2026-04-15T18:00:00Z",
  "total_value": 1500.00,
  "discount_value": 150.00,
  "signal_value": 300.00,
  "remaining_balance": 1050.00,
  "rent_products": [
    {
      "product_description": "Vestido de Festa Azul",
      "product_price": 500.00
    },
    {
      "product_description": "Terno Slim Fit",
      "product_price": 1000.00
    }
  ],
  "receipt_observations": "Cliente solicitou entrega via transportadora."
}
```
