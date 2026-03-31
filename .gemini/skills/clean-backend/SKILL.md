---
name: clean-backend
description: Especialista em Clean Architecture e Prisma no Node.js. Use para criar Use Cases, Repositórios, DTOs e rotas de API seguindo os padrões de camadas do projeto.
---

# Clean Backend Skill

Focado na manutenção e expansão da lógica de negócio e infraestrutura de dados seguindo os princípios de Clean Architecture.

## Strict Rules

1.  **Separation of Concerns**:
    - **API Routes**: Somente orquestração. Não devem conter lógica de negócio.
    - **Use Cases**: Onde a lógica de negócio reside. Dependem apenas de interfaces de repositório.
    - **Repositories**: Único lugar onde o PrismaClient é acessado.
2.  **Repository Inversion**: Use Cases devem receber instâncias de repositório via construtor (Dependency Injection).
3.  **Soft Deletes**: Sempre verifique o campo `deleted: false` em consultas Prisma.
4.  **Error Handling**: Utilize `ServerError` e `ErrorResponse` em rotas de API para padronização.
5.  **Response Format**: Todas as respostas de API devem ser envelopadas na classe `DefaultResponse`.
6.  **Pagination**: Consultas de listagem devem obrigatoriamente suportar paginação (`page`, `pageSize`).
8.  **Pair Programming**: Execute o desenvolvimento de cada ponto por vez, solicitando revisão após cada etapa para garantir qualidade e aderência às regras.

## Workflow

1.  **Define Domain**: Se necessário, atualize o `prisma.schema` e rode migrações.
2.  **Update Interface**: Defina novos métodos no `I...Repository.ts` da camada de domínio.
3.  **Implement Persistence**: Implemente o método no repositório Prisma correspondente.
4.  **Create Use Case**: Implemente a lógica de negócio na camada de aplicação.
5.  **Register Repository**: Garanta que o novo repositório está exportado em `repositoriesFactory.ts`.
6.  **Expose API**: Crie ou atualize a rota na camada de apresentação (`src/app/api/`).

## References

- [Architecture Overview](references/architecture.md): Descrição detalhada das camadas.
- [Code Patterns](references/patterns.md): Templates para Use Cases, Repositórios e API Routes.
