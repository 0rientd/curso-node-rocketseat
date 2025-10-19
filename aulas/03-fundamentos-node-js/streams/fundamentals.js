// Import da classe Readable do módulo 'stream' do Node.js
import { Readable, Writable, Transform } from 'node:stream'

// Herdando da classe Readable
class OneToHundredStream extends Readable {
  index = 1

  // _read é um método obrigatório que deve ser implementado em classes que estendem Readable
  _read() {
    const i = this.index++

    // setTimeout funciona da seguinte forma:
    // 1. Recebe uma função de callback
    // 2. Recebe um tempo em milissegundos
    // Após o tempo definido, a função de callback é executada
    // Verificamos o index e decidimos se vamos enviar um valor ou finalizar a stream caso condição seja atendida
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  // _transform é um método obrigatório que deve ser implementado em classes que estendem Transform
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(transformed.toString()))
  }
}

class MultiplyByTenStream extends Writable {
  // _write é um método obrigatório que deve ser implementado em classes que estendem Writable
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10 )
    callback()
  }
}

// pipe é um método das streams que conecta a saída de uma stream à entrada de outra
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())