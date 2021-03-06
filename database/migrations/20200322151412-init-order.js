'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DECIMAL, ENUM } = Sequelize;
    await queryInterface.createTable('order', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      order_number: {
        type: STRING(18),
        allowNull: false,
      },
      price: {
        type: DECIMAL(12, 2),
        allowNull: false,
      },
      remark: STRING(256),
      address_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'address',
          key: 'id',
        },
      },
      status: {
        type: ENUM('1', '2', '3', '4'),
        allowNull: false,
        comment: '1: 待发货\n2: 已发货\n3: 已签收\n4: 退款中',
      },
      number: {
        type: STRING(30),
        comment: '物流单号',
      },
      refund_remark: {
        type: STRING(250),
        allowNull: false,
        defaultValue: '',
        comment: '退款说明',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('order');
  },
};
