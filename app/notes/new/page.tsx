"use client"

import { useActionState } from "react"
import { createNote } from "@/app/actions/notes"

const NewNote = () => {
  const [state, formAction] = useActionState(createNote, { error: "" })

  return (
    <div>
      <h2>Create a new note</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input type="text" name="content" />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" />
          </label>
        </div>

        <div>
          <label>
            Title
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" />
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="important" />
            Important
          </label>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewNote
