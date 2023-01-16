import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../Utilities/AxiosClient";
import "./SignUp.scss";
function SignUp() {
  const emailLabelRef = useRef();
  const passwordLabelRef = useRef();
  const cfm_PasswordLabelRef = useRef();
  const userNameLabelRef = useRef();
  const phonenoLabelRef = useRef();
  const passwordRef = useRef();
  const cfmPasswordRef = useRef();
  const iconClass = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [activeCfmPassCode, setActiveCfmPassword] = useState(true);
  const [checkPasswordMatch, setPasswordMatch] = useState(false);

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
    const result = await AxiosClient.post("/auth/sign-up", { email, password });
    result.result = undefined;
    console.log(result);
    if (result.statusCode === 201) {
      navigate("/login");
    }
  }
  function matchPassword(e) {
    e.target.value === password
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
    e.target.value !== ""
      ? iconClass.current.classList.remove("toggle-display")
      : iconClass.current.classList.add("toggle-display");
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setAvatar(fileReader.result);
      }
    };
  }
  //DISABLE PASSWORD MATCHING ICON
  useEffect(() => {
    iconClass.current.classList.add("toggle-display");
  }, [iconClass]);
  //TO BE FOLLOW UP THE VALUES INSTANTLY ON CHANGE
  useEffect(() => {}, [password, email, username, dob, phoneno, gender]);

  return (
    <div className="signup">
      <div className="signup-card">
        <div className="header">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/063/436/original/instagram-app-icon-3d-render-free-png.png"
            alt="logo.img"
          />
          <h1>Ditto-Gram</h1>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
            e.target.reset();
          }}
        >
          <div className="avatar">
            <input
              className="imgInput"
              type="file"
              name="avatar"
              id="avatar"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
            />
            <label htmlFor="avatar" className="avatar-label">
              <img
                src={
                  avatar
                    ? avatar
                    : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                }
                alt="demo"
              />
            </label>
          </div>
          <div className="username">
            <input
              type="text"
              id="username-ent"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onBlur={(e) => {
                onBlurHandle(e, userNameLabelRef);
              }}
              onFocus={() => {
                onFocusHandle(userNameLabelRef);
              }}
              onCopy={restrictCopyPaste}
              onPaste={restrictCopyPaste}
              required
              autoComplete="off"
            />
            <label htmlFor="username" id="lbl-username" ref={userNameLabelRef}>
              User Name
            </label>
          </div>
          <div className="dob">
            <input
              type="date"
              name="dob"
              id="dob"
              onChange={(e) => {
                setDOB(e.target.value);
              }}
            />
            <label htmlFor="dob"><div>hai</div></label>
          </div>
          <div className="phoneno">
            <input
              type="number"
              id="phoneno-ent"
              max={10}
              min={10}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
              onBlur={(e) => {
                onBlurHandle(e, phonenoLabelRef);
              }}
              onFocus={() => {
                onFocusHandle(phonenoLabelRef);
              }}
              onCopy={restrictCopyPaste}
              onPaste={restrictCopyPaste}
              required
              autoComplete="off"
            />
            <label htmlFor="phoneno" id="lbl-phone" ref={phonenoLabelRef}>
              Phone no
            </label>
          </div>
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
              autoComplete="off"
            />
            <label htmlFor="email" id="lbl-email" ref={emailLabelRef}>
              Email
            </label>
          </div>
          <div className="password">
            <input
              type={displayPassword ? "text" : "password"}
              id="password-ent"
              required
              autoComplete="nope"
              onChange={(e) => {
                setPassword(e.target.value);
                e.target.value !== ""
                  ? setActiveCfmPassword(false)
                  : setActiveCfmPassword(true);
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
              Pass-Code
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
          <div className="cfm-password">
            <input
              type="password"
              id="cfm-password-ent"
              required
              disabled={activeCfmPassCode}
              autoComplete="nope"
              onChange={(e) => {
                matchPassword(e);
              }}
              onBlur={(e) => {
                onBlurHandle(e, cfm_PasswordLabelRef);
              }}
              onFocus={() => {
                onFocusHandle(cfm_PasswordLabelRef);
              }}
              onCopy={restrictCopyPaste}
              onPaste={restrictCopyPaste}
              ref={cfmPasswordRef}
            />
            <label
              htmlFor="cfm-password"
              id="cfm-password-lbl"
              ref={cfm_PasswordLabelRef}
            >
              Confirm Pass-Code
            </label>
            <div className="icon" ref={iconClass}>
              <i
                className={
                  !checkPasswordMatch
                    ? "fa-solid fa-circle-xmark color-red"
                    : " "
                }
              ></i>
              <i
                className={
                  checkPasswordMatch
                    ? "fa-solid fa-circle-check color-green"
                    : " "
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
              navigate("/");
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
