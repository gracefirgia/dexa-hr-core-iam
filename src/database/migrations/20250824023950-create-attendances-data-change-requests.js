'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.createTable(
        'attendances',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
          },
          employee_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'employees',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          clock_in: {
            type: 'TIMESTAMPTZ',
            allowNull: true,
          },
          clock_out: {
            type: 'TIMESTAMPTZ',
            allowNull: true,
          },
          active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          created_at: {
            allowNull: false,
            type: 'TIMESTAMPTZ',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            allowNull: false,
            type: 'TIMESTAMPTZ',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          timestamps: true,
          underscored: true,
        },
      ),

      queryInterface.sequelize.query(`
        CREATE TYPE "enum_data_change_requests_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELED')
      `),
    ]);

    await queryInterface.createTable(
      'data_change_requests',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.literal('gen_random_uuid()'),
        },
        employee_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'employees',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        field_changes: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        status: {
          type: 'enum_data_change_requests_status',
          allowNull: false,
          defaultValue: 'PENDING',
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        reviewed_by: {
          type: Sequelize.UUID,
          allowNull: true,
        },
        requested_at: {
          type: 'TIMESTAMPTZ',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        created_at: {
          allowNull: false,
          type: 'TIMESTAMPTZ',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          allowNull: false,
          type: 'TIMESTAMPTZ',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        timestamps: true,
        underscored: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('data_change_requests');
    await queryInterface.sequelize.query(
      `DROP TYPE "enum_data_change_requests_status"`,
    );
    await queryInterface.dropTable('attendances');
  },
};
