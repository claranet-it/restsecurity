import { FastifyPluginAsync } from 'fastify'

const routes: FastifyPluginAsync = async server => {
    server.get('/api/orders',
        {
            preValidation: server.jwtAuth(['admin'])
        },
        async (request, response) => {
            console.log('GET')
        })
}

export default routes