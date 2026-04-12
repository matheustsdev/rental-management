# Correção do Fluxo de Edição de Aluguel e Persistência de Medidas

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir o modal de edição de aluguel para carregar corretamente datas, status de produtos, valores financeiros e mediras, além de garantir que medidas sejam persistidas na criação/edição.

**Architecture:** Sistema Next.js 15 com arquitetura em camadas (domain, application, infrastructure, presentation). A correção atravessa todas as camadas: UI (React Hook Form, Chakra UI) → API routes → Use Cases → Repository → Prisma.

**Tech Stack:** Next.js 15, React Hook Form, Chakra UI, Prisma, PostgreSQL, date-fns, Zod, Jest

---

## Problemas Identificados

| Problema | Arquivo | Linha | Descrição |
|----------|---------|-------|-----------|
| Medidas não persistem | `CreateRentUseCase.ts` | 59-67 | `createMany` não inclui campos de medida |
| Medidas não persistem | `UpdateRentUseCase.ts` | 115-124 | `createMany` não inclui campos de medida |
| Produto mostra "Alugado" ao editar | `ListProductAvailabilityUseCase.ts` | N/A | Não há parâmetro `excludeRentId` |
| Produto mostra "Alugado" ao editar | `AddRentModal.tsx` | 340-347 | API call não passa `rentId` |
| Datas não pré-preenchem corretamente | `AddRentModal.tsx` | 389-390 | Formato incorreto para input date |
| Resumo financeiro com valores errados | `AddRentModal.tsx` | 384 | `totalValue` setado como `total - discount` |

---

## Task 1: Persistência de Medidas no CreateRentUseCase

**Files:**
- Modify: `src/core/application/cases/rent/CreateRentUseCase.ts:59-67`
- Modify: `tests/core/cases/rent/CreateRentUseCase.test.ts`

- [ ] **Step 1: Escrever teste de falha para persistência de medidas**

```typescript
it("should save product measurements when creating rent", async () => {
  const mockProduct = getRandomProductType({ id: "product-1", categories: { ...getRandomCategory(), measure_type: measures_type.SUIT } });
  productRepo.findById.mockResolvedValue(mockProduct);
  rentalRepo.findActiveByProduct.mockResolvedValue([]);
  rentalRepo.create.mockResolvedValue(getRandomRent({
    rent_products: [{
      id: "rp-1",
      product_id: "product-1",
      product_price: new Decimal(100),
      product_description: "Test",
      measure_type: measures_type.SUIT,
      bust: new Decimal(90),
      waist: new Decimal(80),
      hip: new Decimal(95),
      shoulder: new Decimal(40),
      sleeve: new Decimal(55),
      height: new Decimal(170),
      back: new Decimal(38),
      rent_id: "rent-1",
      created_at: new Date(),
      deleted: false,
      deleted_at: null,
      real_return_buffer_days: null,
      real_return_date: null,
    }]
  }));

  const input: RentInsertWithProductDtoType = {
    client_name: "Test",
    rent_date: "2025-03-01T00:00:00.000Z",
    return_date: "2025-03-05T00:00:00.000Z",
    total_value: new Decimal(100),
    rent_products: [{
      product_id: "product-1",
      product_price: new Decimal(100),
      product_description: "Test",
      measure_type: measures_type.SUIT,
      bust: 90,
      waist: 80,
      hip: 95,
      shoulder: 40,
      sleeve: 55,
      height: 170,
      back: 38,
    }]
  };

  await useCase.execute(input);

  expect(rentalRepo.create).toHaveBeenCalledWith(
    expect.objectContaining({
      rent_products: expect.objectContaining({
        createMany: expect.objectContaining({
          data: expect.arrayContaining([expect.objectContaining({
            bust: expect.any(Prisma.Decimal),
            waist: expect.any(Prisma.Decimal),
          })])
        })
      })
    })
  );
});
```

- [ ] **Step 2: Executar teste para verificar falha**

Run: `npm test -- tests/core/cases/rent/CreateRentUseCase.test.ts -t "should save product measurements"`
Expected: FAIL (medidas não estão sendo passadas)

- [ ] **Step 3: Modificar CreateRentUseCase para incluir medidas**

Modify `src/core/application/cases/rent/CreateRentUseCase.ts` lines 59-67:

```typescript
const rentProductsInsertPayload: Prisma.rent_productsCreateNestedManyWithoutRentInput = {
  createMany: {
    data: rent_products.map((rp) => ({
      product_id: rp.product_id,
      product_price: rp.product_price,
      product_description: rp.product_description,
      measure_type: rp.measure_type,
      bust: rp.bust != null ? new Prisma.Decimal(rp.bust) : undefined,
      waist: rp.waist != null ? new Prisma.Decimal(rp.waist) : undefined,
      hip: rp.hip != null ? new Prisma.Decimal(rp.hip) : undefined,
      shoulder: rp.shoulder != null ? new Prisma.Decimal(rp.shoulder) : undefined,
      sleeve: rp.sleeve != null ? new Prisma.Decimal(rp.sleeve) : undefined,
      height: rp.height != null ? new Prisma.Decimal(rp.height) : undefined,
      back: rp.back != null ? new Prisma.Decimal(rp.back) : undefined,
    })),
  },
};
```

- [ ] **Step 4: Executar teste para verificar passagem**

Run: `npm test -- tests/core/cases/rent/CreateRentUseCase.test.ts -t "should save product measurements"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/application/cases/rent/CreateRentUseCase.ts tests/core/cases/rent/CreateRentUseCase.test.ts
git commit -m "fix: persist product measurements in CreateRentUseCase"
```

---

## Task 2: Persistência de Medidas no UpdateRentUseCase

**Files:**
- Modify: `src/core/application/cases/rent/UpdateRentUseCase.ts:115-124`
- Modify: `tests/core/cases/rent/UpdateRentUseCase.test.ts`

- [ ] **Step 1: Escrever teste de falha para persistência de medidas na atualização**

```typescript
it("should save product measurements when updating rent", async () => {
  const existingRent = getRandomRent({
    id: "rent-1",
    status: ERentStatus.SCHEDULED,
    rent_products: []
  });
  rentalRepo.find.mockResolvedValue(existingRent);
  
  const mockProduct = getRandomProductType({ id: "product-1", categories: { ...getRandomCategory(), measure_type: measures_type.DRESS } });
  productRepo.findById.mockResolvedValue(mockProduct);
  rentalRepo.findActiveByProduct.mockResolvedValue([]);
  rentalRepo.deleteRentProducts.mockResolvedValue();
  rentalRepo.update.mockResolvedValue(getRandomRent({
    rent_products: [{
      id: "rp-1",
      product_id: "product-1",
      product_price: new Decimal(100),
      product_description: "Test",
      measure_type: measures_type.DRESS,
      bust: new Decimal(88),
      waist: new Decimal(70),
      hip: new Decimal(92),
      shoulder: new Decimal(38),
      sleeve: null,
      height: null,
      back: null,
      rent_id: "rent-1",
      created_at: new Date(),
      deleted: false,
      deleted_at: null,
      real_return_buffer_days: null,
      real_return_date: null,
    }]
  }));

  const input: RentUpdateWithProductDtoType = {
    id: "rent-1",
    rent_products: [{
      product_id: "product-1",
      product_price: new Decimal(100),
      product_description: "Test",
      measure_type: measures_type.DRESS,
      bust: 88,
      waist: 70,
      hip: 92,
      shoulder: 38,
    }]
  };

  await useCase.execute(input);

  expect(rentalRepo.deleteRentProducts).toHaveBeenCalledWith("rent-1");
  expect(rentalRepo.update).toHaveBeenCalledWith(
    "rent-1",
    expect.objectContaining({
      rent_products: expect.objectContaining({
        createMany: expect.objectContaining({
          data: expect.arrayContaining([expect.objectContaining({
            bust: expect.any(Prisma.Decimal),
            waist: expect.any(Prisma.Decimal),
            hip: expect.any(Prisma.Decimal),
          })])
        })
      })
    })
  );
});
```

- [ ] **Step 2: Executar teste para verificar falha**

Run: `npm test -- tests/core/cases/rent/UpdateRentUseCase.test.ts -t "should save product measurements when updating rent"`
Expected: FAIL

- [ ] **Step 3: Modificar UpdateRentUseCase para incluir medidas**

Modify `src/core/application/cases/rent/UpdateRentUseCase.ts` lines 115-124:

```typescript
const rentProductsInsertPayload: Prisma.rent_productsCreateNestedManyWithoutRentInput = {
  createMany: {
    data: rent_products.map((rp) => ({
      product_id: rp.product_id,
      product_price: rp.product_price,
      product_description: rp.product_description,
      measure_type: rp.measure_type,
      bust: rp.bust != null ? new Prisma.Decimal(rp.bust as number) : undefined,
      waist: rp.waist != null ? new Prisma.Decimal(rp.waist as number) : undefined,
      hip: rp.hip != null ? new Prisma.Decimal(rp.hip as number) : undefined,
      shoulder: rp.shoulder != null ? new Prisma.Decimal(rp.shoulder as number) : undefined,
      sleeve: rp.sleeve != null ? new Prisma.Decimal(rp.sleeve as number) : undefined,
      height: rp.height != null ? new Prisma.Decimal(rp.height as number) : undefined,
      back: rp.back != null ? new Prisma.Decimal(rp.back as number) : undefined,
    })),
  },
};
```

- [ ] **Step 4: Executar teste para verificar passagem**

Run: `npm test -- tests/core/cases/rent/UpdateRentUseCase.test.ts -t "should save product measurements when updating rent"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/application/cases/rent/UpdateRentUseCase.ts tests/core/cases/rent/UpdateRentUseCase.test.ts
git commit -m "fix: persist product measurements in UpdateRentUseCase"
```

---

## Task 3: API de Disponibilidade com ExcludeRentId

**Files:**
- Modify: `src/app/api/products/availability/route.ts`
- Modify: `src/core/application/cases/product/ListProductAvailabilityUseCase.ts`
- Modify: `src/core/infrastructure/database/PrismaProductRepository.ts`

- [ ] **Step 1: Modificar PrismaProductRepository para aceitar excludeRentId**

Modify `src/core/infrastructure/database/PrismaProductRepository.ts`:

1. Update `listWithAvailability` method signature (around line 62):

```typescript
async listWithAvailability(
  searchText: string, 
  startDate: Date, 
  endDate: Date,
  excludeRentId?: string
): Promise<ProductAvailabilityType[]>
```

2. Update the logic inside the method (around line 86-94) to filter out the current rent:

```typescript
include: {
  categories: true,
  rent_products: {
    where: {
      deleted: false,
      ...(excludeRentId && { rent_id: { not: excludeRentId } })
    },
    include: {
      rent: true,
    }
  }
}
```

- [ ] **Step 2: Modificar ListProductAvailabilityUseCase**

Modify `src/core/application/cases/product/ListProductAvailabilityUseCase.ts`:

```typescript
export class ListProductAvailabilityUseCase {
  constructor(
    private productRepository: IProductRepository,
  ) {}

  async execute(
    searchText: string, 
    startDate: Date, 
    endDate: Date,
    excludeRentId?: string
  ): Promise<ListUseCaseReturnType<ProductType>> {
    const count = await this.productRepository.count();
    const data = await this.productRepository.listWithAvailability(
      searchText, 
      startDate, 
      endDate,
      excludeRentId
    );

    return { data, count };
  }
}
```

- [ ] **Step 3: Modificar API route**

Modify `src/app/api/products/availability/route.ts`:

```typescript
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const search = params.get("search"); 
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const excludeRentId = params.get("excludeRentId") ?? undefined;

    if (!startDate || !endDate) throw new Error("Informe a data de aluguel e de retorno");

    const useCase = new ListProductAvailabilityUseCase(productRepository);
    const response = await useCase.execute(
      search ?? "", 
      new Date(startDate), 
      new Date(endDate),
      excludeRentId
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar produtos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/products/availability/route.ts
git add src/core/application/cases/product/ListProductAvailabilityUseCase.ts
git add src/core/infrastructure/database/PrismaProductRepository.ts
git commit -m "feat: add excludeRentId parameter to product availability API"
```

---

## Task 4: Frontend - Passar rentId para API de Disponibilidade

**Files:**
- Modify: `src/components/organisms/AddRentModal.tsx`
- Modify: `src/components/molecules/ProductSelector.tsx`

- [ ] **Step 1: Modificar AddRentModal para passar rentId**

Modify `src/components/organisms/AddRentModal.tsx` lines 338-357:

```typescript
const loadProducts = async () => {
  try {
    const params: Record<string, string> = {
      startDate: rentDate,
      endDate: returnDate,
    };
    
    if (rentOnEdit?.id) {
      params.excludeRentId = rentOnEdit.id;
    }

    const productsListRequest = (
      await api.get("/products/availability", { params })
    ).data;

    methods.setValue("allAvailableProducts", productsListRequest.data);
  } catch (e: unknown) {
    toaster.create({
      type: "error",
      title: "Erro ao buscar produtos",
      description: (e as Error).message,
    });
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/organisms/AddRentModal.tsx
git commit -m "fix: pass excludeRentId when loading product availability in edit mode"
```

---

## Task 5: Frontend - Correção de Pré-preenchimento de Datas

**Files:**
- Modify: `src/components/organisms/AddRentModal.tsx`
- Modify: `src/components/molecules/AddRentInfoStep.tsx` (verificar se necessário)

- [ ] **Step 1: Analisar e corrigir formatação de datas no AddRentModal**

Modify `src/components/organisms/AddRentModal.tsx` lines 370-395:

O problema atual:
- Linha 389: `setValue("rentDate", rentOnEdit.rent_date)` - pode não funcionar com Date objects
- Linha 390: `setValue("returnDate", rentOnEdit.return_date ?? "")` - retorna string vazia se null

Solução - usar `getUTCDateFromInput` para garantir formato correto:

```typescript
useEffect(() => {
  const { setValue, reset } = methods;

  if (!rentOnEdit) {
    reset();
    return;
  }

  setValue("clientAddress", rentOnEdit.address ?? "");
  setValue("clientContact", rentOnEdit.phone ?? "");
  setValue("clientName", rentOnEdit.client_name ?? "");
  setValue("discountType", rentOnEdit.discount_type ?? EDiscountTypes.FIXED);
  setValue("discountValue", Number(rentOnEdit.discount_value ?? 0));
  setValue("totalValue", Number(rentOnEdit.total_value));
  setValue("finalTotalValue", Number(rentOnEdit.total_value) - Number(rentOnEdit.discount_value ?? 0));
  setValue("internalObservations", rentOnEdit.internal_observations ?? "");
  setValue("receiptObservations", rentOnEdit.receipt_observations ?? "");
  setValue("signal", Number(rentOnEdit.signal_value ?? 0));
  setValue("remainingValue", Number(rentOnEdit.remaining_value ?? 0));
  setValue("rentDate", getUTCDateFromInput(rentOnEdit.rent_date));
  setValue("returnDate", rentOnEdit.return_date ? getUTCDateFromInput(rentOnEdit.return_date) : "");
  setValue("rentProducts", rentOnEdit.rent_products);

  const selectedRentProductIds = rentOnEdit.rent_products.map((rentProduct) => rentProduct.product_id);
  setValue("productIds", selectedRentProductIds);
}, [rentOnEdit]);
```

Mudanças importantes:
1. `totalValue` agora é `Number(rentOnEdit.total_value)` (antes estava subtraindo discount)
2. `finalTotalValue` calcula o valor final correto
3. Datas usam `getUTCDateFromInput` para consistência

- [ ] **Step 2: Commit**

```bash
git add src/components/organisms/AddRentModal.tsx
git commit -m "fix: correct date formatting and total value initialization in edit mode"
```

---

## Task 6: Frontend - Marcar Produtos do Aluguel Atual como "Selecionado"

**Files:**
- Modify: `src/components/molecules/ProductSelector.tsx`
- Modify: `src/components/atoms/ProductSelectorItem.tsx`

- [ ] **Step 1: Modificar ProductSelectorItem para aceitar prop de Selected**

Modify `src/components/atoms/ProductSelectorItem.tsx`:

```typescript
interface IProductSelectorItemProps {
  productAvailability: ProductAvailabilityType;
  isSelected: boolean;
  onChangeSelection: (product: ProductAvailabilityType) => void;
  forceSelected?: boolean; // Nova prop para forçar estado "Selecionado"
}
```

```typescript
const getAvailabilityText = (availability: availability_status, forceSelected?: boolean) => {
  if (forceSelected) return "Selecionado";
  if (availability === EAvailabilityStatus.AVAILABLE) return "Disponível";
  if (availability === EAvailabilityStatus.UNAVAILABLE) return "Alugado";
  if (availability === EAvailabilityStatus.BUFFER_OCCUPIED) return "Em limpeza";
  return "";
};
```

```typescript
const isDisabled = !forceSelected && productAvailability.availability !== EAvailabilityStatus.AVAILABLE;

return (
  <Flex
    key={productAvailability.id}
    w="full"
    borderWidth={1}
    p={2}
    borderRadius="md"
    bg={isSelected || forceSelected ? "green.50" : "white"}
    opacity={isDisabled ? 0.6 : 1}
  >
    <Checkbox.Root
      variant="outline"
      checked={isSelected || forceSelected}
      onChange={() => !isDisabled && onChangeSelection(productAvailability)}
      w="full"
      disabled={isDisabled}
    >
      {/* ... rest of component ... */}
      <Text fontSize="xs">{getAvailabilityText(productAvailability.availability, forceSelected)}</Text>
      {/* ... rest of component ... */}
    </Checkbox.Root>
  </Flex>
);
```

- [ ] **Step 2: Modificar ProductSelector para passar produtos do aluguel atual**

Modify `src/components/molecules/ProductSelector.tsx`:

```typescript
// Obter produtos atuais do aluguel em edição
const rentProducts = useWatch({ control, name: "rentProducts" });
const forceSelectedIds = rentProducts?.map(rp => rp.product_id) ?? [];
```

```typescript
{filteredProducts.map((productAvailability) => (
  <ProductSelectorItem
    key={productAvailability.id}
    productAvailability={productAvailability}
    isSelected={products.some((item) => item.id === productAvailability.id)}
    forceSelected={forceSelectedIds.includes(productAvailability.id)}
    onChangeSelection={toggleProductSelection}
  />
))}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/atoms/ProductSelectorItem.tsx
git add src/components/molecules/ProductSelector.tsx
git commit -m "feat: mark products from current rental as selected in edit mode"
```

---

## Task 7: Verificação e Testes de Integração

**Files:**
- Create: `tests/integration/rent-edit-flow.test.ts` (opcional, para testes E2E)

- [ ] **Step 1: Executar todos os testes existentes**

Run: `npm test`
Expected: Todos os testes passam

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: Build completo sem erros

- [ ] **Step 3: Testar manualmente o fluxo completo**

1. Abrir modal de edição de um aluguel existente
2. Verificar se datas estão pré-preenchidas corretamente
3. Verificar se produtos do aluguel aparecem como "Selecionado" (verde)
4. Verificar se resumo financeiro mostra valores corretos
5. Alterar medidas e salvar
6. Abrir novamente a edição e verificar se medidas persistiram

- [ ] **Step 4: Commit**

```bash
git add tests/integration/rent-edit-flow.test.ts  # Se criou testes
git commit -m "test: add integration tests for rent edit flow"
```

---

## Resumo das Alterações por Camada

| Camada | Arquivo | Mudança |
|--------|---------|---------|
| Domain | - | Nenhuma |
| Infrastructure | `PrismaProductRepository.ts` | Adicionar `excludeRentId` em `listWithAvailability` |
| Application | `CreateRentUseCase.ts` | Persistir medidas no `createMany` |
| Application | `UpdateRentUseCase.ts` | Persistir medidas no `createMany` |
| Application | `ListProductAvailabilityUseCase.ts` | Adicionar `excludeRentId` parameter |
| API | `availability/route.ts` | Passar `excludeRentId` para use case |
| Presentation | `AddRentModal.tsx` | Passar `rentId`, corrigir datas e valores |
| Presentation | `ProductSelector.tsx` | Passar `forceSelected` para produtos |
| Presentation | `ProductSelectorItem.tsx` | Renderizar estado "Selecionado" |

---

## Story Points: 5

## Checklist de Verificação

- [ ] Testes unitários de CreateRentUseCase passam
- [ ] Testes unitários de UpdateRentUseCase passam
- [ ] API de disponibilidade aceita `excludeRentId`
- [ ] Modal de edição pré-preenche datas corretamente
- [ ] Modal de edição mostra produtos do aluguel como "Selecionado"
- [ ] Modal de edição mostra valores financeiros corretos
- [ ] Medidas são persistidas ao criar aluguel
- [ ] Medidas são persistidas ao editar aluguel
- [ ] Build completa sem erros
