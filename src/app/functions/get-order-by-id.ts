import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error"
import type { Order } from "@/infra/repositories/drizzle/drizzle-types"
import type { OrdersRepository } from "@/infra/repositories/orders-repository"

interface GetOrderByIdRequest {
    orderId: string
}

interface GetOrderByIdResponse {
    order: Order
}

export class GetOrderByIdUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ orderId }: GetOrderByIdRequest): Promise<GetOrderByIdResponse> {
        const order = await this.ordersRepository.findOrderById(orderId)

        if (!order) {
            throw new ResourceNotFoundError()
        }

        return { order }
    }
}