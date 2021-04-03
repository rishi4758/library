/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Nav from "../components/Nav/Nav";
import Carousel from "../components/carousel";
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = localStorage.getItem("user");

    if (!user) {
      props.history.push("/");
      return null;
    }

    return (
      <div>
        {window.location.pathname === "/" ||
        window.location.pathname === "/register" ? (
          ""
        ) : (
          <>
            <Nav />
            <Carousel />
          </>
        )}
        <SpecificComponent {...props} user={user} />
      </div>
    );
  }
  return AuthenticationCheck;
}
