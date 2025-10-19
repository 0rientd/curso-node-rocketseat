import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  // Vai aguardar cada pedaço de dado (chunk) chegar até o final da requisição
  for await (const chunk of req) {
    // Vai atualizar o array de buffers com cada pedaço de dado (chunk)
    buffers.push(chunk)
  }

  // Só irá processar os dados quando a requisição estiver completa
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log('Requisição completa:', fullStreamContent)

  return res.end(fullStreamContent)
})

server.listen(3334)