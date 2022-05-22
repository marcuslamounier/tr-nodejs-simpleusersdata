import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateUserRequest {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateUserRequest) {

        const usersRepository = getCustomRepository(UsersRepositories)

        const user = await usersRepository.findOne({
            email
        })

        if (!user) {
            throw new Error ("Email/password incorrect")
        }
        
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error ("Email/password incorrect")
        }

        const token = sign(
            { email: user.email },
            "f4138d3481f4833680190b5b9aa9c81f",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return token
    }

}

export { AuthenticateUserService }