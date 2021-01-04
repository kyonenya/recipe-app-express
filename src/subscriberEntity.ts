export const isNameValid = (name: string): boolean => {
  return name.length > 0;
};

export const isZipCodeValid = (zipcode: number): boolean => {
  return 10000 < zipcode && zipcode < 9999999;
};

export class Subscriber {
  constructor(
    public name: string, 
    public email: string, 
    public zipcode: number
  ) {
    if (!isNameValid(this.name)) throw new Error('不正な名前です');
    if (!isZipCodeValid(this.zipcode)) throw new Error('不正な郵便番号です');
  }
};
