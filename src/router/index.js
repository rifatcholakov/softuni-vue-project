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
    path: '/sign-in',
    component: SignIn,
    name: 'SignIn',
  },
  {
    path: '/sign-up',
    component: SignUp,
    name: 'SignUp',
  },
  {
    path: '/ask-question',
    component: AskQuestion,
    name: 'AskQuestion',
  },
  {
    path: '/ask-question/:id',
    component: AskQuestion,
    name: 'EditQuestion',
  },
  {
    path: '/question/:id',
    component: QuestionDetail,
    name: 'Question'
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
