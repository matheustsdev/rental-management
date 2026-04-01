# [cite_start]Task Planning Templates [cite: 1]

Este arquivo define a estrutura exata e o nível de detalhamento esperado ao gerar os planos de desenvolvimento, testes e documentação de usuário para o projeto.

## [cite_start]1. Development Plan (`development-plan.md`) [cite: 1]
- [cite_start]**Objective**: Detailed technical goal. [cite: 1]
- **Requirements**: Listagem rigorosa do escopo da tarefa:
  - **Requisitos funcionais**: Ex: "RF01 - Permitir busca de dados com suporte a pesquisa insensível a acentos (accent-insensitive)".
  - **Requisitos não funcionais**: Ex: "RN01 - A interface de relatórios deve seguir a abordagem mobile-first".
- [cite_start]**Architecture Impact**: Layers (Domain, App, Infra, UI) and files affected. [cite: 2]
- [cite_start]**Database Changes**: Prisma schema updates or migrations needed. [cite: 2]
- [cite_start]**Implementation Steps**: Numbered sequence of technical tasks. [cite: 3] Esta seção DEVE ser dividida da seguinte maneira:
  - **Frontend**: Passos focados na interface (componentes React/Next.js, páginas, hooks, tipagens). Em cada passo de implementação, inclua obrigatoriamente a tag **"Arquivos a serem alterados:"** com os caminhos exatos.
  - **Backend**: Passos focados no servidor (entidades de domínio, casos de uso, repositórios Prisma, controllers). Em cada passo, inclua obrigatoriamente a tag **"Arquivos a serem alterados:"** com os caminhos exatos.

## [cite_start]2. Testing Plan (`testing-plan.md`) [cite: 3]
- [cite_start]**Unit Tests**: Mocks needed for repositories and services. [cite: 4]
- [cite_start]**Faker Scenarios**: Data sets to generate (Ex: "Overdue rental", "Invalid measurements"). [cite: 4]
- [cite_start]**Success Criteria**: What must happen for the feature to be "done". [cite: 5]
- [cite_start]**Failure Cases**: Edge cases (Ex: "Out of stock", "Invalid dates"). [cite: 6]

## [cite_start]3. User Documentation (`user-documentation.md`) [cite: 7]
- [cite_start]**Feature Overview**: Simple explanation of what this adds for the user. [cite: 8]
- [cite_start]**Business Rules**: Constraints (Ex: "Only dresses can have height measurements"). [cite: 8]
- [cite_start]**User Guide**: Step-by-step instructions with expected UI behavior. [cite: 8]
- [cite_start]**Warnings**: Important details the user needs to know. [cite: 9]