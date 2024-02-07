import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Picture from "../auth/assets/illustration.png";
import { API } from "../../helpers/const";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = () => (
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

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await registerUser(values);
      navigate("/confirmation");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setFieldError("submit", "Ошибка при регистрации");
    } finally {
      setSubmitting(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API}/register/`, userData);
      if (response.status === 201) {
        console.log("Регистрация успешна!");
        await sendConfirmationCode(userData.email);
      } else {
        throw new Error("Ошибка при регистрации");
      }
    } catch (error) {
      throw error;
    }
  };

  const sendConfirmationCode = async (email) => {
    try {
      const response = await axios.post(`${API}/email-confirm/`, { email });
      if (response.status === 200) {
        console.log("Код подтверждения отправлен успешно!");
      }
    } catch (error) {
      console.error("Ошибка при отправке кода подтверждения:", error);
    }
  };

  const getPasswordValidationMessage = (password) => {
    if (!password || password.trim() === "") return "";
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/>.<,])(?!.*\s).{8,15}$/;
    if (!passwordRegex.test(password)) {
      return (
        <>
          <ul
            style={{
              paddingLeft: "20px",
              marginBottom: "0",
              listStyleType: "none",
            }}
          >
            <li>
              от 8 до 15 символов{" "}
              {password.length >= 8 && password.length <= 15 ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
            <li>
              строчные и прописные буквы{" "}
              {/[a-z]/.test(password) && /[A-Z]/.test(password) ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
            <li>
              минимум одна цифра
              {/\d/.test(password) ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
            <li>
              минимум один спецсимвол (!, '', #, $ ...)
              {/[!@#$%^&*()_+}{:;'?/>.<,]/.test(password) ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
          </ul>
        </>
      );
    }

    return "";
  };

  const getPasswordValidationColor = (password) => {
    const errorMessage = getPasswordValidationMessage(password);
    return errorMessage ? "red" : "green";
  };

  const passwordValidation = (password) => {
    if (!password || password.trim() === "") return true;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/>.<,])(?!.*\s).{8,15}$/;
    return passwordRegex.test(password);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Необходим email"),
    username: Yup.string().required("Необходим логин"),
    password: Yup.string()
      .required("Необходим пароль")
      .test("password-validation", passwordValidation),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароль не совпадает")
      .required("Подтверждение пароля обязательно"),
  });

  const styles = {
    input: {
      width: "300px",
      height: "45px",
      backgroundColor: "#f8f8f8",
      borderRadius: "7px",
      border: "none",
      marginBottom: "14px",
      paddingLeft: "15px",
      fontSize: "15px",
    },
    button: {
      backgroundColor: "black",
      color: "white",
      width: "320px",
      height: "45px",
      borderRadius: "7px",
      border: "none",
      fontSize: "17px",
    },
  };

  return (
    <div className="main__container">
      <Link to={"/"}>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div
            className="go-back-button"
            style={{ display: "flex", margin: 0, marginLeft: "300px" }}
          >
            <p className="back">Назад</p>
          </div>
        </div>
      </Link>
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
          marginTop: "100px",
        }}
      >
        <p
          style={{
            fontFamily: "Mplus 1p",
            fontSize: "30px",
            fontWeight: 500,
            textAlign: "center",
            marginRight: "250px",
          }}
        >
          Создать аккаунт <br /> Lorby
        </p>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            password_confirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Введи адрес почты"
                style={{
                  ...styles.input,
                  borderColor: touched.email && errors.email ? "red" : "",
                }}
              />
              {touched.email && errors.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
              <Field
                type="text"
                name="username"
                placeholder="Придумай логин"
                style={{
                  ...styles.input,
                  borderColor: touched.username && errors.username ? "red" : "",
                }}
              />
              {touched.username && errors.username && (
                <div style={{ color: "red" }}>{errors.username}</div>
              )}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Создай пароль"
                    style={{
                      ...styles.input,
                      color: getPasswordValidationColor(values.password),
                      borderColor:
                        touched.password && errors.password ? "red" : "",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "44%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <EyeIcon />
                  </div>
                </div>
              </div>
              {touched.password && errors.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
              )}
              <div
                style={{ color: getPasswordValidationColor(values.password) }}
              >
                {getPasswordValidationMessage(values.password)}
              </div>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password_confirm"
                    placeholder="Повтори пароль"
                    style={{
                      ...styles.input,
                      borderColor:
                        touched.password_confirm && errors.password_confirm
                          ? "red"
                          : "",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "44%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <EyeIcon />
                  </div>

                  {touched.password_confirm && errors.password_confirm && (
                    <div style={{ color: "red" }}>
                      {errors.password_confirm}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                style={styles.button}
                disabled={isSubmitting}
              >
                Зарегистрироваться
              </button>
              {errors.submit && <div className="error">{errors.submit}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;

//* Импортировала необходимые библиотеки и компоненты:
//? React и useState из react
//? Formik, Form, Field из formik
//? Yup для валидации формы
//? axios для выполнения HTTP-запросов
//? Picture для изображения
//? API из файла const для работы с API
//? useNavigate из react-router-dom для навигации в приложении.

//* Создала функциональный компонент Registration.

//*Внутри компонента:
//? Использовала хук useNavigate для получения функции навигации.
//? Использовала useState, чтобы создать состояние для отображения/скрытия пароля.
//? Создала функцию EyeIcon, которая возвращает SVG иконку глаза для отображения пароля.
//? Определила функцию handleSubmit, которая обрабатывает отправку формы.
//? Создала функцию registerUser, которая регистрирует пользователя через API.
//? Создала функцию sendConfirmationCode, которая отправляет код подтверждения на почту пользователя.
//? Определила функции getPasswordValidationMessage, getPasswordValidationColor и passwordValidation для валидации пароля.
//? Создала схему валидации формы с помощью Yup.
//? Определила стили для элементов формы.

//* Возвратила JSX, который представляет форму регистрации пользователя с использованием компонентов Formik, Form и Field.
