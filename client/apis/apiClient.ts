import request from 'superagent'
import { Book } from '../../models/books'

const rootURL = '/api/v1/books/'

export async function getAllBooks() {
  const res = await request.get(rootURL)
  return res.body
}

export async function addBook(obj: Book) {
  await request.post(rootURL).send(obj)
}

export async function delBookById(id: number) {
  await request.delete(rootURL + String(id))
}

export async function updateBookById(id: number, status: string) {
  await request.patch(rootURL + String(id)).send({ status: status })
}
