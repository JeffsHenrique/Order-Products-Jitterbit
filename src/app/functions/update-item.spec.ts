import type { ItemInsert } from "@/infra/repositories/drizzle/drizzle-types"
import { InMemoryItemsRepository } from "@/infra/repositories/in-memory/in-memory-items-repository"
import { uuidv7 as uuid } from 'uuidv7'
import { beforeEach, describe, expect, it } from "vitest"
import { UpdateItemUseCase } from "./update-item"

describe('update item', () => {
    let repository: InMemoryItemsRepository
    let sut: UpdateItemUseCase

    beforeEach(() => {
        repository = new InMemoryItemsRepository()
        sut = new UpdateItemUseCase(repository)
    })

    it('should be able to update an item', async () => {
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

        const { updatedItem } = await sut.execute({
            orderId: uuid(),
            price: 2000,
            quantity: 2
        }, { productId: "1" })

        expect(updatedItem).toEqual({
            id: 1,
            orderId: expect.any(String),
            productId: "1",
            quantity: 2,
            price: 2000,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        })
    })
})