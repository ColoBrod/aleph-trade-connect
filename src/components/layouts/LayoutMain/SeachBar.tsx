import React from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { IBusinessUnit, ICoffeeMachine } from '~/interfaces/entities';

interface Props {
  items: (ICoffeeMachine | IBusinessUnit)[];
}

const SearchBar = ({ items }: Props) => {

  const handleOnSearch = (string: string, results: any) => {
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const handleOnFocus = () => {
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item: any) => {
    return (
      <div className="result-wrapper">
        <span className="result-span">{item.id}</span> - 
        <span className="result-span">{item.name}</span>
      </div>
    );
  };

  return (
    <div className="panel-top__search-bar">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        placeholder='Поиск'
        styling={{ 
          // #707070 - font and icon color
          iconColor: "#707070",
          placeholderColor: "#707070",
          border: "1px solid #D1D1D1",
          searchIconMargin: '0 0 0 10px',
          clearIconMargin: '4px 10px 0 0',
          borderRadius: "4px",
          height: "30px",
          zIndex: 4,
        }} // To display it on top of the search box below
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
}
 
export default SearchBar;