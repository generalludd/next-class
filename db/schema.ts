import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  important: boolean("important").notNull().default(false),
  author: text("author"),
  url: text("url"),
  likes: serial("likes").default(0),
  userID: integer("userID").references(() => users.id)
});
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
});
