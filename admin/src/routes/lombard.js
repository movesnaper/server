import Lombard from '@/view/Lombard'
import { Main, Price, Accounts, Ui, Program } from '@/view/settings'
import { Kassa, Ostatki, Penalty, FinResults } from '@/view/reports'
import store from '../setup/store-setup'

export default {
  path: '/lombard/:id',
  component: Lombard,
  children: [
      { path: '', redirect: 'settings/main' },
      { path: 'settings/main', component: Main, meta: { current: 'settings'} },
      { path: 'settings/price', component: Price, meta: { current: 'settings'} },
      { path: 'settings/account', component: Accounts, meta: { current: 'settings'} },
      { path: 'settings/ui', component: Ui, meta: { current: 'settings'} },
      { path: 'settings/program', component: Program, meta: { current: 'program'} },
      { path: 'reports/kassa', component: Kassa, meta: { current: 'reports'} },
      { path: 'reports/ostatki', component: Ostatki, meta: { current: 'reports'} },
      { path: 'reports/penalty', component: Penalty, meta: { current: 'reports'} },
      { path: 'reports/finresults', component: FinResults, meta: { current: 'reports'} },
  ],
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
