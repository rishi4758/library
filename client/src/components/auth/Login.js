import React, { useReducer, useCallback, useState } from "react";
import MyInput from "../Input/Input";
import Button from "../Buttons/Buttons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions";
import { FormReducer } from "./FormReducer";
import "./Form.css";
import { Link } from "react-router-dom";

function MyForm({ history }) {
  /*######## IF EDITED PRODUCT OR FIELD PAGE NOT REQUIRED######## */
  const [state, dispatchForm] = useReducer(FormReducer, {
    inputValues: { email: "", password: "" },
    inputValidity: { email: false, password: false },
    formIsValid: false,
  });
  const [isEmpty, setEmpty] = useState(false);
  const [err, setErr] = useState(false);
  const [errText, setErrText] = useState(null);
  const changeTextHandler = useCallback(
    (identifier, value, isValid) => {
      setEmpty(false);
      dispatchForm({
        type: "FORM_INPUT",
        identifier: identifier,
        value: value,
        isValid: isValid,
      });
    },
    [dispatchForm]
  );
  const dispatch = useDispatch();
  const SubmitForm = async (e) => {
    e.preventDefault();
    if (!state.formIsValid) {
      setEmpty(true);
    } else {
      let response = await dispatch(
        loginUser(history, {
          email: state.inputValues.email,
          password: state.inputValues.password,
        })
      );
      if (response.payload === 401) {
        setErr(true);
        setErrText("password does not match");
      }
      if (response.payload === 404) {
        setErr(true);
        setErrText("user not found");
      }
      if (response.payload === 500) {
        setErr(true);
        setErrText("server not reponding");
      }
    }
  };
  return (
    <div className="container ">
      <form
        className="  container d-flex  flex-column  form  p-sm-5"
        onSubmit={SubmitForm}
      >
        <MyInput
          id="email"
          type="email"
          label="email"
          changeTextHandler={changeTextHandler}
          email
          errorText="please enter a valid email"
          required
          isEmpty={isEmpty}
        ></MyInput>
        <MyInput
          id="password"
          label="password"
          type="password"
          minLength={5}
          errorText="password must be six charcter"
          changeTextHandler={changeTextHandler}
          isEmpty={isEmpty}
          required
        ></MyInput>

        <Button
          title="Signin"
          type="submit"
          customClass="myBtn"
          // onClick={SubmitForm}
        ></Button>
        <Link to="/register">new user sign up?</Link>
        {err && <div>{errText}</div>}
      </form>
    </div>
  );
}

export default MyForm;
