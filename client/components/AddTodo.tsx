import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import * as api from '../apis/apiClient'
import { Book } from '../../models/books'
import { useAddBook } from './hooks'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const [input, setInput] = useState({
    title: '',
    author: '',
    isRead: 'false',
  })
  // const client = useQueryClient()
  // const mutation = useMutation({
  //   mutationFn: async (data: Book) => await api.addBook(data),
  //   onSuccess: async () => {
  //     client.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })

  const mutation = useAddBook()

  async function handleSubmit(e: { preventDefault: () => void; target: any }) {
    e.preventDefault()

    mutation.mutate(input)
    setInput({
      title: '',
      author: '',
      isRead: 'false',
    })
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        onChange={handleChange}
        className="new-todo"
        placeholder="What book do you want to read?"
        value={input.title}
      />
      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        onChange={handleChange}
        className="new-todo"
        placeholder="Author"
        value={input.author}
      />
      <fieldset className="new-todo">
        <legend>
          <input
            type="radio"
            name="isRead"
            id="read"
            onChange={handleChange}
            value="true"
          />
          <label htmlFor="read">Read</label>
          <input
            type="radio"
            name="isRead"
            id="notRead"
            onChange={handleChange}
            value="false"
          />
          <label htmlFor="notRead">Not Read</label>
        </legend>
      </fieldset>
      <button className="submitButton">Submit</button>
    </form>
  )
}

export default AddTodo
