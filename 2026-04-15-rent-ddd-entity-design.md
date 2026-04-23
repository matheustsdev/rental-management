# Design Spec: Conversão de Rent para Entidade DDD

**Data:** 2026-04-15
**Status:** Draft
**Tópico:** Substituição da `Rental.ts` por uma Entidade Rica `Rent.ts` (Aggregate Root).

## 1. Contexto e Motivação
Atualmente, a lógica de negócio de aluguéis (validação de datas, cálculos financeiros, transições de status) está dispersa nos Use Cases (`CreateRentUseCase`, `UpdateRentUseCase`). A entidade `Rental.ts` é apenas uma estrutura leve para checagem de disponibilidade. Precisamos centralizar essas regras no Domínio para garantir consistência e facilitar a manutenção.

## 2. Objetivos
- Substituir totalmente a entidade `Rental.ts` pela nova `Rent.ts`.
- Transformar `Rent` em um **Aggregate Root**.
- Modelar `RentProduct` como uma **Entidade Filha**.
- Mover cálculos financeiros e validações de status para dentro da entidade.

## 3. Design Proposto

### 3.1. Entidade `Rent` (Aggregate Root)
Local: `src/core/domain/entities/Rent.ts`

**Atributos:**
- `id`: string
- `status`: ERentStatus
- `rentDate`: Date
- `returnDate`: Date
- `clientName`: string
- `address`: string | null
- `phone`: string | null
- `discountType`: discount_type_enum | null
- `discountValue`: number
- `signalValue`: number
- `items`: RentProduct[]
- `createdAt`: Date

**Métodos de Negócio:**
- `calculateSubtotal()`: Soma dos preços dos itens.
- `calculateTotal()`: Subtotal com desconto aplicado.
- `calculateRemainingBalance()`: Total - Sinal.
- `updateStatus(newStatus)`: Valida e altera o status.
- `updateDates(rent, return)`: Valida se return > rent e atualiza.
- `conflictsWith(productId, targetStart, targetEnd, bufferDays)`: Verifica se um produto específico deste aluguel conflita com as datas desejadas.

### 3.2. Entidade `RentProduct` (Entidade Filha)
Local: `src/core/domain/entities/RentProduct.ts`

**Atributos:**
- `id`: string
- `productId`: string
- `productPrice`: number
- `productDescription`: string
- `measureType`: measures_type
- `measures`: Objeto com (bust, waist, hip, shoulder, sleeve, height, back)
- `realReturnDate`: Date | null
- `realReturnBufferDays`: number | null

## 4. Transições de Status (Máquina de Estados)
| De | Para | Permitido |
| :--- | :--- | :--- |
| SCHEDULED | IN_PROGRESS | Sim |
| IN_PROGRESS | FINISHED | Sim |
| SCHEDULED | FINISHED | Sim (Devolução direta) |
| FINISHED | * | Não |
| IN_PROGRESS | SCHEDULED | Não |

## 5. Impactos Técnicos
- **IRentalRepository**: Será refatorado para retornar instâncias de `Rent`.
- **Use Cases**: Serão simplificados, delegando a lógica para os métodos da entidade.
- **Mapeamento de Infra**: O repositório Prisma precisará de um Mapper para converter o modelo do banco para a entidade e vice-versa.

## 6. Plano de Testes
- Testes unitários para `Rent.calculateTotal()` com diferentes tipos de desconto.
- Testes unitários para `Rent.updateStatus()` validando as travas da máquina de estados.
- Testes unitários para `Rent.conflictsWith()` garantindo que o buffer de limpeza seja respeitado.
