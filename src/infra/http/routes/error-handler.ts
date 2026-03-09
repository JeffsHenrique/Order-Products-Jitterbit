import type { FastifyInstance } from "fastify"
import z, { ZodError } from "zod"
import { NoContentError } from "./_errors/no-content-error"
import { ResourceNotFoundError } from "./_errors/resource-not-found-error"
import { UnauthorizedError } from "./_errors/unauthorized-error"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: z.treeifyError(error).errors
        })
    }

    if (error instanceof UnauthorizedError) {
        return reply.status(401).send({ message: error.message })
    }

    if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NoContentError) {
        return reply.status(204).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error.' })
}