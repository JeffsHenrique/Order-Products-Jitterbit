import type { TokenGenerator } from "@/infra/repositories/token-generator";
import type { FastifyRequest } from "fastify";
import { UnauthorizedError } from "../routes/_errors/unauthorized-error";

export function makeAuthenticateHook(tokenGenerator: TokenGenerator) {
    return async function authenticate(request: FastifyRequest) {
        try {
            const authHeader = request.headers.authorization

            if (!authHeader) {
                throw new UnauthorizedError()
            }

            const [, token] = authHeader.split('Bearer ')

            if (!token) {
                throw new UnauthorizedError()
            }

            const payload = await tokenGenerator.verify(token)

            request.user = {
                id: payload.id as number,
                email: payload.email as string,
                name: payload.name as string
            }
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                throw new UnauthorizedError()
            }

            throw new UnauthorizedError()
        }
    }
}