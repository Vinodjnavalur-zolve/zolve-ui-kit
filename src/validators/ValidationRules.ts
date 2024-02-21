import moment from 'moment';
import ErrorModule from './ErrorModule';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/;
const NUMERIC_REGEX = /^[0-9]*$/;
const SINGLE_NUMERIC_REGEX = /[0-9]/;
const PAN_REGEX = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const SPECIAL_CHARACTERS = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const COMMON_COUNTRIES = {
    IND: 'in',
    MEX: 'mx',
    USA: 'us',
    PAK: 'pk',
};

const MIN_AGE_REQUIREMENT = 18;

const MIN_PHONE_LENGTH = 8;

export interface ErrorObject {
    isValid: boolean;
    errorText: string;
}

export const Email = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value && !EMAIL_REGEX.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.EMAIL;
    }

    return errorObj;
};

export const Password = (password: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (password.length < 2 || password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        errorObj.isValid = false;
    }

    if (password && PASSWORD_REGEX.test(password)) {
        errorObj.isValid = true;
        errorObj.errorText = '';
    }

    return errorObj;
};

export const Referral = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    return errorObj;
};

export const OTP = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (!NUMERIC_REGEX.test(value) || value.length < 4) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.OTP;
    }

    return errorObj;
};

export const ZIP_CODE = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value.length === 0) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    } else if (!NUMERIC_REGEX.test(value) || value.length < 5) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.ZIP_CODE;
    }

    return errorObj;
};

export const PhoneNumber = (value: string, country?: { format?: string; countryCode?: string; dialCode?: string }): ErrorObject => {
    let phoneNumberLength = (country?.format?.match(/\./g) || []).length;

    if (!Object.values(COMMON_COUNTRIES).includes(country?.countryCode || '')) {
        phoneNumberLength = MIN_PHONE_LENGTH + (country?.dialCode?.length || 0);
    }

    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (!NUMERIC_REGEX.test(value) || value.length < phoneNumberLength) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.PHONE;
    }
    if (value === country?.dialCode) {
        errorObj.isValid = false;
        errorObj.errorText = '';
    }

    return errorObj;
};


export const PAN = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value.length === 0) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    } else if (value.length !== 10 || !PAN_REGEX.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.PAN;
    }

    return errorObj;
};

export const SSN = (input: string): ErrorObject => {
    const value = input.replaceAll(' ', '');

    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value.length === 0) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    } else if (value.length !== 9) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.SSN;
    }

    return errorObj;
};

export const LastName = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value.length === 0) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    } else if (value.length > 24) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.LAST_NAME;
    } else if (SPECIAL_CHARACTERS.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.SPECIAL_CHARACTERS;
    } else if (SINGLE_NUMERIC_REGEX.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.NUMERIC;
    }
    return errorObj;
};

export const FirstName = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value.length === 0) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    } else if (SPECIAL_CHARACTERS.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.SPECIAL_CHARACTERS;
    } else if (SINGLE_NUMERIC_REGEX.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.NUMERIC;
    }
    return errorObj;
};

export const Required = (value: string): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value.length === 0) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    } else if (SPECIAL_CHARACTERS.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.SPECIAL_CHARACTERS;
    } else if (SINGLE_NUMERIC_REGEX.test(value)) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.NUMERIC;
    }
    return errorObj;
};

export const CTC = (value: number): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value < 1 || !NUMERIC_REGEX.test(value.toString())) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    }

    return errorObj;
};

export const AMOUNT = (value: number): ErrorObject => {
    const errorObj: ErrorObject = {
        isValid: true,
        errorText: '',
    };

    if (value < 1 || !NUMERIC_REGEX.test(value.toString())) {
        errorObj.isValid = false;
        errorObj.errorText = ErrorModule.REQUIRED;
    }

    return errorObj
}
