import { db } from "@/infra/db";
import { items } from "@/infra/db/schema/items";
import { eq } from "drizzle-orm";
import type { ItemsRepository } from "../items-repository";
import type { Item, ItemInsert } from "./drizzle-types";

export class DrizzleItemsRepository implements ItemsRepository {
    async createItem(data: ItemInsert): Promise<Item> {
        const [item] = await db
            .insert(items)
            .values(data)
            .returning()

        return item
    }

    async findItemById(productId: string): Promise<Item | null> {
        const [item] = await db
            .select()
            .from(items)
            .where(eq(items.productId, productId))

        return item
    }

    async findAllItems(page: number, limit: number): Promise<Item[] | null> {
        const getItems = await db.query.items.findMany({
            orderBy: (items, { asc }) => asc(items.productId),
            limit,
            offset: (page - 1) * limit
        })

        return getItems
    }

    async updateItem(productId: string, data: Partial<ItemInsert>): Promise<Item> {
        const [item] = await db
            .update(items)
            .set(data)
            .where(eq(items.productId, productId))
            .returning()

        return item
    }

    async deleteItem(productId: string): Promise<Item> {
        const [item] = await db
            .delete(items)
            .where(eq(items.productId, productId))
            .returning()

        return item
    }
}