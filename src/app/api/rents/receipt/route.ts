import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { format, parse } from 'date-fns';
import { RentType } from '@/types/entities/RentType';

async function generatePdf(data: RentType) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Defina explicitamente o tamanho da página

    // Carregue uma fonte padrão
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Definir configurações de página
    page.setFont(font);
    page.setFontSize(12);

    // Adicionar mais detalhes ao PDF
    page.drawText('Recibo de Aluguel', {
        x: 50,
        y: 750,
        size: 20,
        font: font,
        color: rgb(0, 0, 0),
    });

    // Adicionar mais informações detalhadas
    page.drawText(`Cliente: ${data.client_name || 'Nome não informado'}`, { 
        x: 50, 
        y: 700, 
        size: 12, 
        font: font, 
        color: rgb(0, 0, 0) 
    });

    // Formatar data com tratamento de erro
    let formattedDate = 'Data não disponível';
    try {
        formattedDate = data.rent_date 
            ? format(parse(data.rent_date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') 
            : 'Data não informada';
    } catch (error) {
        console.error('Erro ao formatar data:', error);
    }

    page.drawText(`Data do Aluguel: ${formattedDate}`, { 
        x: 50, 
        y: 680, 
        size: 12, 
        font: font, 
        color: rgb(0, 0, 0) 
    });

    // Adicionar valor total
    page.drawText(`Valor Total: R$ ${data.total_value?.toFixed(2) || 'Não informado'}`, { 
        x: 50, 
        y: 660, 
        size: 12, 
        font: font, 
        color: rgb(0, 0, 0) 
    }); 
    
    // Adicionar produtos alugados
    if (data.rent_products && data.rent_products.length > 0) {
        page.drawText('Produtos Alugados:', { 
            x: 50, 
            y: 640, 
            size: 14, 
            font: font, 
            color: rgb(0, 0, 0) 
        });

        data.rent_products.forEach((product, index) => {
            page.drawText(
                `${index + 1}. ${product.product_description} - R$ ${product.product_price?.toFixed(2)}`, 
                { 
                    x: 70, 
                    y: 620 - (index * 20), 
                    size: 12, 
                    font: font, 
                    color: rgb(0, 0, 0) 
                }
            );
        });
    }

    return pdfDoc.save();
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as RentType
    const pdfBytes = await generatePdf(data)           // Uint8Array
    const buffer = Buffer.from(pdfBytes);                // ArrayBuffer

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="recibo.pdf"',
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro ao gerar recibo' }, { status: 500 })
  }
}
