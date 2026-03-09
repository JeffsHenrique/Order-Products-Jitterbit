import { makeGetAllOrdersUseCase } from "@/infra/factories/make-order-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const getAllOrdersRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/order/list',
        {
            schema: {
                summary: 'Get all orders',
                description: 'Get all orders.',
                tags: ['Order'],
                querystring: z.object({
                    page: z.coerce.number().default(1),
                    limit: z.coerce.number().default(10)
                }),
                response: {
                    200: z
                        .object({
                            orders: z.array(
                                z.object({
                                    id: z.number(),
                                    orderId: z.string(),
                                    totalValue: z.number(),
                                    createdAt: z.date(),
                                    updatedAt: z.date()
                                })
                            )
                        })
                        .describe('Orders found successfully.')
                        .meta({
                            examples: [
                                {
                                    orders: [
                                        {
                                            id: 1,
                                            orderId: "1",
                                            totalValue: 1000,
                                            createdAt: new Date(),
                                            updatedAt: new Date()
                                        },
                                        {
                                            id: 2,
                                            orderId: "2",
                                            totalValue: 2000,
                                            createdAt: new Date(),
                                            updatedAt: new Date()
                                        }
                                    ]
                                    // items: [
                                    //     {
                                    //         id: 1,
                                    //         orderId: "1",
                                    //         productId: "1",
                                    //         quantity: 1,
                                    //         price: 1000,
                                    //         createdAt: new Date(),
                                    //         updatedAt: new Date()
                                    //     }
                                    // ]
                                }
                            ]
                        })
                },
            },
        },
        async (request, reply) => {
            const { page, limit } = request.query as { page: number, limit: number }

            const getAllOrdersUseCase = makeGetAllOrdersUseCase()

            const data = await getAllOrdersUseCase.execute({ page, limit })

            return reply.status(200).send({
                orders: data.orders.map(order => ({
                    id: order.id,
                    orderId: order.orderId,
                    totalValue: order.totalValue,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt
                }))
            })
        }
    )
}