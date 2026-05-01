import { UpdateRentUseCase } from "@/core/application/cases/rent/UpdateRentUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomProduct, getRandomProductType, getRandomCategory, getRandomRentalEntity } from "../../../utils/factories";
import { RentUpdateWithProductDtoType } from "@/types/entities/RentType";
import { ERentStatus, measures_type } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Product } from "@/core/domain/entities/Product";
import { RentProduct } from "@/core/domain/entities/RentProduct";

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
  const mockExistingRent = getRandomRentalEntity({
    id: existingRentId,
    status: ERentStatus.SCHEDULED,
    rentDate: new Date("2025-03-01"),
    returnDate: new Date("2025-03-05"),
  });

  it("should update rent status SCHEDULED → IN_PROGRESS", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      status: ERentStatus.IN_PROGRESS,
      rent_products: []
    };

    rentalRepo.update.mockResolvedValue(getRandomRentalEntity({ ...mockExistingRent.toJSON(), status: ERentStatus.IN_PROGRESS }));

    const result = await useCase.execute(input);

    // Valida se o status foi alterado para IN_PROGRESS
    expect(result.status).toBe(ERentStatus.IN_PROGRESS);
    // Valida se o repositório foi chamado com o novo status
    expect(rentalRepo.update).toHaveBeenCalledWith(existingRentId, expect.objectContaining({ 
      status: ERentStatus.IN_PROGRESS 
    }));
  });

  it("should update rent status IN_PROGRESS → FINISHED", async () => {
    const inProgressRent = getRandomRentalEntity({ ...mockExistingRent.toJSON(), status: ERentStatus.IN_PROGRESS });
    rentalRepo.find.mockResolvedValue(inProgressRent);
    
    const input: RentUpdateWithProductDtoType = {
      id: existingRentId,
      status: ERentStatus.FINISHED,
      rent_products: []
    };

    rentalRepo.update.mockResolvedValue(getRandomRentalEntity({ ...inProgressRent.toJSON(), status: ERentStatus.FINISHED }));

    const result = await useCase.execute(input);

    // Valida se o status foi alterado para FINISHED
    expect(result.status).toBe(ERentStatus.FINISHED);
  });

  it("should reject invalid status transition (FINISHED → SCHEDULED)", async () => {
    const finishedRent = getRandomRentalEntity({ ...mockExistingRent.toJSON(), status: ERentStatus.FINISHED });
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

    rentalRepo.update.mockResolvedValue(getRandomRentalEntity({ ...mockExistingRent.toJSON(), returnDate: newReturnDate }));
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

    rentalRepo.update.mockResolvedValue(getRandomRentalEntity({ ...mockExistingRent.toJSON(), realReturnDate: actualReturnDate }));

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
    const existingRent = getRandomRentalEntity({
      id: "rent-1",
      status: ERentStatus.SCHEDULED,
      items: []
    });
    rentalRepo.find.mockResolvedValue(existingRent);
    
    const mockProduct = getRandomProductType({ id: "product-1", categories: { ...getRandomCategory(), measure_type: measures_type.DRESS } });
    const domainProduct = new Product(
      mockProduct.id, 
      mockProduct.reference, 
      mockProduct.description!, 
      Number(mockProduct.price), 
      mockProduct.categories!.post_return_buffer_days!,
      mockProduct.categories!.name
    );
    productRepo.findById.mockResolvedValue(domainProduct);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    rentalRepo.deleteRentProducts.mockResolvedValue();
    
    const updatedRentEntity = getRandomRentalEntity({
      id: "rent-1",
      items: [new RentProduct({
        id: "rp-1",
        productId: "product-1",
        productPrice: 100,
        productDescription: "Test",
        measureType: measures_type.DRESS,
        bust: 88,
        waist: 70,
        hip: 92,
        shoulder: 38,
        sleeve: 55,
        height: 170,
        back: 36,
      })]
    });
    rentalRepo.update.mockResolvedValue(updatedRentEntity);

    const input: RentUpdateWithProductDtoType = {
      id: "rent-1",
      rent_products: [{
        product_id: "product-1",
        product_price: new Decimal(100),
        product_description: "Test",
        measure_type: measures_type.DRESS,
        internal_observations: "Ajustar barra",
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
        items: expect.arrayContaining([expect.objectContaining({
          internalObservations: "Ajustar barra",
          bust: 88,
          waist: 70,
          hip: 92,
          shoulder: 38,
          sleeve: 55,
          height: 170,
          back: 36,
        })])
      })
    );
  });
});
