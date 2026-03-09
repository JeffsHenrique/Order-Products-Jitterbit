import { makeDeleteItemUseCase } from "@/infra/factories/make-item-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteItemRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/item/:productId',
        {
            schema: {
                summary: 'Delete an item by its id.',
                description: 'Delete a specific item by its id.',
                tags: ['Item'],
                response: {
                    200: z
                        .object({
                            deletedItem: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                productId: z.string(),
                                quantity: z.number(),
                                price: z.number(),
                                createdAt: z.coerce.date(),
                                updatedAt: z.coerce.date()
                            })
                        })
                        .describe('Item deleted successfully.')
                        .meta({
                            examples: [
                                {
                                    deletedItem: {
                                        id: 1,
                                        orderId: "1",
                                        productId: "1",
                                        quantity: 1,
                                        price: 1000,
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
            const { productId } = request.params as { productId: string }

            const deleteItemUseCase = makeDeleteItemUseCase()

            const data = await deleteItemUseCase.execute({ productId })

            return reply.status(200).send({
                deletedItem: {
                    id: data.deletedItem.id,
                    orderId: data.deletedItem.orderId ?? '',
                    productId: data.deletedItem.productId,
                    quantity: data.deletedItem.quantity,
                    price: data.deletedItem.price,
                    createdAt: data.deletedItem.createdAt,
                    updatedAt: data.deletedItem.updatedAt
                }
            })
        }
    )
}