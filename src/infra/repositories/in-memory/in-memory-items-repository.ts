import type { Item, ItemInsert } from "../drizzle/drizzle-types";
import type { ItemsRepository } from "../items-repository";

export class InMemoryItemsRepository implements ItemsRepository {
    public items: Item[] = []
    private idCounter = 1

    async createItem(data: ItemInsert): Promise<Item> {
        const item: Item = {
            id: this.idCounter++,
            orderId: data.orderId || null,
            productId: data.productId,
            quantity: data.quantity,
            price: data.price,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.items.push(item)

        return item
    }

    async findItemById(productId: string): Promise<Item | null> {
        const item = this.items.find(item => item.productId === productId)

        if (!item) {
            return null
        }

        return item
    }

    async findAllItems(page: number, limit: number): Promise<Item[] | null> {
        const items = this.items
            .slice((page - 1) * limit, page * limit)

        if (!items) {
            return null
        }

        return items
    }

    async updateItem(productId: string, data: Partial<ItemInsert>): Promise<Item> {
        const item = this.items.find(item => item.productId === productId)

        if (!item) {
            throw new Error('Item not found.')
        }

        Object.assign(item, data)

        return item
    }

    async deleteItem(productId: string): Promise<Item> {
        const item = this.items.find(item => item.productId === productId)

        if (!item) {
            throw new Error('Item not found.')
        }

        this.items = this.items.filter(item => item.productId !== productId)

        return item
    }
}