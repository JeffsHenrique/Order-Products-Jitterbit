import { makeGetItemByIdUseCase } from "@/infra/factories/make-item-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const getItemByIdRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/item/:itemId',
        {
            schema: {
                summary: 'Get item by id',
                description: 'Get item by id.',
                tags: ['Item'],
                response: {
                    200: z
                        .object({
                            item: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                productId: z.string(),
                                quantity: z.number(),
                                price: z.number(),
                                createdAt: z.date(),
                                updatedAt: z.date()
                            })
                        })
                        .describe('Item found successfully.')
                        .meta({
                            examples: [
                                {
                                    id: 1,
                                    orderId: "1",
                                    productId: "1",
                                    quantity: 1,
                                    price: 1000,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                },
                            ]
                        })
                },
            },
        },
        async (request, reply) => {
            const { itemId } = request.params as { itemId: string }

            const getItemByIdUseCase = makeGetItemByIdUseCase()

            const data = await getItemByIdUseCase.execute({ itemId })

            return reply.status(200).send({
                item: {
                    id: data.item.id,
                    orderId: data.item.orderId ?? '',
                    productId: data.item.productId,
                    quantity: data.item.quantity,
                    price: data.item.price,
                    createdAt: data.item.createdAt,
                    updatedAt: data.item.updatedAt
                }
            })
        }
    )
}