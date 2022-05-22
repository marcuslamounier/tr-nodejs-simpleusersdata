import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const authenticateUserController = new AuthenticateUserController()
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController()
const listUserSentComplimentsController = new ListUserSentComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

router.post("/users", createUserController.handle)
router.post("/tags", ensureAdmin, createTagController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)
router.post("/login", authenticateUserController.handle)

router.get("/users/compliments/sent", ensureAuthenticated, listUserSentComplimentsController.handle)
router.get("/users/compliments/received", ensureAuthenticated, listUserReceivedComplimentsController.handle)
router.get("/tags", listTagsController.handle)
router.get("/users", ensureAuthenticated, ensureAdmin, listUsersController.handle)

export { router }