import type { Order, OrderInsert } from "../drizzle/drizzle-types";
import type { OrdersRepository } from "../orders-repository";

export class InMemoryOrdersRepository implements OrdersRepository {
    public orders: Order[] = []
    private idCounter = 1

    async createOrder(data: OrderInsert): Promise<Order> {
        const order: Order = {
            id: this.idCounter++,
            orderId: data.orderId,
            totalValue: data.totalValue,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.orders.push(order)

        return order
    }

    async findOrderById(orderId: string): Promise<Order | null> {
        const order = this.orders.find(order => order.orderId === orderId)

        if (!order) {
            return null
        }

        return order
    }

    async findAllOrders(page: number, limit: number): Promise<Order[] | null> {
        const orders = this.orders
            .slice((page - 1) * limit, page * limit)

        if (!orders) {
            return null
        }

        return orders
    }

    async updateOrder(orderId: string, data: Partial<OrderInsert>): Promise<Order> {
        const order = this.orders.find(order => order.orderId === orderId)

        if (!order) {
            throw new Error("Order not found")
        }

        Object.assign(order, data)

        return order
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const order = this.orders.find(order => order.orderId === orderId)

        if (!order) {
            throw new Error("Order not found")
        }

        this.orders = this.orders.filter(order => order.orderId !== orderId)

        return order
    }
}