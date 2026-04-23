import { RentReturnUseCase, RentReturnDTO } from "@/core/application/cases/rent/RentReturnUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomRentalEntity } from "../../../utils/factories";
import { ERentStatus } from "@prisma/client";
import { addDays, subDays } from "date-fns";

describe("Rent return use case", () => {
  let useCase: RentReturnUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    useCase = new RentReturnUseCase(rentalRepo);
  });

  const existingRentId = "rent-1";
  const mockExistingRent = getRandomRentalEntity({
    id: existingRentId,
    status: ERentStatus.SCHEDULED,
    rentDate: new Date(),
    returnDate: addDays(new Date(), 2),
  });

  const returnData: RentReturnDTO = {
    id: existingRentId,
    rentProducts: [
      { id: "rp-1", realBuffer: 1 }
    ]
  };

  it("should mark rent as returned", async () => {
    rentalRepo.find.mockResolvedValue(mockExistingRent);
    const finishedRent = getRandomRentalEntity({ ...mockExistingRent.toJSON(), status: ERentStatus.FINISHED });
    rentalRepo.returnRent.mockResolvedValue(finishedRent);

    const result = await useCase.execute(returnData);

    // Valida se o status do aluguel foi alterado para FINISHED após a devolução
    expect(result?.status).toBe(ERentStatus.FINISHED);
    // Valida se o método returnRent do repositório foi chamado com os dados corretos
    expect(rentalRepo.returnRent).toHaveBeenCalledWith(returnData);
  });

  it("should detect late return", async () => {
    const lateRent = getRandomRentalEntity({
      id: existingRentId,
      status: ERentStatus.SCHEDULED,
      returnDate: subDays(new Date(), 2),
    });
    rentalRepo.find.mockResolvedValue(lateRent);
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    rentalRepo.returnRent.mockResolvedValue(getRandomRentalEntity({ ...lateRent.toJSON(), status: ERentStatus.FINISHED }));

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
    const finishedRent = getRandomRentalEntity({
      id: existingRentId,
      status: ERentStatus.FINISHED,
    });
    rentalRepo.find.mockResolvedValue(finishedRent);

    // Valida se erro de aluguel já finalizado é lançado
    await expect(useCase.execute(returnData)).rejects.toThrow("Este aluguel já foi finalizado anteriormente.");
  });

  it("should handle same-day return", async () => {
    const sameDayRent = getRandomRentalEntity({
      id: existingRentId,
      status: ERentStatus.SCHEDULED,
      returnDate: new Date(),
    });
    rentalRepo.find.mockResolvedValue(sameDayRent);
    rentalRepo.returnRent.mockResolvedValue(getRandomRentalEntity({ ...sameDayRent.toJSON(), status: ERentStatus.FINISHED }));

    const result = await useCase.execute(returnData);

    // Valida se a devolução no mesmo dia é processada com sucesso
    expect(result?.status).toBe(ERentStatus.FINISHED);
  });
});
