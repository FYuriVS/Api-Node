import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { createUserValidation } from '../middlewares/userMiddleware';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticatedMiddleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  isAuthenticated,
  createUserValidation,
  usersController.createUser,
);

export default usersRouter;
