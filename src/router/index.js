import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import AskQuestion from '../views/AskQuestion.vue';
import QuestionDetail from '../views/QuestionDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/sign-in',
    component: SignIn,
    name: 'SingIn'
  },
  {
    path: '/sign-up',
    component: SignUp,
    name: 'SingUp'
  },
  {
    path: '/ask-question',
    component: AskQuestion,
    name: 'AskQuestion'
  },
  {
    path: '/question',
    component: QuestionDetail,
    name: 'question'
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
