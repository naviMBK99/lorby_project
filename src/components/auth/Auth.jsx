import React, { useState } from "react";
import Picture from "./assets/illustration.png";
import { useNavigate } from "react-router-dom";
import { API } from "../../helpers/const";
import axios from "axios";

const EyeIcon = ({ style, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-eye"
    style={style}
    onClick={onClick}
  >
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Состояние для отслеживания ошибки
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API}/login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        navigate("/mainPage");
      }
    } catch (error) {
      console.error("Неверный логин или пароль:", error);
      setError("Неверный логин или пароль");
    }
  };

  const handleRegistration = () => {
    navigate("/register");
  };

  const styles = {
    input: {
      width: "220px",
      height: "40px",
      backgroundColor: "#f8f8f8",
      borderRadius: "7px",
      border: "none",
      marginBottom: "14px",
      fontSize: "15px",
      paddingLeft: "15px",
    },
    button: {
      backgroundColor: "black",
      color: "white",
      width: "240px",
      height: "40px",
      borderRadius: "7px",
      border: "none",
      fontSize: "16px",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "40%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    errorContainer: {
      position: "fixed",
      color: "rgba(236, 0, 0, 1)",
      width: "207px",
      height: "54px",
      top: "40px",
      left: "895px",
      padding: "0px 16px 0px 7px",
      border: "1px solid rgba(236, 0, 0, 1)",
      borderRadius: "12px",
    },
  };

  return (
    <div>
      {error && (
        <div style={styles.errorContainer}>
          <p>{error}</p>
        </div>
      )}
      <div className="main__container">
        <div className="main__content-left">
          <div className="main__content-left-img">
            <img src={Picture} alt="" />
          </div>
          <div className="main__content-left-desc">
            <p>Lorby</p>
            <span>Твой личный репетитор</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "170px",
          }}
        >
          <div className="main__content-right">
            <div className="main__content-right-title">
              <p style={{ fontSize: "30px", marginRight: "20px" }}>
                Вэлком бэк!
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type="username"
                placeholder="Введи логин"
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Введи пароль"
                  style={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeIcon
                  style={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button style={styles.button} onClick={handleLogin}>
                Войти
              </button>
              <button
                style={{
                  color: "black",
                  width: "270px",
                  height: "40px",
                  borderRadius: "7px",
                  border: "none",
                  backgroundColor: "white",
                  fontSize: "16px",
                  marginLeft: "-30px",
                  marginTop: "20px",
                }}
                onClick={handleRegistration}
              >
                У меня еще нет аккаунта
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
