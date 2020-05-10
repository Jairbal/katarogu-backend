const express = require('express');
const passport = require('passport');
const katarogusService = require('../services/katarogus');

const {
  kataroguIdSchema,
  createKataroguSchema,
  updateKataroguSchema,
} = require('../utils/schemas/katarogu');

// JWT Strategy
require('../utils/auth/strategies/jwt');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

function katarogusApi(app) {
  const router = express.Router();
  app.use('/api/katarogus', router);

  const KatarogusService = new katarogusService();

  router.get('/', async function (req, res, next) {
    try {
      const katarogus = await KatarogusService.getKatarogus({});
      res.status(200).json({
        data: katarogus,
        message: 'katarogus listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:kataroguId',
    validationHandler({ kataroguId: kataroguIdSchema }, 'params'),
    async function (req, res, next) {
      const { kataroguId } = req.params;
      try {
        const katarogus = await KatarogusService.getKatarogu(kataroguId);

        res.status(200).json({
          data: katarogus,
          message: 'katarogu retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:katarogus']),
    validationHandler(createKataroguSchema),
    async function (req, res, next) {
      const { body: katarogu } = req;
      try {
        const createdKataroguId = await KatarogusService.createKatarogu(
          katarogu
        );

        res.status(201).json({
          data: createdKataroguId,
          message: 'katarogu created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:kataroguId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:katarogus']),
    validationHandler({ kataroguId: kataroguIdSchema }, 'params'),
    validationHandler(updateKataroguSchema),
    async function (req, res, next) {
      const { body: katarogu } = req;
      const { kataroguId } = req.params;
      try {
        const updatedKataroguId = await KatarogusService.updateKatarogu({
          kataroguId,
          katarogu,
        });

        res.status(200).json({
          data: updatedKataroguId,
          message: 'katarogu updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:kataroguId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:katarogus']),
    validationHandler({ kataroguId: kataroguIdSchema }),
    async function (req, res, next) {
      const { kataroguId } = req.params;
      try {
        const deletedKataroguId = await KatarogusService.deleteKatarogu(
          kataroguId
        );

        res.status(200).json({
          data: deletedKataroguId,
          message: 'katarogu deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = katarogusApi;
