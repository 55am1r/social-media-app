import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../Utilities/AxiosClient";
import "./SignUp.scss";
import {
  setLandingPageError,
  setLandingPageSuccess,
  setLoading,
} from "../../Redux/Slices/appConfigSlice";
import SLHeader from "../../Components/SLHeader/SLHeader";
import MDLoader from "../../Components/MutatingDots/MDLoader";
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
  const dobLabelRef = useRef();

  const currentDate =
    new Date().getFullYear() -
    19 +
    "-" +
    (new Date().getMonth() < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    "-" +
    (new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [dob, setDOB] = useState(currentDate);
  const [phone, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [countrycode, setCountryCode] = useState({ country: "", code: "" });
  const [displayPassword, setDisplayPassword] = useState(false);
  const [activeCfmPassCode, setActiveCfmPassword] = useState(true);
  const [checkPasswordMatch, setPasswordMatch] = useState(false);
  const [countryCodes, setCountryCodes] = useState([""]);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  function restrictCopyPaste(e) {
    e.preventDefault();
    alert("This action is not allowed");
  }
  function onBlurHandle(e, lblRef) {
    let inpt_Value = e.target.value;
    const regexComp = new RegExp(/(\s)/);
    if (regexComp.test(inpt_Value) || inpt_Value === "") {
      e.target.value = "";
      lblRef?.current.classList.remove("label-change");
    } else {
      lblRef?.current.classList.add("label-change");
    }
  }
  function onFocusHandle(lblRef) {
    lblRef.current?.classList.add("label-change");
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
    const user = {
      avatar,
      username,
      dob,
      gender,
      phoneno: { countrycode, phone },
      email,
      password,
    };
    const result = await AxiosClient.post("/auth/sign-up", user);
    result.result = undefined;
    if (result) {
      dispatch(setLoading(false));
    }
    if (result.status === "ERROR") {
      dispatch(setLandingPageError(result.errordetails));
      return false;
    }
    if (
      result.status === "OK" ||
      (result.status === "ERROR" && !result.result && !result.errordetails)
    ) {
      dispatch(
        setLandingPageSuccess(
          "Yeah, We have added successfully added you to our server. Now try to Log In your account."
        )
      );
      return true;
    }
    return false;
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
    dispatch(setLoading(true));
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setAvatar(fileReader.result);
        dispatch(setLoading(false));
      }
    };
  }
  async function fetchCountryCodes() {
    try {
      const jsonData = await (
        await fetch("https://restcountries.com/v2/all/")
      ).json();
      setCountryCodes(jsonData);
      setCountryCode({
        country: "IND" || jsonData[0].alpha3Code,
        code: "91" || jsonData[0].callingCodes[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    iconClass.current.classList.add("toggle-display");
    fetchCountryCodes();
  }, [iconClass]);
  //TO BE FOLLOW UP THE VALUES INSTANTLY ON CHANGE
  useEffect(() => {}, [
    password,
    email,
    username,
    dob,
    phone,
    gender,
    countrycode,
    countryCodes,
  ]);
  return (
    <div className="signup">
      <div className="signup-card">
        {isLoading ? <MDLoader message="We are Verifying you..." /> : ""}
        <SLHeader />
        <form
          onSubmit={async (e) => {
            if (checkPasswordMatch) {
              dispatch(setLoading(true));
              const response = await handleSubmit(e);
              if (response) {
                navigate("/");
                setAvatar("");
                setActiveCfmPassword(true);
                setDisplayPassword(false);
                setPasswordMatch(false);
                iconClass.current.classList.add("toggle-display");
                e.target.reset();
              }
              e.preventDefault();
            } else {
              e.preventDefault();
              dispatch(setLandingPageError("Password Doesn't Match"));
            }
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
                draggable={false}
                src={
                  avatar
                    ? avatar
                    : "https://res.cloudinary.com/dazh2iyef/image/upload/v1674278409/sampleimages/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector_hfvxbv.jpg"
                }
                alt="demo"
              />
            </label>
          </div>
          <div className="username">
            <input
              type="text"
              id="username"
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
          <div className="dob-gender">
            <div className="date-picker">
              <label htmlFor="dob" ref={dobLabelRef}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={dob}
                max={currentDate}
                onChange={(date) => {
                  setDOB(date.target.value);
                }}
                onFocus={() => [
                  dobLabelRef.current.classList.add("dob-lbl-change"),
                ]}
                onBlur={() => {
                  dobLabelRef.current.classList.remove("dob-lbl-change");
                }}
              />
            </div>
            <div className="gender">
              <label htmlFor="gender" className="header-lbl">
                Gender
              </label>
              <div className="radio-btn-class">
                <div className="int-male">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="M"
                    className="radio-btn"
                    onClick={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="int-female">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="F"
                    className="radio-btn"
                    onClick={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
          </div>
          <div className="phoneno">
            <label htmlFor="phoneno" id="lbl-phone" ref={phonenoLabelRef}>
              Phone no
            </label>
            <div className="input-class">
              <div className="country-codes">
                <div className="cnt-image">
                  {countryCodes.length > 1
                    ? countryCodes.map((item) => {
                        if (item.alpha3Code === countrycode.country) {
                          return (
                            <img
                              draggable={false}
                              src={item.flags.png}
                              alt={item.alpha3Code}
                              key={item.alpha3Code}
                            />
                          );
                        }
                        return " ";
                      })
                    : ""}
                </div>
                <select
                  name="countryCode"
                  value={countrycode.country + "-" + countrycode.code}
                  onChange={(e) => {
                    const CountryCode = e.target.value.split("-");
                    setCountryCode({
                      country: CountryCode[0],
                      code: CountryCode[1],
                    });
                  }}
                >
                  {countryCodes.length > 1
                    ? countryCodes.map((data) => {
                        return (
                          <option
                            value={data.alpha3Code + "-" + data.callingCodes[0]}
                            key={data.alpha3Code}
                          >
                            {data.alpha3Code}&nbsp;&nbsp;
                            {data.callingCodes[0]}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
              <input
                type="tel"
                id="phoneno"
                maxLength={15}
                minLength={8}
                pattern="(\d{8,15})"
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
                onFocus={() => {
                  phonenoLabelRef.current.classList.add("focus-label");
                }}
                onBlur={(e) => {
                  phonenoLabelRef.current.classList.remove("focus-label");
                  onBlurHandle(e);
                }}
                onCopy={restrictCopyPaste}
                onPaste={restrictCopyPaste}
                required
                autoComplete="off"
              />
            </div>
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
              pattern="([\d\w]{4,10}[\d\w]{4,10})"
              autoComplete="off"
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

          <input
            type="submit"
            value="Create New Account"
            className="submit-ent"
          />
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
