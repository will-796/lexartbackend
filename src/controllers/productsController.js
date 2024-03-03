const {productsService} = require('../services');

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productsService.findAllProducts();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
};
