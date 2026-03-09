import type { items } from "@/infra/db/schema/items";
import type { orders } from "@/infra/db/schema/orders";

export type Order = typeof orders.$inferSelect
export type OrderInsert = typeof orders.$inferInsert

export type Item = typeof items.$inferSelect
export type ItemInsert = typeof items.$inferInsert