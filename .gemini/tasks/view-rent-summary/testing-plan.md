# Plano de Testes: Resumo Rápido do Aluguel

## 1. Testes Funcionais (Casos de Uso)

### Cenário de Sucesso 1: Abertura e Visualização Básica
- **Passo 1:** Entrar na rota `/rents` onde os aluguéis são listados.
- **Passo 2:** Clicar na nova ação "Ver Resumo" no menu de ações de um aluguel existente.
- **Resultado Esperado:** Um Modal é aberto sem redirecionar a página. A interface apresenta de forma legível: Nome do Cliente, Endereço, Telefone, e a tag correta (`SCHEDULED` ou `FINISHED`).

### Cenário de Sucesso 2: Validação de Produtos e Medidas
- **Passo 1:** Selecionar um aluguel que contenha multiplos produtos, de diferentes categorias.
- **Passo 2:** Abrir o "Ver Resumo".
- **Resultado Esperado:** O resumo deve iterar corretamente sob os produtos. Identificando cada um (referência/nome) e mostrando as medidas customizadas preenchidas na hora daquele exato aluguel (ex: busto "95cm", cintura "70cm").

### Cenário de Sucesso 3: Consolidado Financeiro
- **Passo 1:** Selecionar um aluguel que possua Desconto e Sinal (Adiantamento) aplicados.
- **Passo 2:** Abrir o "Ver Resumo".
- **Resultado Esperado:** Os blocos financeiros devem discriminar perfeitamente Subtotal, Descontos descriminados (em formatacao correta, Ex: "R$ 50" ou "10%"), Sinal descontado, e o Total efetivo cobrado do cliente.

---

## 2. Testes de Casos Limites / Falhas

### Cenário Edge 1: Dados nulos ou incompletos
- **Situação:** Ao abrir um aluguel em que o cliente talvez não tenha telefone preenchido, ou que as peças alugadas (ex: uma gravata) não tenham medidas gravadas.
- **Resultado Esperado:** O sistema não deve exibir "undefined" nem quebrar ou renderizar labels sem dados. O sistema deve esconder amigavelmente os campos não preenchidos ou exibir valor como "N/A" (Não se aplica).

---

## 3. Dados de Mock / Testes no Ambiente (Faker)

Caso precise rodar localmente antes de usar os registros do banco de dados completo:
- Usar _Mocks_ nos stories ou injetar JSON falso no `RentSummaryDetails.tsx` com variações completas de `rent_products` (e todos seus detalhes internos via `Rent.ts` / DTO) para garantir que a tipagem não emite avisos no log de compilação ou React DevTools. Todos os mocks não podem conter `any`!
