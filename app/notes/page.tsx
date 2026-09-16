import Link from "next/link"
import { getNotes } from "../services/notes"
import Search  from "../ui/search"

const Notes = async ({
  searchParams,
}: {
  searchParams: Promise<{ important?: string, liked?: string, query?: string }>
}) => {
  const { important, liked, query } = await searchParams
  const showImportant = important === "true"
  const showLiked = liked === "true"
  const allNotes = getNotes()
  let notes = showLiked
    ? allNotes.filter((note) =>  note.likes && note.likes > 0)
    : allNotes

  // Additionally filter the notes by importance if the "important" query parameter is set to "true"
  if (showImportant) {
    notes = notes.filter((note) => note.important)
  }
  // Limit the list to terms that match the filter query parameter if it is provided
  if (query) {
    notes = notes.filter((note) => note.content.toLowerCase().includes(query.toLowerCase()))
  }
  // Sort the notes by importance, with important notes first
  notes.sort((a, b) => {
    if (a.important && !b.important) return -1
    if (!a.important && b.important) return 1
    return 0
  })

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <Link href="/notes?important=true">
           show important only
        </Link>
        {" | "}
        <Link href="/notes?liked=true">
          show liked only
        </Link>
        {" | "}
        <Link href="/notes">Show All</Link>
        <Search
          placeholder="Search notes..."
          query={query}
          important={important}
          liked={liked}
        />
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.content}</Link>
            {note.likes && note.likes > 0 && <strong> (liked)</strong>}
            {note.important && <strong> (important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Notes
