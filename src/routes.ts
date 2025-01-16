import { findAllOrders } from './repository'
import { FastifyPluginAsync } from 'fastify'

const routes: FastifyPluginAsync = async server => {
    server.get('/api/orders',
        {
            preValidation: server.jwtAuth(['admin'])
        },
        async () => findAllOrders()
    )
}

export default routes