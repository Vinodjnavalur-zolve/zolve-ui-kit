import React, { useState, ChangeEvent, KeyboardEvent, WheelEvent } from 'react';

interface InputGroupProps {
  variant?: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputType: string;
  placeholder?: string;
  helperText?: string;
  maxLength?: number | null;
  autoFocus?: boolean;
  inputMode?: "search" | "numeric" | "text" | "email" | "tel" | "url" | "none" | "decimal";
  pattern?: string;
  readOnly?: boolean;
  capsOnly?: boolean;
  disabled?: boolean;
  format: (value: string) => string;
  split?: boolean;
}

import './InputGroup.css'

const InputGroup: React.FC<InputGroupProps> = ({
  variant = 'outlined',
  name,
  label,
  value,
  onChange,
  inputType,
  placeholder = ' ',
  helperText = '',
  maxLength = null,
  autoFocus = false,
  inputMode,
  pattern,
  readOnly = false,
  capsOnly = false,
  disabled = false,
  format,
  split = false,
}) => {

  const adjustedMaxLength: number | undefined = maxLength !== null ? maxLength : undefined;


  const handleIconClick = () => {
    switch (inputType) {

      default:
        break;
    }
  };

  const getInputFieldIcon = () => {
    switch (inputType) {

      default:
        return <></>;
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = capsOnly ? event?.target?.value?.toUpperCase() : event?.target?.value;
    onChange(event);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.code === 'Space' ? 'Space' : event.key;
    if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(keyCode || event.key)
      && isNaN(Number(keyCode))
      && inputMode === 'numeric'
    ) {
      event.preventDefault();
      return false;
    }

    return true;
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.currentTarget.value = format(event.currentTarget.value);
  };

  const onWheel = (event: WheelEvent<HTMLInputElement>) => {
    if (inputType === 'number') {
      event.currentTarget.blur();
    }
  };

  return (
    <div className={`input-group ${split ? 'input-group--split' : ''}`}>
      <label className='input-group__label'>
        <input
          className={`input-group__input
            input-group__input--${variant}
            ${capsOnly ? 'input-group__input--caps' : ''}`}
          type={inputType}
          placeholder={placeholder}
          name={name}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={handleOnChange}
          maxLength={adjustedMaxLength}
          autoComplete='off'
          defaultValue={value}
          autoFocus={autoFocus}
          inputMode={inputMode}
          pattern={pattern}
          readOnly={readOnly}
          onWheel={onWheel}
          disabled={disabled}
        />
        <span
          className={`input-group__span`
          }
        >
          {label}
        </span>
        <span
          className='input-group__input-endIcon'
          onClick={handleIconClick}
        >
          {getInputFieldIcon()}
        </span>
      </label>
      <div
        className={`input-group__text`
        }
      >
        
      </div>
    </div>
  );
};

export default InputGroup;
