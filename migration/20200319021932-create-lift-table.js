module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("lifts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      student_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        primaryKey: true,
        onUpdate: "CASCADE",
      },

      driver_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        primaryKey: true,
        onUpdate: "CASCADE",
      },

      college_id: {
        type: Sequelize.INTEGER,
        references: { model: "colleges", key: "id" },
        primaryKey: true,
        onUpdate: "CASCADE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("lifts");
  },
};
