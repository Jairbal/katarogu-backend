const express = require('express');
const passport = require('passport');
const UsersService = require('../services/users');
const KatarogusService = require('../services/katarogus');

const { validationHandler } = require('../utils/middleware/validationHandler');
const { userIdSchema, updateUserSchema } = require('../utils/schemas/users');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

require('../utils/auth/strategies/jwt');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.put(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:users']),
    validationHandler({ userId: userIdSchema }, 'params'),
    validationHandler(updateUserSchema),
    async function (req, res, next) {
      const { body: user } = req;
      const { userId } = req.params;
      try {
        const updateUserId = await usersService.updateUser({
          userId,
          user,
        });

        if (!updateUserId) {
          res.status(201).json({
            message: 'user not found',
          });
        } else {
          res.status(200).json({
            data: updateUserId,
            message: 'user updated',
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:users']),
    validationHandler({ userId: userIdSchema }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;

      const katarogusService = new KatarogusService();

      const deletedUserId = await usersService.deleteUser(userId);
      const kataroguUser = await katarogusService.getKatarogus({userId: userId});
      const kataroguDeletedId = await katarogusService.deleteKatarogu(kataroguUser[0]._id);

      res.status(200).json({
        data: {
          deletedUserId,
          kataroguDeletedId
        },
        message: 'user, katarogu and products deleted'
      });
    }
  );
}

module.exports = usersApi;
