import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BoxActivity.module.css';
import { BoxStage, CustomInput } from '../../components';
import { BoxData, BoxTaskTypes, RootState, } from '../../data/types';
import { timeToString } from '../../middleware/formatDate';
import { startTask } from '../../redux/tasksRedux';
import { AppDispatch } from '../../redux/store';
import { updateBox } from '../../redux/boxesRedux';
import { updateCurrentBox } from '../../redux/userRedux'; // Импортируем экшн для обновления текущей коробки

const BoxActivity = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const barcodes = useSelector((state: RootState) => state.boxes.barcodes);
  const boxes = useSelector((state: RootState) => state.boxes.boxes);
  const currentBoxId = useSelector((state: RootState) => state.user.currentBox);
  const users = useSelector((state: RootState) => state.users.users);

  const currentUserFromUsers = users.find(user => user.id === currentUser?.id);

  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedBox, setSelectedBox] = useState<BoxData | null>(null);
  const [isBoxActivityAvailable, setIsBoxActivityAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (currentUserFromUsers) {
      setIsBoxActivityAvailable(currentUserFromUsers.isActive && !currentUserFromUsers.isWorkEvent);
    }
  }, [currentUserFromUsers?.isActive, currentUserFromUsers?.isWorkEvent]);

  useEffect(() => {
    // Следим за обновлением currentBoxId в стейте и обновляем selectedBox на основе этого ID
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
      dispatch(updateCurrentBox(box.id)); // Обновляем текущую коробку в стейте Redux для user
      setBarcodeInput(''); // Очищаем инпут
      localStorage.setItem('selectedBoxId', box.id.toString());
    } else {
      setSelectedBox(null);
      dispatch(updateCurrentBox(null)); // Очищаем текущую коробку в стейте Redux
      localStorage.removeItem('selectedBoxId');
    }
  };

  const handleProcessAction = (processType: keyof BoxData) => {
    if (!selectedBox || !currentUserFromUsers) return;
  
    console.log(`Start processing ${processType} of ${selectedBox.barcode}`);
  
    // Текущее время
    const timestamp = timeToString(new Date());
  
    // Объект процесса
    const process = selectedBox[processType] as BoxTaskTypes;
  
    // Обновляем объект коробки с новой информацией о процессе
    const updatedBox: BoxData = {
      ...selectedBox,
      [processType]: {
        ...process,
        inProgress: true,
        operator: currentUserFromUsers.id,
        periodsOfTime: [
          ...process.periodsOfTime,
          {
            id: process.periodsOfTime.length + 1,
            startTime: timestamp,
            endTime: null,
          },
        ],
      },
    };
  
    // Если процесс - это инспекция, обновляем оператора и статус для следующих процессов
    if (processType === 'inspection') {
      updatedBox.preparation = {
        ...updatedBox.preparation,
        operator: currentUserFromUsers.id,
        inProgress: false,
      };
      updatedBox.scanning1 = {
        ...updatedBox.scanning1,
        operator: currentUserFromUsers.id,
        inProgress: false,
      };
    }
  
    // Обновляем текущий ID коробки и процесса в userRedux
    dispatch({
      type: 'user/updateCurrentBoxProcess',
      payload: processType,
    });
  
    // Обновляем коробку в store
    dispatch(updateBox(updatedBox));
    setSelectedBox(updatedBox); // Обновляем локальный стейт с обновленными данными
  
    // Создаем новую задачу и добавляем ее в tasksRedux
    dispatch(startTask({
      taskType: processType,
      activity: processType,
      boxId: selectedBox.id,
      userId: currentUserFromUsers.id,
      startTime: timestamp,
      endTime: null,
      isPaused: false,
    }));
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
            handleProcessAction={() => handleProcessAction('inspection')}
            unavailable={!isBoxActivityAvailable}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.preparation}
            processType="preparation"
            handleProcessAction={() => handleProcessAction('preparation')}
            unavailable={!isBoxActivityAvailable}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.scanning1}
            processType="scanning1"
            handleProcessAction={() => handleProcessAction('scanning1')}
            unavailable={!isBoxActivityAvailable}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.scanning2}
            processType="scanning2"
            handleProcessAction={() => handleProcessAction('scanning2')}
            unavailable={!isBoxActivityAvailable}
            selectedBox={selectedBox}
          />
          <BoxStage
            process={selectedBox.review}
            processType="review"
            handleProcessAction={() => handleProcessAction('review')}
            unavailable={!isBoxActivityAvailable}
            selectedBox={selectedBox}
          />
        </div>
      )}
    </div>
  );
};

export default BoxActivity;
