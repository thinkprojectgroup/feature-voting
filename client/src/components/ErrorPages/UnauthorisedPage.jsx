import React from "react";
import { Link } from "react-router-dom";

const UnauthorisedPage = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="error-template">
            <h1>401</h1>
            <h2>Unauthorised</h2>
            <div class="error-details">You are not authorised to access this page.</div>

            <div class="error-actions">
              If you have permission, please login again with an authorised account
              <Link to="/login">Logout and Sign In again</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorisedPage;
