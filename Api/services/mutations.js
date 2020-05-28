const KatarogusService = require('../services/katarogus');
const ProductService = require('../services/products');
const katarogusService = new KatarogusService();
const productService = new ProductService();

module.exports = {
  createKatarogu: async (root, { katarogu }) => {
    const _id =  await katarogusService.createKatarogu(katarogu);
    return await katarogusService.getKatarogu(_id);
  },

  updateKatarogu: async (root, { katarogu, kataroguId }) => {
    const _id = await katarogusService.updateKatarogu({kataroguId, katarogu});
    return await katarogusService.getKatarogu(_id);
  },

  deleteKatarogu: async (root, { kataroguId }) => {
    return await katarogusService.deleteKatarogu(kataroguId);
  },

  createProduct: async (root, { product }) => {
    const _id = await productService.createProduct(product);
    return await productService.getProduct(_id);
  },

  updateProduct: async (root, { product, productId }) => {
    const _id = await productService.updateProduct({productId, product});
    return await productService.getProduct(_id);
  },

  deleteProduct: async (root, { productId }) => {
    return await productService.deleteProduct(productId);
  }
};