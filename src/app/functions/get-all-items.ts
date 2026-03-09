import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error"
import { Item } from "@/infra/repositories/drizzle/drizzle-types"
import { ItemsRepository } from "@/infra/repositories/items-repository"

interface GetAllItemsRequest {
    page: number
    limit: number
}

interface GetAllItemsResponse {
    items: Item[]
}

export class GetAllItemsUseCase {
    constructor(private itemsRepository: ItemsRepository) { }

    async execute({ page, limit }: GetAllItemsRequest): Promise<GetAllItemsResponse> {
        const items = await this.itemsRepository.findAllItems(page, limit)

        if (!items) {
            throw new ResourceNotFoundError()
        }

        return { items }
    }
}