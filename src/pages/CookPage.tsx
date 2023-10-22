import { FC } from 'react';

import styles from './CookPage.module.css';

type PropsType = {
  selectedId: string;
};

const CookPage: FC<PropsType> = ({ selectedId }) => {
  return (
    <div className={styles['cook-page']}>
      <h1>Time to Cook</h1>
      {selectedId}
    </div>
  );
};

export default CookPage;
