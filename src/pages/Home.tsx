import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <h1 className={styles.title}>Tender</h1>
      <h2>Your next recipe is just a moment away!</h2>
      <button className={styles['start-button']}>Get Started!</button>
    </>
  );
};

export default Home;
