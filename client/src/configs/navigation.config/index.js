import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'profile',
        path: '/profile',
        title: 'Profile',
        translateKey: 'nav.profile',
        icon: 'profile',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'fact',
        path: '/facts',
        title: 'Fact',
        translateKey: 'fact.fact',
        icon: 'fact',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'environmental_profile',
        path: '/environmental-profile',
        title: 'Environmental Profile',
        translateKey: 'nav.environmental_profile',
        icon: 'environmental_profile',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
]

export default navigationConfig
