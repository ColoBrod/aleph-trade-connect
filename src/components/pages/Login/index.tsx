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

import { login, LoginData } from '~/store/auth';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();
  const { step } = useAppSelector(state => state.pages.auth);
  // const 

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

  let inputs: ReactNode[];

  if (step === 'phone') inputs = [input.phone];
  else if (step === 'phone-password') inputs = [input.phone, input.password];
  else if (step === 'phone-sms-code') inputs = [input.phone, input.code];
  else if (step === 'set-password') inputs = [];
  else inputs = [];

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
        <Button 
          layout='dark-shadow' 
          onClick={e => {
            if (!phone) return;
            const data: LoginData = { phone };
            if (password) data.password = password;
            if (code) data.code = code;
            dispatch(login(data));
          }}
          >Вход</Button>
        <Button layout='dark-shadow' onClick={e => 1}>
          <img src={imgBack} alt="Go back" />
        </Button>

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
