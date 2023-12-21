import React from "react";
import './General.css';
import { useAppSelector } from "~/hooks";

interface Props {

}

const General = ({}: Props) => {

  const { coffeeMachine } = useAppSelector(state => state.ui.modalBox);
  const { coffeeMachineModels, coffeeMachineVendors, businessUnits } = useAppSelector(state => state.entities.data);

  const model = coffeeMachineModels.find(m => m.id === coffeeMachine?.modelId);
  const vendor = coffeeMachineVendors.find(v => v.id === model?.vendorId);
  const rest = businessUnits.find(bu => bu.id === coffeeMachine?.restaurantId);

  return (
    <div className="modal-box__page modal-box__page-general">
      <div className="item">
        <div className="title">Имя</div>
        <div className="content">{vendor?.name} {model?.name}</div>
      </div>
      <div className="item">
        <div className="title">Модель</div>
        <div className="content">{vendor?.name} {model?.name}</div>
      </div>
      <div className="item">
        <div className="title">Серийный номер</div>
        <div className="content">{coffeeMachine?.serialNumber}</div>
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
        <div className="content">Откуда взять???</div>
      </div>
    </div>
  )
}

export default General;


