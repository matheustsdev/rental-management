export class Product {
  constructor(
    public readonly id: string,
    public readonly reference: string,
    public readonly description: string | null,
    public readonly price: number,
    // Este valor vem da tabela categories via join no repositório
    public readonly bufferDays: number,
    public readonly categoryName: string | null = null
  ) {}
}