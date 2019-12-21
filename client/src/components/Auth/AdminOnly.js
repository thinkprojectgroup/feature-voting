import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

const AdminOnly = (props) => (
    <Fragment>
        { props.isAdmin ? props.children : <Redirect to={"/login"} /> }
    </Fragment>
)
export default AdminOnly;