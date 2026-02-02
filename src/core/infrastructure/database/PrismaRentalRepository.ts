// src/core/infrastructure/prisma/PrismaRentalRepository.ts
import { PrismaClient } from "@prisma/client";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { Rental } from "../../domain/entities/Rental";

// Nota: Em um projeto Next.js real, é melhor usar uma instância singleton do Prisma
// para evitar criar múltiplas conexões, especialmente em ambiente de desenvolvimento.
const prisma = new PrismaClient();

export class PrismaRentalRepository implements IRentalRepository {
  async findActiveByProduct(productId: string): Promise<Rental[]> {
    // A query correta busca em 'rents' e filtra pela tabela relacional 'rent_products'
    const rentRows = await prisma.rents.findMany({
      where: {
        // Busca aluguéis que contenham o produto especificado
        rent_products: {
          some: {
            product_id: productId,
          },
        },
        // E que não estejam marcados como deletados (nosso análogo a 'CANCELADO')
        deleted: false,
      },
    });

    // Mapeia as linhas do banco de dados para a nossa Entidade de Domínio (Rental)
    return rentRows.map((row) => {
      // Para a checagem de disponibilidade, consideramos 'deleted: false' como 'ACTIVE'.
      // Uma lógica mais complexa poderia diferenciar 'ACTIVE' de 'RETURNED' com base na data.
      const status = "ACTIVE";

      // A entidade de domínio `Rental` espera uma `endDate`. O schema do banco
      // permite `return_date` nulo, o que pode causar inconsistências.
      if (!row.return_date) {
        // É uma boa prática lançar um erro aqui para sinalizar dados inconsistentes.
        throw new Error(
          `Dado inconsistente: O aluguel com ID ${row.id} não possui data de devolução.`
        );
      }

      return new Rental(
        row.id,
        productId, // O contexto da busca é por este produto
        row.rent_date,
        row.return_date,
        status
      );
    });
  }

  // O método deve se chamar 'save' para corresponder à interface IRentalRepository
  async save(rental: Rental): Promise<void> {
    // Usamos uma transação para garantir que o aluguel (rents) e o item do aluguel (rent_products)
    // sejam criados de forma atômica. Se um falhar, o outro é revertido.
    await prisma.$transaction(async (tx) => {
      const createdRent = await tx.rents.create({
        data: {
          id: rental.id,
          rent_date: rental.startDate,
          return_date: rental.endDate,
          // ATENÇÃO: A entidade 'Rental' atual não possui esses dados.
          // Eles precisam ser adicionados à entidade ou passados para o método 'save'.
          client_name: "NOME DO CLIENTE AQUI", // Ex: rental.clientName
          total_value: 0, // Ex: rental.totalValue
        },
      });

      await tx.rent_products.create({
        data: {
          rent_id: createdRent.id,
          product_id: rental.productId,
          // Estes dados viriam do produto, que deveria ser buscado aqui ou ter os dados passados.
          product_price: 0,
          product_description: "Descrição do produto aqui",
          measure_type: "SUIT", // Este valor deve vir do produto/categoria
        },
      });
    });
  }
}
