import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      // 题库
      // {
      //   path: '/topicbank',
      //   name: 'topicbank',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
      // },
      // js题库
      {
        path: '/jsbank',
        name: 'jsbank',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
      },
      // 创建任务
      {
        path: '/createtask',
        name: 'createtask',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CreateTask.vue')
      },
      // 修改用户信息
      {
        path: '/information',
        name: 'information',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/InformationView.vue')
      },
      // 聊天界面
      {
        path: '/task',
        name: 'task',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/TaskView.vue')
      },
      // 任务列表
      {
        path: '/listView',
        name: 'listView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ListView.vue')
      },
      // 任务详情
      {
        path: '/viewDetails',
        name: 'viewDetails',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ViewDetails.vue')
      },
      // 用户信息列表
      {
        path: '/usersList',
        name: 'usersList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/UsersList.vue')
      },

      // 角色管理
      {
        path: '/roleview',
        name: 'roleview',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/RoleView.vue'),
        children: [
          {
            path: '/Permissionmanagement',
            name: 'permissionmanagement',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/PermissionManagement.vue')
          },
        ]
      },
      // 权限管理
      {
        path: '/permissions',
        name: 'permissions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/permissionsView.vue')
      },
    ]
    // 登录
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  // 注册
  {
    path: '/enroll',
    name: 'enroll',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EnrollView.vue')
  },










]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
