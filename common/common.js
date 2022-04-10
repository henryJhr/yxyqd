/**
 * 公共API
 */
import {http, Method} from '@/utils/request.js';
import api from '@/config/api.js';


/**
 * 获取地区数据
 * @param id
 */
export function recharge(params) {
  return http.request({
    url: "/test",
    method: Method.POST,
    params,
  });
}

