import { updateItemInput } from "@/app/functions/update-item";
import { makeUpdateItemUseCase } from "@/infra/factories/make-item-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const updateItemRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().patch(
        '/item/:productId',
        {
            schema: {
                summary: 'Update an item by its id.',
                description: 'Update a specific item by its id.',
                tags: ['Item'],
                body: z.object({
                    orderId: z.string().optional(),
                    price: z.number().optional(),
                    quantity: z.number().optional(),
                }),
                response: {
                    200: z
                        .object({
                            updatedItem: z.object({
                                id: z.number(),
                                orderId: z.string(),
                                productId: z.string(),
                                quantity: z.number(),
                                price: z.number(),
                                createdAt: z.coerce.date(),
                                updatedAt: z.coerce.date()
                            })
                        })
                        .describe('Item updated successfully.')
                        .meta({
                            examples: [
                                {
                                    updatedItem: {
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
            const { orderId, price, quantity } = updateItemInput.parse(request.body)

            const updateItemUseCase = makeUpdateItemUseCase()

            const data = await updateItemUseCase.execute({
                orderId,
                price,
                quantity
            }, { productId })

            return reply.status(200).send({
                updatedItem: {
                    id: data.updatedItem.id,
                    orderId: data.updatedItem.orderId ?? '',
                    productId: data.updatedItem.productId,
                    quantity: data.updatedItem.quantity,
                    price: data.updatedItem.price,
                    createdAt: data.updatedItem.createdAt,
                    updatedAt: data.updatedItem.updatedAt
                }
            })
        }
    )
}