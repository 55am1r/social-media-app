import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../Utilities/AxiosClient";
import "./Login.scss";
import { ACCESS_KEY, setAccessKey } from "../../Utilities/LocalStorageManager";
import SLHeader from "../../Components/SLHeader/SLHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  setLandingPageError,
  setLoading,
} from "../../Redux/Slices/appConfigSlice";
import MDLoader from "../../Components/MutatingDots/MDLoader";
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await AxiosClient.post("auth/log-in", {
        userId,
        password,
      });
      dispatch(setLoading(false));
      if (result.statusCode === 200) {
        setAccessKey(ACCESS_KEY, result.result.JWT_ACCESS_KEY);
        return true;
      } else {
        dispatch(setLandingPageError(result.errordetails));
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  useEffect(() => {}, [isLoading]);
  useEffect(() => {
    formRef.current.reset();
  }, []);
  return (
    <div className="login">
      <div className="login-card">
        {isLoading ? <MDLoader message="We are Logging you in..." /> : ""}
        <SLHeader />
        <form
          onSubmit={async (e) => {
            dispatch(setLoading(true));
            const response = await handleSubmit(e);
            if (response) {
              e.target.reset();
              emailLabelRef.current.classList.remove("label-change");
              passwordLabelRef.current.classList.remove("label-change");
              navigate("/home");
            }
            e.preventDefault();
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
