import http from 'http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  // Estou retornando o objeto que bate com o método e a URL da requisição
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    // console.log(routeParams)
    // [
    //   '/users/6b0fcafb-5d13-427c-b644-edcc1ad11dbf',
    //   '6b0fcafb-5d13-427c-b644-edcc1ad11dbf',
    //   index: 0,
    //   input: '/users/6b0fcafb-5d13-427c-b644-edcc1ad11dbf',
    //   groups: [Object: null prototype] {
    //     id: '6b0fcafb-5d13-427c-b644-edcc1ad11dbf'
    //   }
    // ]

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3334)