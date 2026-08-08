import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const checkIfPasswordIsValid = (password) => password.length > 8

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const invalidResponse = () => badRequest({ message: 'The provided id is not valid.' })

export const someFieldIsNotAllowedResponse = () =>
    badRequest({ message: 'Some provided field is not allowed' })

export const someFieldIsBlankResponse = () =>
    badRequest({ message: 'Some provided field is blank' })

export const invalidEmailResponse = () =>
    badRequest({ message: 'Invalid email. Please provide a valid one.' })

export const invalidPasswordResponse = () =>
    badRequest({ message: 'Password must be at least 8 characters' })

export const companyNotFoundResponse = () => notFound({ message: 'Company not found.' })

export const roleNotFoundResponse = () => notFound({ message: 'Role not found.' })

export const userNotFoundResponse = () => notFound({ message: 'User not found.' })
