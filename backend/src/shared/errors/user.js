export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class InvalidCredentialsError extends Error {
    constructor(errorMessage) {
        super(errorMessage)
        this.name = 'InvalidCredentialsError'
    }
}
