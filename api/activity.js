import { http, Method } from "@/utils/request.js";

export function getActivityList(params) {
  return http.request({
    url: "/wx/api/activity/getActivityList",
    method: Method.POST,
    header: {
      "Content-Type": "application/json",
    },
    data: params,
  });
}

export function getActivityById(params) {
  return http.request({
    url: "/wx/api/activity/getActivityById",
    method: Method.POST,
    header: {
      "Content-Type": "application/json",
    },
    data: params,
  });
}

export function getActivityApply(params) {
  return http.request({
    url: "/wx/api/activity/getActivityApply",
    method: Method.POST,
    header: {
      "Content-Type": "application/json",
    },
    data: params,
  });
}
