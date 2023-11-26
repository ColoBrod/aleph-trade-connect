import React from 'react';
import SearchInput from '~/components/ui/SearchInput';
import SNBadge from '~/components/elements/SNBadge';
import { useAppDispatch } from '~/hooks';

interface Props {
  handleAdd: Function;
  handleRemove: Function;
  items: string[];
}

const SerialNumbersFilter = ({ handleAdd, handleRemove, items }: Props) => {
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