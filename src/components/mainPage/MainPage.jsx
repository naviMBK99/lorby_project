import React, { useState } from "react";

import Picture from "../auth/assets/illustration.png";
import { API } from "../../helpers/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      // Получаем refreshToken из localStorage
      const refreshToken = localStorage.getItem("refresh_token");
      const access_token = localStorage.getItem("access_token");
      // Проверяем, есть ли refreshToken
      if (refreshToken) {
        // Отправляем запрос на выход с передачей refreshToken
        const response = await axios.post(
          `${API}/logout/`,
          { refresh_token: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Проверяем успешность запроса
        if (response.status === 200) {
          // Если успешно, очищаем localStorage и перенаправляем на страницу аутентификации
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsModalOpen(false);
          navigate("/");
        }
      } else {
        // Если refreshToken не найден в localStorage, выводим сообщение об ошибке
        console.error("Отсутствует refreshToken в localStorage");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

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
        <p style={{ fontSize: "30px", fontWeight: 500 }}>C возвращением!</p>
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
          <p style={{ cursor: "pointer" }} onClick={handleLogout}>
            Выйти
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "32px",
              textAlign: "center",
              width: "250px",
              height: "150px",
              gap: "24px",
              fontFamily: "M PLUS 1p, sans-serif",
            }}
          >
            <p
              style={{
                marginTop: "-5px",
              }}
            >
              Выйти?
            </p>
            <p>Точно выйти?</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                className="hover"
                style={{
                  marginTop: "2px",
                  borderRadius: "18px",
                  border: "none",
                  height: "40px",
                }}
                onClick={handleConfirm}
              >
                Да, точно
              </button>
              <button
                className="hover"
                style={{
                  borderRadius: "18px",
                  border: "none",
                  height: "40px",
                }}
                onClick={handleCancel}
              >
                Нет, остаться
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
