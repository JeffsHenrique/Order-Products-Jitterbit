import { db } from "@/infra/db";
import { orders } from "@/infra/db/schema/orders";
import { eq } from "drizzle-orm";
import type { OrdersRepository } from "../orders-repository";
import type { Order, OrderInsert } from "./drizzle-types";

export class DrizzleOrdersRepository implements OrdersRepository {
    async createOrder(data: OrderInsert): Promise<Order> {
        const [order] = await db
            .insert(orders)
            .values(data)
            .returning()

        return order
    }

    async findOrderById(orderId: string): Promise<Order | null> {
        const [order] = await db
            .select()
            .from(orders)
            .where(eq(orders.orderId, orderId))

        return order
    }

    async findAllOrders(page: number, limit: number): Promise<Order[] | null> {
        const getOrders = await db.query.orders.findMany({
            orderBy: (orders, { asc }) => asc(orders.orderId),
            limit,
            offset: (page - 1) * limit
        })

        return getOrders
    }

    async updateOrder(orderId: string, data: Partial<OrderInsert>): Promise<Order> {
        const [order] = await db
            .update(orders)
            .set(data)
            .where(eq(orders.orderId, orderId))
            .returning()

        return order
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const [order] = await db
            .delete(orders)
            .where(eq(orders.orderId, orderId))
            .returning()

        return order
    }
}