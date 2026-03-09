import type { Order, OrderInsert } from "./drizzle/drizzle-types";

export interface OrdersRepository {
    createOrder(data: OrderInsert): Promise<Order>
    findOrderById(orderId: string): Promise<Order | null>
    findAllOrders(page: number, limit: number): Promise<Order[] | null>
    updateOrder(orderId: string, data: Partial<OrderInsert>): Promise<Order>
    deleteOrder(orderId: string): Promise<Order>
}