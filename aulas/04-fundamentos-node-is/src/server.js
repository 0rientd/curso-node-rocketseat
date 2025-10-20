import http from 'http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const  { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  } else if (method === 'POST' && url === '/users') {
    const { nome, email } = req.body

    const user = {
      id: randomUUID(),
      name: nome,
      email: email
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  } else {
    return res.writeHead(404).end()
  }
})

server.listen(3000)