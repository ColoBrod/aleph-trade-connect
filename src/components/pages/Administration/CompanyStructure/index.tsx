import React from 'react';

import './style.css';
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
import RegionTreeSelect from '~/components/blocks/RegionTreeSelect';

const CompanyStructure = () => {
  return (
    <div className='page page-administration__company-structure'>
      <div className="page__content container container-fluid">
        <aside>
          <RegionTreeSelect />
        </aside>
        <main>
          <div className="business-unit header">
            Центральный федеральный округ / Московская область / Москва / Бургер-1234
          </div>
          <div className="telegram-chat">
            <span className='telegram-chat__title header'>
              Telegram chat ID: 
            </span>
            <TextInput />
            <Button onClick={e => 1}>Сохранить</Button>
            <Button onClick={e => 1}>Отмена</Button>
          </div>
          <div className="address header">
            ул. Мневники 23А
          </div>
          <div className="business-unit-users">
            <div className="business-unit-users__header header">
              Пользователи бизнес единицы
            </div>
            <div className="business-unit-users__buttons">
              <Button onClick={e => 1}>Добавить</Button>
              <Button onClick={e => 1}>Удалить</Button>
            </div>
            <div className="business-unit-users__list">
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
              <div className="business-unit-users__user">
                <span>Иван</span> <span>+7 (965) 486-36-98</span>
              </div>
            </div>
            <div className="business-unit-users__cancel">
              <Button onClick={e => 1}>Отменить последнее действие</Button>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default CompanyStructure;
