import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidResponse = () => badRequest({ message: 'The provided id is not valid.' })

export const companyNotFoundResponse = () => notFound({ message: 'Company not found.' })
