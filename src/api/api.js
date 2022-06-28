// 存放服务端接口

import axios from "axios"

// 一参接口名 二参入参  三参方法

const getPostConfig = function () {
    return {
        headers: {
            authorization: sessionStorage.getItem("token")
        }
    }

}
// 查看自己信息
export const getUserInfoApi = function (payload = {}) {
    return axios.post('/api/user/info', payload, getPostConfig())
}
// 获取验证码
export const getCaptchaApi = function () {
    return "/api/captcha?" + Math.random();
}
// 登录接口
export const loginApi = function (payload = {}) {
    return axios.post('/api/user/login', payload)
}
// 注册接口
export const enrollApi = function (payload = {}) {
    return axios.post('/api/user/register', payload)
}

// 退出接口
export const logoutApi = function (payload = {}) {
    return axios.post('/api/user/logout', payload)
}

// 查看题接口
export const titleApi = function (payload = {}) {
    return axios.post('/api/question/list', payload)
}

// 删除题接口
export const deleteApi = function (payload = {}) {
    return axios.post('/api/question/delete', payload)
}

// 添加题接口
export const createApi = function (payload = {}) {
    return axios.post('/api/question/create', payload)
}

// 修改题接口
export const updateApi = function (payload = {}) {
    return axios.post('/api/question/update', payload)
}

// 修改个人信息
export const userupdateApi = function (payload = {}) {
    return axios.post('/api/user/update', payload)
}

// 查询记事本
export const getNotepadApi = function (payload = {}) {
    return axios.post('/api/diary/list', payload)
}

// 增加记事本
export const createNotepadApi = function (payload = {}) {
    return axios.post('/api/diary/create', payload)
}

// 创建任务
export const createtaskApi = function (payload = {}) {
    return axios.post('/api/task/create', payload)
}

// 发布任务
export const sendTaskApi = function (payload = {}) {
    return axios.post('/api/task/release', payload)
}

// 查看任务列表
export const listViewApi = function (payload = {}) {
    return axios.post('/api/task/list', payload, getPostConfig())
}

// 查看任务详情
export const taskDetailsApi = function (payload = {}) {
    return axios.post('/api/task/detail', payload)
}
//  修改任务
export const taskUpdateApi = function (payload = {}) {
    return axios.post('/api/task/update', payload)
}

// 查看用户信息
export const userListApi = function (payload = {}) {
    return axios.post('/api/user/list', payload)
}

// 创建角色
export const createRoleApi = function (payload = {}) {
    return axios.post('/api/role/create', payload)
}

// 角色列表
export const roleListApi = function (payload = {}) {
    return axios.post('/api/role/list', payload)
}

// 创建角色组
export const createroleGroupApi = function (payload = {}) {
    return axios.post('/api /roleGroup/create', payload)
}

// 角色分组列表
export const listroleGroupApi = function (payload = {}) {
    return axios.post('/api/roleGroup/list', payload)
}


//列表权限接口
export const PermissionApi = function (payload = {}) {
    return axios.post('/api/permission/list', payload)
}


// 添加权限接口
export const AddApi = function (payload = {}) {
    return axios.post('/api/permission/create', payload)
}

// 删除权限接口
export const EliminateApi = function (payload = {}) {
    return axios.post('/api/permission/delete', payload)
}

// 修改权限接口
export const ModifyPermissionsApi = function (payload = {}) {
    return axios.post('/api/permission/update', payload)
}

// 获取权限功能列表
export const rolepermissionApi = function (payload = {}) {
    return axios.post('/api/rolePermission/list', payload)
}

// 创建角色权限
export const createrolePermissionApi = function (payload = {}) {
    return axios.post('/api/rolePermission/create', payload)
}
