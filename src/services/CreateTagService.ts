import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
    name: string
}

class CreateTagService {
    async execute({ name }: ITagRequest) {

        const tagsRepository = getCustomRepository(TagsRepositories)

        if (!name) {
            throw new Error ("Incorrect name")
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name
        })

        if (tagAlreadyExists) {
            throw new Error ("Tag already exists")
        }

        const tag = tagsRepository.create({
            name
        })

        await tagsRepository.save(tag)

        return tag
    }

}

export { CreateTagService }