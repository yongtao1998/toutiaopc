// 使用Vue.use 的方式注册
// Vue.use会调用对象中的 install 方法 install方法第一个参数 是vue对象
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'

export default {
  install: function (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', BreadCrumb) // 注册一个面包屑组件
  }
}
