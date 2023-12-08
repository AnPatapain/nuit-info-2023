import React, { Suspense, useEffect } from 'react'
import { Loading } from 'components/shared'
import { protectedRoutes, publicRoutes } from 'configs/routes.config'
import appConfig from 'configs/app.config'
import PageContainer from 'components/template/PageContainer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from 'components/route/ProtectedRoute'
import PublicRoute from 'components/route/PublicRoute'
import AuthorityGuard from 'components/route/AuthorityGuard'
import AppRoute from 'components/route/AppRoute'
import { Dialog } from 'components/ui'
import charlie from 'assets/images/charlie.png'
const { authenticatedEntryPath } = appConfig

const AllRoutes = (props) => {
    const userAuthority = useSelector((state) => state.auth.user.authority)
    const profile = useSelector((state) => state.profile)
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                {protectedRoutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <AuthorityGuard
                                userAuthority={userAuthority}
                                authority={route.authority}
                            >
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
            </Route>
            <Route element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>
             {/* Redirections */}
            <Route path="/" element={<Navigate replace to={`${authenticatedEntryPath}`} />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}

const Views = (props) => {
    const { themeColor, primaryColorLevel } = useSelector((state) => state.theme)
    const [opened, setOpened] = React.useState(false)
    useEffect(() => {
        if (themeColor === "green" && primaryColorLevel >=400 && primaryColorLevel <= 600) {
            setOpened(true)
        }
    }, [themeColor, primaryColorLevel])
    return (
        <Suspense fallback={<Loading loading={true} />}>
            <AllRoutes {...props} />
            <Dialog isOpen={opened} closable={false}>
                <img src={charlie} alt="charlie" className='w-full h-full'/>
            </Dialog>
        </Suspense>
    )
}

export default Views
