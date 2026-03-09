import type { OrderInsert } from "@/infra/repositories/drizzle/drizzle-types";
import { fakerPT_BR as faker } from '@faker-js/faker';
import { uuidv7 } from 'uuidv7';

export async function makeRandomOrder(qnt: number) {
    const newOrder: OrderInsert = {
        id: qnt + 1,
        orderId: uuidv7(),
        totalValue: 10000,
    }

    return newOrder
}

export async function makeOrders(qnt: number) {
    const orderPromises = faker.helpers.multiple((_, i) => makeRandomOrder(i), { count: qnt })
    const orders = await Promise.all(orderPromises)

    return orders
}