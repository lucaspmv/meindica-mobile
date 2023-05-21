const INVALIDLIST: string[] = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const STRIP_REGEX = /[^\d]/g;

const verifierDigit = (digits: string): number => {
  let index = 2;

  const sum: number = Array.from(digits)
    .reverse()
    .reduce((buffer, number) => {
      buffer += Number(number) * index;
      index = index === 9 ? 2 : index + 1;
      return buffer;
    }, 0);

  const mod: number = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

const strip = (number: string): string => {
  return number.replace(STRIP_REGEX, '');
};

export function validateCNPJ(strCNPJ: string): boolean {
  const stripped: string = strip(strCNPJ);

  if (!stripped || stripped.length !== 14 || INVALIDLIST.includes(stripped)) {
    return false;
  }

  let numbers: string = stripped.substring(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === stripped.substring(-2);
}
