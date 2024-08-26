import React from 'react';
import styles from './BoxStage.module.css';
import { BoxData, BoxTaskTypes } from '../../data/types';

interface BoxStageProps {
  process: BoxTaskTypes | null;
  processType: keyof BoxData;
  handleProcessAction: () => void;
  isDisabled: boolean;
}

const BoxStage: React.FC<BoxStageProps> = ({ process, processType, handleProcessAction, isDisabled }) => {
  const processTitle = processType.charAt(0).toUpperCase() + processType.slice(1);
  const inProgress = process?.inProgress ?? false;
  const isFinished = process?.isFinished ?? false;

  return (
    <div className={styles.boxStage}>
      <button
        className={`${styles.boxTaskButton} ${inProgress ? styles.inProgressBtn : ''} ${isFinished ? styles.completedBtn : ''}`}
        onClick={handleProcessAction}
        disabled={isDisabled}
      >
        {isFinished
          ? `${processTitle} completed`
          : inProgress
          ? `End ${processTitle}`
          : `Start ${processTitle}`}
      </button>
      <div className="status">
        {isFinished
          ? `${processTitle} is completed`
          : inProgress
          ? `${processTitle} in progress`
          : 'You can start the process'}
      </div>
    </div>
  );
}

export default BoxStage;
