import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = props => {
  return (
    <>
      {props.role === 'admin' ? (
        <Route {...props} render={props => props.children} />
      ) : (
        <Redirect to={'/login'} />
      )}
    </>
  )
}

export default AdminRoute
