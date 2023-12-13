import React, { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './style.css';
import imgCross from './close-btn.svg';
import imgDDLArrow from './ddl-arrow.svg';
import DropDownList from '~/components/ui/DropDownList';
import Button from '~/components/ui/Button';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { ModalBoxTab, tabSet, visibilitySet } from '~/store/ui/modal-box';
import General from './General';
import EventsHistory from './EventsHistory';
import Location from './Location';
import Maintenance from './Maintenance';
import Monitoring from './Monitoring';
import SpareParts from './SpareParts';

interface Props {
}

// const modalBox = {
//   "coffee-machine": <h1>Кофе-машина</h1>,
//   "new-ticket": <h1>Новое обращение</h1>,
// };

type Page = [ModalBoxTab, ReactNode];

const pages: Page[] = [
  ['general', <General />],
  ['location', <Location />],
  ['monitoring', <Monitoring />],
  ['events-history', <EventsHistory />],
  ['maintenance', <Maintenance />],
  ['spare-parts', <SpareParts />],
];
 
const ModalBox = (props: Props): ReactNode => {
  const [params, setParams] = useSearchParams();
  // const page = params.get("modal-box");
  // @ts-ignore
  // const content = page ? modalBox[page] : null;
  const { tab, page, visibility } = useAppSelector(state => state.ui.modalBox);
  const dispatch = useAppDispatch();
  const display = visibility === true ? 'block' : 'none';
  const activeTab = pages.find(p => p[0] === tab);

  return (
    <div className='modal-box__dim' style={{ display }} >
      <div className='modal-box'>
        <div className="modal-box__top-panel">
          {/* <div className="modal-box__title">{content}</div> */}
          <span className="modal-box__restaurant">Бургер Кинг 2569</span>
          <span className="modal-box__coffee-machine-model">WMF 1500S+</span>
          <span className="modal-box__serial-number">Серийный номер: 265892</span>
          <span className="modal-box__spacer"></span>
          {renderDDL()}
          {/* <Button onClick={e => 1} layout={'light'}>Обновить</Button> */}
          <img src={imgCross} className='modal-box__close-btn' onClick={handleClose} alt="Закрыть модальное окно" />
        </div>
        <div className="modal-box__main">
          <div className="modal-box__nav-area">
            <div className="modal-box__nav-box">
              <span className="modal-box__nav-header">Администрирование</span>
              <span onClick={handleTabClick} data-name="general" className={`modal-box__nav-elem ${tab === 'general' ? 'active' : ''}`}>Общее</span>
              <span onClick={handleTabClick} data-name="location" className={`modal-box__nav-elem ${tab === 'location' ? 'active' : ''}`}>Расположение</span>
              <span data-name="" className="modal-box__nav-header">События</span>
              <span onClick={handleTabClick} data-name="monitoring" className={`modal-box__nav-elem ${tab === 'monitoring' ? 'active' : ''}`}>Мониторинг</span>
              <span onClick={handleTabClick} data-name="events-history" className={`modal-box__nav-elem ${tab === 'events-history' ? 'active' : ''}`}>История событий</span>
              <span onClick={handleTabClick} data-name="maintenance" className={`modal-box__nav-elem ${tab === 'maintenance' ? 'active' : ''}`}>Сервисное обслуживание</span>
              <span onClick={handleTabClick} data-name="spare-parts" className={`modal-box__nav-elem ${tab === 'spare-parts' ? 'active' : ''}`}>Замена запчастей</span>
            </div>
          </div>
          <div className="modal-box__content-area">
            {activeTab ? activeTab[1] : null}
          </div>
        </div>
      </div>
    </div>
  );

  function handleTabClick(e: React.MouseEvent<HTMLSpanElement>) {
    const span = e.currentTarget;
    const { dataset: { name } } = span;
    // @ts-ignore
    dispatch(tabSet(name));
  }

  function renderDDL() {
    return (
      <select className='modal-box__remote-actions'>
        <option value="" disabled selected>Удаленные действия</option>
        <option value="1">Выключить кофе-машину</option>
      </select>
    )
  }


  function handleClose() {
    dispatch(visibilitySet(false));
    // const p = Object.assign({}, params);
    // p.delete('modal-box');
    // const str = p.toString();
    // setParams((prevParams) => {
    //   prevParams.delete('modal-box');
    //   return 
    // })

    // const urlSearchParams = new URLSearchParams({ })
    // const params = urlSearchParams.toString()
    // setParams(params);
  }

}
 
export default ModalBox;
