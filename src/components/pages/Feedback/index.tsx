import React, { useEffect, useState } from 'react';
import './style.css';
import TextInput from '~/components/ui/TextInput';
import TextArea from '~/components/ui/TextArea';
import { useAppDispatch, useAppSelector } from '~/hooks';
import DropDownList from '~/components/ui/DropDownList';
import Button from '~/components/ui/Button';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

const Feedback = () => {

  const { profile } = useAppSelector(state => state.ui);
  const { 
    fullName: defaultFullName,
    phone: defaultPhone,
    email: defaultEmail,
    org: defaultOrg,
  } = profile;
  
  const [fullName, setFullName] = useState(defaultFullName);
  const [phone, setPhone] = useState(defaultPhone);
  const [email, setEmail] = useState(defaultEmail);
  const [org, setOrg] = useState(defaultOrg);
  const [message, setMessage] = useState("");
  const [city, setCity] = useState();
  
  useEffect(() => {
    setFullName(defaultFullName);
    setPhone(defaultPhone);
    setEmail(defaultEmail);
    setOrg(defaultOrg);
  }, [profile]);

  // @ts-ignore
  console.log(city?.value);

  return (
    <div className="page page-feedback">
      <h1>Форма обратной связи</h1>
      <section className="form">
        <div className="column column-1">
          <TextInput 
            name='name'
            label="Ваше имя"
            placeholder='Имя'
            value={fullName}
            layout='form'
          />
          <TextInput 
            name='phone'
            mask="+7 (999) 999-99-99"
            label="Номер телефона"
            placeholder='+7 (___) ___-__-__'
            value={phone}
            layout='form'
          />
          <TextInput 
            name='email'
            label="Почта"
            placeholder='Почта'
            value={email}
            layout='form'
          />
          <TextInput 
            name='org'
            label="Организация"
            placeholder='Организация'
            value={org}
            layout='form'
          />
          <AddressSuggestions 
            token="5874a56ba296bc418a745b0ae3e4b7f409d332fa" 
            value={city} 
            onChange={setCity} />
          {/*
          <TextInput
            name='city'
            label='Населенный пункт'
            placeholder='Название вашего населенного пункта'
            layout='form'
            value={city}
            onChange={e => setCity(e.currentTarget.value)}
            />*/}
          <Button onClick={e => 1}>Отправить</Button>
          {/* <DropDownList
            name='city'
            items={[
              { value: "Moscow", innerHTML: "Moscow" },
              { value: "St. Petersburg", innerHTML: "St. Petersburg" },
            ]}
          /> */}
        </div>

        <div className="column column-2">
          <TextArea 
            name='message'
            label='Обращение'
            layout='form'
            value={message}
            onChange={(e) => {
              const { value } = e.currentTarget;
              setMessage(value);
            }}
            />
          <div className="row">
            <span className='attach-file-text'>Прикрепить файл</span>
            <Button onClick={e => 1}>Выбрать файл</Button>
          </div>
        </div>
      </section>
      <section className="privacy-policy">
        <a href="#">Политика конфиденциальности</a>
      </section>
    </div>
  );
}
 
export default Feedback;
