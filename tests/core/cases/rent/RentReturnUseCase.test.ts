import { RentReturnUseCase, RentReturnDTO } from "@/core/application/cases/rent/RentReturnUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomRent } from "../../../utils/factories";
import { ERentStatus } from "@prisma/client";
import { addDays, subDays } from "date-fns";
import { RentType } from "@/types/entities/RentType";

describe("Rent return use case", () => {
  let useCase: RentReturnUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    useCase = new RentReturnUseCase(rentalRepo);
  });

  const existingRentId = "rent-1";
  const mockExistingRent: RentType = getRandomRent({
    id: existingRentId,
    status: ERentStatus.SCHEDULED,
    return_date: addDays(new Date(), 2),
  });

  const returnData: RentReturnDTO = {
    id: existingRentId,
    rentProducts: [
      { id: "rp-1", realBuffer: 1 }
    ]
  };

  it("should mark rent as returned", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    const finishedRent: RentType = { ...mockExistingRent, status: ERentStatus.FINISHED };
    rentalRepo.returnRent.mockResolvedValue(finishedRent);

    const result = await useCase.execute(returnData);

    // Valida se o status do aluguel foi alterado para FINISHED após a devolução
    expect(result?.status).toBe(ERentStatus.FINISHED);
    // Valida se o método returnRent do repositório foi chamado com os dados corretos
    expect(rentalRepo.returnRent).toHaveBeenCalledWith(returnData);
  });

  it("should detect late return", async () => {
    const lateRent: RentType = getRandomRent({
      id: existingRentId,
      status: ERentStatus.SCHEDULED,
      return_date: subDays(new Date(), 2),
    });
    rentalRepo.find.mockResolvedValue(lateRent);
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    rentalRepo.returnRent.mockResolvedValue({ ...lateRent, status: ERentStatus.FINISHED });

    await useCase.execute(returnData);

    // Valida se a mensagem de atraso foi registrada no console
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/2 dias de atraso/));
    consoleSpy.mockRestore();
  });

  it("should throw error if rent does not exist", async () => {
    rentalRepo.find.mockResolvedValue(null);

    // Valida se erro de aluguel não encontrado é lançado ao tentar devolver
    await expect(useCase.execute(returnData)).rejects.toThrow("Aluguel não encontrado ou já excluído.");
  });

  it("should throw error if rent is already finished", async () => {
    const finishedRent: RentType = getRandomRent({
      id: existingRentId,
      status: ERentStatus.FINISHED,
    });
    rentalRepo.find.mockResolvedValue(finishedRent);

    // Valida se erro de aluguel já finalizado é lançado
    await expect(useCase.execute(returnData)).rejects.toThrow("Este aluguel já foi finalizado anteriormente.");
  });

  it("should handle same-day return", async () => {
    const sameDayRent: RentType = getRandomRent({
      id: existingRentId,
      status: ERentStatus.SCHEDULED,
      return_date: new Date(),
    });
    rentalRepo.find.mockResolvedValue(sameDayRent);
    rentalRepo.returnRent.mockResolvedValue({ ...sameDayRent, status: ERentStatus.FINISHED });

    const result = await useCase.execute(returnData);

    // Valida se a devolução no mesmo dia é processada com sucesso
    expect(result?.status).toBe(ERentStatus.FINISHED);
  });
});
