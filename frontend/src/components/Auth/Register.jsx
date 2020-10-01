import React, { useState } from 'react';
import { Form, Field } from "react-final-form";
import { userSource } from "sources";
import { regisValidate } from "Auth/utils";
import {
  StyledTextField,
  StyledButton
} from "components/common";
import { REGIS_TEXTFIELD_PLACEHOLDERS } from "Auth/constants";

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

  const toLogin = () => {
    setIsLogin(true);
  };

  const signUp = async values => {
    setError("");
    try {
      const user = { ...values };
      const res = await userSource.signUp(user);
      toChat({ name: res.data.name, uid: res.data.uid });
    } catch (error) {
      console.log("regis", error.response || error);
      setError(error.response?.data.message || error.toString());
    }
  };

  const handleOnSubmit = values => {
    signUp(values);
  };

  return (
    <StyledPaper>
      <Title>
        Регистрация
      </Title>
      <Form
        onSubmit={handleOnSubmit}
        validate={regisValidate}
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