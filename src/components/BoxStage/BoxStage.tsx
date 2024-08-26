import React from 'react';
import { useSelector } from 'react-redux';
import styles from './BoxStage.module.css';
import { BoxData, BoxTaskTypes, RootState } from '../../data/types';
import { formatDateTime } from '../../middleware/formatDate';
import { getUserNameById } from '../../middleware/userUtils';

interface BoxStageProps {
  process: BoxTaskTypes | null;
  processType: keyof BoxData;
  handleProcessAction: () => void;
  selectedBox: BoxData | null;
}

const BoxStage: React.FC<BoxStageProps> = ({
  process,
  processType,
  handleProcessAction,
  selectedBox
}) => {

  const processTitle = processType.charAt(0).toUpperCase() + processType.slice(1);
  const inProgress = process?.inProgress ?? false;
  const isFinished = process?.isFinished ?? false;

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.users.users);
  const isUserAtWork = useSelector((state: RootState) => state.user.atWork);
  const isUserAtEvent = useSelector((state: RootState) => state.user.isWorkEvent);

  // Выводим значение isUserAtEvent в консоль при каждом рендере
  console.log(`isUserAtEvent: ${isUserAtEvent}`);

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

  const shouldDisableButton = (
    process: BoxTaskTypes | null,
    previousProcess: BoxTaskTypes | null,
    currentUserId: number,
    processType: keyof BoxData
  ): boolean => {

    // Проверка, заблокирован ли пользователь по причине отсутствия на работе или участия в рабочем событии
    if (!isUserAtWork) {
      console.log(`Button ${processType} disabled because the user is not at work.`);
      return true;
    }
    if (isUserAtEvent) {
      console.log(`Button ${processType} disabled because the user is at a work event.`);
      return true;
    }

    if (!process) {
      console.log(`Button ${processType} disabled because process is null.`);
      return true;
    }

    // Блокировка кнопки, если предыдущий процесс не завершен
    if (previousProcess && !previousProcess.isFinished) {
      console.log(`Button ${processType} disabled because the previous process is not finished.`);
      return true;
    }

    // Блокировка кнопки, если текущий процесс управляется другим оператором (для preparation и scanning1)
    if ((processType === 'preparation' || processType === 'scanning1') && process.operator !== null && process.operator !== currentUserId) {
      console.log(`Button ${processType} disabled because the current user (ID: ${currentUserId}) is not the operator for this process (${processType}). Operator is ${process.operator}.`);
      return true;
    }

    // Блокировка кнопки, если текущий пользователь тот же, что и в предыдущем процессе, для scanning2
    if (processType === 'scanning2' && previousProcess?.operator === currentUserId) {
      console.log(`Button ${processType} disabled because the current user (ID: ${currentUserId}) is the same as the previous operator for scanning2.`);
      return true;
    }

    // Блокировка кнопки, если процесс завершен
    if (process.isFinished) {
      console.log(`Button ${processType} disabled because the process (${processType}) is finished.`);
      return true;
    }

    // Если процесс приостановлен, кнопка должна быть активной для продолжения
    if (process.isPaused) {
      console.log(`Button ${processType} is not disabled because the process (${processType}) is paused.`);
      return false;
    }

    // Если процесс в процессе выполнения текущим пользователем, кнопка должна быть активной
    if (process.inProgress && process.operator === currentUserId) {
      console.log(`Button ${processType} is not disabled because the process (${processType}) is in progress by the current user (ID: ${currentUserId}).`);
      return false;
    }

    // В остальных случаях кнопка должна быть активной
    console.log(`Button ${processType} is not disabled by default condition.`);
    return false;
  };

  const isButtonDisabled = (() => {
    const disabled = shouldDisableButton(process, previousProcess, currentUser?.id || 0, processType);
    console.log(`Final disabled state for ${processType}:`, disabled);
    return disabled;
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

  return (
    <div className={styles.boxStage}>
      <button
        className={`${styles.boxTaskButton} ${inProgress ? styles.inProgressBtn : ''} ${isFinished ? styles.completedBtn : ''}`}
        onClick={handleProcessAction}
        disabled={isButtonDisabled}
      >
        {isFinished
          ? `${processTitle} completed`
          : inProgress
          ? `End ${processTitle}`
          : `Start ${processTitle}`}
      </button>
      <div className={styles.status}>
        {getStatusMessage()}
      </div>
    </div>
  );
}

export default BoxStage;
