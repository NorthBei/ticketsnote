import 'vue-material/dist/vue-material.min.css';
// customize theme by sass
// import 'vue-material/dist/theme/default.css'
import '@/styles/theme.scss';
import '@/libs/firebase';

import Vue from 'vue';
// import VueGtm from 'vue-gtm'
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import VueScrollTo from 'vue-scrollto';
import Vuelidate from 'vuelidate';

import router from '@/router';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(VueScrollTo);
Vue.use(Vuelidate);

/**
Vue.use(VueGtm, {
  id: import.meta.env.VITE_GTM_ID, // Your GTM single container ID or array of container ids ['GTM-xxxxxxx', 'GTM-yyyyyyy']
  queryParams: { // Add url query string when load gtm.js with GTM ID (optional)
    gtm_auth: import.meta.env.VITE_GTM_AUTH,
    gtm_preview: import.meta.env.VITE_GTM_PREVIEW,
    gtm_cookies_win: import.meta.env.VITE_GTM_COOKIES_WIN
  },
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: import.meta.env.MODE === 'development', // Whether or not display console logs debugs (optional)
  loadScript: true // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
});
**/

// add event bus
Vue.prototype.$bus = new Vue();

const app = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');

app.$material.locale = {
  startYear: 2019,
  endYear: 2050,
  dateFormat: 'yyyy-MM-dd',
  firstDayOfAWeek: 1,
  days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  shortDays: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
  shorterDays: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  shorterMonths: ['J', 'F', 'M', 'A', 'M', 'Ju', 'Ju', 'A', 'Se', 'O', 'N', 'D'],
  cancel: '取消',
  confirm: '確定'
};
