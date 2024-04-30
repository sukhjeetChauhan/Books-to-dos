import * as api from '../apis/apiClient'
import { useQuery } from '@tanstack/react-query'
import { Book, BookWithId } from '../../models/books'
import { useDeleteBook, useUpdateBookStatus } from './hooks'
import { useState } from 'react'

export default function TodoList() {
  const [id, setId] = useState(0)
  const deleteHook = useDeleteBook(id)
  const updateHook = useUpdateBookStatus()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => await api.getAllBooks(),
  })

  const list = data
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: API not found</p>
  }

  function handleDelete(e) {
    const id = e.target.closest('li').dataset.id
    // await api.delBookById(id)
    setId(id)
    deleteHook.mutate()
  }

  function handleCheck(e) {
    const id = e.target.id.at(-1)
    const status = String(e.target.checked)

    updateHook.mutate({ id: id, status: status })
  }

  if (list) {
    return (
      <section className="main">
        {/* <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label> */}
        <ul className="todo-list">
          {list.map((book: BookWithId) => (
            <li data-id={book.id} key={book.id}>
              <div className="view">
                <label htmlFor={`book${book.id}`} className="toggle">
                  Status
                </label>
                <input
                  onClick={handleCheck}
                  id={`book${book.id}`}
                  type="checkbox"
                />
                <p className="title">{book.title}</p>
                <span className="author">{book.author}</span>
                <span
                  className={`tag ${String(book.isRead) === 'true' ? 'green' : 'red'}`}
                >
                  {String(book.isRead) === 'true' ? 'READ' : 'NOT READ'}
                </span>
                <button onClick={handleDelete} className="destroy">
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
