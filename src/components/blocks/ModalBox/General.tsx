import React from "react";
import './General.css';

interface Props {

}

const General = ({}: Props) => {
  return (
    <div className="modal-box__page modal-box__page-general">
      <div className="item">
        <div className="title">Имя</div>
        <div className="content">WMF 1500S+ русский</div>
      </div>
      <div className="item">
        <div className="title">Модель</div>
        <div className="content">WMF 1500S+</div>
      </div>
      <div className="item">
        <div className="title">Серийный номер</div>
        <div className="content">139921</div>
      </div>
      <div className="item">
        <div className="title">Статус</div>
        <div className="content">Модем онлайн: Да</div>
        <div className="content">Модем подключен к машине: Да</div>
      </div>
      <div className="item">
        <div className="title">Дата последних полученных данных</div>
        <div className="content">2023-10-05 11:41</div>
      </div>
      <div className="item">
        <div className="title">Информация о часовом поясе (UTC +/- X:XX)</div>
        <div className="content">04:00:00</div>
      </div>
    </div>
  )
}

export default General;


