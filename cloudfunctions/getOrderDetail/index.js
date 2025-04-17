// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { type = 'detail', params = {} } = event;
  
  // 模拟订单详情数据
  const orderDetail = {
    id: '1',
    orderNo: 'ord123456789',
    totalAmount: 99.00,
    status: 1,
    statusDesc: '待付款',
    createTime: '2024-01-20 10:00:00',
    goods: [
      {
        id: 1,
        name: '商品1',
        price: 49.50,
        quantity: 1
      },
      {
        id: 2,
        name: '商品2',
        price: 49.50,
        quantity: 1
      }
    ],
    address: {
      name: '张三',
      phone: '13800138000',
      address: '广东省深圳市南山区科技园'
    }
  };

  // 模拟客服时间数据
  const businessTime = {
    businessTime: '周一至周五 9:00-18:00',
    servicePhone: '400-123-4567'
  };

  switch (type) {
    case 'detail':
      return {
        code: 0,
        data: orderDetail,
        message: 'success'
      };
    case 'business':
      return {
        code: 0,
        data: businessTime,
        message: 'success'
      };
    default:
      return {
        code: 1,
        data: null,
        message: '未知的操作类型'
      };
  }
};