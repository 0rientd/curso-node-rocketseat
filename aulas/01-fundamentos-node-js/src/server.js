// CommonJS => require
// const http = require('htpp')

// ESModule => import/export
// Este é o padrão hoje em dia
import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello to your journey to Node JS')
})

server.listen(3000)

// Veja no navegador ou no terminal
// No terminal, rode o comando abaixo e veja o resultado
//
// http localhost:3000
// HTTP/1.1 200 OK
// Connection: keep-alive
// Content-Length: 11
// Date: Thu, 16 Oct 2025 18:38:32 GMT
// Keep-Alive: timeout=5

// Hello to your journey to Node JS