import User from '../model/User'

class UserController {
  async register(request, response){
    
    const check = await User.findOne({
      where: { email: request.body.email },
    });

    if(check)return response.status(400).json({error: "Usuário já cadastrado"});

    const {ra, name, email} = await User.create(request.body);

    return response.status(201).json({ra, name, email});
  }
}

export default new UserController()