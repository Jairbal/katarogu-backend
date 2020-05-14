const {MongoLib, ObjectId} = require('../lib/mongo');
const KatarogusService = require('./katarogus');

class ProductsService {
  constructor() {
    this.collection = 'products',
    this.mongoDB = new MongoLib();
  };

  async getProducts({ kataroguId }) {
    const query = kataroguId && { kataroguId: ObjectId(kataroguId) };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  };

  async createProduct({ product, userId }) {
    const katarogusService = new KatarogusService();
    const kataroguUser = await katarogusService.getKatarogus({userId: userId});
    const kataroguUserId = kataroguUser[0]._id;
    product = { ...product, kataroguId: kataroguUserId };  
    const createdProductId = await this.mongoDB.create(this.collection, product);
    return createdProductId;
  };

  async updateKatarogu({ productId, product } = {}) {
    const updatedProductId = await this.mongoDB.update(this.collection, productId, product);
    return updatedProductId;
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId);
    return deletedProductId;
  };
}

module.exports = ProductsService;