import { OrderInsert } from "@/infra/repositories/drizzle/drizzle-types"
import { InMemoryOrdersRepository } from "@/infra/repositories/in-memory/in-memory-orders-repository"
import { uuidv7 as uuid } from 'uuidv7'
import { beforeEach, describe, expect, it } from "vitest"
import { UpdateOrderUseCase } from "./update-order"

describe('update order', () => {
    let repository: InMemoryOrdersRepository
    let sut: UpdateOrderUseCase

    beforeEach(() => {
        repository = new InMemoryOrdersRepository()
        sut = new UpdateOrderUseCase(repository)
    })

    it('should be able to update an order', async () => {
        const orderData = {
            id: 1,
            orderId: uuid(),
            totalValue: 10000,
            createdAt: new Date(),
            updatedAt: new Date()
        } satisfies OrderInsert

        await repository.createOrder(orderData)

        const { updatedOrder } = await sut.execute({
            valorTotal: 20000
        }, { orderId: orderData.orderId })

        expect(updatedOrder).toEqual({
            id: 1,
            orderId: expect.any(String),
            totalValue: 20000,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        })
    })
})