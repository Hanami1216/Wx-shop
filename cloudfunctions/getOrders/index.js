// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { type = 'list', params = {} } = event;
  
  // 模拟订单数据
  const orderList = [
    {
      id: '1',
      orderNo: 'ord123456789',
      totalAmount: 99.00,
      status: 1,
      statusDesc: '待付款',
      createTime: '2024-01-20 10:00:00'
    },
    {
      id: '2',
      orderNo: 'ord987654321',
      totalAmount: 199.00,
      status: 2,
      statusDesc: '待发货',
      createTime: '2024-01-19 15:30:00'
    }
  ];

  // 模拟订单统计数据
  const orderCount = {
    pendingPayment: 1,
    pendingDelivery: 1,
    pendingReceipt: 0,
    pendingComment: 0,
    refunding: 0
  };

  switch (type) {
    case 'list':
      return {
        code: 0,
        data: orderList,
        message: 'success'
      };
    case 'count':
      return {
        code: 0,
        data: orderCount,
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