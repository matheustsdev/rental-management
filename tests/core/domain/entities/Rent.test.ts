import { RentEntity } from "@/core/domain/entities/RentEntity";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { EDiscountType, ERentStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { addDays, subDays } from "date-fns";
import { ServerError } from "@/utils/models/ServerError";
import { getRandomRent } from "../../../utils/factories";
import { Decimal } from "@prisma/client/runtime/library";

describe("Rent Domain Entity", () => {
  const createMockProduct = (price: number) => {
    return new RentProduct({
      id: faker.string.uuid(),
      productId: faker.string.uuid(),
      productPrice: price,
      productDescription: faker.commerce.productDescription(),
      measureType: "NONE",
      bust: null,
      waist: null,
      hip: null,
      shoulder: null,
      sleeve: null,
      height: null,
      back: null,
    });
  };

  const validProps = () => {
    const rent = getRandomRent();
    const items = [createMockProduct(100), createMockProduct(150)];
    rent.rent_products = items.map(item => {
      const json = item.toJSON();
      return {
        id: json.id,
        rent_id: rent.id,
        product_id: json.productId,
        product_price: new Decimal(json.productPrice),
        product_description: json.productDescription,
        measure_type: json.measureType,
        bust: json.bust !== null ? new Decimal(json.bust) : null,
        waist: json.waist !== null ? new Decimal(json.waist) : null,
        hip: json.hip !== null ? new Decimal(json.hip) : null,
        shoulder: json.shoulder !== null ? new Decimal(json.shoulder) : null,
        sleeve: json.sleeve !== null ? new Decimal(json.sleeve) : null,
        height: json.height !== null ? new Decimal(json.height) : null,
        back: json.back !== null ? new Decimal(json.back) : null,
        real_return_date: json.realReturnDate ?? null,
        real_return_buffer_days: json.realReturnBufferDays ?? null,
      } as any;
    });
    return rent;
  };

  describe("Instanciação e Validação de Datas", () => {
    it("deve criar um aluguel com sucesso quando as datas são válidas", () => {
      const props = validProps();
      const rent = new RentEntity(props);
      expect(rent.id).toBe(props.id);
      expect(Number(rent.code)).toBe(Number(props.code));
      expect(rent.internalObservations).toBe(props.internal_observations);
      expect(rent.receiptObservations).toBe(props.receipt_observations);
    });

    it("deve lançar erro se a data de devolução for anterior à data de aluguel", () => {
      const props = validProps();
      props.return_date = subDays(props.rent_date, 1);
      expect(() => new RentEntity(props)).toThrow(ServerError);
    });

    it("deve lançar erro se a data de devolução for igual à data de aluguel", () => {
      const props = validProps();
      props.return_date = props.rent_date;
      expect(() => new RentEntity(props)).toThrow(ServerError);
    });
  });

  describe("Cálculos Financeiros", () => {
    it("deve calcular o subtotal corretamente", () => {
      const rent = new RentEntity(validProps());
      expect(rent.getSubtotal()).toBe(250);
    });

    it("deve calcular o valor total com desconto fixo", () => {
      const props = validProps();
      props.discount_type = "FIXED";
      props.discount_value = new Decimal(50);
      const rent = new RentEntity(props);
      expect(rent.getTotalValue()).toBe(200);
    });

    it("deve calcular o valor total com desconto percentual", () => {
      const props = validProps();
      props.discount_type = EDiscountType.PERCENTAGE;
      props.discount_value = new Decimal(10);
      const rent = new RentEntity(props);
      expect(rent.getTotalValue()).toBe(225);
    });

    it("deve garantir que o valor total não seja negativo com desconto fixo alto", () => {
      const props = validProps();
      props.discount_type = "FIXED";
      props.discount_value = new Decimal(300);
      const rent = new RentEntity(props);
      expect(rent.getTotalValue()).toBe(0);
    });

    it("deve calcular o valor restante corretamente (Total - Sinal)", () => {
      const props = validProps();
      props.signal_value = new Decimal(50);
      props.discount_value = new Decimal(0); // Reset for predictable subtotal
      const rent = new RentEntity(props);
      expect(rent.getRemainingValue()).toBe(200);
    });
  });

  describe("Máquina de Estados (Status)", () => {
    it("deve permitir transição de SCHEDULED para IN_PROGRESS", () => {
      const props = validProps();
      props.status = ERentStatus.SCHEDULED;
      const rent = new RentEntity(props);
      rent.updateStatus(ERentStatus.IN_PROGRESS);
      expect(rent.status).toBe(ERentStatus.IN_PROGRESS);
    });

    it("deve permitir transição de IN_PROGRESS para FINISHED", () => {
      const props = validProps();
      props.status = ERentStatus.IN_PROGRESS;
      const rent = new RentEntity(props);
      rent.updateStatus(ERentStatus.FINISHED);
      expect(rent.status).toBe(ERentStatus.FINISHED);
    });

    it("não deve permitir transição de FINISHED para qualquer outro status", () => {
      const props = validProps();
      props.status = ERentStatus.FINISHED;
      const rent = new RentEntity(props);
      expect(() => rent.updateStatus(ERentStatus.SCHEDULED)).toThrow(ServerError);
    });

    it("não deve permitir voltar de IN_PROGRESS para SCHEDULED", () => {
      const props = validProps();
      props.status = ERentStatus.IN_PROGRESS;
      const rent = new RentEntity(props);
      expect(() => rent.updateStatus(ERentStatus.SCHEDULED)).toThrow(ServerError);
    });
  });

  describe("Verificação de Atraso", () => {
    it("deve retornar true se a data de referência for posterior à data de devolução", () => {
      const rentDate = new Date("2026-05-10");
      const returnDate = new Date("2026-05-15");
      const props = validProps();
      props.rent_date = rentDate;
      props.return_date = returnDate;
      const rent = new RentEntity(props);
      const referenceDate = new Date("2026-05-16");
      expect(rent.isLate(referenceDate)).toBe(true);
    });

    it("deve retornar false se a data de referência for igual ou anterior à data de devolução", () => {
      const rentDate = new Date("2026-05-10");
      const returnDate = new Date("2026-05-15");
      const props = validProps();
      props.rent_date = rentDate;
      props.return_date = returnDate;
      const rent = new RentEntity(props);
      
      expect(rent.isLate(new Date("2026-05-15"))).toBe(false);
      expect(rent.isLate(new Date("2026-05-14"))).toBe(false);
    });

    it("deve calcular corretamente a quantidade de dias de atraso", () => {
      const rentDate = new Date("2026-05-10");
      const returnDate = new Date("2026-05-15");
      const props = validProps();
      props.rent_date = rentDate;
      props.return_date = returnDate;
      const rent = new RentEntity(props);
      
      expect(rent.getLateDays(new Date("2026-05-17"))).toBe(2);
      expect(rent.getLateDays(new Date("2026-05-20"))).toBe(5);
    });

    it("deve retornar 0 dias de atraso se não estiver atrasado", () => {
      const rentDate = new Date("2026-05-10");
      const returnDate = new Date("2026-05-15");
      const props = validProps();
      props.rent_date = rentDate;
      props.return_date = returnDate;
      const rent = new RentEntity(props);
      
      expect(rent.getLateDays(new Date("2026-05-15"))).toBe(0);
      expect(rent.getLateDays(new Date("2026-05-10"))).toBe(0);
    });
  });

  describe("Verificação de Conflitos", () => {
    it("deve detectar conflito quando as datas se sobrepõem", () => {
      const rentDate = new Date("2026-05-10");
      const returnDate = new Date("2026-05-15");
      const props = validProps();
      props.rent_date = rentDate;
      props.return_date = returnDate;
      const rent = new RentEntity(props);

      // Sobreposição total
      expect(rent.conflictsWith(new Date("2026-05-12"), new Date("2026-05-14"), 0)).toBe(true);
      // Sobreposição no início
      expect(rent.conflictsWith(new Date("2026-05-08"), new Date("2026-05-11"), 0)).toBe(true);
      // Sobreposição no fim
      expect(rent.conflictsWith(new Date("2026-05-14"), new Date("2026-05-18"), 0)).toBe(true);
    });

    it("deve detectar conflito considerando o buffer de limpeza", () => {
      const rentDate = new Date("2026-05-10");
      const returnDate = new Date("2026-05-15");
      const bufferDays = 2; // Ocupado até dia 17
      const props = validProps();
      props.rent_date = rentDate;
      props.return_date = returnDate;
      const rent = new RentEntity(props);

      // Tenta começar no dia 16 (conflito devido ao buffer)
      expect(rent.conflictsWith(new Date("2026-05-16"), new Date("2026-05-20"), bufferDays)).toBe(true);
      
      // Começa no dia 18 (livre)
      expect(rent.conflictsWith(new Date("2026-05-18"), new Date("2026-05-25"), bufferDays)).toBe(false);
    });
  });
});
