import React from 'react';
import DropDownList from '~/components/ui/DropDownList';
import { useAppDispatch } from '~/hooks';
import './style.css';

interface Props {
  utc: string;
  utcSet: Function;
}

const UTC_DDL = ({ utc, utcSet }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <DropDownList
      onChange={(e) => {
        // const utc = parseInt(e.currentTarget.value);
        dispatch(utcSet(e.currentTarget.value));
      }}
      value={utc}
      label='UTC+'
      name='utc'
      items={[
        { value: '+00:00', innerHTML: "+00:00" },
        { value: '+01:00', innerHTML: "+01:00" },
        { value: '+02:00', innerHTML: "+02:00" },
        { value: '+03:00', innerHTML: "+03:00" },
        { value: '+04:00', innerHTML: "+04:00" },
        { value: '+05:00', innerHTML: "+05:00" },
        { value: '+06:00', innerHTML: "+06:00" },
        { value: '+07:00', innerHTML: "+07:00" },
        { value: '+08:00', innerHTML: "+08:00" },
        { value: '+09:00', innerHTML: "+09:00" },
      ]}
    />
  )
}

export default UTC_DDL;