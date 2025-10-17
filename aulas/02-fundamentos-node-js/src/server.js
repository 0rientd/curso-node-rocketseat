import http from 'http'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res.end('Listagem de usuários')
  } else if (method === 'POST' && url === '/users') {
    return res.end('Criação de usuário')
  } else {
    return res.end('Hello World')
  }
})

server.listen(3000)

// ➜ http POST localhost:3000/users
// HTTP/1.1 200 OK
// Connection: keep-alive
// Content-Length: 21
// Date: Thu, 16 Oct 2025 22:27:27 GMT
// Keep-Alive: timeout=5

// Criação de usuário