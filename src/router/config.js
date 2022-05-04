import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: '/dashboard/workplace',
          name: '工作台',
          meta: {
            page: {
              closable: false
            }
          },
          component: () => import('@/pages/dashboard/workplace'),
        },
        {
          name: '账号管理',
          path: 'account',
          meta: {
            icon: 'project',
          },
          component: () => import('@/pages/account/index')
        },
        {
          name: '角色管理',
          path: 'role',
          meta: {
            icon: 'project',
          },
          component: () => import('@/pages/role/index')
        },
        {
          name: '权限管理',
          path: 'jurisdiction',
          meta: {
            icon: 'project',
          },
          component: () => import('@/pages/jurisdiction/index')
        },
        {
          path: 'secret',
          name: '密钥管理',
          meta: {
            icon: 'project',
          },
          component: () => import('@/pages/secret/index'),
          children: [
            {
              name: 'RSA',
              path: 'rsa',
              meta: {
                icon: 'project',
              },
              component: () => import('@/pages/secret/Rsa/index')
            },{
              name: 'AES',
              path: 'aes',
              meta: {
                icon: 'project',
              },
              component: () => import('@/pages/secret/AES/index')
            },
          ]
        },
        // {
        //   path: 'note',
        //   name: '通告与资源管理',
        //   meta: {
        //     icon: 'project',
        //   },
        //   component: () => import('@/pages/note/index'),
        //   children: [
        //     {
        //       name: '通告管理',
        //       path: 'annunciate',
        //       component: () => import('@/pages/note/annunciate/index')
        //     },{
        //       name: '资源管理',
        //       path: 'resource',
        //       component: () => import('@/pages/note/resource/index')
        //     },
        //   ]
        // },

        // {
        //   path: 'result',
        //   name: '结果页',
        //   meta: {
        //     icon: 'check-circle-o',
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'success',
        //       name: '成功',
        //       component: () => import('@/pages/result/Success')
        //     },
        //     {
        //       path: 'error',
        //       name: '失败',
        //       component: () => import('@/pages/result/Error')
        //     }
        //   ]
        // },
        // {
        //   path: 'exception',
        //   name: '异常页',
        //   meta: {
        //     icon: 'warning',
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: '404',
        //       name: 'Exp404',
        //       component: () => import('@/pages/exception/404')
        //     },
        //     {
        //       path: '403',
        //       name: 'Exp403',
        //       component: () => import('@/pages/exception/403')
        //     },
        //     {
        //       path: '500',
        //       name: 'Exp500',
        //       component: () => import('@/pages/exception/500')
        //     }
        //   ]
        // },
        // {
        //   path: 'components',
        //   name: '内置组件',
        //   meta: {
        //     icon: 'appstore-o'
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'taskCard',
        //       name: '任务卡片',
        //       component: () => import('@/pages/components/TaskCard')
        //     },
        //     {
        //       path: 'palette',
        //       name: '颜色复选框',
        //       component: () => import('@/pages/components/Palette')
        //     },
        //     {
        //       path: 'table',
        //       name: '高级表格',
        //       component: () => import('@/pages/components/table')
        //     }
        //   ]
        // },

      ]
    },
  ]
}

export default options
