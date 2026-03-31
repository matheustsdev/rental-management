import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/services/prisma"
import { getUTCDateFromInput } from "@/utils/getUTCDateFromInput"
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus"
import { Rental } from "@/core/domain/entities/Rental"
import { defaultApiErrorHandler } from "@/utils/defaultApiErrorHandler"

const availabilityQuerySchema = z.object({
  productId: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())

    const validation = availabilityQuerySchema.safeParse(query)

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const { productId, date } = validation.data
    const targetDate = getUTCDateFromInput(date)

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    const rent = await prisma.rent.findFirst({
      where: {
        products: {
          some: {
            productId: product.id,
          },
        },
        status: {
          in: ['rented', 'late'],
        },
        AND: [
          {
            expectedDevolutionDate: {
              gte: targetDate,
            },
          },
          {
            withdrawDate: {
              lte: targetDate,
            },
          },
        ],
      },
      include: {
        customer: true,
        rentProducts: {
          include: {
            product: true,
          },
        },
      },
    })

    if (rent) {
      return NextResponse.json({
        status: EAvailabilityStatus.RENTED,
        rent: new Rental(rent),
      })
    }

    const lastRent = await prisma.rent.findFirst({
      where: {
        products: {
          some: {
            productId: product.id,
          },
        },
        realDevolutionDate: {
          not: null,
        },
        status: {
          in: ['finished'],
        },
      },
      orderBy: {
        realDevolutionDate: 'desc',
      },
    })

    if (lastRent && lastRent.realDevolutionDate) {
      const cleaningPeriod = product.cleaningPeriod ?? 0
      const lastRentDevolutionDate = new Date(lastRent.realDevolutionDate)

      const cleaningEndDate = new Date(lastRentDevolutionDate.getTime())
      cleaningEndDate.setUTCDate(
        lastRentDevolutionDate.getUTCDate() + cleaningPeriod,
      )

      if (targetDate <= cleaningEndDate) {
        return NextResponse.json({
          status: EAvailabilityStatus.CLEANING,
        })
      }
    }

    return NextResponse.json({
      status: EAvailabilityStatus.AVAILABLE,
    })
  } catch (error) {
    return defaultApiErrorHandler(error)
  }
}
