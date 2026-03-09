import type { ItemInsert } from "@/infra/repositories/drizzle/drizzle-types";
import { fakerPT_BR as faker } from '@faker-js/faker';
import { uuidv7 } from 'uuidv7';

export async function makeRandomItem(qnt: number) {
    const newItem: ItemInsert = {
        id: qnt + 1,
        productId: uuidv7(),
        quantity: 1,
        price: 1000
    }

    return newItem
}

export async function makeItems(qnt: number) {
    const itemPromises = faker.helpers.multiple((_, i) => makeRandomItem(i), { count: qnt })
    const items = await Promise.all(itemPromises)

    return items
}