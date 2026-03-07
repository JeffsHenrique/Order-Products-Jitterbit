import { env } from "@/env";
import { JwtTokenGenerator } from "@/infra/repositories/token/jwt-token-generator";
import fCookie from '@fastify/cookie';
import fjwt from '@fastify/jwt';
import type { FastifyInstance } from "fastify";
import { makeAuthenticateHook } from "../hooks/authenticate";

export const initializeJWT = (app: FastifyInstance) => {
    const tokenGenerator = new JwtTokenGenerator(env.JWT_SECRET_KEY)
    const authenticate = makeAuthenticateHook(tokenGenerator)

    // jwt
    app.register(fjwt, {
        secret: env.JWT_SECRET_KEY
    })

    // JWT Pre-Handler
    app.addHook('preHandler', (request, _, next) => {
        request.jwt = app.jwt
        return next()
    })

    // cookies
    app.register(fCookie, {
        secret: env.COOKIE_SECRET,
        hook: 'preHandler'
    })

    // Authentication
    app.decorate('authenticate', authenticate)
}