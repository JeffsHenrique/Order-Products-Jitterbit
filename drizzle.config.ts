import { env } from '@/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/infra/db/schema/*',
    out: './src/infra/db/migrations',
    dialect: 'postgresql',
    strict: true,
    verbose: true,
    dbCredentials: {
        url: env.DATABASE_URL,
    },
})