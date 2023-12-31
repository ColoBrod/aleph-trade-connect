import React, { useState } from 'react';

import './style.css';
import Logo from '~/components/elements/Logo';
import AppName from '~/components/elements/AppName';
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
import imgBack from './back.svg';

interface Props {


}

const Phone = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [smsCode, setSmsCode] = useState("");

  return (
    <div className="page page-login">
      <div className="logo-section">
        <Logo fixed={true} active={false} color='dark' />
        <AppName color="dark" />
      </div>
      <div className="form-inputs">
        <TextInput 
          name='phone'
          label='Телефон'
          value={username}
          onChange={(e) => {
            const { value } = e.currentTarget;
            setUsername(value);
          }}
          placeholder='Номер телефона' 
          />
        <TextInput 
          type='password'
          name='password'
          label='Пароль'
          value={password}
          onChange={(e) => {
            const { value } = e.currentTarget;
            setPassword(value);
          }}
          placeholder='Password' 
          />
      </div>
      <div className="form-buttons">
        <Button layout='dark-shadow'>Вход</Button>
        <Button layout='dark-shadow'>
          <img src={imgBack} alt="Go back" />
        </Button>

      </div>
      <span className="another-login-methods">
        другие способы входа

      </span>
      {/* <span style={{ height: '40px', lineHeight: '40px', fontSize: '14px', textAlign: 'center', cursor: 'pointer' }}>
      </span> */}
      <Button layout='dark-shadow'>Отправить SMS</Button>
      {/* <Checkbox id='remember-me' label='Запомнить меня' checked={true} /> */}
      {/* <Button>Войти</Button> */}
      {/* <Button>Зарегистрироваться</Button> */}
    </div>
  );
}




