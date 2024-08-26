import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BoxStage.module.css';
import { BoxData, BoxTaskTypes, RootState } from '../../data/types';
import { formatDateTime, timeToString } from '../../middleware/formatDate';
import { getUserNameById } from '../../middleware/userUtils';
import { updateBox } from '../../redux/boxesRedux';

interface BoxStageProps {
  process: BoxTaskTypes | null;
  processType: keyof BoxData;
  selectedBox: BoxData | null;
}

const BoxStage: React.FC<BoxStageProps> = ({
  process,
  processType,
  selectedBox
}) => {
  const dispatch = useDispatch();
  
  const processTitle = processType.charAt(0).toUpperCase() + processType.slice(1);
  const inProgress = process?.inProgress ?? false;
  const isFinished = process?.isFinished ?? false;

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.users.users);
  const isUserAtWork = useSelector((state: RootState) => state.user.atWork);
  const isUserAtEvent = useSelector((state: RootState) => state.user.isWorkEvent);

  const previousProcess = selectedBox
    ? ((): BoxTaskTypes | null => {
        switch (processType) {
          case 'preparation':
            return selectedBox.inspection;
          case 'scanning1':
            return selectedBox.preparation;
          case 'scanning2':
            return selectedBox.scanning1;
          case 'review':
            return selectedBox.scanning2;
          default:
            return null;
        }
      })()
    : null;

  const handleProcessAction = () => {
    if (!process || !selectedBox || !currentUser) return;

    const timestamp = timeToString(new Date());
    let updatedProcess = { ...process };

    if (process.isPaused) {
      // Убираем паузу и добавляем новый период
      updatedProcess = {
        ...updatedProcess,
        isPaused: false,
        inProgress: true,
        periodsOfTime: [
          ...updatedProcess.periodsOfTime,
          {
            id: updatedProcess.periodsOfTime.length + 1,
            startTime: timestamp,
            endTime: null,
          },
        ],
      };
    } else if (inProgress) {
      // Завершение текущего периода и процесса
      updatedProcess = {
        ...updatedProcess,
        inProgress: false,
        isFinished: true,
        periodsOfTime: updatedProcess.periodsOfTime.map(period =>
          period.endTime === null ? { ...period, endTime: timestamp } : period
        ),
      };
    } else {
      // Начало нового процесса
      updatedProcess = {
        ...updatedProcess,
        inProgress: true,
        operator: currentUser.id,
        periodsOfTime: [
          ...updatedProcess.periodsOfTime,
          {
            id: updatedProcess.periodsOfTime.length + 1,
            startTime: timestamp,
            endTime: null,
          },
        ],
      };
    }

    // Обновляем состояние коробки
    const updatedBox = {
      ...selectedBox,
      [processType]: updatedProcess,
    };

    dispatch(updateBox(updatedBox));
    console.log("Updated Box Data after process action:", updatedBox);
  };

  const shouldDisableButton = (
    process: BoxTaskTypes | null,
    previousProcess: BoxTaskTypes | null,
    currentUserId: number,
    processType: keyof BoxData
  ): boolean => {
    
    if (!isUserAtWork) {
      return true;
    }
    if (isUserAtEvent) {
      return true;
    }
    
    if (!process) {
      return true;
    }
    
    if (previousProcess && !previousProcess.isFinished) {
      return true;
    }
    
    if ((processType === 'preparation' || processType === 'scanning1') && process.operator !== null && process.operator !== currentUserId) {
      return true;
    }
    
    if (processType === 'scanning2' && previousProcess?.operator === currentUserId) {
      return true;
    }
    
    if (process.isFinished) {
      return true;
    }
    
    if (process.isPaused) {
      return false;
    }
    
    if (process.inProgress && process.operator === currentUserId) {
      return false;
    }
    
    return false;
  };

  const isButtonDisabled = (() => {
    return shouldDisableButton(process, previousProcess, currentUser?.id || 0, processType);
  })();

  const endTime = process?.periodsOfTime.length
    ? process.periodsOfTime[process.periodsOfTime.length - 1].endTime
    : '';

  const getStatusMessage = (): string => {
    if (!process) return '';

    if (isFinished) {
      const userName = getUserNameById(process.operator, users);
      return `${processTitle} is completed by ${userName} on ${endTime && formatDateTime(endTime)}`;
    }

    if (process.isPaused) {
      return 'You can continue the process';
    }

    if (inProgress && process.operator !== currentUser?.id) {
      const userName = getUserNameById(process.operator, users);
      return `The process has already been started by ${userName}`;
    }

    if (inProgress) {
      return `${processTitle} in progress`;
    }

    if (previousProcess && !previousProcess.isFinished) {
      return 'The previous process is not yet complete';
    }

    if (processType === 'scanning2' && previousProcess?.operator === currentUser?.id) {
      return 'This process must be started by another operator';
    }

    return 'You can start the process';
  };

  const getButtonLabel = (): string => {
    if (isFinished) {
      return `${processTitle} completed`;
    }

    if (process && process.isPaused) {
      return `Continue ${processTitle}`;
    }

    return inProgress ? `End ${processTitle}` : `Start ${processTitle}`;
  };

  const buttonClass = `${styles.boxTaskButton} ${inProgress ? styles.inProgressBtn : ''} ${isFinished ? styles.completedBtn : ''} ${process?.isPaused ? styles.inPauseBtn : ''}`;

  return (
    <div className={styles.boxStage}>
      <button
        className={buttonClass}
        onClick={handleProcessAction}
        disabled={isButtonDisabled}
      >
        {getButtonLabel()}
      </button>
      <div className={styles.status}>
        {getStatusMessage()}
      </div>
    </div>
  );
}

export default BoxStage;
