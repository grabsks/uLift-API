import Sequelize, { Model } from "sequelize";

class Lift extends Model {
  static init(sequelize) {
    super.init(
      {
        score: Sequelize.INTEGER,
        comment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "student_id" });
    this.belongsTo(models.User, { foreignKey: "driver_id" });
    this.belongsTo(models.College, { foreignKey: "college_id" });
  }
}

export default Lift;
