import { CreateItemUseCase } from "@/app/functions/create-item";
import { DeleteItemUseCase } from "@/app/functions/delete-item";
import { GetAllItemsUseCase } from "@/app/functions/get-all-items";
import { GetItemByIdUseCase } from "@/app/functions/get-item-by-id";
import { UpdateItemUseCase } from "@/app/functions/update-item";
import { DrizzleItemsRepository } from "../repositories/drizzle/drizzle-items-repository";

export function makeCreateItemUseCase() {
    const itemsRepository = new DrizzleItemsRepository()
    const createItemsUseCase = new CreateItemUseCase(itemsRepository)

    return createItemsUseCase
}

export function makeGetAllItemsUseCase() {
    const itemsRepository = new DrizzleItemsRepository()
    const getAllItemsUseCase = new GetAllItemsUseCase(itemsRepository)

    return getAllItemsUseCase
}

export function makeGetItemByIdUseCase() {
    const itemsRepository = new DrizzleItemsRepository()
    const getItemByIdUseCase = new GetItemByIdUseCase(itemsRepository)

    return getItemByIdUseCase
}

export function makeUpdateItemUseCase() {
    const itemsRepository = new DrizzleItemsRepository()
    const updateItemUseCase = new UpdateItemUseCase(itemsRepository)

    return updateItemUseCase
}

export function makeDeleteItemUseCase() {
    const itemsRepository = new DrizzleItemsRepository()
    const deleteItemUseCase = new DeleteItemUseCase(itemsRepository)

    return deleteItemUseCase
}