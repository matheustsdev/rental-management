export type CreateProductDTO = {
    reference: string;
    price: number;
    description: string;
    receiptDescription: string;
    categoryId: string;
}

export type UpdateProductDTO = {
    id: string;
    reference?: string;
    price?: number;
    description?: string;
    receiptDescription?: string;
    categoryId?: string;
}