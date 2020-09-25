import { expect } from 'chai';
import * as EmailValidator from 'email-validator';
import { describe } from 'mocha';
import { Believable } from '../src';

const specialChars = '!*\'#$%&? ".,_-';

const usernameRegex = /^[a-z\d](?:[a-z\d]|[-._](?=[a-z\d])){0,38}$/i;
const passwordRegex = new RegExp(`^[a-zA-Z0-9${specialChars}]+$`);

const separator = '[-_.]?';

const regexes = {
  initialAndLastName: new RegExp(`^\\w${separator}\\w{2,}$`),
  fullName: /^\w+ \w+$/,
  firstName: /^\w+$/,
  lastName: /^\w+$/,
  char: /^[a-z]$/,
  password: passwordRegex,
  randomPassword: passwordRegex,
  hostname: /(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*/,
  passphrase: passwordRegex,
  commonPassword: passwordRegex,
  birthYear: /^(19|20)\d\d$/,
  birthYearShort: /^\d\d$/,
  username: usernameRegex,
  word: /^\w+$/,
};

const numTests = 10000;

function testRegex(fn: () => string | number, regex: RegExp, num = numTests) {
  for (let i = 0; i < num; i++) {
    expect(fn().toString()).to.match(regex);
  }
}

describe('Believable', function () {
  let believable: Believable;
  beforeEach(() => {
    believable = new Believable(1);
  });
  after(() => {
    const apiMethods = [
      'fullName',
      'firstName',
      'lastName',
      'character',
      'separator',
      'starWarsName',
      'username',
      'password',
      'birthYear',
      'birthYearShort',
      'birthDate',
      'hostname',
      'randomPassword',
      'passphrase',
      'commonPassword',
      'credentials',
      'word',
      'email',
    ];

    console.log('Generating sample output for documentation.');

    console.log('\n\n## API Methods\n');

    apiMethods.forEach(key => {
      //@ts-ignore
      if (typeof believable[key] === 'function' && key !== 'constructor') {
        //@ts-ignore
        console.log(`- \`believable.${key}()\`: ${believable[key]()}`);
      }
    });
  });
  it('initialAndLastName', () => {
    testRegex(() => believable.initialAndLastName(), regexes.initialAndLastName);
  });
  it('fullName', () => {
    testRegex(() => believable.fullName(), regexes.fullName);
  });
  it('firstName', () => {
    testRegex(() => believable.firstName(), regexes.firstName);
  });
  it('lastName', () => {
    testRegex(() => believable.lastName(), regexes.lastName);
  });
  it('char', () => {
    testRegex(() => believable.character(), regexes.char);
  });
  it('password', () => {
    testRegex(() => believable.password(), regexes.password);
  });
  it('randomPassword', () => {
    testRegex(() => believable.randomPassword(), regexes.randomPassword);
  });
  it('passphrase', () => {
    testRegex(() => believable.passphrase(), regexes.passphrase);
  });
  it('commonPassword', () => {
    testRegex(() => believable.commonPassword(), regexes.commonPassword);
  });
  it('birthYear', () => {
    testRegex(() => believable.birthYear(), regexes.birthYear);
  });
  it('birthYearShort', () => {
    testRegex(() => believable.birthYearShort(), regexes.birthYearShort);
  });
  it('username', () => {
    testRegex(() => believable.username(), regexes.username);
  });
  it('hostname', () => {
    testRegex(() => believable.hostname(), regexes.hostname);
  });
  it('word', () => {
    testRegex(() => believable.word(), regexes.word);
  });
  it('email', () => {
    for (let i = 0; i < numTests; i++) {
      const email = believable.email();
      expect(EmailValidator.validate(email)).to.be.true;
    }
  });
  it('credentials', () => {
    for (let i = 0; i < numTests; i++) {
      const creds = believable.credentials();
      const [email, pass] = creds.split(':');
      expect(EmailValidator.validate(email)).to.be.true;
      expect(pass).to.match(passwordRegex);
    }
  });
});
