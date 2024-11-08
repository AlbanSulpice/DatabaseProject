import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ClientModule from '@/components/ClientModule'
import AgencyModule from '@/components/AgencyModule'
import PropertyModule from '@/components/PropertyModule.vue'
import LandlordModule from '../components/LandlordModule.vue'
import Inscription from '../components/inscription.vue'
import login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription,
      props: true
    },{
      path: '/login',
      name: 'login',
      component: login,
      props: true
    },
    {
      path: '/client',
      redirect: '/client/list/all'
    },
    {
      path: '/client/:action/:id',  
      name: 'client',
      component: ClientModule,
      props: true
    },
    {
      path: '/agency',
      redirect: '/agency/list/all'
    },
    {
      path: '/agency/:action/:id',  
      name: 'agency',
      component: AgencyModule,
      props: true
    },
    {
      path: '/property',
      redirect: '/property/list/all'
    },
    {
      path: '/property/:action/:id',  
      name: 'property',
      component: PropertyModule,
      props: true
    },
    {
      path: '/landlord',
      redirect: '/landlord/list/all'
    },
    {
      path: '/landlord/:action/:id',  
      name: 'landlord',
      component: LandlordModule,
      props: true
    }
  ]
})
