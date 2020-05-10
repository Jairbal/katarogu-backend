const express = require('express');
const passport = require('passport');

const ProductsServices = require('../services/products');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const { kataroguIdSchema } = require('../utils/schemas/katarogu');
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} = require('../utils/schemas/products');

// JWT Strategy
require('../utils/auth/strategies/jwt');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsServices = new ProductsServices();

  router.get(
    '/',
    validationHandler({ kataroguId: kataroguIdSchema }),
    async function (req, res, next) {
      const { kataroguId } = req.query;

      try {
        const products = await productsServices.getProducts({ kataroguId });

        res.status(200).json({
          data: products,
          message: 'products listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:products']),
    validationHandler(createProductSchema),
    async function (req, res, next) {
      const { body: product } = req;

      try {
        const createdProductId = await productsServices.createProduct({
          product,
        });

        res.status(201).json({
          data: createdProductId,
          message: 'product created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:products']),
    validationHandler({ productId: productIdSchema }, 'params'),
    validationHandler(updateProductSchema),
    async function (req, res, next) {
      const { productId } = req.params;
      const product = req.body;
      try {
        const updatedProductId = await productsServices.updateKatarogu({
          productId,
          product,
        });

        res.status(200).json({
          data: updatedProductId,
          message: 'product updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:products']),
    validationHandler({ productId: productIdSchema }, 'params'),
    async function (req, res, next) {
      const { productId } = req.params;

      try {
        const deletedProductId = await productsServices.deleteProduct({
          productId,
        });

        res.status(200).json({
          data: deletedProductId,
          message: 'product deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = productsApi;
