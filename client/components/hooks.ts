import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import * as api from '../apis/apiClient'
import { Book } from '../../models/books'

export function useAddBook() {
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: Book) => await api.addBook(data),
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return mutation
}

export function useDeleteBook(id: number) {
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: async () => await api.delBookById(id),
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  return mutation
}

export function useUpdateBookStatus() {
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) =>
      await api.updateBookById(id, status),
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  return mutation
}
