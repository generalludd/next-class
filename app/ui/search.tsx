import Form from "next/form"
import "./search.css"

export default function Search({
  placeholder,
  query,
  important,
  liked,
}: {
  placeholder: string
  query?: string
  important?: string
  liked?: string
}) {
  return (
    <Form action="/notes" data-id="search-form">
      <label htmlFor="search" data-id="search-label">
        Search
      </label>
      <input
        id="search"
        name="query"
        defaultValue={query}
        placeholder={placeholder}
        data-id="search-input"
      />

      {/* Keep the other filters alive across a search submit */}
      {important && <input type="hidden" name="important" value={important} />}
      {liked && <input type="hidden" name="liked" value={liked} />}

      <button type="submit" data-id="search-submit">
        Search
      </button>
    </Form>
  )
}
