import { updateOrderInput } from "@/app/functions/update-order";
import { makeUpdateOrderUseCase } from "@/infra/factories/make-order-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const updateOrderRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().patch(
        '/order/:productId',
        {
            schema: {
                summary: 'Update an order by its id.',
                description: 'Update a specific order by its id.',
                tags: ['Order'],
                body: z.object({
                    valorTotal: z.number().optional()
                }),
                response: {
                    200: z
                        .object({
                            updatedOrder: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                totalValue: z.number(),
                                createdAt: z.coerce.date(),
                                updatedAt: z.coerce.date()
                            })
                        })
                        .describe('Order updated successfully.')
                        .meta({
                            examples: [
                                {
                                    updatedOrder: {
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
            const { valorTotal } = updateOrderInput.parse(request.body)

            const updateOrderUseCase = makeUpdateOrderUseCase()

            const data = await updateOrderUseCase.execute({
                valorTotal
            }, { orderId })

            return reply.status(200).send({
                updatedOrder: {
                    id: data.updatedOrder.id,
                    orderId: data.updatedOrder.orderId,
                    totalValue: data.updatedOrder.totalValue,
                    createdAt: data.updatedOrder.createdAt,
                    updatedAt: data.updatedOrder.updatedAt
                }
            })
        }
    )
}