import React from "react";
import { Helmet } from "react-helmet";

export default function Profile({ currentUser }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h5 className="text-center p-5 fw-bolder">Welcome {currentUser.name}</h5>
    </>
  );
}
