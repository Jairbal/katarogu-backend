// DEBUG=app:* node scripts/mongo/seedUsers.js

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib = require('../../lib/mongo');
const { config } = require('../../config/index');

const users = [
  {
    email: 'root@katarogu.xyz',
    password: config.defaultAdminPassword,
    nameCompany: 'katarogu',
    isAdmin: true,
    createdKatarogu: false,
    createdAt: new Date().toJSON()
  },
  {
    email: 'jose@undefined.sh',
    password: config.defaultUserPassword,
    nameCompany: 'Josefo',
    isAdmin: false,
    createdKatarogu: false,
    createdAt: new Date().toJSON()
  },
  {
    email: 'maria@undefined.sh',
    password: config.defaultUserPassword,
    nameCompany: 'Majo',
    isAdmin: false,
    createdKatarogu: false,
    createdAt: new Date().toJSON()
  }
];

async function createUser(mongoDB, user) {
  const { email, password, nameCompany, isAdmin, createdKatarogu, createdAt } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    email,
    password: hashedPassword,
    nameCompany,
    isAdmin: Boolean(isAdmin),
    createdKatarogu: Boolean(createdKatarogu),
    createdAt
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user);
      debug(chalk.green('User created with id:', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();