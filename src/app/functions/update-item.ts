import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error";
import type { Item } from "@/infra/repositories/drizzle/drizzle-types";
import type { ItemsRepository } from "@/infra/repositories/items-repository";
import z from "zod";

export const updateItemInput = z.object({
    orderId: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
})

type UpdateItemInput = z.infer<typeof updateItemInput>

interface UpdateItemRequest {
    productId: string
}

interface UpdateItemResponse {
    updatedItem: Item
}

export class UpdateItemUseCase {
    constructor(private itemsRepository: ItemsRepository) { }

    async execute(input: UpdateItemInput, { productId }: UpdateItemRequest): Promise<UpdateItemResponse> {
        const { orderId, price, quantity } = updateItemInput.parse(input)

        const item = await this.itemsRepository.findItemById(productId)

        if (!item) {
            throw new ResourceNotFoundError()
        }

        const updatedItem = await this.itemsRepository.updateItem(productId, {
            orderId,
            price,
            quantity
        })

        return { updatedItem }
    }
}