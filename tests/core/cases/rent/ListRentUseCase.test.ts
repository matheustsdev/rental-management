import { ListRentUseCase } from "@/core/application/cases/rent/ListRentUseCase";
import { IRentalRepository, RentalListInput } from "@/core/domain/repositories/IRentalRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomRentalEntity } from "../../../utils/factories";
import { ERentStatus } from "@prisma/client";
import { RentMapper } from "@/core/application/mappers/RentMapper";

describe("List rents use case", () => {
  let useCase: ListRentUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    useCase = new ListRentUseCase(rentalRepo);
  });

  it("should return a list of rents and count", async () => {
    const rents = [getRandomRentalEntity(), getRandomRentalEntity()];
    rentalRepo.list.mockResolvedValue(rents);
    rentalRepo.count.mockResolvedValue(2);

    const result = await useCase.execute({});

    // Valida se os dados retornados correspondem aos mocks do repositório (via Mapper)
    expect(result.data).toEqual(rents.map(r => RentMapper.toDto(r)));
    // Valida se o contador total de registros está correto
    expect(result.count).toBe(2);
    // Garante que o repositório foi consultado
    expect(rentalRepo.list).toHaveBeenCalled();
    expect(rentalRepo.count).toHaveBeenCalled();
  });

  it("should pass filters to repository", async () => {
    const filters: RentalListInput = {
      search: "John Doe",
      status: ERentStatus.SCHEDULED,
      page: 1,
      pageSize: 10,
    };

    rentalRepo.list.mockResolvedValue([]);
    rentalRepo.count.mockResolvedValue(0);

    await useCase.execute(filters);

    // Valida se os filtros de busca, status e paginação foram repassados ao repositório
    expect(rentalRepo.list).toHaveBeenCalledWith(expect.objectContaining(filters));
  });

  it("should filter rents by date range", async () => {
    const filters: RentalListInput = {
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-10"),
    };

    rentalRepo.list.mockResolvedValue([]);
    rentalRepo.count.mockResolvedValue(0);

    await useCase.execute(filters);

    // Valida se o intervalo de datas foi repassado corretamente ao repositório
    expect(rentalRepo.list).toHaveBeenCalledWith(expect.objectContaining(filters));
  });

  it("should handle pagination", async () => {
    const filters: RentalListInput = {
      page: 2,
      pageSize: 5,
    };

    rentalRepo.list.mockResolvedValue([]);
    rentalRepo.count.mockResolvedValue(0);

    await useCase.execute(filters);

    // Valida se os parâmetros de paginação (página 2) foram repassados
    expect(rentalRepo.list).toHaveBeenCalledWith(expect.objectContaining(filters));
  });

  it("should handle sorting", async () => {
    const filters: RentalListInput = {
      orderBy: "rent_date",
      ascending: false,
    };

    rentalRepo.list.mockResolvedValue([]);
    rentalRepo.count.mockResolvedValue(0);

    await useCase.execute(filters);

    // Valida se os parâmetros de ordenação foram repassados ao repositório
    expect(rentalRepo.list).toHaveBeenCalledWith(expect.objectContaining(filters));
  });
});
