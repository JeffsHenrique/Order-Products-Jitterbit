import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const healthCheckRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/ping',
        {
            schema: {
                summary: 'Health check route.',
                description: 'Check if the server is running.',
                tags: ['Health'],
                response: {
                    200:
                        z.object({
                            pong: z.boolean()
                        })
                            .describe('OK')
                },
            },
        },
        async (_, reply) => {
            return await reply.status(200).send({ pong: true })
        }
    )
}