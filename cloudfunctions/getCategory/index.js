// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event) => {
  const { type } = event;
  const db = cloud.database();
  
  try {
    let result = null;
    
    switch (type) {
      case 'list': {
        // 获取分类列表
        const categoryRes = await db.collection('categories')
          .orderBy('sort', 'asc')
          .get();
          
        result = categoryRes.data.map(item => ({
          id: item._id,
          name: item.name,
          icon: item.icon,
          sort: item.sort
        }));
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
      message: err.message || '查询分类数据失败'
    };
  }
};