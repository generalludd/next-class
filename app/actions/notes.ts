"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addNote, toggleLike } from "../services/notes"
import { toggleImportance } from "../services/notes"
import { auth } from "@/auth"

export const createNote = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const content = formData.get("content") as string
  const important = formData.get("important") === "on"
  addNote(content, important)
  revalidatePath("/notes")
  redirect("/notes")
}
export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  toggleImportance(id)
  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}

export const toggleNoteLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  toggleLike(id, formData.get("like") === "on")
  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}
