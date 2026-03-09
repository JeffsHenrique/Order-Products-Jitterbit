import type { Item, ItemInsert } from "./drizzle/drizzle-types";

export interface ItemsRepository {
    createItem(data: ItemInsert): Promise<Item>
    findItemById(productId: string): Promise<Item | null>
    findAllItems(page: number, limit: number): Promise<Item[] | null>
    updateItem(productId: string, data: Partial<ItemInsert>): Promise<Item>
    deleteItem(productId: string): Promise<Item>
}