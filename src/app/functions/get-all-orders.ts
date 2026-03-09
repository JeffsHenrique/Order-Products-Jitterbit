import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error"
import type { Order } from "@/infra/repositories/drizzle/drizzle-types"
import type { OrdersRepository } from "@/infra/repositories/orders-repository"

interface GetAllOrdersRequest {
    page: number
    limit: number
}

interface GetAllOrdersResponse {
    orders: Order[]
}

export class GetAllOrdersUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ page, limit }: GetAllOrdersRequest): Promise<GetAllOrdersResponse> {
        const orders = await this.ordersRepository.findAllOrders(page, limit)

        if (!orders) {
            throw new ResourceNotFoundError()
        }

        return { orders }
    }
}