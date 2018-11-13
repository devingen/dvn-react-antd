export function simpleTextDecorator(getFieldDecorator: any, key: string, label: string, value: any, required: boolean, min: number, max: number, rules = [], strings: any) {
  return (getFieldDecorator(key, {
    initialValue: value,
    trigger: 'onChange',
    validate: [{
      rules: [
        {
          max,
          message: strings.textValidationError.replace('|label|', label).replace('|min|', min).replace('|max|', max),
          min,
          required,
        },
        ...rules,
      ],
      trigger: 'onBlur',
    }],
  }));
}

export function swapArray(array: any[], x: any, y: any) {
  array[x] = array.splice(y, 1, array[x])[0];
  return array;
}

export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function convertToAlphanumeric(text: string) {
  return text
    .replace(/ı/gi, 'i')
    .replace(/İ/gi, 'I')
    .replace(/ğ/gi, 'g')
    .replace(/ü/gi, 'u')
    .replace(/Ü/gi, 'U')
    .replace(/ş/gi, 's')
    .replace(/Ş/gi, 'S')
    .replace(/ö/gi, 'o')
    .replace(/Ö/gi, 'O')
    .replace(/ç/gi, 'c')
    .replace(/Ç/gi, 'C')
    .replace(/[^0-9a-z]/gi, '');
}

export function convertToUniqueAlphanumberic(text: string) {
  return convertToAlphanumeric(text).substring(0, 10) + getRandomInt(0, 1000);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}
