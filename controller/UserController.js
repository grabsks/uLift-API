import User from "../model/User";

class UserController {
  async register(request, response) {
    const { ra, name, email, password, cpf, phone } = request.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return response.status(400).json({ error: "usuário já cadastrado" });
    }

    if (
      !/[a-z]/gm.test(password) ||
      !/[A-Z]/gm.test(password) ||
      !/[0-9]/gm.test(password) ||
      !/[@!#$%&*()?:./^~_+-]/gm.test(password)
    ) {
      return response.status(400).json({
        error:
          "A senha deve conter no mínimo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial",
      });
    }

    if (password.length < 8) {
      return response
        .status(400)
        .json({ error: "A senha deve conter no mínimo 8 caracteres" });
    }

    const user = await User.create({ ra, name, email, password, cpf, phone });

    return response.status(201).json(user);
  }

  async search(request, response) {
    const { id } = request.params;

    const user = await User.findOne({
      where: { id },
      attributes: ["id", "ra", "name", "email"],
    });

    if (!user) response.status(404).json({ error: "User not found" });

    return response.status(200).json(user);
  }
}

export default new UserController();
