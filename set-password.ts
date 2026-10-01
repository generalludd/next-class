import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "./db"
import { users } from "./db/schema"

async function setPassword(username: string, password: string) {
  const hash = await bcrypt.hash(password, 10)
  await db
    .update(users)
    .set({ passwordHash: hash })
    .where(eq(users.username, username))
  console.log(`Password set for user: ${username}`)
}

const username = process.argv[2]
const password = process.argv[3]

if (!username || !password) {
  console.log("Usage: npx tsx set-password.ts <username> <password>")
  process.exit(1)
}

setPassword(username, password).then(() => process.exit(0))
