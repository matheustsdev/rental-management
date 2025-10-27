import { NextRequest, NextResponse } from "next/server";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { prisma } from "@/services/prisma";
import { EAvailabilityStatus, EAvailabilityStatusType } from "@/constants/EAvailabilityStatus";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const filterText = params.get("filterText"); 
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");

    if (!startDate || !endDate) throw new Error("Informe a data de aluguel e de retorno");

    const rents = await prisma.rents.findMany({
      where: {
        return_date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include: {
        rent_products: true
      },
      orderBy: {
        return_date: "desc"
      }
    });

    const products = await prisma.products.findMany({
      take: 200,
      where: {
        description: {
          contains: filterText ?? ""
        }
      },
      include: {
        categories: true
      }
    });

    const response = products.map((product) => {
      const rentInUse = rents.find(rent => rent.rent_products.find(rentProduct => rentProduct.product_id === product.id));
      const rentProduct = rentInUse?.rent_products.find(rentProduct => rentProduct.product_id === product.id);

      let availability: EAvailabilityStatusType = rentInUse ? EAvailabilityStatus.UNAVAILABLE : EAvailabilityStatus.AVAILABLE;

      if (availability === EAvailabilityStatus.AVAILABLE) {
        const bufferReturnDate = rentProduct?.actual_return_buffer_days;

        if (bufferReturnDate && new Date(startDate).getTime() < new Date(bufferReturnDate).getTime()) availability = EAvailabilityStatus.BUFFER_OCCUPIED;
      }

      const productAvailability: ProductAvailabilityType = {
        product,
        current_rent_id: rentInUse?.id ?? null,
        actual_return_date: rentInUse?.return_date ?? null,
        availability,
        buffer_end_date: rentProduct?.actual_return_buffer_days ? new Date(rentProduct?.actual_return_buffer_days) : null,
        current_rent_return_date: rentInUse?.return_date ? new Date(rentInUse.return_date) : null
      } 

      return productAvailability;
    })

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar produtos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
