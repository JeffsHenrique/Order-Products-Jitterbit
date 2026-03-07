import type { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UnauthorizedError } from "../_errors/unauthorized-error";

export const authenticationCheckRoute: FastifyPluginAsyncZod = async app => {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/privateping',
        {
            onRequest: [app.authenticate],
            schema: {
                summary: 'Private Health check route.',
                description: 'Check if the server is running and if the user is authenticated.',
                tags: ['Private Health'],
                response: {
                    200:
                        z.object({
                            pong: z.boolean(),
                            user: z.object({
                                id: z.number(),
                                email: z.string(),
                                name: z.string(),
                            })
                        })
                            .describe('OK')
                            .meta({
                                examples: [
                                    {
                                        pong: true,
                                        user: {
                                            id: 1,
                                            email: 'admin@example.com',
                                            name: 'Admin'
                                        }
                                    }
                                ]
                            }),
                    401:
                        z.object({
                            message: z.string()
                        })
                            .describe('Unauthorized')
                            .meta({
                                examples: [
                                    {
                                        message: "Unauthorized."
                                    }
                                ]
                            })
                },
            },
            config: { allowedRoles: ['admin'] },
        },
        async (request, reply) => {
            try {
                const user = request.user as {
                    id: number,
                    email: string,
                    name: string,
                } | undefined

                await reply.status(200).send({
                    pong: true,
                    user: user ?? {
                        id: 0,
                        email: '',
                        name: ''
                    }
                })
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    return reply.status(401).send({ message: error.message })
                }

                console.error(error)
            }
        }
    )
}