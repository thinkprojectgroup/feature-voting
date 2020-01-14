import React from "react";
import { Link } from "react-router-dom";

const UnauthorisedPage = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="error-template">
            <h1>400</h1>
            <h2>Bad Request</h2>
            <div class="error-details">Your request resulted in an error.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorisedPage;
