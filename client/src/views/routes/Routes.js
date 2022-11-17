import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Spinner from '../components/Spinner/Spinner'

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const Register=lazy(()=>import('../pages/Register/Register'))
const AdminDashboard=lazy(()=>import('../pages/Admin/AdminDashboard'))
const CustomerDashboard=lazy(()=>import('../pages/Customer/CustomerDashboard'))
const JobSeekerDashboard=lazy(()=>import('../pages/JobSeeker/JobSeekerDashboard'))

const Routes = () => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={Register} />
        <Route path="/admindashboard" component={AdminDashboard} />
        <Route path="/customerdashboard" component={CustomerDashboard} />
        <Route path="/jobseekerdashboard" component={JobSeekerDashboard} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
