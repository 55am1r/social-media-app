import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../Utilities/AxiosClient";
import "./Login.scss";
import { ACCESS_KEY, setAccessKey } from "../../Utilities/LocalStorageManager";
import { checkNavigate } from "../RequireAccess";
function Login() {
  const emailLabelRef = useRef();
  const passwordLabelRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);

  function restrictCopyPaste(e) {
    e.preventDefault();
    alert("This action is not allowed");
  }

  function onBlurHandle(e, lblRef) {
    let inpt_Value = e.target.value;
    const regexComp = new RegExp(/(\s)/);
    if (regexComp.test(inpt_Value) || inpt_Value === "") {
      e.target.value = "";
      lblRef.current.classList.remove("label-change");
    } else {
      lblRef.current.classList.add("label-change");
    }
  }
  function onFocusHandle(lblRef) {
    lblRef.current.classList.add("label-change");
  }
  function onClickHandle() {
    displayPassword ? setDisplayPassword(false) : setDisplayPassword(true);
    const end = passwordRef.current.value.length;
    passwordRef.current.focus();
    setTimeout(() => {
      passwordRef.current.setSelectionRange(end, end);
    }, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await AxiosClient.post("auth/log-in", {
        email,
        password,
      });
      console.log(result);
      if (result.statusCode === 201) {
        setAccessKey(ACCESS_KEY, result.result.JWT_ACCESS_KEY);
        checkNavigate(true);
        navigate("/home");
      } else {
        console.log(result);
        checkNavigate(false);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    formRef.current.reset();
  }, []);
  return (
    <div className="login">
      <div className="login-card">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            e.target.reset();
          }}
          ref={formRef}
        >
          <div className="email">
            <input
              type="email"
              id="email-ent"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={(e) => {
                onBlurHandle(e, emailLabelRef);
              }}
              onFocus={() => {
                onFocusHandle(emailLabelRef);
              }}
              onCopy={restrictCopyPaste}
              onPaste={restrictCopyPaste}
              required
              autoComplete="new-email"
            />
            <label htmlFor="email" id="lbl-email" ref={emailLabelRef}>
              Email
            </label>
          </div>
          <div className="password">
            <input
              type={displayPassword ? "text" : "password"}
              id="passcode-ent"
              required
              autoComplete="nope"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={(e) => {
                onBlurHandle(e, passwordLabelRef);
              }}
              onFocus={() => {
                onFocusHandle(passwordLabelRef);
              }}
              onCopy={restrictCopyPaste}
              onPaste={restrictCopyPaste}
              ref={passwordRef}
            />
            <label htmlFor="password" id="lbl-password" ref={passwordLabelRef}>
              Password
            </label>
            <div className="icon" onClick={onClickHandle}>
              <i
                className={
                  !displayPassword ? "fa-regular fa-lock-keyhole" : " "
                }
              ></i>
              <i
                className={
                  displayPassword ? "fa-regular fa-lock-keyhole-open" : " "
                }
              ></i>
            </div>
          </div>
          <input type="submit" value="Submit" className="submit-ent" />
        </form>
        <p>
          Don't have an Account ?
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
