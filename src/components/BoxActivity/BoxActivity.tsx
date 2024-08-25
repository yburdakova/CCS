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

  const getProcessStatusMessage = (process: BoxData['inspection'] | BoxData['preparation'] | BoxData['scanning1'] | BoxData['scanning2'] | BoxData['review'], processName: string) => {
    if (process?.isFinished) {
      return `${processName} completed by ${getUserNameById(process.operator)} at ${process.endTime}`;
    } else if (process?.operator && !process?.isFinished) {
      return 'The process has already been started by another operator.';
    } else {
      return 'Not completed';
    }
  };

  const isButtonDisabled = (process: BoxData['inspection'] | BoxData['preparation'] | BoxData['scanning1'] | BoxData['scanning2'] | BoxData['review'], previousProcessFinished: boolean): boolean => {
    return !previousProcessFinished || process?.isFinished || (process?.operator && !process?.isFinished);
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
            <button 
              className={styles.boxTaskButton} 
              disabled={isButtonDisabled(selectedBox.inspection, true)}
            >
              {selectedBox.inspection?.isFinished ? 'Inspection completed' : 'Start Inspection'}
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
