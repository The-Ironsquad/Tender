import { Link } from 'react-router-dom';

import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles.title}>Tender</h1>
      <h2>Your next recipe is just a moment away!</h2>
      <button className={styles['start-button']}>
        <Link to="/select">Get Started!</Link>
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
