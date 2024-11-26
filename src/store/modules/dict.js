import api from '/src/utils/request/request'
const baseApi = "/module/system/basedictdata";
// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
    return api.request({
      url: baseApi + '/getListByDictType/' + dictType,
      method: 'get'
    })
  }
// export function getDicts(dictType) {
//   return api.get(baseApi + "/getListByDictType/",dictType)
// }
  // 查询字典数据列表
export function listData(query) {
    return request({
      url: '/system/dict/data/list',
      method: 'get',
      params: query
    })
  }
  // 查询字典数据详细
export function getData(dictCode) {
    return request({
      url: '/system/dict/data/' + dictCode,
      method: 'get'
    })
  }
  // 查询字典类型列表
export function listType(query) {
    return request({
      url: '/system/dict/type/list',
      method: 'get',
      params: query
    })
  }
  // 查询字典类型详细
export function getType(dictId) {
    return request({
      url: '/system/dict/type/' + dictId,
      method: 'get'
    })
  }