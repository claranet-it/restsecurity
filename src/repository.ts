export const findAllOrders = () => {
    return [
        {
            id: '5f73ba75-d761-49ce-8dcf-17d993fc5d25',
            number: '9580012345',
            customer: 'Mario Rossi',
            date: new Date('2018-12-14 05:25').toUTCString(),
            total: 23.45,
            userId: 'f30518ec-42fc-42a4-960b-0ba321c62c2d'
        },
        {
            id: '0a4b37b9-b72c-47c0-92c9-fe291a358d89',
            number: '9580073451',
            customer: 'Lucia Bianchi',
            date: new Date('2018-12-10 06:20').toUTCString(),
            total: 11.01,
            userId: 'f9fc321b-5d8b-4d13-8553-5fc4c1bd97ab'
        },
        {
            id: 'ef0216dc-5edf-41bb-90a6-c4cc9f3242d6',
            number: '9580022459',
            customer: 'Alberto Verdi',
            date: new Date('2024-09-19 06:20').toUTCString(),
            total: 17.35,
            userId: '5615ff6b-8412-409a-a84e-8d0cd57b58ad'
        }
    ]
}

export const findOrdersByUser = (userId: string) => {
    return [
        {
            id: '5f73ba75-d761-49ce-8dcf-17d993fc5d25',
            number: '9580012345',
            customer: 'Mario Rossi',
            date: new Date('2018-12-14 05:25').toUTCString(),
            total: 23.45,
            userId
        },
        {
            id: '0a4b37b9-b72c-47c0-92c9-fe291a358d89',
            number: '9580073451',
            customer: 'Lucia Bianchi',
            date: new Date('2018-12-10 06:20').toUTCString(),
            total: 11.01,
            userId
        },
        {
            id: 'ef0216dc-5edf-41bb-90a6-c4cc9f3242d6',
            number: '9580022459',
            customer: 'Alberto Verdi',
            date: new Date('2024-09-19 06:20').toUTCString(),
            total: 17.35,
            userId
        }
    ]
}

export const findUser = (id: string) => {
    return {
        id,
        email: 'mario@rossi.it',
        name: 'Mario',
        surname: 'Rossi',
        birthDate: new Date('1990-07-19 05:25').toUTCString()
    }
}

export const checkUser = (userId: string, authUserId: string) => {
    return userId === authUserId
}