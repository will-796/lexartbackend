const { productsService } = require("../services");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productsService.findAllProducts();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "nao deve ser vazio" });
    }
    const payload = await productsService.createProduct(req.body);
    if (payload.errors) {
      return res.status(400).json({ message: payload.errors });
    }
    res.status(201).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};
