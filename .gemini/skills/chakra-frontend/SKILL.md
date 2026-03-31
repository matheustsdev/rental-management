---
name: chakra-frontend
description: Especialista em frontend utilizando React 19, Next.js 15, Chakra UI v3 e Atomic Design. Use para criar componentes, formulários com React Hook Form e páginas com busca/paginação.
---

# Chakra Frontend Skill

Focado na construção de interfaces modernas, acessíveis e responsivas seguindo os padrões visuais e estruturais do projeto.

## Strict Rules

1.  **Atomic Design Compliance**:
    - **Atoms**: Somente elementos base (`src/components/atoms/`).
    - **Molecules**: Combinações de átomos (`src/components/molecules/`).
    - **Organisms**: Seções complexas ou modais de formulário (`src/components/organisms/`).
2.  **Chakra UI v3 Syntax**: Utilize a API mais recente (ex: `Card.Root`, `Card.Header` em vez de componentes depreciados).
3.  **React Hook Form + Zod**: Obrigatório para todos os formulários. Utilize `zodResolver` para validação tipada.
4.  **Component Props**: Todos os componentes devem ter interfaces de Props explícitas.
5.  **Responsive Design**: Use `useDevice` hook ou media queries do Chakra para garantir suporte a Mobile e Desktop.
6.  **Loading & Feedback**: Sempre mostre `Spinner` durante requisições e utilize `toaster` para mensagens de sucesso/erro.
7.  **Service Usage**: Utilize o serviço `api` (`src/services/api.ts`) para todas as chamadas HTTP.

## Workflow

1.  **Identify Component Level**: Determine se é um Atom, Molecule ou Organism.
2.  **Define Props**: Crie a interface de props com tipagem estrita.
3.  **Style with Chakra**: Use as props de estilo do Chakra (`p`, `bg`, `flexDir`, etc.) e cores do tema (ex: `primary.500`, `terracotta.50`).
4.  **Handle State**: Utilize `useForm` para inputs e `useState` para controle de UI (modais, loaders).
5.  **Add to Page**: Integre o componente na página correspondente, utilizando `PageContainer`.

## References

- [Architecture Overview](references/architecture.md): Guia sobre Atomic Design.
- [Frontend Patterns](references/patterns.md): Templates para componentes, formulários e busca.
