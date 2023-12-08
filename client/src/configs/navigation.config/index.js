import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
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
        translateKey: 'nav.fact',
        icon: 'fact',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'scrum',
        path: '/scrum',
        title: 'Scrum',
        translateKey: 'nav.scrum',
        icon: 'scrum',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    }
]

export default navigationConfig
