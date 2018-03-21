import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import MintUI from 'mint-ui';
import Index from './index.vue';


import 'mint-ui/lib/style.css'
import './components/CommonCSS/weui.min.css';
import './index.less';

Vue.use(MintUI);

// 取消首屏加载动画
document.getElementById('loading').innerHTML = '';

new Vue({
  'el': '#app',
  'components': { Index },
  'template': '<Index/>',
  router,
});
