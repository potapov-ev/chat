import React, { useState } from 'react';
import { Form, Field } from "react-final-form";
import { authSource } from "Auth/sources";
import {
  StyledTextField,
  StyledButton
} from "components/common";
import {
  REGIS_TEXTFIELD_PLACEHOLDERS,
  REGIS_VALIDATE_ERRORS as ERRORS
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

const Register = ({ setIsLogin, toChat }) => {
  const [error, setError] = useState("");

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = ERRORS.name.empty;
    }
    if (!values.login) {
      errors.login = ERRORS.login.empty;
    }
    if (!values.password) {
      errors.password = ERRORS.password.empty;
    }
    if (!values.passwordCopy) {
      errors.passwordCopy = ERRORS.passwordCopy.empty;
    }
    if (values.passwordCopy && (values.password !== values.passwordCopy)) {
      errors.passwordCopy = ERRORS.passwordCopy.notMatch;
    }

    return errors;
  };

  const toLogin = () => {
    setIsLogin(true);
  };

  const signUp = async values => {
    setError("");
    try {
      await authSource.signUp(values);
      toChat(values.name);
      /*  */
    } catch (error) {
      console.log("regis", error.response || error);
      setError(error.response?.data || error);
    }
  };

  const handleOnSubmit = values => {
    localStorage.removeItem("uid");
    localStorage.removeItem("userName");

    signUp(values);
  };

  return (
    <StyledPaper>
      <Title>
        Регистрация
      </Title>
      <Form
        onSubmit={handleOnSubmit}
        validate={validate}
      >
        {
          ({ handleSubmit }) => (
            <>
              {
                REGIS_TEXTFIELD_PLACEHOLDERS.map(({ name, label, type }, index) => (
                  <FieldWrapper>
                    <Field
                      key={index}
                      name={name}
                      component={StyledTextField}
                      label={label}
                      type={type}
                    />
                  </FieldWrapper>
                ))
              }

              <PageSwitch>
                Есть аккаунт?
                <Link onClick={toLogin}>Войти</Link>
              </PageSwitch>

              <ButtonWrapper>
                <StyledButton
                  onClick={handleSubmit}
                  size="small"
                >
                  Зарегистрироваться
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

export default Register;