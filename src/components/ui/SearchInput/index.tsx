import React, { ChangeEventHandler, KeyboardEvent, KeyboardEventHandler } from 'react';

import './style.css';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  // onSubmit?: SubmitEventHandler<HTMLInputElement>;
  onEnter?: (value: string) => void;
  // React.FormEvent<HTMLInputElement>,
}

const SearchInput = (props: Props) => {
  const { onChange: handleChange, onEnter: handleSubmit } = props;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter' || !handleSubmit) return;
    const { value } = event.currentTarget;
    event.currentTarget.value = "";
    handleSubmit(value);
  }

  return (
    <div className="search-input">
      <input onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Поиск' type="text" />
    </div>
  );
}
 
export default SearchInput;