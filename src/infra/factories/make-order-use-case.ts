import { CreateOrderUseCase } from "@/app/functions/create-order"
import { DeleteOrderUseCase } from "@/app/functions/delete-order"
import { GetAllOrdersUseCase } from "@/app/functions/get-all-orders"
import { GetOrderByIdUseCase } from "@/app/functions/get-order-by-id"
import { UpdateOrderUseCase } from "@/app/functions/update-order"
import { DrizzleItemsRepository } from "../repositories/drizzle/drizzle-items-repository"
import { DrizzleOrdersRepository } from "../repositories/drizzle/drizzle-orders-repository"

export function makeCreateOrderUseCase() {
    const ordersRepository = new DrizzleOrdersRepository()
    const itemsRepository = new DrizzleItemsRepository()
    const createOrderUseCase = new CreateOrderUseCase(ordersRepository, itemsRepository)

    return createOrderUseCase
}

export function makeGetAllOrdersUseCase() {
    const ordersRepository = new DrizzleOrdersRepository()
    const getAllOrdersUseCase = new GetAllOrdersUseCase(ordersRepository)

    return getAllOrdersUseCase
}

export function makeGetOrderByIdUseCase() {
    const ordersRepository = new DrizzleOrdersRepository()
    const getOrderByIdUseCase = new GetOrderByIdUseCase(ordersRepository)

    return getOrderByIdUseCase
}

export function makeUpdateOrderUseCase() {
    const ordersRepository = new DrizzleOrdersRepository()
    const updateOrderUseCase = new UpdateOrderUseCase(ordersRepository)

    return updateOrderUseCase
}

export function makeDeleteOrderUseCase() {
    const ordersRepository = new DrizzleOrdersRepository()
    const deleteOrderUseCase = new DeleteOrderUseCase(ordersRepository)

    return deleteOrderUseCase
}