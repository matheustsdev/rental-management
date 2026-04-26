# Plano de Desenvolvimento - Exibir Janela de Impressão para Recibos e Relatórios

## Objetivo
Substituir o download automático de PDFs por uma janela de impressão do navegador, permitindo que o usuário imprima diretamente ou salve como PDF conforme sua preferência.

## Requisitos

### Requisitos funcionais
- **RF01**: Ao acionar a emissão de recibo na listagem de aluguéis, o sistema deve abrir a janela de impressão do navegador.
- **RF02**: Ao acionar a geração de relatório por período, o sistema deve abrir a janela de impressão do navegador.
- **RF03**: A janela de impressão deve permitir que o usuário escolha a impressora ou a opção "Salvar como PDF".

### Requisitos não funcionais
- **RN01**: A geração do PDF deve permanecer no lado do cliente (frontend) utilizando `@react-pdf/renderer`.
- **RN02**: A transição entre a geração do PDF e a abertura da janela de impressão deve ser fluida e indicar carregamento quando necessário.
- **RN03**: Centralização da lógica de impressão em um utilitário para facilitar a manutenção.

## Planejamento Técnico (Frontend / Backend)

## Frontend

### Criar Utilitário de Impressão de PDF
Criar uma função utilitária que receba uma URL de Blob (gerada pelo `react-pdf`) e acione a janela de impressão do navegador utilizando um iframe oculto. Esta técnica é a mais compatível para disparar o diálogo de impressão de um PDF gerado dinamicamente sem forçar o download.

#### Arquivos a serem criados:
- `src/utils/printPdf.ts`
    ```typescript
    /**
     * Abre a janela de impressão do navegador para um PDF a partir de uma URL (Blob URL)
     * @param url URL do Blob do PDF
     */
    export const printPdf = (url: string) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = url;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        // Pequeno delay para garantir que o PDF foi carregado no contexto do iframe em alguns navegadores
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          
          // Remove o iframe após a janela de impressão ser fechada (ou após um tempo seguro)
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 500);
      };
    };
    ```

### Atualizar Página de Listagem de Aluguéis
Modificar o comportamento de finalização da geração do PDF para chamar o novo utilitário de impressão em vez de simular um clique em um link de download.

#### Arquivos a serem alterados:
- `src/app/rents/page.tsx`
    ```tsx
    // [Comentário: Renomear downloadRequested para printRequested e usar printPdf no useEffect]
    ```

### Atualizar Página de Relatórios
Modificar o comportamento de geração do relatório por período para seguir o mesmo padrão de impressão.

#### Arquivos a serem alterados:
- `src/app/reports/page.tsx`
    ```tsx
    // [Comentário: Renomear shouldDownload para shouldPrint e usar printPdf no useEffect]
    ```

## Backend
Nenhuma alteração necessária no backend para esta tarefa, pois a lógica de geração e exibição do PDF é estritamente de frontend.
