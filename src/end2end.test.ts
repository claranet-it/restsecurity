import fastify from 'fastify'
import { sign } from 'jsonwebtoken'

const server = fastify()
server.register(import('./security'))
server.register(import('./routes'))

describe('end to end', () => {
    describe('GET /api/orders', () => {
        it('should response 401 because there is not jwt token to the header', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/orders'
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 200 because the token user is an admin', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'admin'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(200)
        })

        it('should response 401 because the token user is an operator', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'operator'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 401 because the token user is a customer', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'customer'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(401)
        })
    })

    describe('GET /api/users/{id}', () => {
        it('should response 401 because there is not jwt token to the header', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa'
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 200 because the token user is an admin and the userId is the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'aaaaa',
                        userGroup: 'admin'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(200)
        })

        it('should response 200 because the token user is an operator and the userId is the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'aaaaa',
                        userGroup: 'operator'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(200)
        })

        it('should response 200 because the token user is a customer and the userId is the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'aaaaa',
                        userGroup: 'customer'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(200)
        })

        it('should response 403 because the token user is an admin and the userId is not the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'admin'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(403)
        })

        it('should response 403 because the token user is an operator and the userId is not the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'operator'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(403)
        })

        it('should response 403 because the token user is a customer and the userId is not the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'customer'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(403)
        })
    })

    describe('GET /api/users/{id}/orders', () => {
        it('should response 401 because there is not jwt token to the header', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa/orders'
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 401 because the token user is an admin', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'admin'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 401 because the token user is an operator', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'operator'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 200 because the token user is a customer and the userId is the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'aaaaa',
                        userGroup: 'customer'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(200)
        })

        it('should response 403 because the token user is a customer and the userId is not the same', async () => {
            const response = await server.inject({
                method: 'GET',
                path: '/api/users/aaaaa/orders',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'customer'
                    }, 'yyyyy')}`
                }
            })

            expect(response.statusCode).toBe(403)
        })
    })

    describe('POST /api/notes', () => {
        it('should response 401 because there is not jwt token to the header', async () => {
            const response = await server.inject({
                method: 'POST',
                path: '/api/notes'
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 200 because the token user is an admin', async () => {
            const response = await server.inject({
                method: 'POST',
                path: '/api/notes',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'admin'
                    }, 'yyyyy')}`
                },
                body: {
                    text: 'zzzzz'
                }
            })

            expect(response.statusCode).toBe(200)
        })

        it('should response 401 because the token user is an operator', async () => {
            const response = await server.inject({
                method: 'POST',
                path: '/api/notes',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'operator'
                    }, 'yyyyy')}`
                },
                body: {
                    text: 'zzzzz'
                }
            })

            expect(response.statusCode).toBe(401)
        })

        it('should response 401 because the token user is a customer', async () => {
            const response = await server.inject({
                method: 'POST',
                path: '/api/notes',
                headers: {
                    authorization: `Bearer ${sign({
                        userId: 'xxxxx',
                        userGroup: 'customer'
                    }, 'yyyyy')}`
                },
                body: {
                    text: 'zzzzz'
                }
            })

            expect(response.statusCode).toBe(401)
        })
    })
})