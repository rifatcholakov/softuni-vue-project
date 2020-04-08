import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSeedling, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import VueFire
import { firestorePlugin } from 'vuefire';

// Import VueScrollTo
import VueScrollTo from 'vue-scrollto';

// Use Bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Use FontAwesome
library.add([faSeedling, faUser])
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Use VueFire
Vue.use(firestorePlugin);

// Use ScrollTo
Vue.use(VueScrollTo);

Vue.config.productionTip = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
