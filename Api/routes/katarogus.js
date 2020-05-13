const express = require('express');
const passport = require('passport');
const KatarogusService = require('../services/katarogus');
const UsersService = require('../services/users');

const {
  kataroguIdSchema,
  createKataroguSchema,
  createCompleteKataroguSchema,
  updateKataroguSchema,
} = require('../utils/schemas/katarogu');

// JWT Strategy
require('../utils/auth/strategies/jwt');

const { validationHandler, validationHandlerKatarogu } = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

function katarogusApi(app) {
  const router = express.Router();
  app.use('/api/katarogus', router);

  const katarogusService = new KatarogusService();
  const usersService = new UsersService();

  router.get('/', async function (req, res, next) {
    try {
      const katarogus = await katarogusService.getKatarogus({});
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
    validationHandlerKatarogu(createCompleteKataroguSchema, createKataroguSchema),
    async function (req, res, next) {
      let { body: katarogu } = req;
      const { _id } = req.user;
      katarogu = { ...katarogu, userId: _id };
      try {
        let user = await usersService.getUser(req.user);
        if (user.createdKatarogu) {
          res.status(200).json({
            data: null,
            message: 'a katarogu already exists',
          });
        } else {
          const createdKataroguId = await katarogusService.createKatarogu(
            katarogu
          );
          user = { ...user, createdKatarogu: true };
          await usersService.updateUser({userId: user._id, user:{createdKatarogu: true}  });
          res.status(201).json({
            data: createdKataroguId,
            message: 'katarogu created',
          });
        }
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
        const updatedKataroguId = await katarogusService.updateKatarogu({
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
        const deletedKataroguId = await katarogusService.deleteKatarogu(
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
