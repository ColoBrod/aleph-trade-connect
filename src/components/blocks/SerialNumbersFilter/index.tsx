import React, { MouseEventHandler } from 'react';
import SearchInput from '~/components/ui/SearchInput';
import SNBadge from '~/components/elements/SNBadge';
import { useAppDispatch } from '~/hooks';

import './style.css'

interface Props {
  handleAdd: Function;
  handleRemove: Function;
  handleRemoveAll?: Function;
  items: string[];
}

const SerialNumbersFilter = ({ handleAdd, handleRemove, handleRemoveAll, items }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <SearchInput
        onEnter={(value) =>
          dispatch(
            handleAdd({ substring: value })
            // serialNumberAdded({
            //   substring: value,
            // })
          )
        }
      />
      {
        items.length >= 2 
          ? <div 
              className='sn-badges__remove-all' 
              onClick={() => {
                if (handleRemoveAll) dispatch(handleRemoveAll(null))
              }}>Удалить все</div>
          : null
      }
      <div className="sn-badges">
        {items.map((sn) => (
          <SNBadge handleRemove={handleRemove} key={sn}>{sn}</SNBadge>
        ))}
      </div>
    </>
  );
}

// serialNumbers.list
 
export default SerialNumbersFilter;