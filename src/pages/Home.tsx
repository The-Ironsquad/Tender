import { FC } from 'react';
import styles from './Home.module.css';

type PropsType = {
  onSelect: (page: string) => void;
};

const Home: FC<PropsType> = ({ onSelect }) => {
  return (
    <>
      <h1 className={styles.title}>Tender</h1>
      <h2>Your next recipe is just a moment away!</h2>
      <button
        className={styles['start-button']}
        onClick={() => onSelect('SelectPage')}
      >
        Get Started!
      </button>
    </>
  );
};

export default Home;
