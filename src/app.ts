import fastify from 'fastify'

const port = 5100
const server = fastify()

server.register(import('./security'))
server.register(import('./routes'))

server.listen({ port }, () => {
	console.log(`http://localhost:${port}/`)
})