const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { email, password, nameCompany, isAdmin, createdKatarogu, createdAt } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      email,
      password: hashedPassword,
      nameCompany,
      isAdmin,
      createdKatarogu,
      createdAt
    })
    return createUserId;
  };

  async updateUser({ userId, user }) {
    const updatedUserId = await this.mongoDB.update(this.collection, userId, user);
    return updatedUserId;
  }

  async deleteUser(userId) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

module. exports = UsersService;