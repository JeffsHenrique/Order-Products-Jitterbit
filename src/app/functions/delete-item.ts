import type { Item } from "@/infra/repositories/drizzle/drizzle-types"
import type { ItemsRepository } from "@/infra/repositories/items-repository"

interface DeleteItemRequest {
    productId: string
}

interface DeleteItemResponse {
    deletedItem: Item
}

export class DeleteItemUseCase {
    constructor(private itemsRepository: ItemsRepository) { }

    async execute({ productId }: DeleteItemRequest): Promise<DeleteItemResponse> {
        const deletedItem = await this.itemsRepository.deleteItem(productId)

        return { deletedItem }
    }
}