import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidResponse = () => badRequest({ message: 'The provided id is not valid.' })

export const someFieldIsNotAllowedResponse = () =>
    badRequest({ message: 'Some provided field is not allowed' })

export const someFieldIsBlankResponse = () =>
    badRequest({ message: 'Some provided field is blank' })

export const companyNotFoundResponse = () => notFound({ message: 'Company not found.' })
export const roleNotFoundResponse = () => notFound({ message: 'Role not found.' })
