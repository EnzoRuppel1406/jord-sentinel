import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.access_token

        if (!token) {
            return res.status(401).send({ message: 'Authentication required.' })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).send({ message: 'Invalid or expired token.' })
    }
}

export const adminAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.access_token

        if (!token) {
            return res.status(401).send({ message: 'Authentication required.' })
        }

        const userIsAdmin = req.user.isAdmin

        if (!userIsAdmin) {
            return res.status(403).send({ message: 'User does not have admin access' })
        }

        next()
    } catch (error) {
        return res.status(401).send({ message: 'Invalid or expired token.' })
    }
}
