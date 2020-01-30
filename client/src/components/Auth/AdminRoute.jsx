import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = props => {

  if (props.role === 'admin')
    return <Route {...props} render={props => props.children} />
  if (props.role === 'employee')
    return <Redirect to={'/401'} />

  return <Redirect to={'/login'} />
}

export default AdminRoute
