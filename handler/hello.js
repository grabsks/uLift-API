class Hello {
  main(request, response){
    return response.status(200).json({hello: 'world'})
  }
}

export default new Hello()