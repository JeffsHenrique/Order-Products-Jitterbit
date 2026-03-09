import { makeGetOrderByIdUseCase } from "@/infra/factories/make-order-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const getOrderByIdRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/order/:orderId',
        {
            schema: {
                summary: 'Get order by id',
                description: 'Get order by id.',
                tags: ['Order'],
                response: {
                    200: z
                        .object({
                            order: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                totalValue: z.number(),
                                createdAt: z.date(),
                                updatedAt: z.date()
                            })
                        })
                        .describe('Order found successfully.')
                        .meta({
                            examples: [
                                {
                                    id: 1,
                                    orderId: "1",
                                    totalValue: 1000,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                },
                            ]
                        })
                },
            },
        },
        async (request, reply) => {
            const { orderId } = request.params as { orderId: string }

            const getOrderByIdUseCase = makeGetOrderByIdUseCase()

            const data = await getOrderByIdUseCase.execute({ orderId })

            return reply.status(200).send({
                order: {
                    id: data.order.id,
                    orderId: data.order.orderId,
                    totalValue: data.order.totalValue,
                    createdAt: data.order.createdAt,
                    updatedAt: data.order.updatedAt
                }
            })
        }
    )
}