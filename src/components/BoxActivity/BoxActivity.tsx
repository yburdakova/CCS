import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BoxActivity.module.css';
import { BoxStage, CustomInput } from '../../components';
import { BoxData, RootState,} from '../../data/types';


const BoxActivity = () => {

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const barcodes = useSelector((state: RootState) => state.boxes.barcodes);
  const boxes = useSelector((state: RootState) => state.boxes.boxes);
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
    const savedBoxId = localStorage.getItem('selectedBoxId');
    if (savedBoxId) {
      const box = boxes.find((box: BoxData) => box.id === parseInt(savedBoxId, 10));
      if (box) {
        setSelectedBox(box);
        setBarcodeInput(box.barcode);
      }
    }
  }, [boxes]);

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
    const box = boxes.find((box:BoxData) => box.barcode === barcodeInput);
    if (box) {
      setSelectedBox(box);
      localStorage.setItem('selectedBoxId', box.id.toString());
    } else {
      setSelectedBox(null);
      localStorage.removeItem('selectedBoxId');
    }
  };

  const handleProcessAction = (processType: keyof BoxData) => {

  }

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
    {selectedBox && (
      <div className={styles.boxProgress}>
        <BoxStage
          process={selectedBox.inspection}
          processType="inspection"
          handleProcessAction={() => handleProcessAction('inspection')}
          isDisabled={!isBoxActivityAvailable}
        />
        <BoxStage
          process={selectedBox.preparation}
          processType="preparation"
          handleProcessAction={() => handleProcessAction('preparation')}
          isDisabled={!isBoxActivityAvailable}
        />
        <BoxStage
          process={selectedBox.scanning1}
          processType="scanning1"
          handleProcessAction={() => handleProcessAction('scanning1')}
          isDisabled={!isBoxActivityAvailable}
        />
        <BoxStage
          process={selectedBox.scanning2}
          processType="scanning2"
          handleProcessAction={() => handleProcessAction('scanning2')}
          isDisabled={!isBoxActivityAvailable}
        />
        <BoxStage
          process={selectedBox.review}
          processType="review"
          handleProcessAction={() => handleProcessAction('review')}
          isDisabled={!isBoxActivityAvailable}
        />
      </div>
)}


    </div>
  );
};

export default BoxActivity;
