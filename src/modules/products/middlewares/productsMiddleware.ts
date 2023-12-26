import { celebrate, Segments, Joi } from 'celebrate';

export const showProduct = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const createProduct = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  },
});

export const updateProduct = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const deleteProduct = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
