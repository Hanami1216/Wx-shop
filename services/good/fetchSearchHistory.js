import { config } from '../../config/index';

/** 获取搜索历史 */
function mockSearchHistory() {
  const { delay } = require('../_utils/delay');
  const { getSearchHistory } = require('../../model/search');
  return delay().then(() => getSearchHistory());
}

/** 获取搜索历史 */
export function getSearchHistory() {
  if (config.useMock) {
    return mockSearchHistory();
  }
  return wx.cloud
    .callFunction({
      name: 'getSearch',
      data: {
        type: 'history'
      }
    })
    .then((res) => res.result.data);
}

/** 获取搜索历史 */
function mockSearchPopular() {
  const { delay } = require('../_utils/delay');
  const { getSearchPopular } = require('../../model/search');
  return delay().then(() => getSearchPopular());
}

/** 获取搜索历史 */
export function getSearchPopular() {
  if (config.useMock) {
    return mockSearchPopular();
  }
  return wx.cloud
    .callFunction({
      name: 'getSearch',
      data: {
        type: 'popular'
      }
    })
    .then((res) => res.result.data);
}
