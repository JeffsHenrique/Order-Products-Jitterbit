import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { items } from "./items";
import { orders } from "./orders";

export const ordersToItems = pgTable(
    'OrdersToItems',
    {
        orderId: varchar('order_id').notNull().references(() => orders.orderId),
        productId: varchar('product_id').notNull().references(() => items.productId)
    },
    (t) => [
        primaryKey({
            columns: [
                t.orderId,
                t.productId
            ]
        })
    ]
)