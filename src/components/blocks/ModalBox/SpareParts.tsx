import React from "react";
import Button from "~/components/ui/Button";

import imgExcel from '~/assets/icons/excel.svg';
import DropDownList from "~/components/ui/DropDownList";
import Pagination from "~/components/elements/Pagination";

import './SpareParts.css';
import Table from '~/components/blocks/Table';

interface Props {

}

const SpareParts = ({}: Props) => {

  const tableContent: (string|number)[][] = [
    ["Дата", "Номер", "Статус", "Причина обращения", "Дата визита", "Техник", "Запчасти", "Код производителя", "Количество"],
  ];
  const tableKeys: string[] = [
    'date', 'number', 'status', 'cause', 'visitDate', 'technician', 'spareParts', 'manufacturerCode', 'quantity'
  ];
  const rowSample: (string)[] = [
    '25.06.2023', '12569', 'в работе', "текст", "29.06.2023", "Иванов Иван Иванович", "20.06.2023 14:44", "29 дней, 8ч", "29 дней, 8ч"
  ];
  tableContent.push(rowSample);
  tableContent.push(rowSample);
  tableContent.push(rowSample);
  tableContent.push(rowSample);
  tableContent.push(rowSample);
  tableContent.push(rowSample);

  return (
    <div className="modal-box__page modal-box__page-spare-parts">
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

export default SpareParts;


