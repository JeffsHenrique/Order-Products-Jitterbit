import type { OrderInsert } from "@/infra/repositories/drizzle/drizzle-types"
import { InMemoryOrdersRepository } from "@/infra/repositories/in-memory/in-memory-orders-repository"
import { uuidv7 as uuid } from 'uuidv7'
import { beforeEach, describe, expect, it } from "vitest"
import { DeleteOrderUseCase } from "./delete-order"

describe('delete order', () => {
    let repository: InMemoryOrdersRepository
    let sut: DeleteOrderUseCase

    beforeEach(() => {
        repository = new InMemoryOrdersRepository()
        sut = new DeleteOrderUseCase(repository)
    })

    it('should be able to delete an order', async () => {
        const orderData = {
            id: 1,
            orderId: uuid(),
            totalValue: 10000,
            createdAt: new Date(),
            updatedAt: new Date()
        } satisfies OrderInsert

        await repository.createOrder(orderData)

        const { deletedOrder } = await sut.execute({
            orderId: orderData.orderId
        })

        expect(deletedOrder.orderId).toEqual(expect.any(String))
    })
})