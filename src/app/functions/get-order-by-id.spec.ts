import type { Order } from "@/infra/repositories/drizzle/drizzle-types"
import { InMemoryOrdersRepository } from "@/infra/repositories/in-memory/in-memory-orders-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetOrderByIdUseCase } from "./get-order-by-id"

describe('get order', () => {
    let repository: InMemoryOrdersRepository
    let sut: GetOrderByIdUseCase

    beforeEach(() => {
        repository = new InMemoryOrdersRepository()
        sut = new GetOrderByIdUseCase(repository)
    })

    it('should be able to get an order', async () => {
        const orderData = {
            id: 1,
            orderId: "1",
            totalValue: 150,
            createdAt: new Date(),
            updatedAt: new Date()
        } satisfies Order

        const order = await repository.createOrder(orderData)

        const result = await sut.execute({
            orderId: order.orderId
        })

        expect(result.order).toEqual(order)
    })
})