import { Link, useNavigate } from 'react-router-dom';

import { listActions } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks';

import styles from './ListPage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const ListPage = () => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector((state) => state.acceptedList);

  const navigate = useNavigate();

  if (selectedList.length === 0) {
    return (
      <div className={styles['list-page']}>
        <h1>Your List</h1>
        <div className={styles.empty}>
          <h3>No Recipes Selected!</h3>
          <button>
            <Link to="/select">Go to selection!</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['list-page']}>
      <h1>Your List</h1>
      <ul className={styles.list}>
        <AnimatePresence>
          {selectedList.map(([id, title]) => {
            return (
              <motion.li
                key={id}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ duration: 0.2 }}
              >
                <p>{title}</p>
                <div className={styles.action}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: 'red' }}
                    size="xl"
                    onClick={() => dispatch(listActions.remove(id))}
                  />
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: 'green' }}
                    size="xl"
                    onClick={() => {
                      dispatch(listActions.select(id));
                      navigate('/cook');
                    }}
                  />
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      <h3>Still undecided?</h3>
      <div className={styles.navigate}>
        <button>
          <Link to="/refine">Refine your selection!</Link>
        </button>
        <button>
          <Link to="/select">Back to selection!</Link>
        </button>
      </div>
    </div>
  );
};

export default ListPage;
