import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

const AdminOnly = (props) => (
    <Fragment>
        { console.log("adminOnly", props.role)} 
        { props.role === 'admin' ? props.children : <Redirect to={"/login"} /> }
    </Fragment>
)
export default AdminOnly;