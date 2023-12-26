import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  createProduct,
  deleteProduct,
  showProduct,
  updateProduct,
} from '../middlewares/productsMiddleware';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', showProduct, productsController.show);

productsRouter.post('/', createProduct, productsController.create);

productsRouter.put('/:id', updateProduct, productsController.update);

productsRouter.delete('/:id', deleteProduct, productsController.delete);

export default productsRouter;
