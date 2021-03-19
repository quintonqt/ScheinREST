import Person from './Person';

function getEmptyFields(body: object) {
  const emptyFields: string[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (!value) {
      emptyFields.push(key);
    }
  }
  return emptyFields;
}

function isInvalidDate(date: string) {
  const timestamp = Date.parse(date);
  return isNaN(timestamp);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function findErrorFields(personData: Person) {
  const emptyFields = getEmptyFields(personData);
  const socialSecurityNumber = personData.socialSecurityNumber;
  let message = null;

  if (emptyFields.length) {
    message = 'Missing the following fields:' + emptyFields;
  } else if (typeof personData.firstName !== 'string') {
    message = 'Please provide a valid first name.';
  } else if (typeof personData.lastName !== 'string') {
    message = 'Please provide a valid last name.';
  } else if (isInvalidDate(personData.dateOfBirth)) {
    message =
      personData.dateOfBirth +
      ' is not a valid date. Please provide a valid one.';
  } else if (!isValidEmail(personData.emailAddress)) {
    message =
      personData.emailAddress +
      ' is not a valid email. Please provide a valid one.';
  } else if (
    typeof socialSecurityNumber !== 'number' ||
    socialSecurityNumber.toString().length !== 9
  ) {
    message =
      personData.socialSecurityNumber +
      ' is not a valid SSN. Please provide a valid one.';
  }
  return message;
}
