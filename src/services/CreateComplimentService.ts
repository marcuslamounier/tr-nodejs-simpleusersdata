import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentService {
    async execute({ tag_id, user_receiver, user_sender, message }: IComplimentRequest) {

        const complimentsRepository = getCustomRepository(ComplimentsRepositories)
        const usersRepository = getCustomRepository(UsersRepositories)

        const userReceiverExists = await usersRepository.findOne(user_receiver)

        if (!userReceiverExists) {
            throw new Error ("Invalid user")
        }

        if (user_receiver === user_sender) {
            throw new Error ("User can't create a compliment for himself")
        }

        const compliment = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepository.save(compliment)

        return compliment
    }

}

export { CreateComplimentService }