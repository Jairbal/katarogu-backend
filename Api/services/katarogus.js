const MongoLib = require('../lib/mongo');

class KatarogusService {
  constructor() {
    this.collection = 'katarogus';
    this.mongoDB = new MongoLib();
  }

  //OBTENER TODOS LOS KATAROGUS
  async getKatarogus({ tags }) {
    const query = tags && { tags: { $in: tags }};
    const katarogus = await this.mongoDB.getAll(this.collection, query);
    return katarogus || [];
  }

  //OBTENER UN KATAROGU
  async getKatarogu(kataroguId) {
    const katarogu = await this.mongoDB.get(this.collection, kataroguId);
    return katarogu || {};
  }

  //CREAR UN KATAROGU
  async createKatarogu(katarogu) {
    const createdKataroguId = await this.mongoDB.create(this.collection, katarogu);
    return createdKataroguId;
  }

  //ACTUALIZAR UN KATAROGU
  async updateKatarogu({ kataroguId, katarogu } = {}) {
    const updatedKataroguId = await this.mongoDB.update(this.collection, kataroguId, katarogu);
    return updatedKataroguId;
  }

  //ELIMINAR UN KATAROGU
  async deleteKatarogu(kataroguId) {
    const deletedKataroguId = await this.mongoDB.delete(this.collection, kataroguId);
    return deletedKataroguId;
  }
}

module.exports = KatarogusService;