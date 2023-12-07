import React from 'react'
import classNames from 'classnames'
import { Select, Badge } from 'components/ui'
import { setThemeColor, setThemeColorLevel } from 'store/theme/themeSlice'
import { HiCheck } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { components } from 'react-select'
import { t } from 'i18next'
const { Control } = components

const colorList = [
    { label: t("config.red"), value: 'red' },
    { label: t("config.orange"), value: 'orange' },
    { label: t("config.amber"), value: 'amber' },
    { label: t("config.yellow"), value: 'yellow' },
    { label: t("config.lime"), value: 'lime' },
    { label: t("config.green"), value: 'green' },
    { label: t("config.emerald"), value: 'emerald' },
    { label: t("config.teal"), value: 'teal' },
    { label: t("config.cyan"), value: 'cyan' },
    { label: t("config.sky"), value: 'sky' },
    { label: t("config.blue"), value: 'blue' },
    { label: t("config.indigo"), value: 'indigo' },
    { label: t("config.violet"), value: 'violet' },
    { label: t("config.purple"), value: 'purple' },
    { label: t("config.fuchsia"), value: 'fuchsia' },
    { label: t("config.pink"), value: 'pink' },
    { label: t("config.rose"), value: 'rose' },
]

const colorLevelList = [
    { label: '400', value: 400 },
    { label: '500', value: 500 },
    { label: '600', value: 600 },
    { label: '700', value: 700 },
    { label: '800', value: 800 },
    { label: '900', value: 900 },
]

const ColorBadge = ({ className, themeColor }) => {
    const primaryColorLevel = useSelector(
        (state) => state.theme.primaryColorLevel
    )

    return (
        <Badge
            className={className}
            innerClass={classNames(`bg-${themeColor}-${primaryColorLevel}`)}
        />
    )
}

const CustomSelectOption = ({ innerProps, label, value, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <ColorBadge themeColor={value} />
                <span>{t(`config.${value}`)}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]

    const themeColor = useSelector((state) => state.theme.themeColor)

    return (
        <Control {...props}>
            {selected && (
                <ColorBadge
                    themeColor={themeColor}
                    className="ltr:ml-4 rtl:mr-4"
                />
            )}
            {children}
        </Control>
    )
}

const ThemeSwitcher = () => {
    const dispatch = useDispatch()

    const themeColor = useSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useSelector(
        (state) => state.theme.primaryColorLevel
    )

    const onThemeColorChange = ({ value }) => {
        dispatch(setThemeColor(value))
    }

    const onThemeColorLevelChange = ({ value }) => {
        dispatch(setThemeColorLevel(value))
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <Select
                size="sm"
                options={colorList}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                value={colorList.filter((color) => color.value === themeColor)}
                onChange={onThemeColorChange}
            />
            <Select
                size="sm"
                options={colorLevelList}
                value={colorLevelList.filter(
                    (color) => color.value === primaryColorLevel
                )}
                onChange={onThemeColorLevelChange}
            />
        </div>
    )
}

export default ThemeSwitcher
