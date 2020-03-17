import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        size: Sequelize.INTEGER,
        file_type: Sequelize.ENUM('ra', 'cnh', 'profile'),
        body: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id' })
  }
}

export default File;
