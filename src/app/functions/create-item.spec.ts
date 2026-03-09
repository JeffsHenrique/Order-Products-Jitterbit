import { InMemoryItemsRepository } from "@/infra/repositories/in-memory/in-memory-items-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateItemUseCase } from "./create-item"

describe('create item', () => {
    let repository: InMemoryItemsRepository
    let sut: CreateItemUseCase

    beforeEach(() => {
        repository = new InMemoryItemsRepository()
        sut = new CreateItemUseCase(repository)
    })

    it('should be able to create an item', async () => {
        const itemData = {
            idItem: "1",
            quantidadeItem: 1,
            valorItem: 1000
        }

        const item = await sut.execute(itemData)

        expect(item).toEqual({
            newItem: {
                id: 1,
                orderId: null,
                productId: "1",
                quantity: 1,
                price: 1000,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        })
    })
})