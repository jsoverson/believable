# Believable

Generate believable, reproducible data like usernames, full names, emails, and passwords.

## Why?

For testing and anywhere you might want to input dummy data.

## Installation

```shell
$ npm install believable
```

# Data sources

- [Wordlist](http://www.sil.org/linguistics/wordlists/english/) [gist mirror](https://gist.github.com/trsqxyz/6bba8c3d715583acc0b5)
- [Passwords](https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt)
- [Email domains](https://github.com/mailcheck/mailcheck/wiki/List-of-Popular-Domains)
- Star Wars names derived from [starwars-names](https://github.com/kentcdodds/starwars-names)
- Names come from 1990 US census data collected here: [treyhunner/name](https://github.com/treyhunner/names)

## Usage

```js
const { Believable } = require('believable');
const believable = new Believable(seed);

console.log(believable.fullName());
console.log(believable.firstName());
console.log(believable.email());
```

## API Methods

- `believable.fullName()`: Shanell Nisbet
- `believable.firstName()`: Ellie
- `believable.lastName()`: Coleman
- `believable.character()`: d
- `believable.separator()`: .
- `believable.starWarsName()`: Biggs Solo
- `believable.username()`: shellieWacker68
- `believable.password()`: helena99
- `believable.birthYear()`: 1957
- `believable.birthYearShort()`: 44
- `believable.birthDate()`: Wed Oct 01 1975 17:21:31 GMT-0400 (Eastern Daylight Time)
- `believable.hostname()`: ntlworld.com
- `believable.randomPassword()`: t?TdQm8QtVW
- `believable.passphrase()`: octal.hirable.zebroid
- `believable.commonPassword()`: 1664
- `believable.credentials()`: t.mccrady@hush.com:cloud9
- `believable.word()`: grammar
- `believable.email()`: robbinmedved@hotmail.es

## Contributions

If you have ideas on other data to include, feel free to submit a PR. There is a low barrier to entry for contributions; as long as you don't include massive dependencies or compromise determinism then have at it.
