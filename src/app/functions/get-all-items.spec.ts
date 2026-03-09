import { InMemoryItemsRepository } from "@/infra/repositories/in-memory/in-memory-items-repository"
import { makeItems } from "@/test/factories/make-items"
import { beforeEach, describe, expect, it } from "vitest"
import { GetAllItemsUseCase } from "./get-all-items"

describe('get all items', () => {
    let repository: InMemoryItemsRepository
    let sut: GetAllItemsUseCase

    beforeEach(() => {
        repository = new InMemoryItemsRepository()
        sut = new GetAllItemsUseCase(repository)
    })

    it('should be able to get all items', async () => {
        const items = await makeItems(5)

        for (const item of items) {
            await repository.createItem(item)
        }

        const { items: fetchedItems } = await sut.execute({
            page: 1,
            limit: 10
        })

        expect(fetchedItems).toHaveLength(5)
    })
})