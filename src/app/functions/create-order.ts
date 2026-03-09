import { NoContentError } from "@/infra/http/routes/_errors/no-content-error";
import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error";
import type { Item, Order } from "@/infra/repositories/drizzle/drizzle-types";
import type { ItemsRepository } from "@/infra/repositories/items-repository";
import type { OrdersRepository } from "@/infra/repositories/orders-repository";
import z from "zod";

export const createOrderInput = z.object({
    numeroPedido: z.string(),
    valorTotal: z.number(),
    dataCriacao: z.date(),
    items: z.array(
        z.object({
            idItem: z.string(),
            quantidadeItem: z.number(),
            valorItem: z.number()
        })
    )
})

type CreateOrderInput = z.infer<typeof createOrderInput>

type CreateOrderOutput = {
    order: Order
    items: Item[]
}

export class CreateOrderUseCase {
    constructor(
        private ordersRepository: OrdersRepository,
        private itemsRepository: ItemsRepository
    ) { }

    async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
        const { numeroPedido, valorTotal, dataCriacao, items } = createOrderInput.parse(input)

        if (items.length === 0) {
            throw new NoContentError()
        }

        const newOrder = await this.ordersRepository.createOrder({
            orderId: numeroPedido,
            totalValue: valorTotal,
            createdAt: dataCriacao,
        })

        const itemsArr: Item[] = []

        const itemsOrdered = items.map(item => item.idItem)

        for (const item of itemsOrdered) {
            const itemData = await this.itemsRepository.findItemById(item)

            if (!itemData) {
                throw new ResourceNotFoundError()
            }

            await this.itemsRepository.updateItem(itemData.productId, {
                orderId: newOrder.orderId
            })

            itemsArr.push(itemData)
        }

        return {
            order: newOrder,
            items: itemsArr
        }
    }
}