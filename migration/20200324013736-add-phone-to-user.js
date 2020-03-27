'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'phone');
  }
};
