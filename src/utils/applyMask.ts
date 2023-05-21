export const applyMask = (value: string, mask: string): string => {
  if (!value) return '';

  // Remove non-numeric characters
  const numericValue = value.replace(/\D/g, '');

  // Apply mask (XX.XXX.XXX/XXXX-XX)
  let maskedValue = '';

  let valueIndex = 0;
  for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
    if (valueIndex >= numericValue.length) {
      break;
    }

    if (mask[maskIndex] === '0') {
      maskedValue += numericValue[valueIndex];
      valueIndex++;
    } else {
      maskedValue += mask[maskIndex];
    }
  }

  return maskedValue;
};
