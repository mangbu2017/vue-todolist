// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import Component from 'vue-class-component';
import 'iview/dist/styles/iview.css';


Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(Component);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
