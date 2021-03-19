class Person implements Person{
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emailAddress: string;
  socialSecurityNumber: number;

  constructor(person: {firstName: string, lastName: string, dateOfBirth: string, emailAddress: string, socialSecurityNumber: number}) {
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.dateOfBirth = person.dateOfBirth;
    this.emailAddress = person.emailAddress;
    this.socialSecurityNumber = person.socialSecurityNumber;
  }
}

export default Person;