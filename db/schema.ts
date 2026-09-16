import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm/relations";

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
  name: text("name").notNull()
});
export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}))

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userID],
    references: [users.id],
  }),
}))
