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
      case 'list': {
        // 获取商品列表
        const { pageIndex = 1, pageSize = 20 } = params;
        const skip = (pageIndex - 1) * pageSize;
        
        const goodsRes = await db.collection('goods')
          .skip(skip)
          .limit(pageSize)
          .get();
          
        result = goodsRes.data.map(item => ({
          spuId: item._id,
          thumb: item.primaryImage,
          title: item.title,
          price: item.minSalePrice,
          originPrice: item.maxLinePrice,
          tags: item.spuTagList?.map(tag => tag.title) || []
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
      message: err.message || '查询商品列表失败'
    };
  }
};