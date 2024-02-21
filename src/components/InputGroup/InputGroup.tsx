import React, { useState, ChangeEvent, KeyboardEvent, WheelEvent } from 'react';
import Debounce from '../../helpers/Debounce';
import { ValidationType } from '../../validators';

type ErrorObject = {
    isValid: boolean;
    errorText: string;
};

type InputType = 'email' | 'text' | 'search' | 'numeric' | 'tel' | 'url' | 'none' | 'decimal';
type InputMode = 'verbatim' | 'latin' | 'latin-name' | 'latin-prose' | 'full-width-latin' | 'kana' | 'kana-name' | 'katakana' | 'numeric' | 'tel' | 'email' | 'url';

type InputValidators = {
    [key in ValidationType]: (value: any, selectedCountry?: string) => ErrorObject;
};

interface InputGroupProps {
    validation: ValidationType;
    variant?: string;
    name?: string;
    value?: any;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    inputType?: InputType;
    placeholder?: string;
    helperText?: string;
    maxLength?: number | null;
    autoFocus?: boolean;
    inputMode?: InputMode;
    pattern?: string;
    readOnly?: boolean;
    capsOnly?: boolean;
    disabled?: boolean;
    format?: (value: string) => string;
    split?: boolean;
    label: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
    validation,
    variant = 'outlined',
    name,
    value,
    onChange,
    inputType = 'text',
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
    label
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [filled, setFilled] = useState(false);
    const [validationObject, setValidationObject] = useState<ErrorObject>({
        isValid: true,
        errorText: '',
    });


    const getInputFieldIcon = () => {
        switch (inputType as InputType) {
            default:
                return <></>;
        }
    };

    const handleOnChange = Debounce((event: ChangeEvent<HTMLInputElement>) => {
        // const inputValue = capsOnly ? (event?.target?.value?.toUpperCase() as string) : event?.target?.value as string;
    
        // // Use type assertion to tell TypeScript that inputType is a valid key
        // const validationCheck = InputValidators[inputType as keyof typeof InputValidators](inputValue);
    
        onChange(event);
        // setFilled(!!inputValue);
        // setValidationObject(validationCheck);
        setValidationObject(
            {
                "isValid": false,
                "errorText": "ERROR"
            }
        )
    });
    

    console.log(validationObject);
    
    

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.code === 'Space' ? 'Space' : event.key;
        if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(keyCode)
            && isNaN(Number(keyCode))
            && inputMode === 'numeric'
        ) {
            event.preventDefault();
            return false;
        }
        return true;
    };

    const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        event.currentTarget.value = format ? format(event.currentTarget.value) : event.currentTarget.value;
    };

    return (
        <div className={`input-group ${split ? 'input-group--split' : ''}`}>
            <label className='input-group__label'>
                <input
                    className={`input-group__input
                        input-group__input--${filled ? 'filled' : ''}
                        input-group__input--${variant}
                        input-group__input--${validation}
                        ${capsOnly ? 'input-group__input--caps' : ''}
                        ${!validationObject.isValid ? 'input-group__input--error' : ''}`}
                    type={isPasswordVisible ? 'text' : inputType}
                    placeholder={placeholder}
                    name={name}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={handleOnChange}
                    maxLength={maxLength!}
                    autoComplete='off'
                    defaultValue={value}
                    autoFocus={autoFocus}
                    // inputMode={inputMode as InputMode}
                    pattern={pattern}
                    readOnly={readOnly}
                    disabled={disabled}
                />
                <span
                    className={`input-group__span
                        ${!validationObject.isValid ? 'input-group__span--error' : ''}`}
                >
                    {label}
                </span>
                <span
                    className='input-group__input-endIcon'
                >
                    {getInputFieldIcon()}
                </span>
            </label>
            <div
                className={`input-group__text
                    ${!validationObject.isValid ? 'input-group__text--error' : ''}`}
            >
                {!validationObject.isValid ?
                    validationObject.errorText
                    : !value ? helperText : ''}
            </div>
        </div>
    );
};

export default InputGroup;
