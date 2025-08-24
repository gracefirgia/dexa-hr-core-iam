'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [role] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'SUPERADMIN' LIMIT 1;`
    );
    const [dept] = await queryInterface.sequelize.query(
      `SELECT id FROM departments WHERE name = 'IT' LIMIT 1;`
    );
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('employees', [{
      department_id: dept[0]?.id,
      role_id: role[0]?.id,
      employee_code: 'DEXA001',
      email: 'john.doe@dexa.com',
      password: hashedPassword,
      name: 'John Doe',
      active: true,
      created_by: null,
      created_at: new Date(),
      updated_at: new Date(),
    }],);

    const [employee] = await queryInterface.sequelize.query(
      `SELECT id FROM employees WHERE employee_code = 'DEXA001' LIMIT 1;`
    );
    
    await queryInterface.bulkInsert('employee_details', [
      {
        employee_id: employee[0].id,
        photo: null,
        phone: null,
        join_date: null,
        terminate_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', {}, {});
    await queryInterface.bulkDelete('employee_details', {}, {});
  }
};
