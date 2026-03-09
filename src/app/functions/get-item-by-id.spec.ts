import type { Item } from "@/infra/repositories/drizzle/drizzle-types"
import { InMemoryItemsRepository } from "@/infra/repositories/in-memory/in-memory-items-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetItemByIdUseCase } from "./get-item-by-id"

describe('get item', () => {
    let repository: InMemoryItemsRepository
    let sut: GetItemByIdUseCase

    beforeEach(() => {
        repository = new InMemoryItemsRepository()
        sut = new GetItemByIdUseCase(repository)
    })

    it('should be able to get an item', async () => {
        const itemData = {
            id: 1,
            orderId: null,
            productId: "1",
            quantity: 1,
            price: 1000,
            createdAt: new Date(),
            updatedAt: new Date()
        } satisfies Item

        const item = await repository.createItem(itemData)

        const result = await sut.execute({
            itemId: item.productId
        })

        expect(result.item).toEqual(item)
    })
})