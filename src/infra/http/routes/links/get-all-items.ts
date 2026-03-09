import { makeGetAllItemsUseCase } from "@/infra/factories/make-item-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const getAllItemsRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/items/list',
        {
            schema: {
                summary: 'Get all items',
                description: 'Get all items.',
                tags: ['Item'],
                querystring: z.object({
                    page: z.coerce.number().default(1),
                    limit: z.coerce.number().default(10)
                }),
                response: {
                    200: z
                        .object({
                            items: z.array(
                                z.object({
                                    id: z.number(),
                                    orderId: z.string(),
                                    productId: z.string(),
                                    quantity: z.number(),
                                    price: z.number(),
                                    createdAt: z.date(),
                                    updatedAt: z.date()
                                })
                            )
                        })
                        .describe('Items found successfully.')
                        .meta({
                            examples: [
                                {
                                    items: [
                                        {
                                            id: 1,
                                            orderId: "1",
                                            productId: "1",
                                            quantity: 1,
                                            price: 1000,
                                            createdAt: new Date(),
                                            updatedAt: new Date()
                                        },
                                        {
                                            id: 2,
                                            orderId: "2",
                                            productId: "2",
                                            quantity: 1,
                                            price: 50,
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
            const { page, limit } = request.query as { page: number, limit: number }

            const getAllItemsUseCase = makeGetAllItemsUseCase()

            const data = await getAllItemsUseCase.execute({ page, limit })

            return reply.status(200).send({
                items: data.items.map(item => ({
                    id: item.id,
                    orderId: item.orderId ?? '',
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }))
            })
        }
    )
}