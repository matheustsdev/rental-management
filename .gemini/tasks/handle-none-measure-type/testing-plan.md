# Plano de Testes: Handle NONE Measure Type

## Cenários de Teste

### 1. Sucesso - Produto com MeasureType NONE
- **Dado**: Um produto selecionado que pertence a uma categoria com `measure_type` definido como `NONE`.
- **Quando**: O componente `ProductMeasureItem` for renderizado.
- **Então**: O item deve aparecer na lista, mas não deve ter o ícone de expansão (ou deve estar desativado) e não deve renderizar nenhum campo de input ao tentar clicar (se o clique for impedido).

### 2. Sucesso - Produto com MeasureType DRESS/SUIT
- **Dado**: Um produto com tipo `DRESS` ou `SUIT`.
- **Quando**: O componente for renderizado.
- **Então**: O comportamento original deve ser mantido (acordeão funcional e campos exibidos).

## Dados de Mock
Usar objetos de `ProductAvailabilityType` com `categories.measure_type` variando entre `NONE`, `DRESS` e `SUIT`.
