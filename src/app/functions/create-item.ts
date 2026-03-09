import type { Item } from "@/infra/repositories/drizzle/drizzle-types";
import type { ItemsRepository } from "@/infra/repositories/items-repository";
import z from "zod";

export const createItemInput = z.object({
    idItem: z.string(),
    quantidadeItem: z.number(),
    valorItem: z.number()
})

type CreateItemInput = z.infer<typeof createItemInput>

type CreateItemOutput = {
    newItem: Item
}

export class CreateItemUseCase {
    constructor(private itemsRepository: ItemsRepository) { }

    async execute(input: CreateItemInput): Promise<CreateItemOutput> {
        const { idItem, quantidadeItem, valorItem } = createItemInput.parse(input)

        const newItem = await this.itemsRepository.createItem({
            productId: idItem,
            quantity: quantidadeItem,
            price: valorItem
        })

        return { newItem }
    }
}