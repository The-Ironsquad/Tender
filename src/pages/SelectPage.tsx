import { FC, useEffect, useState } from 'react';

import Recipe from '../models/recipe';
import fetchRandomRecipe from '../utils/fetchRandomRecipe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import styles from './SelectPage.module.css';

const EMPTY_RECIPE = new Recipe('', '', '', {}, ['']);

type PropsType = {
  rejectedList: string[];
  onAccept: (id: string, title: string) => void;
  onReject: (id: string) => void;
};

const SelectPage: FC<PropsType> = ({ onAccept, onReject, rejectedList }) => {
  const [recipe, setRecipe] = useState<Recipe>(EMPTY_RECIPE);

  useEffect(() => {
    fetchRandomRecipe(setRecipe, rejectedList);
  }, [rejectedList]);

  const acceptHandler = () => {
    onAccept(recipe.id, recipe.title);
    fetchRandomRecipe(setRecipe, rejectedList);
  };

  const rejectHandler = () => {
    onReject(recipe.id);
    fetchRandomRecipe(setRecipe, rejectedList);
  };

  return (
    <div className={styles['select-page']}>
      <h1>Select</h1>
      <img src={recipe.imgSrc} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className={styles.action}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="3x"
          style={{ color: 'red' }}
          onClick={rejectHandler}
        />
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="3x"
          style={{ color: 'green' }}
          onClick={acceptHandler}
        />
      </div>
    </div>
  );
};

export default SelectPage;
