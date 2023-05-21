export function applyCNPJMask(input: string) {
  const cleanedInput = input.replace(/\D/g, '');

  const maskedInput = cleanedInput.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
    '$1.$2.$3/$4-$5'
  );

  return maskedInput;
}
