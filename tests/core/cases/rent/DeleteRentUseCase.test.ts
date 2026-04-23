import { DeleteRentUseCase } from "@/core/application/cases/rent/DeleteRentUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomRentalEntity } from "../../../utils/factories";
import { ServerError } from "@/utils/models/ServerError";

describe("Delete rent use case", () => {
  let useCase: DeleteRentUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    useCase = new DeleteRentUseCase(rentalRepo);
  });

  it("should soft delete a rent", async () => {
    const rent = getRandomRentalEntity({ id: "rent-1" });
    rentalRepo.find.mockResolvedValue(rent);
    rentalRepo.delete.mockResolvedValue(undefined);

    await useCase.execute("rent-1");

    // Garante que o aluguel foi buscado antes da exclusão
    expect(rentalRepo.find).toHaveBeenCalledWith("rent-1");
    // Valida se o método de exclusão do repositório foi chamado corretamente
    expect(rentalRepo.delete).toHaveBeenCalledWith("rent-1");
  });

  it("should throw error if rent does not exist", async () => {
    rentalRepo.find.mockResolvedValue(null);

    // Valida se erro de aluguel inexistente é lançado ao tentar excluir
    await expect(useCase.execute("non-existent-id")).rejects.toThrow("Aluguel não encontrado ou já excluído.");
  });

  it("should throw error if rent is already deleted", async () => {
    rentalRepo.find.mockResolvedValue(null);

    // Garante que a tentativa de excluir algo já removido resulte em erro (idempotência negativa)
    await expect(useCase.execute("deleted-id")).rejects.toThrow(ServerError);
  });
});
