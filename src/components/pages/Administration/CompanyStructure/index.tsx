import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import './style.css';
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
import RegionTreeSelect from '~/components/blocks/RegionTreeSelect';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { IBusinessUnit, IUser } from '~/interfaces/entities';
import { fetchUsers, removeUser } from '~/store/pages/administration/company-structure';
import Loader from '~/components/blocks/Loader';
import { modalBoxToggled, modalBoxPageSet, modalBoxUsersSet, userSet } from '~/store/pages/administration/company-structure';

const CompanyStructure = () => {
  const dispatch = useAppDispatch();
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const { businessUnitId, userId, users, status, error } = useAppSelector(
    state => state.pages.administration.companyStructure
  );
  const businessUnit = businessUnits.find(bu => bu.id === businessUnitId)
  const path = generateHierarchyString(businessUnits, businessUnitId);
  const defaultChatTelegramId = businessUnit ? businessUnit.chatTelegramId : "";
  const [chatTelegramId, setChatTelegramId] = useState(defaultChatTelegramId);
  // console.log("Default TG chat id:", defaultChatTelegramId);
  // console.log("chatTelegramId:", chatTelegramId);
  const address = businessUnit?.address ? businessUnit.address : <>&nbsp;</>;

  let filteredUsers: IUser[] = [];
  if (businessUnitId) 
    filteredUsers = getUsersByBusinessUnitId(users, businessUnits, businessUnitId);

  useEffect(() => {
    setChatTelegramId(defaultChatTelegramId);
  }, [defaultChatTelegramId])

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers());
  }, [status])

  useEffect(() => {
    const list = users.filter(user => filteredUsers.includes(user) === false);
    dispatch(modalBoxUsersSet(list));
  }, [businessUnitId])

  const rmBtnDisabled = () => {
    const user = users.find(u => u.id === userId);
    if (user === undefined) return true;
    if (user.businessUnitsIds.includes(businessUnitId)) return false;
    return true;
  }

  console.log("Disabled:", rmBtnDisabled())

  // useEffect(() => {
  //   const u = users.filter(user => filteredUsers.includes(user) === false);
  //   dispatch(modalBoxUsersSet(u))
  // }, [users])

  const renderUsers = (users: IUser[]): ReactNode[] | ReactNode => {
    if (status === 'loading') return <Loader />
    return users.map(user => {
      const { fullName } = user;
      const phone = formatPhone(user.phone);
      const active = userId === user.id ? 'active' : '';
      return (
        <div 
          id={user.id} 
          key={user.id} 
          onClick={(e) => {
            const { id } = e.currentTarget;
            dispatch(userSet(id));
          }}
          className={`business-unit-users__user ${active}`}
        >
          {phone} - {fullName}
        </div>
      )
    })
  }

  return (
    <div className='page page-administration__company-structure'>
      <div className="page__content container container-fluid">
        <aside>
          <RegionTreeSelect />
        </aside>
        <main>
          <div className="business-unit header">
            {path}
          </div>
          <div className="address header">
            {address}
          </div>
          <div className="telegram-chat">
            <span className='telegram-chat__title header'>
              Telegram chat ID: 
            </span>
            <TextInput 
              name='chat-telegram-id'
              value={chatTelegramId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.currentTarget;
                setChatTelegramId(value);
              }}
              />
            <Button onClick={e => 1}>Сохранить</Button>
            <Button onClick={e => 1}>Отмена</Button>
          </div>
          <div className="business-unit-users">
            <div className="business-unit-users__header header">
              Пользователи бизнес единицы
            </div>
            <div className="business-unit-users__buttons">
              <Button 
                disabled={businessUnitId ? false : true}
                onClick={e => {
                  dispatch(modalBoxPageSet('all-users'));
                  dispatch(modalBoxToggled(true));
                }}>
                  Добавить
              </Button>
              <Button 
                disabled={ rmBtnDisabled() }
                onClick={(e) => {
                  dispatch(removeUser({ userId, businessUnitId }))
                }}>
                  Удалить
              </Button>
            </div>
            <div className="business-unit-users__list">
              {renderUsers(filteredUsers)}
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

function formatPhone(phone: string): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return "+7 (XXX) XXX-XX-XX";
  const intlCode = (match[1] ? '+7 ' : '');
  return [intlCode, ' (', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('');
}

function generateHierarchyString(businessUnits: IBusinessUnit[], childId: string) {
  const getChildObject = (parentId: string): IBusinessUnit | undefined => {
    return businessUnits.find(unit => unit.id === parentId);
  };

  const getChildHierarchy = (currentId: string): string => {
    const child = getChildObject(currentId);
    if (child === undefined) return '';
    // @ts-ignore
    const parent = getChildObject(child.parentId);
    if (parent === undefined) return child.name;
    return getChildHierarchy(parent.id) + ' / ' + child.name;
  };

  const childHierarchyString = getChildHierarchy(childId);
  return childHierarchyString;
}

function findAncestors(units: IBusinessUnit[], targetId: string) {
  const ancestors: string[] = [];

  function findAncestorsRecursive(currentId: string) {
    const unit = units.find(unit => unit.id === currentId);

    if (unit) ancestors.push(unit.id)
    if (unit && unit.parentId) findAncestorsRecursive(unit.parentId);
  }

  const targetUnit = units.find(unit => unit.id === targetId);

  if (targetUnit?.id) ancestors.push(targetUnit.id);
  if (targetUnit?.parentId) findAncestorsRecursive(targetUnit.parentId);

  return ancestors;
}

function getUsersByBusinessUnitId(users: IUser[], businessUnits: IBusinessUnit[], businessUnitId: string): IUser[] {
  const ids = findAncestors(businessUnits, businessUnitId);
  console.log("%cFiltering", "color: green; font-size: 20px;");
  console.log(ids);
  return users.filter(user => user.businessUnitsIds.some(id => ids.includes(id)))
}

// Example usage:
// const targetBusinessUnitId = "a7af51b4-1b8b-406d-83f3-9e321105b64d"; // Медногорск
// const usersFiltered = getUsersByBusinessUnitId(users, businessUnits, targetBusinessUnitId);
// console.log(usersFiltered);

export default CompanyStructure;
