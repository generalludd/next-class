import { notFound } from "next/navigation"
import { getNoteById } from "../../services/notes"
import { toggleNoteImportance, toggleNoteLike } from "../../actions/notes"

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const note = getNoteById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div>
      <h2>{note.content}</h2>
        <p>{note.important ? "Important" : "Not important"}</p>
        {note.author && (
  <p>
    {note.url ? (
      <a href={note.url} target="_blank" rel="noopener noreferrer">
        By {note.author}
      </a>
    ) : (
      <>By {note.author}</>
    )}
  </p>
)}
      <p>{note.likes ? `Likes: ${note.likes}` : "No likes"}</p>
      <form action={toggleNoteImportance}>
        <input type="hidden" name="id" value={note.id} />
        <button type="submit">
          {note.important ? "Mark as not important" : "Mark as important"}
        </button>
      </form>
      <form action={toggleNoteLike}>
        <input type="hidden" name="id" value={note.id} />
        <input type="hidden" name="like" value={note.likes && note.likes > 0 ? "off" : "on"} />
        <button type="submit">
          {note.likes && note.likes > 0 ? "Unlike" : "Like"}
        </button>
      </form>
    </div>
  )
}

export default NotePage
