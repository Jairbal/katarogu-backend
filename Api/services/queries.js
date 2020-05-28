const KatarogusService = require('../services/katarogus');
const ProductService = require('../services/products');
const katarogusService = new KatarogusService();
const productService = new ProductService();

module.exports = {
  getKatarogu: async (root, { kataroguId }) => {
    return await katarogusService.getKatarogu(kataroguId);
  },

  getProducts: async (root, { kataroguId }) => {
    return await productService.getProducts({kataroguId});
  },

  getProduct: async (root, { productId }) => {
    return await productService.getProduct(productId);
  }
};