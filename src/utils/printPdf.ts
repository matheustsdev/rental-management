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
      // Nota: Remover imediatamente pode cancelar o processo de impressão em alguns browsers
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };
};
