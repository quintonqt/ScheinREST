import express from 'express';
import Person from './Person';
import { findErrorFields } from './utils';

const app = express();
const port = 8080; // default port to listen

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const persons: Map<number, Person> = new Map<number, Person>();

app.get('/person', (req, res) => {
  const personList: Person[] = [];
  persons.forEach((value) => {
    personList.push(value);
  });
  res.status(200).send(personList);
});

app.get('/person/:socialSecurityNumber', (req, res) => {
  const socialSecurityNumber = parseInt(req.params.socialSecurityNumber, 10);
  if (persons.has(socialSecurityNumber)) {
    res.status(200).send(persons.get(socialSecurityNumber));
  } else {
    res.status(400).send('Person with provided SSN does not exist.');
  }
});

app.post('/person', (req, res) => {
  const personData = req.body;
  const errorMessage = findErrorFields(personData);

  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  if (persons.has(personData.socialSecurityNumber)) {
    return res
      .status(400)
      .send(
        'A person with SSN, ' +
          personData.socialSecurityNumber +
          ', already exists.'
      );
  }

  const person = new Person(req.body);
  persons.set(person.socialSecurityNumber, person);
  res.status(201).send(personData);
});

app.put('/person/:socialSecurityNumber', (req, res) => {
  const socialSecurityNumber = parseInt(req.params.socialSecurityNumber, 10);
  const personData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    emailAddress: req.body.emailAddress,
    socialSecurityNumber,
  };
  const errorMessage = findErrorFields(personData);

  if (!persons.has(socialSecurityNumber)) {
    return res
      .status(400)
      .send('Person with SSN, ' + socialSecurityNumber + ', does not exist. ');
  }

  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  const newPerson = new Person(personData);
  persons.set(socialSecurityNumber, newPerson);
  res.status(200).send(newPerson);
});

app.delete('/person/:socialSecurityNumber', (req, res) => {
  const socialSecurityNumber = parseInt(req.params.socialSecurityNumber, 10);
  const isDeleted = persons.delete(socialSecurityNumber);
  return isDeleted
    ? res.status(200).send('Person deleted')
    : res
        .status(400)
        .send(
          'Person with SSN, ' + socialSecurityNumber + ', does not exist. '
        );
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

app.use((err, req, res, next) => (
  res.status(500).send('An unknown error has occurred!')
))