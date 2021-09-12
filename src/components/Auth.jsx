import { useState, useEffect, useRef } from "react";
import axios from "axios";
import dotenv from "dotenv";
import "./Auth.css";
dotenv.config();

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPasswordInputField, setShowPasswordInputField] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef();
  const [randomNumber, setRandomNumber] = useState([]);

  const switchMode = (e) => {
    setShowPasswordInputField(false);
    if (e.target.name === "login") {
      setIsSignup(false);
    } else if (e.target.name === "signup") {
      setIsSignup(true);
    }
  };

  const handleClick = async () => {
    if (phoneNumber !== null && phoneNumber !== "+91" && phoneNumber !== "") {
      try {
        const { data }  = await axios.get(
          `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_SECRET_API_KEY}&phone=${phoneNumber}`
        );
        if (data.valid) {
          setShowError(false);
          setShowPasswordInputField(
            (showPasswordInputField) => !showPasswordInputField
          );
        } else {
          setShowError(true);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setShowError(true);
    }
  };

  const handleChange = (e) => {
    setShowError(false);
    setPhoneNumber(e.target.value);
  };

  const editPhoneNumber = () => {
    setShowPasswordInputField(false);
  };

  useEffect(() => {
    if (!showPasswordInputField) inputRef.current.focus();
  }, [showPasswordInputField]);

  useEffect(() => {
    let arr = [];
    while (arr.length < 5) {
      let r = Math.floor(Math.random() * 5) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    setRandomNumber(arr);
  }, []);
  return (
    <section className="auth-container">
      <header>
        <img
          src={`https://resources.salt.one/interview/web-dev/login/80x160/${
            !isSignup ? randomNumber[0] : randomNumber[1]
          }.png`}
          alt=""
        />
      </header>
      <main>
        <div className="auth-btns">
          <button
            onClick={switchMode}
            name="login"
            className={!isSignup ? "login-btn active" : "login-btn inactive"}
          >
            Login
          </button>
          <button
            onClick={switchMode}
            name="signup"
            className={isSignup ? "signup-btn active" : "signup-btn inactive"}
          >
            Signup
          </button>
        </div>

        <div className="input-container">
          {showError && (
            <div className="error-msg">
              Oops! Please enter a valid phone number
            </div>
          )}
          {!showPasswordInputField && (
            <>
              <input
                type="tel"
                onChange={handleChange}
                value={phoneNumber}
                ref={inputRef}
                className={showError ? "error-box" : ""}
              ></input>
            </>
          )}
          {showPasswordInputField && !isSignup && (
            <input type="password" placeholder="Password"></input>
          )}
        </div>

        {isSignup && (
          <div className="tnc-text">
            <input type="radio"></input>
            <label>
              I agree to SALT's{" "}
              <a
                href="https://www.salt.one/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        )}

        {!isSignup && (
          <div className="next-btn">
            <button
              onClick={handleClick}
              className={showPasswordInputField ? "active" : ""}
            >
              <i className="fas fa-arrow-right fa-lg"></i>
            </button>
          </div>
        )}
        <div className="dotted-line"></div>
      </main>
      <div className="footer-text">
        {showPasswordInputField && !isSignup ? (
          <div className="edit-details-text">
            <div className="edit-phone-number">
              {" "}
              {phoneNumber}{" "}
              <i
                className="far fa-edit fa-edit-custom"
                onClick={editPhoneNumber}
              ></i>{" "}
            </div>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login via otp
            </a>
          </div>
        ) : (
          <div className="info">Hello! Please tell us your phone number.</div>
        )}
      </div>
      <div className="footer-images">
        <img
          src={`https://resources.salt.one/interview/web-dev/login/80x80/${randomNumber[0]}.svg`}
          alt=""
          className="footer-img1"
        />
        <img
          src={`https://resources.salt.one/interview/web-dev/login/80x80/${randomNumber[1]}.svg`}
          alt=""
          className="footer-img2"
        />
        <img
          src={`https://resources.salt.one/interview/web-dev/login/80x80/${randomNumber[2]}.svg`}
          alt=""
          className="footer-img3"
        />
        <img
          src={`https://resources.salt.one/interview/web-dev/login/80x80/${randomNumber[3]}.svg`}
          alt=""
          className="footer-img4"
        />
        <img
          src={`https://resources.salt.one/interview/web-dev/login/80x80/${randomNumber[4]}.svg`}
          alt=""
          className="footer-img5"
        />
      </div>
    </section>
  );
}
