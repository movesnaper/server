
import Lombard from '@/view/Lombard'
import { Main, Price, Accounts, Ui } from '@/view/settings'
import { Kassa, Ostatki } from '@/view/reports'
// import { store } from '@/setup'

export default {
  path: '/lombard/:id',
//   name: 'lombard',
  component: Lombard,
  children: [
      { path: '', redirect: 'settings/main' },
      { path: 'settings/main', component: Main, meta: { current: 'settings'} },
      { path: 'settings/price', component: Price, meta: { current: 'settings'} },
      { path: 'settings/account', component: Accounts, meta: { current: 'settings'} },
      { path: 'settings/ui', component: Ui, meta: { current: 'settings'} },
      { path: 'reports/kassa', component: Kassa, meta: { current: 'reports'} },
      { path: 'reports/ostatki', component: Ostatki, meta: { current: 'reports'} },
  ]
}
