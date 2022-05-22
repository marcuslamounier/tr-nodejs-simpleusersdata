import { classToPlain } from "class-transformer"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

class ListUsersService {
    async execute () {
        const usersRepository = getCustomRepository(UsersRepositories)

        let users = await usersRepository.find()

        return classToPlain(users)
    }

}

export { ListUsersService }