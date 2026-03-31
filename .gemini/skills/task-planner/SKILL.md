---
name: task-planner
description: Especialista em planejamento de tarefas e arquitetura. Use para analisar novos requisitos e gerar planos detalhados de desenvolvimento, teste e documentação.
---

# Task Planner Skill

Focado em transformar requisitos de negócio (vagos ou detalhados) em planos de execução técnica e documentação seguindo os padrões do projeto.

## Strict Rules

1.  **Artifact Location**: Todos os planos DEVEM ser salvos na pasta `.gemini/tasks/[task_name]/`.
2.  **Required Files**: Toda tarefa planejada deve gerar obrigatoriamente:
    - `development-plan.md`: Aspectos técnicos e arquiteturais.
    - `testing-plan.md`: Cenários de teste e dados de mock.
    - `user-documentation.md`: Regras de negócio e guia para o cliente final.
3.  **Clean Architecture Alignment**: O plano de desenvolvimento deve detalhar mudanças em todas as camadas (Domain, Application, Infrastructure, Presentation).
4.  **No Code Implementation**: Esta skill é apenas para PLANEJAMENTO. Não escreva o código da funcionalidade, apenas o plano de como ele deve ser escrito.

## Workflow

1.  **Requirement Analysis**: Entenda o que o usuário quer. Pergunte se houver ambiguidade.
2.  **Define Task Name**: Normalize o nome da tarefa para kebab-case (ex: `add-product-category`).
3.  **Generate Development Plan**: Use o template em `references/templates.md` para descrever o impacto técnico.
4.  **Generate Testing Plan**: Liste cenários de sucesso, falha e dados randômicos necessários.
5.  **Generate User Docs**: Escreva as regras de negócio em linguagem clara para o cliente final.
6.  **File Creation**: Use `write_file` para salvar os 3 arquivos na pasta correta.

## References

- [Planning Templates](references/templates.md): Estrutura obrigatória para cada um dos 3 arquivos de plano.
