import React from "react";
import { Link } from "react-router-dom";

//TODO ADD STYLES
// if employee (signed in) = show Unauthorised Page
// if user = show Error Page (user needs feature URL)
const UnauthorisedPage = props => {
  {
    this.props.role === "employee" ? (
      <Fragment>
        <div>401 Unauthorised (employee)</div>

        <div>Access only for Admins</div>

        <div>
          Please contact an admin - or try to login again (Beispieltext)
          <Link to="/login">Go to Login</Link>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div>Error Message (external users)</div>

        <div>You need the direct URL to the Feature</div>
      </Fragment>
    );
  }
};

export default UnauthorisedPage;
