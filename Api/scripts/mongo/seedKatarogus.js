// DEBUG=app:* node scripts/mongo/seedKatarogus.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../lib/mongo');
const { katarogusMock } = require('../../utils/mocks/katarogus');

async function seedKatarogus() {
  try {
    const mongoDB = new MongoLib();

    const promises = katarogusMock.map(async katarogu => {
      await mongoDB.create('katarogus', katarogu);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} katarogus have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedKatarogus();