'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'college_id', {
      type: Sequelize.INTEGER,
      references: { model: 'colleges', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'college_id')
  }
};
