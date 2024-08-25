import React, { useState } from 'react';
import styles from './BoxActivity.module.css';
import { CustomInput } from '../../components';
import { BoxActivityProps, BoxData } from '../../data/types';


const BoxActivity: React.FC<BoxActivityProps> = ({ barcodes, boxes, users }) => {
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedBox, setSelectedBox] = useState<BoxData | null>(null);

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

  const handleBarcodeSelect = (barcode: string) => {
    setBarcodeInput(barcode);
    setFilteredBarcodes([]);
    setShowSuggestions(false);
  };

  const handleFetch = () => {
    const box = boxes.find(b => b.barcode === barcodeInput);
    if (box) {
      setSelectedBox(box);
    } else {
      setSelectedBox(null);
    }
  };

  const getUserNameById = (id: number | null): string => {
    if (id === null) return 'Unknown';
    const foundUser = users.find(user => user.id === id);
    return foundUser ? foundUser.name : 'Unknown';
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
            <button className={styles.boxTaskButton}>Inspection</button>
            <div className="status">
              {selectedBox.inspection?.isFinished
                ? `Inspection completed by ${getUserNameById(selectedBox.inspection.operator)} at ${selectedBox.inspection.endTime}`
                : "Not completed"}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button className={styles.boxTaskButton}>Preparation</button>
            <div className="status">
              {selectedBox.preparation?.isFinished
                ? `Preparation completed by ${getUserNameById(selectedBox.preparation.operator)} at ${selectedBox.preparation.endTime}`
                : "Not completed"}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button className={styles.boxTaskButton}>Scanning 1</button>
            <div className="status">
              {selectedBox.scanning1?.isFinished
                ? `Scanning 1 completed by ${getUserNameById(selectedBox.scanning1.operator)} at ${selectedBox.scanning1.endTime}`
                : "Not completed"}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button className={styles.boxTaskButton}>Scanning 2</button>
            <div className="status">
              {selectedBox.scanning2?.isFinished
                ? `Scanning 2 completed by ${getUserNameById(selectedBox.scanning2.operator)} at ${selectedBox.scanning2.endTime}`
                : "Not completed"}
            </div>
          </div>
          <div className={styles.boxStage}>
            <button className={styles.boxTaskButton}>Review</button>
            <div className="status">
              {selectedBox.review?.isFinished
                ? `Review completed by ${getUserNameById(selectedBox.review.operator)} at ${selectedBox.review.endTime}`
                : "Not completed"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxActivity;
