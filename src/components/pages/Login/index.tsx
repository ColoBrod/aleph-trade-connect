import React, { ReactNode, useEffect, useState } from 'react';

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
import { Navigate, useNavigate } from 'react-router-dom';

const SMS_TIMEOUT = 5;

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [code, setCode] = useState("");
  const { status } = useAppSelector(state => state.pages.auth);
  const [codeTimeout, setCodeTimeout] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { step, notification } = useAppSelector(state => state.pages.auth);
  // if (token) return <Navigate to={`/`} replace={false} />

  const handleSubmit = () => {
    if (!phone) return;
    const data: LoginData = { step, phone };
    if (password) data.password = password;
    if (code) data.code = code;
    if (step !== 'set-password') dispatch(login(data));
    else dispatch(register(data));
  }

  /**
   * Подтверждение формы при нажатии на Enter
   */
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    }
    document.addEventListener('keypress', handleEnter)
    return () => document.removeEventListener('keypress', handleEnter);
  }, [])

  /**
   * Очищаем пароль и код при переключении между этапами
   */
  useEffect(() => {
    setPassword("");
    setCode("");
  }, [step])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (status === 'idle') return;
    else if (status === 'redirect' && token) navigate('/');
  }, [status])

  /**
   * Устанавливаем обратный отсчет на повторную отправку SMS
   */
  useEffect(() => {
    if (notification?.input === 'code' && notification.text.includes("Код с подтверждением отправлен") && codeTimeout === 0) {
      setCodeTimeout(SMS_TIMEOUT);
      let seconds: number = SMS_TIMEOUT;
      let intervalId: number;
      // @ts-ignore
      intervalId = setInterval(() => {
        seconds -= 1;
        if (seconds > 0) setCodeTimeout(seconds);
        else {
          setCodeTimeout(0);
          clearInterval(intervalId);
        }
      }, 1000)

    }
  }, [notification])

  const input = {
    phone: (
      <TextInput 
        key='phone'
        name='phone'
        mask="+7 (999) 999-99-99"
        label={notification?.input === 'phone' ? notification.text : 'Телефон'}
        modi={notification?.input === 'phone' ? notification.type : ""}
        type='text'
        value={phone}
        disabled={step === 'phone' ? false : true}
        onChange={(e) => {
          let { value } = e.currentTarget;
          value = value.replace(/[^0-9+]/g, "");
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
        label={notification?.input === 'password' ? notification.text : 'Пароль'}
        modi={notification?.input === 'password' ? notification.type : ""}
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
        label={notification?.input === 'password' ? 'Подтверждение пароля' : 'Подтверждение пароля'}
        modi={notification?.input === 'password' ? notification.type : ""}
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
        label={notification?.input === 'code' ? notification.text : 'Код из SMS'}
        modi={notification?.input === 'code' ? notification.type : ""}
        value={code}
        onChange={(e) => {
          const { value } = e.currentTarget;
          setCode(value);
        }}
        placeholder='Код из SMS' 
        />
    ),
  }

  const button = {
    submit: (
      <Button 
        key='submit'
        layout='dark-shadow' 
        onClick={handleSubmit}
        >Вход</Button>
    ),
    back: (
      <Button 
        key='back'
        layout='dark-shadow' 
        onClick={() => dispatch(stepSet('phone'))}
        >
        <img src={imgBack} alt="Go back" />
      </Button>
    ),
    sms: (
      <Button 
        key='sms'
        disabled={codeTimeout > 0 ? true : false}
        layout='dark-shadow' 
        onClick={e => {
          if (codeTimeout > 0) return;
          if (!phone) return;
          const data: LoginData = { step, phone };
          dispatch(login(data))
        }}
        >Отправить SMS {codeTimeout > 0 ? `(${codeTimeout})` : ''}</Button>
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

  const anotherLoginMethods = (
    <span className="another-login-methods" onClick={() => {
      if (step === 'phone-password') dispatch(stepSet('phone-sms-code'));
      else if (step === 'phone-sms-code') dispatch(stepSet('phone-password'));
    }}>
      другие способы входа
    </span>
  );

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
        {step === 'phone-sms-code' ? [button.submit, button.back] : button.submit}
      </div>
      {step === 'phone-sms-code' || step === 'phone-password' ? anotherLoginMethods : null}
      {/* <span style={{ height: '40px', lineHeight: '40px', fontSize: '14px', textAlign: 'center', cursor: 'pointer' }}>
      </span> */}
      {step === 'phone-sms-code' ? button.sms : null}
      {/* <Checkbox id='remember-me' label='Запомнить меня' checked={true} /> */}
      {/* <Button>Войти</Button> */}
      {/* <Button>Зарегистрироваться</Button> */}
    </div>
  );
}
 
export default Login;
