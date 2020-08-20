import React, { useState } from 'react';
import { Form, Field } from "react-final-form";
import { authSource } from "Auth/sources";
import {
  StyledTextField,
  StyledButton
} from "components/common";
import {
  LOGIN_VALIDATE_ERRORS as ERRORS
} from "constants/auth";

import {
  StyledPaper,
  Title,
  FieldWrapper,
  PageSwitch,
  Link,
  ButtonWrapper,
  ErrorMessage
} from "./styled";

const Login = ({ setIsLogin, toChat }) => {
  const [error, setError] = useState(""); /* todo loder */

  const validate = values => {
    const errors = {};

    if (!values.login) {
      errors.login = ERRORS.login.empty;
    }
    if (!values.password) {
      errors.password = ERRORS.password.empty;
    }

    return errors;
  };

  const toReg = () => {
    setIsLogin(false);
  };

  const signIn = async values => {
    setError("");
    try {
      const res = await authSource.signIn(values);
      console.log(1111111111111111111111111111);
      console.log(111, res);
      toChat(res.data);
    } catch (error) {
      console.log(3333333333333333333333333333);
      console.log("login", error.response || error);
      setError(error?.response?.data || error.toString());
    }
  };

  const handleOnSubmit = values => {
    localStorage.removeItem("uid");
    localStorage.removeItem("userName");

    signIn(values);
  };

  return (
    <StyledPaper>
      <Title>
        Авторизация
      </Title>
      <Form
        onSubmit={handleOnSubmit}
        validate={validate}
      >
        {
          ({ handleSubmit }) => (
            <>
              <FieldWrapper>
                <Field
                  name="login"
                  component={StyledTextField}
                  label="Введите логин"
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name="password"
                  component={StyledTextField}
                  label="Введите пароль"
                  type="password"
                />
              </FieldWrapper>

              <PageSwitch>
                Нет аккаунта?
                <Link onClick={toReg}>Зарегистрироваться</Link>
              </PageSwitch>

              <ButtonWrapper>
                <StyledButton
                  onClick={handleSubmit}
                  size="small"
                >
                  Войти
                  </StyledButton>
              </ButtonWrapper>
              <ErrorMessage>
                {error}
              </ErrorMessage>
            </>
          )
        }
      </Form>
    </StyledPaper>
  )
};

export default Login;