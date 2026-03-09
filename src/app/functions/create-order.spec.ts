import { NoContentError } from "@/infra/http/routes/_errors/no-content-error"
import { ResourceNotFoundError } from "@/infra/http/routes/_errors/resource-not-found-error"
import { InMemoryItemsRepository } from "@/infra/repositories/in-memory/in-memory-items-repository"
import { InMemoryOrdersRepository } from "@/infra/repositories/in-memory/in-memory-orders-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateOrderUseCase } from "./create-order"

describe('create order', () => {
    let ordersRepository: InMemoryOrdersRepository
    let itemsRepository: InMemoryItemsRepository
    let sut: CreateOrderUseCase

    beforeEach(() => {
        ordersRepository = new InMemoryOrdersRepository()
        itemsRepository = new InMemoryItemsRepository()
        sut = new CreateOrderUseCase(ordersRepository, itemsRepository)
    })

    it('should be able to create a new order', async () => {
        const itemsData = [
            {
                idItem: "1",
                quantidadeItem: 1,
                valorItem: 1000
            },
            {
                idItem: "2",
                quantidadeItem: 1,
                valorItem: 50
            },
            {
                idItem: "3",
                quantidadeItem: 1,
                valorItem: 500
            },
        ]

        for (const item of itemsData) {
            await itemsRepository.createItem({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            })
        }

        const orderData = {
            numeroPedido: "1",
            valorTotal: 150,
            dataCriacao: new Date()
        }

        const order = await sut.execute({
            ...orderData,
            items: itemsData
        })

        expect(order).toEqual({
            order: {
                id: 1,
                orderId: "1",
                totalValue: 150,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            },
            items: [
                {
                    id: 1,
                    orderId: "1",
                    productId: "1",
                    quantity: 1,
                    price: 1000,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                },
                {
                    id: 2,
                    orderId: "1",
                    productId: "2",
                    quantity: 1,
                    price: 50,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                },
                {
                    id: 3,
                    orderId: "1",
                    productId: "3",
                    quantity: 1,
                    price: 500,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                }
            ]
        })
    })

    it('should not be able to create an order if the item does not exist', async () => {
        const orderData = {
            numeroPedido: "1",
            valorTotal: 150,
            dataCriacao: new Date(),
            items: [
                {
                    idItem: "1",
                    quantidadeItem: 1,
                    valorItem: 1000
                }
            ]
        }

        await expect(() =>
            sut.execute(orderData)
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to create an order with no items', async () => {
        const orderData = {
            numeroPedido: "1",
            valorTotal: 150,
            dataCriacao: new Date(),
            items: []
        }

        await expect(() =>
            sut.execute(orderData)
        ).rejects.toBeInstanceOf(NoContentError)
    })
})