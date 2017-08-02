import Swiper from './swiper.vue'

const install = function(Vue) {
  if (install.installed) return;
  Vue.component('swiper', Swiper);
}
export default install