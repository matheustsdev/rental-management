# Plano de Desenvolvimento: Handle NONE Measure Type

## Requisitos funcionais
- **RF01**: Não deve gerar campos de medida se o tipo for `NONE`.
- **RF02**: O acordeão para itens com tipo de medida `NONE` não deve ser clicável/aberto.

## Requisitos não funcionais
- **RN01**: Manter a consistência visual com os outros itens do acordeão.

## Frontend

### ✅ Atualizar constantes de medidas
Adicionar o tipo `NONE` nas constantes de labels para evitar que o componente tente acessar uma propriedade inexistente.

**Arquivos a serem alterados:**
- `src/constants/MeasureFields.ts`

### ✅ Implementar lógica no ProductMeasureItem
1. Identificar se o tipo de medida é `NONE`.
2. Se for `NONE`, desativar a interação do `Accordion.Item` e não renderizar o `Accordion.ItemContent`.

**Arquivos a serem alterados:**
- `src/components/atoms/ProductMeasureItem.tsx`
