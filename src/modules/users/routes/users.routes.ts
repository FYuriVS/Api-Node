import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { createUserValidation } from '../middlewares/userMiddleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', createUserValidation, usersController.createUser);

export default usersRouter;
