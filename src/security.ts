import fp from 'fastify-plugin'
import { FastifyAuthFunction } from '@fastify/auth'
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        jwtAuth: () => FastifyAuthFunction
    }
}

const jwtAuthPlugin: FastifyPluginAsync = async server => {
    const jwtAuth: () => FastifyAuthFunction = () =>
        async (request: FastifyRequest, response: FastifyReply) => {
            console.log(request)
            console.log(response)
            console.log('xxx')
            response.status(401).send()
        }

    server.decorate('jwtAuth', jwtAuth)
}

export default fp(jwtAuthPlugin)