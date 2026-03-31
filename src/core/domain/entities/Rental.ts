// src/core/domain/entities/Rental.ts
import { addDays } from 'date-fns';

export class Rental {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly status: 'ACTIVE' | 'CANCELED' | 'RETURNED',
    public readonly realReturnDate?: Date | null
  ) {}

  // REGRA DE NEGÓCIO PURA:
  // Verifica se este aluguel conflita com um período desejado,
  // considerando os dias de limpeza (buffer) do produto.
  public conflictsWith(
    targetStart: Date, 
    targetEnd: Date, 
    bufferDays: number
  ): boolean {
    if (this.status === 'CANCELED') return false;

    // A data que o produto fica realmente livre é:
    // (Data de Devolução Real se disponível, senão Planejada) + Dias de Limpeza
    const baseReturnDate = this.realReturnDate || this.endDate;
    const busyUntil = addDays(baseReturnDate, bufferDays);

    // Verifica sobreposição de datas (inclusive)
    // (Se o início desejado é antes ou no dia do fim ocupado E o fim desejado é depois ou no dia do início ocupado)
    return (
      targetStart <= busyUntil && 
      targetEnd >= this.startDate
    );
  }
}
