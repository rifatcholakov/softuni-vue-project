import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Use Bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Use FontAwesome
library.add(faSeedling)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
