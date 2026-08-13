export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid email or password.')
        this.name = 'InvalidCredentialsError'
    }
}
