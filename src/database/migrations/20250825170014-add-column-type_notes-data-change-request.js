'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('data_change_requests', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn('data_change_requests', 'notes', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('data_change_requests', 'type');
    await queryInterface.removeColumn('data_change_requests', 'notes');
  }
};
