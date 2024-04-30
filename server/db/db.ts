import connection from './connection'
import { Book } from '../../models/books'

const db = connection

export function getBooks(): Promise<book[]> {
  return db('books').select()
}

export function getBookById(id: number): Promise<book> {
  return db('books').where({ id }).select().first()
}

export function addBooks(bookObj: Book) {
  return db('books').insert(bookObj)
}

export function delBooksById(id: number) {
  return db('books').del().where({ id })
}
export function updateBooksById(id: number, status: string) {
  return db('books').where({ id }).update('isRead', status)
}
