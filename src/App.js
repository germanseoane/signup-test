import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);
  const [finalMessage, setFinalMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = userInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const validateUserInfo = ({ email, password, confirmPassword }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidPassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

    if (!isValidEmail.test(email)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (!isValidPassword.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (
      !isValidPassword.test(confirmPassword) ||
      confirmPassword !== password
    ) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };
  useEffect(() => {
    validateUserInfo(userInfo);
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameError && !passwordError && !confirmPasswordError) {
      setFinalMessage("Thanks for joining!");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2>PWC Sign Up</h2>
          <input
            placeholder="Username (email)..."
            value={email}
            name="email"
            onChange={(e) => handleChange(e)}
          ></input>
          <p className={usernameError ? "red" : "green"}>
            Username must be a valid Email
          </p>
          <input
            placeholder="Password..."
            value={password}
            name="password"
            onChange={(e) => handleChange(e)}
          ></input>
          <p className={passwordError ? "red" : "green"}>
            Password must have at least one uppercase, one lowercase, one digit
            and one special character
          </p>
          <input
            placeholder="Confirm password..."
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          ></input>
          <p className={confirmPasswordError ? "red" : "green"}>
            Field must match Password
          </p>
          <button
            type="submit"
            className={
              !usernameError && !passwordError && !confirmPasswordError
                ? "enabled"
                : "disabled"
            }
          >
            Submit
          </button>

          <h2>{finalMessage}</h2>
        </form>
      </div>
      ;
    </>
  );
}

export default App;
