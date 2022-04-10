import { http } from "@/utils/request.js";

import api from "@/config/api.js";

/**
 * 短信登录
 * @param  mobile
 * @param  smsCode
 */
export function smsLogin(params, clientType) {
  return http.request({
    url: `/members/smsLogin`,
    method: "POST",
    data: params,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      clientType: clientType,
    },
  });
}

/**
 * 刷新token
 */
export function refreshTokenFn(refresh_token) {
  return http.request({
    url: `/members/refresh/${refresh_token}`,
    method: "GET",
  });
}

/**
 * 获取userid
 * @param  mobile
 * @param  smsCode
 */
export function WxLogin(params, clientType) {
  return http.request({
    url: `/wx/api/login/login`,
    method: "POST",
    data: params,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      clientType: clientType,
    },
  });
}

/**
 * 存储用户信息
 * @param  mobile
 * @param  smsCode
 */
export function putUser(params, clientType) {
  return http.request({
    url: `/wx/api/login/putUser`,
    method: "POST",
    data: params,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      clientType: clientType,
    },
  });
}