import React from 'react';
import './style.css';

import { useAppDispatch, useAppSelector } from '~/hooks';
import Button from '~/components/ui/Button';
import { recipeToggled } from '~/store/filters/analytics/trends';

const RecipesFilter = () => {

  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector(state => state.filters.analytics.trends);

  return (
    <div className="recipes-filter">
      {
        recipes.map(recipe => {
          const { id, name, active } = recipe;
          return (
            <Button 
              key={recipe.id}
              layout={recipe.active ? "dark" : "light"}
              onClick={() => dispatch(recipeToggled({ id, active }))}
              >
                {recipe.name}
            </Button>)
        })
      }    
    </div>
  );
}
 
export default RecipesFilter;