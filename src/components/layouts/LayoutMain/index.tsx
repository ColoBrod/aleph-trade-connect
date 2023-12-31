import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import ModalBox from '~/components/blocks/ModalBox';
import TopPanel from './TopPanel';
import LeftPanel from './LeftPanel';

import { useAppDispatch, useAppSelector } from '~/hooks';
// import { dateRangeSet } from '~/store/filters/analytics';
import { fetchEntities } from '~/store/entities';
import { fetchUser } from '~/store/ui/profile';

import './style.css';
import Tooltip from '~/components/ui/Tooltip';

import {
  visibilitySet,
  tabSet,
  coffeeMachineSet
} from '~/store/ui/modal-box';
import ModalBoxUsers from '~/components/blocks/ModalBoxUsers';
import config from "~/config";

const LayoutMain = () => {
  console.log("ENVIRONEMNT:", process.env.NODE_ENV);
  console.log("API_URL:", config.api.url);

  const dispatch = useAppDispatch();

  const { status, error, data } = useAppSelector(state => state.entities);

  const { pathname } = useLocation();
  console.log("path:", pathname)

  /**
   * Получаем информацию о выбранной кофе-машине из Мониторинга или Я.Карт
   * Вычитываем из QuerySearchParams. Показываем модальное окно.
   */
  const [params, setParams] = useSearchParams();
  const coffeeMachineSN = params.get('coffee-machine');
  const { coffeeMachines } = useAppSelector(state => state.entities.data);

  useEffect(() => {
    if (!coffeeMachineSN || !coffeeMachines) return;
    const coffeeMachine = 
      coffeeMachines.find(cm => cm.serialNumber === coffeeMachineSN)
    if (coffeeMachine === undefined) return;
    dispatch(coffeeMachineSet(coffeeMachine));
    dispatch(visibilitySet(true));
    dispatch(tabSet('general'));
  }, [coffeeMachineSN, coffeeMachines])

  /**
   * Редирект на страницу авторизации, если нету токена
   */
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth/login" replace={true} />

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser())
      dispatch(fetchEntities())
    }
  }, [status])

  return (
    <div className="layout layout-main">
      <TopPanel />
      <LeftPanel />
      <div className="layout-main__inner">
        <Outlet />
        {pathname.includes('/administration/company-structure')
          ? <ModalBoxUsers />
          : <ModalBox /> }
      </div>
      
      <Tooltip />
    </div>
  );
}
// <ModalBoxUsers />
export default LayoutMain;
