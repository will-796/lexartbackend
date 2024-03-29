const { Products } = require("../models");
const {
  validateProduct,
  validateProductData,
  validateProductDetails,
  validateByStructure,
} = require("../validation/schema");

const findAllProducts = async () => {
  try {
    return await Products.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProduct = async (product) => {
  try {
    let structureType;
    const validationMap = {
      array: validateProductData,
      details: validateProductDetails,
      default: validateProduct,
    };

    if (Array.isArray(product)) {
      structureType = "array";
    } else if (product.details !== undefined) {
      structureType = "details";
    } else {
      structureType = "default";
    }
    console.log(structureType);
    const validationResult = validateByStructure(
      product,
      validationMap[structureType]
    );

    if (validationResult.error) {
      return {
        errors: validationResult.error.details.map((error) => error.message),
      };
    }

    if (structureType === "array") {
      const products = product.map((item) => {
        const { name, brand, model, data } = item;
        return data.map((item) => {
          const { price, color } = item;
          return {
            name,
            brand,
            model,
            price,
            color,
          };
        });
      });
      return await Products.bulkCreate(products.flat());
    } else if (structureType === "details") {
      const {
        name,
        details: { brand, model, color },
        price,
      } = product;
      return await Products.create({
        name,
        brand,
        model,
        color,
        price,
      });
    } else {
      return await Products.create(product);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findProductById = async (id) => {
  try {
    return await Products.findByPk(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (id, product) => {
  try {
    const productToUpdate = await Products.findByPk(id);
    if (!productToUpdate) {
      return {
        errors: ["Produto não encontrado"],
      };
    }
    const validationResult = validateByStructure(product, validateProduct);

    if (validationResult.error) {
      return {
        errors: validationResult.error.details.map((error) => error.message),
      };
    }

    await productToUpdate.update(product);

    return productToUpdate;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return {
        errors: ["Produto não encontrado"],
      };
    }
    await product.destroy();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  findAllProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct
};
