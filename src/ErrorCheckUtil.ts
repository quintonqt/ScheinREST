import Person from './Person';

export function findErrorFields(personData: Person): string {
  const emptyFields = getEmptyFields(personData);
  const socialSecurityNumber = personData.socialSecurityNumber;

  if (emptyFields.length) {
    return 'Missing the following fields:' + emptyFields;
  }

  if (typeof personData.firstName !== 'string') {
    return 'Please provide a valid first name.';
  }

  if (typeof personData.lastName !== 'string') {
    return 'Please provide a valid last name.';
  }

  if (isInvalidDate(personData.dateOfBirth)) {
    return (
      personData.dateOfBirth +
      ' is not a valid date. Please provide a valid one.'
    );
  }

  if (!isValidEmail(personData.emailAddress)) {
    return (
      personData.emailAddress +
      ' is not a valid email. Please provide a valid one.'
    );
  }

  if (
    typeof socialSecurityNumber !== 'number' ||
    socialSecurityNumber.toString().length !== 9
  ) {
    return (
      personData.socialSecurityNumber +
      ' is not a valid SSN. Please provide a valid one.'
    );
  }

  return '';
}

function getEmptyFields(body: object): string[] {
  const emptyFields: string[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (!value) {
      emptyFields.push(key);
    }
  }
  return emptyFields;
}

function isInvalidDate(date: string): boolean {
  const timestamp = Date.parse(date);
  return isNaN(timestamp);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
