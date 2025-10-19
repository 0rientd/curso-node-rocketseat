import http from 'http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const  { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  } else if (method === 'POST' && url === '/users') {
    // console.log(req.body)

    const { nome, email } = req.body

    users.push({
      id: 1,
      name: nome,
      email: email
    })

    return res.writeHead(201).end()
  } else {
    return res.writeHead(404).end()
  }
})

server.listen(3000)