import { classToPlain } from "class-transformer"
import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class ListTagsService {
    async execute () {
        const tagsRepository = getCustomRepository(TagsRepositories)

        let tags = await tagsRepository.find()
        // return tags.map(tag => ({ ...tag, nameCustom: `#${tag.name}`}))

        return classToPlain(tags)
    }
}

export { ListTagsService }