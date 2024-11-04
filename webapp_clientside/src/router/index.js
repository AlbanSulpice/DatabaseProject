import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ClientModule from '@/components/ClientModule'
import AgencyModule from '@/components/AgencyModule'
import PropertyModule from '@/components/PropertyModule.vue'

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
    }
  ]
})
