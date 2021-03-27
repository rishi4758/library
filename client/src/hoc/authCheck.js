/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import Carousel from "../components/carousel";
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = localStorage.getItem("user");
    console.log(user);
    if (!user) {
      props.history.push("/");
      return null;
    }

    //Loggined in Status
    // } else {
    //   //supposed to be Admin page, but not admin person wants to go inside
    //   if (adminRoute && !response.payload.isAdmin) {
    //     props.history.push("/");
    //   }
    //   //Logged in Status, but Try to go into log in page
    //   else {
    //     if (option === false) {
    //       props.history.push("/");
    //     }
    //   }
    // }

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
        <SpecificComponent {...props} user={user} />;
      </div>
    );
  }
  return AuthenticationCheck;
}
