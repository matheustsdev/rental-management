# Plano de Testes - Impressão de Recibos e Relatórios

## Cenários de Teste

### 1. Impressão de Recibo (Listagem de Aluguéis)
- **Ação**: Clicar no menu de ações de um aluguel e selecionar "Emitir recibo".
- **Comportamento Esperado**:
    - O ícone de carregamento deve aparecer no item do menu enquanto o PDF é gerado.
    - Após a geração, a janela de impressão do navegador deve abrir automaticamente.
    - O sistema NÃO deve iniciar o download automático do arquivo `.pdf`.
- **Critério de Sucesso**: Janela de impressão aberta com o conteúdo correto do recibo.

### 2. Impressão de Relatório por Período
- **Ação**: Na tela de relatórios, selecionar um período válido e clicar em "Gerar PDF".
- **Comportamento Esperado**:
    - O botão deve mostrar estado de carregamento.
    - Após a busca dos dados e geração do PDF, a janela de impressão do navegador deve abrir.
    - O sistema NÃO deve iniciar o download automático do arquivo `.pdf`.
- **Critério de Sucesso**: Janela de impressão aberta com o relatório contendo os aluguéis do período selecionado.

### 3. Cancelamento da Impressão
- **Ação**: Abrir a janela de impressão e clicar em "Cancelar" ou fechar a janela.
- **Comportamento Esperado**:
    - O sistema deve retornar ao estado normal.
    - Não deve haver erros no console.
    - O usuário deve ser capaz de solicitar a impressão novamente sem recarregar a página.

### 4. Opção "Salvar como PDF"
- **Ação**: Na janela de impressão do navegador, selecionar o destino como "Salvar como PDF".
- **Comportamento Esperado**:
    - O navegador deve permitir salvar o arquivo localmente através de sua interface padrão.

## Casos de Falha e Exceção
- **Erro na geração do PDF**: Se houver um erro no `@react-pdf/renderer`, o sistema deve exibir um `toaster` de erro (comportamento já existente que deve ser mantido).
- **Pop-ups Bloqueados**: Embora o uso de `iframe` oculte a necessidade de novas abas, alguns navegadores podem restringir ações de script. Verificar se o diálogo de impressão é disparado corretamente.

## Critérios de Aceite
- [ ] Janela de impressão abre para recibos.
- [ ] Janela de impressão abre para relatórios.
- [ ] Download automático removido de ambas as telas.
- [ ] Código de impressão centralizado em `src/utils/printPdf.ts`.
