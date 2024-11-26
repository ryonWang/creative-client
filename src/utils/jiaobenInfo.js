import api from '@/utils/request/BaseRequest'

// 查询脚本库列表
export function listJiaobenInfo(query) {
  return request({
    url: '/hugai/jiaobenInfo/list',
    method: 'get',
    params: query
  })
}

//查询所有脚本列表（未删除）
export function getJiaobenList(){
    api.get('module/jiaoben/list').then(res =>{
      return res.data;
  })
}

// 查询脚本库详细
export function getJiaobenInfo(id) {
  return request({
    url: '/hugai/jiaobenInfo/' + id,
    method: 'get'
  })
}

// 新增脚本库
export function addJiaobenInfo(data) {
    return api.post('module/jiaoben/addJiaobenAndSub',data)
}

// 修改脚本库
export function updateJiaobenInfo(data) {
  return request({
    url: '/hugai/jiaobenInfo',
    method: 'put',
    data: data
  })
}

// 删除脚本库
export function delJiaobenInfo(id) {
  return request({
    url: '/hugai/jiaobenInfo/' + id,
    method: 'delete'
  })
}
