import React from "react";
import Picture from "../auth/assets/illustration.png";
const MainPage2 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <div>
        <p style={{ fontSize: "30px", fontWeight: 500 }}>Добро Пожаловать!</p>
        <p>Lorby - Твой личный репетитор</p>
      </div>
      <div className="main__content-left">
        <div className="main__content-left-img">
          <img
            src={Picture}
            alt=""
            style={{
              width: "280px",
              marginRight: "160px",
              marginTop: "10px",
            }}
          />
          <p>Выйти</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage2;
