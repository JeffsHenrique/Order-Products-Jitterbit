import type { JWT } from "@fastify/jwt";

declare module 'fastify' {
    type Authenticate = (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    type Authorize = (request: FastifyRequest, reply: FastifyReply) => Promise<void>

    type payload = {
        user: {
            id: number
            email: string
            name: string
        }
    }

    interface FastifyRequest {
        jwt: JWT
        adminUser: {
            payload: payload
        }
    }
    interface FastifyInstance {
        authenticate: Authenticate
        verifyAdmin: Authorize
    }

    interface FastifyContextConfig {
        allowedRoles?: string[]
    }
}