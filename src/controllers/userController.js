const usersService = require("../services/usersService");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email ou senha não informados" });
    }
    const payload = await usersService.loginService(email, password);
    if (payload.errors) {
      return res.status(400).json({ message: payload.errors });
    }
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userCreateController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email ou senha não informados" });
    }

    const payload = await usersService.createUser(email, password);
    if (payload.errors) {
      return res.status(400).json({ message: payload.errors });
    }
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginController,
  userCreateController,
};
