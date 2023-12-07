import React, { MouseEventHandler } from 'react';
import './style.css';

import Button from '~/components/ui/Button';
import { IRecipe } from '~/interfaces/entities';

interface Props {
  onClick: (id: number) => void;
  handleSelectAll?: MouseEventHandler<HTMLSpanElement>;
  handleUnselectAll?: MouseEventHandler<HTMLSpanElement>;
  filters: number[];
  recipes: IRecipe[];
}

const RecipesFilter = ({ recipes, filters, onClick: handleClick, handleSelectAll, handleUnselectAll }: Props) => {
  return (
    <div className="recipes-filter">
      {
        recipes.map(recipe => {
          const { id, name } = recipe;
          const active: boolean = filters.indexOf(recipe.id) !== -1;
          return (
            <Button 
              key={recipe.id}
              layout={active ? "dark" : "light"}
              onClick={() => {
                handleClick(recipe.id)
              }}
              >
                {recipe.name}
            </Button>)
        })
      }    
      <div className="recipes-filter__controls">
        <span onClick={handleUnselectAll} className="recipes-filter__clear">[-] Очистить</span>
        <span onClick={handleSelectAll} className="recipes-filter__select-all">[+] Добавить все</span>
      </div>
    </div>
  );
}
 
export default RecipesFilter;