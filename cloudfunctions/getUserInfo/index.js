// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  try {
    // 这里模拟返回用户中心数据
    // 实际应用中，你需要从云数据库中查询数据
    return {
      code: 'Success',
      data: {
        nickName: '测试用户',
        avatarUrl: '',
        phoneNumber: '13800138000',
        gender: 1,
        orderCount: {
          waitPay: 0,
          waitDelivery: 0,
          waitReceipt: 0,
          waitComment: 0,
        },
      },
      success: true,
    }
  } catch (error) {
    return {
      code: 'Error',
      error,
      success: false,
    }
  }
}