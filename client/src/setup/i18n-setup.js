import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/ru'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ru',
  messages
})

const loadedLanguages = ['ru'] 

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
