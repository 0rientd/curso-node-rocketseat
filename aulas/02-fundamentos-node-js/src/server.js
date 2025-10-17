import http from 'http'

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  } else if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Carlos Henrique',
      email: 'teste.example@example.com'
    })

    return res.end('Criação de usuário')
  } else {
    return res.end('Hello World')
  }
})

server.listen(3000)

// ➜ http GET localhost:3000/users 
// HTTP/1.1 200 OK
// Connection: keep-alive
// Content-Length: 71
// Content-type: application/json
// Date: Fri, 17 Oct 2025 02:55:21 GMT
// Keep-Alive: timeout=5

// [
//     {
//         "email": "teste.example@example.com",
//         "id": 1,
//         "name": "Carlos Henrique"
//     }
// ]