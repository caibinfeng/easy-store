'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('records', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sku_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'skus',
          key: 'id',
        },
      },
      num: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '入库数量',
      },
      price: {
        type: INTEGER,
        allowNull: false,
        comment: '入库金额',
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('records');
  },
};
