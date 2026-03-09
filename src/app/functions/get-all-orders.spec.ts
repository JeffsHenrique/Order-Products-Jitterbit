import { InMemoryOrdersRepository } from "@/infra/repositories/in-memory/in-memory-orders-repository"
import { makeOrders } from "@/test/factories/make-orders"
import { beforeEach, describe, expect, it } from "vitest"
import { GetAllOrdersUseCase } from "./get-all-orders"

describe('get all orders', () => {
    let repository: InMemoryOrdersRepository
    let sut: GetAllOrdersUseCase

    beforeEach(() => {
        repository = new InMemoryOrdersRepository()
        sut = new GetAllOrdersUseCase(repository)
    })

    it('should be able to get all orders', async () => {
        const orders = await makeOrders(1)

        for (const order of orders) {
            await repository.createOrder(order)
        }

        const { orders: fetchedOrders } = await sut.execute({
            page: 1,
            limit: 10
        })

        expect(fetchedOrders).toHaveLength(1)
    })
})