import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BoxActivity.module.css';
import { BoxStage, CustomInput } from '../../components';
import { BoxData, RootState } from '../../data/types';
import { timeToString } from '../../middleware/formatDate';
import { startTask } from '../../redux/tasksRedux';
import { AppDispatch } from '../../redux/store';
import { updateCurrentBox } from '../../redux/userRedux';
import { getTaskActivity } from '../../middleware/taskUtils';

const BoxActivity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const barcodes = useSelector((state: RootState) => state.boxes.barcodes);
  const boxes = useSelector((state: RootState) => state.boxes.boxes);
  const currentBoxId = useSelector((state: RootState) => state.user.currentBox);
  const users = useSelector((state: RootState) => state.users.users);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const currentUserFromUsers = users.find(user => user.id === currentUser?.id);

  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedBox, setSelectedBox] = useState<BoxData | null>(null);
  const [isBoxActivityAvailable, setIsBoxActivityAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (currentUserFromUsers) {
      setIsBoxActivityAvailable(currentUserFromUsers.isActive && !currentUserFromUsers.isWorkEvent);
    } else {
      setIsBoxActivityAvailable(false);
    }
  }, [currentUserFromUsers]);

  useEffect(() => {
    if (currentBoxId) {
      const box = boxes.find((box: BoxData) => box.id === currentBoxId);
      setSelectedBox(box || null);
    } else {
      setSelectedBox(null);
    }
  }, [currentBoxId, boxes]);

  const handleBarcodeChange = (value: string) => {
    setBarcodeInput(value);
    if (value.length > 0) {
      const suggestions = barcodes.filter((barcode: string) =>
        barcode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBarcodes(suggestions);
      setShowSuggestions(true);
    } else {
      setFilteredBarcodes([]);
      setShowSuggestions(false);
      setSelectedBox(null);
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
    const box = boxes.find((box: BoxData) => box.barcode === barcodeInput);
    if (box) {
      setSelectedBox(box);
      dispatch(updateCurrentBox(box.id));
      setBarcodeInput('');
      console.log(`Selected box with barcode: ${box.barcode} and ID: ${box.id}`);
      localStorage.setItem('selectedBoxId', box.id.toString());
    } else {
      setSelectedBox(null);
      dispatch(updateCurrentBox(null));
      console.log('No box found with the provided barcode.');
      localStorage.removeItem('selectedBoxId');
    }
  };

const handleProcessAction = (processType: keyof BoxData) => {
  if (!selectedBox || !currentUserFromUsers) return;

  console.log(`Starting process for ${processType} of box with barcode: ${selectedBox.barcode}`);

  const timestamp = timeToString(new Date());

  const activeTask = tasks.find(task => task.boxId === selectedBox.id && task.endTime === null);

  if (activeTask) {
    dispatch({
      type: 'tasks/endTask',
      payload: {
        ...activeTask,
        endTime: timestamp,
      },
    });
    console.log(`Task for process ${activeTask.activity} ended. Task ID: ${activeTask.id}, Box ID: ${activeTask.boxId}`);
  }

  const taskActivity = getTaskActivity(processType);

  dispatch(startTask({
    taskType: "Box Activity",
    activity: taskActivity,
    boxId: selectedBox.id,
    userId: currentUserFromUsers.id,
    startTime: timestamp,
    endTime: null,
    isPaused: false,
  }));

  console.log(`Task for process ${processType} started. User ID: ${currentUserFromUsers.id}, Box ID: ${selectedBox.id}`);
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
        <button
          className={styles.fetchButton}
          onClick={handleFetch}
          disabled={!isBoxActivityAvailable}
        >
          Fetch
        </button>
      </div>
      {currentBoxId && (
        <div className={styles.currentBoxLabel}>
          Last Selected box: {selectedBox?.barcode}
        </div>
      )}
      {selectedBox && (
        <div className={styles.boxProgress}>
          <BoxStage
            process={selectedBox.inspection}
            processType="inspection"
            onProcessAction={() => handleProcessAction('inspection')}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.preparation}
            processType="preparation"
            onProcessAction={() => handleProcessAction('preparation')}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.scanning1}
            processType="scanning1"
            onProcessAction={() => handleProcessAction('scanning1')}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.scanning2}
            processType="scanning2"
            onProcessAction={() => handleProcessAction('scanning2')}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.review}
            processType="review"
            onProcessAction={() => handleProcessAction('review')}
            selectedBox={selectedBox}
          />
        </div>
      )}
    </div>
  );
};

export default BoxActivity;
