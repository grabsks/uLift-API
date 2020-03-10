import Sequelize, { Model } from 'sequelize';

class College extends Model {
  static init(sequelize){
    super.init(
      {
       id: {
         type: Sequelize.UUIDV4,
         primaryKey: true
       },
       street: Sequelize.STRING,
       neighborhood: Sequelize.STRING,
       city: Sequelize.STRING,
       state: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    return this
  }
}

export default College;