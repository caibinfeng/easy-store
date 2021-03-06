'use strict';

const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL, ENUM } = app.Sequelize;

  const Order = app.model.define('order', {
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
    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    deleted_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('deleted_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    underscored: true,
    paranoid: true,
    tableName: 'order',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  Order.associate = () => {
    app.model.Order.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    app.model.Order.hasMany(app.model.Item, { as: 'items', foreignKey: 'order_id' });
    app.model.Order.belongsTo(app.model.Address, { as: 'address', foreignKey: 'address_id' });
  };

  return Order;
};
