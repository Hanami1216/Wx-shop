import { config } from '../../config/index';

/** 获取订单详情mock数据 */
function mockFetchOrderDetail(params) {
  const { delay } = require('../_utils/delay');
  const { genOrderDetail } = require('../../model/order/orderDetail');

  return delay().then(() => genOrderDetail(params));
}

/** 获取订单详情数据 */
export function fetchOrderDetail(params) {
  if (config.useMock) {
    return mockFetchOrderDetail(params);
  }

  return wx.cloud
    .callFunction({
      name: 'getOrderDetail',
      data: {
        type: 'detail',
        params
      }
    })
    .then((res) => res.result.data);
}

/** 获取客服mock数据 */
function mockFetchBusinessTime(params) {
  const { delay } = require('../_utils/delay');
  const { genBusinessTime } = require('../../model/order/orderDetail');

  return delay().then(() => genBusinessTime(params));
}

/** 获取客服数据 */
export function fetchBusinessTime(params) {
  if (config.useMock) {
    return mockFetchBusinessTime(params);
  }

  return wx.cloud
    .callFunction({
      name: 'getOrderDetail',
      data: {
        type: 'business',
        params
      }
    })
    .then((res) => res.result.data);
}
