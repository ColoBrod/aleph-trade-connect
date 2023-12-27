import React, { useState } from 'react';

import "./style.css";
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
// import UploadImage from '../UploadImage';
import { uploadImageToggled } from '~/store/ui/profile';
import { useAppDispatch } from '~/hooks';
import imgDefaultAvatar from './user-default-image.jpg'


const Common = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [utc, setUtc] = useState("+03:00");

  return (
    <div className="page-profile__tab page-profile__tab-common">
      <h1>Личные данные</h1>
      <section className='section-top'>
        <div 
          onClick={(e) => {
            dispatch(uploadImageToggled(true));
          }}
          className="avatar">

        </div>
        <div className="rows">
          <div className="row">
            <div className="label">Имя</div>
            <TextInput 
              name='name'
              placeholder='Имя пользователя'
              onChange={(e) => {
                const { value } = e.currentTarget;
                setName(value);
              }}
              />
          </div>
          <div className="row">
            <div className="label">Почта</div>
            <TextInput 
              name='name'
              placeholder='E-Mail'
              onChange={(e) => {
                const { value } = e.currentTarget;
                setEmail(value);
              }}
              />
            <Button onClick={e => 1}>Отправить код</Button>
          </div>
        </div>
      </section>
      <section className="section-bottom">
        <div className="row">
          <div className="label">Код из почты</div>
          <TextInput 
            name='name'
            placeholder='Код из почты'
            onChange={(e) => {
              const { value } = e.currentTarget;
              setEmailCode(value);
            }}
            />
          <Button onClick={e => 1}>Подтвердить</Button>
        </div>
        <div className="row">
          <div className="label">Номер телефона</div>
          <TextInput 
            name='phone'
            placeholder='+7 (___) ___-__-__'
            mask="+7 (999) 999-99-99"
            value={phone}
            onChange={(e) => {
              const { value } = e.currentTarget;
              setPhone(value);
            }}
            />
        </div>
        <div className="row">
          <div className="label">Код из SMS</div>
          <TextInput 
            name='code'
            placeholder='Код из SMS'
            onChange={(e) => {
              const { value } = e.currentTarget;
              setCode(value);
            }}
            />
          <Button onClick={e => 1}>Подтвердить</Button>
        </div>
        <div className="row">
          <div className="label">UTC+</div>
          <select name="utc" id="utc">
            <option value={"+02:00"}>+02:00</option>
            <option value={"+03:00"}>+03:00</option>
            <option value={"+04:00"}>+04:00</option>
            <option value={"+05:00"}>+05:00</option>
            <option value={"+06:00"}>+06:00</option>
            <option value={"+07:00"}>+07:00</option>
            <option value={"+08:00"}>+08:00</option>
            <option value={"+09:00"}>+09:00</option>
            <option value={"+10:00"}>+10:00</option>
            <option value={"+11:00"}>+11:00</option>
            <option value={"+12:00"}>+12:00</option>
          </select>
        </div>
      </section>
      <section className="section-buttons">
        <Button onClick={e => 1}>Сохранить</Button>
        <Button onClick={e => 1}>Отменить</Button>
      </section>
      <br />

      {/* <UploadImage /> */}
    </div>  
  )
}

export default Common;