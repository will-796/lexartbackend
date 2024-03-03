const { Products } = require('../models');

const findAllProducts = async () => {
    try {
        return await Products.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    findAllProducts
}