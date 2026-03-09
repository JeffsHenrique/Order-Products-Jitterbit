import { makeItems } from "@/test/factories/make-items";
import { makeCreateItemUseCase } from "../factories/make-item-use-case";

async function seed() {
    const createItem = makeCreateItemUseCase()

    await createItem.execute({
        idItem: "2434",
        quantidadeItem: 1,
        valorItem: 1000
    })

    console.log({ message: 'Item de exemplo criado ✅' })

    const items = await makeItems(10)

    for (const item of items) {
        await createItem.execute({
            idItem: item.productId,
            quantidadeItem: item.quantity,
            valorItem: item.price
        })
    }

    console.log({ message: 'Items criados ✅' })

    return {
        message: 'Seed realizado com sucesso'
    }
}

seed().then(() => {
    process.exit(0)
}).catch((error) => {
    console.error(error)
    process.exit(1)
})