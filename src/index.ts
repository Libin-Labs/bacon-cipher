function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function letters(text: string): void {
  strictText(text);
  if (!/^[A-Z]*$/.test(text)) throw new RangeError('Uppercase ASCII letters required');
}
export function encodeBacon(text: string): string {
  letters(text);
  return Array.from(text, (c) =>
    (c.charCodeAt(0) - 65).toString(2).padStart(5, '0').replace(/0/g, 'A').replace(/1/g, 'B'),
  ).join(' ');
}
export function decodeBacon(text: string): string {
  strictText(text, 98303);
  if (!text) return '';
  if (!/^[AB]{5}(?: [AB]{5})*$/.test(text)) throw new RangeError('Canonical Bacon blocks required');
  return text
    .split(' ')
    .map((block) => {
      const n = parseInt(block.replace(/A/g, '0').replace(/B/g, '1'), 2);
      if (n > 25) throw new RangeError('Reserved Bacon code');
      return String.fromCharCode(65 + n);
    })
    .join('');
}
