/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald ',
      isRead: 'false',
    },
    { id: 2, title: 'Catch-22', author: 'Joseph Heller ', isRead: 'false' },
    {
      id: 3,
      title: 'The Lord Of The Rings',
      author: 'J. R. R. Tolkien',
      isRead: 'true',
    },
  ])
}
