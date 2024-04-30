export interface Book {
  title: string
  author: string
  isRead: string
}

export interface BookWithId extends Book {
  id: number
}
