# Documentação do Usuário - Impressão de Recibos e Relatórios

## Visão Geral
Esta funcionalidade permite que você imprima recibos de aluguel e relatórios de período diretamente do navegador. Em vez de salvar um arquivo no seu computador automaticamente, o sistema agora abre a tela de impressão padrão do seu navegador.

## Como Usar

### Emitir Recibo de Aluguel
1. Vá para a página de **Aluguéis**.
2. Localize o aluguel desejado.
3. Clique no ícone de menu (três pontos ou seta) no cartão do aluguel.
4. Selecione a opção **"Emitir recibo"**.
5. Aguarde alguns instantes enquanto o sistema prepara o documento.
6. A janela de impressão do seu navegador abrirá automaticamente.
7. Você pode escolher sua impressora e clicar em **Imprimir**, ou selecionar **"Salvar como PDF"** na lista de impressoras se desejar guardar o arquivo digitalmente.

### Gerar Relatório por Período
1. Vá para a página de **Relatórios**.
2. No bloco **"Aluguéis por período"**, escolha a **Data Inicial** e a **Data Final**.
3. Clique no botão **"Gerar PDF"**.
4. Após o processamento, a janela de impressão abrirá com o relatório detalhado de todos os aluguéis do período.

## Regras de Negócio
- O sistema não armazena o arquivo PDF permanentemente; ele é gerado na hora com os dados mais recentes do banco de dados.
- Caso você queira apenas o arquivo PDF (sem imprimir em papel), utilize a opção "Salvar como PDF" na própria janela de impressão que se abre.

## Solução de Problemas
- **A janela de impressão não abriu**: Verifique se o seu navegador não bloqueou janelas automáticas (pop-ups). Geralmente aparece um ícone na barra de endereços solicitando permissão.
- **O documento parece incompleto**: Certifique-se de que o aluguel possui todos os dados preenchidos corretamente antes de emitir o recibo.
