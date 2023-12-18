import React, { ReactNode, useState } from 'react';

import './style.css';
import Logo from '~/components/elements/Logo';
import AppName from '~/components/elements/AppName';
import TextInput from '~/components/ui/TextInput';
import Checkbox from '~/components/ui/Checkbox';
import Button from '~/components/ui/Button';
import imgBack from './back.svg';
import { stepSet } from '~/store/pages/auth';
import { useAppDispatch, useAppSelector } from '~/hooks';

import { login, LoginData, register } from '~/store/pages/auth';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();
  const { step } = useAppSelector(state => state.pages.auth);

  const input = {
    phone: (
      <TextInput 
        key='phone'
        name='phone'
        label='Телефон'
        type='text'
        value={phone}
        onChange={(e) => {
          const { value } = e.currentTarget;
          setPhone(value);
        }}
        placeholder='Номер телефона' 
        />
    ),
    password: (
      <TextInput 
        key='password'
        type='password'
        name='password'
        label='Пароль'
        value={password}
        onChange={(e) => {
          const { value } = e.currentTarget;
          setPassword(value);
        }}
        placeholder='Пароль' 
        />
    ),
    passwordConfirmation: (
      <TextInput 
        key='password-confirmation'
        type='password'
        name='password-confirmation'
        label='Пароль'
        value={passwordConfirmation}
        onChange={(e) => {
          const { value } = e.currentTarget;
          setPasswordConfirmation(value);
        }}
        placeholder='Подтверждение пароля' 
        />
    ),
    code: (
      <TextInput 
        key='code'
        type='text'
        name='code'
        label='Код из SMS'
        value={code}
        onChange={(e) => {
          const { value } = e.currentTarget;
          setCode(value);
        }}
        placeholder='Код из SMS' 
        />
    )
  }

  const button = {
    submit: (
      <Button 
        key='submit'
        layout='dark-shadow' 
        onClick={e => {
          if (!phone) return;
          const data: LoginData = { step, phone };
          if (password) data.password = password;
          if (code) data.code = code;
          if (step !== 'set-password') dispatch(login(data));
          else dispatch(register(data));
        }}
        >Вход</Button>
    ),
    back: (
      <Button 
        key='back'
        layout='dark-shadow' 
        onClick={e => 1}
        >
        <img src={imgBack} alt="Go back" />
      </Button>
    ),
    sms: (
      <Button 
        key='sms'
        layout='dark-shadow' 
        onClick={e => {
          
        }}
        >Отправить SMS</Button>
    )
  }

  let inputs: ReactNode[], buttons: ReactNode[];

  if (step === 'phone') {
    inputs = [input.phone];
    // buttons = [button.submit, button.back]
  }
  else if (step === 'phone-password') {
    inputs = [input.phone, input.password];
    // buttons = [button.submit]
  }
  else if (step === 'phone-sms-code') {
    inputs = [input.phone, input.code];
    // buttons = [button.submit]
  }
  else if (step === 'set-password') {
    inputs = [];
    // buttons = [button.submit]
  }
  else {
    inputs = [];
    // buttons = [];
  }

  return (
    <div className="page page-login">
      <div className="logo-section">
        <Logo fixed={true} active={false} color='dark' />
        <AppName color="dark" />
      </div>
      <div className="form-inputs">
        {inputs}
      </div>
      <div className="form-buttons">
        {/* {button} */}
      </div>
      <span className="another-login-methods">
        другие способы входа
      </span>
      {/* <span style={{ height: '40px', lineHeight: '40px', fontSize: '14px', textAlign: 'center', cursor: 'pointer' }}>
      </span> */}
      <Button layout='dark-shadow' onClick={e => 1}>Отправить SMS</Button>
      {/* <Checkbox id='remember-me' label='Запомнить меня' checked={true} /> */}
      {/* <Button>Войти</Button> */}
      {/* <Button>Зарегистрироваться</Button> */}
    </div>
  );
}
 
export default Login;
