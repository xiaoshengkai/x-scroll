import XScroll from './components/scroll.vue'
        
// 导出模块
export default XScroll;

//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('x-scroll', XScroll);
}