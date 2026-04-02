---
description: Especialista em planejamento de tarefas e arquitetura. Use para analisar novos requisitos e gerar planos detalhados de desenvolvimento, teste e documentação.
---

# Task Planner Skill

Focado em transformar requisitos de negócio (vagos ou detalhados) em planos de execução técnica e documentação seguindo os padrões do projeto.

## Strict Rules

1.  **Artifact Location**: Todos os planos DEVEM ser salvos na pasta `.gemini/tasks/[task_name]/`.
2.  **Required Files**: Toda tarefa planejada deve gerar obrigatoriamente:
    - `development-plan.md`: Requisitos, aspectos técnicos e arquiteturais.
    - `testing-plan.md`: Cenários de teste e dados de mock.
    - `user-documentation.md`: Regras de negócio e guia para o cliente final.
3.  **Clean Architecture Alignment**: O plano de desenvolvimento deve detalhar mudanças em todas as camadas (Domain, Application, Infrastructure, Presentation).
4.  **No Code Implementation**: Esta skill é apenas para PLANEJAMENTO. Não escreva o código da funcionalidade, apenas o plano de como ele deve ser escrito.
5.  **Strict Stack Separation**: O planejamento de desenvolvimento DEVE ser estritamente separado entre Frontend e Backend.
6.  **Explicit File Targeting**: Cada subtarefa planejada deve listar de forma clara, exaustiva e extremamente detalhada os caminhos dos arquivos que serão criados ou modificados.
7.  **Requirements Definitions**: O plano deve obrigatoriamente iniciar com a listagem clara dos Requisitos Funcionais e Não Funcionais.

## Workflow

1.  **Requirement Analysis**: Entenda o que o usuário quer. Extraia e defina os Requisitos Funcionais (RF) e Não Funcionais (RNF). Pergunte se houver ambiguidade.
2.  **Define Task Name**: Normalize o nome da tarefa para kebab-case (ex: `add-product-category`).
3.  **Generate Development Plan**: Use a formatação exigida em `Development Plan Format` e o template em `references/templates.md` para descrever o impacto técnico, separando Frontend e Backend e mapeando os arquivos exatos.
4.  **Generate Testing Plan**: Liste cenários de sucesso, falha e dados randômicos necessários.
5.  **Generate User Docs**: Escreva as regras de negócio em linguagem clara para o cliente final.
6.  **File Creation**: Use `write_file` para salvar os 3 arquivos na pasta correta.

## Development Plan Format

Ao gerar o `development-plan.md`, você deve OBRIGATORIAMENTE seguir esta estrutura de formatação para garantir o nível de detalhes esperado:

### 1. Requisitos
Sempre inicie detalhando os requisitos levantados no seguinte formato:

```md
## Requisitos funcionais
- **RF01**: Descrição 1
- **RF02**: Descrição 2

## Requisitos não funcionais
- **RN01**: Descrição 1
- **RN02**: Descrição 2
```
### 2. Planejamento Técnico (Frontend / Backend)
A divisão técnica deve ser extremamente minuciosa, apontando o que fazer e onde fazer. Use exatamente este formato:

```md
## Frontend
### [Nome da Subtarefa - ex: Adicionar campo de telefone na tabela]
Adicione na tabela contida no componente `src/components/RentTable/index.tsx` a informação contida na propriedade *phone* da entidade Rent.

**Arquivos a serem alterados:**
- `src/components/RentTable/index.tsx`
- `src/components/RentTable/styles.module.css`

### [Outra Subtarefa Frontend]
...

## Backend
### [Nome da Subtarefa - ex: Atualizar schema e criar migration]
Atualizar o schema do banco de dados para incluir o novo campo e gerar a migration correspondente.

**Arquivos a serem alterados:**
- `prisma/schema.prisma`

### [Nome da Subtarefa - ex: Atualizar caso de uso]
Garantir que o caso de uso de criação receba e persista o novo dado, passando por todas as camadas da Clean Architecture.

**Arquivos a serem alterados:**
- `src/domain/entities/Rent.ts`
- `src/application/use-cases/CreateRent.ts`
- `src/infrastructure/repositories/PrismaRentRepository.ts`
```

## References

- [Planning Templates](references/templates.md): Estrutura obrigatória para cada um dos 3 arquivos de plano.