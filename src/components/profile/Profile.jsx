import React from "react";

export default function Profile({ currentUser }) {
  return (
    <>
      <h5 className="text-center p-5 fw-bolder">Welcome {currentUser.name}</h5>
    </>
  );
}
