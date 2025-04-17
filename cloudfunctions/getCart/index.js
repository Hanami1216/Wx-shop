// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  
  try {
    // 获取用户的购物车数据
    const cartData = await db.collection('cart')
      .where({
        _openid: wxContext.OPENID
      })
      .get();

    // 获取商品详情
    const goodIds = cartData.data.map(item => item.goodId);
    const goodsData = await db.collection('goods')
      .where({
        _id: db.command.in(goodIds)
      })
      .get();

    // 组装购物车数据
    const cartItems = cartData.data.map(cartItem => {
      const good = goodsData.data.find(g => g._id === cartItem.goodId);
      return {
        ...cartItem,
        goods: good
      };
    });

    // 按照店铺分组
    const groupedCart = {};
    cartItems.forEach(item => {
      const storeId = item.goods.storeId;
      if (!groupedCart[storeId]) {
        groupedCart[storeId] = {
          storeId: storeId,
          storeName: item.goods.storeName,
          goodsList: []
        };
      }
      groupedCart[storeId].goodsList.push({
        id: item._id,
        goodId: item.goodId,
        thumb: item.goods.thumb,
        title: item.goods.title,
        price: item.goods.price,
        num: item.quantity,
        skuId: item.skuId,
        selected: item.selected || false,
        stockStatus: item.goods.stockStatus || 1,
        stockQuantity: item.goods.stockQuantity || 999
      });
    });

    return {
      code: 'SUCCESS',
      data: Object.values(groupedCart)
    };

  } catch (error) {
    console.error('获取购物车数据失败：', error);
    return {
      code: 'FAIL',
      message: '获取购物车数据失败'
    };
  }
};