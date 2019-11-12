import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/sc/index.vue';
import Finance from './components/sc/finance.vue';
import Analysis from './components/sc/analysis.vue';
import Registe from './components/sc/registe.vue';
import Model from './components/sc/model.vue';
 import Home from './components/home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component:Index},
    {path:'/index',component:Index},
    {path:'/finance',component:Finance},
    {path:'/analysis',component:Analysis},
    {path:'/registe',component:Registe},
    {path:'/model',component:Model},
    {path:'/home',component:Home},
  ]
})
