import User from "../model/User";

class UserController {
  async register(request, response) {
    const userExists = await User.findOne({
      where: { email: request.body.email }
    });

    if (userExists)
      return response.status(200).json({ error: "Usuário já cadastrado" });

    const { id, ra, name, email } = await User.create(request.body);

    return response.status(201).json({ id, ra, name, email });
  }

  async search(request, response) {
    const { id } = request.params;

    const user = await User.findOne({
      where: { id },
      attributes: ["id", "ra", "name", "email"]
    });

    if (!user) response.status(404).json({ error: "Usuário não encontrado" });

    return response.status(200).json(user);
  }
}

export default new UserController();
