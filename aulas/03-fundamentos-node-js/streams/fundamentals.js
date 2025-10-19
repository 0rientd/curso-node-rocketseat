// Import da classe Readable do módulo 'stream' do Node.js
import { Readable } from 'node:stream'

// Herdando da classe Readable
class OneToHundredStream extends Readable {
  index = 1

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

new OneToHundredStream()
  .pipe(process.stdout)