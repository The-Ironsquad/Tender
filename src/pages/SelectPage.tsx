import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import styles from './SelectPage.module.css';

const SelectPage = () => {
  return (
    <div className={styles['select-page']}>
      <h1>Select</h1>
      <img
        src="https://img2.storyblok.com/960x640/filters:quality(80):format(webp)/f/108717/960x640/7fd6d1bd50/7-tipps-fur-gute-food-fotografie1.jpg"
        alt="plate"
      />
      <h3>Delicious Fluffy Pancakes with Blueberries</h3>
      <div className={styles.action}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="3x"
          style={{ color: 'red' }}
        />
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="3x"
          style={{ color: 'green' }}
        />
      </div>
    </div>
  );
};

export default SelectPage;
