import * as Yup from "yup";
import validator from "node-cpf";
import jwt from 'jsonwebtoken';

import User from "../model/User";
import File from '../model/File';
import auth from "../config/auth";
import toJson from "../util/file";

function saveFiles(f, user_id) {
  const files = Object.keys(f).map((type) => {
    return {
      ...toJson(f[type]),
      file_type: type,
      user_id
    };
  });

  files.forEach(async file => await File.create(file));
}

class UserController {
  async register(request, response) {
    const { name, email, password, cpf, phone } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      cpf: Yup.string().required(),
      phone: Yup.number().required(),
    });

    schema.validate({ name, email, password, cpf, phone }).catch(() => {
      return response
        .status(400)
        .json({ error: "Ocorreu um erro na validação dos dados enviados" });
    });

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

    if (!validator.validate(cpf)) {
      return response.status(400).json({ error: "o CPF não é válido" });
    }

    const formattedCpf = validator.unMask(cpf);
    const user = await User.create({
      name,
      email,
      password,
      cpf: formattedCpf,
      phone,
    });

    delete user.password;
    saveFiles(request.files, user.id);
    return response.status(201).json(user);
  }

  async search(request, response) {
    const { id } = request.params;
    const decodedID = jwt.verify(id, auth.secret);

    const user = await User.findOne({
      where: { id: decodedID },
      attributes: ["id", "ra", "name", "email"],
    });

    if (!user) response.status(404).json({ error: "User not found" });

    return response.status(200).json(user);
  }
}

export default new UserController();
