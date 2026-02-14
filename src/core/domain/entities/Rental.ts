// src/core/domain/entities/Rental.ts
import { addDays } from 'date-fns';

export class Rental {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly status: 'ACTIVE' | 'CANCELED' | 'RETURNED'
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
    // Data de Devolução + Dias de Limpeza
    const busyUntil = addDays(this.endDate, bufferDays);

    // Verifica sobreposição de datas
    // (Se o início desejado é antes do fim ocupado E o fim desejado é depois do início ocupado)
    return (
      targetStart < busyUntil && 
      targetEnd > this.startDate
    );
  }
}
