import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    URL: z.string().default('http://localhost:3333'),
    DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
    COOKIE_SECRET: z.string(),
    ALLOWED_ORIGINS: z.string().default('http://localhost:5174')
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid environment variables', z.treeifyError(_env.error))

    throw new Error('Invalid environment variables.')
}

export const env = _env.data