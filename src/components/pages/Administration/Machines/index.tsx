import React, { useEffect } from 'react';
import './style.css';

import FiltersAside from '~/components/blocks/FiltersAside';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { use_LG_MAX } from '~/media-queries';
import { visibilitySet } from '~/store/ui/filters-aside';
import RegionTree from '~/components/blocks/RegionTree';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
import Loader from '~/components/blocks/Loader';
import { channel } from '~/services/pusher';
import { timezones as tz } from '~/services/timezones';

import FiltersAsideButton from '~/components/elements/FiltersAsideButton';
import { error as errorClasses } from '~/services/errors';

import { 
  businessUnitsSet, 
  businessUnitsExpanded, 
  businessUnitsFilterChanged, 
  businessUnitsSelectedAll,
  coffeeMachineModelSelected,
  coffeeMachineModelSearched,
  serialNumberAdded,
  serialNumberRemoved,
  serialNumbersRemovedAll
} from '~/store/filters/administration/machines';
import SerialNumbersFilter from '~/components/blocks/SerialNumbersFilter';
import { IRow, fetchEvents } from '~/store/pages/maintenance/monitoring';
import { rowsPerPageSet, activePageSet, orderBySet } from '~/store/filters/administration/machines';
import { IPusherMap } from '~/interfaces/pusher';
import machines, { IRowFmt, idleSet } from '~/store/pages/administration/machines';
import Table from '~/components/blocks/Table';
import { IFiltersOrderBy } from '~/interfaces/filters';

type MachineStatus = 'grey' | 'red' | 'yellow' | 'green';

const Machines = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters.administration.machines);
  const { pagination: { activePage, perPage }, orderBy } = filters;
  const { status, error, data, utc } = useAppSelector(state => state.pages.administration.machines)
  const { 
    businessUnits, 
    coffeeMachines, 
    coffeeMachineModels,
    coffeeMachineVendors,
    errors
  } = useAppSelector(state => state.entities.data);

  /**
   * 
   */
  useEffect(() => {
    if (status === 'idle') dispatch(fetchEvents());
  }, [status])

  useEffect(() => {
    channel.bind('map', (data: IPusherMap) => dispatch(idleSet(null)));
    return () => { channel.unbind('map'); }
  }, [status])

  /**
   * Фильтры
   */
  const regionTree = <RegionTree 
    actions={{
      businessUnitsSet,
      businessUnitsExpanded,
      businessUnitsFilterChanged,
      businessUnitsSelectedAll,
    }}
    items={businessUnits}
    selector={filters.businessUnits}
  />

  const coffeeMachineFilter = <CoffeeMachineFilter 
    checked={filters.coffeeMachineModels.list} 
    reducer={coffeeMachineModelSelected} 
  />

  const serialNumbersFilter = <SerialNumbersFilter 
    handleAdd={serialNumberAdded} 
    handleRemove={serialNumberRemoved} 
    handleRemoveAll={serialNumbersRemovedAll}
    items={filters.serialNumbers.list} 
  />

  /**
   * Таблица
   */
  const tableHeaders = [
    "Бизнес единица", "Ресторан", "Имя машины", "Серийный номер", "Модель", "Дата добавления"
  ];
  const tableKeys = ['path','restaurant','machineName','serialNumber','modelName','datetime'];

  const formatData = (data: IRow[]): IRowFmt[] => {
    const grouped: IRowFmt[] = [];
    data.forEach(row => {
      const coffeeMachineId = row.coffeeMachineId;
      const groupedRow = grouped.find(r => r.id === coffeeMachineId);
      const err = errors.find(err => err.code === row.errorCode);
      const errorType = err !== undefined ? err.type : 'unknown';
      const errorObj = { code: row.errorCode, type: errorType, desc: row.errorText };

      const date = new Date(row.startDateTime);
      const cm = coffeeMachines.find(cm => cm.id === row.coffeeMachineId); 
      const model = coffeeMachineModels.find(m => m.id === cm?.modelId);
      const vendor = coffeeMachineVendors.find(v => v.id === model?.vendorId);
      const bu = businessUnits.find(b => b.id === cm?.restaurantId);
      const datetime = date.toLocaleString('ru-RU', { timeZone: tz["+03:00"] });

      if (!groupedRow) grouped.push({
        id: coffeeMachineId,
        errors: [ errorObj ],
        path: bu ? bu.name : "",
        restaurant: bu ? bu.name : "",
        machineName: cm?.name ? cm.name : "",
        serialNumber: cm?.serialNumber ? cm.serialNumber : "",
        modelName: model?.name ? model.name : "",
        dateObj: date,
        datetime,
      })
      else groupedRow.errors.push(errorObj)
    });
    return grouped;
  }

  const sortData = (
    data: IRowFmt[],
    orderBy: IFiltersOrderBy['orderBy'],
  ): IRowFmt[] => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let itemA, itemB;
      // @ts-ignore
      const { column, order } = orderBy;
      if (column === 'datetime') {
        // @ts-ignore
        itemA = new Date(a.dateObj);
        // @ts-ignore
        itemB = new Date(b.dateObj);
      }
      else if (column === 'serialNumber') {
        itemA = parseInt(a[column]);
        itemB = parseInt(b[column]);
      }
      else {
        // @ts-ignore
        itemA = a[column];
        // @ts-ignore
        itemB = b[column];
      }
      if (itemA < itemB) return order === 'desc' ? -1 : 1;
      else if (itemA > itemB) return order === 'desc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  const fmt = formatData(data);
  const sorted = sortData(fmt, orderBy);

  // "Бизнес единица", "Ресторан", "Имя машины", "Серийный номер", "Модель", "Дата добавления"
  const fmtArr = sorted.map((row: IRowFmt) => {
    const { errors } = row;
    let machineStatus: MachineStatus;
    if (errors.some(err => err.code === '-1')) machineStatus = 'grey';
    else if (errors.some(err => {
      const errClass = err.type !== 'unknown' ? errorClasses[err.type] : 'unknown';
      return errClass === 'error';
    })) machineStatus = 'red';
    else if (errors.some(err => {
      const errClass = err.type !== 'unknown' ? errorClasses[err.type] : 'unknown';
      return errClass === 'maintenance';
    })) machineStatus = 'yellow';
    else machineStatus = 'green';
    // const { errorCode, errorType } = row;
    // const errorClass = errorType !== 'unknown' 
    //   ? errorClasses[errorType] 
    //   : 'unknown';
    // let machineStatus: MachineStatus;
    // if (errorCode === '-1') machineStatus = 'grey';
    // else if (errorClass === 'error') machineStatus = 'red';
    // else if (errorClass === 'maintenance') machineStatus = 'yellow';
    // else machineStatus = 'green';
    return (
      [
        row.path,
        row.restaurant,
        <><span className={`circle circle-${machineStatus}`}></span> {row.machineName}</>,
        row.serialNumber,
        row.modelName,
        row.datetime
      ]
    );
  })

  const tableContent = [
    tableHeaders,
    ...fmtArr
  ];

  

  return (
    <div className='page page-administration__machines page-shared__table'>
      <div className="page__content container container-fluid">
        <FiltersAside 
          component={{
            regionTree,
            coffeeMachineFilter,
            serialNumbersFilter,
          }}
        />
        <div className="table-wrapper">
          {
            status === 'loading'
              ? <Loader />
              : <Table
                  data={tableContent}
                  keys={tableKeys}
                  handleSort={(key: string): void => {
                    dispatch(orderBySet(key));
                  }}
                  orderBy={orderBy}
                  />
          }
        </div>
      </div>
      {/* <div className="filters-top">

      </div> */}
      
      {/* <div className="table-wrapper">
        {
          status === 'loading'
            ? <Loader />
            : <Table
                data={tableContent}
                keys={tableKeys}
                handleSort={() => 1}
                />
        }
      </div> */}
    </div>
  );
}

export default Machines;