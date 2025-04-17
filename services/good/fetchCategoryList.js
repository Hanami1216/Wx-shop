import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export function getCategoryList() {
  if (config.useMock) {
    return mockFetchGoodCategory();
  }
  return wx.cloud
    .callFunction({
      name: 'getCategory',
      data: {
        type: 'list'
      }
    })
    .then((res) => res.result.data);
}
