import { FastifyPluginAsync } from 'fastify'

const routes: FastifyPluginAsync = async server => {
    server.get('/api/orders',
        {
            preValidation: server.jwtAuth()
        },
        async (request, response) => {
            console.log(request)
            console.log(response)
        })
}

export default routes