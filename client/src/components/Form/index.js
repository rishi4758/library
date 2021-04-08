import React, { useState } from "react";
import { domain } from "../../config";
import axios from "axios";
import "./style.css";
function Form({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    const data = { email: email, password: password };
    const loginUrl = `${domain}/login`;

    console.log(email, password);
    const response = await axios.post(loginUrl, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data.status === 200 || 201) {
      localStorage.setItem("user", response.data);
      history.push("/form");
    }
  };
  return (
    <>
      <div className="row justify-content-center mt-5 mb-5 d-none d-md-block">
        <h1 className="mainText">Welcome to the Library! </h1>
      </div>
      <div className="d-flex">
        <div className="d-none d-md-block col-md-6 image-container">
          <div className="text d-flex justify-content-center w-100 h-100 loginText">
            <div className="d-flex flex-column align-items-start">
              <h1>Join Library today</h1>
              <p>Study hard for better future.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6  formContainer">
          <div className="row justify-content-center m-0 p-0 ml-2 mr-2">
            <div className="form-header d-flex flex-column mt-5 align-items-start">
              <h2 className="row justify-content-start sign-up-header">
                Signin if you are existing user
              </h2>
              <p className="row justify-content-start sign-up-message">
                Sign in here if you want to join a library.
              </p>
              <div className="row d-flex justify-content-start">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label
                      className=" d-flex justify-content-start"
                      for="exampleInputEmail1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control input-style"
                      id="exampleInputEmail1"
                      aria-describedby="email-help"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    <small
                      className="email-help"
                      className="form-text text-muted d-flex justify-content-start"
                    >
                      will be using as your username
                    </small>
                  </div>
                  <div className="form-group ">
                    <label
                      className=" d-flex justify-content-start"
                      for="exampleInputEmail1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control input-style"
                      id="exampleInputCity"
                      aria-describedby="cityhelp"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div>
                    <button type="submit" className="text-center btn-proceed">
                      Sign In
                    </button>
                  </div>
                  <div>
                    <p className="text-center multi-cars mt-2">
                      <br />
                      <span className="text-center text-last">
                        <a
                          href="#"
                          className="text-last"
                          style={{ textDecoration: "none" }}
                          href="/register"
                        >
                          Signup as a new user
                        </a>
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
