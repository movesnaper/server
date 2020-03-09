
import User from '@/view/User'
import { Main, Passport } from '@/view/user-settings'

export default {
  path: '/user/:id',
//   name: 'lombard',
  component: User,
  children: [
      { path: '', redirect: 'settings/main' },
      { path: 'settings/main', component: Main, meta: { current: 'settings'} },
      { path: 'settings/passport', component: Passport, meta: { current: 'settings'} },
    //   { path: 'report/stats', component: Kassa, meta: { current: 'report'} },
  ]
}
