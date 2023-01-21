import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import SLHeader from "../../Components/SLHeader/SLHeader";
import { useDispatch, useSelector } from "react-redux";
import MDLoader from "../../Components/MutatingDots/MDLoader";
import { loginApi } from "../../Redux/Slices/serverSlice";
function Login() {
  const emailLabelRef = useRef();
  const passwordLabelRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const loginstatus = useSelector(
    (state) => state.appConfigReducer.loginstatus
  );
  const dispatch = useDispatch();

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
  useEffect(() => {
    loginstatus ? navigate("home") : formRef.current.reset();
    // eslint-disable-next-line
  }, [loginstatus]);
  useEffect(() => {}, [isLoading]);

  return (
    <div className="login">
      <div className="login-card">
        {isLoading ? <MDLoader message="We are Logging you in..." /> : ""}
        <SLHeader />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginApi({ userId, password }));
            if (loginstatus) {
              emailLabelRef.current.classList.remove("label-change");
              passwordLabelRef.current.classList.remove("label-change");
            }
          }}
          ref={formRef}
        >
          <div className="email">
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setUserId(e.target.value);
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
              autoComplete="off"
            />
            <label htmlFor="email" id="lbl-email" ref={emailLabelRef}>
              UserName/Email
            </label>
          </div>
          <div className="password">
            <input
              type={displayPassword ? "text" : "password"}
              id="passcode"
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
                  !displayPassword
                    ? "fa-regular fa-lock-keyhole color-green"
                    : " "
                }
              ></i>
              <i
                className={
                  displayPassword
                    ? "fa-regular fa-lock-keyhole-open color-red"
                    : " "
                }
              ></i>
            </div>
          </div>
          <input type="submit" value="Login" className="submit-ent" />
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
