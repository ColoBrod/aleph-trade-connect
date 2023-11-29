import React from 'react';
import './style.css';

import Button from '~/components/ui/Button';
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