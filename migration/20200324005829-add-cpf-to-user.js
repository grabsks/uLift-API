module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "cpf", {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("users", "cpf");
  },
};
