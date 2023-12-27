import React, { useState } from 'react';

import "./style.css";
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';

const Credentials = () => {

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="page-profile__tab page-profile__tab-credentials">
      <h1>Пароль</h1>
      <section className="section-password">
        <div className="row">
          <div className="label">Новый пароль</div>
          <TextInput 
            name='password'
            type='password'
            value={password}
            onChange={(e) => {
              const { value } = e.currentTarget;
              setPassword(value);
            }}
            />
        </div>
        <div className="row">
          <div className="label">Повторите пароль</div>
          <TextInput 
            name='password-confirmation'
            type='password'
            value={passwordConfirmation}
            onChange={(e) => {
              const { value } = e.currentTarget;
              setPasswordConfirmation(value);
            }}
            />
        </div>
        <div className="row">
          <Button onClick={e => 1}>Отправить код</Button>
        </div>
      </section>
      <section className="section-code">
        <div className="row">
          <div className="label">
            Код из SMS
          </div>
          <TextInput 
            name='code'
            value={code}
            onChange={(e) => {
              const { value } = e.currentTarget;
              setCode(value);
            }}
            placeholder='SMS-код'
            />
        </div>
        <div className="row">
          <Button onClick={e => 1}>Подтвердить</Button>
        </div>
      </section>
      <section className="section-buttons">
        <Button onClick={e => 1}>Сохранить</Button>
        <Button onClick={e => 1}>Отменить</Button>
      </section>
      <br />

    </div>  
  )
}

export default Credentials;