import React, { MouseEventHandler } from 'react';
import './style.css';

import { useAppDispatch, useAppSelector } from '~/hooks';
import Button from '~/components/ui/Button';
import { recipeToggled } from '~/store/filters/analytics/trends';
import { IRecipe } from '~/interfaces/entities';

interface Props {
  onClick: (id: number) => void;
  filters: number[];
  recipes: IRecipe[];
}

const RecipesFilter = ({ recipes, filters, onClick: handleClick }: Props) => {
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
    </div>
  );
}
 
export default RecipesFilter;