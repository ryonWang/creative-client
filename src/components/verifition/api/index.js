import api from "@/utils/request/BaseRequest";

// 获取验证图片  以及token
export function reqGet(data) {
  console.log('Full Request URL:', process.env.VUE_APP_BASE_API + '/captcha/get')
  return api.post('/captcha/get',data);
}

// 滑动或者点选验证
export function reqCheck(data) {
  return api.post('/captcha/check',data);
}

