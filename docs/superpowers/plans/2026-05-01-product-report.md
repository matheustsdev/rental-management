# Relatório de Produtos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a product report in PDF format with an Excel-like table layout, including filters for text and category, ordered by name.

**Architecture:** Extend the existing Clean Architecture layers. Update the repository to handle category filtering, update the use case to support filtered counts, and create a new React-PDF component for the report layout.

**Tech Stack:** React 19, Next.js 15, Prisma, Chakra UI, @react-pdf/renderer.

---

### Task 1: Update Product Repository Interface

**Files:**
- Modify: `src/core/domain/repositories/IProductRepository.ts`

- [ ] **Step 1: Add `categoryId` to `ProductListInput` and update `count` signature**

```typescript
export type ProductListInput = {
  search?: string;
  categoryId?: string; // Add this
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  pageSize?: number;
};

export interface IProductRepository {
  // ...
  count(params?: ProductListInput): Promise<number>; // Change from Prisma.productsWhereInput
}
```

- [ ] **Step 2: Commit changes**

```bash
git add src/core/domain/repositories/IProductRepository.ts
git commit -m "domain: add categoryId to ProductListInput and update count signature"
```

---

### Task 2: Implement Category Filtering in Prisma Repository

**Files:**
- Modify: `src/core/infrastructure/database/PrismaProductRepository.ts`

- [ ] **Step 1: Update `list` method to handle `categoryId`**

```typescript
  async list(params: ProductListInput): Promise<ProductType[]> {
    const { search, categoryId, orderBy, ascending, page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    const orderDirection = ascending ? "asc" : "desc";
    const orderByKey = orderBy || "updated_at";

    if (!search) {
      return this.prisma.products.findMany({
        where: { 
            deleted: false,
            ...(categoryId && { category_id: categoryId })
        },
        skip,
        take: pageSize,
        orderBy: { [orderByKey]: orderDirection },
        include: { categories: true }
      });
    }

    const searchTerm = `%${search}%`;
    const categoryFilter = categoryId ? Prisma.sql`AND "category_id" = ${categoryId}` : Prisma.empty;
    const matchedProducts = await this.prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "products"
      WHERE (
        unaccent("reference") ILIKE unaccent(${searchTerm})
        OR 
        unaccent("description") ILIKE unaccent(${searchTerm})
        OR 
        unaccent("receipt_description") ILIKE unaccent(${searchTerm})
      )
      AND "deleted" = false
      ${categoryFilter}
    `;

    const ids = matchedProducts.map(p => p.id);

    return this.prisma.products.findMany({
      where: {
        id: { in: ids }
      },
      skip,
      take: pageSize,
      orderBy: {
        [orderByKey]: orderDirection,
      },
      include: {
        categories: true
      }
    });
  }
```

- [ ] **Step 2: Update `count` method to handle `search` and `categoryId`**

```typescript
  async count(params?: ProductListInput): Promise<number> {
    const { search, categoryId } = params || {};
    
    if (!search) {
      return this.prisma.products.count({ 
        where: { 
          deleted: false,
          ...(categoryId && { category_id: categoryId })
        } 
      });
    }

    const searchTerm = `%${search}%`;
    const categoryFilter = categoryId ? Prisma.sql`AND "category_id" = ${categoryId}` : Prisma.empty;
    const result = await this.prisma.$queryRaw<{ count: bigint }[]>`
      SELECT count(*) as count FROM "products"
      WHERE (
        unaccent("reference") ILIKE unaccent(${searchTerm})
        OR 
        unaccent("description") ILIKE unaccent(${searchTerm})
        OR 
        unaccent("receipt_description") ILIKE unaccent(${searchTerm})
      )
      AND "deleted" = false
      ${categoryFilter}
    `;

    return Number(result[0].count);
  }
```

- [ ] **Step 3: Commit changes**

```bash
git add src/core/infrastructure/database/PrismaProductRepository.ts
git commit -m "infra: implement category filtering and search-aware count in PrismaProductRepository"
```

---

### Task 3: Update Use Case and API Route

**Files:**
- Modify: `src/core/application/cases/product/ListProductUseCase.ts`
- Modify: `src/app/api/products/route.ts`

- [ ] **Step 1: Update `ListProductUseCase` to pass filters to `count`**

```typescript
  async execute(input: ListProductUseCaseInputType): Promise<ListUseCaseReturnType<ProductType>> {
    const count = await this.productRepository.count(input); // Pass input
    const data = await this.productRepository.list(input);

    return { data, count };
  }
```

- [ ] **Step 2: Update API route to parse `categoryId`**

```typescript
// In src/app/api/products/route.ts inside GET handler
  const search = searchParams.get("search") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined; // Add this
  const orderBy = searchParams.get("orderBy") || "reference";
  // ...
  const products = await listProductUseCase.execute({
    search,
    categoryId, // Add this
    orderBy,
    ascending,
    page,
    pageSize,
  });
```

- [ ] **Step 3: Commit changes**

```bash
git add src/core/application/cases/product/ListProductUseCase.ts src/app/api/products/route.ts
git commit -m "app: pass categoryId through UseCase and API route"
```

---

### Task 4: Create Product PDF Report View

**Files:**
- Create: `src/components/molecules/ProductReportView.tsx`

- [ ] **Step 1: Implement PDF component with Excel-like table**

```typescript
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ProductType } from "@/types/entities/ProductType";
import { formatDate } from "@/utils/formatDate";

const COLORS = {
  primary: "#E9063B",
  secondary: "#B18E72",
  text: "#333333",
  lightText: "#666666",
  border: "#E2E8F0",
  background: "#F7FAFC",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: COLORS.white, color: COLORS.text },
  header: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: COLORS.primary, paddingBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: COLORS.primary, marginBottom: 4 },
  info: { fontSize: 9, color: COLORS.lightText, marginBottom: 2 },
  table: { marginTop: 10, borderWidth: 1, borderColor: COLORS.border },
  tableHeader: { flexDirection: "row", backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: COLORS.border, fontWeight: "bold" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: COLORS.border },
  cell: { padding: 5, fontSize: 8, borderRightWidth: 1, borderRightColor: COLORS.border },
  colIndex: { width: "8%", textAlign: "center" },
  colRef: { width: "15%" },
  colName: { width: "25%" },
  colDesc: { width: "37%" },
  colValue: { width: "15%", textAlign: "right", borderRightWidth: 0 },
  footer: { position: "absolute", bottom: 30, left: 30, right: 30, textAlign: "center", fontSize: 8, color: COLORS.lightText, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 10 },
});

interface IProductReportViewProps {
  products: ProductType[];
  search?: string;
  categoryName?: string;
}

const ProductReportView: React.FC<IProductReportViewProps> = ({ products, search, categoryName }) => (
  <Document title="Relatório de Produtos">
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório de Produtos</Text>
        <Text style={styles.info}>Data de geração: {formatDate(new Date(), "dd/MM/yyyy HH:mm")}</Text>
        {(search || categoryName) && (
          <Text style={styles.info}>
            Filtros: {search ? `Busca: "${search}"` : ""} {categoryName ? ` | Categoria: ${categoryName}` : ""}
          </Text>
        )}
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.colIndex]}>#</Text>
          <Text style={[styles.cell, styles.colRef]}>Referência</Text>
          <Text style={[styles.cell, styles.colName]}>Produto</Text>
          <Text style={[styles.cell, styles.colDesc]}>Descrição Detalhada</Text>
          <Text style={[styles.cell, styles.colValue]}>Valor</Text>
        </View>

        {products.map((product, index) => (
          <View key={product.id} style={styles.tableRow} wrap={false}>
            <Text style={[styles.cell, styles.colIndex]}>{index + 1}</Text>
            <Text style={[styles.cell, styles.colRef]}>{product.reference}</Text>
            <Text style={[styles.cell, styles.colName]}>{product.description}</Text>
            <Text style={[styles.cell, styles.colDesc]}>{product.receipt_description || "-"}</Text>
            <Text style={[styles.cell, styles.colValue]}>
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(product.price))}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} fixed />
    </Page>
  </Document>
);

export default ProductReportView;
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/molecules/ProductReportView.tsx
git commit -m "feat: create Product PDF report view component"
```

---

### Task 5: Add Product Report Card to Reports Page

**Files:**
- Modify: `src/app/reports/page.tsx`

- [ ] **Step 1: Add necessary imports and states for Product Report**

```typescript
import ProductReportView from "@/components/molecules/ProductReportView";
import { CategoryType } from "@/types/entities/CategoryType";
import { NativeSelect } from "@/components/ui/native-select"; // Verify if available or use Chakra Select
// ...
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [shouldPrintProducts, setShouldPrintProducts] = useState(false);

  const [productInstance, updateProductInstance] = usePDF({
    document: <ProductReportView products={[]} />,
  });

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);
```

- [ ] **Step 2: Implement `handleGenerateProductReport`**

```typescript
  const handleGenerateProductReport = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await api.get("/products", {
        params: {
          search: productSearch,
          categoryId: productCategoryId,
          pageSize: 1000,
          orderBy: "description",
          ascending: true,
        },
      });
      const data = response.data.data as ProductType[];

      if (data.length === 0) {
        toaster.create({ title: "Nenhum produto encontrado", type: "info" });
        setIsLoadingProducts(false);
        return;
      }

      const categoryName = categories.find(c => c.id === productCategoryId)?.name;
      updateProductInstance(<ProductReportView products={data} search={productSearch} categoryName={categoryName} />);
      setShouldPrintProducts(true);
    } catch {
      toaster.create({ title: "Erro ao buscar dados", type: "error" });
    } finally {
      setIsLoadingProducts(false);
    }
  };
```

- [ ] **Step 3: Update `useEffect` for automatic printing**

```typescript
  useEffect(() => {
    if (shouldPrintProducts && !productInstance.loading && productInstance.url) {
      printPdf(productInstance.url);
      setShouldPrintProducts(false);
    }
  }, [productInstance.loading, productInstance.url, shouldPrintProducts]);
```

- [ ] **Step 4: Add the UI Card for Product Report**

```typescript
{/* Inside the Grid */}
<GridItem>
  <Card.Root variant="outline" borderColor="gray.200" boxShadow="sm">
    <Card.Header borderBottomWidth="1px" borderColor="gray.100" bg="gray.50" p="4">
      <HStack>
        <Icon as={FaFilePdf} color="primary.300" />
        <Card.Title fontSize="md">Relatório de Produtos</Card.Title>
      </HStack>
    </Card.Header>
    <Card.Body p="4">
      <Stack gap="4">
        <Field.Root>
          <Field.Label fontSize="xs" fontWeight="bold">Busca (Ref/Nome)</Field.Label>
          <Input 
            placeholder="Ex: Vestido..." 
            value={productSearch} 
            onChange={(e) => setProductSearch(e.target.value)} 
            size="sm" 
          />
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="xs" fontWeight="bold">Categoria</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field 
              placeholder="Todas as categorias" 
              value={productCategoryId} 
              onChange={(e) => setProductCategoryId(e.target.value)}
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>

        <Button
          alignSelf="flex-end"
          colorPalette="primary"
          onClick={handleGenerateProductReport}
          loading={isLoadingProducts || (productInstance.loading && shouldPrintProducts)}
          size="sm"
          width="1/4"
        >
          Gerar PDF
        </Button>
      </Stack>
    </Card.Body>
  </Card.Root>
</GridItem>
```

- [ ] **Step 5: Commit changes**

```bash
git add src/app/reports/page.tsx
git commit -m "feat: add product report card with filters to reports page"
```

---

### Task 6: Final Verification

- [ ] **Step 1: Verify text filter**
Generate report with a search term (e.g., "Vestido") and check if the PDF contains only matching products.

- [ ] **Step 2: Verify category filter**
Select a specific category and verify if the PDF contains only products from that category.

- [ ] **Step 3: Verify ordering**
Check if products are ordered alphabetically by description.

- [ ] **Step 4: Verify layout**
Ensure the PDF table looks like an Excel sheet (borders, alignment) and the `#` column increments correctly.
