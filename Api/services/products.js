const MongoLib = require('../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products',
    this.mongoDB = new MongoLib();
  };

  async getProducts({ kataroguId }) {
    const query = kataroguId && { kataroguId };
    const products = await this.mongoDB.getAll(this.collection, query);

    return products || [];
  };

  async createProduct({ product }) {
    const createdProductId = await this.mongoDB.create(this.collection, product);
    return createdProductId;
  };

  async updateKatarogu({ productId, product } = {}) {
    console.log(productId)
    console.log(product)
    const updatedProductId = await this.mongoDB.update(this.collection, productId, product);
    return updatedProductId;
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId);
    return deletedProductId;
  };
}

module.exports = ProductsService;