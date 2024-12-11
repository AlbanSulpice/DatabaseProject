import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ClientModule from '@/components/ClientModule'
import AgencyModule from '@/components/AgencyModule'
import PropertyModule from '@/components/PropertyModule.vue'
import LandlordModule from '../components/LandlordModule.vue'
import SalesModule from '../components/SalesModule.vue'
import AuthModule from '../components/AuthModule.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    },
    {
      path: '/sale',
      redirect: '/sale/list/all'
    },
    {
      path: '/auth',
      name: 'AuthenticationDemo',
      component: AuthModule
    },
    {
      path: '/sale/:action/:id',  
      name: 'sale',
      component: SalesModule,
      props: true
    }
  ]
})
