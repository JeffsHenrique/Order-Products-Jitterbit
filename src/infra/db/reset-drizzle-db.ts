import { reset } from "drizzle-seed"
import { db } from "."
import { schema } from "./schema"

async function resetDB() {
    console.log('🗑️ Clearing database...')
    await reset(db, schema)

    console.log('DB reseted successfully!')
}

resetDB().then(() => process.exit(0))