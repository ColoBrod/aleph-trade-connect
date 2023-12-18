import React, { ReactNode } from "react";
import Button from "~/components/ui/Button";

import imgExcel from '~/assets/icons/excel.svg';
import DropDownList from "~/components/ui/DropDownList";
import Table from "../Table";
import Pagination from "~/components/elements/Pagination";

import imgWorking from './working.svg';
import imgNotWorking from './not-working.svg';

import './Maintenance.css';

interface Props {

}

const Maintenance = ({}: Props) => {

  const working = <img src={imgWorking} alt="Работает" />
  const notWorking = <img src={imgNotWorking} alt="Не работает" />

  const tableContent: (string|number|ReactNode)[][] = [
    ["Дата", "Номер", "Статус", "Причина обращения", "Дата визита", "Техник", "Работает", "Отчет техника"],
  ];
  const tableKeys: string[] = [
    'date', 'number', 'status', 'cause', 'visitDate', 'technician', 'works', 'technicianReport'
  ];
  const rowSample1: (string|ReactNode)[] = [
    '25.06.2023', '12569', 'в работе', "текст", "29.06.2023", "Иванов Иван Иванович", working, "29 дней, 8ч"
  ];
  const rowSample2: (string|ReactNode)[] = [
    '25.06.2023', '12569', 'в работе', "текст", "29.06.2023", "Иванов Иван Иванович", notWorking, "29 дней, 8ч"
  ];
  tableContent.push(rowSample1);
  tableContent.push(rowSample2);
  tableContent.push(rowSample1);
  tableContent.push(rowSample2);
  tableContent.push(rowSample1);
  tableContent.push(rowSample2);

  return (
    <div className="modal-box__page modal-box__page-maintenance">
      <div className="modal-box__filters">
        <Button onClick={e => 1}>Создать обращение</Button>
        <Button onClick={e => 1}>
          <img src={imgExcel} />
          Скачать
        </Button>
        <DropDownList 
          onChange={(e) => {
            const value = parseInt(e.currentTarget.value);
            // dispatch(activePageSet(1));
            // dispatch(rowsPerPageSet(value));
            // dispatch(idleSet({}))
          }} 
          value={"10"} //perPage.toString()
          label="Показать по" 
          name='pages' 
          items={[
            { value: "10", innerHTML: "10" },
            { value: "20", innerHTML: "20" },
            { value: "50", innerHTML: "50" },
          ]} 
        />
        <Pagination 
          handler={
            (pageIndex: number) => {
              // dispatch(activePageSet(pageIndex));
              // dispatch(idleSet({}))
            }
          } 
          pagesTotal={7} 
          activePage={1} 
          />
      </div>
      <Table 
        keys={tableKeys} 
        data={tableContent} 
        />

    </div>
  )
}

export default Maintenance;


