import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BoxActivity.module.css';
import { CustomInput } from '../../components';
import { BoxActivityProps, BoxData, RootState, TaskData } from '../../data/types';
import { updateBox } from '../../redux/boxesRedux';
import { endTask, startTask } from '../../redux/tasksRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { timeToString } from '../../middleware/formatDate';

const BoxActivity: React.FC<BoxActivityProps> = ({ barcodes, boxes, users }) => {
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedBox, setSelectedBox] = useState<BoxData | null>(null);


  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    const savedBoxId = localStorage.getItem('selectedBoxId');
    if (savedBoxId) {
      const box = boxes.find(b => b.id === parseInt(savedBoxId, 10));
      if (box) {
        setSelectedBox(box);
        setBarcodeInput(box.barcode);
      }
    }
  }, [boxes]);

  const handleBarcodeChange = (value: string) => {
    setBarcodeInput(value);
    if (value.length > 0) {
      const suggestions = barcodes.filter(barcode =>
        barcode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBarcodes(suggestions);
      setShowSuggestions(true);
    } else {
      setFilteredBarcodes([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && filteredBarcodes.length === 1) {
      handleBarcodeSelect(filteredBarcodes[0]);
    }
  };

  const handleBarcodeSelect = (barcode: string) => {
    setBarcodeInput(barcode);
    setFilteredBarcodes([]);
    setShowSuggestions(false);
  };

  const handleFetch = () => {
    const box = boxes.find(b => b.barcode === barcodeInput);
    if (box) {
      setSelectedBox(box);
      localStorage.setItem('selectedBoxId', box.id.toString());
    } else {
      setSelectedBox(null);
      localStorage.removeItem('selectedBoxId');
    }
  };

  const handleStartInspection = () => {
    if (selectedBox && selectedBox.inspection) {
      const currentTime = timeToString(new Date());
      const operatorId = currentUser?.id;
      if (operatorId === undefined) {
        throw new Error('User ID is not available');
      }

      let updatedBox: BoxData = { ...selectedBox };

      if (!selectedBox.inspection.isFinished && !selectedBox.inspection.inProgress) {

        updatedBox = {
          ...selectedBox,
          inspection: {
            ...selectedBox.inspection,
            operator: operatorId || null,
            inProgress: true,
            startTime: currentTime || null,
            isFinished: false,
          },
          preparation: {
            ...selectedBox.preparation,
            operator: operatorId || null,
            inProgress: selectedBox.preparation?.inProgress || false,
            isFinished: selectedBox.preparation?.isFinished || false,
            startTime: selectedBox.preparation?.startTime || null,
            endTime: selectedBox.preparation?.endTime || null,
            durationMin: selectedBox.preparation?.durationMin || 0,
          },
          scanning1: {
            ...selectedBox.scanning1,
            operator: operatorId || null,
            inProgress: selectedBox.scanning1?.inProgress || false,
            isFinished: selectedBox.scanning1?.isFinished || false,
            startTime: selectedBox.scanning1?.startTime || null,
            endTime: selectedBox.scanning1?.endTime || null,
            durationMin: selectedBox.scanning1?.durationMin || 0,
          },
        };
        dispatch(updateBox(updatedBox));

        const newTask: Omit<TaskData, 'id'> = {
          taskType: 'Box Activity',
          activity: 'Inspection',
          boxId: selectedBox.id,
          userId: operatorId,
          startTime: currentTime,
          endTime: null,
          isPaused: false,
        };
        dispatch(startTask(newTask));
        const newEventLog = {
          userId: operatorId,
          eventType: 'Task Start' as const,
          taskId: selectedBox.id,
          timestamp: currentTime,
        };
        dispatch(addEventLog(newEventLog));
      } else if (selectedBox.inspection.inProgress) {

        const endTime = timeToString(new Date());
        updatedBox = {
          ...selectedBox,
          inspection: {
            ...selectedBox.inspection,
            inProgress: false,
            isFinished: true,
            endTime: endTime || null,
          },
        };
        dispatch(updateBox(updatedBox));
        const taskId = tasks.find(task => task.boxId === selectedBox.id && task.activity === 'Inspection')?.id;
        if (taskId) {
          dispatch(endTask(taskId));
          const endEventLog = {
            userId: operatorId,
            eventType: 'Task End' as const,
            taskId: taskId,
            timestamp: endTime,
          };
          dispatch(addEventLog(endEventLog));
        }
      }
      setSelectedBox(updatedBox);
    }
  };

  const getUserNameById = (id: number | null): string => {
    if (id === null) return 'Unknown';
    const foundUser = users.find(user => user.id === id);
    return foundUser ? foundUser.name : 'Unknown';
  };

  const getProcessStatusMessage = (process: BoxData['inspection'] | BoxData['preparation'] | BoxData['scanning1'] | BoxData['scanning2'] | BoxData['review'], processName: string) => {
    if (process?.isFinished) {
      return `${processName} completed by ${getUserNameById(process.operator)} at ${process.endTime}`;
    } else if (process?.inProgress) {
      return 'In Progress';
    } else if (process?.operator && !process?.isFinished) {
      return 'The process has already been started by another operator.';
    } else {
      return 'Not completed';
    }
  };

  const isButtonDisabled = (
    process: BoxData['inspection'] | BoxData['preparation'] | BoxData['scanning1'] | BoxData['scanning2'] | BoxData['review'], 
    previousProcessFinished: boolean,
    isCurrentOperator: boolean = true
  ): boolean => {
    if (process?.isFinished) {
      return true; // Процесс завершен - кнопка дизейбл
    }
  
    if (!previousProcessFinished) {
      return true; // Предыдущий процесс не завершен - кнопка дизейбл
    }
  
    if (!isCurrentOperator) {
      return true; // Текущий пользователь не является оператором - кнопка дизейбл
    }
  
    if (process?.operator !== null && process?.inProgress) {
      return false; // Процесс в работе, оператор назначен - кнопка активна
    }
  
    if (process?.operator !== null && !process?.isFinished) {
      return true; // Процесс начат другим оператором - кнопка дизейбл
    }
  
    return false; // По умолчанию кнопка активна
  };
  

  return (
    <div className={styles.boxActivity}>
<div className={styles.boxSearch}>
  <CustomInput
    type="text"
    label="Barcode"
    placeholder="Barcode"
    required
    getValue={handleBarcodeChange}
    valueProps={barcodeInput}
    dark
    onKeyDown={handleKeyDown}
    withDel
  />
  {showSuggestions && (
    <ul className={styles.suggestionsList}>
      {filteredBarcodes.length > 0 ? (
        filteredBarcodes.map((barcode) => (
          <li
            key={barcode}
            onClick={() => handleBarcodeSelect(barcode)}
            className={styles.suggestionItem}
          >
            {barcode}
          </li>
        ))
      ) : (
        <li className={styles.noMatchItem}>No matching barcodes found</li>
      )}
    </ul>
  )}
    <button className={styles.fetchButton} onClick={handleFetch}>Fetch</button>
</div>
      {selectedBox && (
        <div className={styles.boxProgress}>
          <div className={styles.boxStage}>
  <button
    className={`${styles.boxTaskButton} ${selectedBox.inspection?.inProgress ? styles.inProgressBtn : ''} ${selectedBox.inspection?.isFinished ? styles.completedBtn : ''}`}
    disabled={isButtonDisabled(selectedBox.inspection, true)}
    onClick={handleStartInspection}
  >
    {selectedBox.inspection?.isFinished ? 'Inspection completed' : (selectedBox.inspection?.inProgress ? 'End Inspection' : 'Start Inspection')}
  </button>
  <div className="status">
    {getProcessStatusMessage(selectedBox.inspection, 'Inspection')}
  </div>
</div>

          <div className={styles.boxStage}>
            <button
              className={styles.boxTaskButton}
              disabled={isButtonDisabled(selectedBox.preparation, selectedBox.inspection?.isFinished ?? false)}
            >
              {selectedBox.preparation?.isFinished ? 'Preparation completed' : 'Start Preparation'}
            </button>
            <div className="status">
              {selectedBox.inspection?.isFinished ?
                getProcessStatusMessage(selectedBox.preparation, 'Preparation') :
                'The previous process is not yet complete'}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button
              className={styles.boxTaskButton}
              disabled={isButtonDisabled(selectedBox.scanning1, selectedBox.preparation?.isFinished ?? false)}
            >
              {selectedBox.scanning1?.isFinished ? 'Scanning 1 completed' : 'Start Scanning 1'}
            </button>
            <div className="status">
              {selectedBox.preparation?.isFinished ?
                getProcessStatusMessage(selectedBox.scanning1, 'Scanning 1') :
                'The previous process is not yet complete'}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button
              className={styles.boxTaskButton}
              disabled={isButtonDisabled(selectedBox.scanning2, selectedBox.scanning1?.isFinished ?? false)}
            >
              {selectedBox.scanning2?.isFinished ? 'Scanning 2 completed' : 'Start Scanning 2'}
            </button>
            <div className="status">
              {selectedBox.scanning1?.isFinished ?
                getProcessStatusMessage(selectedBox.scanning2, 'Scanning 2') :
                'The previous process is not yet complete'}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button
              className={styles.boxTaskButton}
              disabled={isButtonDisabled(selectedBox.review, selectedBox.scanning2?.isFinished ?? false)}
            >
              {selectedBox.review?.isFinished ? 'Review completed' : 'Start Review'}
            </button>
            <div className="status">
              {selectedBox.scanning2?.isFinished ?
                getProcessStatusMessage(selectedBox.review, 'Review') : 
                'The previous process is not yet complete'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxActivity;
