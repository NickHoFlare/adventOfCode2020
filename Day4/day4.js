const fs = require('fs');

const initDay4 = () => {
  const lines = fs.readFileSync('day4Input.txt', 'utf-8')
    .split(/\n\s/g)
    .map(str => str.replace(/\r\n/g, ' '))
    .map(str => str.replace(/\r|\n/g, ''));

  return lines;
};

const part1 = () => {
  const input = initDay4();
  let count = 0;

  input.forEach(line => {
    if (passportIsValid(line)) {
      count++;
    }
  })

  console.log(count);
}

const passportIsValid = line => {
  const passport = getPassportFromString(line);
  return passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid;
}

const getPassportFromString = line => Object.fromEntries(
  line
    .split(' ')
    .map(field => field
      .split(':')));

part1();