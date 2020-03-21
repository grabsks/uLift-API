class User {
  post(request, response){
    const users = await User.create({
      ra: request.ra,
      name: request.name,
      email: request.email,
      password: request.password
    });
    users.password = null;
    response.status(201).json({users});
    return response;
  }
}

export default new User()