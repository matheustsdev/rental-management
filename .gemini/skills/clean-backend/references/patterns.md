# Code Patterns

## Use Case Template

```typescript
import { IRepository } from "@/core/domain/repositories/IRepository";
import { EntityType } from "@/types/entities/EntityType";

export class ActionUseCase {
  constructor(private repository: IRepository) {}

  async execute(input: InputDto): Promise<EntityType> {
    // Business logic...
    return this.repository.create(input);
  }
}
```

## Repository Pattern (Prisma)

```typescript
export class PrismaEntityRepository implements IEntityRepository {
  constructor(private prisma: PrismaClient) {}

  async list(params: ListInput): Promise<EntityType[]> {
    const { page = 1, pageSize = 10 } = params;
    return this.prisma.entity.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: { deleted: false }
    });
  }
}
```

## API Route Template

```typescript
export async function GET(request: NextRequest) {
  try {
    const useCase = new ListUseCase(repository);
    const { data, count } = await useCase.execute(params);
    const response = new DefaultResponse(data, "Success", page, pageSize, count);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Error handling using ServerError/ErrorResponse
  }
}
```
