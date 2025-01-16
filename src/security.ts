import fp from 'fastify-plugin'
import { jwtDecode } from 'jwt-decode'
import { FastifyAuthFunction } from '@fastify/auth'
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

type TUserGroup = 'admin' | 'operator' | 'customer'

declare module 'fastify' {
    interface FastifyInstance {
        jwtAuth: (userGroups: TUserGroup[]) => FastifyAuthFunction
    }
}

const jwtAuthUtility: FastifyPluginAsync = async server => {
    const jwtAuth = (userGroups: TUserGroup[]): FastifyAuthFunction =>
        async (request: FastifyRequest, response: FastifyReply) => {
            const authorization = request.headers.authorization ?? ''

            if (!authorization.startsWith('Bearer ')) {
                response.status(401).send()
            }
            else {
                const token = authorization.replace('Bearer ', '')
                const decoded = jwtDecode<{
                    userId: string,
                    userGroup: TUserGroup
                }>(token)

                if (!userGroups.includes(decoded.userGroup))
                    response.status(401).send()
            }
        }

    server.decorate('jwtAuth', jwtAuth)
}

export default fp(jwtAuthUtility)