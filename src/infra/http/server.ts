import { env } from "@/env";
import { errorHandler } from "@/infra/http/routes/error-handler";
import { initializeJWT } from "@/infra/http/routes/jwt-authenticate";
import { fastifyAuth } from '@fastify/auth';
import fastifyCors from "@fastify/cors";
import { fastifySwagger } from '@fastify/swagger';
import scalarUI from '@scalar/fastify-api-reference';
import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";

// Routes
import { healthCheckRoute } from "./routes/health/health-check";
import { authenticationCheckRoute } from "./routes/health/private-health-check";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
})

initializeJWT(app)
app.register(fastifyAuth)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Order Products API',
            description: 'A simple API to order products',
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform,
    hideUntagged: true
})

app.get('/openapi.json', () => app.swagger())

app.register(scalarUI, {
    routePrefix: '/api-docs',
    configuration: {
        layout: 'modern',
        theme: 'BluePlanet'
    }
})

// Health
app.register(healthCheckRoute)
app.register(authenticationCheckRoute)

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach(signal => {
    process.on(signal, async () => {
        await app.close()
        process.exit()
    })
})

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`🚀 Server is running on ${env.PORT}`)
})