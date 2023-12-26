import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { authValidation } from '../middlewares/authMiddleware';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', authValidation, authController.create);

export default authRouter;
