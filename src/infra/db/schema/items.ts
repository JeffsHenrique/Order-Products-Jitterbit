import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const items = pgTable('Items', {
    id: serial('id').primaryKey(),
    productId: varchar('product_id', { length: 50 }).unique().notNull(),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
    orderId: varchar('order_id').references(() => orders.orderId, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
})

export const itemsRelations = relations(items, ({ one }) => ({
    order: one(orders, {
        fields: [items.orderId],
        references: [orders.orderId]
    })
}))