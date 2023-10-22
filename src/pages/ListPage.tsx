import { FC } from 'react';

import styles from './ListPage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

type PropsType = {
  selectedList: string[][];
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};

const ListPage: FC<PropsType> = ({ selectedList, onRemove, onSelect }) => {
  return (
    <div className={styles['list-page']}>
      <h1>Your List</h1>
      <ul>
        {selectedList.map(([id, title]) => {
          return (
            <li key={id}>
              <p>{title}</p>
              <div className={styles.action}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: 'red' }}
                  size="lg"
                  onClick={onRemove.bind(null, id)}
                />
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: 'green' }}
                  size="lg"
                  onClick={onSelect.bind(null, id)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListPage;
