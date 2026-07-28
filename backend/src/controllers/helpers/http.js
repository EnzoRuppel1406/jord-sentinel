export const badRequest = (body) => ({ statusCode: 400, body })

export const created = (body) => ({ statusCode: 200, body })

export const serverError = () => ({
    statusCode: 500,
    body: { message: 'Internal Server Error' },
})
