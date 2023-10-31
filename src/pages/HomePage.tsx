import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks';
import { listActions } from '../store';

import fetchCategories from '../utils/fetchCategories';
import logo from '/Logo.svg';

import styles from './HomePage.module.css';

type CategoriyInput = {
  name: string;
  checked: boolean;
};

const HomePage = () => {
  const [categories, setCategories] = useState<CategoriyInput[]>([]);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories
  );

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCategories((state) => {
        return state.map((category) => ({
          name: category.name,
          checked: selectedCategories.includes(category.name),
        }));
      });
    }, 200);
  }, [selectedCategories, location]);

  const checkedHandler = (idx: number) => {
    dispatch(listActions.toggleCategory(categories[idx].name));
    setCategories((state) => {
      return state.map((category, currentIdx) => {
        if (idx === currentIdx) {
          return { name: category.name, checked: !category.checked };
        }
        return category;
      });
    });
  };

  const checkAll = (status: boolean) => {
    setCategories((state) =>
      state.map((category) => ({
        name: category.name,
        checked: status,
      }))
    );

    categories.forEach((category) => {
      if (selectedCategories.includes(category.name) === !status) {
        dispatch(listActions.toggleCategory(category.name));
      }
    });
  };

  const changeAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkAll(event.target.checked);
  };

  return (
    <div className={styles['home-page']}>
      <img src={logo} alt="tender-logo" />
      <h2>Your next recipe is just a moment away!</h2>
      <h3>What kind of food do you want to cook?</h3>
      <fieldset className={styles.fieldset}>
        <div>
          <input type="checkbox" id="all" onChange={changeAllHandler} />
          <label htmlFor="all">All</label>
        </div>
        {categories.map((category, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              id={`checkbox-${category.name}`}
              checked={category.checked}
              onChange={() => checkedHandler(idx)}
            />
            <label htmlFor={`checkbox-${category.name}`}>{category.name}</label>
          </div>
        ))}
      </fieldset>
      <button className={styles['start-button']}>
        <Link to="/select">Find Recipes!</Link>
      </button>
      <p>
        Powered by{' '}
        <a
          href="https://themealdb.com/api.php"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          The Meal DB
        </a>
      </p>
    </div>
  );
};

export default HomePage;
