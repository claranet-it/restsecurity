import { FastifyPluginAsync } from 'fastify'
import { checkUser, findAllOrders, findUser } from './repository'

const routes: FastifyPluginAsync = async server => {
    server.get('/api/orders',
        {
            preValidation: server.jwtAuth(['admin'])
        },
        async () => findAllOrders()
    )

    server.get<{ Params: { id: string } }>('/api/users/:id',
        {
            preValidation: server.jwtAuth(['admin', 'operator', 'customer'])
        },
        async (request, response) => {
            const user = findUser(request.params.id)

            if (!user) {
                response.status(404).send()
            }
            else if (!checkUser(request.params.id, request.authUser.userId)) {
                response.status(403).send()
            }
            else return user
        }
    )
}

export default routes