import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/incidentmanagement',
    name: 'IncidentManagement',
    meta: {
      breadcrumbRoute: [{ label: 'Incident Management' }],
      title: 'Incident Management',
    },
    component: () => import(/* webpackChunkName: "incidentmanagement" */ '../views/IncidentManagement.vue'),
  },
  {
    path: '/addincident',
    name: 'AddIncident',
    meta: {
      breadcrumbRoute: [{ label: 'Incident Management', to: '/incidentmanagement' }, { label: 'Add Incident' }],
      title: 'Add Incident',
    },
    component: () => import(/* webpackChunkName: "addincident" */ '../views/AddIncident.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
