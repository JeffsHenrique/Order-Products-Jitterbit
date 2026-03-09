import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { items } from "./items";

export const orders = pgTable('Order', {
    id: serial('id').primaryKey(),
    orderId: varchar('order_id', { length: 100 }).unique().notNull(),
    totalValue: integer('total_value',).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
})

export const ordersRelation = relations(orders, ({ many }) => ({
    items: many(items)
}))