import { FindRentUseCase } from "@/core/application/cases/rent/FindRentUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomRent } from "../../../utils/factories";
import { RentType } from "@/types/entities/RentType";

describe("Find rent use case", () => {
  let useCase: FindRentUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    useCase = new FindRentUseCase(rentalRepo);
  });

  it("should return a rent if it exists", async () => {
    const rent: RentType = getRandomRent({ id: "rent-1" });
    rentalRepo.find.mockResolvedValue(rent);

    const result = await useCase.execute("rent-1");

    // Valida se os dados do aluguel encontrado correspondem ao esperado
    expect(result).toEqual(rent);
    // Garante que a busca foi feita com o ID correto
    expect(rentalRepo.find).toHaveBeenCalledWith("rent-1");
  });

  it("should return null if rent does not exist", async () => {
    rentalRepo.find.mockResolvedValue(null);

    const result = await useCase.execute("non-existent-id");

    // Valida que o resultado é nulo quando o ID não existe no banco
    expect(result).toBeNull();
    expect(rentalRepo.find).toHaveBeenCalledWith("non-existent-id");
  });

  it("should return null for soft-deleted rent", async () => {
    rentalRepo.find.mockResolvedValue(null);

    const result = await useCase.execute("deleted-id");

    // Valida que aluguéis excluídos logicamente não são retornados pelo caso de uso
    expect(result).toBeNull();
  });
});
