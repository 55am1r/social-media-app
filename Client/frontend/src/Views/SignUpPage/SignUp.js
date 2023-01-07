import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AxiosClient} from "../../Utilities/AxiosClient";
import "./SignUp.scss";
function SignUp() {
  const emailLabelRef = useRef();
  const passwordLabelRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

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
    const result = await AxiosClient.post("/user/sign-up", { email, password });
    result.result = undefined;
    console.log(result);
    if (result.statusCode === 201) {
      navigate("/login");
    }
  }
  return (
    <div className="signup">
      <div className="signup-card">
        <h1>SignUp</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            e.target.reset();
          }}
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
          Have an Account ?
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
