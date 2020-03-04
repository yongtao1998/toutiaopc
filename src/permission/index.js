/***
 *  处理路由权限
 */
import router from '@/router'
// 注册全局前置守卫
// 回调函数会发生在路由发生改变之前
// next有三种情景
// next() 放过
// next(false) 拦截
// next('/home')返回/home路径
// to:从哪来
// from:往哪去
// next：必须执行
router.beforeEach(function (to, from, next) {
  // 1. 先判断请求的地址是否以 /home开头
  if (to.path.startsWith('/home')) {
    // 2. 再判断是否登录 并取回token
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 登陆了 放过
    } else {
      next('/login') // 没登陆 强制登录
    }
  } else {
    // 如果不是去主页 放过

    next()
  }
})
