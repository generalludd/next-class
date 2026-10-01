"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { addNote, toggleImportance, toggleLike } from "../services/notes"

export const createNote = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const content = formData.get("content") as string
  if (!content || content.length < 10) {
    return { error: "Note content must be at least 10 characters long" }
  }
  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    return { error: "Author name must be at least 5 characters long" }
  }
  const url = formData.get("url") as string
  if (url && !url.startsWith("http")) {
    return { error: "Invalid URL format" }
  }

  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long" }
  }

  const important = formData.get("important") === "on"
  await addNote(content, important, author, title, url)

  revalidatePath("/notes")
  redirect("/notes")
}

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await toggleImportance(id)
  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}


export const toggleNoteLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  const like = formData.get("like") === "on"
  await toggleLike(id, like)
  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}

