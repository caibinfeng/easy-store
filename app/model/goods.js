'use strict';

const moment = require('moment');

module.exports = app => {
  const { STRING, DATE, INTEGER, TEXT, DECIMAL } = app.Sequelize;

  const Goods = app.model.define('goods', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    pic: {
      type: TEXT,
      allowNull: false,
    },
    description: {
      type: TEXT,
      allowNull: false,
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    price: {
      type: DECIMAL(12, 2),
      allowNull: false,
    },
    view: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock_num: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '总库存',
    },
    sale_num: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '总销量',
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
        return this.getDataValue('deleted_at') === null ?
              null
              : moment(this.getDataValue('deleted_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    underscored: true,
    paranoid: true,
    tableName: 'goods',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  Goods.associate = () => {
    app.model.Goods.belongsTo(app.model.Category, { as: 'category', foreignKey: 'category_id' });
    app.model.Goods.hasMany(app.model.Specification, { as: 'specifications', foreignKey: 'goods_id' });
    app.model.Goods.hasMany(app.model.Sku, { as: 'sku', foreignKey: 'goods_id' });
    app.model.Goods.hasMany(app.model.Comment, { as: 'comments', foreignKey: 'goods_id' });
  };

  return Goods;
};
