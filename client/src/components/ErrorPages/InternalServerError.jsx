import React from 'react'

const InternalServerError = () => {
  return (
    <div class='container'>
      <div class='row'>
        <div class='col-md-12'>
          <div class='error-template'>
            <h1>500</h1>
            <h2>Unexpected Error.</h2>
            <div class='error-details'>
              <p>Something went wrong on our end.</p>
              <p>Please try again later or </p>
            </div>

            <div class='error-actions'>
              <a href='/contact' class='btn btn-default btn-lg'>
                <span class='glyphicon glyphicon-envelope'></span>
                Contact Us{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternalServerError
