import React from 'react';

const NotFoundPage = () => {
    
    return (
            <div class="container">
                <div class="row">
                <div class="col-md-12">
                    <div class="error-template">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <div class="error-details">
                        <p>We can't find the Page you're looking for.</p>
                        <p>The link might be incorrect or the page has been removed</p>
                    </div>

                    <div class="error-actions">
                        <a href="/" class="btn btn-primary btn-lg">
                            <span class="glyphicon glyphicon-home"></span>
                            Take Me Home{" "}
                        </a>
                        <a href="/contact" class="btn btn-default btn-lg">
                            <span class="glyphicon glyphicon-envelope"></span> 
                            Contact Us{" "}
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    )
  };

export default NotFoundPage;