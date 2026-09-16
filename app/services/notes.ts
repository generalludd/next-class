import { eq } from "drizzle-orm"
import { db } from "../../db"
import { notes } from "../../db/schema"
type Note = {
  id: number,
  content: string,
  important: boolean,
  author?: string,
  url?: string,
  likes?: number
}


export const getNotes = async () => {
  return await db.query.notes.findMany() as Note[];
}

export const addNote = async (content: string, important: boolean) => {
  return db.insert(notes).values({ content, important })
}

export const getNoteById = async (id: number) => {
  const [note] = await db.select().from(notes).where(eq(notes.id, id))
  return note as Note | undefined
}

export const toggleImportance = async (id: number) => {
  const note = await getNoteById(id);
  if (!note) {
    throw new Error(`Note with id ${id} not found`);
  }
  if (note) {
    note.important = !note.important
  }

  // Now save the note to the database.
  await db.update(notes).set({ important: note.important }).where(eq(notes.id, id));
}

export const toggleLike = async (id: number, like: boolean) => {
  const note = await getNoteById(id) as Note | undefined;
  if (note) {
    note.likes = like ? (note.likes || 0) + 1 : Math.max(0, (note.likes || 0) - 1);
    // Now save the note to the database.
    await db.update(notes).set({ likes: note.likes }).where(eq(notes.id, id));
  }
}
