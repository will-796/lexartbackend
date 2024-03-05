const bcrypt = require("bcrypt");
const { User } = require("../models");
const { createToken } = require("../utils/jwt");
const { validateUser, validateByStructure } = require("../validation/schema");

const loginService = async (email, password) => {
  try {
    const validationResult = validateByStructure(
      { email, password },
      validateUser
    );
    if (validationResult.error) {
      return {
        errors: validationResult.error.details.map((error) => error.message),
      };
    }
    const user = await User.findOne({ where: { email } });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user || !passwordMatch) {
      return {
        errors: ["Usuário não encontrado ou senha inválida"],
      };
    }
    const token = createToken(user.email);
    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (email, password) => {
  try {
    const validationResult = validateByStructure(
      { email, password },
      validateUser
    );
    if (validationResult.error) {
      return {
        errors: validationResult.error.details.map((error) => error.message),
      };
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return {
        errors: ["Usuário já existe"],
      };
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({ email, password: hashedPassword });
    return createdUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  loginService,
  createUser,
};
