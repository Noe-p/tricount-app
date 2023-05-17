export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let thisYear = 0;
  if (today.getMonth() < birthDate.getMonth()) {
    thisYear = 1;
  } else if (
    today.getMonth() == birthDate.getMonth() &&
    today.getDate() < birthDate.getDate()
  ) {
    thisYear = 1;
  }
  return today.getFullYear() - birthDate.getFullYear() - thisYear;
}

export function isAgeOver18(birthDate: Date): boolean {
  return calculateAge(birthDate) >= 18;
}

export function convertHexaToRgba(
  hex: string,
  defaultColor = 'rgba(0,0,0,1)'
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
    );
  }
  return defaultColor;
}
