'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // 用户
  router.post('/auth', controller.user.login); // 登录
  router.post('/users/verify', controller.user.verify); // 验证码
  router.post('/users', controller.user.register); // 注册
  router.get('/check_login', middleware.userAuth, controller.user.check_login); // 检查登录
  router.get('/users', middleware.userAuth, controller.user.get_user_info); // 获取用户信息
  router.post('/users/password_verify', middleware.userAuth, controller.user.passord_verify); // 发送修改密码验证码
  router.put('/users/password', middleware.userAuth, controller.user.modify_password); // 修改密码
  router.put('/users', middleware.userAuth, controller.user.modify); // 修改用户信息

  // 用户的地址管理
  router.post('/addresses', middleware.userAuth, controller.address.create); // 用户添加地址收货人
  router.put('/address/:id', middleware.userAuth, controller.address.modify); // 用户修改地址收货人
  router.delete('/address/:id', middleware.userAuth, controller.address.destroy); // 用户删除某一项地址收货人
  router.get('/addresses', middleware.userAuth, controller.address.index); // 用户获取地址收货人列表

  //用户的收藏管理
  router.post('/collections', middleware.userAuth, controller.collection.create); // 用户添加收藏
  router.delete('/collections/:id', middleware.userAuth, controller.collection.destroy); // 用户删除收藏
  router.get('/collections', middleware.userAuth, controller.collection.index); // 用户获取收藏商品列表

  // admin验证
  router.post('/admin/auth', controller.admin.login); // 登录

  // 分类
  router.post('/admin/categories', middleware.adminAuth, controller.category.create); // 添加分类
  router.put('/admin/category/:id', middleware.adminAuth, controller.category.modify); // 修改分类
  router.delete('/admin/category/:id', middleware.adminAuth, controller.category.destroy); // 删除分类
  router.get('/categories', controller.category.index); // 获取分类

  // 上传
  router.post('/pictures', controller.attachment.upload); // 上传图片

  // 商品
  router.get('/goods', controller.goods.index); // 首页商品列表
  router.get('/goods/search', controller.goods.search); // 搜索商品
  router.get('/goods/comments', controller.goods.getComments); // 获取评价
  router.get('/goods/:id', controller.goods.getDetail); // 获取商品详情
  router.get('/admin/goods', middleware.adminAuth, controller.goods.index_admin); // 管理端商品列表
  router.get('/admin/goods/search', middleware.adminAuth, controller.goods.search_admin); // 管理端搜索商品
  router.get('/admin/goods/:id', middleware.adminAuth, controller.goods.detail_admin); // 管理端商品详情
  router.post('/admin/goods', middleware.adminAuth, controller.goods.create); // 新增商品
  router.post('/admin/goods/sku/:id/stock', middleware.adminAuth, controller.goods.increment); // 新增入库
  router.put('/admin/goods/:id', middleware.adminAuth, controller.goods.update); // 更新商品
  router.put('/admin/goods/:goods_id/sku/:sku_id', middleware.adminAuth, controller.goods.updateSku); // 更新sku
  router.delete('/admin/goods/:id', middleware.adminAuth, controller.goods.destroy); // 下架商品
  router.post('/admin/goods/:id/putaway', middleware.adminAuth, controller.goods.rePutaway); // 重新上架

  // 入库记录
  router.get('/admin/records', middleware.adminAuth, controller.record.index); // 入库记录列表

  // 订单
  router.get('/orders', middleware.userAuth, controller.order.index); // 获取订单列表
  router.post('/orders', middleware.userAuth, controller.order.create); // 创建订单
  router.post('/order/:id/refund', middleware.userAuth, controller.order.refund); // 申请退款
  router.post('/order/:id/recv', middleware.userAuth, controller.order.recv); // 确认收货
  router.post('/order/item/:id/comment', middleware.userAuth, controller.order.comment); // 评价
  router.get('/admin/orders', middleware.adminAuth, controller.order.admin_index); // 管理端列表
  router.get('/admin/orders/search', middleware.adminAuth, controller.order.admin_search); // 管理端搜索
  router.put('/admin/order/:id/deliver', middleware.adminAuth, controller.order.admin_deliver); // 发货
  router.post('/admin/order/:id/refund', middleware.adminAuth, controller.order.admin_refund); // 确认退款

  // 购物车
  router.get('/carts', middleware.userAuth, controller.cart.index); // 购物车列表
  router.post('/carts', middleware.userAuth, controller.cart.create); // 加入购物车
  router.put('/carts/:id', middleware.userAuth, controller.cart.update); // 更新数量
  router.delete('/carts', middleware.userAuth, controller.cart.destroy); // 删除

  // 轮播图
  router.get('/carousel', controller.carousel.index); // index
  router.post('/admin/carousel', middleware.adminAuth, controller.carousel.upload); // 设置轮播图
  
};
