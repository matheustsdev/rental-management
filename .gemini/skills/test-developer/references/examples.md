# Test Implementation Examples

## Mocking with `jest-mock-extended`

```typescript
import { mock } from 'jest-mock-extended';
import { MyRepository } from '@/core/domain/repositories/MyRepository';

const repositoryMock = mock<MyRepository>();
repositoryMock.save.mockResolvedValue(mockedEntity);
```

## Using Faker v10+

```typescript
import { faker } from '@faker-js/faker';

const rentDate = faker.date.future();
const returnDate = faker.date.soon({ days: 7, refDate: rentDate });
const clientName = faker.person.fullName();
```

## Example Prompt Reference
"Crie um teste unitário para o Use Case de Criação de Aluguel. O repositório deve ser mockado. Certifique-se de validar que um erro é lançado se o usuário já tiver um aluguel ativo."
