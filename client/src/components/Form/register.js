import React, { useState } from "react";
import { domain } from "../../config";
import axios from "axios";
import "./style.css";
function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = { email: email, password: password };

    const registerUrl = `${domain}/register`;

    const response = await axios.post(registerUrl, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data.status === 200 || 201) {
      history.push("/");
    }
    return { payload: response.data.status };
  };
  return (
    <div className="d-flex">
      <div className="d-none d-md-block col-md-6 regimage-container">
        <div className="bg-color"></div>

        <div className="text d-flex justify-content-center align-items-center w-100 h-100 ">
          <div className="d-flex flex-column align-items-start">
            <h1 style={{ color: "#fff" }}>Sign up today</h1>
            <p style={{ color: "#fff" }}>
              When you read a book, you hold anothers mind in your hands.
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6  formContainer">
        <div className="row justify-content-center m-0 p-0 ml-2 mr-2">
          <div className="form-header d-flex flex-column justify-content-center align-items-start">
            <h2 className="row justify-content-start sign-up-header">
              Signup as a new user
            </h2>
            <p className="row justify-content-start sign-up-message">
              Sign up here if you want to join a library.
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
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
