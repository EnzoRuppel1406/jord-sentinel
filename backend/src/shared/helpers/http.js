export const badRequest = (body) => ({ statusCode: 400, body })

export const serverError = () => ({
    statusCode: 500,
    body: { message: 'Internal Server Error' },
})

export const notFound = (body) => ({ statusCode: 404, body })

export const ok = (body, cookie = null) => ({ statusCode: 200, body, cookie })

export const unauthorized = (body) => ({ statusCode: 401, body })

export const created = (body) => ({
    statusCode: 201,
    body,
})
