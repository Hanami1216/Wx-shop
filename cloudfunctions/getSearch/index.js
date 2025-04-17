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
      case 'history': {
        // 获取搜索历史
        const historyRes = await db.collection('search_history')
          .orderBy('timestamp', 'desc')
          .limit(10)
          .get();
        result = historyRes.data.map(item => item.keyword);
        break;
      }
      case 'popular': {
        // 获取热门搜索
        const popularRes = await db.collection('search_popular')
          .orderBy('count', 'desc')
          .limit(10)
          .get();
        result = popularRes.data.map(item => item.keyword);
        break;
      }
      case 'result': {
        // 获取搜索结果
        const { keyword, pageIndex = 1, pageSize = 20 } = params;
        const skip = (pageIndex - 1) * pageSize;
        
        const _ = db.command;
        const goodsRes = await db.collection('goods')
          .where({
            title: db.RegExp({
              regexp: keyword,
              options: 'i'
            })
          })
          .skip(skip)
          .limit(pageSize)
          .get();
          
        result = {
          spuList: goodsRes.data.map(item => ({
            spuId: item._id,
            thumb: item.primaryImage,
            title: item.title,
            price: item.minSalePrice,
            originPrice: item.maxLinePrice,
            tags: item.spuTagList?.map(tag => ({ title: tag.title })) || []
          }))
        };
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
      message: err.message || '搜索操作失败'
    };
  }
};