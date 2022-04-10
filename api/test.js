import { http, Method } from "@/utils/request.js";

/**
 * 意见反馈
 */
export function test(params) {
  return http.request({
    url: "/wx/api/test/getTest",
    method: Method.POST,
    header: {
      "Content-Type": "application/json",
    },
    data: params,
  });
}
