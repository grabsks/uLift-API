import jwt from "jsonwebtoken";
import * as Yup from "yup";

import User from "../model/User";
import authConfig from "../config/auth";

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    schema.validate({ email, password }).catch(() => {
      return response
        .status(400)
        .json({ error: "Invalid values to user or password" });
    });

    const user = await User.findOne({ where: { email } });

    if (!user) return response.status(404).json({ error: "user not found" });

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: "password does not match" });
    }

    const { id, name } = user;

    return response.status(200).json({
      id,
      name,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
