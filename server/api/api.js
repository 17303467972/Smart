import service from '../../axios'

 
//获取用户信息接口
export function getRightsInfo(data) {
    return service ({
      method:'get',
      url:'/rights',
      data
    })
  }

  export function getUserInfo(params) {
    return service ({
      method:'get',
      url:'/getUser',
      params
    })
  }
//列表删除
// export function deleteUser(id){
//   return service({
//     method:'delete',
//     url:`/getUser/${id}`
//   })
// }

export function putUser(id, user){
  return service.put(`/users/${id}`, user);
}

