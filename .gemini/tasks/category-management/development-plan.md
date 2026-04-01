# Plano de Desenvolvimento: Gestão de Categorias

**Objetivo**: Implementar um sistema completo de gestão para categorias de produtos, permitindo o cadastro e atualização de nomes, dias de buffer e tipos de medida, garantindo a lógica de negócio correta para a disponibilidade dos produtos.

## Requisitos
### Requisitos funcionais
- **RF01**: Permitir o cadastro de novas categorias com Nome, Dias de Buffer e Tipo de Medida.
- **RF02**: Suportar os tipos de medida: `SUITS`, `DRESS` e `NONE` (conforme especificação; na prática, podem ser mapeados para `SUIT`, `DRESS`, `NONE`).
- **RF03**: Garantir que `post_return_buffer_days` seja um número inteiro >= 0.
- **RF04**: Permitir a atualização do nome e dias de buffer de categorias existentes.
- **RF05**: Impedir o cadastro de categorias com nomes já existentes no sistema.
- **RF06**: Listar todas as categorias em uma tabela (`DataTable.tsx`) com colunas "Nome", "Dias de Buffer" e "Tipo de Medida".
- **RF07**: Exibir alertas ao alterar o tipo de medida de uma categoria que possua produtos vinculados.

### Requisitos não funcionais
- **RN01**: Seguir rigorosamente os padrões de Clean Architecture do projeto (Domain, Application, Infrastructure, Presentation).
- **RN02**: Persistência utilizando Prisma ORM com PostgreSQL.
- **RN03**: Validação rigorosa dos dados via API utilizando Zod.
- **RN04**: Interface responsiva e acessível utilizando Chakra UI e React Hook Form.

## Impacto na Arquitetura
### Domain (Domínio)
- **CategoryType.ts**: Atualização da entidade para incluir `measure_type` e `post_return_buffer_days`.
- **ICategoryRepository.ts**: Definição da interface do repositório.
### Application (Aplicação)
- **CreateCategoryUseCase.ts**: Lógica de verificação de duplicados e criação.
- **UpdateCategoryUseCase.ts**: Lógica de verificação de existência e atualização.
- **CategoryDTOs**: Estrutura de entrada para criação e atualização.
### Infrastructure (Infraestrutura)
- **PrismaCategoryRepository.ts**: Implementação utilizando Prisma.
### UI (Interface)
- **CategoryModal.tsx**: Formulário dinâmico para criação/edição.
- **categories/page.tsx**: Tela de gestão.

## Alterações no Banco de Dados
- **prisma/schema.prisma**: Adicionar o valor `NONE` ao enum `measures_type` e `EMeasuresType`.
- Sincronizar os nomes se necessário (o esquema atual usa `SUIT` e `DRESS`, a especificação pede `SUITS`, recomenda-se manter coerência com o esquema ou aplicar um mapeamento no DTO).

## Passos de Implementação

### Frontend
1. **[CreateCategoryModal]**: Implementar o componente `CategoryModal.tsx` como um `Organism`. Deve receber dados iniciais para edição ou estar vazio para criação. Usar `React Hook Form` e validação Zod.
   **Arquivos a serem alterados:**
   - `src/components/organisms/CategoryModal.tsx`
2. **[CategoriesPage]**: Criar a página `/categories` (`src/app/categories/page.tsx`) utilizando o componente `DataTable.tsx` para listar as categorias e permitir abrir o modelo.
   **Arquivos a serem alterados:**
   - `src/app/categories/page.tsx`
3. **[NavbarLink]**: Adicionar o link para a página de categorias no menu de navegação.
   **Arquivos a serem alterados:**
   - `src/components/organisms/Navbar.tsx` (ou arquivo de navegação correspondente)

### Backend
1. **[UpdateSchema]**: Atualizar o schema Prisma para incluir o tipo `NONE` nos enums de medida. Gerar cliente Prisma.
   **Arquivos a serem alterados:**
   - `prisma/schema.prisma`
2. **[UpdateEntity]**: Atualizar a tipagem da entidade Category.
   **Arquivos a serem alterados:**
   - `src/types/entities/CategoryType.ts`
3. **[RepositoryInterface]**: Definir a interface `ICategoryRepository` com os métodos CRUD necessários.
   **Arquivos a serem alterados:**
   - `src/core/domain/repositories/ICategoryRepository.ts`
4. **[CreateDTOs]**: Definir os DTOs de entrada para as ações de categoria.
   **Arquivos a serem alterados:**
   - `src/core/application/dtos/CreateCategoryDTO.ts`
   - `src/core/application/dtos/UpdateCategoryDTO.ts`
5. **[ImplementUseCases]**: Criar os casos de uso para criação e atualização, aplicando regras de negócio (como não duplicidade de nome).
   **Arquivos a serem alterados:**
   - `src/core/application/use-cases/CreateCategoryUseCase.ts`
   - `src/core/application/use-cases/UpdateCategoryUseCase.ts`
6. **[ImplementRepository]**: Implementar as operações do repositório usando o cliente Prisma.
   **Arquivos a serem alterados:**
   - `src/core/infrastructure/database/PrismaCategoryRepository.ts`
7. **[APIEndpoints]**: Definir as rotas de API para lidar com as requisições do frontend.
   **Arquivos a serem alterados:**
   - `src/app/api/categories/route.ts`
   - `src/app/api/categories/[id]/route.ts`
