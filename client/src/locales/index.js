import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import fr from './lang/fr.json'
import vi from './lang/vi.json'
import rot13 from './lang/rot13.json'
import m from './lang/m.json'
import appConfig from 'configs/app.config'

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    vi: {
        translation: vi,
    },
    rot13: {
        translation: rot13,
    },
    m: {
        translation: m,
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: appConfig.locale,
    lng: appConfig.locale,
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
    fr: () => import('dayjs/locale/fr'),
    vi: () => import('dayjs/locale/vi'),
    rot13: () => import('dayjs/locale/en'),
    m: () => import('dayjs/locale/en'),
}

export default i18n
