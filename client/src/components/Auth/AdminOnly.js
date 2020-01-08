import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

const AdminOnly = (props) => (
    <Fragment>
        { console.log("adminOnly", props.children)} 
        { props.role === 'admin' ? props.children : <Redirect to={"/login"} /> }
    </Fragment>
)
export default AdminOnly;