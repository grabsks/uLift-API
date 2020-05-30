import validator from "node-cpf";
import jwt from 'jsonwebtoken';

import User from "../model/User";
import auth from "../config/auth";
import toJson from "../util/file";

class UserController {
  async register(request, response) {
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(200).json({ error: "usuário já cadastrado" });
    }

    if (
      !/[a-z]/gm.test(request.body.password) ||
      !/[A-Z]/gm.test(request.body.password) ||
      !/[0-9]/gm.test(request.body.password) ||
      !/[@!#$%&*()?:./^~_+-]/gm.test(request.body.password)
    ) {
      return response.status(400).json({
        error:
          "a senha deve conter no mínimo 1 letras maiúscula, 1 letra minúscula, 1 número e 1 caractere especial",
      });
    }

    if (request.body.password.length < 8) {
      return response
        .status(400)
        .json({ error: "a senha deve conter no mínimo 8 caracteres" });
    }

    if (!validator.validate(request.body.cpf)) {
      return response.status(400).json({ error: "o CPF não é válido" });
    }

    request.body.cpf = validator.unMask(request.body.cpf);
    const { id, ra, name, email, cpf } = await User.create(request.body);

    return response.status(201).json({ id, ra, name, email, cpf });
  }

  async search(request, response) {
    const { id } = request.params;
    const decodedID = jwt.verify(id, auth.secret);

    const user = await User.findOne({
      where: { id: decodedID },
      attributes: ["id", "ra", "name", "email"],
    });

    if (!user) response.status(404).json({ error: "user not found" });

    return response.status(200).json(user);
  }
}

export default new UserController();
