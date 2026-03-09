import { createItemInput } from "@/app/functions/create-item";
import { makeCreateItemUseCase } from "@/infra/factories/make-item-use-case";
import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const createItemRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/items/create-item',
        {
            schema: {
                summary: 'Create item route.',
                description: 'Create a new item.',
                tags: ['Item'],
                body: z.object({
                    idItem: z.string({ error: 'idItem is required.' }),
                    quantidadeItem: z.number({ error: 'quantidadeItem is required.' }),
                    valorItem: z.number({ error: 'valorItem is required.' })
                }),
                response: {
                    201: z
                        .object({
                            newItem: z.object({
                                id: z.number(),
                                idItem: z.string(),
                                quantidadeItem: z.number(),
                                valorItem: z.number()
                            })
                        })
                        .describe('Item created successfully.')
                        .meta({
                            examples: [
                                {
                                    newItem: {
                                        id: 1,
                                        idItem: "1",
                                        quantidadeItem: 1,
                                        valorItem: 1000
                                    }
                                }
                            ]
                        })
                },
            },
        },
        async (request, reply) => {
            const { idItem, quantidadeItem, valorItem } = createItemInput.parse(request.body)

            const createItemUseCase = makeCreateItemUseCase()

            const result = await createItemUseCase.execute({
                idItem,
                quantidadeItem,
                valorItem
            })

            return reply.status(201).send({
                newItem: {
                    id: result.newItem.id,
                    idItem: result.newItem.productId,
                    quantidadeItem: result.newItem.quantity,
                    valorItem: result.newItem.price
                }
            })
        }
    )
}