import { MeasureType } from "@/constants/EMeasureType";

export interface RentProductProps {
  id: string;
  productId: string;
  productPrice: number;
  productDescription: string;
  measureType: MeasureType;
  bust: number | null;
  waist: number | null;
  hip: number | null;
  shoulder: number | null;
  sleeve: number | null;
  height: number | null;
  back: number | null;
  realReturnDate?: Date | null;
  realReturnBufferDays?: number | null;
  product?: {
    reference: string;
    categories?: {
      name: string;
    } | null;
  } | null;
}

export class RentProduct {
  constructor(private readonly props: RentProductProps) {}

  get id(): string { return this.props.id; }
  get productId(): string { return this.props.productId; }
  get productPrice(): number { return this.props.productPrice; }
  get productDescription(): string { return this.props.productDescription; }
  get measureType(): MeasureType { return this.props.measureType; }
  get bust(): number | null { return this.props.bust; }
  get waist(): number | null { return this.props.waist; }
  get hip(): number | null { return this.props.hip; }
  get shoulder(): number | null { return this.props.shoulder; }
  get sleeve(): number | null { return this.props.sleeve; }
  get height(): number | null { return this.props.height; }
  get back(): number | null { return this.props.back; }
  get realReturnDate(): Date | null | undefined { return this.props.realReturnDate; }
  get realReturnBufferDays(): number | null | undefined { return this.props.realReturnBufferDays; }
  get product(): RentProductProps["product"] { return this.props.product; }

  /**
   * Retorna um objeto com todas as propriedades para persistência ou transferência
   */
  public toJSON(): RentProductProps {
    return { ...this.props };
  }
}
