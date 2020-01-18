import React from 'react'
import { Button } from 'reactstrap'

const AlreadySignedIn = (props) => {
    return (
        <div className='container'>
          <h1>You're already logged in.</h1>
          <h2>you will be automatically redirected in {props.timer} seconds</h2>

          <Button href='' id='logoutButton' onClick={props.logout}>
            Logout (Add To Header)
          </Button>
        </div>
      )
}

export default AlreadySignedIn;