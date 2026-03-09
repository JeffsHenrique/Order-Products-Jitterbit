import type { ItemInsert } from "@/infra/repositories/drizzle/drizzle-types"
import { InMemoryItemsRepository } from "@/infra/repositories/in-memory/in-memory-items-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { DeleteItemUseCase } from "./delete-item"

describe('delete item', () => {
    let repository: InMemoryItemsRepository
    let sut: DeleteItemUseCase

    beforeEach(() => {
        repository = new InMemoryItemsRepository()
        sut = new DeleteItemUseCase(repository)
    })

    it('should be able to delete an item', async () => {
        const itemData = {
            id: 1,
            orderId: null,
            productId: "1",
            quantity: 1,
            price: 1000,
            createdAt: new Date(),
            updatedAt: new Date()
        } satisfies ItemInsert

        await repository.createItem(itemData)

        const { deletedItem } = await sut.execute({
            productId: itemData.productId
        })

        expect(deletedItem.productId).toEqual("1")
    })
})