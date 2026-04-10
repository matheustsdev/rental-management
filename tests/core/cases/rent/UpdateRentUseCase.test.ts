import { UpdateRentUseCase } from "@/core/application/cases/rent/UpdateRentUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomProduct, getRandomRent, getRandomProductType, getRandomCategory } from "../../../utils/factories";
import { RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { ERentStatus, measures_type, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

describe("Update rent use case", () => {
  let useCase: UpdateRentUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    productRepo = mockDeep<IProductRepository>();
    useCase = new UpdateRentUseCase(rentalRepo, productRepo);
  });

  const existingRentId = "rent-1";
  const mockExistingRent: RentType = getRandomRent({
    id: existingRentId,
    status: ERentStatus.SCHEDULED,
    rent_date: new Date("2025-03-01"),
    return_date: new Date("2025-03-05"),
  });

  it("should update rent status SCHEDULED → IN_PROGRESS", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      status: ERentStatus.IN_PROGRESS,
      rent_products: []
    };

    rentalRepo.update.mockResolvedValue({ ...mockExistingRent, status: ERentStatus.IN_PROGRESS });

    const result = await useCase.execute(input);

    // Valida se o status foi alterado para IN_PROGRESS
    expect(result.status).toBe(ERentStatus.IN_PROGRESS);
    // Valida se o repositório foi chamado com o novo status
    expect(rentalRepo.update).toHaveBeenCalledWith(existingRentId, expect.objectContaining({ status: ERentStatus.IN_PROGRESS }));
  });

  it("should update rent status IN_PROGRESS → FINISHED", async () => {
    const inProgressRent = { ...mockExistingRent, status: ERentStatus.IN_PROGRESS };
    rentalRepo.find.mockResolvedValue(inProgressRent);
    
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      status: ERentStatus.FINISHED,
      rent_products: []
    };

    rentalRepo.update.mockResolvedValue({ ...inProgressRent, status: ERentStatus.FINISHED });

    const result = await useCase.execute(input);

    // Valida se o status foi alterado para FINISHED
    expect(result.status).toBe(ERentStatus.FINISHED);
  });

  it("should reject invalid status transition (FINISHED → SCHEDULED)", async () => {
    const finishedRent = { ...mockExistingRent, status: ERentStatus.FINISHED };
    rentalRepo.find.mockResolvedValue(finishedRent);
    
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      status: ERentStatus.SCHEDULED,
      rent_products: []
    };

    // Valida se erro de transição inválida é lançado
    await expect(useCase.execute(input)).rejects.toThrow("Não é possível alterar um aluguel já finalizado.");
  });

  it("should update return date", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    
    const newReturnDate = new Date("2025-03-10");
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      return_date: newReturnDate,
      rent_products: []
    };

    rentalRepo.update.mockResolvedValue({ ...mockExistingRent, return_date: newReturnDate });
    // Mock product availability check
    productRepo.findById.mockResolvedValue(getRandomProduct());
    rentalRepo.findActiveByProduct.mockResolvedValue([]);

    const result = await useCase.execute(input);

    // Valida se a data de devolução foi atualizada
    expect(result.return_date).toEqual(newReturnDate);
  });

  it("should update real_return_date", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    
    const actualReturnDate = new Date("2025-03-06");
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      real_return_date: actualReturnDate,
      rent_products: []
    };

    rentalRepo.update.mockResolvedValue({ ...mockExistingRent, real_return_date: actualReturnDate });

    const result = await useCase.execute(input);

    // Valida se a data de devolução real foi atualizada
    expect(result.real_return_date).toEqual(actualReturnDate);
  });

  it("should validate dates after update (return <= rent)", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      rent_date: new Date("2025-03-10"),
      return_date: new Date("2025-03-05"),
      rent_products: []
    };

    // Valida se erro de data inválida é lançado
    await expect(useCase.execute(input)).rejects.toThrow("A data de devolução deve ser posterior à data de aluguel.");
  });

  it("should prevent updating deleted rents", async () => {
    rentalRepo.find.mockResolvedValue(null);
    
    const input: RentUpdateWithProductDtoType = {
      id: "non-existent",
      status: ERentStatus.IN_PROGRESS,
      rent_products: []
    };

    // Valida se erro de aluguel não encontrado é lançado
    await expect(useCase.execute(input)).rejects.toThrow("Aluguel não encontrado ou já excluído.");
  });

  it("should save product measurements when updating rent", async () => {
    const existingRent = getRandomRent({
      id: "rent-1",
      status: ERentStatus.SCHEDULED,
      rent_products: []
    });
    rentalRepo.find.mockResolvedValue(existingRent);
    
    const mockProduct = getRandomProductType({ id: "product-1", categories: { ...getRandomCategory(), measure_type: measures_type.DRESS } });
    productRepo.findById.mockResolvedValue(mockProduct);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    rentalRepo.deleteRentProducts.mockResolvedValue();
    rentalRepo.update.mockResolvedValue(getRandomRent({
      rent_products: [{
        id: "rp-1",
        product_id: "product-1",
        product_price: new Decimal(100),
        product_description: "Test",
        measure_type: measures_type.DRESS,
        bust: new Decimal(88),
        waist: new Decimal(70),
        hip: new Decimal(92),
        shoulder: new Decimal(38),
        sleeve: new Decimal(55),
        height: new Decimal(170),
        back: new Decimal(36),
        rent_id: "rent-1",
        created_at: new Date(),
        deleted: false,
        deleted_at: null,
        real_return_buffer_days: null,
        real_return_date: null,
      }]
    }));

    const input: RentUpdateWithProductDtoType = {
      id: "rent-1",
      rent_products: [{
        product_id: "product-1",
        product_price: new Decimal(100),
        product_description: "Test",
        measure_type: measures_type.DRESS,
        bust: 88,
        waist: 70,
        hip: 92,
        shoulder: 38,
        sleeve: 55,
        height: 170,
        back: 36,
      }]
    };

    await useCase.execute(input);

    expect(rentalRepo.deleteRentProducts).toHaveBeenCalledWith("rent-1");
    expect(rentalRepo.update).toHaveBeenCalledWith(
      "rent-1",
      expect.objectContaining({
        rent_products: expect.objectContaining({
          createMany: expect.objectContaining({
            data: expect.arrayContaining([expect.objectContaining({
              bust: new Prisma.Decimal(88),
              waist: new Prisma.Decimal(70),
              hip: new Prisma.Decimal(92),
              shoulder: new Prisma.Decimal(38),
              sleeve: new Prisma.Decimal(55),
              height: new Prisma.Decimal(170),
              back: new Prisma.Decimal(36),
            })])
          })
        })
      })
    );
  });
});
