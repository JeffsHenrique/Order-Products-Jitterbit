import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error";
import type { Order } from "@/infra/repositories/drizzle/drizzle-types";
import type { OrdersRepository } from "@/infra/repositories/orders-repository";
import z from "zod";

export const updateOrderInput = z.object({
    valorTotal: z.number().optional()
})

type UpdateOrderInput = z.infer<typeof updateOrderInput>

interface UpdateOrderRequest {
    orderId: string
}

interface UpdateOrderResponse {
    updatedOrder: Order
}

export class UpdateOrderUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute(input: UpdateOrderInput, { orderId }: UpdateOrderRequest): Promise<UpdateOrderResponse> {
        const { valorTotal } = updateOrderInput.parse(input)

        const order = await this.ordersRepository.findOrderById(orderId)

        if (!order) {
            throw new ResourceNotFoundError
        }

        const updatedOrder = await this.ordersRepository.updateOrder(orderId, {
            totalValue: valorTotal
        })

        return { updatedOrder }
    }
}