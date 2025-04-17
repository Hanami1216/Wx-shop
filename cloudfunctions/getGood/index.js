// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event) => {
  const { type, params } = event;
  const db = cloud.database();
  
  try {
    let result = null;
    
    switch (type) {
      case 'detail': {
        // 获取商品详情
        const { id } = params;
        const goodRes = await db.collection('goods').doc(id).get();
        result = goodRes.data;
        break;
      }
      default:
        break;
    }
    
    return {
      code: 0,
      data: result,
      message: 'success'
    };
  } catch (err) {
    return {
      code: 1,
      data: null,
      message: err.message || '查询商品数据失败'
    };
  }
};