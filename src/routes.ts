import { FastifyPluginAsync } from 'fastify'
import {
    checkUser,
    findAllOrders,
    findOrdersByUser,
    findUser
} from './repository'

const routes: FastifyPluginAsync = async server => {
    server.get('/api/orders',
        {
            preValidation: server.jwtAuth(['admin'])
        },
        async () => findAllOrders()
    )

    server.get<{ Params: { id: string } }>('/api/users/:id',
        {
            preValidation: server.jwtAuth([
                'admin',
                'operator',
                'customer'
            ]),
            preHandler: (request, response, next) => {
                checkUser(
                    request.params.id,
                    request.authUser.userId
                ) ? next() :
                    response.status(403).send()
            }
        },
        async (request, response) => {
            const user = findUser(request.params.id)

            if (!user) {
                response.status(404).send()
            }
            else return user
        }
    )

    server.get<{ Params: { id: string } }>('/api/users/:id/orders',
        {
            preValidation: server.jwtAuth(['customer']),
            preHandler: (request, response, next) => {
                checkUser(
                    request.params.id,
                    request.authUser.userId
                ) ? next() :
                    response.status(403).send()
            }
        },
        async (request, response) => {
            const user = findUser(request.params.id)

            if (!user) {
                response.status(404).send()
            }
            else return findOrdersByUser(request.params.id)
        }
    )
}

export default routes