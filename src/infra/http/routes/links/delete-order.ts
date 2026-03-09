import { makeDeleteOrderUseCase } from "@/infra/factories/make-order-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteOrderRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/order/:orderId',
        {
            schema: {
                summary: 'Delete an order by its id.',
                description: 'Delete a specific order by its id.',
                tags: ['Order'],
                response: {
                    200: z
                        .object({
                            deletedOrder: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                totalValue: z.number(),
                                createdAt: z.coerce.date(),
                                updatedAt: z.coerce.date()
                            })
                        })
                        .describe('Order deleted successfully.')
                        .meta({
                            examples: [
                                {
                                    deletedOrder: {
                                        id: 1,
                                        orderId: "1",
                                        totalValue: 1000,
                                        createdAt: new Date(),
                                        updatedAt: new Date()
                                    }
                                }
                            ]
                        })
                },
            },
        },
        async (request, reply) => {
            const { orderId } = request.params as { orderId: string }

            const deleteOrderUseCase = makeDeleteOrderUseCase()

            const data = await deleteOrderUseCase.execute({ orderId })

            return reply.status(200).send({
                deletedOrder: {
                    id: data.deletedOrder.id,
                    orderId: data.deletedOrder.orderId,
                    totalValue: data.deletedOrder.totalValue,
                    createdAt: data.deletedOrder.createdAt,
                    updatedAt: data.deletedOrder.updatedAt
                }
            })
        }
    )
}