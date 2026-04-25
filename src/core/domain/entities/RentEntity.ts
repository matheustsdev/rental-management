import { ERentStatus, discount_type_enum as DiscountType } from "@prisma/client";
import { RentProduct } from "./RentProduct";
import { isBefore, addDays, isAfter, differenceInDays } from "date-fns";
import { ServerError } from "@/utils/models/ServerError";
import { RentType } from "@/types/entities/RentType";
import { getDateFromUtcDate } from "@/utils/getDateFromUtcDate";

export interface RentProps {
  id: string;
  code?: number | null;
  status: ERentStatus;
  rentDate: Date;
  returnDate: Date;
  clientName: string;
  address: string | null;
  phone: string | null;
  discountType: DiscountType | null;
  discountValue: number;
  signalValue: number;
  internalObservations?: string | null;
  receiptObservations?: string | null;
  items: RentProduct[];
  createdAt: Date | null;
  realReturnDate?: Date | null;
}

export class RentEntity {
  private props: RentProps;

  constructor(rent: RentType) {
    const rentPayload: RentProps = {
      id: rent.id,
      code: Number(rent.code),
      status: rent.status,
      rentDate: getDateFromUtcDate(rent.rent_date)!,
      returnDate: getDateFromUtcDate(rent.return_date)!,
      clientName: rent.client_name,
      address: rent.address,
      phone: rent.phone,
      discountType: rent.discount_type,
      discountValue: Number(rent.discount_value ?? 0),
      signalValue: Number(rent.signal_value),
      internalObservations: rent.internal_observations,
      receiptObservations: rent.receipt_observations,
      items: rent.rent_products.map(
        (rp) =>
          new RentProduct({
            id: rp.id,
            productId: rp.product_id,
            productPrice: Number(rp.product_price),
            productDescription: rp.product_description ?? "",
            measureType: rp.measure_type,
            bust: rp.bust ? Number(rp.bust) : null,
            waist: rp.waist ? Number(rp.waist) : null,
            hip: rp.hip ? Number(rp.hip) : null,
            shoulder: rp.shoulder ? Number(rp.shoulder) : null,
            sleeve: rp.sleeve ? Number(rp.sleeve) : null,
            height: rp.height ? Number(rp.height) : null,
            back: rp.back ? Number(rp.back) : null,
            realReturnDate: getDateFromUtcDate(rp.real_return_date),
            realReturnBufferDays: rp.real_return_buffer_days,
            product: rp.products ? {
              reference: rp.products.reference,
              categories: rp.products.categories ? {
                name: rp.products.categories.name
              } : null
            } : null
          }),
      ),
      createdAt: rent.created_at,
      realReturnDate: getDateFromUtcDate(rent.real_return_date),
    };

    this.props = rentPayload;

    this.validateDates(this.props.rentDate, this.props.returnDate);
  }

  // Getters
  get id(): string { return this.props.id; }
  get code(): number | null | undefined { return this.props.code; }
  get status(): ERentStatus { return this.props.status; }
  get rentDate(): Date { return this.props.rentDate; }
  get returnDate(): Date { return this.props.returnDate; }
  get clientName(): string { return this.props.clientName; }
  get address(): string | null { return this.props.address; }
  get phone(): string | null { return this.props.phone; }
  get discountType(): DiscountType | null { return this.props.discountType; }
  get discountValue(): number { return this.props.discountValue; }
  get signalValue(): number { return this.props.signalValue; }
  get internalObservations(): string | null | undefined { return this.props.internalObservations; }
  get receiptObservations(): string | null | undefined { return this.props.receiptObservations; }
  get items(): RentProduct[] { return this.props.items; }
  get createdAt(): Date | null { return this.props.createdAt; }
  get realReturnDate(): Date | null | undefined { return this.props.realReturnDate; }

  /**
   * Validates if the return date is after the rent date
   * @param rentDate Start date of the rental
   * @param returnDate Expected return date of the rental
   * @throws ServerError if return date is not after rent date
   */
  private validateDates(rentDate: Date, returnDate: Date): void {
    if (isBefore(returnDate, rentDate) || new Date(returnDate).getTime() === new Date(rentDate).getTime()) {
      throw new ServerError("A data de devolução deve ser posterior à data de aluguel.", 400);
    }
  }

  /**
   * Updates rental dates with validation
   * @param rentDate New rent start date
   * @param returnDate New return date
   * @throws ServerError if rental is already finished
   */
  public updateDates(rentDate: Date, returnDate: Date): void {
    if (this.status === ERentStatus.FINISHED) {
      throw new ServerError("Não é possível alterar as datas de um aluguel já finalizado.", 400);
    }
    this.validateDates(rentDate, returnDate);
    this.props.rentDate = rentDate;
    this.props.returnDate = returnDate;
  }

  /**
   * Calculates the subtotal (sum of all product prices)
   * @returns Total price of items before discounts
   */
  public getSubtotal(): number {
    return this.props.items.reduce((acc, item) => acc + Number(item.productPrice), 0);
  }
  
  /**
   * Calculates the total discount amount based on discount type and value
   * @returns Total discount amount to be subtracted from subtotal
   */
  public getTotalDiscount(): number {
    const subtotal = this.getSubtotal();

    if (!this.props.discountType || this.props.discountValue <= 0) {
      return 0;
    }

    if (this.props.discountType === "PERCENTAGE") {
      return subtotal * (this.props.discountValue / 100);
    }

    if (this.props.discountType === "FIXED") {
      return Math.min(subtotal, this.props.discountValue);
    }

    return 0;
  }

  /**
   * Calculates total value including applicable discounts
   * @returns Final rental value after discounts
   */
  public getTotalValue(): number {
    const subtotal = this.getSubtotal();
    
    if (!this.props.discountType || this.props.discountValue <= 0) {
      return subtotal;
    }

    if (this.props.discountType === "PERCENTAGE") {
      return subtotal * (1 - (this.props.discountValue / 100));
    }

    if (this.props.discountType === "FIXED") {
      return Math.max(0, subtotal - this.props.discountValue);
    }

    return subtotal;
  }

  /**
   * Calculates the remaining balance (Total - Signal/Deposit)
   * @returns Amount still owed by the customer
   */
  public getRemainingValue(): number {
    const total = this.getTotalValue();
    return Math.max(0, total - this.props.signalValue);
  }

  /**
   * Updates rental status following state machine rules
   * @param newStatus The target status to transition to
   * @throws ServerError if the transition is invalid
   */
  public updateStatus(newStatus: ERentStatus): void {
    if (this.props.status === newStatus) return;

    if (this.props.status === ERentStatus.FINISHED) {
      throw new ServerError("Não é possível alterar um aluguel já finalizado.", 400);
    }

    if (this.props.status === ERentStatus.IN_PROGRESS && newStatus === ERentStatus.SCHEDULED) {
      throw new ServerError("Não é possível voltar um aluguel em andamento para agendado.", 400);
    }

    this.props.status = newStatus;
  }

  /**
   * Checks if this rental conflicts with a desired period for a specific product
   * @param targetStart Start date of requested period
   * @param targetEnd End date of requested period
   * @param bufferDays Days needed for cleaning/prep after return
   * @param productId Optional ID to check for a specific product's availability
   * @returns True if there is a scheduling conflict
   */
  public conflictsWith(
    targetStart: Date, 
    targetEnd: Date, 
    bufferDays: number,
    productId?: string
  ): boolean {
    if (productId && !this.props.items.some(item => item.productId === productId)) {
      return false;
    }

    const item = productId ? this.props.items.find(i => i.productId === productId) : null;
    
    const baseReturnDate = item?.realReturnDate || this.props.realReturnDate || this.props.returnDate;
    const itemBuffer = item?.realReturnBufferDays ?? bufferDays;
    
    const busyUntil = addDays(baseReturnDate, itemBuffer);

    return (
      targetStart <= busyUntil && 
      targetEnd >= this.props.rentDate
    );
  }

  /**
   * Checks if the rental is late relative to a reference date (defaults to today)
   * @param referenceDate The date to check against. Defaults to current date.
   * @returns True if referenceDate is after the returnDate
   */
  public isLate(referenceDate: Date = new Date()): boolean {
    return isAfter(referenceDate, this.props.returnDate);
  }

  /**
   * Calculates how many days the rental is late relative to a reference date (defaults to today)
   * @param referenceDate The date to check against. Defaults to current date.
   * @returns Number of days late. Returns 0 if not late.
   */
  public getLateDays(referenceDate: Date = new Date()): number {
    if (!this.isLate(referenceDate)) return 0;
    return differenceInDays(referenceDate, this.props.returnDate);
  }

  /**
   * Converts the entity to a plain JavaScript object (Props)
   * @returns A copy of the internal rental properties
   */
  public toJSON(): RentProps {
    return { ...this.props };
  }
}
