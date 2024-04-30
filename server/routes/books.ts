import request from 'superagent'
import express from 'express'
import * as db from '../../server/db/db'

const router = express.Router()
export default router

router.get('/', async (req, res) => {
  try {
    const AllBooks = await db.getBooks()
    res.json(AllBooks)
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const book = await db.getBookById(id)
    res.json(book)
  } catch (e) {
    console.log(e)
  }
})

router.post('/', async (req, res) => {
  try {
    const added = await db.addBooks(req.body)
    res.send(added)
  } catch (e) {
    console.log(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.delBooksById(id)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const status = req.body.status

    await db.updateBooksById(id, status)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
  }
})
