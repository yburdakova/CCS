import { useEffect, useState } from 'react';
import styles from './CustomInput.module.css';
import { CustomInputProps } from '../../data/types';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { MdClear } from 'react-icons/md';

const CustomInput = ({ label, type, required, getValue, valueProps, dark, withDel, onKeyDown, ...props }: CustomInputProps) => {

  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(valueProps);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    setValue(valueProps); // Обновляем состояние value при изменении valueProps
  }, [valueProps]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (getValue) {
      getValue(newValue);
    }
  };

  const handleClear = () => {
    setValue('');
    if (getValue) {
      getValue('');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={styles.inputBox}>
      <div className={`${styles.floatingLabelInput} ${isFocused || value ? (dark ? styles.focusedDark : styles.focused) : ''}`}>
        <input
          {...props}
          required={required}
          type={showPassword ? 'text' : type}
          value={valueProps}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown} // Добавляем onKeyDown
          className={`${isFocused ? styles.hidePlaceholder : ''} ${dark ? styles.inputDark : styles.input}`}
          placeholder=" "
        />
        {type === 'password' && (
          <div onClick={toggleShowPassword} className={styles.togglePasswordButton}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        )}
        {withDel && value && (
          <div onClick={handleClear} className={styles.clearButton}>
            <MdClear />
          </div>
        )}
        <label className={`${value || isFocused ? styles.filled : ''} ${dark ? styles.labelDark : styles.label}`}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default CustomInput;
