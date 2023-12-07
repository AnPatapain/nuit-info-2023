import React from 'react'
import ModeSwitcher from './ModeSwitcher'
import LayoutSwitcher from './LayoutSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import DirectionSwitcher from './DirectionSwitcher'
import NavModeSwitcher from './NavModeSwitcher'
import CopyButton from './CopyButton'
import { t } from 'i18next'
const ThemeConfigurator = ({ callBackClose }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-y-10 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h6>{t('config.dark_mode')}</h6>
                        <span>{t('config.switch_theme_to_dark_mode')}</span>
                    </div>
                    <ModeSwitcher />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h6>{t('config.direction')}</h6>
                        <span>{t('config.select_a_direction')}</span>
                    </div>
                    <DirectionSwitcher callBackClose={callBackClose} />
                </div>
                <div>
                    <h6 className="mb-3">{t('config.nav_mode')}</h6>
                    <NavModeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">{t('config.theme')}</h6>
                    <ThemeSwitcher />
                </div>
                {/* <div>
                    <h6 className="mb-3">Layout</h6>
                    <LayoutSwitcher />
                </div> */}
            </div>
            {/* <CopyButton /> */}
        </div>
    )
}

export default ThemeConfigurator
