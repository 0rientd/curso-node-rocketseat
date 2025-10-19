import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        console.log('Enviando', i)

        this.push(buf)
      }
    }, 1000)
  }
}

// Não é feita uma conexão nova a cada iteração.
// A conexão é mantida aberta e os dados são enviados em partes (chunks).
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // Necessário para versões do node >= 18
})