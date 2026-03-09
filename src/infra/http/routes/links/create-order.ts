import { createOrderInput } from "@/app/functions/create-order";
import { makeCreateOrderUseCase } from "@/infra/factories/make-order-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const createOrderRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/order',
        {
            schema: {
                summary: 'Create an order.',
                description: 'Create a new order.',
                tags: ['Order'],
                body: z.object({
                    numeroPedido: z.string({ error: 'numeroPedido is required.' }),
                    valorTotal: z.number({ error: 'valorTotal is required.' }),
                    dataCriacao: z.coerce.date({ error: 'dataCriacao is required.' }),
                    items: z.array(
                        z.object({
                            idItem: z.string({ error: 'idItem is required.' }),
                            quantidadeItem: z.number({ error: 'quantidadeItem is required.' }),
                            valorItem: z.number({ error: 'valorItem is required.' })
                        })
                    )
                }),
                response: {
                    201: z
                        .object({
                            order: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                totalValue: z.number(),
                                createdAt: z.coerce.date(),
                                updatedAt: z.coerce.date()
                            }),
                            items: z.array(
                                z.object({
                                    id: z.number(),
                                    orderId: z.string(),
                                    productId: z.string(),
                                    quantity: z.number(),
                                    price: z.number(),
                                    createdAt: z.coerce.date(),
                                    updatedAt: z.coerce.date()
                                })
                            )
                        })
                        .describe('Order created successfully.')
                        .meta({
                            examples: [
                                {
                                    order: {
                                        id: 1,
                                        orderId: "1",
                                        totalValue: 150,
                                        createdAt: new Date(),
                                        updatedAt: new Date()
                                    },
                                    items: [
                                        {
                                            id: 1,
                                            orderId: "1",
                                            productId: "1",
                                            quantity: 1,
                                            price: 1000,
                                            createdAt: new Date(),
                                            updatedAt: new Date()
                                        }
                                    ]
                                }
                            ]
                        })
                },
            },
        },
        async (request, reply) => {
            const { numeroPedido, valorTotal, dataCriacao, items } = createOrderInput.parse(request.body)

            const createOrderUseCase = makeCreateOrderUseCase()

            const result = await createOrderUseCase.execute({
                numeroPedido,
                valorTotal,
                dataCriacao,
                items
            })

            const itemsResult = result.items.map(item => ({
                id: item.id,
                orderId: item.orderId ?? '',
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }))

            return reply.status(201).send({
                order: result.order,
                items: itemsResult
            })
        }
    )
}