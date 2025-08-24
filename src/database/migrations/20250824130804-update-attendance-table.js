'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('attendances', 'isLate', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn('attendances', 'isUnder', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn('attendances', 'isOver', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('attendances', 'isLate');
    await queryInterface.removeColumn('attendances', 'isUnder');
    await queryInterface.removeColumn('attendances', 'isOver');
  }
};
