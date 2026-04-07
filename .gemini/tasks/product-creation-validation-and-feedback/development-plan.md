# Plano de Desenvolvimento: Validação e Feedback na Criação de Produtos

**Estimativa de Esforço**: **3 Story Points**

## Requisitos
### Requisitos funcionais
- **RF01**: Validar os dados de entrada para criação de produtos na camada de Aplicação utilizando Zod.
- **RF02**: O campo de identificação (ex: `reference` ou `description`, conforme contexto) deve possuir no mínimo 2 caracteres após remoção de espaços (trim).
- **RF03**: Exibir notificação de sucesso através do componente `Toaster.tsx` após a criação bem-sucedida do produto.
- **RF04**: Exibir notificação de erro através do componente `Toaster.tsx` em caso de falha no servidor ou erro de validação.
- **RF05**: Gerenciar o estado de carregamento do botão de ação ("Loading"), garantindo que ele retorne ao estado "Ativo" após o processamento (sucesso ou erro).

### Requisitos não funcionais
- **RN01**: Seguir os padrões de Clean Architecture (DTOs na camada Application).
- **RN02**: Manter a consistência visual com os outros componentes do sistema (Chakra UI v3).

## Análise Técnica
O projeto possui o `CreateProductUseCase` que atualmente não realiza validações de negócio/formato na camada de aplicação. Além disso, o modal de criação no frontend (`AddProductModal.tsx`) já possui uma implementação parcial de feedback que deve ser revisada e garantida para atender aos requisitos de UX e tratamento de erros.

## Plano de Execução

### Backend / Application
#### [CreateProductDTO]
Criar um novo arquivo DTO com o schema Zod para validação da entrada do produto. O schema deve garantir a regra de 2 caracteres mínimos após trim.
**Arquivos a serem alterados:**
- `src/core/application/dtos/CreateProductDTO.ts` (Novo)

#### [CreateProductUseCase]
Atualizar o caso de uso para utilizar o novo DTO e realizar a validação `.parse()` ou `.safeParse()` antes de chamar o repositório.
**Arquivos a serem alterados:**
- `src/core/application/cases/product/CreateProductUseCase.ts`

#### [API Route Handler]
Garantir que a rota de API (`/api/products`) trate erros de validação (ZodError) e retorne os detalhes corretos para o frontend.
**Arquivos a serem alterados:**
- `src/app/api/products/route.ts`

### Frontend
#### [AddProductModal]
Garantir que o estado `isLoading` controle corretamente a propriedade `loading` (ou `disabled` e conteúdo do Spinner) do `PrimaryButton`. Revisar as chamadas do `toaster.create` para assegurar que as mensagens de sucesso e erro sejam exibidas corretamente, conforme as respostas da API.
**Arquivos a serem alterados:**
- `src/components/molecules/AddProductModal.tsx`

## Definição de Pronto (DoD)
- [ ] Zod Schema implementado com `min(2)` e `trim()`.
- [ ] Testes unitários para o schema injetando `""`, `"A"`, `" A "`, `"AB"`.
- [ ] Notificações Toast funcionando para sucesso e erro.
- [ ] Botão de salvar gerencia o estado de loading corretamente.
- [ ] Nenhuma regressão nas funcionalidades existentes de criação de produto.
