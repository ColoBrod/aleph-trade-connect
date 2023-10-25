import React from 'react';

import './style.css';
import Logo from '~/components/elements/Logo';
import AppName from '~/components/elements/AppName';
import TextInput from '~/components/ui/TextInput';
import Checkbox from '~/components/ui/Checkbox';
import Button from '~/components/ui/Button';

const Login = () => {
  return (
    <div className="page page-login">
      <Logo fixed={true} />
      <AppName color="dark" />
      <TextInput placeholder='E-Mail' />
      <TextInput placeholder='Password' />
      <Checkbox id='remember-me' label='Запомнить меня' checked={true} />
      <Button>Войти</Button>
      <Button>Зарегистрироваться</Button>
    </div>
  );
}
 
export default Login;