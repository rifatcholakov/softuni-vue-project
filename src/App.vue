<template>
  <div class="app">
    <app-header :authUser="authUser" ></app-header>
    <router-view :authUser="authUser" />
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { Auth } from './firebase/auth';

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  data() {
    return {
      authUser: null
    }
  },
  created() {
    Auth.onAuthStateChanged(user => this.authUser = user);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
  
.app {
    font-family: 'Nunito', sans-serif;
}

.error-message {
    background: #ed5a5a;
    color: #fff;
    border-radius: 4px;
    border: solid 2px #ed5a5a;
    padding: 5px 10px;
    margin: 10px 0;
}

</style>
