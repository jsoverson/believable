import { Random } from 'seeded-random-utils';

import starwars from './data/starwars-names.json';
import wordlist from './data/wordlist.json';
import firstNames from './data/firstnames.us.1990.json';
import lastNames from './data/lastnames.us.1990.20k.json';

import emailDomains from './data/email-domains.json';
import passwords from './data/top-passwords.json';

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export class Believable {
  random: Random;
  mathRandom: typeof Random.prototype.float;
  separators = ['.', '_', '-', ''];
  specialChars = '!*\'#$%&? ".,_-';

  constructor(seed = 1) {
    this.random = new Random(seed);
    this.mathRandom = this.random.float.bind(this.random);
  }

  _usernameify(string: string): string {
    const condensed = string.replace(/[^\w]/g, '');
    return condensed.substr(0, 1).toLowerCase() + condensed.substr(1);
  }
  initialAndLastName(): string {
    return `${this.character()}${this.separator()}${this.lastName().toLowerCase()}`;
  }
  fullName(): string {
    return `${this.firstName()} ${this.lastName()}`;
  }
  firstName(): string {
    const name = this.random.listItem(firstNames);
    return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
  }
  lastName(): string {
    const name = this.random.listItem(lastNames);
    return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
  }
  character(): string {
    return this.random.character('abcdefghijklmnopqrstuvwxyz');
  }
  separator(): string {
    return this.random.listItem(this.separators);
  }
  starWarsName(): string {
    const parts = [this.random.listItem(starwars.last)];
    if (this.random.oneIn(2)) {
      parts.unshift(this.random.listItem(starwars.first));
    }
    if (this.random.oneIn(4)) parts.unshift(this.random.listItem(starwars.title));
    return parts.join(' ');
  }
  username(): string {
    let name = this.initialAndLastName();
    if (this.random.oneIn(30)) name = this._usernameify(this.starWarsName());
    if (this.random.oneIn(3)) name = this._usernameify(this.fullName());
    if (this.random.oneIn(5)) name += this.birthYearShort();
    return name;
  }
  password(): string {
    if (this.random.oneIn(20)) return this.passphrase();
    if (this.random.oneIn(20)) return this.randomPassword();
    if (this.random.oneIn(2)) return `${this.commonPassword()}${this.birthYearShort()}`;
    return this.commonPassword();
  }
  birthYear(minAge = 18, maxAge = 82): string {
    return this.birthDate(minAge, maxAge).getFullYear().toString();
  }
  birthYearShort(minAge = 18, maxAge = 82): string {
    return this.birthYear(minAge, maxAge).toString().substring(2);
  }
  birthDate(minAge = 18, maxAge = 82): Date {
    const today = new Date();
    const year = today.getFullYear() - this.random.int(minAge, maxAge);
    const month = this.random.int(0, 11);
    const isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    const day = this.random.int(1, month === 1 && isLeapYear ? 29 : daysInMonth[month]);
    const hours = this.random.int(0, 23);
    const minutes = this.random.int(0, 59);
    const seconds = this.random.int(0, 59);
    const ms = this.random.int(0, 999);
    const date = new Date(year, month, day, hours, minutes, seconds, ms);
    return date;
  }
  hostname(): string {
    return this.random.listItem(emailDomains);
  }
  randomPassword(min = 8, max = 24, specialChars = this.specialChars): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy01234567890' + specialChars;
    return this.character() + this.random.string(this.random.int(min - 1, max - 1), alphabet);
  }
  passphrase(min = 3, max = 5): string {
    const num = this.random.int(min, max);
    const parts = new Array(num).fill(0).map(() => this.random.listItem(wordlist));
    return parts.join(this.separator());
  }
  commonPassword(): string {
    return this.random.listItem(passwords);
  }
  credentials(): string {
    return `${this.email()}:${this.password()}`;
  }
  word(): string {
    return this.random.listItem(wordlist);
  }
  email(): string {
    return `${this.username().toLowerCase()}@${this.hostname()}`;
  }
}

export const believable = new Believable(0);
