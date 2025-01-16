import fastify from 'fastify'

const port = 5100
const server = fastify()

server.listen({ port }, () => {
	console.log(`http://localhost:${port}/`)
})