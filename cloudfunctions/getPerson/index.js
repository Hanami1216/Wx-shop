// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  // 这里可以根据需要从数据库获取用户信息
  // 目前返回模拟数据以对应原有的mock数据结构
  return {
    name: '张三',
    phoneNumber: '13800138000',
    address: {
      provinceName: '广东省',
      provinceCode: '440000',
      cityName: '深圳市',
      cityCode: '440300'
    }
  };
};