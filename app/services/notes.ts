type Note = {
  id: number,
  content: string,
  important: boolean,
  author?: string,
  url?: string,
  likes?: number
}
const notes = [
  <Note>{ id: 1, content: "next.js utilizes React Server Components", important: true, author: "John Doe", url: "https://nextjs.org/docs/getting-started/react-essentials/react-server-components" },
  <Note>{ id: 2, content: "next.js is built on top of React", important: true, author: "John Doe", url: "https://nextjs.org/docs/getting-started/react-essentials/react-server-components" },
  <Note>{
    id: 3,
    content: "next.js supports both static and dynamic rendering",
    important: false,
    liked: false,
    url: "https://nextjs.org/docs/getting-started/react-essentials/react-server-components",
    author: "John Doe"
  },
]

let nextId = 4

export const getNotes = () => {
  return notes
}

export const addNote = (content: string, important: boolean) => {
  notes.push({ id: nextId++, content, important })
}

export const getNoteById = (id: number) => {
  return notes.find((note) => note.id === id)
}

export const toggleImportance = (id: number) => {
  const note = notes.find((note) => note.id === id)
  if (note) {
    note.important = !note.important
  }
}

export const toggleLike = (id: number, like: boolean) => {
  const note = notes.find((note) => note.id === id)
  if (note) {
    note.likes = like ? (note.likes || 0) + 1 : Math.max(0, (note.likes || 0) - 1);
  }
}
