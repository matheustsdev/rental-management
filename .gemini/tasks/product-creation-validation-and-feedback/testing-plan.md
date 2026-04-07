# Plano de Testes: Validação e Feedback na Criação de Produtos

## Escopo
Este plano de testes cobre a validação do schema Zod na camada de aplicação e o comportamento esperado da UI durante o fluxo de criação de produtos.

## Cenários de Teste

### 1. Testes Unitários de Schema (Application Layer)
Validar se o schema Zod do `CreateProductDTO` aceita ou rejeita as entradas conforme as regras de negócio.
- **Entrada `""`**: Deve falhar (string vazia).
- **Entrada `"A"`**: Deve falhar (apenas 1 caractere).
- **Entrada `" A "`**: Deve falhar (apenas 1 caractere após trim).
- **Entrada `"AB"`**: Deve ter sucesso (2 caracteres mínimos).

### 2. Testes de Caso de Uso (Application Layer)
- **Sucesso**: O Use Case deve aceitar dados válidos e chamar o método `create` do repositório.
- **Falha**: O Use Case deve lançar erro ao receber dados inválidos, sem interagir com o repositório.

### 3. Testes de Integração (API/UI Feedback - Manual ou E2E)
- **Feedback de Sucesso**: Ao salvar com dados válidos, o sistema deve mostrar um Toast de sucesso e fechar o modal (ou limpar se estiver em modo contínuo).
- **Feedback de Erro**: Ao simular erro de servidor (500) ou validação, o sistema deve mostrar um Toast de erro e o botão de salvar deve voltar a ficar ativo.
- **Loading State**: O botão de salvar deve mostrar um Spinner e ficar desabilitado enquanto a requisição estiver pendente.

## Ferramentas
- **Jest**: Runner principal de testes unitários.
- **React Testing Library**: Para testes de componente (se aplicável).
- **Mock-Proxy / MSW**: Para simular comportamentos de API e repositório.
