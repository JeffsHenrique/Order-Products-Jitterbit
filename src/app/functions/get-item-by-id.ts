import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error"
import type { Item } from "@/infra/repositories/drizzle/drizzle-types"
import type { ItemsRepository } from "@/infra/repositories/items-repository"

interface GetItemByIdRequest {
    itemId: string
}

interface GetItemByIdResponse {
    item: Item
}

export class GetItemByIdUseCase {
    constructor(private itemsRepository: ItemsRepository) { }

    async execute({ itemId }: GetItemByIdRequest): Promise<GetItemByIdResponse> {
        const item = await this.itemsRepository.findItemById(itemId)

        if (!item) {
            throw new ResourceNotFoundError()
        }

        return { item }
    }
}