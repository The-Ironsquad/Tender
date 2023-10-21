import { FC } from 'react';
import styles from './HomePage.module.css';

type PropsType = {
  onSelect: (page: string) => void;
};

const HomePage: FC<PropsType> = ({ onSelect }) => {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles.title}>Tender</h1>
      <h2>Your next recipe is just a moment away!</h2>
      <button
        className={styles['start-button']}
        onClick={() => onSelect('SelectPage')}
      >
        Get Started!
      </button>
    </div>
  );
};

export default HomePage;
