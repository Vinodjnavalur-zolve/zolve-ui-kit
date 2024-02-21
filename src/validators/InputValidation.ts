import { ValidationType } from "./ValidationType";
import * as ValidationRules from './ValidationRules';

// Alias ErrorObject from the external module
import { ErrorObject as ExternalErrorObject } from "./ValidationRules";

// Use the aliased type
type InputValidatorFunction = (value: any, selectedCountry?: string) => ExternalErrorObject;

interface InputValidators {
    [key: string]: InputValidatorFunction;
}
export const InputValidators = {
    [ValidationType.EMAIL]: ValidationRules.Email,
    [ValidationType.PASSWORD]: ValidationRules.Password,
    [ValidationType.DEFAULT]: ValidationRules.Required,
    [ValidationType.REFERRAL_CODE]: ValidationRules.Referral,
    [ValidationType.OTP]: ValidationRules.OTP,
    [ValidationType.PHONE]: ValidationRules.PhoneNumber,
    [ValidationType.FIRST_NAME]: ValidationRules.FirstName,
    [ValidationType.LAST_NAME]: ValidationRules.LastName,
    [ValidationType.FULL_NAME]: ValidationRules.Required,
    // [ValidationType.ADDRESS]: ValidationRules.Address,
    // [ValidationType.ADDRESS_NO_NUMERIC]: ValidationRules.Required,
    // [ValidationType.HOUSE_NO]: ValidationRules.HOUSE_NO,
    [ValidationType.ZIP_CODE]: ValidationRules.ZIP_CODE,
    [ValidationType.CITY]: ValidationRules.Required,
    [ValidationType.STATE]: ValidationRules.Required,
    [ValidationType.DATE]: ValidationRules.Required,
    [ValidationType.GENDER]: ValidationRules.Required,
    [ValidationType.PAN]: ValidationRules.PAN,
    [ValidationType.SSN]: ValidationRules.SSN,
    [ValidationType.CTC]: ValidationRules.CTC,
    [ValidationType.WORK_EXP]: ValidationRules.Required,
    [ValidationType.LENGTH_OF_STAY]: ValidationRules.Required,
    [ValidationType.EDU_LOAN]: ValidationRules.Required,
    [ValidationType.COMPANY]: ValidationRules.Required,
    [ValidationType.COUNTRY]: ValidationRules.Required,
    [ValidationType.DEGREE]: ValidationRules.Required,
    // [ValidationType.COURSE]: ValidationRules.Required,
    // [ValidationType.COURSE_INTAKE]: ValidationRules.Required,
    [ValidationType.UNIVERSITY]: ValidationRules.Required,
    [ValidationType.RADIO]: ValidationRules.Required,
    [ValidationType.CHIPS]: ValidationRules.Required,
    [ValidationType.VISA_TYPE]: ValidationRules.Required,
    // [ValidationType.DATE_OF_BIRTH]: ValidationRules.DOB,
    // [ValidationType.OPTIONAL]: ValidationRules.Optional,
    // [ValidationType.ESSAY]: ValidationRules.Essay,
    [ValidationType.MIDDLE_NAME]: () => {
        const errorObj = {
            isValid: true,
            errorText: '',
        };

        return errorObj;
    },
};