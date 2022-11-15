import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Spinner from '../components/Spinner/Spinner'

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))
const Home = lazy(() => import('../pages/Home/Home'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register=lazy(()=>import('../pages/Register/Register'))

const Routes = () => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Switch>
        <Route  path="/home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
