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

  console.log('Part 1..');
  input.forEach(line => {
    if (passportIsValidPart1(line)) {
      count++;
    }
  })

  console.log(count);
}

const passportIsValidPart1 = line => {
  const passport = getPassportFromString(line);
  return passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid;
}

const part2 = () => {
  const input = initDay4();
  let count = 0;

  console.log('Part 2..');
  input.forEach(line => {
    if (passportIsValidPart2(line)) {
      count++;
    }
  })

  console.log(count);
}

const passportIsValidPart2 = line => {
  const passport = getPassportFromString(line);
  
  return evaluateByr(passport.byr) && 
    evaluateIyr(passport.iyr) && 
    evaluateEyr(passport.eyr) && 
    evaluateHgt(passport.hgt) && 
    evaluateHcl(passport.hcl) && 
    evaluateEcl(passport.ecl) && 
    evaluatePid(passport.pid);
}

const evaluateByr = byr => {
  if (!byr) {
    return false;
  }
  
  byr = parseInt(byr);
  if (byr >= 1920 && byr <= 2002) {
    return true;
  }
  console.log(`wrong byr: ${byr}`)
  return false;
}

const evaluateIyr = iyr => {
  if (!iyr) {
    return false;
  }
  
  iyr = parseInt(iyr);
  if (iyr >= 2010 && iyr <= 2020) {
    return true;
  }
  console.log(`wrong iyr: ${iyr}`)
  return false;
}

const evaluateEyr = eyr => {
  if (!eyr) {
    return false;
  }

  eyr = parseInt(eyr);
  if (eyr >= 2020 && eyr <= 2030) {
    return true;
  }
  console.log(`wrong eyr: ${eyr}`)
  return false;
}

const evaluateHgt = hgt => {
  if (!hgt) {
    return false;
  }
  
  const unit = parseInt(hgt.substring(hgt.length-2));
  const height = parseInt(hgt.substring(0,hgt.length-2));

  switch(unit) {
    case 'cm':
      if (height >= 150 && height <= 193) {
        return true;
      }
      console.log(`wrong cm height: ${height}`)
      return false;
    case 'in':
      if (height >= 59 && height <= 76) {
        return true;
      }
      console.log(`wrong inch height: ${height}`)
      return false;
    default:
  }
}

const evaluateHcl = hcl => {
  if (!hcl) {
    return false;
  }
  if (hcl.match(/^#[a-z0-9]{6}$/)) {
    return true;
  }
  console.log(`wrong hcl: ${hcl}`)
  return false;
}

const evaluateEcl = ecl => {
  if (!ecl) {
    return false;
  }
  if (hcl.match(/(amb|blu|brn|gry|grn|hzl|oth)/)) {
    return true;
  }
  console.log(`wrong ecl: ${ecl}`)
  return false;
}

const evaluatePid = pid => {
  if (!pid) {
    return false;
  }
  if (pid.match(/[0-9]{9}/)) {
    return true;
  }
  console.log(`wrong pid: ${pid}`)
  return false;
}

const getPassportFromString = line => Object.fromEntries(
  line
    .split(' ')
    .map(field => field
      .split(':')));

part1();
part2();