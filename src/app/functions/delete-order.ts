import type { Order } from "@/infra/repositories/drizzle/drizzle-types"
import type { OrdersRepository } from "@/infra/repositories/orders-repository"

interface DeleteOrderRequest {
    orderId: string
}

interface DeleteOrderResponse {
    deletedOrder: Order
}

export class DeleteOrderUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ orderId }: DeleteOrderRequest): Promise<DeleteOrderResponse> {
        const deletedOrder = await this.ordersRepository.deleteOrder(orderId)
        return { deletedOrder }
    }
}