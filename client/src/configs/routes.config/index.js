import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'profile',
        path: '/profile',
        component: React.lazy(() => import('views/Profile')),
        authority: [],
    },
    {
        key: 'facts',
        path: '/facts',
        component: React.lazy(() => import('views/Fact')),
        authority: [],
    },
    {
        key: 'scrum',
        path: '/scrum',
        component: React.lazy(() => import('views/ScrumBoard')),
        authority: [],
    },
]
