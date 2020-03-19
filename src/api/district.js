// 地址查询api
export function getDistrict(param) {
  const axios = require('vue').default.axios
  return axios('http://district.market.alicloudapi.com/v3/config/district', {
    headers: {
      'Authorization': 'APPCODE fa1603c54f8d4b4d8441508d91a60828'
    },
    params: {
      output: 'JSON',
      subdistrict: '1',
      ...param
    }
  })
}
